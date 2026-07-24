/**
 * Gearworks machine core — Phase 2: motors.
 *
 * Deterministic, serializable, event-sourced. Pure TypeScript with zero
 * Three.js / DOM imports (same discipline as the grid interpreter): the
 * reducer computes state, the interpreter runs a program and emits typed
 * events, and rendering only *visualizes* those events afterwards.
 *
 * Time model (child mental model): every tile takes one tick. A motor
 * only WORKS (accumulates spin) during a WAIT tick — "Wait means let the
 * machine do its job." That makes `Start → Wait → Stop` the canonical
 * first machine program, and makes safe stopping observable.
 */

// ---------- commands ----------

export type GearworksCommandId =
  | 'gwStart'    // start motor
  | 'gwStop'     // stop motor
  | 'gwSpinCw'   // set direction clockwise
  | 'gwSpinCcw'  // set direction counterclockwise
  | 'gwSetSpeed' // set speed (arg: 1 slow · 2 medium · 3 fast)
  | 'gwWait';    // let the machine run for one tick

export interface GearworksStep {
  readonly cmd: GearworksCommandId;
  /** gwSetSpeed: 1 | 2 | 3. */
  readonly arg?: number;
}

// ---------- machine state ----------

export type MotorDir = 'cw' | 'ccw';
export type MotorSpeed = 1 | 2 | 3;

export interface MotorState {
  readonly on: boolean;
  readonly dir: MotorDir;
  readonly speed: MotorSpeed;
  /** Accumulated work: signed spin ticks (+cw / −ccw), |Δ| = speed. */
  readonly spun: number;
  /** Wait-ticks the motor actually ran, per speed and direction. */
  readonly ranAt: Readonly<Record<MotorSpeed, number>>;
  readonly ranDir: Readonly<Record<MotorDir, number>>;
}

export interface MachineState {
  readonly motor: MotorState;
  readonly ticks: number;
}

export const INITIAL_MOTOR: MotorState = {
  on: false,
  dir: 'cw',
  speed: 2,
  spun: 0,
  ranAt: { 1: 0, 2: 0, 3: 0 },
  ranDir: { cw: 0, ccw: 0 },
};

export function initialMachine(): MachineState {
  return { motor: INITIAL_MOTOR, ticks: 0 };
}

// ---------- execution events ----------

export type GearworksEvent =
  | { type: 'commandStart'; index: number; cmd: GearworksCommandId }
  | { type: 'motorOn'; index: number }
  | { type: 'motorOff'; index: number }
  | { type: 'motorDir'; index: number; dir: MotorDir }
  | { type: 'motorSpeed'; index: number; speed: MotorSpeed }
  | { type: 'spin'; index: number; dir: MotorDir; speed: MotorSpeed }
  | { type: 'waitIdle'; index: number }
  | { type: 'noop'; index: number; reason: 'alreadyOn' | 'alreadyOff' | 'sameDir' | 'sameSpeed' }
  | { type: 'overflow' }
  | { type: 'done'; success: boolean };

export const GW_MAX_TICKS = 60;

// ---------- reducer ----------

export interface StepResult {
  readonly state: MachineState;
  readonly events: GearworksEvent[];
}

/** Apply ONE program step. Pure: never mutates the input state. */
export function stepMachine(state: MachineState, step: GearworksStep, index: number): StepResult {
  const events: GearworksEvent[] = [{ type: 'commandStart', index, cmd: step.cmd }];
  const m = state.motor;
  let motor = m;

  switch (step.cmd) {
    case 'gwStart':
      if (m.on) events.push({ type: 'noop', index, reason: 'alreadyOn' });
      else { motor = { ...m, on: true }; events.push({ type: 'motorOn', index }); }
      break;
    case 'gwStop':
      if (!m.on) events.push({ type: 'noop', index, reason: 'alreadyOff' });
      else { motor = { ...m, on: false }; events.push({ type: 'motorOff', index }); }
      break;
    case 'gwSpinCw':
      if (m.dir === 'cw') events.push({ type: 'noop', index, reason: 'sameDir' });
      else { motor = { ...m, dir: 'cw' }; events.push({ type: 'motorDir', index, dir: 'cw' }); }
      break;
    case 'gwSpinCcw':
      if (m.dir === 'ccw') events.push({ type: 'noop', index, reason: 'sameDir' });
      else { motor = { ...m, dir: 'ccw' }; events.push({ type: 'motorDir', index, dir: 'ccw' }); }
      break;
    case 'gwSetSpeed': {
      const speed = (Math.min(3, Math.max(1, step.arg ?? 2)) as MotorSpeed);
      if (m.speed === speed) events.push({ type: 'noop', index, reason: 'sameSpeed' });
      else { motor = { ...m, speed }; events.push({ type: 'motorSpeed', index, speed }); }
      break;
    }
    case 'gwWait':
      if (m.on) {
        motor = {
          ...m,
          spun: m.spun + (m.dir === 'cw' ? m.speed : -m.speed),
          ranAt: { ...m.ranAt, [m.speed]: m.ranAt[m.speed] + 1 },
          ranDir: { ...m.ranDir, [m.dir]: m.ranDir[m.dir] + 1 },
        };
        events.push({ type: 'spin', index, dir: m.dir, speed: m.speed });
      } else {
        events.push({ type: 'waitIdle', index });
      }
      break;
  }

  return { state: { motor, ticks: state.ticks + 1 }, events };
}

// ---------- goals (declarative, per level) ----------

export interface MachineGoal {
  /** Motor must have actually worked ≥ this many wait-ticks. */
  readonly minRunTicks: number;
  /** Motor must be OFF when the program ends (safe stopping rule). */
  readonly endStopped: boolean;
  /** Must run ≥1 wait-tick at FAST speed. */
  readonly needFastRun?: boolean;
  /** Must run ≥1 wait-tick spinning counterclockwise. */
  readonly needCcwRun?: boolean;
}

export function goalMet(goal: MachineGoal, state: MachineState): boolean {
  const m = state.motor;
  const runTicks = m.ranDir.cw + m.ranDir.ccw;
  if (runTicks < goal.minRunTicks) return false;
  if (goal.endStopped && m.on) return false;
  if (goal.needFastRun && m.ranAt[3] < 1) return false;
  if (goal.needCcwRun && m.ranDir.ccw < 1) return false;
  return true;
}

/** Kid-facing reasons for a near-miss (drives the Think Trail hint). */
export function goalMisses(goal: MachineGoal, state: MachineState): string[] {
  const m = state.motor;
  const misses: string[] = [];
  if (m.ranDir.cw + m.ranDir.ccw < goal.minRunTicks) {
    misses.push(m.ranDir.cw + m.ranDir.ccw === 0
      ? 'The motor never got to work — add a WAIT while it is ON.'
      : 'Let the motor work a little longer — add another WAIT.');
  }
  if (goal.endStopped && m.on) misses.push('The motor is still running! End your plan with STOP.');
  if (goal.needFastRun && m.ranAt[3] < 1) misses.push('It never ran FAST — set the speed dial to Fast, then WAIT.');
  if (goal.needCcwRun && m.ranDir.ccw < 1) misses.push('It never spun BACK — use SPIN BACK, then WAIT.');
  return misses;
}

// ---------- interpreter ----------

export interface MachineRunResult {
  readonly events: GearworksEvent[];
  readonly finalState: MachineState;
  readonly success: boolean;
  /** Machine state after each program step (Think Trail / replay scrub). */
  readonly trail: readonly MachineState[];
  readonly overflowed: boolean;
}

export function runMachine(program: readonly GearworksStep[], goal: MachineGoal): MachineRunResult {
  let state = initialMachine();
  const events: GearworksEvent[] = [];
  const trail: MachineState[] = [];
  let overflowed = false;

  for (let i = 0; i < program.length; i++) {
    if (state.ticks >= GW_MAX_TICKS) {
      events.push({ type: 'overflow' });
      overflowed = true;
      break;
    }
    const r = stepMachine(state, program[i], i);
    state = r.state;
    events.push(...r.events);
    trail.push(state);
  }

  const success = !overflowed && goalMet(goal, state);
  events.push({ type: 'done', success });
  return { events, finalState: state, success, trail, overflowed };
}
