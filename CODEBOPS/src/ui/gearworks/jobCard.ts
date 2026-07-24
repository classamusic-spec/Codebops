/**
 * Job Card editor — Phase 9. A small named card the child fills with
 * primitive tiles to DEFINE a function (here "Make Jam" = FETCH, PRESS).
 * Tap a tray tile to add a step, tap a step to remove it. Once the card
 * has a body, the main deck's DO tile can run the whole job at once.
 *
 * During playback highlightStep() lights the job's inner tile so the
 * execution trace shows exactly which step of the job is running.
 */
import { el } from '../dom';
import { sharedSfx } from '../../audio/sfx';
import type { JobPrimId, JobStep } from '../../gameplay/gearworks/jobMachine';
import type { GwTileDef } from '../../data/gearworks/world';

export interface JobCardOpts {
  readonly name: string;
  readonly icon: string;
  readonly prims: readonly JobPrimId[];
  readonly slots: number;
  readonly tiles: Readonly<Record<string, GwTileDef>>;
}

export class JobCardEditor {
  readonly root: HTMLElement;
  private body: JobStep[] = [];
  private readonly slotNodes: HTMLElement[] = [];
  private running = false;

  constructor(
    parent: HTMLElement,
    private readonly opts: JobCardOpts,
    private readonly onChange: (body: JobStep[]) => void,
  ) {
    this.root = el('aside', 'gw-jobcard', parent);
    this.root.setAttribute('aria-label', `Job card: ${opts.name}`);

    const head = el('div', 'gw-jc-head', this.root);
    el('span', 'gw-jc-icon', head, opts.icon);
    const titleWrap = el('span', 'gw-jc-titles', head);
    el('span', 'gw-jc-kicker', titleWrap, 'JOB');
    el('span', 'gw-jc-name', titleWrap, opts.name);

    const seq = el('div', 'gw-jc-slots', this.root);
    for (let i = 0; i < opts.slots; i++) {
      const slot = el('div', 'slot gw-jc-slot', seq);
      this.slotNodes.push(slot);
    }

    const tray = el('div', 'gw-jc-tray', this.root);
    for (const cmd of opts.prims) tray.appendChild(this.makeTile(cmd, 'tray', -1));

    el('div', 'gw-jc-foot', this.root, '👆 Fill the job, then DO it below!');
    this.render();
  }

  getBody(): JobStep[] {
    return this.body.map((s) => ({ ...s }));
  }

  setRunning(running: boolean): void {
    this.running = running;
    if (!running) this.slotNodes.forEach((s) => s.classList.remove('running'));
  }

  highlightStep(i: number): void {
    this.slotNodes.forEach((s, idx) => s.classList.toggle('running', idx === i));
  }

  private makeTile(cmd: JobPrimId, kind: 'tray' | 'slot', slotIndex: number): HTMLElement {
    const def = this.opts.tiles[cmd];
    const tile = el('button', 'tile gw-tile gw-jc-tile') as HTMLButtonElement;
    tile.type = 'button';
    tile.dataset.gwTone = def.tone;
    tile.setAttribute('aria-label', kind === 'tray' ? `Add to job: ${def.spoken}` : `${def.spoken}. Tap to remove from the job.`);
    el('span', 'sheen', tile);
    const ico = el('span', 'ico', tile);
    ico.innerHTML = `<svg class="cmd-ico" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">${def.icon}</svg>`;
    el('span', 'lbl', tile, def.label);
    tile.addEventListener('click', () => {
      if (this.running) return;
      if (kind === 'tray') this.add(cmd);
      else this.removeAt(slotIndex);
    });
    return tile;
  }

  private add(cmd: JobPrimId): void {
    if (this.body.length >= this.opts.slots) return;
    this.body.push({ cmd });
    sharedSfx.play('place');
    this.render();
  }

  private removeAt(i: number): void {
    if (i < 0 || i >= this.body.length) return;
    this.body.splice(i, 1);
    sharedSfx.play('remove');
    this.render();
  }

  private render(): void {
    this.slotNodes.forEach((slot, i) => {
      slot.innerHTML = '';
      slot.classList.toggle('filled', this.body[i] !== undefined);
      const step = this.body[i];
      if (step) {
        el('span', 'num', slot, String(i + 1));
        slot.appendChild(this.makeTile(step.cmd as JobPrimId, 'slot', i));
      }
    });
    this.onChange(this.getBody());
  }
}
