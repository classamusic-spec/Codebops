/**
 * Logic builder (spec §9.4) — where a child teaches a thing what to do.
 *
 * The shape is deliberate: a script is drawn attached to the object it
 * belongs to, so "Zip jumps when Zip is tapped" is one visible chain
 * rather than a rule floating in a rules list. Pick an object, pick what
 * starts it, then tap steps into the lane.
 *
 * Every tray tile is a finished command (see miniAppChoices) — no
 * inspector, no argument panel, nothing half-configured.
 */
import { el } from '../dom';
import { sharedSfx } from '../../audio/sfx';
import type { MiniAppProject, MiniAppScript } from '../../creator/miniAppProject';
import type { MiniAppCommand, MiniAppTrigger } from '../../creator/miniAppTypes';
import {
  commandChoices, triggerChoices, describeCommand, describeTrigger,
} from '../../creator/miniAppChoices';
import type { CommandChoice } from '../../creator/miniAppChoices';
import { approvedAsset } from '../../data/app-lab/approvedAssets';

export interface LogicBuilderEvents {
  readonly onSelectOwner: (componentId: string) => void;
  readonly onAddScript: (ownerId: string, trigger: MiniAppTrigger) => void;
  readonly onRemoveScript: (scriptId: string) => void;
  readonly onAddCommand: (scriptId: string, command: MiniAppCommand) => void;
  readonly onRemoveCommand: (scriptId: string, index: number) => void;
  readonly onMoveCommand: (scriptId: string, index: number, delta: -1 | 1) => void;
}

const GROUP_LABEL: Record<CommandChoice['group'], string> = {
  do: 'Things that happen',
  say: 'Things to say',
  sound: 'Sounds',
  count: 'Numbers',
  control: 'Timing and repeating',
};

export class LogicBuilder {
  readonly root: HTMLElement;
  private readonly cast: HTMLElement;
  private readonly lanes: HTMLElement;
  private readonly tray: HTMLElement;
  private project: MiniAppProject;
  private ownerId: string | null = null;
  private activeScriptId: string | null = null;

  constructor(
    parent: HTMLElement,
    project: MiniAppProject,
    private readonly events: LogicBuilderEvents,
  ) {
    this.project = project;
    this.root = el('div', 'lb-wrap', parent);
    this.cast = el('div', 'lb-cast', this.root);
    this.cast.setAttribute('aria-label', 'Pick something to teach');
    this.lanes = el('div', 'lb-lanes', this.root);
    this.tray = el('div', 'lb-tray', this.root);
    this.tray.setAttribute('aria-label', 'Steps you can add');
    const first = project.scenes.flatMap((s) => s.components)[0];
    this.ownerId = first?.id ?? null;
    this.renderAll();
  }

  update(project: MiniAppProject): void {
    this.project = project;
    const components = project.scenes.flatMap((s) => s.components);
    if (this.ownerId && !components.some((c) => c.id === this.ownerId)) {
      this.ownerId = components[0]?.id ?? null;
    }
    if (this.activeScriptId && !project.scripts.some((s) => s.id === this.activeScriptId)) {
      this.activeScriptId = null;
    }
    this.renderAll();
  }

  selectOwner(componentId: string): void {
    this.ownerId = componentId;
    this.activeScriptId = null;
    this.renderAll();
  }

  private renderAll(): void {
    this.renderCast();
    this.renderLanes();
    this.renderTray();
  }

  // ---- who are we teaching? ----

  private renderCast(): void {
    this.cast.innerHTML = '';
    const components = this.project.scenes.flatMap((s) => s.components);
    if (components.length === 0) {
      el('div', 'lb-empty', this.cast, 'Put something on the screen first, then teach it what to do.');
      return;
    }
    for (const c of components) {
      const asset = approvedAsset(c.assetId);
      const scripts = this.project.scripts.filter((s) => s.ownerId === c.id).length;
      const b = el('button', `lb-cast-chip${c.id === this.ownerId ? ' on' : ''}`, this.cast) as HTMLButtonElement;
      b.type = 'button';
      b.setAttribute('aria-label',
        `${asset?.label ?? c.id}${scripts > 0 ? `, ${scripts} job${scripts === 1 ? '' : 's'}` : ', nothing taught yet'}`);
      el('span', 'lb-chip-glyph', b, asset?.glyph ?? '❔');
      el('span', 'lb-chip-name', b, asset?.label ?? c.id);
      if (scripts > 0) el('span', 'lb-chip-count', b, String(scripts));
      b.addEventListener('click', () => {
        sharedSfx.play('tap');
        this.ownerId = c.id;
        this.activeScriptId = null;
        this.events.onSelectOwner(c.id);
        this.renderAll();
      });
    }
  }

  // ---- the scripts attached to that object ----

  private renderLanes(): void {
    this.lanes.innerHTML = '';
    if (!this.ownerId) return;
    const owner = this.project.scenes.flatMap((s) => s.components).find((c) => c.id === this.ownerId);
    if (!owner) return;
    const asset = approvedAsset(owner.assetId);
    const mine = this.project.scripts.filter((s) => s.ownerId === this.ownerId);

    if (mine.length === 0) {
      const empty = el('div', 'lb-no-script', this.lanes);
      el('span', 'lb-no-script-glyph', empty, asset?.glyph ?? '❔');
      el('span', undefined, empty,
        `${asset?.label ?? 'This'} does not do anything yet. Pick what starts it:`);
    }

    for (const script of mine) this.renderLane(script, asset?.glyph ?? '❔');

    // Trigger tray — the starting points this object can offer.
    const triggers = triggerChoices(this.project, this.ownerId);
    const used = new Set(mine.map((s) => JSON.stringify(s.trigger)));
    const fresh = triggers.filter((t) => !used.has(JSON.stringify(t.trigger)));
    if (fresh.length > 0) {
      const wrap = el('div', 'lb-trigger-tray', this.lanes);
      el('div', 'lb-tray-label', wrap, 'When…');
      const row = el('div', 'lb-trigger-row', wrap);
      for (const t of fresh) {
        const b = el('button', 'lb-trigger-tile', row) as HTMLButtonElement;
        b.type = 'button';
        b.setAttribute('aria-label', `Add a new job: ${t.label}`);
        el('span', 'lb-tile-glyph', b, t.glyph);
        el('span', 'lb-tile-name', b, t.label);
        b.addEventListener('click', () => {
          sharedSfx.play('place');
          this.events.onAddScript(this.ownerId!, t.trigger);
        });
      }
    }
  }

  private renderLane(script: MiniAppScript, ownerGlyph: string): void {
    const active = script.id === this.activeScriptId
      || (this.activeScriptId === null && this.firstScriptOfOwner()?.id === script.id);
    if (active) this.activeScriptId = script.id;

    const lane = el('div', `lb-lane${active ? ' active' : ''}`, this.lanes);
    lane.setAttribute('role', 'group');
    lane.setAttribute('aria-label', describeTrigger(this.project, script.trigger));

    const head = el('button', 'lb-lane-head', lane) as HTMLButtonElement;
    head.type = 'button';
    el('span', 'lb-lane-owner', head, ownerGlyph);
    el('span', 'lb-lane-when', head, describeTrigger(this.project, script.trigger));
    head.addEventListener('click', () => {
      sharedSfx.play('tap');
      this.activeScriptId = script.id;
      this.renderAll();
    });

    const del = el('button', 'lb-lane-del', head, '✕') as HTMLButtonElement;
    del.type = 'button';
    del.setAttribute('aria-label', 'Remove this whole job');
    del.addEventListener('click', (e) => {
      e.stopPropagation();
      sharedSfx.play('remove');
      this.events.onRemoveScript(script.id);
    });

    const steps = el('div', 'lb-steps', lane);
    if (script.commands.length === 0) {
      el('div', 'lb-step-empty', steps, 'Tap a step below to add it here.');
    }
    script.commands.forEach((cmd, i) => {
      const chip = el('div', 'lb-step', steps);
      el('span', 'lb-step-num', chip, String(i + 1));
      el('span', 'lb-step-text', chip, describeCommand(this.project, cmd));

      const tools = el('span', 'lb-step-tools', chip);
      const up = el('button', 'lb-step-btn', tools, '↑') as HTMLButtonElement;
      up.type = 'button';
      up.setAttribute('aria-label', `Move step ${i + 1} earlier`);
      up.disabled = i === 0;
      up.addEventListener('click', () => {
        sharedSfx.play('tap');
        this.events.onMoveCommand(script.id, i, -1);
      });
      const down = el('button', 'lb-step-btn', tools, '↓') as HTMLButtonElement;
      down.type = 'button';
      down.setAttribute('aria-label', `Move step ${i + 1} later`);
      down.disabled = i === script.commands.length - 1;
      down.addEventListener('click', () => {
        sharedSfx.play('tap');
        this.events.onMoveCommand(script.id, i, 1);
      });
      const rm = el('button', 'lb-step-btn danger', tools, '✕') as HTMLButtonElement;
      rm.type = 'button';
      rm.setAttribute('aria-label', `Remove step ${i + 1}`);
      rm.addEventListener('click', () => {
        sharedSfx.play('remove');
        this.events.onRemoveCommand(script.id, i);
      });
    });
  }

  private firstScriptOfOwner(): MiniAppScript | undefined {
    return this.project.scripts.find((s) => s.ownerId === this.ownerId);
  }

  // ---- the step tray ----

  private renderTray(): void {
    this.tray.innerHTML = '';
    const target = this.activeScriptId ?? this.firstScriptOfOwner()?.id ?? null;
    if (!target) {
      el('div', 'lb-tray-hint', this.tray, 'Pick what starts the job first, then add steps.');
      return;
    }
    const choices = commandChoices(this.project);
    const groups = new Map<CommandChoice['group'], CommandChoice[]>();
    for (const c of choices) {
      const list = groups.get(c.group) ?? [];
      list.push(c);
      groups.set(c.group, list);
    }
    for (const [group, list] of groups) {
      const wrap = el('div', 'lb-tray-group', this.tray);
      el('div', 'lb-tray-label', wrap, GROUP_LABEL[group]);
      const row = el('div', 'lb-tray-row', wrap);
      for (const choice of list) {
        const b = el('button', 'lb-cmd-tile', row) as HTMLButtonElement;
        b.type = 'button';
        b.setAttribute('aria-label', `Add step: ${choice.label}`);
        el('span', 'lb-tile-glyph', b, choice.glyph);
        el('span', 'lb-tile-name', b, choice.label);
        b.addEventListener('click', () => {
          sharedSfx.play('place');
          this.events.onAddCommand(target, choice.command);
        });
      }
    }
  }

  dispose(): void {
    this.root.remove();
  }
}
