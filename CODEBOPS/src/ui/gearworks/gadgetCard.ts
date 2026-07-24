/**
 * Gadget card editor — Phase 18. A small named card the child fills to
 * DEFINE the MAKE gadget's body (PLACE, then REPEAT the input). Tap a
 * tray tile to add a step, tap a step to remove it. The REPEAT tile
 * shows "(input)" to make clear it repeats as many times as the number
 * the caller dials in — the parameter.
 *
 * Reuses the Phase 9 job-card look; highlightStep() lights the running
 * body tile during playback.
 */
import { el } from '../dom';
import { sharedSfx } from '../../audio/sfx';
import type { MkBodyId, MkBodyStep } from '../../gameplay/gearworks/makerMachine';
import type { GwTileDef } from '../../data/gearworks/world';

export interface GadgetCardOpts {
  readonly name: string;
  readonly icon: string;
  readonly prims: readonly MkBodyId[];
  readonly slots: number;
  readonly tiles: Readonly<Record<string, GwTileDef>>;
}

export class GadgetCardEditor {
  readonly root: HTMLElement;
  private body: MkBodyStep[] = [];
  private readonly slotNodes: HTMLElement[] = [];
  private running = false;

  constructor(
    parent: HTMLElement,
    private readonly opts: GadgetCardOpts,
    private readonly onChange: (body: MkBodyStep[]) => void,
  ) {
    this.root = el('aside', 'gw-jobcard gw-gadget', parent);
    this.root.setAttribute('aria-label', `Gadget: ${opts.name}`);

    const head = el('div', 'gw-jc-head', this.root);
    el('span', 'gw-jc-icon', head, opts.icon);
    const titleWrap = el('span', 'gw-jc-titles', head);
    el('span', 'gw-jc-kicker', titleWrap, 'GADGET');
    el('span', 'gw-jc-name', titleWrap, `${opts.name} (input)`);

    const seq = el('div', 'gw-jc-slots', this.root);
    for (let i = 0; i < opts.slots; i++) {
      const slot = el('div', 'slot gw-jc-slot', seq);
      this.slotNodes.push(slot);
    }

    const tray = el('div', 'gw-jc-tray', this.root);
    for (const cmd of opts.prims) tray.appendChild(this.makeTile(cmd, 'tray', -1));

    this.render();
  }

  getBody(): MkBodyStep[] {
    return this.body.map((s) => ({ ...s }));
  }

  setRunning(running: boolean): void {
    this.running = running;
    if (!running) this.highlightStep(-1);
  }

  highlightStep(index: number): void {
    this.slotNodes.forEach((s, i) => s.classList.toggle('running', i === index));
  }

  pulse(): void {
    this.root.classList.remove('calling');
    void this.root.offsetWidth;
    this.root.classList.add('calling');
    window.setTimeout(() => this.root.classList.remove('calling'), 600);
  }

  private makeTile(cmd: MkBodyId, kind: 'tray' | 'slot', slotIndex: number): HTMLElement {
    const def = this.opts.tiles[cmd];
    const tile = el('button', 'tile gw-tile gw-jc-tile') as HTMLButtonElement;
    tile.type = 'button';
    tile.dataset.gwTone = def.tone;
    tile.setAttribute('aria-label', kind === 'tray' ? `Add ${def.spoken}` : `Remove ${def.label}`);
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

  private add(cmd: MkBodyId): void {
    if (this.body.length >= this.opts.slots) return;
    this.body.push({ cmd });
    sharedSfx.play('place');
    this.render();
    this.onChange(this.getBody());
  }

  private removeAt(index: number): void {
    if (index < 0 || index >= this.body.length) return;
    this.body.splice(index, 1);
    sharedSfx.play('remove');
    this.render();
    this.onChange(this.getBody());
  }

  private render(): void {
    this.slotNodes.forEach((slot, i) => {
      slot.innerHTML = '';
      slot.classList.toggle('filled', i < this.body.length);
      const step = this.body[i];
      if (step) slot.appendChild(this.makeTile(step.cmd, 'slot', i));
    });
  }
}
