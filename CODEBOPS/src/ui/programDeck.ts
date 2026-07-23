/**
 * Program deck — command tray + sequence slots + BOP button.
 * Phase 10: repeat tiles carry a tap-to-cycle count badge (×2/×3/×4),
 * loop-source highlighting, and the floating loop-iteration bubble.
 * Tablet-first: big touch targets, Pointer Events, magnetic tap-to-add,
 * drag & drop with pointer capture, reorder, remove, clear, rewind.
 */
import { el } from './dom';
import { COMMAND_DEFS } from '../data/commands/commandDefs';
import type { CommandId, ProgramStep } from '../gameplay/commands/interpreter';
import type { Sfx } from '../audio/sfx';

export interface ProgramDeckEvents {
  onProgramChange: (program: ProgramStep[]) => void;
  onBop: () => void;
  onRewind: () => void;
}

interface DragState {
  pointerId: number;
  kind: 'tray' | 'slot';
  command: CommandId;
  fromIndex: number;
  ghost: HTMLElement;
  moved: boolean;
  startX: number;
  startY: number;
}

const SIMPLE_COMMANDS: readonly CommandId[] = ['move', 'turnLeft', 'turnRight', 'grab', 'drop'];

export class ProgramDeck {
  readonly root: HTMLElement;
  private program: ProgramStep[] = [];
  private readonly slotNodes: HTMLElement[] = [];
  private bopBtn!: HTMLButtonElement;
  private drag: DragState | null = null;
  private running = false;
  private lastPlaced = -1; // slot index that should play the pop-in animation
  private lastPointerTap = 0;
  private loopBubble: HTMLElement | null = null;
  private condBubble: HTMLElement | null = null;

  constructor(
    parent: HTMLElement,
    commands: readonly CommandId[],
    private readonly maxSlots: number,
    private readonly events: ProgramDeckEvents,
    private readonly sfx: Sfx,
  ) {
    this.root = el('div', 'bottom-deck', parent);

    const panel = el('div', 'deck-panel', this.root);

    // Command inventory tray
    const tray = el('div', 'deck-tray', panel);
    for (const cmd of commands) {
      tray.appendChild(this.makeTile(cmd, 'tray', -1));
    }

    el('div', 'deck-divider', panel);

    // Program sequence slots
    const seq = el('div', 'deck-sequence', panel);
    seq.setAttribute('aria-label', 'Your program');
    for (let i = 0; i < maxSlots; i++) {
      const slot = el('div', 'slot', seq);
      slot.dataset.index = String(i);
      this.slotNodes.push(slot);
    }

    // BOP! + tools
    const bopWrap = el('div', 'bop-wrap', this.root);
    this.bopBtn = el('button', 'bop-btn', bopWrap) as HTMLButtonElement;
    this.bopBtn.type = 'button';
    this.bopBtn.setAttribute('aria-label', 'BOP! Run the program');
    this.bopBtn.append('BOP!');
    el('span', 'tri', this.bopBtn);
    this.bopBtn.addEventListener('click', () => {
      if (this.program.length === 0 || this.running) return;
      this.sfx.play('bop');
      this.events.onBop();
    });
    this.refreshBopState();

    const tools = el('div', 'deck-tools', this.root);
    const rewind = el('button', 'mini-btn purple', tools, '↩ Rewind');
    rewind.type = 'button';
    rewind.setAttribute('aria-label', 'Rewind Zip to the start, keep the plan');
    rewind.addEventListener('click', () => {
      if (this.running) return;
      this.sfx.play('remove');
      this.events.onRewind();
    });
    const clear = el('button', 'mini-btn', tools, '✕ Clear');
    clear.type = 'button';
    clear.setAttribute('aria-label', 'Clear the plan');
    clear.addEventListener('click', () => {
      if (this.running || this.program.length === 0) return;
      this.sfx.play('remove');
      this.program = [];
      this.renderSlots();
      this.emitChange();
    });

    this.renderSlots();
  }

  getProgram(): ProgramStep[] {
    return this.program.map((s) => ({ ...s }));
  }

  setProgram(steps: readonly ProgramStep[]): void {
    this.program = steps.slice(0, this.maxSlots).map((s) => ({ ...s }));
    this.lastPlaced = -1; // prefilled programs don't pop
    this.renderSlots();
    this.emitChange();
  }

  /** BOP glows when there's a plan to run, dims when empty. */
  private refreshBopState(): void {
    const ready = this.program.length > 0 && !this.running;
    this.bopBtn?.classList.toggle('ready', ready);
    this.bopBtn?.classList.toggle('empty', this.program.length === 0);
  }

  setRunning(running: boolean): void {
    this.running = running;
    this.bopBtn.disabled = running;
    this.refreshBopState();
    if (!running) {
      this.clearRunningHighlight();
      this.clearLoopBubble();
      this.clearCondBubble();
    }
  }

  highlightSlot(index: number, loopIter?: { k: number; n: number | '∞' }): void {
    this.slotNodes.forEach((s, i) => s.classList.toggle('running', i === index));
    this.clearCondBubble();
    if (loopIter) this.showLoopBubble(index, loopIter.k, loopIter.n);
  }

  markLoopSource(indices: number[]): void {
    this.slotNodes.forEach((s, i) => s.classList.toggle('loop-src', indices.includes(i)));
  }

  clearRunningHighlight(): void {
    this.slotNodes.forEach((s) => s.classList.remove('running', 'loop-src'));
  }

  showLoopBubble(slotIndex: number, k: number, n: number | '∞'): void {
    this.clearLoopBubble();
    const slot = this.slotNodes[slotIndex];
    if (!slot) return;
    this.loopBubble = el('div', 'loop-bubble', slot, n === '∞' ? `loop ${k}…` : `${k} of ${n}`);
  }

  clearLoopBubble(): void {
    this.loopBubble?.remove();
    this.loopBubble = null;
  }

  /** "🌸 ✓" / "🌸 ✗" bubble over an IF slot while a condition is checked. */
  showCondBubble(slotIndex: number, emoji: string, ok: boolean): void {
    this.clearCondBubble();
    const slot = this.slotNodes[slotIndex];
    if (!slot) return;
    this.condBubble = el('div', `loop-bubble cond-bubble ${ok ? 'ok' : 'no'}`, slot, `${emoji} ${ok ? '✓' : '✗'}`);
  }

  clearCondBubble(): void {
    this.condBubble?.remove();
    this.condBubble = null;
  }

  /** Briefly dim a slot whose command was skipped by a failed IF. */
  flashSkipped(index: number): void {
    const slot = this.slotNodes[index];
    if (!slot) return;
    slot.classList.add('skipped');
    window.setTimeout(() => slot.classList.remove('skipped'), 650);
  }

  // ---------- tiles & slots ----------

  private makeTile(cmd: CommandId, kind: 'tray' | 'slot', slotIndex: number): HTMLElement {
    const def = COMMAND_DEFS[cmd];
    const tile = el('button', 'tile') as HTMLButtonElement;
    tile.type = 'button';
    tile.dataset.cmd = cmd;
    tile.setAttribute('aria-label', kind === 'tray' ? `Add command: ${def.spoken}` : `Step ${slotIndex + 1}: ${def.spoken}. Tap to remove.`);
    el('span', 'ico', tile, def.icon);
    el('span', 'lbl', tile, def.label);

    // Repeat count badge (slot tiles only): tap to cycle ×2 → ×3 → ×4
    if (cmd === 'repeat' && kind === 'slot') {
      const step = this.program[slotIndex];
      const badge = el('span', 'count-badge', tile, `×${step?.arg ?? 2}`);
      badge.setAttribute('role', 'button');
      badge.setAttribute('aria-label', 'Change repeat count');
      const cycle = (e: Event): void => {
        e.stopPropagation();
        if (this.running) return;
        const st = this.program[slotIndex];
        if (!st || st.cmd !== 'repeat') return;
        const next = (st.arg ?? 2) >= 4 ? 2 : (st.arg ?? 2) + 1; // 2→3→4→2
        this.program[slotIndex] = { cmd: 'repeat', arg: next };
        badge.textContent = `×${next}`;
        this.sfx.play('tap');
        this.emitChange();
      };
      badge.addEventListener('pointerdown', (e) => e.stopPropagation());
      badge.addEventListener('click', cycle);
    }

    tile.addEventListener('pointerdown', (e) => this.onPointerDown(e, cmd, kind, slotIndex, tile));
    // Click fallback (assistive tech / synthetic clicks): ignored right after a real pointer tap.
    tile.addEventListener('click', () => {
      if (Date.now() - this.lastPointerTap < 450) return;
      if (kind === 'tray') this.addCommand(cmd);
      else this.removeAt(slotIndex);
    });
    tile.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (kind === 'tray') this.addCommand(cmd);
        else this.removeAt(slotIndex);
      }
    });
    return tile;
  }

  private renderSlots(): void {
    this.slotNodes.forEach((slot, i) => {
      slot.innerHTML = '';
      slot.classList.remove('filled', 'drop-hint');
      const step = this.program[i];
      if (step !== undefined) {
        slot.classList.add('filled');
        el('span', 'num', slot, String(i + 1));
        const tile = this.makeTile(step.cmd, 'slot', i);
        if (i === this.lastPlaced) tile.classList.add('fresh');
        slot.appendChild(tile);
      }
    });
    this.refreshBopState();
  }

  private emitChange(): void {
    this.events.onProgramChange(this.getProgram());
  }

  // ---------- editing ----------

  addCommand(cmd: CommandId): void {
    if (this.running || this.program.length >= this.maxSlots) return;
    this.program.push(cmd === 'repeat' ? { cmd, arg: 2 } : { cmd });
    this.lastPlaced = this.program.length - 1;
    this.sfx.play('place');
    this.renderSlots();
    this.emitChange();
  }

  removeAt(index: number): void {
    if (this.running || index < 0 || index >= this.program.length) return;
    this.program.splice(index, 1);
    this.lastPlaced = -1;
    this.sfx.play('remove');
    this.renderSlots();
    this.emitChange();
  }

  private insertAt(cmd: CommandId, index: number): void {
    if (this.program.length >= this.maxSlots) return;
    const at = Math.min(index, this.program.length);
    this.program.splice(at, 0, cmd === 'repeat' ? { cmd, arg: 2 } : { cmd });
    this.lastPlaced = at;
    this.sfx.play('place');
    this.renderSlots();
    this.emitChange();
  }

  // ---------- drag & drop ----------

  private onPointerDown(e: PointerEvent, cmd: CommandId, kind: 'tray' | 'slot', slotIndex: number, tile: HTMLElement): void {
    if (this.running) return;
    e.preventDefault();
    const ghost = tile.cloneNode(true) as HTMLElement;
    ghost.className = 'tile drag-ghost';
    ghost.dataset.cmd = cmd;
    document.body.appendChild(ghost);
    this.positionGhost(ghost, e.clientX, e.clientY);
    this.drag = {
      pointerId: e.pointerId, kind, command: cmd, fromIndex: slotIndex,
      ghost, moved: false, startX: e.clientX, startY: e.clientY,
    };
    tile.setPointerCapture(e.pointerId);
    tile.addEventListener('pointermove', this.onPointerMove);
    tile.addEventListener('pointerup', this.onPointerUp, { once: true });
    tile.addEventListener('pointercancel', this.onPointerCancel, { once: true });
  }

  private positionGhost(ghost: HTMLElement, x: number, y: number): void {
    ghost.style.left = `${x}px`;
    ghost.style.top = `${y}px`;
  }

  private onPointerMove = (e: PointerEvent): void => {
    const drag = this.drag;
    if (!drag || e.pointerId !== drag.pointerId) return;
    const dist = Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY);
    if (dist > 8) drag.moved = true;
    this.positionGhost(drag.ghost, e.clientX, e.clientY);
    const over = this.slotAtPoint(e.clientX, e.clientY);
    this.slotNodes.forEach((s, i) => s.classList.toggle('drop-hint', i === over && drag.moved));
  };

  private onPointerUp = (e: PointerEvent): void => {
    const drag = this.drag;
    if (!drag || e.pointerId !== drag.pointerId) return;
    const target = e.target as HTMLElement;
    target.removeEventListener('pointermove', this.onPointerMove);
    this.endDrag();

    if (!drag.moved) {
      this.lastPointerTap = Date.now();
      if (drag.kind === 'tray') this.addCommand(drag.command);
      else this.removeAt(drag.fromIndex);
      return;
    }
    const over = this.slotAtPoint(e.clientX, e.clientY);
    if (over === -1) return;
    if (drag.kind === 'tray') {
      this.insertAt(drag.command, over);
    } else if (over !== drag.fromIndex) {
      const step = this.program[drag.fromIndex];
      this.program.splice(drag.fromIndex, 1);
      const to = over > drag.fromIndex ? over - 1 : over;
      this.program.splice(Math.min(to, this.program.length), 0, step);
      this.sfx.play('place');
      this.renderSlots();
      this.emitChange();
    }
  };

  private onPointerCancel = (e: PointerEvent): void => {
    if (this.drag && e.pointerId === this.drag.pointerId) {
      (e.target as HTMLElement).removeEventListener('pointermove', this.onPointerMove);
      this.endDrag();
    }
  };

  private endDrag(): void {
    if (!this.drag) return;
    this.drag.ghost.remove();
    this.drag = null;
    this.slotNodes.forEach((s) => s.classList.remove('drop-hint'));
  }

  private slotAtPoint(x: number, y: number): number {
    let best = -1;
    let bestDist = Infinity;
    this.slotNodes.forEach((slot, i) => {
      const r = slot.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const d = Math.hypot(x - cx, y - cy);
      if (d < r.width * 0.95 && d < bestDist) {
        best = i;
        bestDist = d;
      }
    });
    return best;
  }
}

export { SIMPLE_COMMANDS };
