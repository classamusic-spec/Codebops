/**
 * Gearworks machine deck — command tray + program slots + BOP for machine
 * programs. Lean sibling of ProgramDeck (same CSS, same tap-first feel):
 * tap a tray tile to add, tap a slot tile to remove, tap the Speed badge
 * to cycle Slow → Medium → Fast, big glowing BOP when a plan exists.
 */
import { el } from '../dom';
import { sharedSfx } from '../../audio/sfx';
import type { GearworksCommandId, GearworksStep, MotorSpeed } from '../../gameplay/gearworks/machine';
import { GW_TILES } from '../../data/gearworks/world';

export interface MachineDeckEvents {
  onChange: (program: GearworksStep[]) => void;
  onBop: () => void;
  onClear: () => void;
}

export class MachineDeck {
  readonly root: HTMLElement;
  private program: GearworksStep[] = [];
  private readonly slotNodes: HTMLElement[] = [];
  private bopBtn!: HTMLButtonElement;
  private running = false;
  private lastPlaced = -1;

  constructor(
    parent: HTMLElement,
    commands: readonly GearworksCommandId[],
    private readonly maxSlots: number,
    private readonly events: MachineDeckEvents,
  ) {
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

  getProgram(): GearworksStep[] {
    return this.program.map((s) => ({ ...s }));
  }

  setRunning(running: boolean): void {
    this.running = running;
    this.bopBtn.disabled = running;
    this.refreshBop();
    if (!running) this.slotNodes.forEach((s) => s.classList.remove('running'));
  }

  highlightSlot(index: number): void {
    this.slotNodes.forEach((s, i) => s.classList.toggle('running', i === index));
  }

  private refreshBop(): void {
    this.bopBtn.classList.toggle('ready', this.program.length > 0 && !this.running);
    this.bopBtn.classList.toggle('empty', this.program.length === 0);
  }

  private makeTile(cmd: GearworksCommandId, kind: 'tray' | 'slot', slotIndex: number): HTMLElement {
    const def = GW_TILES[cmd];
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

    // Speed tile: tap-to-cycle badge (same pattern as the Repeat ×n badge)
    if (cmd === 'gwSetSpeed' && kind === 'slot') {
      const step = this.program[slotIndex];
      const badge = el('span', 'count-badge', tile, `×${step?.arg ?? 2}`);
      badge.setAttribute('role', 'button');
      badge.setAttribute('aria-label', 'Change the speed: 1 slow, 2 medium, 3 fast');
      badge.addEventListener('pointerdown', (e) => e.stopPropagation());
      badge.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.running) return;
        const st = this.program[slotIndex];
        if (!st || st.cmd !== 'gwSetSpeed') return;
        const next = (((st.arg ?? 2) % 3) + 1) as MotorSpeed;
        this.program[slotIndex] = { cmd: 'gwSetSpeed', arg: next };
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

  private add(cmd: GearworksCommandId): void {
    if (this.program.length >= this.maxSlots) return;
    this.program.push(cmd === 'gwSetSpeed' ? { cmd, arg: 2 } : { cmd });
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

  private renderSlots(): void {
    this.slotNodes.forEach((slot, i) => {
      slot.innerHTML = '';
      slot.classList.remove('filled');
      const step = this.program[i];
      if (step !== undefined) {
        slot.classList.add('filled');
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
