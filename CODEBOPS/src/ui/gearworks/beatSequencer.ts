/**
 * Beat sequencer — Phase 13: Robot Orchestra.
 *
 * A tap-first grid: one row per instrument, one column per beat step.
 * Tap a cell to light it (and hear the note); tap again to clear it.
 * A loop dial cycles ×1–×4, a big BOP plays the whole bar, and Clear
 * wipes the grid. Save/Load persist ONE local song (kid keeps their
 * tune between sittings). All truth lives in beatMachine.ts — this is
 * only the surface.
 */
import { el } from '../dom';
import { sharedSfx } from '../../audio/sfx';
import type { SfxName } from '../../audio/sfx';
import {
  BeatPattern, emptyPattern, toggleCell, BEAT_LOOP_MIN, BEAT_LOOP_MAX,
} from '../../gameplay/gearworks/beatMachine';

export interface SeqTrack {
  readonly id: string;
  readonly label: string;
  readonly emoji: string;
  readonly sound: SfxName;
  readonly color: string;
}

export interface BeatSequencerEvents {
  onPlay: () => void;
  onClear: () => void;
  onChange: () => void;
  onLoops: (loops: number) => void;
  onSave: () => void;
  onLoad: () => void;
}

export class BeatSequencer {
  readonly root: HTMLElement;
  private pattern: BeatPattern;
  private loops = 1;
  private running = false;
  /** cellNodes[trackId][step] → the tappable pad. */
  private readonly cellNodes: Record<string, HTMLElement[]> = {};
  private readonly stepCols: HTMLElement[] = [];
  private playBtn!: HTMLButtonElement;
  private loopBtn!: HTMLButtonElement;
  private loadBtn!: HTMLButtonElement;

  constructor(
    parent: HTMLElement,
    private readonly tracks: readonly SeqTrack[],
    private readonly steps: number,
    private readonly events: BeatSequencerEvents,
  ) {
    this.pattern = emptyPattern(tracks.map((t) => t.id), steps);
    this.root = el('div', 'beat-seq', parent);

    const grid = el('div', 'seq-grid', this.root);
    grid.style.setProperty('--steps', String(steps));
    grid.setAttribute('aria-label', 'Beat grid — tap squares to make music');

    for (const track of this.tracks) {
      const row = el('div', 'seq-row', grid);
      row.style.setProperty('--track', track.color);
      const chip = el('div', 'seq-inst', row);
      el('span', 'si-emoji', chip, track.emoji);
      el('span', 'si-label', chip, track.label);
      const cells = el('div', 'seq-cells', row);
      this.cellNodes[track.id] = [];
      for (let s = 0; s < steps; s++) {
        const cell = el('button', 'seq-cell', cells) as HTMLButtonElement;
        cell.type = 'button';
        cell.dataset.track = track.id;
        cell.dataset.step = String(s);
        cell.setAttribute('aria-label', `${track.label}, beat ${s + 1}`);
        cell.setAttribute('aria-pressed', 'false');
        el('span', 'sc-dot', cell);
        cell.addEventListener('click', () => this.toggle(track, s));
        this.cellNodes[track.id].push(cell);
      }
    }

    // Playhead columns (thin lit bars above the grid during playback).
    const beam = el('div', 'seq-beam', this.root);
    beam.style.setProperty('--steps', String(steps));
    for (let s = 0; s < steps; s++) this.stepCols.push(el('span', 'seq-tick', beam));

    // --- controls ---
    const tools = el('div', 'seq-tools', this.root);

    this.playBtn = el('button', 'bop-btn seq-bop ready', tools) as HTMLButtonElement;
    this.playBtn.type = 'button';
    this.playBtn.setAttribute('aria-label', 'BOP! Play the beat');
    this.playBtn.append('BOP!');
    el('span', 'tri', this.playBtn);
    this.playBtn.addEventListener('click', () => {
      if (this.running) return;
      sharedSfx.play('bop');
      this.events.onPlay();
    });

    this.loopBtn = el('button', 'mini-btn seq-loop', tools) as HTMLButtonElement;
    this.loopBtn.type = 'button';
    this.loopBtn.addEventListener('click', () => this.cycleLoops());
    this.renderLoop();

    const clear = el('button', 'mini-btn seq-clear', tools, '✕ Clear') as HTMLButtonElement;
    clear.type = 'button';
    clear.setAttribute('aria-label', 'Clear the beat');
    clear.addEventListener('click', () => {
      if (this.running) return;
      sharedSfx.play('remove');
      this.pattern = emptyPattern(this.tracks.map((t) => t.id), this.steps);
      this.renderCells();
      this.events.onChange();
      this.events.onClear();
    });

    const save = el('button', 'mini-btn purple seq-save', tools, '💾 Save') as HTMLButtonElement;
    save.type = 'button';
    save.setAttribute('aria-label', 'Save your song');
    save.addEventListener('click', () => { if (!this.running) { sharedSfx.play('star'); this.events.onSave(); } });

    this.loadBtn = el('button', 'mini-btn seq-load', tools, '📂 Load') as HTMLButtonElement;
    this.loadBtn.type = 'button';
    this.loadBtn.setAttribute('aria-label', 'Load your saved song');
    this.loadBtn.addEventListener('click', () => { if (!this.running) { sharedSfx.play('tap'); this.events.onLoad(); } });
  }

  getPattern(): BeatPattern {
    return this.pattern;
  }

  getLoops(): number {
    return this.loops;
  }

  setLoadEnabled(on: boolean): void {
    this.loadBtn.disabled = !on;
    this.loadBtn.classList.toggle('is-off', !on);
  }

  /** Restore a pattern + loop count (starter preload or Load). */
  setPattern(pattern: BeatPattern, loops: number): void {
    this.pattern = pattern;
    this.loops = Math.max(BEAT_LOOP_MIN, Math.min(BEAT_LOOP_MAX, loops));
    this.renderCells();
    this.renderLoop();
    this.events.onChange();
  }

  setRunning(running: boolean): void {
    this.running = running;
    this.root.classList.toggle('running', running);
    this.playBtn.disabled = running;
    this.playBtn.classList.toggle('ready', !running);
    if (!running) this.highlightStep(-1);
  }

  /** Playhead: light the current column, dim the rest. */
  highlightStep(step: number): void {
    this.stepCols.forEach((c, i) => c.classList.toggle('on', i === step));
    for (const track of this.tracks) {
      this.cellNodes[track.id].forEach((cell, i) => cell.classList.toggle('beam', i === step));
    }
  }

  /** Bounce a single lit cell as its note fires. */
  pulseCell(trackId: string, step: number): void {
    const cell = this.cellNodes[trackId]?.[step];
    if (!cell) return;
    cell.classList.remove('hit');
    void cell.offsetWidth;
    cell.classList.add('hit');
    window.setTimeout(() => cell.classList.remove('hit'), 320);
  }

  private toggle(track: SeqTrack, step: number): void {
    if (this.running) return;
    this.pattern = toggleCell(this.pattern, track.id, step);
    const on = this.pattern.tracks[track.id]?.[step] ?? false;
    const cell = this.cellNodes[track.id][step];
    cell.classList.toggle('on', on);
    cell.setAttribute('aria-pressed', on ? 'true' : 'false');
    if (on) { sharedSfx.play(track.sound); this.pulseCell(track.id, step); }
    else sharedSfx.play('remove');
    this.events.onChange();
  }

  private cycleLoops(): void {
    if (this.running) return;
    this.loops = this.loops >= BEAT_LOOP_MAX ? BEAT_LOOP_MIN : this.loops + 1;
    sharedSfx.play('tap');
    this.renderLoop();
    this.events.onLoops(this.loops);
    this.events.onChange();
  }

  private renderLoop(): void {
    this.loopBtn.textContent = `🔁 ×${this.loops}`;
    this.loopBtn.setAttribute('aria-label', `Loop the beat ${this.loops} time${this.loops === 1 ? '' : 's'} — tap to change`);
    this.loopBtn.classList.toggle('looping', this.loops >= 2);
  }

  private renderCells(): void {
    for (const track of this.tracks) {
      const row = this.pattern.tracks[track.id] ?? [];
      this.cellNodes[track.id].forEach((cell, s) => {
        const on = row[s] ?? false;
        cell.classList.toggle('on', on);
        cell.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }
  }
}
