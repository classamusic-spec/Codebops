/**
 * Parallel deck — Phase 10. TWO stacked program lanes (Packer, Mailer),
 * each with its own tray and slots, plus one shared BOP that runs both
 * at once. Tap a lane's tray tile to add a step to THAT lane; tap a
 * slot to remove. The Repeat tile carries a ×n badge (same tap-cycle as
 * everywhere else). During playback highlightStep() lights the running
 * tile in a lane and flashSignal() pulses a tile when a signal passes —
 * the dependency made visible.
 */
import { el } from '../dom';
import { sharedSfx } from '../../audio/sfx';
import type { SignalCommandId, SignalStep, SignalLaneId } from '../../gameplay/gearworks/signalMachine';
import type { GwTileDef } from '../../data/gearworks/world';

export interface LaneSpec {
  readonly id: SignalLaneId;
  readonly name: string;
  readonly icon: string;
  readonly commands: readonly SignalCommandId[];
  readonly maxSlots: number;
}

export interface ParallelDeckEvents {
  onBop: () => void;
  onClear: () => void;
}

const REPEAT_SPEC = { min: 2, max: 4, def: 2 };

class Lane {
  readonly program: SignalStep[] = [];
  readonly slotNodes: HTMLElement[] = [];
  lastPlaced = -1;

  constructor(
    readonly spec: LaneSpec,
    private readonly tiles: Readonly<Record<string, GwTileDef>>,
    private readonly host: { running: boolean; emit(): void },
  ) {}

  render(root: HTMLElement): void {
    const lane = el('div', `gw-lane gw-lane-${this.spec.id}`, root);
    const label = el('div', 'gw-lane-label', lane);
    el('span', 'gw-lane-icon', label, this.spec.icon);
    el('span', 'gw-lane-name', label, this.spec.name);
    const body = el('div', 'gw-lane-body', lane);
    const tray = el('div', 'deck-tray gw-lane-tray', body);
    for (const cmd of this.spec.commands) tray.appendChild(this.makeTile(cmd, 'tray', -1));
    el('div', 'deck-divider', body);
    const seq = el('div', 'deck-sequence gw-lane-seq', body);
    seq.setAttribute('aria-label', `${this.spec.name} program`);
    for (let i = 0; i < this.spec.maxSlots; i++) {
      const slot = el('div', 'slot', seq);
      this.slotNodes.push(slot);
    }
    this.renderSlots();
  }

  setProgram(steps: readonly SignalStep[]): void {
    this.program.length = 0;
    for (const st of steps.slice(0, this.spec.maxSlots)) this.program.push({ ...st });
    this.lastPlaced = -1; // a prefilled lane does not pop in
    this.renderSlots();
  }

  getProgram(): SignalStep[] {
    return this.program.map((s) => ({ ...s }));
  }

  highlightStep(index: number): void {
    this.slotNodes.forEach((s, i) => s.classList.toggle('running', i === index));
  }

  flashSignal(index: number): void {
    const slot = this.slotNodes[index];
    if (!slot) return;
    slot.classList.remove('sig-flash');
    void slot.offsetWidth;
    slot.classList.add('sig-flash');
    window.setTimeout(() => slot.classList.remove('sig-flash'), 900);
  }

  setIterBadge(index: number, text: string | null): void {
    const badge = this.slotNodes[index]?.querySelector('.count-badge');
    if (!badge) return;
    if (text !== null) { badge.textContent = text; badge.classList.add('looping'); }
    else { const st = this.program[index]; badge.textContent = `×${st?.arg ?? ''}`; badge.classList.remove('looping'); }
  }

  clearHighlights(): void {
    this.slotNodes.forEach((s) => { s.classList.remove('running'); s.querySelector('.count-badge')?.classList.remove('looping'); });
    this.program.forEach((step, i) => {
      const badge = this.slotNodes[i]?.querySelector('.count-badge');
      if (badge && step.arg !== undefined) badge.textContent = `×${step.arg}`;
    });
  }

  private makeTile(cmd: SignalCommandId, kind: 'tray' | 'slot', slotIndex: number): HTMLElement {
    const def = this.tiles[cmd];
    const tile = el('button', 'tile gw-tile gw-lane-tile') as HTMLButtonElement;
    tile.type = 'button';
    tile.dataset.gwTone = def.tone;
    tile.setAttribute('aria-label', kind === 'tray' ? `Add to ${this.spec.name}: ${def.spoken}` : `${def.spoken}. Tap to remove.`);
    el('span', 'sheen', tile);
    const ico = el('span', 'ico', tile);
    ico.innerHTML = `<svg class="cmd-ico" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">${def.icon}</svg>`;
    el('span', 'lbl', tile, def.label);
    if (cmd === 'sgRepeat' && kind === 'slot') {
      const step = this.program[slotIndex];
      const badge = el('span', 'count-badge', tile, `×${step?.arg ?? REPEAT_SPEC.def}`);
      badge.setAttribute('role', 'button');
      badge.setAttribute('aria-label', 'How many times the loop repeats: 2, 3, or 4');
      badge.addEventListener('pointerdown', (e) => e.stopPropagation());
      badge.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.host.running) return;
        const st = this.program[slotIndex];
        if (!st || st.cmd !== 'sgRepeat') return;
        const cur = st.arg ?? REPEAT_SPEC.def;
        const next = cur >= REPEAT_SPEC.max ? REPEAT_SPEC.min : cur + 1;
        this.program[slotIndex] = { cmd: 'sgRepeat', arg: next };
        badge.textContent = `×${next}`;
        sharedSfx.play('tap');
        this.host.emit();
      });
    }
    tile.addEventListener('click', () => {
      if (this.host.running) return;
      if (kind === 'tray') this.add(cmd);
      else this.removeAt(slotIndex);
    });
    return tile;
  }

  private add(cmd: SignalCommandId): void {
    if (this.program.length >= this.spec.maxSlots) return;
    this.program.push(cmd === 'sgRepeat' ? { cmd, arg: REPEAT_SPEC.def } : { cmd });
    this.lastPlaced = this.program.length - 1;
    sharedSfx.play('place');
    this.renderSlots();
    this.host.emit();
  }

  private removeAt(index: number): void {
    if (index < 0 || index >= this.program.length) return;
    this.program.splice(index, 1);
    this.lastPlaced = -1;
    sharedSfx.play('remove');
    this.renderSlots();
    this.host.emit();
  }

  private loopBody(): Set<number> {
    const body = new Set<number>();
    for (let i = 0; i < this.program.length; i++) {
      if (this.program[i].cmd !== 'sgRepeat') continue;
      for (let j = i - 1; j >= 0 && this.program[j].cmd !== 'sgRepeat'; j--) body.add(j);
    }
    return body;
  }

  renderSlots(): void {
    const inLoop = this.loopBody();
    this.slotNodes.forEach((slot, i) => {
      slot.innerHTML = '';
      slot.classList.remove('filled', 'in-loop');
      const step = this.program[i];
      if (step) {
        slot.classList.add('filled');
        if (inLoop.has(i)) slot.classList.add('in-loop');
        el('span', 'num', slot, String(i + 1));
        const tile = this.makeTile(step.cmd, 'slot', i);
        if (i === this.lastPlaced) tile.classList.add('fresh');
        slot.appendChild(tile);
      }
    });
  }

  clear(): void {
    this.program.length = 0;
    this.lastPlaced = -1;
    this.renderSlots();
  }
}

export class ParallelDeck {
  readonly root: HTMLElement;
  private readonly lanes: Record<SignalLaneId, Lane>;
  private bopBtn!: HTMLButtonElement;
  running = false;

  constructor(
    parent: HTMLElement,
    laneSpecs: { packer: LaneSpec; mailer: LaneSpec },
    tiles: Readonly<Record<string, GwTileDef>>,
    private readonly events: ParallelDeckEvents,
    private readonly onChange: () => void,
  ) {
    this.root = el('div', 'bottom-deck gw-parallel', parent);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    const host = { get running() { return self.running; }, emit: () => self.changed() };
    this.lanes = {
      packer: new Lane(laneSpecs.packer, tiles, host),
      mailer: new Lane(laneSpecs.mailer, tiles, host),
    };
    const lanesWrap = el('div', 'gw-lanes', this.root);
    this.lanes.packer.render(lanesWrap);
    this.lanes.mailer.render(lanesWrap);

    const bopWrap = el('div', 'bop-wrap', this.root);
    this.bopBtn = el('button', 'bop-btn', bopWrap) as HTMLButtonElement;
    this.bopBtn.type = 'button';
    this.bopBtn.setAttribute('aria-label', 'BOP! Run both machines together');
    this.bopBtn.append('BOP!');
    el('span', 'tri', this.bopBtn);
    this.bopBtn.addEventListener('click', () => {
      if (this.running || this.isEmpty()) return;
      sharedSfx.play('bop');
      this.events.onBop();
    });

    const tools = el('div', 'deck-tools', this.root);
    const clear = el('button', 'mini-btn', tools, '✕ Clear');
    clear.type = 'button';
    clear.addEventListener('click', () => {
      if (this.running) return;
      sharedSfx.play('remove');
      this.lanes.packer.clear();
      this.lanes.mailer.clear();
      this.onChange();
      this.events.onClear();
    });

    this.refreshBop();
  }

  /** Preload both lanes (a debug/guide level ships part of the plan). */
  setPrograms(programs: { packer?: readonly SignalStep[]; mailer?: readonly SignalStep[] }): void {
    if (programs.packer) this.lanes.packer.setProgram(programs.packer);
    if (programs.mailer) this.lanes.mailer.setProgram(programs.mailer);
    this.refreshBop();
    this.onChange();
  }

  private changed(): void {
    this.refreshBop();
    this.onChange();
  }

  private isEmpty(): boolean {
    return this.lanes.packer.getProgram().length === 0 && this.lanes.mailer.getProgram().length === 0;
  }

  getPrograms(): { packer: SignalStep[]; mailer: SignalStep[] } {
    return { packer: this.lanes.packer.getProgram(), mailer: this.lanes.mailer.getProgram() };
  }

  setRunning(running: boolean): void {
    this.running = running;
    this.bopBtn.disabled = running;
    this.refreshBop();
    if (!running) { this.lanes.packer.clearHighlights(); this.lanes.mailer.clearHighlights(); }
  }

  highlightStep(lane: SignalLaneId, index: number): void { this.lanes[lane].highlightStep(index); }
  flashSignal(lane: SignalLaneId, index: number): void { this.lanes[lane].flashSignal(index); }
  setIterBadge(lane: SignalLaneId, index: number, text: string | null): void { this.lanes[lane].setIterBadge(index, text); }

  private refreshBop(): void {
    this.bopBtn.classList.toggle('ready', !this.isEmpty() && !this.running);
    this.bopBtn.classList.toggle('empty', this.isEmpty());
  }
}
