/**
 * Imagination Island — the level creator. Kids paint a 5×3 meadow:
 * berries, star pads, bushes, and Zip's start — then play their own
 * creation or save it for the family to try.
 */
import { el } from '../ui/dom';
import { editorLevel, saveCustomLevel } from '../storage/customLevels';
import type { LevelDef } from '../data/schemas/level';
import { showToast } from '../ui/dialogs';
import { sharedSfx } from '../audio/sfx';
import { backButton } from '../ui/components/button';

type CellKind = 'empty' | 'item' | 'goal' | 'blocked' | 'start';

const COLS = 5;
const ROWS = 3;
const CYCLE: CellKind[] = ['empty', 'item', 'goal', 'blocked', 'start'];
const GLYPH: Record<CellKind, string> = {
  empty: '', item: '🍓', goal: '⭐', blocked: '🌳', start: '🐰',
};
const HINT: Record<CellKind, string> = {
  empty: 'tap to place a berry 🍓',
  item: 'a berry! next: a star pad ⭐',
  goal: 'a star pad! next: a bush 🌳',
  blocked: 'a bush! next: Zip’s start 🐰',
  start: 'Zip starts here! next: clear the tile',
};

export class EditorScreen {
  private cells: CellKind[][] = [];
  private cellEls: HTMLButtonElement[][] = [];
  private readonly sfx = sharedSfx;

  constructor(
    private readonly root: HTMLElement,
    private readonly events: {
      onBack: () => void;
      onPlay: (level: LevelDef) => void;
      onSaved: () => void;
    },
  ) {
    // Fresh canvas: Zip at the left edge, one berry, one pad
    this.cells = Array.from({ length: ROWS }, () => Array<CellKind>(COLS).fill('empty'));
    this.cells[1][0] = 'start';
    this.cells[1][2] = 'item';
    this.cells[1][4] = 'goal';
  }

  private buildLevel(): { level?: LevelDef; error?: string } {
    let start: { col: number; row: number } | null = null;
    const blocked: Array<{ col: number; row: number }> = [];
    const items: Array<{ col: number; row: number }> = [];
    const goals: Array<{ col: number; row: number }> = [];
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const k = this.cells[row][col];
        if (k === 'start') start = { col, row };
        if (k === 'blocked') blocked.push({ col, row });
        if (k === 'item') items.push({ col, row });
        if (k === 'goal') goals.push({ col, row });
      }
    }
    if (!start) return { error: 'Place Zip’s start tile 🐰 first!' };
    if (items.length === 0) return { error: 'Add at least one berry 🍓 to collect!' };
    if (goals.length === 0) return { error: 'Add a star pad ⭐ to deliver to!' };
    const count = this.cells.flat().filter((c) => c !== 'empty').length;
    return { level: editorLevel(`My Island #${count}`, start, blocked, items, goals) };
  }

  enter(): void {
    const screen = this.root;
    screen.classList.add('editor-screen');

    const header = el('div', 'select-header editor-header', screen);
    backButton(header, () => { this.events.onBack(); }, 'Back to levels');
    el('h1', undefined, header, '🏝️ Imagination Island');

    el('div', 'editor-tip', screen, 'Tap a tile to change what lives there!');

    // The paintable grid
    const grid = el('div', 'editor-grid', screen);
    for (let row = 0; row < ROWS; row++) {
      const rowEl = el('div', 'editor-row', grid);
      this.cellEls[row] = [];
      for (let col = 0; col < COLS; col++) {
        const cell = el('button', 'editor-cell', rowEl) as HTMLButtonElement;
        cell.type = 'button';
        cell.setAttribute('aria-label', `Tile ${col + 1},${row + 1}`);
        cell.addEventListener('click', () => this.cycleCell(row, col, cell));
        this.cellEls[row][col] = cell;
        this.paintCell(row, col);
      }
    }

    const hint = el('div', 'editor-hint', screen, '');

    // Actions
    const actions = el('div', 'editor-actions', screen);
    const clear = el('button', 'mini-btn', actions, '🧹 Clear');
    clear.type = 'button';
    clear.addEventListener('click', () => {
      this.cells = Array.from({ length: ROWS }, () => Array<CellKind>(COLS).fill('empty'));
      this.cells[1][0] = 'start';
      for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) this.paintCell(r, c);
      this.sfx.play('tap');
    });
    const save = el('button', 'mini-btn', actions, '💾 Save');
    save.type = 'button';
    save.addEventListener('click', () => {
      const { level, error } = this.buildLevel();
      if (error || !level) { showToast(screen, `Oops — ${error}`); this.sfx.play('bump'); return; }
      saveCustomLevel(level);
      this.sfx.play('celebrate');
      showToast(screen, 'Saved! Find it on Imagination Island 💾');
      this.events.onSaved();
    });
    const play = el('button', 'bop-btn editor-play', actions);
    play.type = 'button';
    play.append('TEST IT!');
    el('span', 'tri', play);
    play.addEventListener('click', () => {
      const { level, error } = this.buildLevel();
      if (error || !level) { showToast(screen, `Oops — ${error}`); this.sfx.play('bump'); return; }
      this.events.onPlay(level);
    });

    // keep the hint element referenced
    this.hintEl = hint;
  }

  private hintEl: HTMLElement | null = null;

  private cycleCell(row: number, col: number, btn: HTMLButtonElement): void {
    const cur = this.cells[row][col];
    const next = CYCLE[(CYCLE.indexOf(cur) + 1) % CYCLE.length];
    // Only one start allowed: placing a new one clears the old
    if (next === 'start') {
      for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
        if (this.cells[r][c] === 'start') { this.cells[r][c] = 'empty'; this.paintCell(r, c); }
      }
    }
    this.cells[row][col] = next;
    this.paintCell(row, col);
    this.sfx.play('tap');
    btn.classList.remove('pop');
    void btn.offsetWidth;
    btn.classList.add('pop');
    if (this.hintEl) this.hintEl.textContent = HINT[next];
  }

  private paintCell(row: number, col: number): void {
    const btn = this.cellEls[row][col];
    if (!btn) return;
    const kind = this.cells[row][col];
    btn.dataset.kind = kind;
    btn.textContent = GLYPH[kind];
  }

  dispose(): void { /* nothing persistent to clean */ }
}
