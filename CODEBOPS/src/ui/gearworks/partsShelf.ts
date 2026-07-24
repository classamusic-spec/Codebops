/**
 * Parts shelf — the bottom bar for Phase 3 builder levels. No program
 * slots here: the child builds ON the machine (tap anchors in the 3D
 * scene). The shelf shows how many gears/belts are left to place, a big
 * BOP! to run the motor, and a Reset. BOP is ALWAYS armed — running an
 * unfinished machine is encouraged (that's the creative star).
 */
import { el } from '../dom';
import { sharedSfx } from '../../audio/sfx';

export interface PartsShelfEvents {
  onBop: () => void;
  onReset: () => void;
}

export class PartsShelf {
  readonly root: HTMLElement;
  private readonly gearChip: HTMLElement | null = null;
  private readonly beltChip: HTMLElement | null = null;
  private readonly gearCount: HTMLElement | null = null;
  private readonly beltCount: HTMLElement | null = null;
  private bopBtn!: HTMLButtonElement;
  private running = false;

  constructor(
    parent: HTMLElement,
    totals: { gears: number; belts: number },
    private readonly events: PartsShelfEvents,
  ) {
    this.root = el('div', 'bottom-deck', parent);
    const panel = el('div', 'deck-panel gw-shelf', this.root);
    panel.setAttribute('aria-label', 'Machine parts to place');

    if (totals.gears > 0) {
      this.gearChip = el('div', 'gw-part-chip', panel);
      el('span', 'gw-part-ico', this.gearChip, '⚙️');
      el('span', 'gw-part-name', this.gearChip, 'Gears');
      this.gearCount = el('span', 'gw-part-count', this.gearChip, `×${totals.gears}`);
    }
    if (totals.belts > 0) {
      this.beltChip = el('div', 'gw-part-chip', panel);
      el('span', 'gw-part-ico', this.beltChip, '🔗');
      el('span', 'gw-part-name', this.beltChip, 'Belt');
      this.beltCount = el('span', 'gw-part-count', this.beltChip, `×${totals.belts}`);
    }
    el('div', 'gw-shelf-hint', panel, '👆 Tap the glowing spots on the machine!');

    const bopWrap = el('div', 'bop-wrap', this.root);
    this.bopBtn = el('button', 'bop-btn ready', bopWrap) as HTMLButtonElement;
    this.bopBtn.type = 'button';
    this.bopBtn.setAttribute('aria-label', 'BOP! Turn the motor on and test the machine');
    this.bopBtn.append('BOP!');
    el('span', 'tri', this.bopBtn);
    this.bopBtn.addEventListener('click', () => {
      if (this.running) return;
      sharedSfx.play('bop');
      this.events.onBop();
    });

    const tools = el('div', 'deck-tools', this.root);
    const reset = el('button', 'mini-btn', tools, '↩ Reset');
    reset.type = 'button';
    reset.setAttribute('aria-label', 'Take all the parts back off');
    reset.addEventListener('click', () => {
      if (this.running) return;
      sharedSfx.play('remove');
      this.events.onReset();
    });
  }

  /** Update the ×N chips as parts go on/off the machine. */
  setRemaining(remaining: { gears: number; belts: number }): void {
    if (this.gearCount && this.gearChip) {
      this.gearCount.textContent = `×${remaining.gears}`;
      this.gearChip.classList.toggle('depleted', remaining.gears === 0);
    }
    if (this.beltCount && this.beltChip) {
      this.beltCount.textContent = `×${remaining.belts}`;
      this.beltChip.classList.toggle('depleted', remaining.belts === 0);
    }
  }

  setRunning(running: boolean): void {
    this.running = running;
    this.bopBtn.disabled = running;
    this.bopBtn.classList.toggle('ready', !running);
  }
}
