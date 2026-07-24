/**
 * Sensor machine interpreter — Phase 5: sensors and waiting.
 *
 * Pure TypeScript, zero THREE/DOM imports. Two toy machines:
 *
 *   'berry'    — a conveyor carries a berry toward an eye sensor and a
 *                grabber claw. The berry ARRIVES 3 ticks after the belt
 *                starts and stays under the claw for only 2 ticks —
 *                grab too early and the claw snaps on air, too late and
 *                the berry rides off the end. WAIT UNTIL sleeps exactly
 *                until the sensor sees it (events beat counting!).
 *
 *   'workshop' — a gear the CHILD sets spinning or still before the
 *                run (boolean input, made tangible). IF GEAR TURNING /
 *                IF GEAR STILL guard the very next tile — the meadow
 *                interpreter's IF rule — so
 *                [If Turning, Open Gate, If Still, Warning Light]
 *                is the spec's if–else, reacting to live sensor state.
 *
 * Time model: every command costs 1 tick; WAIT UNTIL costs however
 * many ticks it sleeps. Deterministic — same program + same input =
 * same event stream, always.
 */

export type GwSensorCommandId =
  | 'gsStartBelt' | 'gsWait' | 'gsWaitUntil' | 'gsGrab'
  | 'gsIfTurning' | 'gsIfStill' | 'gsOpenGate' | 'gsWarnLight';

export interface GwSensorStep {
  cmd: GwSensorCommandId;
}

export type GwSensorMachineKind = 'berry' | 'workshop';

/** Belt physics: arrival delay after the belt starts / after a grab. */
export const GS_ARRIVAL_DELAY = 3;
/** How many ticks the berry sits under the claw before riding away. */
export const GS_BERRY_WINDOW = 2;
/** WAIT UNTIL gives up (kindly) after sleeping this many ticks. */
export const GS_WAIT_UNTIL_CAP = 8;
/** Step-limit protection for the whole run. */
export const GS_MAX_TICKS = 30;

export interface SensorMachineState {
  readonly tick: number;
  readonly beltOn: boolean;
  /** Tick the next berry reaches the sensor (-1 = none scheduled). */
  readonly nextArrival: number;
  readonly berriesGrabbed: number;
  /** Claw closed on air. */
  readonly snaps: number;
  /** Berries that rode off the end un-grabbed. */
  readonly missed: number;
  readonly gateOpened: boolean;
  readonly warned: boolean;
}

export function initialSensorMachine(): SensorMachineState {
  return {
    tick: 0, beltOn: false, nextArrival: -1,
    berriesGrabbed: 0, snaps: 0, missed: 0,
    gateOpened: false, warned: false,
  };
}

/** Is a berry under the claw at tick t? (the eye sensor's boolean) */
export function berryPresent(s: SensorMachineState, t = s.tick): boolean {
  return s.nextArrival >= 0 && t >= s.nextArrival && t < s.nextArrival + GS_BERRY_WINDOW;
}

export type GwSensorEvent =
  | { type: 'commandStart'; index: number }
  | { type: 'beltStart' }
  | { type: 'waitTick'; sensorOn: boolean }
  | { type: 'waitUntilStart' }
  | { type: 'berryArrive'; tick: number }
  | { type: 'waitUntilMet'; slept: number }
  | { type: 'waitUntilGaveUp' }
  | { type: 'grab'; total: number }
  | { type: 'grabSnap' }
  | { type: 'berryMissed' }
  | { type: 'guard'; cond: 'turning' | 'still'; holds: boolean }
  | { type: 'skipped'; index: number }
  | { type: 'gateOpen'; wrong: boolean }
  | { type: 'warnLight'; wrong: boolean }
  | { type: 'noop'; reason: 'beltAlreadyOn' }
  | { type: 'done' }
  | { type: 'overflow' };

export interface GwSensorResult {
  readonly events: readonly GwSensorEvent[];
  readonly finalState: SensorMachineState;
  readonly overflowed: boolean;
}

export function runSensorMachine(
  program: readonly GwSensorStep[],
  machine: GwSensorMachineKind,
  opts: { gearTurning?: boolean } = {},
): GwSensorResult {
  const turning = opts.gearTurning ?? false;
  let s = initialSensorMachine();
  const events: GwSensorEvent[] = [];
  let overflowed = false;
  let skipNext = false;

  /** Advance one tick; fire arrival/missed transitions in order. */
  const tickOnce = (): void => {
    const wasPresent = berryPresent(s);
    s = { ...s, tick: s.tick + 1 };
    if (s.nextArrival >= 0 && s.tick === s.nextArrival) {
      events.push({ type: 'berryArrive', tick: s.tick });
    }
    if (wasPresent && !berryPresent(s)) {
      // the berry rode off the end — schedule the next one
      s = { ...s, missed: s.missed + 1, nextArrival: s.beltOn ? s.tick + GS_ARRIVAL_DELAY : -1 };
      events.push({ type: 'berryMissed' });
    }
  };

  for (let i = 0; i < program.length; i++) {
    if (s.tick >= GS_MAX_TICKS) { overflowed = true; break; }
    const step = program[i];
    if (skipNext) {
      skipNext = false;
      events.push({ type: 'skipped', index: i });
      continue;
    }
    events.push({ type: 'commandStart', index: i });

    switch (step.cmd) {
      case 'gsStartBelt':
        if (s.beltOn) {
          events.push({ type: 'noop', reason: 'beltAlreadyOn' });
          tickOnce();
        } else {
          s = { ...s, beltOn: true, nextArrival: s.tick + GS_ARRIVAL_DELAY };
          events.push({ type: 'beltStart' });
          tickOnce();
        }
        break;

      case 'gsWait':
        tickOnce();
        events.push({ type: 'waitTick', sensorOn: berryPresent(s) });
        break;

      case 'gsWaitUntil': {
        events.push({ type: 'waitUntilStart' });
        let slept = 0;
        while (!berryPresent(s) && slept < GS_WAIT_UNTIL_CAP && s.tick < GS_MAX_TICKS) {
          tickOnce();
          slept++;
        }
        if (berryPresent(s)) events.push({ type: 'waitUntilMet', slept });
        else events.push({ type: 'waitUntilGaveUp' });
        break;
      }

      case 'gsGrab':
        if (berryPresent(s)) {
          s = {
            ...s, berriesGrabbed: s.berriesGrabbed + 1,
            nextArrival: s.beltOn ? s.tick + GS_ARRIVAL_DELAY : -1,
          };
          events.push({ type: 'grab', total: s.berriesGrabbed });
        } else {
          s = { ...s, snaps: s.snaps + 1 };
          events.push({ type: 'grabSnap' });
        }
        tickOnce();
        break;

      case 'gsIfTurning':
      case 'gsIfStill': {
        const holds = step.cmd === 'gsIfTurning' ? turning : !turning;
        events.push({ type: 'guard', cond: step.cmd === 'gsIfTurning' ? 'turning' : 'still', holds });
        if (!holds) skipNext = true;
        tickOnce();
        break;
      }

      case 'gsOpenGate':
        s = { ...s, gateOpened: true };
        events.push({ type: 'gateOpen', wrong: machine === 'workshop' && !turning });
        tickOnce();
        break;

      case 'gsWarnLight':
        s = { ...s, warned: true };
        events.push({ type: 'warnLight', wrong: machine === 'workshop' && turning });
        tickOnce();
        break;
    }
  }
  if (s.tick >= GS_MAX_TICKS) overflowed = true;

  events.push(overflowed ? { type: 'overflow' } : { type: 'done' });
  return { events, finalState: s, overflowed };
}

// ---------- goals ----------

export interface GwBerryGoal {
  readonly needBerries: number;
}

export function berryGoalMet(goal: GwBerryGoal, s: SensorMachineState): boolean {
  return s.berriesGrabbed >= goal.needBerries;
}

export function berryGoalMisses(goal: GwBerryGoal, s: SensorMachineState): string[] {
  const misses: string[] = [];
  if (!s.beltOn) misses.push('The belt never started — no berries will ever arrive!');
  if (s.snaps > 0) misses.push('SNAP — the claw closed on air! WAIT UNTIL the eye sees the berry, then grab.');
  if (s.missed > 0) misses.push('A berry rode right past! Grab while the eye is green — it only waits 2 ticks.');
  if (s.beltOn && s.snaps === 0 && s.missed === 0 && s.berriesGrabbed < goal.needBerries) {
    misses.push('The plan ended before the grab — add a GRAB after the wait!');
  }
  return misses;
}

/** One workshop run is correct when the output matches the input. */
export function workshopRunCorrect(s: SensorMachineState, turning: boolean): boolean {
  return turning ? s.gateOpened && !s.warned : s.warned && !s.gateOpened;
}

export function workshopRunMisses(s: SensorMachineState, turning: boolean): string[] {
  const misses: string[] = [];
  if (turning) {
    if (!s.gateOpened) misses.push('The gear IS turning but the gate stayed shut — IF TURNING should open it!');
    if (s.warned) misses.push('False alarm! The warning light shone while the gear was running fine.');
  } else {
    if (!s.warned) misses.push('The gear is STILL but nobody was warned — IF STILL should light the warning!');
    if (s.gateOpened) misses.push('The gate opened with no power — guard it with IF TURNING!');
  }
  return misses;
}
