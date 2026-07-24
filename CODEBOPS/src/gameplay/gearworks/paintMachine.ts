/**
 * Paint machine interpreter — Phase 16: Paint Parade (nested loops).
 *
 * Pure TypeScript, zero THREE/DOM imports. A paint robot stamps coloured
 * dots on a banner grid. The big idea of this phase is a LOOP INSIDE A
 * LOOP: an inner "repeat row" stamps a line of dots, and an outer
 * "repeat parade" repeats the whole design down the banner.
 *
 * The app-wide block-before REPEAT can't nest, so the two loops take
 * different scopes — clear and tap-friendly:
 *  - REPEAT ROW (inner)     repeats the tiles since the last loop (a row).
 *  - REPEAT PARADE (outer)  repeats EVERYTHING before it (the whole
 *                           design so far) — wrapping the inner loop.
 *
 * Example — a 3×2 grid:
 *   STAMP, STEP, REPEAT ROW ×3, NEW ROW, REPEAT PARADE ×2
 *   → row of 3 dots, then that whole row repeated for 2 rows.
 */

export type PpCommandId = 'ppStamp' | 'ppStep' | 'ppNewRow' | 'ppRepeatRow' | 'ppRepeatParade';

export interface PpStep {
  cmd: PpCommandId;
  /** Repeat count (2–4) for the loop tiles. */
  arg?: number;
}

export const PP_REPEAT_MIN = 2;
export const PP_REPEAT_MAX = 4;

/** Parade colours — dots cycle through the rainbow as they are stamped. */
export const PP_PALETTE = ['#ff5a7a', '#ffb43e', '#ffe14a', '#8be04a', '#3ec6ff', '#c79bff'];

export interface PaintGoal {
  readonly cols: number;
  readonly rows: number;
}

interface Prim {
  readonly cmd: 'ppStamp' | 'ppStep' | 'ppNewRow';
  readonly source: number;
}

const clampCount = (n: number | undefined): number =>
  Math.min(PP_REPEAT_MAX, Math.max(PP_REPEAT_MIN, n ?? PP_REPEAT_MIN));

interface ExpandResult {
  readonly prims: Prim[];
  readonly usedRowLoop: boolean;
  readonly usedParadeLoop: boolean;
  readonly emptyLoop: boolean;
}

/** Flatten the program into a primitive stamp/step/new-row stream. */
export function expandPaint(program: readonly PpStep[]): ExpandResult {
  const prims: Prim[] = [];
  let blockStart = 0;
  let usedRowLoop = false;
  let usedParadeLoop = false;
  let emptyLoop = false;

  for (let i = 0; i < program.length; i++) {
    const s = program[i];
    if (s.cmd === 'ppRepeatRow') {
      const body = prims.slice(blockStart);
      if (body.length === 0) { emptyLoop = true; continue; }
      usedRowLoop = true;
      const n = clampCount(s.arg);
      for (let k = 1; k < n; k++) for (const b of body) prims.push(b);
      blockStart = prims.length;
    } else if (s.cmd === 'ppRepeatParade') {
      const body = prims.slice(0);
      if (body.length === 0) { emptyLoop = true; continue; }
      usedParadeLoop = true;
      const m = clampCount(s.arg);
      for (let k = 1; k < m; k++) for (const b of body) prims.push(b);
      blockStart = prims.length;
    } else {
      prims.push({ cmd: s.cmd, source: i });
    }
  }
  return { prims, usedRowLoop, usedParadeLoop, emptyLoop };
}

export type PpEvent =
  | { type: 'stamp'; col: number; row: number; colorIndex: number; source: number }
  | { type: 'strayStamp'; source: number }
  | { type: 'step'; col: number; source: number }
  | { type: 'newRow'; row: number; source: number }
  | { type: 'done' };

export interface PpResult {
  readonly events: readonly PpEvent[];
  /** "col,row" keys of every painted cell. */
  readonly painted: ReadonlySet<string>;
  readonly strayCount: number;
  readonly usedRowLoop: boolean;
  readonly usedParadeLoop: boolean;
  readonly filledTarget: boolean;
  readonly success: boolean;
}

export const cellKey = (col: number, row: number): string => `${col},${row}`;

export function runPaint(program: readonly PpStep[], goal: PaintGoal): PpResult {
  const { prims, usedRowLoop, usedParadeLoop } = expandPaint(program);
  const events: PpEvent[] = [];
  const painted = new Set<string>();
  let col = 0;
  let row = 0;
  let stampCount = 0;
  let strayCount = 0;

  for (const p of prims) {
    switch (p.cmd) {
      case 'ppStamp':
        if (col >= 0 && col < goal.cols && row >= 0 && row < goal.rows) {
          const colorIndex = stampCount % PP_PALETTE.length;
          painted.add(cellKey(col, row));
          events.push({ type: 'stamp', col, row, colorIndex, source: p.source });
          stampCount++;
        } else {
          strayCount++;
          events.push({ type: 'strayStamp', source: p.source });
        }
        break;
      case 'ppStep':
        col++;
        events.push({ type: 'step', col, source: p.source });
        break;
      case 'ppNewRow':
        row++; col = 0;
        events.push({ type: 'newRow', row, source: p.source });
        break;
    }
  }
  events.push({ type: 'done' });

  // filled the whole rectangle, and painted nothing off-grid
  let filledTarget = true;
  for (let r = 0; r < goal.rows; r++) {
    for (let c = 0; c < goal.cols; c++) {
      if (!painted.has(cellKey(c, r))) { filledTarget = false; break; }
    }
    if (!filledTarget) break;
  }
  const success = filledTarget && strayCount === 0 && goal.cols > 0 && goal.rows > 0;
  return { events, painted, strayCount, usedRowLoop, usedParadeLoop, filledTarget, success };
}

/** Kid-facing near-miss report. */
export function paintMisses(program: readonly PpStep[], goal: PaintGoal): string[] {
  const r = runPaint(program, goal);
  const misses: string[] = [];
  const missing = goal.cols * goal.rows - [...r.painted].filter((k) => {
    const [c, rr] = k.split(',').map(Number);
    return c < goal.cols && rr < goal.rows;
  }).length;
  if (r.strayCount > 0) {
    misses.push(`Some dots landed off the banner — a loop counted too high! Tap a Repeat badge down.`);
  }
  if (missing > 0) {
    misses.push(missing >= goal.cols * goal.rows
      ? 'The banner is still blank — STAMP a dot, then loop it!'
      : `${missing} more dot${missing === 1 ? '' : 's'} to go — does your loop repeat enough? Nest a REPEAT PARADE to fill every row!`);
  }
  if (expandPaint(program).emptyLoop) {
    misses.push('A Repeat had nothing before it to repeat — put some tiles first!');
  }
  if (misses.length > 3) return [...misses.slice(0, 3), `…and a bit more.`];
  return misses;
}
