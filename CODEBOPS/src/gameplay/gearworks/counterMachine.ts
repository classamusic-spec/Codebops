/**
 * Counter machine interpreter — Phase 7: variables and safe loops.
 *
 * Pure TypeScript, zero THREE/DOM imports. Two machines:
 *
 *   'counter'  — a berry jar with a COUNTER WHEEL (a variable you can
 *                see). SET VALUE spins the dial straight to a number;
 *                ADD 1 / SUBTRACT 1 nudge it. The value is state: it
 *                remembers, it can go up AND down, and how you reached
 *                a number matters less than the number itself.
 *
 *   'safeStop' — a press that stamps jars in a loop. REPEAT UNTIL FULL
 *                stops the moment the jar counter hits the target — a
 *                safe loop. Plain REPEAT never stops on its own: after
 *                too many turns Forever Fred shows up (the debugging
 *                beat), teaching that every loop needs a stopping rule.
 *
 * The loop body is the tiles before the repeat tile — the same app-wide
 * convention as loopMachine.ts, so the concept transfers.
 */

export type GcCounterCommandId = 'gcSet' | 'gcAdd' | 'gcSub';
export type GcSafeCommandId = 'ssPress' | 'ssRepeat' | 'ssRepeatUntilFull';
export type GcCommandId = GcCounterCommandId | GcSafeCommandId;

export interface GcStep {
  cmd: GcCommandId;
  /** SET VALUE target for gcSet. */
  arg?: number;
}

export type GcMachineKind = 'counter' | 'safeStop';

/** The counter wheel only shows a single friendly digit. */
export const CN_MAX = 9;
/** Jar supply for the press line. */
export const SS_MAX_JARS = 9;
/** Forever Fred wakes up after this many un-stopped loop turns. */
export const SS_RUNAWAY = 12;

// ==================================================================
// counter machine (Berry Counter)
// ==================================================================

export interface CounterGoal {
  readonly target: number;
}

export type GcCounterEvent =
  | { type: 'commandStart'; index: number }
  | { type: 'setValue'; value: number }
  | { type: 'add'; value: number; capped: boolean }
  | { type: 'sub'; value: number; floored: boolean }
  | { type: 'noop'; reason: 'atMax' | 'atZero' }
  | { type: 'done' };

export interface GcCounterResult {
  readonly events: readonly GcCounterEvent[];
  readonly finalValue: number;
  readonly success: boolean;
  /** Did the plan use SET VALUE (vs counting up/down by hand)? */
  readonly usedSet: boolean;
  readonly ops: number;
}

const clampCounter = (n: number): number => Math.max(0, Math.min(CN_MAX, n));

export function runCounter(
  program: readonly GcStep[],
  goal: CounterGoal,
  startValue = 0,
): GcCounterResult {
  let value = clampCounter(startValue);
  let usedSet = false;
  let ops = 0;
  const events: GcCounterEvent[] = [];

  for (let i = 0; i < program.length; i++) {
    const step = program[i];
    events.push({ type: 'commandStart', index: i });
    ops++;
    switch (step.cmd) {
      case 'gcSet':
        usedSet = true;
        value = clampCounter(step.arg ?? 0);
        events.push({ type: 'setValue', value });
        break;
      case 'gcAdd':
        if (value >= CN_MAX) {
          events.push({ type: 'noop', reason: 'atMax' });
        } else {
          value += 1;
          events.push({ type: 'add', value, capped: value >= CN_MAX });
        }
        break;
      case 'gcSub':
        if (value <= 0) {
          events.push({ type: 'noop', reason: 'atZero' });
        } else {
          value -= 1;
          events.push({ type: 'sub', value, floored: value <= 0 });
        }
        break;
      default:
        break;
    }
  }
  events.push({ type: 'done' });
  return { events, finalValue: value, success: value === goal.target, usedSet, ops };
}

export function counterMisses(goal: CounterGoal, finalValue: number): string[] {
  if (finalValue === goal.target) return [];
  if (finalValue < goal.target) {
    return [`The jar shows ${finalValue} — it needs ${goal.target}. Add ${goal.target - finalValue} more (or SET it)!`];
  }
  return [`The jar shows ${finalValue} — that is too many! Take ${finalValue - goal.target} out (or SET it to ${goal.target}).`];
}

// ==================================================================
// safe-stop machine (Safe Stop)
// ==================================================================

export interface SafeGoal {
  readonly target: number;
}

export type GcSafeEvent =
  | { type: 'commandStart'; index: number }
  | { type: 'press'; jars: number; full: boolean }
  | { type: 'loopStart'; index: number; safe: boolean }
  | { type: 'loopIter'; index: number; iter: number; jars: number }
  | { type: 'loopStopped'; index: number; jars: number }
  | { type: 'loopRunaway'; index: number }
  | { type: 'loopFail'; index: number }
  | { type: 'done' }
  | { type: 'overflow' };

export interface GcSafeResult {
  readonly events: readonly GcSafeEvent[];
  readonly finalJars: number;
  readonly success: boolean;
  /** True when a plain REPEAT ran away — the Forever Fred moment. */
  readonly ranaway: boolean;
  /** Did the plan use the safe REPEAT UNTIL FULL loop? */
  readonly usedSafeLoop: boolean;
}

export function runSafeStop(program: readonly GcStep[], goal: SafeGoal): GcSafeResult {
  const target = goal.target;
  let jars = 0;
  let ranaway = false;
  let usedSafeLoop = false;
  const events: GcSafeEvent[] = [];

  const press = (): void => {
    if (jars >= SS_MAX_JARS) {
      events.push({ type: 'press', jars, full: true });
      return;
    }
    jars += 1;
    events.push({ type: 'press', jars, full: jars >= target });
  };

  const isRepeat = (cmd: GcCommandId): boolean => cmd === 'ssRepeat' || cmd === 'ssRepeatUntilFull';

  /** Body = every tile since the previous repeat tile (app-wide rule). */
  const blockBefore = (index: number): GcStep[] => {
    const body: GcStep[] = [];
    for (let j = index - 1; j >= 0; j--) {
      if (isRepeat(program[j].cmd)) break;
      body.unshift(program[j]);
    }
    return body;
  };

  const consumed = new Set<number>();
  for (let i = 0; i < program.length; i++) {
    if (isRepeat(program[i].cmd)) {
      for (let j = i - 1; j >= 0 && !isRepeat(program[j].cmd); j--) consumed.add(j);
    }
  }

  const runBody = (body: readonly GcStep[]): void => {
    for (const b of body) if (b.cmd === 'ssPress') press();
  };

  for (let i = 0; i < program.length; i++) {
    if (consumed.has(i)) continue;
    const step = program[i];

    if (isRepeat(step.cmd)) {
      const body = blockBefore(i);
      if (body.length === 0) {
        events.push({ type: 'loopFail', index: i });
        continue;
      }
      const safe = step.cmd === 'ssRepeatUntilFull';
      if (safe) usedSafeLoop = true;
      events.push({ type: 'loopStart', index: i, safe });
      let iter = 0;
      if (safe) {
        while (jars < target && iter < SS_RUNAWAY) {
          iter++;
          runBody(body);
          events.push({ type: 'loopIter', index: i, iter, jars });
        }
        if (jars >= target) events.push({ type: 'loopStopped', index: i, jars });
        else { events.push({ type: 'loopRunaway', index: i }); ranaway = true; }
      } else {
        // plain repeat never checks a condition — it just keeps going
        while (iter < SS_RUNAWAY) {
          iter++;
          runBody(body);
          events.push({ type: 'loopIter', index: i, iter, jars });
        }
        events.push({ type: 'loopRunaway', index: i });
        ranaway = true;
      }
      continue;
    }

    events.push({ type: 'commandStart', index: i });
    if (step.cmd === 'ssPress') press();
  }

  events.push(ranaway ? { type: 'overflow' } : { type: 'done' });
  return {
    events,
    finalJars: jars,
    success: jars === target && !ranaway,
    ranaway,
    usedSafeLoop,
  };
}

export function safeStopMisses(goal: SafeGoal, result: GcSafeResult): string[] {
  const misses: string[] = [];
  if (result.ranaway) {
    misses.push('That loop had no way to STOP — it ran forever! Use REPEAT UNTIL FULL so it stops when the jar is full.');
    return misses;
  }
  if (result.finalJars < goal.target) {
    misses.push(`Only ${result.finalJars} of ${goal.target} jars filled — press more, or REPEAT UNTIL FULL!`);
  } else if (result.finalJars > goal.target) {
    misses.push(`Too many jars — ${result.finalJars} filled but only ${goal.target} needed!`);
  }
  return misses;
}
