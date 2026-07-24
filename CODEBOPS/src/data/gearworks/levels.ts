/**
 * Gearworks machine levels — Phase 2: Motor Start + Motor Programmer.
 * Phase 3 adds CHAIN levels (Gear Train + Belt Builder) where the child
 * builds the machine itself: tap anchors to place gears, tap slots to
 * stretch belts, then BOP the motor and watch power (and direction!)
 * travel down the chain. Typed definitions + dev-time validation.
 */
import type { GearworksCommandId, GearworksStep, MachineGoal } from '../../gameplay/gearworks/machine';
import type { ChainSpec } from '../../gameplay/gearworks/gearChain';
import { finalDirection, neededPieces } from '../../gameplay/gearworks/gearChain';
import type { GwLoopCommandId, GwLoopGoal, GwLoopMachineKind, GwLoopStep } from '../../gameplay/gearworks/loopMachine';
import { runLoopMachine } from '../../gameplay/gearworks/loopMachine';
import type { GwSensorCommandId, GwSensorMachineKind, GwSensorStep, GwBerryGoal } from '../../gameplay/gearworks/sensorMachine';
import { runSensorMachine, berryGoalMet, workshopRunCorrect } from '../../gameplay/gearworks/sensorMachine';
import type { GtCommandId, GtStep, SortItem, RouteRule } from '../../gameplay/gearworks/sorterMachine';
import { runSorter, correctDest } from '../../gameplay/gearworks/sorterMachine';
import type { GcCommandId, GcStep, GcMachineKind, CounterGoal, SafeGoal } from '../../gameplay/gearworks/counterMachine';
import { runCounter, runSafeStop } from '../../gameplay/gearworks/counterMachine';
import type { GjCommandId, GjStep, JamGoal } from '../../gameplay/gearworks/jamMachine';
import { runJam, jamGoalMet, jamBugIndex } from '../../gameplay/gearworks/jamMachine';
import type { JobPrimId, JobMainId, JobStep, JobGoal } from '../../gameplay/gearworks/jobMachine';
import { runJobProgram } from '../../gameplay/gearworks/jobMachine';
import type { SignalCommandId, SignalStep, SignalGoal } from '../../gameplay/gearworks/signalMachine';
import { runParallel } from '../../gameplay/gearworks/signalMachine';
import type { BeatPattern } from '../../gameplay/gearworks/beatMachine';
import { emptyPattern, toggleCell, beatStars, beatStats, BEAT_LOOP_MAX } from '../../gameplay/gearworks/beatMachine';
import type { LlCommandId, LlStep, LlSignal, LighthouseScenario } from '../../gameplay/gearworks/logicMachine';
import { runLighthouse, evalRule, condOrder, isCond } from '../../gameplay/gearworks/logicMachine';
import type { SfxName } from '../../audio/sfx';
import type { GearworksFamilyId } from './world';

export interface GwBonusRule {
  /** Which extra exploration earns the creative star. */
  readonly id: 'waitTwice' | 'triedSlowAndFast';
  readonly text: string;
}

export interface GearworksMachineLevel {
  readonly id: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly family: GearworksFamilyId;
  readonly goalText: string;
  readonly emoji: string;
  readonly brief: { readonly title: string; readonly text: string; readonly emoji: string };
  readonly commands: readonly GearworksCommandId[];
  readonly maxSlots: number;
  /** Program length at or under this earns the "It Is Clever" star. */
  readonly par: number;
  readonly goal: MachineGoal;
  readonly bonus: GwBonusRule;
  /** Extra hint surfaced in the Think Trail after a near-miss. */
  readonly coachHint: string;
}

export const GW_MOTOR_START: GearworksMachineLevel = {
  id: 'gw-motor-start',
  title: 'Gearworks Garage',
  shortTitle: 'Motor Start',
  family: 'bench',
  goalText: 'Start the motor, let it work, then stop it safely!',
  emoji: '🔌',
  brief: {
    title: 'Wake up the Motor!',
    text: 'This little motor turns the big gear — but someone must tell it what to do! Start it, WAIT while it works, then stop it so it can rest. Machines love a safe stop!',
    emoji: '🔌',
  },
  commands: ['gwStart', 'gwWait', 'gwStop'],
  maxSlots: 5,
  par: 3,
  goal: { minRunTicks: 1, endStopped: true },
  bonus: { id: 'waitTwice', text: 'Let it work for TWO waits' },
  coachHint: 'Try: START → WAIT → STOP.',
};

export const GW_MOTOR_PROGRAMMER: GearworksMachineLevel = {
  id: 'gw-motor-programmer',
  title: 'Gearworks Garage',
  shortTitle: 'Motor Programmer',
  family: 'bench',
  goalText: 'Make the gear spin FAST, then spin BACK — and stop safely!',
  emoji: '🎛️',
  brief: {
    title: 'You are the Motor Programmer!',
    text: 'Now the motor listens to the speed dial and direction tiles. Make the gear whiz FAST, make it spin BACK the other way, and finish with a safe STOP. Tap the badge on a Speed tile to change it!',
    emoji: '🎛️',
  },
  commands: ['gwStart', 'gwWait', 'gwStop', 'gwSetSpeed', 'gwSpinCw', 'gwSpinCcw'],
  maxSlots: 9,
  par: 7,
  goal: { minRunTicks: 2, endStopped: true, needFastRun: true, needCcwRun: true },
  bonus: { id: 'triedSlowAndFast', text: 'Try the whole dial: run on Slow AND Fast' },
  coachHint: 'Try: START → SPEED ×3 → WAIT → SPIN BACK → WAIT → STOP.',
};

export const GEARWORKS_MACHINE_LEVELS: readonly GearworksMachineLevel[] = [
  GW_MOTOR_START,
  GW_MOTOR_PROGRAMMER,
];

/** Bonus-star check (creative exploration), evaluated on the run result. */
export function bonusMet(rule: GwBonusRule, ranAt: Readonly<Record<1 | 2 | 3, number>>, runTicks: number): boolean {
  switch (rule.id) {
    case 'waitTwice': return runTicks >= 2;
    case 'triedSlowAndFast': return ranAt[1] >= 1 && ranAt[3] >= 1;
  }
}

// ---------- validation (dev-time, like assertLevelValid) ----------

export function validateMachineLevel(level: GearworksMachineLevel): string[] {
  const errors: string[] = [];
  if (!level.id.startsWith('gw-')) errors.push(`Level id "${level.id}" must start with gw-.`);
  if (level.commands.length === 0) errors.push('Level offers no commands.');
  if (new Set(level.commands).size !== level.commands.length) errors.push('Duplicate commands in tray.');
  if (level.maxSlots < level.par) errors.push('maxSlots must be ≥ par.');
  if (level.goal.minRunTicks > 0 && !level.commands.includes('gwWait')) {
    errors.push('Goal needs run ticks but the tray has no WAIT tile.');
  }
  if (level.goal.endStopped && !level.commands.includes('gwStop')) {
    errors.push('Goal needs a safe stop but the tray has no STOP tile.');
  }
  if (level.goal.needFastRun && !level.commands.includes('gwSetSpeed')) {
    errors.push('Goal needs a fast run but the tray has no SPEED tile.');
  }
  if (level.goal.needCcwRun && !level.commands.includes('gwSpinCcw')) {
    errors.push('Goal needs a backward run but the tray has no SPIN BACK tile.');
  }
  // The canonical solution must fit the slots.
  const canonical = canonicalSolution(level);
  if (canonical.length > level.maxSlots) errors.push('Canonical solution does not fit maxSlots.');
  return errors;
}

/** Smallest known winning program (used by validation + unit tests). */
export function canonicalSolution(level: GearworksMachineLevel): GearworksStep[] {
  const p: GearworksStep[] = [{ cmd: 'gwStart' }];
  if (level.goal.needFastRun) p.push({ cmd: 'gwSetSpeed', arg: 3 });
  for (let i = 0; i < Math.max(1, level.goal.needCcwRun ? level.goal.minRunTicks - 1 : level.goal.minRunTicks); i++) {
    p.push({ cmd: 'gwWait' });
  }
  if (level.goal.needCcwRun) {
    p.push({ cmd: 'gwSpinCcw' }, { cmd: 'gwWait' });
  }
  if (level.goal.endStopped) p.push({ cmd: 'gwStop' });
  return p;
}

export function assertMachineLevelValid(level: GearworksMachineLevel): void {
  const errors = validateMachineLevel(level);
  if (errors.length > 0) {
    throw new Error(`[Gearworks] Level "${level.id}" invalid:\n- ${errors.join('\n- ')}`);
  }
}

// ==================================================================
// Phase 3 — chain (builder) levels: Gear Train + Belt Builder
// ==================================================================

export interface GearworksChainLevel {
  readonly id: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly family: GearworksFamilyId;
  readonly goalText: string;
  readonly emoji: string;
  readonly brief: { readonly title: string; readonly text: string; readonly emoji: string };
  readonly chain: ChainSpec;
  /** What sits at the end of the chain and comes alive ("the bell"). */
  readonly targetName: string;
  /** Creative-star rule: BOP an unfinished chain and SEE power stop. */
  readonly bonusText: string;
  readonly coachHint: string;
  /** Direction quiz shown before the first complete run (clever star). */
  readonly prediction: { readonly prompt: string };
}

export const GW_GEAR_TRAIN: GearworksChainLevel = {
  id: 'gw-gear-train',
  title: 'Gearworks Garage',
  shortTitle: 'Gear Train',
  family: 'bench',
  goalText: 'Connect the gears so the motor rings the bell!',
  emoji: '⚙️',
  brief: {
    title: 'Build a Gear Train!',
    text: 'The motor gear spins — but the bell is far away! Tap the glowing spots to place gears until every tooth touches. Watch closely: when gear teeth mesh, each gear spins the OPPOSITE way from its neighbor!',
    emoji: '⚙️',
  },
  chain: {
    nodes: [{ fixed: true }, { fixed: false }, { fixed: false }, { fixed: true }],
    links: ['mesh', 'mesh', 'mesh'],
  },
  targetName: 'the bell',
  bonusText: 'Test the machine before it is finished',
  coachHint: 'Every empty spot needs a gear — teeth must touch teeth!',
  prediction: { prompt: 'The motor gear spins FORWARD ⟳. Which way will the BELL gear spin?' },
};

export const GW_BELT_BUILDER: GearworksChainLevel = {
  id: 'gw-belt-builder',
  title: 'Gearworks Garage',
  shortTitle: 'Belt Builder',
  family: 'bench',
  goalText: 'Use gears AND a belt to ring the bell!',
  emoji: '🔗',
  brief: {
    title: 'Stretch a Belt!',
    text: 'Some wheels are too far apart for teeth to touch — that is a job for a BELT! A belt carries the spin across the gap and keeps it turning the SAME way. Meshed teeth flip the direction; belts do not. Build the chain and watch the difference!',
    emoji: '🔗',
  },
  chain: {
    nodes: [{ fixed: true }, { fixed: false }, { fixed: false }, { fixed: true }],
    links: ['mesh', 'beltSlot', 'mesh'],
  },
  targetName: 'the bell',
  bonusText: 'Test the machine before it is finished',
  coachHint: 'Gears go on the glowing spots — the belt stretches across the wide gap!',
  prediction: { prompt: 'The motor gear spins FORWARD ⟳. Which way will the BELL gear spin?' },
};

export const GEARWORKS_CHAIN_LEVELS: readonly GearworksChainLevel[] = [
  GW_GEAR_TRAIN,
  GW_BELT_BUILDER,
];

export function validateChainLevel(level: GearworksChainLevel): string[] {
  const errors: string[] = [];
  if (!level.id.startsWith('gw-')) errors.push(`Level id "${level.id}" must start with gw-.`);
  const { nodes, links } = level.chain;
  if (nodes.length < 3) errors.push('A chain needs at least 3 nodes (motor, middle, target).');
  if (links.length !== nodes.length - 1) errors.push('links.length must be nodes.length - 1.');
  if (!nodes[0]?.fixed) errors.push('Node 0 (the motor gear) must be fixed.');
  if (!nodes[nodes.length - 1]?.fixed) errors.push('The last node (the target) must be fixed.');
  const pieces = neededPieces(level.chain);
  if (pieces.gears + pieces.belts === 0) errors.push('Nothing for the child to place.');
  if (pieces.gears + pieces.belts > 5) errors.push('Too many pieces for one sitting (max 5).');
  return errors;
}

export function assertChainLevelValid(level: GearworksChainLevel): void {
  const errors = validateChainLevel(level);
  if (errors.length > 0) {
    throw new Error(`[Gearworks] Chain level "${level.id}" invalid:\n- ${errors.join('\n- ')}`);
  }
}

/** Prediction choices, generated so the correct one always matches the spec. */
export function chainPredictionChoices(level: GearworksChainLevel): Array<{ emoji: string; label: string; correct: boolean }> {
  const final = finalDirection(level.chain);
  return [
    { emoji: '⟳', label: 'Forward — same as the motor', correct: final === 'cw' },
    { emoji: '⟲', label: 'Backward — the other way', correct: final === 'ccw' },
  ];
}

// ==================================================================
// Phase 4 — loop levels: Gear Loop Challenge + Loop Lift
// ==================================================================

export type GwLoopBonusKind = 'bothWays' | 'roundTrip';

export interface GearworksLoopLevel {
  readonly id: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly family: GearworksFamilyId;
  readonly goalText: string;
  readonly emoji: string;
  readonly brief: { readonly title: string; readonly text: string; readonly emoji: string };
  readonly machine: GwLoopMachineKind;
  readonly commands: readonly GwLoopCommandId[];
  readonly maxSlots: number;
  /** Clever star: solve in this many tiles or fewer (forces the loop). */
  readonly par: number;
  readonly goal: GwLoopGoal;
  /**
   * Creative star:
   *  'bothWays'  — win once WITHOUT a loop and once WITH one (the spec's
   *                efficiency comparison: see both work, loop is shorter)
   *  'roundTrip' — after delivering at the top, bring the lift home (floor 0)
   */
  readonly bonus: { readonly kind: GwLoopBonusKind; readonly text: string };
  readonly coachHint: string;
}

export const GW_GEAR_LOOP: GearworksLoopLevel = {
  id: 'gw-gear-loop',
  title: 'Gearworks Garage',
  shortTitle: 'Gear Loop',
  family: 'bench',
  goalText: 'Ring the bell 4 times — turn the gear to wind it first!',
  emoji: '🔁',
  brief: {
    title: 'The Gear Loop Challenge!',
    text: 'This bell machine needs TURN GEAR to wind up, then RING BELL to ding — four times! You can write it the long way… or put TURN GEAR + RING BELL before a REPEAT ×4 tile and let the loop do it. Loops make plans shorter AND easier to change!',
    emoji: '🔁',
  },
  machine: 'gearBell',
  commands: ['glTurnGear', 'glRingBell', 'glRepeat'],
  maxSlots: 10,
  par: 3,
  goal: { needRings: 4 },
  bonus: { kind: 'bothWays', text: 'Win it the long way AND the loop way' },
  coachHint: 'Tiles before a REPEAT tile go inside the loop — Repeat ×4 runs them four times!',
};

export const GW_LOOP_LIFT: GearworksLoopLevel = {
  id: 'gw-loop-lift',
  title: 'Gearworks Garage',
  shortTitle: 'Loop Lift',
  family: 'bench',
  goalText: 'Lift the berries to floor 3 and ring the delivery bell!',
  emoji: '🛗',
  brief: {
    title: 'Loop Lift!',
    text: 'The berry basket rides the lift — but the kitchen is on floor 3! LIFT UP climbs one floor at a time. Put LIFT UP before a REPEAT ×3 and the loop climbs the whole way. Ring the bell AT THE TOP to deliver!',
    emoji: '🛗',
  },
  machine: 'lift',
  commands: ['glLiftUp', 'glLiftDown', 'glRingBell', 'glRepeat'],
  maxSlots: 8,
  par: 3,
  goal: { topFloor: 3, needTopRing: true },
  bonus: { kind: 'roundTrip', text: 'Bring the lift back down for the next load' },
  coachHint: 'LIFT UP then Repeat ×3 climbs three floors — then RING BELL at the top!',
};

export const GEARWORKS_LOOP_LEVELS: readonly GearworksLoopLevel[] = [GW_GEAR_LOOP, GW_LOOP_LIFT];

/** Shortest winning plan (uses the loop — proves par is honest). */
export function canonicalLoopSolution(level: GearworksLoopLevel): GwLoopStep[] {
  if (level.machine === 'gearBell') {
    return [{ cmd: 'glTurnGear' }, { cmd: 'glRingBell' }, { cmd: 'glRepeat', arg: level.goal.needRings ?? 2 }];
  }
  return [{ cmd: 'glLiftUp' }, { cmd: 'glRepeat', arg: level.goal.topFloor ?? 2 }, { cmd: 'glRingBell' }];
}

/** The long, loop-free plan the child discovers first (both must work!). */
export function longLoopSolution(level: GearworksLoopLevel): GwLoopStep[] {
  if (level.machine === 'gearBell') {
    const out: GwLoopStep[] = [];
    for (let i = 0; i < (level.goal.needRings ?? 2); i++) out.push({ cmd: 'glTurnGear' }, { cmd: 'glRingBell' });
    return out;
  }
  const out: GwLoopStep[] = [];
  for (let i = 0; i < (level.goal.topFloor ?? 2); i++) out.push({ cmd: 'glLiftUp' });
  out.push({ cmd: 'glRingBell' });
  return out;
}

export function validateLoopLevel(level: GearworksLoopLevel): string[] {
  const errors: string[] = [];
  if (!level.id.startsWith('gw-')) errors.push(`Level id "${level.id}" must start with gw-.`);
  if (!level.commands.includes('glRepeat')) errors.push('Loop levels must offer the Repeat tile.');
  if (level.machine === 'gearBell' && !level.goal.needRings) errors.push('gearBell goal needs needRings.');
  if (level.machine === 'lift' && !(level.goal.topFloor && level.goal.needTopRing)) {
    errors.push('lift goal needs topFloor + needTopRing.');
  }
  const short = canonicalLoopSolution(level);
  if (short.length > level.par) errors.push('Canonical loop solution must fit par.');
  if (!runLoopMachine(short, level.goal, level.machine).success) errors.push('Canonical loop solution must win.');
  const long = longLoopSolution(level);
  if (long.length <= level.par) errors.push('Long solution must NOT fit par (or the loop teaches nothing).');
  if (long.length > level.maxSlots) errors.push('Long solution must fit the deck (both ways must be buildable).');
  if (!runLoopMachine(long, level.goal, level.machine).success) errors.push('Long solution must win too.');
  return errors;
}

export function assertLoopLevelValid(level: GearworksLoopLevel): void {
  const errors = validateLoopLevel(level);
  if (errors.length > 0) {
    throw new Error(`[Gearworks] Loop level "${level.id}" invalid:\n- ${errors.join('\n- ')}`);
  }
}

// ==================================================================
// Phase 5 — sensor levels: Wait for the Berry + Sensor Workshop
// ==================================================================

export type GwSensorBonusKind = 'secondBerry' | 'bothInputs';

export interface GearworksSensorLevel {
  readonly id: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly family: GearworksFamilyId;
  readonly goalText: string;
  readonly emoji: string;
  readonly brief: { readonly title: string; readonly text: string; readonly emoji: string };
  readonly machine: GwSensorMachineKind;
  readonly commands: readonly GwSensorCommandId[];
  readonly maxSlots: number;
  readonly par: number;
  /** Berry machines only. */
  readonly berryGoal?: GwBerryGoal;
  /**
   * Creative star:
   *  'secondBerry' — the belt keeps bringing berries; grab a second one
   *  'bothInputs'  — run correctly with the gear TURNING and STILL
   *                  (test both branches — boolean coverage for age 5!)
   */
  readonly bonus: { readonly kind: GwSensorBonusKind; readonly text: string };
  readonly coachHint: string;
}

export const GW_WAIT_BERRY: GearworksSensorLevel = {
  id: 'gw-wait-berry',
  title: 'Gearworks Garage',
  shortTitle: 'Wait for the Berry',
  family: 'bench',
  goalText: 'Wait until the eye sees the berry — then grab it!',
  emoji: '👁️',
  brief: {
    title: 'Wait for the Berry!',
    text: 'The belt brings a berry — but not right away! The eye sensor turns green the moment the berry arrives, and it only stays for 2 ticks. Grab too soon and the claw snaps on air. WAIT UNTIL sleeps exactly until the eye sees it — no counting needed!',
    emoji: '👁️',
  },
  machine: 'berry',
  commands: ['gsStartBelt', 'gsWait', 'gsWaitUntil', 'gsGrab'],
  maxSlots: 8,
  par: 3,
  berryGoal: { needBerries: 1 },
  bonus: { kind: 'secondBerry', text: 'The belt keeps going — grab a SECOND berry' },
  coachHint: 'START BELT, then WAIT UNTIL the eye turns green, then GRAB!',
};

export const GW_SENSOR_WORKSHOP: GearworksSensorLevel = {
  id: 'gw-sensor-workshop',
  title: 'Gearworks Garage',
  shortTitle: 'Sensor Workshop',
  family: 'bench',
  goalText: 'Gear turning → open the gate. Gear still → warning light!',
  emoji: '🚦',
  brief: {
    title: 'The Sensor Workshop!',
    text: 'TAP THE BIG GEAR to set it spinning or still — that is the machine\'s INPUT. The eye sensor watches it. IF TURNING does the next tile only when the gear spins; IF STILL only when it does not. Make the machine do the right thing for BOTH settings!',
    emoji: '🚦',
  },
  machine: 'workshop',
  commands: ['gsIfTurning', 'gsOpenGate', 'gsIfStill', 'gsWarnLight'],
  maxSlots: 6,
  par: 4,
  bonus: { kind: 'bothInputs', text: 'Test it with the gear turning AND still' },
  coachHint: 'An IF tile guards the very next tile — pair each action with the right IF!',
};

export const GEARWORKS_SENSOR_LEVELS: readonly GearworksSensorLevel[] = [
  GW_WAIT_BERRY,
  GW_SENSOR_WORKSHOP,
];

export function canonicalSensorSolution(level: GearworksSensorLevel): GwSensorStep[] {
  return level.machine === 'berry'
    ? [{ cmd: 'gsStartBelt' }, { cmd: 'gsWaitUntil' }, { cmd: 'gsGrab' }]
    : [{ cmd: 'gsIfTurning' }, { cmd: 'gsOpenGate' }, { cmd: 'gsIfStill' }, { cmd: 'gsWarnLight' }];
}

export function validateSensorLevel(level: GearworksSensorLevel): string[] {
  const errors: string[] = [];
  if (!level.id.startsWith('gw-')) errors.push(`Level id "${level.id}" must start with gw-.`);
  const canon = canonicalSensorSolution(level);
  if (canon.length > level.par) errors.push('Canonical solution must fit par.');
  if (canon.length > level.maxSlots) errors.push('Canonical solution must fit the deck.');
  if (level.machine === 'berry') {
    if (!level.berryGoal) errors.push('Berry levels need berryGoal.');
    else {
      const r = runSensorMachine(canon, 'berry');
      if (!berryGoalMet(level.berryGoal, r.finalState)) errors.push('Canonical berry solution must win.');
    }
  } else {
    const spin = runSensorMachine(canon, 'workshop', { gearTurning: true });
    const still = runSensorMachine(canon, 'workshop', { gearTurning: false });
    if (!workshopRunCorrect(spin.finalState, true)) errors.push('Canonical must be correct while turning.');
    if (!workshopRunCorrect(still.finalState, false)) errors.push('Canonical must be correct while still.');
  }
  return errors;
}

export function assertSensorLevelValid(level: GearworksSensorLevel): void {
  const errors = validateSensorLevel(level);
  if (errors.length > 0) {
    throw new Error(`[Gearworks] Sensor level "${level.id}" invalid:\n- ${errors.join('\n- ')}`);
  }
}

// ==================================================================
// Phase 6 — sorter levels: Sensor Sorter + Conveyor Factory foundation
// ==================================================================

export type GwSorterBonusKind = 'elseTrick' | 'megaBatch';

export interface GearworksSorterLevel {
  readonly id: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly family: GearworksFamilyId;
  readonly goalText: string;
  readonly emoji: string;
  readonly brief: { readonly title: string; readonly text: string; readonly emoji: string };
  readonly commands: readonly GtCommandId[];
  readonly maxSlots: number;
  readonly par: number;
  /** The batch every run sorts (deterministic order — same rule, every item). */
  readonly stream: readonly SortItem[];
  /** Bonus batch offered after the first win (megaBatch levels). */
  readonly megaStream?: readonly SortItem[];
  readonly rules: readonly RouteRule[];
  /**
   * Creative star:
   *  'elseTrick' — win with a plan of 3 tiles or fewer: the trailing
   *                unguarded send IS the else. A real refactor insight.
   *  'megaBatch' — after winning the batch, win the longer mega batch
   *                with the same kind of rule.
   */
  readonly bonus: { readonly kind: GwSorterBonusKind; readonly text: string };
  readonly coachHint: string;
  readonly binLabels: { readonly left: string; readonly right: string; readonly pass: string; readonly up?: string };
  /** Explicit answer key when the heuristic canonical does not fit (3-bin levels). */
  readonly canonical?: readonly GtStep[];
}

const R = (color: 'red' | 'blue', shape: 'round' | 'square'): SortItem => ({ color, shape });

export const GW_SENSOR_SORTER: GearworksSorterLevel = {
  id: 'gw-sensor-sorter',
  title: 'Gearworks Garage',
  shortTitle: 'Sensor Sorter',
  family: 'factory',
  goalText: 'Red berries LEFT, blue berries RIGHT — sort the whole batch!',
  emoji: '🍓',
  brief: {
    title: 'The Sensor Sorter!',
    text: 'Berries ride the belt to the sorting paddle, one at a time. Your plan runs again for EVERY berry! IF RED does the next tile only for red berries. Send reds LEFT into the jam basket and blues RIGHT into the pie basket — no mix-ups!',
    emoji: '🍓',
  },
  commands: ['gtIfRed', 'gtIfBlue', 'gtSendLeft', 'gtSendRight'],
  maxSlots: 6,
  par: 4,
  stream: [R('red', 'round'), R('blue', 'round'), R('blue', 'round'), R('red', 'round')],
  rules: [
    { match: { color: 'red' }, dest: 'left' },
    { match: { color: 'blue' }, dest: 'right' },
  ],
  bonus: { kind: 'elseTrick', text: 'Sort it in 3 tiles — the last send catches the rest' },
  coachHint: 'IF RED guards the next tile. Pair each send with the right IF — or find the shortcut!',
  binLabels: { left: 'Jam', right: 'Pie', pass: 'Lost' },
};

export const GW_CONVEYOR_FACTORY: GearworksSorterLevel = {
  id: 'gw-conveyor-factory',
  title: 'Gearworks Garage',
  shortTitle: 'Conveyor Factory',
  family: 'factory',
  goalText: 'Red AND round → jam! Blue → pie! Blocks ride through to parts!',
  emoji: '🏭',
  brief: {
    title: 'Conveyor Factory!',
    text: 'New shipment — berries AND red blocks! Two IFs in a row means BOTH must be true: IF RED then IF ROUND sends only red berries. Blocks are red but NOT round — let no tile touch them and they ride straight into the parts crate!',
    emoji: '🏭',
  },
  commands: ['gtIfRed', 'gtIfBlue', 'gtIfRound', 'gtSendLeft', 'gtSendRight'],
  maxSlots: 7,
  par: 5,
  stream: [R('red', 'round'), R('blue', 'round'), R('red', 'square'), R('red', 'round')],
  megaStream: [
    R('red', 'round'), R('red', 'square'), R('blue', 'round'), R('red', 'round'),
    R('blue', 'round'), R('red', 'square'), R('red', 'round'),
  ],
  rules: [
    { match: { color: 'red', shape: 'round' }, dest: 'left' },
    { match: { color: 'blue' }, dest: 'right' },
    { match: {}, dest: 'pass' },
  ],
  bonus: { kind: 'megaBatch', text: 'Sort the MEGA batch of 7' },
  coachHint: 'IF RED + IF ROUND together mean red AND round. Blocks need NO send — they pass through!',
  binLabels: { left: 'Jam', right: 'Pie', pass: 'Parts' },
};

export const GEARWORKS_SORTER_LEVELS: readonly GearworksSorterLevel[] = [
  GW_SENSOR_SORTER,
  GW_CONVEYOR_FACTORY,
];

export function canonicalSorterSolution(level: GearworksSorterLevel): GtStep[] {
  if (level.canonical) return level.canonical.map((s) => ({ ...s }));
  return level.commands.includes('gtIfRound')
    ? [{ cmd: 'gtIfRed' }, { cmd: 'gtIfRound' }, { cmd: 'gtSendLeft' }, { cmd: 'gtIfBlue' }, { cmd: 'gtSendRight' }]
    : [{ cmd: 'gtIfRed' }, { cmd: 'gtSendLeft' }, { cmd: 'gtIfBlue' }, { cmd: 'gtSendRight' }];
}

/** The 3-tile else-trick plan (Sensor Sorter creative star). */
export function elseTrickSolution(): GtStep[] {
  return [{ cmd: 'gtIfRed' }, { cmd: 'gtSendLeft' }, { cmd: 'gtSendRight' }];
}

export function validateSorterLevel(level: GearworksSorterLevel): string[] {
  const errors: string[] = [];
  if (!level.id.startsWith('gw-')) errors.push(`Level id "${level.id}" must start with gw-.`);
  if (level.stream.length === 0) errors.push('The stream must have at least one item.');
  const canon = canonicalSorterSolution(level);
  if (canon.length > level.par) errors.push('Canonical solution must fit par.');
  if (canon.length > level.maxSlots) errors.push('Canonical solution must fit the deck.');
  if (!canon.every((s) => level.commands.includes(s.cmd))) errors.push('Canonical uses unavailable tiles.');
  if (!runSorter(canon, level.stream, level.rules).allCorrect) errors.push('Canonical must sort the batch.');
  if (level.bonus.kind === 'elseTrick') {
    if (!runSorter(elseTrickSolution(), level.stream, level.rules).allCorrect) {
      errors.push('The 3-tile else trick must work on an elseTrick level.');
    }
  }
  if (level.bonus.kind === 'megaBatch') {
    if (!level.megaStream || level.megaStream.length <= level.stream.length) {
      errors.push('megaBatch levels need a longer megaStream.');
    } else if (!runSorter(canon, level.megaStream, level.rules).allCorrect) {
      errors.push('Canonical must also sort the mega batch.');
    }
  }
  // every item must have a reachable destination
  for (const item of [...level.stream, ...(level.megaStream ?? [])]) {
    void correctDest(level.rules, item);
  }
  return errors;
}

// Phase 12 — the Conveyor Factory activity set: THREE bins + counters.
export const GW_THREE_WAY: GearworksSorterLevel = {
  id: 'gw-three-way',
  title: 'Gearworks Garage',
  shortTitle: 'Three-Way Sort',
  family: 'factory',
  goalText: 'THREE bins! Red berries → Jam, blue berries → Pie, blocks → Parts!',
  emoji: '🏭',
  brief: {
    title: 'Three-Way Sort!',
    text: 'The factory grew a THIRD basket! Round red berries go LEFT to Jam, round blue berries go RIGHT to Pie, and any square block goes UP to the Parts bin. Watch the bin counters climb as you sort!',
    emoji: '🏭',
  },
  commands: ['gtIfRed', 'gtIfBlue', 'gtIfRound', 'gtIfSquare', 'gtSendLeft', 'gtSendRight', 'gtSendUp'],
  maxSlots: 9,
  par: 7,
  stream: [R('red', 'round'), R('blue', 'round'), R('red', 'square'), R('blue', 'round'), R('blue', 'square')],
  megaStream: [
    R('red', 'round'), R('blue', 'square'), R('blue', 'round'), R('red', 'square'),
    R('red', 'round'), R('blue', 'round'), R('red', 'square'),
  ],
  rules: [
    { match: { color: 'red', shape: 'round' }, dest: 'left' },
    { match: { color: 'blue', shape: 'round' }, dest: 'right' },
    { match: { shape: 'square' }, dest: 'up' },
  ],
  canonical: [
    { cmd: 'gtIfRound' }, { cmd: 'gtIfRed' }, { cmd: 'gtSendLeft' },
    { cmd: 'gtIfRound' }, { cmd: 'gtSendRight' },
    { cmd: 'gtIfSquare' }, { cmd: 'gtSendUp' },
  ],
  bonus: { kind: 'megaBatch', text: 'Sort the MEGA batch of 7' },
  coachHint: 'Round + Red → Left. Round → Right. Square → Up. Pair each send with its IFs!',
  binLabels: { left: 'Jam', right: 'Pie', up: 'Parts', pass: 'Lost' },
};

export const GW_FACTORY_RUSH: GearworksSorterLevel = {
  id: 'gw-factory-rush',
  title: 'Gearworks Garage',
  shortTitle: 'Factory Rush',
  family: 'factory',
  goalText: 'Red AND round → Jam, blue → Pie, everything else → Parts!',
  emoji: '⚙️',
  brief: {
    title: 'Factory Rush!',
    text: 'Rush order! Only red-AND-round berries go to Jam. Any blue thing goes to Pie. Everything else — a plain SEND UP at the end catches it all for the Parts bin. Compound conditions AND a catch-all!',
    emoji: '⚙️',
  },
  commands: ['gtIfRed', 'gtIfBlue', 'gtIfRound', 'gtIfSquare', 'gtSendLeft', 'gtSendRight', 'gtSendUp'],
  maxSlots: 9,
  par: 6,
  stream: [R('red', 'round'), R('blue', 'round'), R('red', 'square'), R('blue', 'square'), R('red', 'round')],
  megaStream: [
    R('red', 'round'), R('red', 'square'), R('blue', 'round'), R('blue', 'square'),
    R('red', 'round'), R('blue', 'round'), R('red', 'square'), R('red', 'round'),
  ],
  rules: [
    { match: { color: 'red', shape: 'round' }, dest: 'left' },
    { match: { color: 'blue' }, dest: 'right' },
    { match: {}, dest: 'up' },
  ],
  canonical: [
    { cmd: 'gtIfRed' }, { cmd: 'gtIfRound' }, { cmd: 'gtSendLeft' },
    { cmd: 'gtIfBlue' }, { cmd: 'gtSendRight' },
    { cmd: 'gtSendUp' },
  ],
  bonus: { kind: 'megaBatch', text: 'Sort the MEGA batch of 8' },
  coachHint: 'IF RED + IF ROUND → Left. IF BLUE → Right. A bare SEND UP at the end catches everything else!',
  binLabels: { left: 'Jam', right: 'Pie', up: 'Parts', pass: 'Lost' },
};

export const GEARWORKS_FACTORY_LEVELS: readonly GearworksSorterLevel[] = [
  GW_THREE_WAY,
  GW_FACTORY_RUSH,
];

export function assertSorterLevelValid(level: GearworksSorterLevel): void {
  const errors = validateSorterLevel(level);
  if (errors.length > 0) {
    throw new Error(`[Gearworks] Sorter level "${level.id}" invalid:\n- ${errors.join('\n- ')}`);
  }
}

// ==================================================================
// Phase 7 — counter levels: Berry Counter + Safe Stop
// ==================================================================

export type GwCounterBonusKind = 'bothWays' | 'debugFred';

export interface GearworksCounterLevel {
  readonly id: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly family: GearworksFamilyId;
  readonly goalText: string;
  readonly emoji: string;
  readonly brief: { readonly title: string; readonly text: string; readonly emoji: string };
  readonly machine: GcMachineKind;
  readonly commands: readonly GcCommandId[];
  readonly maxSlots: number;
  readonly par: number;
  /** counter machine: where the wheel starts. */
  readonly start?: number;
  readonly target: number;
  /**
   * Creative star:
   *  'bothWays'  — reach the counter target by SETTING it and by
   *                COUNTING to it (a variable is its value, not its path)
   *  'debugFred' — meet Forever Fred (run the un-stopped loop) AND fix
   *                it with REPEAT UNTIL FULL in the same sitting
   */
  readonly bonus: { readonly kind: GwCounterBonusKind; readonly text: string };
  readonly coachHint: string;
}

export const GW_BERRY_COUNTER: GearworksCounterLevel = {
  id: 'gw-berry-counter',
  title: 'Gearworks Garage',
  shortTitle: 'Berry Counter',
  family: 'factory',
  goalText: 'Make the counter wheel show exactly 5 berries!',
  emoji: '🔢',
  brief: {
    title: 'The Berry Counter!',
    text: 'This jar has a counter wheel — a number the machine remembers! It starts at 2. ADD 1 drops a berry in, SUBTRACT 1 takes one out, and SET VALUE spins the dial straight to any number. Make the wheel read 5!',
    emoji: '🔢',
  },
  machine: 'counter',
  commands: ['gcSet', 'gcAdd', 'gcSub'],
  maxSlots: 6,
  par: 2,
  start: 2,
  target: 5,
  bonus: { kind: 'bothWays', text: 'Reach 5 by SETTING it and by counting up' },
  coachHint: 'SET VALUE jumps straight there. Or ADD 1 until the wheel reads 5!',
};

export const GW_SAFE_STOP: GearworksCounterLevel = {
  id: 'gw-safe-stop',
  title: 'Gearworks Garage',
  shortTitle: 'Safe Stop',
  family: 'factory',
  goalText: 'Fill 4 jars and STOP — a loop that knows when to quit!',
  emoji: '🛑',
  brief: {
    title: 'Safe Stop!',
    text: 'The press stamps a jar each turn. REPEAT UNTIL FULL keeps pressing until the counter hits 4 — then it stops all by itself! Plain REPEAT never stops… and you might meet Forever Fred. Every loop needs a stopping rule!',
    emoji: '🛑',
  },
  machine: 'safeStop',
  commands: ['ssPress', 'ssRepeatUntilFull', 'ssRepeat'],
  maxSlots: 6,
  par: 3,
  target: 4,
  bonus: { kind: 'debugFred', text: 'Meet Forever Fred, then fix the loop' },
  coachHint: 'Put PRESS before REPEAT UNTIL FULL — the loop stamps until the jar is full, then stops!',
};

export const GEARWORKS_COUNTER_LEVELS: readonly GearworksCounterLevel[] = [
  GW_BERRY_COUNTER,
  GW_SAFE_STOP,
];

export function canonicalCounterSolution(level: GearworksCounterLevel): GcStep[] {
  return level.machine === 'counter'
    ? [{ cmd: 'gcSet', arg: level.target }]
    : [{ cmd: 'ssPress' }, { cmd: 'ssRepeatUntilFull' }];
}

/** The "other way" for Berry Counter — count up from the start. */
export function countUpSolution(level: GearworksCounterLevel): GcStep[] {
  const steps: GcStep[] = [];
  const from = level.start ?? 0;
  for (let v = from; v < level.target; v++) steps.push({ cmd: 'gcAdd' });
  return steps;
}

/** The un-safe plan that meets Forever Fred (Safe Stop only). */
export function foreverFredSolution(): GcStep[] {
  return [{ cmd: 'ssPress' }, { cmd: 'ssRepeat' }];
}

export function validateCounterLevel(level: GearworksCounterLevel): string[] {
  const errors: string[] = [];
  if (!level.id.startsWith('gw-')) errors.push(`Level id "${level.id}" must start with gw-.`);
  const canon = canonicalCounterSolution(level);
  if (canon.length > level.par) errors.push('Canonical solution must fit par.');
  if (canon.length > level.maxSlots) errors.push('Canonical solution must fit the deck.');
  if (!canon.every((s) => level.commands.includes(s.cmd))) errors.push('Canonical uses unavailable tiles.');
  if (level.machine === 'counter') {
    const goal: CounterGoal = { target: level.target };
    if (!runCounter(canon, goal, level.start).success) errors.push('Canonical must reach the target.');
    const countUp = countUpSolution(level);
    if (!runCounter(countUp, goal, level.start).success) errors.push('Count-up solution must also reach the target.');
    if (countUp.length <= level.par) errors.push('Count-up must be longer than par (or SET teaches nothing).');
    if (countUp.length > level.maxSlots) errors.push('Count-up must fit the deck (both ways must be buildable).');
  } else {
    const goal: SafeGoal = { target: level.target };
    if (!runSafeStop(canon, goal).success) errors.push('Canonical safe-stop plan must win.');
    if (!runSafeStop(foreverFredSolution(), goal).ranaway) errors.push('The plain-repeat plan must run away (meet Fred).');
    if (runSafeStop(foreverFredSolution(), goal).success) errors.push('The plain-repeat plan must NOT win.');
  }
  return errors;
}

export function assertCounterLevelValid(level: GearworksCounterLevel): void {
  const errors = validateCounterLevel(level);
  if (errors.length > 0) {
    throw new Error(`[Gearworks] Counter level "${level.id}" invalid:\n- ${errors.join('\n- ')}`);
  }
}

// ==================================================================
// Phase 8 — the hero level: Strawberry Jam Machine (6 missions)
// ==================================================================

export interface JamMission {
  readonly n: number;
  readonly title: string;
  readonly goalText: string;
  readonly brief: string;
  /** Tiles this mission adds to the tray (progressive unlock). */
  readonly commands: readonly GjCommandId[];
  readonly maxSlots: number;
  readonly par: number;
  readonly goal: JamGoal;
  /** A worked plan that satisfies this mission (validated + never shown). */
  readonly solution: readonly GjStep[];
}

export interface GearworksJamLevel {
  readonly id: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly family: GearworksFamilyId;
  readonly goalText: string;
  readonly emoji: string;
  readonly brief: { readonly title: string; readonly text: string; readonly emoji: string };
  readonly missions: readonly JamMission[];
}

const SM: GjStep = { cmd: 'jmStartMotor' };
const XM: GjStep = { cmd: 'jmStopMotor' };
const SC: GjStep = { cmd: 'jmStartConveyor' };
const XC: GjStep = { cmd: 'jmStopConveyor' };
const WS: GjStep = { cmd: 'jmWaitSensor' };
const LP: GjStep = { cmd: 'jmLowerPress' };
const RP: GjStep = { cmd: 'jmRaisePress' };
const R3: GjStep = { cmd: 'jmRepeat', arg: 3 };

export const GW_JAM_MACHINE: GearworksJamLevel = {
  id: 'gw-jam-machine',
  title: 'Gearworks Garage',
  shortTitle: 'Jam Machine',
  family: 'bench',
  goalText: 'Build the Strawberry Jam Machine — one mission at a time!',
  emoji: '🍯',
  brief: {
    title: 'The Strawberry Jam Machine!',
    text: 'This is the big one — a whole machine! We will build it together in six little missions. Each one adds a new part: the motor, the belt, the sensor, the press, a loop, then the WHOLE program. Ready, Zip?',
    emoji: '🍯',
  },
  missions: [
    {
      n: 1, title: 'Wake the Motor', goalText: 'Start the motor, then stop it.',
      brief: 'Every machine needs power. Turn the motor ON, then OFF again — always leave a machine safely stopped!',
      commands: ['jmStartMotor', 'jmStopMotor'], maxSlots: 4, par: 2,
      goal: { needMotorCycled: true, needSafeStop: true },
      solution: [SM, XM],
    },
    {
      n: 2, title: 'Run the Belt', goalText: 'Run the conveyor belt — but power it first!',
      brief: 'The belt carries strawberries. It only moves when the motor is ON, so START MOTOR before START CONVEYOR. Then stop them both.',
      commands: ['jmStartMotor', 'jmStopMotor', 'jmStartConveyor', 'jmStopConveyor'], maxSlots: 6, par: 4,
      goal: { needConveyorRun: true, needSafeStop: true },
      solution: [SM, SC, XC, XM],
    },
    {
      n: 3, title: 'Wait for a Berry', goalText: 'Wait for a strawberry to reach the sensor.',
      brief: 'The eye sensor watches the press. WAIT FOR SENSOR sleeps until a strawberry slides into place — no counting needed!',
      commands: ['jmStartMotor', 'jmStopMotor', 'jmStartConveyor', 'jmStopConveyor', 'jmWaitSensor'], maxSlots: 7, par: 5,
      goal: { needSensorHit: true, needSafeStop: true },
      solution: [SM, SC, WS, XC, XM],
    },
    {
      n: 4, title: 'Make Jam!', goalText: 'Press ONE strawberry into a jar of jam.',
      brief: 'Now squish! WAIT FOR SENSOR, then LOWER PRESS to make jam, then RAISE PRESS so the belt carries it away. Make one jar!',
      commands: ['jmStartMotor', 'jmStopMotor', 'jmStartConveyor', 'jmStopConveyor', 'jmWaitSensor', 'jmLowerPress', 'jmRaisePress'], maxSlots: 9, par: 7,
      goal: { minJam: 1, needSafeStop: true },
      solution: [SM, SC, WS, LP, RP, XC, XM],
    },
    {
      n: 5, title: 'Three in a Loop', goalText: 'Make 3 jars — use a REPEAT loop!',
      brief: 'Three jars by hand is a lot of tiles. Put WAIT–LOWER–RAISE before a REPEAT ×3 and the loop makes all three!',
      commands: ['jmStartMotor', 'jmStartConveyor', 'jmWaitSensor', 'jmLowerPress', 'jmRaisePress', 'jmRepeat'], maxSlots: 8, par: 6,
      goal: { minJam: 3 },
      solution: [SM, SC, WS, LP, RP, R3],
    },
    {
      n: 6, title: 'The Whole Machine', goalText: 'Run the FULL machine: 3 jars, then a safe stop!',
      brief: 'Put it ALL together: power on, belt on, loop three jars, then shut it down safely. You are running the whole Jam Machine!',
      commands: ['jmStartMotor', 'jmStopMotor', 'jmStartConveyor', 'jmStopConveyor', 'jmWaitSensor', 'jmLowerPress', 'jmRaisePress', 'jmRepeat'], maxSlots: 10, par: 8,
      goal: { minJam: 3 },
      solution: [SM, SC, WS, LP, RP, R3, XC, XM],
    },
  ],
};

export const GEARWORKS_JAM_LEVELS: readonly GearworksJamLevel[] = [GW_JAM_MACHINE];

/** Final-mission stars: works (3 jars) / clever (looped, within par) / safe (clean stop). */
export function jamFinalStars(level: GearworksJamLevel, program: readonly GjStep[]): number {
  const last = level.missions[level.missions.length - 1];
  const r = runJam(program);
  if (!jamGoalMet(last.goal, r)) return 0;
  let stars = 1;
  if (program.length <= last.par) stars++;
  if (r.endedSafe) stars++;
  return stars;
}

export function validateJamLevel(level: GearworksJamLevel): string[] {
  const errors: string[] = [];
  if (!level.id.startsWith('gw-')) errors.push(`Level id "${level.id}" must start with gw-.`);
  if (level.missions.length !== 6) errors.push('The hero level needs exactly 6 missions.');
  level.missions.forEach((m, i) => {
    if (m.n !== i + 1) errors.push(`Mission ${i + 1} has wrong number ${m.n}.`);
    if (m.solution.length > m.maxSlots) errors.push(`Mission ${m.n} solution exceeds maxSlots.`);
    if (m.solution.length > m.par) errors.push(`Mission ${m.n} solution exceeds par.`);
    if (!m.solution.every((s) => m.commands.includes(s.cmd))) errors.push(`Mission ${m.n} solution uses locked tiles.`);
    if (!jamGoalMet(m.goal, runJam(m.solution))) errors.push(`Mission ${m.n} solution does not meet its goal.`);
  });
  // the final solution must earn all three stars
  if (jamFinalStars(level, level.missions[5].solution) !== 3) errors.push('The final solution must earn 3 stars.');
  return errors;
}

export function assertJamLevelValid(level: GearworksJamLevel): void {
  const errors = validateJamLevel(level);
  if (errors.length > 0) {
    throw new Error(`[Gearworks] Jam level "${level.id}" invalid:\n- ${errors.join('\n- ')}`);
  }
}

// ==================================================================
// Phase 9 — functions and job cards: Save a Job
// ==================================================================

export interface GearworksJobLevel {
  readonly id: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly family: GearworksFamilyId;
  readonly goalText: string;
  readonly emoji: string;
  readonly brief: { readonly title: string; readonly text: string; readonly emoji: string };
  /** The Job Card the child fills in. */
  readonly jobName: string;
  readonly jobIcon: string;
  readonly jobPrims: readonly JobPrimId[];
  readonly jobSlots: number;
  /** Tiles for the MAIN program (primitives + DO + Repeat). */
  readonly mainCommands: readonly JobMainId[];
  readonly maxSlots: number;
  readonly target: number;
  readonly coachHint: string;
  /** The intended job body (validated; the child rebuilds it). */
  readonly jobSolution: readonly JobStep[];
}

const F: JobStep = { cmd: 'jbFetch' };
const P: JobStep = { cmd: 'jbPress' };
const DO: JobStep = { cmd: 'jbDoJob' };

export const GW_SAVE_A_JOB: GearworksJobLevel = {
  id: 'gw-save-a-job',
  title: 'Gearworks Garage',
  shortTitle: 'Save a Job',
  family: 'maker',
  goalText: 'Teach the machine a JOB, then use it to make 3 jars!',
  emoji: '📇',
  brief: {
    title: 'Save a Job!',
    text: 'Doing the same steps over and over is a lot of tiles! Fill the "Make Jam" job card with FETCH then PRESS — now the machine remembers it. Drop DO MAKE JAM into your plan to run the whole job at once. Make 3 jars!',
    emoji: '📇',
  },
  jobName: 'Make Jam',
  jobIcon: '🍯',
  jobPrims: ['jbFetch', 'jbPress'],
  jobSlots: 3,
  mainCommands: ['jbFetch', 'jbPress', 'jbDoJob', 'jbRepeat'],
  maxSlots: 6,
  target: 3,
  coachHint: 'Fill the Make Jam card (FETCH, PRESS). Then DO it three times — or loop it with REPEAT!',
  jobSolution: [F, P],
};

export const GEARWORKS_JOB_LEVELS: readonly GearworksJobLevel[] = [GW_SAVE_A_JOB];

export function jobRawSolution(level: GearworksJobLevel): JobStep[] {
  const out: JobStep[] = [];
  for (let i = 0; i < level.target; i++) out.push(F, P);
  return out;
}
export function jobCallSolution(level: GearworksJobLevel): JobStep[] {
  return Array.from({ length: level.target }, () => ({ ...DO }));
}
export function jobLoopSolution(level: GearworksJobLevel): JobStep[] {
  return [{ ...DO }, { cmd: 'jbRepeat', arg: level.target }];
}

/** works (3 jars) / clever (used the job) / creative (looped the call). */
export function jobStars(level: GearworksJobLevel, jobBody: readonly JobStep[], main: readonly JobStep[]): number {
  const r = runJobProgram(jobBody, main, { target: level.target });
  if (!r.success) return 0;
  return 1 + (r.usedJob ? 1 : 0) + (r.refactored ? 1 : 0);
}

export function validateJobLevel(level: GearworksJobLevel): string[] {
  const errors: string[] = [];
  if (!level.id.startsWith('gw-')) errors.push(`Level id "${level.id}" must start with gw-.`);
  const goal: JobGoal = { target: level.target };
  if (level.jobSolution.length > level.jobSlots) errors.push('Job solution exceeds the job card slots.');
  if (!level.jobSolution.every((s) => level.jobPrims.includes(s.cmd as JobPrimId))) errors.push('Job solution uses non-primitive tiles.');
  const raw = jobRawSolution(level);
  const call = jobCallSolution(level);
  const loop = jobLoopSolution(level);
  if (raw.length > level.maxSlots) errors.push('Raw solution must fit the deck (the baseline path).');
  if (!runJobProgram(level.jobSolution, raw, goal).success) errors.push('Raw solution must make the jam.');
  if (jobStars(level, level.jobSolution, raw) !== 1) errors.push('Raw solution should earn exactly 1 star.');
  if (jobStars(level, level.jobSolution, call) !== 2) errors.push('Call solution should earn 2 stars.');
  if (jobStars(level, level.jobSolution, loop) !== 3) errors.push('Loop solution should earn all 3 stars.');
  if (call.length >= raw.length) errors.push('Calling the job must be shorter than the raw steps.');
  return errors;
}

export function assertJobLevelValid(level: GearworksJobLevel): void {
  const errors = validateJobLevel(level);
  if (errors.length > 0) {
    throw new Error(`[Gearworks] Job level "${level.id}" invalid:\n- ${errors.join('\n- ')}`);
  }
}

// ==================================================================
// Phase 10 — signals and parallelism: Two-Machine Teamwork
// ==================================================================

export interface GearworksSignalLevel {
  readonly id: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly family: GearworksFamilyId;
  readonly goalText: string;
  readonly emoji: string;
  readonly brief: { readonly title: string; readonly text: string; readonly emoji: string };
  readonly lanes: {
    readonly packer: { readonly name: string; readonly icon: string; readonly commands: readonly SignalCommandId[]; readonly maxSlots: number };
    readonly mailer: { readonly name: string; readonly icon: string; readonly commands: readonly SignalCommandId[]; readonly maxSlots: number };
  };
  readonly target: number;
  readonly coachHint: string;
}

const gFetch: SignalStep = { cmd: 'sgFetch' };
const gPack: SignalStep = { cmd: 'sgPack' };
const gSend: SignalStep = { cmd: 'sgSendSignal' };
const gWait: SignalStep = { cmd: 'sgWaitSignal' };
const gShip: SignalStep = { cmd: 'sgSendCrate' };

export const GW_TWO_MACHINE: GearworksSignalLevel = {
  id: 'gw-two-machine',
  title: 'Gearworks Garage',
  shortTitle: 'Team Machines',
  family: 'delivery',
  goalText: 'Two machines, one team — deliver 2 gifts with a signal!',
  emoji: '🤝',
  brief: {
    title: 'Two-Machine Teamwork!',
    text: 'Two machines run at the SAME TIME! The Packer fills a crate and SENDS a signal. The Mailer must WAIT FOR that signal before it ships — ship too soon and the crate is empty! Hand off 2 gifts together.',
    emoji: '🤝',
  },
  lanes: {
    packer: { name: 'Packer', icon: '🎁', commands: ['sgFetch', 'sgPack', 'sgSendSignal', 'sgRepeat'], maxSlots: 8 },
    mailer: { name: 'Mailer', icon: '📮', commands: ['sgWaitSignal', 'sgSendCrate', 'sgRepeat'], maxSlots: 6 },
  },
  target: 2,
  coachHint: 'Packer: FETCH, PACK, SEND SIGNAL. Mailer: WAIT SIGNAL, SHIP. Do it twice — or loop both lanes!',
};

export const GEARWORKS_SIGNAL_LEVELS: readonly GearworksSignalLevel[] = [GW_TWO_MACHINE];

export function signalFullSolution(): { packer: SignalStep[]; mailer: SignalStep[] } {
  return {
    packer: [gFetch, gPack, gSend, gFetch, gPack, gSend],
    mailer: [gWait, gShip, gWait, gShip],
  };
}
export function signalLoopSolution(level: GearworksSignalLevel): { packer: SignalStep[]; mailer: SignalStep[] } {
  return {
    packer: [gFetch, gPack, gSend, { cmd: 'sgRepeat', arg: level.target }],
    mailer: [gWait, gShip, { cmd: 'sgRepeat', arg: level.target }],
  };
}
export function signalOneSolution(): { packer: SignalStep[]; mailer: SignalStep[] } {
  return { packer: [gFetch, gPack, gSend], mailer: [gWait, gShip] };
}

/** works (≥1 gift) / clever (all gifts) / creative (looped both lanes). */
export function signalStars(level: GearworksSignalLevel, programs: { packer: SignalStep[]; mailer: SignalStep[] }): number {
  const r = runParallel(programs, { target: level.target });
  const goal: SignalGoal = { target: level.target };
  void goal;
  if (r.finalState.delivered < 1) return 0;
  return 1 + (r.finalState.delivered >= level.target ? 1 : 0) + (r.usedLoop && r.finalState.delivered >= level.target ? 1 : 0);
}

export function validateSignalLevel(level: GearworksSignalLevel): string[] {
  const errors: string[] = [];
  if (!level.id.startsWith('gw-')) errors.push(`Level id "${level.id}" must start with gw-.`);
  const goal: SignalGoal = { target: level.target };
  const full = signalFullSolution();
  const loop = signalLoopSolution(level);
  const one = signalOneSolution();
  if (full.packer.length > level.lanes.packer.maxSlots) errors.push('Packer full solution exceeds its lane.');
  if (full.mailer.length > level.lanes.mailer.maxSlots) errors.push('Mailer full solution exceeds its lane.');
  if (!runParallel(full, goal).success) errors.push('Full solution must deliver the target.');
  if (signalStars(level, full) !== 2) errors.push('Full (no-loop) solution should earn 2 stars.');
  if (signalStars(level, loop) !== 3) errors.push('Loop solution should earn all 3 stars.');
  if (signalStars(level, one) !== 1) errors.push('One-handoff solution should earn 1 star.');
  // shipping immediately (before any pack) ships an empty crate — the
  // signal is what makes the hand-off reliable rather than a timing gamble
  const shipEarly = runParallel({ packer: full.packer, mailer: [gShip] }, goal);
  if (shipEarly.finalState.delivered > 0) errors.push('An immediate ship (before a pack) must not deliver a gift.');
  // no-send must deadlock
  const noSend = runParallel({ packer: [gFetch, gPack], mailer: [gWait, gShip] }, goal);
  if (!noSend.deadlocked) errors.push('A missing SEND SIGNAL must deadlock the Mailer.');
  return errors;
}

export function assertSignalLevelValid(level: GearworksSignalLevel): void {
  const errors = validateSignalLevel(level);
  if (errors.length > 0) {
    throw new Error(`[Gearworks] Signal level "${level.id}" invalid:\n- ${errors.join('\n- ')}`);
  }
}

// ==================================================================
// Phase 11 — advanced debugging: Broken Machine (find & fix the bug)
// ==================================================================

export interface DebugPuzzle {
  readonly n: number;
  readonly title: string;
  readonly brief: string;
  /** The machine comes PRE-LOADED with this buggy program. */
  readonly program: readonly GjStep[];
  readonly commands: readonly GjCommandId[];
  readonly maxSlots: number;
  readonly goal: JamGoal;
  readonly coachHint: string;
  /** A corrected program (validated; never shown — the child finds it). */
  readonly fixed: readonly GjStep[];
}

export interface GearworksDebugLevel {
  readonly id: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly family: GearworksFamilyId;
  readonly goalText: string;
  readonly emoji: string;
  readonly brief: { readonly title: string; readonly text: string; readonly emoji: string };
  readonly puzzles: readonly DebugPuzzle[];
}

const dSM: GjStep = { cmd: 'jmStartMotor' };
const dXM: GjStep = { cmd: 'jmStopMotor' };
const dSC: GjStep = { cmd: 'jmStartConveyor' };
const dXC: GjStep = { cmd: 'jmStopConveyor' };
const dWS: GjStep = { cmd: 'jmWaitSensor' };
const dLP: GjStep = { cmd: 'jmLowerPress' };
const dRP: GjStep = { cmd: 'jmRaisePress' };
const ALL_JAM: GjCommandId[] = ['jmStartMotor', 'jmStopMotor', 'jmStartConveyor', 'jmStopConveyor', 'jmWaitSensor', 'jmLowerPress', 'jmRaisePress', 'jmRepeat'];

export const GW_BROKEN_MACHINE: GearworksDebugLevel = {
  id: 'gw-broken-machine',
  title: 'Gearworks Garage',
  shortTitle: 'Broken Machine',
  family: 'bench',
  goalText: 'Three machines are BROKEN — find each bug and fix it!',
  emoji: '🔧',
  brief: {
    title: 'The Broken Machines!',
    text: 'Uh oh — these machines were built with a bug! Press BOP to run one, watch the Think Trail to see where it GOES WRONG, then fix the plan and BOP again. You are a machine detective now!',
    emoji: '🔧',
  },
  puzzles: [
    {
      n: 1, title: 'The Extra Brake',
      brief: 'This jam machine makes NO jam. Run it, watch the Think Trail, and find the tile that shuts everything off too soon — then take it out!',
      program: [dSM, dXM, dSC, dWS, dLP, dRP, dXC, dXM],
      commands: ALL_JAM, maxSlots: 10,
      goal: { minJam: 1, needSafeStop: true },
      coachHint: 'A STOP MOTOR near the start turns the power off before the belt can run — remove it!',
      fixed: [dSM, dSC, dWS, dLP, dRP, dXC, dXM],
    },
    {
      n: 2, title: 'Too Few Loops',
      brief: 'This one needs THREE jars but only makes two. The loop is not repeating enough — find the Repeat tile and tap its number!',
      program: [dSM, dSC, dWS, dLP, dRP, { cmd: 'jmRepeat', arg: 2 }, dXC, dXM],
      commands: ALL_JAM, maxSlots: 10,
      goal: { minJam: 3 },
      coachHint: 'The Repeat badge says ×2 — tap it up to ×3 so the loop makes all three jars!',
      fixed: [dSM, dSC, dWS, dLP, dRP, { cmd: 'jmRepeat', arg: 3 }, dXC, dXM],
    },
    {
      n: 3, title: 'The Early Belt-Stop',
      brief: 'This machine should make TWO jars but only makes one. Something stops the belt in the middle, so the second strawberry never comes. Find it and remove it!',
      program: [dSM, dSC, dWS, dLP, dXC, dRP, dWS, dLP, dRP, dXM],
      commands: ALL_JAM, maxSlots: 12,
      goal: { minJam: 2 },
      coachHint: 'A STOP BELT (Belt Off) in the middle kills the belt too early — take it out so the next berry arrives!',
      fixed: [dSM, dSC, dWS, dLP, dRP, dWS, dLP, dRP, dXM],
    },
  ],
};

export const GEARWORKS_DEBUG_LEVELS: readonly GearworksDebugLevel[] = [GW_BROKEN_MACHINE];

/** The tile to spotlight when a puzzle's current program fails. */
export function debugBugIndex(puzzle: DebugPuzzle, program: readonly GjStep[]): number {
  return jamBugIndex(program, puzzle.goal);
}

export function validateDebugLevel(level: GearworksDebugLevel): string[] {
  const errors: string[] = [];
  if (!level.id.startsWith('gw-')) errors.push(`Level id "${level.id}" must start with gw-.`);
  if (level.puzzles.length < 1) errors.push('A debug level needs at least one puzzle.');
  level.puzzles.forEach((p, i) => {
    if (p.n !== i + 1) errors.push(`Puzzle ${i + 1} has wrong number ${p.n}.`);
    if (jamGoalMet(p.goal, runJam(p.program))) errors.push(`Puzzle ${p.n} is not actually broken.`);
    if (!jamGoalMet(p.goal, runJam(p.fixed))) errors.push(`Puzzle ${p.n}'s fix does not work.`);
    if (p.fixed.length > p.maxSlots || p.program.length > p.maxSlots) errors.push(`Puzzle ${p.n} exceeds maxSlots.`);
    if (jamBugIndex(p.program, p.goal) < 0) errors.push(`Puzzle ${p.n} has no locatable bug.`);
  });
  return errors;
}

export function assertDebugLevelValid(level: GearworksDebugLevel): void {
  const errors = validateDebugLevel(level);
  if (errors.length > 0) {
    throw new Error(`[Gearworks] Debug level "${level.id}" invalid:\n- ${errors.join('\n- ')}`);
  }
}

// ==================================================================
// Phase 13 — Robot Orchestra: a creative beat sequencer
//
// Not a puzzle — there is no single right answer. Tap cells to lay a
// beat across a grid of instrument robots; every track plays in
// PARALLEL on each step. Any beat "works"; using two-plus instruments
// is clever; looping the bar into a real song is creative.
// ==================================================================

export interface GearworksOrchestraTrack {
  readonly id: string;
  readonly label: string;
  readonly emoji: string;
  /** Instrument voice (Sfx name) + a colour for the row + robot. */
  readonly sound: SfxName;
  readonly color: string;
}

export interface GearworksOrchestraLevel {
  readonly id: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly family: GearworksFamilyId;
  readonly goalText: string;
  readonly emoji: string;
  readonly brief: { readonly title: string; readonly text: string; readonly emoji: string };
  readonly tracks: readonly GearworksOrchestraTrack[];
  readonly steps: number;
  /** A friendly starter groove preloaded so the grid is never blank. */
  readonly starter?: ReadonlyArray<{ readonly track: string; readonly step: number }>;
  readonly bonus: { readonly text: string };
  readonly coachHint: string;
}

export const GW_ROBOT_ORCHESTRA: GearworksOrchestraLevel = {
  id: 'gw-robot-orchestra',
  title: 'Gearworks Garage',
  shortTitle: 'Robot Orchestra',
  family: 'orchestra',
  goalText: 'Tap the squares to make a beat — the robot band plays your song!',
  emoji: '🥁',
  brief: {
    title: 'The Robot Orchestra!',
    text: 'Four robots are ready to jam! Tap a square to give a robot a beat — each row is a different sound. When you BOP, the whole band plays your pattern together, left to right. There is no wrong song here — make it yours! Add more instruments, then LOOP it into a real tune.',
    emoji: '🥁',
  },
  tracks: [
    { id: 'drum', label: 'Drum', emoji: '🥁', sound: 'insDrum', color: '#ff5a7a' },
    { id: 'bell', label: 'Bell', emoji: '🔔', sound: 'insBell', color: '#ffb43e' },
    { id: 'xylo', label: 'Xylophone', emoji: '🎵', sound: 'insXylo', color: '#3ec6ff' },
    { id: 'shaker', label: 'Shaker', emoji: '🪇', sound: 'insShaker', color: '#8be04a' },
  ],
  steps: 8,
  starter: [
    { track: 'drum', step: 0 },
    { track: 'drum', step: 4 },
  ],
  bonus: { text: 'Loop your beat into a real song' },
  coachHint: 'Tap any square to add a beat — then BOP to hear your robot band!',
};

export const GEARWORKS_ORCHESTRA_LEVELS: readonly GearworksOrchestraLevel[] = [GW_ROBOT_ORCHESTRA];

export function orchestraTrackIds(level: GearworksOrchestraLevel): string[] {
  return level.tracks.map((t) => t.id);
}

/** Build the preloaded starter pattern (empty grid + the starter cells). */
export function orchestraStarterPattern(level: GearworksOrchestraLevel): BeatPattern {
  let pattern = emptyPattern(orchestraTrackIds(level), level.steps);
  for (const { track, step } of level.starter ?? []) pattern = toggleCell(pattern, track, step);
  return pattern;
}

/** works (any beat) / clever (2+ instruments) / creative (looped ≥2). */
export function orchestraStars(level: GearworksOrchestraLevel, pattern: BeatPattern, loops: number): number {
  return beatStars(pattern, orchestraTrackIds(level), loops);
}

export function validateOrchestraLevel(level: GearworksOrchestraLevel): string[] {
  const errors: string[] = [];
  if (!level.id.startsWith('gw-')) errors.push(`Level id "${level.id}" must start with gw-.`);
  if (level.tracks.length < 2) errors.push('An orchestra needs at least two instruments (the clever star).');
  if (level.steps < 4) errors.push('An orchestra needs at least four steps.');
  const ids = orchestraTrackIds(level);
  if (new Set(ids).size !== ids.length) errors.push('Track ids must be unique.');
  for (const c of level.starter ?? []) {
    if (!ids.includes(c.track)) errors.push(`Starter cell names unknown track "${c.track}".`);
    if (c.step < 0 || c.step >= level.steps) errors.push(`Starter cell step ${c.step} is off the grid.`);
  }
  // The starter groove must already earn the "works" star (never a blank stage).
  const starter = orchestraStarterPattern(level);
  if (beatStats(starter, ids).totalBeats < 1) errors.push('Starter groove must have at least one beat.');
  if (orchestraStars(level, starter, 1) < 1) errors.push('Starter groove must earn the works star.');
  // A full ensemble looped must reach all three stars (the ceiling is reachable).
  let full = emptyPattern(ids, level.steps);
  ids.forEach((id, i) => { full = toggleCell(full, id, i % level.steps); });
  if (orchestraStars(level, full, BEAT_LOOP_MAX) !== 3) errors.push('A looped full ensemble must earn all three stars.');
  return errors;
}

export function assertOrchestraLevelValid(level: GearworksOrchestraLevel): void {
  const errors = validateOrchestraLevel(level);
  if (errors.length > 0) {
    throw new Error(`[Gearworks] Orchestra level "${level.id}" invalid:\n- ${errors.join('\n- ')}`);
  }
}

// ==================================================================
// Phase 14 — Lighthouse Logic: combine conditions with AND / OR / NOT
//
// One rule, tested against a whole truth table of skies. The lamp must
// be right for EVERY sky — a rule is right because it holds for every
// case, not because it worked once.
// ==================================================================

export interface GearworksLighthouseLevel {
  readonly id: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly family: GearworksFamilyId;
  readonly goalText: string;
  readonly emoji: string;
  readonly brief: { readonly title: string; readonly text: string; readonly emoji: string };
  /** Sensors in play (drives the rig's sky readout). */
  readonly signals: readonly LlSignal[];
  readonly commands: readonly LlCommandId[];
  readonly maxSlots: number;
  readonly par: number;
  readonly scenarios: readonly LighthouseScenario[];
  /** The intended rule (the answer key). */
  readonly canonical: readonly LlStep[];
  readonly bonus: { readonly text: string };
  readonly coachHint: string;
}

const LL_D: LlStep = { cmd: 'llIfDark' };
const LL_S: LlStep = { cmd: 'llIfShip' };
const LL_F: LlStep = { cmd: 'llIfFog' };
const LL_T: LlStep = { cmd: 'llIfStorm' };
const LL_OR: LlStep = { cmd: 'llOr' };

export const GW_NIGHT_LIGHT: GearworksLighthouseLevel = {
  id: 'gw-night-light',
  title: 'Gearworks Garage',
  shortTitle: 'Night Light',
  family: 'lighthouse',
  goalText: 'Shine the lamp only when it is DARK and a SHIP is near!',
  emoji: '🗼',
  brief: {
    title: 'Lighthouse Logic!',
    text: 'The lighthouse should shine its lamp ONLY when it is dark AND a ship is near — both must be true! Put two condition tiles side by side and they mean AND. We will test your rule on every sky: day, night, ship, no ship. Get the lamp right for ALL of them to win!',
    emoji: '🗼',
  },
  signals: ['dark', 'ship'],
  commands: ['llIfDark', 'llIfShip', 'llNot', 'llAnd', 'llOr'],
  maxSlots: 5,
  par: 2,
  scenarios: [
    { id: 'calm-day', label: 'calm day', emoji: '☀️', inputs: { dark: false, ship: false }, want: false },
    { id: 'busy-day', label: 'ship at noon', emoji: '⛵', inputs: { dark: false, ship: true }, want: false },
    { id: 'empty-night', label: 'empty night', emoji: '🌙', inputs: { dark: true, ship: false }, want: false },
    { id: 'ship-night', label: 'ship at night', emoji: '🌊', inputs: { dark: true, ship: true }, want: true },
  ],
  canonical: [LL_D, LL_S],
  bonus: { text: 'Win it the other way round — Ship and Dark' },
  coachHint: 'Two conditions side by side mean AND. If Dark next to If Ship shines only when BOTH are true!',
};

export const GW_STORM_WATCH: GearworksLighthouseLevel = {
  id: 'gw-storm-watch',
  title: 'Gearworks Garage',
  shortTitle: 'Storm Watch',
  family: 'lighthouse',
  goalText: 'Flash the warning beam when it is FOGGY or STORMY!',
  emoji: '⚡',
  brief: {
    title: 'Storm Watch!',
    text: 'Now the beam warns sailors when the weather turns bad — flash it if it is FOGGY or STORMY. OR means ANY one is enough! Drop an OR tile between two conditions. On a clear calm day the beam stays off. Test every sky and get them all right!',
    emoji: '⚡',
  },
  signals: ['fog', 'storm'],
  commands: ['llIfFog', 'llIfStorm', 'llNot', 'llAnd', 'llOr'],
  maxSlots: 5,
  par: 3,
  scenarios: [
    { id: 'clear', label: 'clear sky', emoji: '☀️', inputs: { fog: false, storm: false }, want: false },
    { id: 'foggy', label: 'foggy morning', emoji: '🌫️', inputs: { fog: true, storm: false }, want: true },
    { id: 'stormy', label: 'wild storm', emoji: '⛈️', inputs: { fog: false, storm: true }, want: true },
    { id: 'both', label: 'foggy storm', emoji: '🌊', inputs: { fog: true, storm: true }, want: true },
  ],
  canonical: [LL_F, LL_OR, LL_T],
  bonus: { text: 'Win it the other way round — Storm or Fog' },
  coachHint: 'Put an OR tile between If Fog and If Storm — OR flashes the beam when EITHER one is true!',
};

export const GEARWORKS_LIGHTHOUSE_LEVELS: readonly GearworksLighthouseLevel[] = [
  GW_NIGHT_LIGHT, GW_STORM_WATCH,
];

/** The same rule with its conditions in the opposite order (the creative
 *  "other way round" — AND and OR are both commutative). */
export function altOrderSolution(level: GearworksLighthouseLevel): LlStep[] {
  const conds = level.canonical.filter((s) => isCond(s.cmd)).reverse();
  const op = level.canonical.find((s) => s.cmd === 'llAnd' || s.cmd === 'llOr');
  if (!op) return conds; // pure AND-by-juxtaposition rule
  return [conds[0], op, ...conds.slice(1)];
}

/** works (lamp right on every sky) / clever (par) / creative (both orders). */
export function lighthouseStars(
  level: GearworksLighthouseLevel,
  program: readonly LlStep[],
  everPar: boolean,
  everBothOrders: boolean,
): number {
  if (!runLighthouse(program, level.scenarios).allCorrect) return 0;
  return 1 + (everPar ? 1 : 0) + (everBothOrders ? 1 : 0);
}

export function validateLighthouseLevel(level: GearworksLighthouseLevel): string[] {
  const errors: string[] = [];
  if (!level.id.startsWith('gw-')) errors.push(`Level id "${level.id}" must start with gw-.`);
  if (level.scenarios.length < 2) errors.push('A logic level needs at least two skies to test.');
  if (level.canonical.length > level.par) errors.push('Canonical rule must fit par.');
  if (level.canonical.length > level.maxSlots) errors.push('Canonical rule must fit the deck.');
  if (!level.canonical.every((s) => level.commands.includes(s.cmd))) errors.push('Canonical uses unavailable tiles.');
  // The answer key must be self-consistent: each scenario's want matches
  // what the canonical rule actually produces.
  for (const sc of level.scenarios) {
    if (evalRule(level.canonical, sc.inputs) !== sc.want) {
      errors.push(`Scenario "${sc.id}" want does not match the canonical rule.`);
    }
  }
  if (!runLighthouse(level.canonical, level.scenarios).allCorrect) errors.push('Canonical rule must light every sky correctly.');
  // The creative "other way round" must also be a full solution.
  if (!runLighthouse(altOrderSolution(level), level.scenarios).allCorrect) errors.push('The reversed-order rule must also solve it.');
  if (condOrder(altOrderSolution(level)).join() === condOrder(level.canonical).join()) {
    errors.push('The reversed order must actually differ (needs 2+ conditions).');
  }
  // Every sky must be distinguishable: at least one wants ON and one OFF.
  if (!level.scenarios.some((s) => s.want) || !level.scenarios.some((s) => !s.want)) {
    errors.push('Scenarios must include both a lamp-on and a lamp-off sky.');
  }
  return errors;
}

export function assertLighthouseLevelValid(level: GearworksLighthouseLevel): void {
  const errors = validateLighthouseLevel(level);
  if (errors.length > 0) {
    throw new Error(`[Gearworks] Lighthouse level "${level.id}" invalid:\n- ${errors.join('\n- ')}`);
  }
}
