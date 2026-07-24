/**
 * Loop machine interpreter — Phase 4: loops and lifts.
 *
 * Pure TypeScript, zero THREE/DOM imports. Drives two toy machines:
 *
 *   'gearBell' — a crank gear that WINDS the bell, and a bell that
 *                spends the wind when rung. Ring without winding =
 *                friendly CLUNK. Teaches sequencing inside a loop.
 *   'lift'     — a platform that rises/lowers one floor per command,
 *                bumping gently at the top/bottom. Teaches counted
 *                loops as machine MOVEMENT (Repeat ×3 → up 3 floors).
 *
 * The Repeat tile uses the SAME convention as the meadow interpreter
 * (gameplay/commands/interpreter.ts): the loop body is every tile
 * since the previous loop tile, and those tiles run INSIDE the loop —
 * [Lift Up, Repeat ×3] rises three floors TOTAL. Keeping one loop
 * model app-wide means the concept transfers between worlds.
 */

export type GwLoopCommandId = 'glTurnGear' | 'glRingBell' | 'glLiftUp' | 'glLiftDown' | 'glRepeat';

export interface GwLoopStep {
  cmd: GwLoopCommandId;
  /** Repeat count (2–4) for 'glRepeat' steps. */
  arg?: number;
}

export type GwLoopMachineKind = 'gearBell' | 'lift';

export interface LoopMachineState {
  /** Crank turns so far (gearBell). */
  readonly gearTurns: number;
  /** Bell has stored power from a gear turn (gearBell only). */
  readonly wound: boolean;
  readonly bellRings: number;
  /** Floor the lift was on at each successful ring. */
  readonly ringFloors: readonly number[];
  /** Rings attempted without power (gearBell). */
  readonly clunks: number;
  readonly floor: number;
  readonly actions: number;
}

export function initialLoopMachine(): LoopMachineState {
  return { gearTurns: 0, wound: false, bellRings: 0, ringFloors: [], clunks: 0, floor: 0, actions: 0 };
}

export type GwLoopEvent =
  | { type: 'commandStart'; index: number }
  | { type: 'gearTurn'; total: number }
  | { type: 'bellRing'; total: number; floor: number }
  | { type: 'bellClunk' }
  | { type: 'liftMove'; dir: 'up' | 'down'; from: number; to: number }
  | { type: 'liftBump'; at: 'top' | 'bottom' }
  | { type: 'loopStart'; index: number; count: number }
  | { type: 'loopIter'; index: number; iter: number; count: number }
  | { type: 'loopEnd'; index: number }
  | { type: 'loopFail'; index: number }
  | { type: 'done' }
  | { type: 'overflow' };

/** Step-limit protection: no plan may take more actions than this. */
export const GL_MAX_ACTIONS = 40;

export const GL_REPEAT_MIN = 2;
export const GL_REPEAT_MAX = 4;

export interface GwLoopGoal {
  /** Ring the bell at least this many times (gearBell). */
  readonly needRings?: number;
  /** Lift world: the top floor of the tower. */
  readonly topFloor?: number;
  /** Require at least one ring while ON the top floor (delivery!). */
  readonly needTopRing?: boolean;
}

export interface GwLoopResult {
  readonly success: boolean;
  readonly events: readonly GwLoopEvent[];
  readonly finalState: LoopMachineState;
  readonly overflowed: boolean;
  /** Did the plan actually use a Repeat tile with a body? */
  readonly usedLoop: boolean;
  /** Actions the machine performed (loop-expanded — the efficiency number). */
  readonly actionsRun: number;
}

export function runLoopMachine(
  program: readonly GwLoopStep[],
  goal: GwLoopGoal,
  machine: GwLoopMachineKind,
): GwLoopResult {
  const top = goal.topFloor ?? 0;
  let s = initialLoopMachine();
  const events: GwLoopEvent[] = [];
  let overflowed = false;
  let usedLoop = false;

  const exec = (cmd: Exclude<GwLoopCommandId, 'glRepeat'>, source: number): void => {
    if (s.actions >= GL_MAX_ACTIONS) return;
    events.push({ type: 'commandStart', index: source });
    switch (cmd) {
      case 'glTurnGear':
        s = { ...s, gearTurns: s.gearTurns + 1, wound: true, actions: s.actions + 1 };
        events.push({ type: 'gearTurn', total: s.gearTurns });
        break;
      case 'glRingBell':
        if (machine === 'gearBell' && !s.wound) {
          s = { ...s, clunks: s.clunks + 1, actions: s.actions + 1 };
          events.push({ type: 'bellClunk' });
        } else {
          s = {
            ...s, wound: false, bellRings: s.bellRings + 1,
            ringFloors: [...s.ringFloors, s.floor], actions: s.actions + 1,
          };
          events.push({ type: 'bellRing', total: s.bellRings, floor: s.floor });
        }
        break;
      case 'glLiftUp':
        if (s.floor >= top) {
          s = { ...s, actions: s.actions + 1 };
          events.push({ type: 'liftBump', at: 'top' });
        } else {
          s = { ...s, floor: s.floor + 1, actions: s.actions + 1 };
          events.push({ type: 'liftMove', dir: 'up', from: s.floor - 1, to: s.floor });
        }
        break;
      case 'glLiftDown':
        if (s.floor <= 0) {
          s = { ...s, actions: s.actions + 1 };
          events.push({ type: 'liftBump', at: 'bottom' });
        } else {
          s = { ...s, floor: s.floor - 1, actions: s.actions + 1 };
          events.push({ type: 'liftMove', dir: 'down', from: s.floor + 1, to: s.floor });
        }
        break;
    }
  };

  /** Loop body = every tile since the previous loop tile (same app-wide rule). */
  const blockBefore = (index: number): Array<{ cmd: Exclude<GwLoopCommandId, 'glRepeat'>; source: number }> => {
    const body: Array<{ cmd: Exclude<GwLoopCommandId, 'glRepeat'>; source: number }> = [];
    for (let j = index - 1; j >= 0; j--) {
      const st = program[j];
      if (st.cmd === 'glRepeat') break;
      body.unshift({ cmd: st.cmd, source: j });
    }
    return body;
  };

  // Body tiles are consumed by their loop tile — they run inside it.
  const consumed = new Set<number>();
  for (let i = 0; i < program.length; i++) {
    if (program[i].cmd === 'glRepeat') {
      for (const b of blockBefore(i)) consumed.add(b.source);
    }
  }

  for (let i = 0; i < program.length; i++) {
    if (s.actions >= GL_MAX_ACTIONS) { overflowed = true; break; }
    if (consumed.has(i)) continue;
    const step = program[i];

    if (step.cmd === 'glRepeat') {
      const body = blockBefore(i);
      if (body.length === 0) {
        events.push({ type: 'loopFail', index: i });
        continue;
      }
      usedLoop = true;
      const count = Math.min(GL_REPEAT_MAX, Math.max(GL_REPEAT_MIN, step.arg ?? GL_REPEAT_MIN));
      events.push({ type: 'loopStart', index: i, count });
      for (let k = 1; k <= count && s.actions < GL_MAX_ACTIONS; k++) {
        events.push({ type: 'loopIter', index: i, iter: k, count });
        for (const b of body) exec(b.cmd, b.source);
      }
      events.push({ type: 'loopEnd', index: i });
      continue;
    }

    exec(step.cmd, i);
  }
  if (s.actions >= GL_MAX_ACTIONS) overflowed = true;

  events.push(overflowed ? { type: 'overflow' } : { type: 'done' });
  return {
    success: loopGoalMet(goal, s),
    events, finalState: s, overflowed, usedLoop, actionsRun: s.actions,
  };
}

export function loopGoalMet(goal: GwLoopGoal, s: LoopMachineState): boolean {
  if (goal.needRings !== undefined && s.bellRings < goal.needRings) return false;
  if (goal.needTopRing && !s.ringFloors.includes(goal.topFloor ?? 0)) return false;
  return true;
}

/** Kid-facing near-miss report (feeds the Think Trail after a miss). */
export function loopGoalMisses(goal: GwLoopGoal, s: LoopMachineState): string[] {
  const misses: string[] = [];
  if (goal.needRings !== undefined && s.bellRings < goal.needRings) {
    misses.push(s.bellRings === 0
      ? 'The bell never rang — it needs a RING BELL after a TURN GEAR!'
      : `The bell rang ${s.bellRings} of ${goal.needRings} times — a Repeat ×${goal.needRings} can do the rest!`);
  }
  if (s.clunks > 0) {
    misses.push('CLUNK! The bell had no power — TURN GEAR winds it up before each ring.');
  }
  if (goal.needTopRing && !s.ringFloors.includes(goal.topFloor ?? 0)) {
    const top = goal.topFloor ?? 0;
    if (s.floor < top && s.bellRings === 0) {
      misses.push(`The lift stopped at floor ${s.floor} — the berries go to floor ${top}!`);
    } else if (s.ringFloors.length > 0) {
      misses.push(`The bell rang on floor ${s.ringFloors[s.ringFloors.length - 1]} — ring it at the TOP (floor ${top})!`);
    } else {
      misses.push(`Ring the bell at the top (floor ${top}) to deliver the berries!`);
    }
  }
  return misses;
}
