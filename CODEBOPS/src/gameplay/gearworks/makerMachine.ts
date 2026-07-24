/**
 * Maker machine interpreter — Phase 18: Maker Workshop (parameters).
 *
 * Pure TypeScript, zero THREE/DOM imports. The maker builds ONE gadget,
 * MAKE, whose body has an INPUT dial. In the body, REPEAT (input) repeats
 * the tiles before it as many times as the input says. Then the main
 * program CALLS the gadget with different numbers — MAKE 3, MAKE 1,
 * MAKE 2 — and the same gadget builds different towers. That is the big
 * idea of this phase: one function, many inputs, many results.
 */

export type MkBodyId = 'mkPlace' | 'mkRepeatParam';
export interface MkBodyStep {
  cmd: MkBodyId;
}

export interface MkCall {
  /** The number handed to the gadget for this call (tower height dial). */
  arg: number;
}

export const MK_ARG_MIN = 1;
export const MK_ARG_MAX = 4;

/** Run the gadget body with a given input; returns how many blocks it placed. */
export function runGadget(body: readonly MkBodyStep[], input: number): number {
  // Expand the block-before REPEAT(input) into a flat list of places.
  let blocks = 0;
  let blockStart = 0;
  const prims: 'place'[] = [];
  for (let i = 0; i < body.length; i++) {
    if (body[i].cmd === 'mkRepeatParam') {
      const seg = prims.slice(blockStart);
      if (seg.length === 0) continue; // empty loop
      const n = Math.max(0, Math.floor(input));
      for (let k = 1; k < n; k++) for (const s of seg) prims.push(s);
      // input of 0 removes the single pass too
      if (n === 0) prims.length = blockStart;
      blockStart = prims.length;
    } else {
      prims.push('place');
    }
  }
  blocks = prims.length;
  return blocks;
}

/** Does the gadget body actually read its input dial? */
export function gadgetUsesParam(body: readonly MkBodyStep[]): boolean {
  // a REPEAT(input) with something before it genuinely uses the input
  let hasPlaceBefore = false;
  for (const s of body) {
    if (s.cmd === 'mkPlace') hasPlaceBefore = true;
    else if (s.cmd === 'mkRepeatParam' && hasPlaceBefore) return true;
  }
  return false;
}

export interface MakerGoal {
  /** Target tower heights, left to right. */
  readonly target: readonly number[];
}

export type MkEvent =
  | { type: 'callStart'; index: number; input: number; tower: number }
  | { type: 'place'; tower: number; block: number }
  | { type: 'towerDone'; tower: number; height: number; want: number; correct: boolean }
  | { type: 'done' };

export interface MakerResult {
  readonly events: readonly MkEvent[];
  readonly towers: readonly number[];
  readonly match: boolean;
  readonly usesParam: boolean;
  readonly callCount: number;
}

export function runMaker(
  body: readonly MkBodyStep[],
  main: readonly MkCall[],
  goal: MakerGoal,
): MakerResult {
  const events: MkEvent[] = [];
  const towers: number[] = [];

  main.forEach((call, index) => {
    const tower = index;
    events.push({ type: 'callStart', index, input: call.arg, tower });
    const height = runGadget(body, call.arg);
    for (let b = 1; b <= height; b++) events.push({ type: 'place', tower, block: b });
    const want = goal.target[tower] ?? -1;
    towers.push(height);
    events.push({ type: 'towerDone', tower, height, want, correct: height === want });
  });
  events.push({ type: 'done' });

  const match = towers.length === goal.target.length && towers.every((h, i) => h === goal.target[i]);
  return { events, towers, match, usesParam: gadgetUsesParam(body), callCount: main.length };
}

/** Kid-facing near-miss report. */
export function makerMisses(
  body: readonly MkBodyStep[],
  main: readonly MkCall[],
  goal: MakerGoal,
): string[] {
  const r = runMaker(body, main, goal);
  const misses: string[] = [];
  if (body.length === 0) misses.push('Your MAKE gadget is empty — add a PLACE, then REPEAT the input!');
  if (main.length === 0) misses.push('Call your gadget! Add a MAKE tile and set its number dial.');
  if (r.towers.length !== goal.target.length) {
    misses.push(r.towers.length < goal.target.length
      ? `You built ${r.towers.length} tower${r.towers.length === 1 ? '' : 's'}, but the skyline needs ${goal.target.length} — add more MAKE calls.`
      : `Too many towers — the skyline needs just ${goal.target.length}.`);
  }
  r.towers.forEach((h, i) => {
    const want = goal.target[i];
    if (want !== undefined && h !== want) {
      misses.push(`Tower ${i + 1} is ${h} tall but should be ${want} — set that MAKE's dial to ${want}${r.usesParam ? '' : ', and make your gadget REPEAT the input!'}.`);
    }
  });
  if (!r.usesParam && main.length > 0) {
    misses.push('Your gadget ignores its input — add REPEAT (input) so MAKE builds different sizes!');
  }
  if (misses.length > 3) return [...misses.slice(0, 3), `…and a bit more.`];
  return misses;
}
