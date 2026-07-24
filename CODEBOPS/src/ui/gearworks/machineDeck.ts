/**
 * Gearworks machine deck — command tray + program slots + BOP for machine
 * programs. Lean sibling of ProgramDeck (same CSS, same tap-first feel):
 * tap a tray tile to add, tap a slot tile to remove, tap a ×n badge to
 * cycle its value, big glowing BOP when a plan exists.
 *
 * Generic over the command registry so every Gearworks program screen
 * (Phase 2 motors, Phase 4 loops, …) shares one deck:
 *  - `badges` declares which commands carry a tap-to-cycle ×n badge
 *    (Speed ×1–3, Repeat ×2–4) — one interaction pattern app-wide.
 *  - Loop visualization: tiles feeding a Repeat tile get an `in-loop`
 *    tint + the loop tile shows k/n live during playback (setIterBadge).
 */
import { el } from '../dom';
import { sharedSfx } from '../../audio/sfx';
import type { GearworksCommandId } from '../../gameplay/gearworks/machine';
import { GW_TILES } from '../../data/gearworks/world';
import type { GwTileDef } from '../../data/gearworks/world';

export interface DeckStep<C extends string> {
  cmd: C;
  arg?: number;
}

export interface MachineDeckEvents<C extends string> {
  onChange: (program: Array<DeckStep<C>>) => void;
  onBop: () => void;
  onClear: () => void;
}

export interface BadgeSpec {
  readonly min: number;
  readonly max: number;
  readonly def: number;
  readonly aria: string;
}

export interface DeckConfig<C extends string> {
  readonly tiles: Readonly<Record<C, GwTileDef>>;
  readonly badges?: Partial<Readonly<Record<C, BadgeSpec>>>;
  /** Commands whose tile "collects" the tiles before it (Repeat). */
  readonly loopCmds?: readonly C[];
}

const MACHINE_DECK_DEFAULTS: DeckConfig<GearworksCommandId> = {
  tiles: GW_TILES,
  badges: { gwSetSpeed: { min: 1, max: 3, def: 2, aria: 'Change the speed: 1 slow, 2 medium, 3 fast' } },
};

export class MachineDeck<C extends string = GearworksCommandId> {
  readonly root: HTMLElement;
  private program: Array<DeckStep<C>> = [];
  private readonly slotNodes: HTMLElement[] = [];
  private bopBtn!: HTMLButtonElement;
  private running = false;
  private lastPlaced = -1;
  private readonly cfg: DeckConfig<C>;

  constructor(
    parent: HTMLElement,
    commands: readonly C[],
    private readonly maxSlots: number,
    private readonly events: MachineDeckEvents<C>,
    cfg?: DeckConfig<C>,
  ) {
    this.cfg = cfg ?? (MACHINE_DECK_DEFAULTS as unknown as DeckConfig<C>);
    this.root = el('div', 'bottom-deck', parent);
    const panel = el('div', 'deck-panel', this.root);

    const tray = el('div', 'deck-tray', panel);
    for (const cmd of commands) {
      tray.appendChild(this.makeTile(cmd, 'tray', -1));
    }

    el('div', 'deck-divider', panel);
    const seq = el('div', 'deck-sequence', panel);
    seq.setAttribute('aria-label', 'Your machine program');
    for (let i = 0; i < maxSlots; i++) {
      const slot = el('div', 'slot', seq);
      slot.dataset.index = String(i);
      this.slotNodes.push(slot);
    }

    const bopWrap = el('div', 'bop-wrap', this.root);
    this.bopBtn = el('button', 'bop-btn', bopWrap) as HTMLButtonElement;
    this.bopBtn.type = 'button';
    this.bopBtn.setAttribute('aria-label', 'BOP! Run the machine program');
    this.bopBtn.append('BOP!');
    el('span', 'tri', this.bopBtn);
    this.bopBtn.addEventListener('click', () => {
      if (this.program.length === 0 || this.running) return;
      sharedSfx.play('bop');
      this.events.onBop();
    });

    const tools = el('div', 'deck-tools', this.root);
    const clear = el('button', 'mini-btn', tools, '✕ Clear');
    clear.type = 'button';
    clear.setAttribute('aria-label', 'Clear the plan');
    clear.addEventListener('click', () => {
      if (this.running || this.program.length === 0) return;
      sharedSfx.play('remove');
      this.program = [];
      this.renderSlots();
      this.emit();
      this.events.onClear();
    });

    this.renderSlots();
  }

  getProgram(): Array<DeckStep<C>> {
    return this.program.map((s) => ({ ...s }));
  }

  setRunning(running: boolean): void {
    this.running = running;
    this.bopBtn.disabled = running;
    this.refreshBop();
    if (!running) {
      this.slotNodes.forEach((s) => {
        s.classList.remove('running');
        const badge = s.querySelector('.count-badge');
        badge?.classList.remove('looping');
      });
      // restore ×n badges after a run
      this.program.forEach((step, i) => {
        const badge = this.slotNodes[i]?.querySelector('.count-badge');
        if (badge && step.arg !== undefined) badge.textContent = `×${step.arg}`;
      });
    }
  }

  highlightSlot(index: number): void {
    this.slotNodes.forEach((s, i) => s.classList.toggle('running', i === index));
  }

  /** Loop playback beat: show "k/n" live on a loop tile's badge. */
  setIterBadge(slotIndex: number, text: string | null): void {
    const badge = this.slotNodes[slotIndex]?.querySelector('.count-badge');
    if (!badge) return;
    if (text !== null) {
      badge.textContent = text;
      badge.classList.add('looping');
    } else {
      const step = this.program[slotIndex];
      badge.textContent = `×${step?.arg ?? ''}`;
      badge.classList.remove('looping');
    }
  }

  private badgeFor(cmd: C): BadgeSpec | undefined {
    return this.cfg.badges?.[cmd];
  }

  private isLoopCmd(cmd: C): boolean {
    return this.cfg.loopCmds?.includes(cmd) ?? false;
  }

  private refreshBop(): void {
    this.bopBtn.classList.toggle('ready', this.program.length > 0 && !this.running);
    this.bopBtn.classList.toggle('empty', this.program.length === 0);
  }

  private makeTile(cmd: C, kind: 'tray' | 'slot', slotIndex: number): HTMLElement {
    const def = this.cfg.tiles[cmd];
    const tile = el('button', 'tile gw-tile') as HTMLButtonElement;
    tile.type = 'button';
    tile.dataset.gwTone = def.tone;
    tile.setAttribute('aria-label', kind === 'tray'
      ? `Add command: ${def.spoken}`
      : `Step ${slotIndex + 1}: ${def.spoken}. Tap to remove.`);
    el('span', 'sheen', tile);
    const ico = el('span', 'ico', tile);
    ico.innerHTML = `<svg class="cmd-ico" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">${def.icon}</svg>`;
    el('span', 'lbl', tile, def.label);

    // ×n badge: tap-to-cycle (Speed 1–3, Repeat 2–4 — same pattern)
    const spec = this.badgeFor(cmd);
    if (spec && kind === 'slot') {
      const step = this.program[slotIndex];
      const badge = el('span', 'count-badge', tile, `×${step?.arg ?? spec.def}`);
      badge.setAttribute('role', 'button');
      badge.setAttribute('aria-label', spec.aria);
      badge.addEventListener('pointerdown', (e) => e.stopPropagation());
      badge.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.running) return;
        const st = this.program[slotIndex];
        if (!st || st.cmd !== cmd) return;
        const cur = st.arg ?? spec.def;
        const next = cur >= spec.max ? spec.min : cur + 1;
        this.program[slotIndex] = { cmd, arg: next };
        badge.textContent = `×${next}`;
        sharedSfx.play('tap');
        this.emit();
      });
    }

    tile.addEventListener('click', () => {
      if (this.running) return;
      if (kind === 'tray') this.add(cmd);
      else this.removeAt(slotIndex);
    });
    return tile;
  }

  private add(cmd: C): void {
    if (this.program.length >= this.maxSlots) return;
    const spec = this.badgeFor(cmd);
    this.program.push(spec ? { cmd, arg: spec.def } : { cmd });
    this.lastPlaced = this.program.length - 1;
    sharedSfx.play('place');
    this.renderSlots();
    this.emit();
  }

  private removeAt(index: number): void {
    if (index < 0 || index >= this.program.length) return;
    this.program.splice(index, 1);
    this.lastPlaced = -1;
    sharedSfx.play('remove');
    this.renderSlots();
    this.emit();
  }

  /** Slots feeding a loop tile get tinted so the block reads as a group. */
  private loopBodySlots(): Set<number> {
    const body = new Set<number>();
    for (let i = 0; i < this.program.length; i++) {
      if (!this.isLoopCmd(this.program[i].cmd)) continue;
      for (let j = i - 1; j >= 0 && !this.isLoopCmd(this.program[j].cmd); j--) body.add(j);
    }
    return body;
  }

  private renderSlots(): void {
    const inLoop = this.loopBodySlots();
    this.slotNodes.forEach((slot, i) => {
      slot.innerHTML = '';
      slot.classList.remove('filled', 'in-loop');
      const step = this.program[i];
      if (step !== undefined) {
        slot.classList.add('filled');
        if (inLoop.has(i)) slot.classList.add('in-loop');
        el('span', 'num', slot, String(i + 1));
        const tile = this.makeTile(step.cmd, 'slot', i);
        if (i === this.lastPlaced) tile.classList.add('fresh');
        slot.appendChild(tile);
      }
    });
    this.refreshBop();
  }

  private emit(): void {
    this.events.onChange(this.getProgram());
  }
}
