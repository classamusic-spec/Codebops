/**
 * Jam machine interpreter — Phase 8: the Strawberry Jam Machine hero.
 *
 * Pure TypeScript, zero THREE/DOM imports. This is the machine every
 * earlier phase was building toward — a motor, a conveyor, a sensor, a
 * press, and a jar counter, driven by one program that composes
 * sequence, events, waiting, loops, and safe stopping:
 *
 *     START MOTOR
 *     START CONVEYOR
 *     REPEAT 3:
 *       WAIT FOR SENSOR
 *       LOWER PRESS
 *       RAISE PRESS
 *     STOP CONVEYOR
 *     STOP MOTOR
 *
 * It is taught as SIX progressive missions, each unlocking one more
 * tile (see data/gearworks/levels.ts). The loop body is the tiles
 * before the repeat tile — the same app-wide convention — and because
 * START MOTOR / START CONVEYOR are idempotent, a loop that re-runs the
 * setup each turn still behaves.
 */

export type GjCommandId =
  | 'jmStartMotor' | 'jmStopMotor'
  | 'jmStartConveyor' | 'jmStopConveyor'
  | 'jmWaitSensor'
  | 'jmLowerPress' | 'jmRaisePress'
  | 'jmRepeat';

export interface GjStep {
  cmd: GjCommandId;
  /** Repeat count (2–4) for jmRepeat. */
  arg?: number;
}

export const JM_SUPPLY = 5;
export const JM_REPEAT_MIN = 2;
export const JM_REPEAT_MAX = 4;

export interface JamState {
  readonly motorOn: boolean;
  readonly conveyorOn: boolean;
  readonly pressDown: boolean;
  readonly berryPresent: boolean;
  readonly jam: number;
  readonly supply: number;
}

export function initialJam(): JamState {
  return { motorOn: false, conveyorOn: false, pressDown: false, berryPresent: false, jam: 0, supply: JM_SUPPLY };
}

export interface JamFlags {
  sawMotorOn: boolean;
  sawConveyorRun: boolean;
  sawSensorHit: boolean;
}

export type GjEvent =
  | { type: 'commandStart'; index: number }
  | { type: 'motorOn' } | { type: 'motorOff' } | { type: 'motorNoop'; on: boolean }
  | { type: 'conveyorOn' } | { type: 'conveyorOff' } | { type: 'conveyorNoPower' }
  | { type: 'berryArrive' } | { type: 'waitStuck'; reason: 'noPower' | 'empty' }
  | { type: 'pressed'; jam: number } | { type: 'pressMiss'; reason: 'noBerry' | 'noPower' | 'down' }
  | { type: 'pressUp' } | { type: 'pressUpEmpty' }
  | { type: 'loopStart'; index: number; count: number }
  | { type: 'loopIter'; index: number; iter: number; count: number }
  | { type: 'loopEnd'; index: number } | { type: 'loopFail'; index: number }
  | { type: 'done' };

export interface GjResult {
  readonly events: readonly GjEvent[];
  readonly finalState: JamState;
  readonly flags: JamFlags;
  /** motor off + conveyor off + press up: a clean shutdown. */
  readonly endedSafe: boolean;
}

export function runJam(program: readonly GjStep[]): GjResult {
  let s = initialJam();
  const flags: JamFlags = { sawMotorOn: false, sawConveyorRun: false, sawSensorHit: false };
  const events: GjEvent[] = [];

  const exec = (cmd: Exclude<GjCommandId, 'jmRepeat'>, index: number): void => {
    events.push({ type: 'commandStart', index });
    switch (cmd) {
      case 'jmStartMotor':
        if (s.motorOn) { events.push({ type: 'motorNoop', on: true }); }
        else { s = { ...s, motorOn: true }; flags.sawMotorOn = true; events.push({ type: 'motorOn' }); }
        break;
      case 'jmStopMotor':
        if (!s.motorOn) { events.push({ type: 'motorNoop', on: false }); }
        else { s = { ...s, motorOn: false, conveyorOn: false }; events.push({ type: 'motorOff' }); }
        break;
      case 'jmStartConveyor':
        if (!s.motorOn) { events.push({ type: 'conveyorNoPower' }); }
        else if (s.conveyorOn) { /* idempotent */ }
        else { s = { ...s, conveyorOn: true }; flags.sawConveyorRun = true; events.push({ type: 'conveyorOn' }); }
        break;
      case 'jmStopConveyor':
        if (s.conveyorOn) { s = { ...s, conveyorOn: false }; events.push({ type: 'conveyorOff' }); }
        break;
      case 'jmWaitSensor':
        if (!s.motorOn || !s.conveyorOn) { events.push({ type: 'waitStuck', reason: 'noPower' }); }
        else if (s.supply <= 0 && !s.berryPresent) { events.push({ type: 'waitStuck', reason: 'empty' }); }
        else { s = { ...s, berryPresent: true }; flags.sawSensorHit = true; events.push({ type: 'berryArrive' }); }
        break;
      case 'jmLowerPress':
        if (s.pressDown) { events.push({ type: 'pressMiss', reason: 'down' }); }
        else if (!s.motorOn) { events.push({ type: 'pressMiss', reason: 'noPower' }); }
        else if (!s.berryPresent) { events.push({ type: 'pressMiss', reason: 'noBerry' }); }
        else { s = { ...s, pressDown: true, jam: s.jam + 1, supply: s.supply - 1 }; events.push({ type: 'pressed', jam: s.jam }); }
        break;
      case 'jmRaisePress':
        if (s.pressDown) { s = { ...s, pressDown: false, berryPresent: false }; events.push({ type: 'pressUp' }); }
        else { events.push({ type: 'pressUpEmpty' }); }
        break;
    }
  };

  const isRepeat = (cmd: GjCommandId): boolean => cmd === 'jmRepeat';
  const blockBefore = (index: number): Array<{ cmd: Exclude<GjCommandId, 'jmRepeat'>; source: number }> => {
    const body: Array<{ cmd: Exclude<GjCommandId, 'jmRepeat'>; source: number }> = [];
    for (let j = index - 1; j >= 0; j--) {
      if (isRepeat(program[j].cmd)) break;
      body.unshift({ cmd: program[j].cmd as Exclude<GjCommandId, 'jmRepeat'>, source: j });
    }
    return body;
  };
  const consumed = new Set<number>();
  for (let i = 0; i < program.length; i++) {
    if (isRepeat(program[i].cmd)) for (const b of blockBefore(i)) consumed.add(b.source);
  }

  for (let i = 0; i < program.length; i++) {
    if (consumed.has(i)) continue;
    const step = program[i];
    if (isRepeat(step.cmd)) {
      const body = blockBefore(i);
      if (body.length === 0) { events.push({ type: 'loopFail', index: i }); continue; }
      const count = Math.min(JM_REPEAT_MAX, Math.max(JM_REPEAT_MIN, step.arg ?? JM_REPEAT_MIN));
      events.push({ type: 'loopStart', index: i, count });
      for (let k = 1; k <= count; k++) {
        events.push({ type: 'loopIter', index: i, iter: k, count });
        for (const b of body) exec(b.cmd, b.source);
      }
      events.push({ type: 'loopEnd', index: i });
      continue;
    }
    exec(step.cmd as Exclude<GjCommandId, 'jmRepeat'>, i);
  }

  events.push({ type: 'done' });
  const endedSafe = !s.motorOn && !s.conveyorOn && !s.pressDown;
  return { events, finalState: s, flags, endedSafe };
}

// ---------- goals (one per mission) ----------

export interface JamGoal {
  readonly needMotorCycled?: boolean;
  readonly needConveyorRun?: boolean;
  readonly needSensorHit?: boolean;
  readonly minJam?: number;
  readonly needSafeStop?: boolean;
}

export function jamGoalMet(goal: JamGoal, r: GjResult): boolean {
  if (goal.needMotorCycled && !(r.flags.sawMotorOn && !r.finalState.motorOn)) return false;
  if (goal.needConveyorRun && !(r.flags.sawConveyorRun && !r.finalState.conveyorOn)) return false;
  if (goal.needSensorHit && !r.flags.sawSensorHit) return false;
  if (goal.minJam !== undefined && r.finalState.jam < goal.minJam) return false;
  if (goal.needSafeStop && !r.endedSafe) return false;
  return true;
}

/**
 * Locate the tile to spotlight on a failed run (the Glitch Replay bug
 * finder). Traces the first thing that goes wrong back to its ROOT tile:
 * "no power" and "no berry came" point at the stop that turned things
 * off too soon; an undercount points at the loop tile.
 * Returns the program index to highlight, or -1 if nothing obvious.
 */
export function jamBugIndex(program: readonly GjStep[], goal: JamGoal): number {
  const r = runJam(program);
  let cur = -1;
  let failIndex = -1;
  let failType = '';
  for (const ev of r.events) {
    if (ev.type === 'commandStart') cur = ev.index;
    if (ev.type === 'conveyorNoPower' || ev.type === 'waitStuck' || ev.type === 'pressMiss') {
      failIndex = cur; failType = ev.type; break;
    }
  }
  if (failIndex >= 0) {
    if (failType === 'conveyorNoPower' || failType === 'waitStuck') {
      for (let j = failIndex - 1; j >= 0; j--) {
        if (program[j].cmd === 'jmStopMotor' || program[j].cmd === 'jmStopConveyor') return j;
      }
    }
    return failIndex;
  }
  // no hard error — an undercount: the loop is the usual suspect
  if ((goal.minJam ?? 0) > r.finalState.jam) {
    const rep = program.findIndex((s) => s.cmd === 'jmRepeat');
    if (rep >= 0) return rep;
  }
  // safe-stop miss → the missing/last teardown tile
  if (goal.needSafeStop && !r.endedSafe) return program.length - 1;
  return -1;
}

export function jamMisses(goal: JamGoal, r: GjResult): string[] {
  const misses: string[] = [];
  const st = r.finalState;
  if (goal.needMotorCycled && !r.flags.sawMotorOn) misses.push('The motor never started — nothing has power! Add START MOTOR.');
  if (r.events.some((e) => e.type === 'conveyorNoPower')) misses.push('The conveyor had no power — START MOTOR before START CONVEYOR!');
  if (goal.needConveyorRun && r.flags.sawMotorOn && !r.flags.sawConveyorRun) misses.push('The belt never ran — add START CONVEYOR after the motor.');
  if (goal.needSensorHit && !r.flags.sawSensorHit) misses.push('No strawberry reached the press — run the belt and WAIT FOR SENSOR.');
  if (r.events.some((e) => e.type === 'pressMiss' && e.reason === 'noBerry')) misses.push('The press came down on nothing — WAIT FOR SENSOR before LOWER PRESS!');
  if (goal.minJam !== undefined && st.jam < goal.minJam) {
    misses.push(st.jam === 0 ? 'No jam yet — LOWER PRESS on a strawberry to squish it!' : `Only ${st.jam} of ${goal.minJam} jars — a REPEAT loop can make the rest!`);
  }
  if (goal.needSafeStop && !r.endedSafe) {
    const parts: string[] = [];
    if (st.motorOn) parts.push('STOP MOTOR');
    if (st.conveyorOn) parts.push('STOP CONVEYOR');
    if (st.pressDown) parts.push('RAISE PRESS');
    if (parts.length) misses.push(`Shut it down safely — you still need ${parts.join(' + ')}.`);
  }
  return misses;
}
