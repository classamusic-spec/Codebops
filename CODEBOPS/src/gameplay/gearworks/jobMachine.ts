/**
 * Job machine interpreter — Phase 9: functions and job cards.
 *
 * Pure TypeScript, zero THREE/DOM imports. A FUNCTION is a Job Card: a
 * named little sequence the child builds once (here, "Make Jam" =
 * FETCH then PRESS) and then re-uses in the MAIN program with a single
 * DO tile. The lesson ladder mirrors the spec exactly:
 *
 *     FETCH PRESS FETCH PRESS FETCH PRESS   (raw — before functions)
 *     DO MAKE JAM  DO MAKE JAM  DO MAKE JAM  (abstraction — reuse)
 *     REPEAT 3: DO MAKE JAM                  (refactor — loop the call)
 *
 * The main program can call the job, and a REPEAT tile loops the tiles
 * before it (the same app-wide block-before rule). Calls expand inline,
 * and the event stream marks jobCallStart/End so the Think Trail can
 * show the call and its inner steps indented — the "job execution
 * trace" build item.
 */

export type JobPrimId = 'jbFetch' | 'jbPress';
export type JobMainId = JobPrimId | 'jbDoJob' | 'jbRepeat';

export interface JobStep {
  cmd: JobMainId;
  /** Repeat count (2–4) for jbRepeat. */
  arg?: number;
}

export const JOB_SUPPLY = 6;
export const JOB_REPEAT_MIN = 2;
export const JOB_REPEAT_MAX = 4;

export interface JobState {
  readonly jars: number;
  readonly berryPresent: boolean;
  readonly supply: number;
}

export interface JobGoal {
  readonly target: number;
}

export type GbEvent =
  | { type: 'commandStart'; index: number; inJob: boolean }
  | { type: 'jobCallStart'; index: number } | { type: 'jobCallEnd' }
  | { type: 'callEmpty'; index: number }
  | { type: 'fetch'; inJob: boolean } | { type: 'fetchEmpty'; inJob: boolean }
  | { type: 'press'; jars: number; inJob: boolean } | { type: 'pressMiss'; inJob: boolean }
  | { type: 'loopStart'; index: number; count: number }
  | { type: 'loopIter'; index: number; iter: number; count: number }
  | { type: 'loopEnd'; index: number } | { type: 'loopFail'; index: number }
  | { type: 'done' };

export interface GbResult {
  readonly events: readonly GbEvent[];
  readonly finalState: JobState;
  readonly success: boolean;
  /** Did the MAIN program call the job at least once? (abstraction) */
  readonly usedJob: boolean;
  /** Is a job call wrapped in a REPEAT loop? (refactoring) */
  readonly refactored: boolean;
}

const isRepeat = (cmd: JobMainId): boolean => cmd === 'jbRepeat';

export function runJobProgram(
  jobBody: readonly JobStep[],
  main: readonly JobStep[],
  goal: JobGoal,
): GbResult {
  let s: JobState = { jars: 0, berryPresent: false, supply: JOB_SUPPLY };
  const events: GbEvent[] = [];
  let usedJob = false;
  let refactored = false;

  const prim = (cmd: JobPrimId, inJob: boolean): void => {
    if (cmd === 'jbFetch') {
      if (s.supply > 0 && !s.berryPresent) { s = { ...s, berryPresent: true }; events.push({ type: 'fetch', inJob }); }
      else events.push({ type: 'fetchEmpty', inJob });
    } else {
      if (s.berryPresent) { s = { ...s, jars: s.jars + 1, supply: s.supply - 1, berryPresent: false }; events.push({ type: 'press', jars: s.jars, inJob }); }
      else events.push({ type: 'pressMiss', inJob });
    }
  };

  const runJob = (index: number): void => {
    if (jobBody.length === 0) { events.push({ type: 'callEmpty', index }); return; }
    events.push({ type: 'jobCallStart', index });
    for (const b of jobBody) {
      if (b.cmd === 'jbFetch' || b.cmd === 'jbPress') {
        events.push({ type: 'commandStart', index, inJob: true });
        prim(b.cmd, true);
      }
    }
    events.push({ type: 'jobCallEnd' });
  };

  const execMain = (step: JobStep, index: number): void => {
    if (step.cmd === 'jbDoJob') { usedJob = true; runJob(index); return; }
    if (step.cmd === 'jbFetch' || step.cmd === 'jbPress') {
      events.push({ type: 'commandStart', index, inJob: false });
      prim(step.cmd, false);
    }
  };

  const blockBefore = (index: number): Array<{ step: JobStep; source: number }> => {
    const body: Array<{ step: JobStep; source: number }> = [];
    for (let j = index - 1; j >= 0; j--) {
      if (isRepeat(main[j].cmd)) break;
      body.unshift({ step: main[j], source: j });
    }
    return body;
  };
  const consumed = new Set<number>();
  for (let i = 0; i < main.length; i++) {
    if (isRepeat(main[i].cmd)) for (const b of blockBefore(i)) consumed.add(b.source);
  }

  for (let i = 0; i < main.length; i++) {
    if (consumed.has(i)) continue;
    const step = main[i];
    if (isRepeat(step.cmd)) {
      const body = blockBefore(i);
      if (body.length === 0) { events.push({ type: 'loopFail', index: i }); continue; }
      if (body.some((b) => b.step.cmd === 'jbDoJob')) refactored = true;
      const count = Math.min(JOB_REPEAT_MAX, Math.max(JOB_REPEAT_MIN, step.arg ?? JOB_REPEAT_MIN));
      events.push({ type: 'loopStart', index: i, count });
      for (let k = 1; k <= count; k++) {
        events.push({ type: 'loopIter', index: i, iter: k, count });
        for (const b of body) execMain(b.step, b.source);
      }
      events.push({ type: 'loopEnd', index: i });
      continue;
    }
    execMain(step, i);
  }

  events.push({ type: 'done' });
  return { events, finalState: s, success: s.jars >= goal.target, usedJob, refactored };
}

export function jobMisses(jobBody: readonly JobStep[], main: readonly JobStep[], goal: JobGoal): string[] {
  const r = runJobProgram(jobBody, main, goal);
  const misses: string[] = [];
  if (r.events.some((e) => e.type === 'callEmpty')) {
    misses.push('The Make Jam job card is empty — fill it with FETCH then PRESS first!');
  }
  if (r.events.some((e) => e.type === 'pressMiss')) {
    misses.push('The press squished nothing — FETCH a strawberry before you PRESS!');
  }
  if (r.finalState.jars < goal.target) {
    misses.push(r.finalState.jars === 0
      ? 'No jam yet — build the Make Jam job, then DO it!'
      : `Only ${r.finalState.jars} of ${goal.target} jars — DO the job again (or loop it)!`);
  }
  return misses;
}
