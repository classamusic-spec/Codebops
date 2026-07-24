/**
 * Logic machine interpreter — Phase 14: Lighthouse Logic.
 *
 * Pure TypeScript, zero THREE/DOM imports. The child builds ONE rule out
 * of sensor conditions and logic tiles; the lighthouse tests that rule
 * against a whole TRUTH TABLE of skies and shines its lamp when the rule
 * is true. Winning means the lamp is right for EVERY sky — that is the
 * big idea of this phase: a rule isn't right because it works once, it's
 * right because it holds for every case.
 *
 * Rule semantics (extends the app-wide "two guards read as AND" rule):
 *  - Condition tiles (If Dark, If Ship…) each read a true/false sensor.
 *  - NOT flips the very next condition (If NOT Ship).
 *  - Conditions sit side-by-side as AND by default; an OR tile switches
 *    the join for the next condition. Everything folds LEFT TO RIGHT, so
 *    "Dark and Ship or Fog" reads exactly as you say it.
 */

export type LlCommandId =
  | 'llIfDark' | 'llIfShip' | 'llIfFog' | 'llIfStorm'
  | 'llNot' | 'llAnd' | 'llOr';

export interface LlStep {
  cmd: LlCommandId;
}

export type LlSignal = 'dark' | 'ship' | 'fog' | 'storm';
export type LlInputs = Readonly<Record<string, boolean>>;

/** Which sensor a condition tile reads. */
export const LL_COND_SIGNAL: Readonly<Record<string, LlSignal>> = {
  llIfDark: 'dark', llIfShip: 'ship', llIfFog: 'fog', llIfStorm: 'storm',
};

export const isCond = (cmd: LlCommandId): boolean => cmd in LL_COND_SIGNAL;
export const isOp = (cmd: LlCommandId): boolean => cmd === 'llAnd' || cmd === 'llOr';

/** Evaluate the rule for one sky (folds left-to-right; empty rule = false). */
export function evalRule(program: readonly LlStep[], inputs: LlInputs): boolean {
  let result: boolean | null = null;
  let op: 'and' | 'or' = 'and';
  let neg = false;
  for (const s of program) {
    if (s.cmd === 'llNot') { neg = !neg; continue; }
    if (s.cmd === 'llAnd') { op = 'and'; continue; }
    if (s.cmd === 'llOr') { op = 'or'; continue; }
    const sig = LL_COND_SIGNAL[s.cmd];
    let v = inputs[sig] ?? false;
    if (neg) { v = !v; neg = false; }
    result = result === null ? v : (op === 'and' ? (result && v) : (result || v));
    op = 'and';
  }
  return result ?? false;
}

/** The order of conditions in a rule (ignoring NOT/AND/OR) — used to
 *  detect the "same rule the other way round" creative star. */
export function condOrder(program: readonly LlStep[]): LlSignal[] {
  const out: LlSignal[] = [];
  for (const s of program) if (isCond(s.cmd)) out.push(LL_COND_SIGNAL[s.cmd]);
  return out;
}

export interface LighthouseScenario {
  readonly id: string;
  readonly label: string;
  readonly emoji: string;
  readonly inputs: LlInputs;
  /** The answer key: should the lamp be ON for this sky? */
  readonly want: boolean;
}

export type LlEvent =
  | { type: 'scenarioEnter'; index: number; scenario: LighthouseScenario }
  | { type: 'token'; slot: number; cmd: LlCommandId; value: boolean | null }
  | { type: 'lamp'; on: boolean; want: boolean; correct: boolean }
  | { type: 'scenarioDone'; index: number; correct: boolean }
  | { type: 'done' };

export interface LlResult {
  readonly events: readonly LlEvent[];
  /** Lamp state the rule produced for each scenario. */
  readonly lamps: readonly boolean[];
  readonly correct: readonly boolean[];
  readonly wrongCount: number;
  readonly allCorrect: boolean;
}

/** Test the rule against every sky, emitting a per-token trace. */
export function runLighthouse(
  program: readonly LlStep[],
  scenarios: readonly LighthouseScenario[],
): LlResult {
  const events: LlEvent[] = [];
  const lamps: boolean[] = [];
  const correct: boolean[] = [];
  let wrongCount = 0;

  scenarios.forEach((scenario, index) => {
    events.push({ type: 'scenarioEnter', index, scenario });

    // Re-fold the rule, emitting the running value at each condition so
    // the deck can light up token by token.
    let result: boolean | null = null;
    let op: 'and' | 'or' = 'and';
    let neg = false;
    program.forEach((s, slot) => {
      if (s.cmd === 'llNot') { neg = !neg; events.push({ type: 'token', slot, cmd: s.cmd, value: null }); return; }
      if (s.cmd === 'llAnd') { op = 'and'; events.push({ type: 'token', slot, cmd: s.cmd, value: null }); return; }
      if (s.cmd === 'llOr') { op = 'or'; events.push({ type: 'token', slot, cmd: s.cmd, value: null }); return; }
      const sig = LL_COND_SIGNAL[s.cmd];
      let v = scenario.inputs[sig] ?? false;
      if (neg) { v = !v; neg = false; }
      result = result === null ? v : (op === 'and' ? (result && v) : (result || v));
      op = 'and';
      events.push({ type: 'token', slot, cmd: s.cmd, value: v });
    });

    const on = result ?? false;
    const ok = on === scenario.want;
    if (!ok) wrongCount++;
    lamps.push(on);
    correct.push(ok);
    events.push({ type: 'lamp', on, want: scenario.want, correct: ok });
    events.push({ type: 'scenarioDone', index, correct: ok });
  });

  events.push({ type: 'done' });
  return {
    events, lamps, correct, wrongCount,
    allCorrect: wrongCount === 0 && scenarios.length > 0,
  };
}

export function lighthouseSolved(program: readonly LlStep[], scenarios: readonly LighthouseScenario[]): boolean {
  return runLighthouse(program, scenarios).allCorrect;
}

/** Kid-facing near-miss report for a rule that fails a sky. */
export function lighthouseMisses(
  program: readonly LlStep[],
  scenarios: readonly LighthouseScenario[],
): string[] {
  const r = runLighthouse(program, scenarios);
  const misses: string[] = [];
  scenarios.forEach((sc, i) => {
    if (r.correct[i]) return;
    misses.push(sc.want
      ? `On a ${sc.label} ${sc.emoji}, the lamp should SHINE — but your rule left it dark.`
      : `On a ${sc.label} ${sc.emoji}, the lamp should stay dark — but your rule lit it up.`);
  });
  if (misses.length > 3) return [...misses.slice(0, 3), `…and ${misses.length - 3} more skies came out wrong.`];
  return misses;
}
