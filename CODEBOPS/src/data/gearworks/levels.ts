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
import type { DvCommandId, DvStep, DeliveryPackage, DeliveryGoal } from '../../gameplay/gearworks/deliveryMachine';
import { runDelivery, DV_REPEAT_MAX } from '../../gameplay/gearworks/deliveryMachine';
import type { PpCommandId, PpStep, PaintGoal } from '../../gameplay/gearworks/paintMachine';
import { runPaint } from '../../gameplay/gearworks/paintMachine';
import type { StoryEventId, StoryStep, StoryTransition, StoryMachineDef } from '../../gameplay/gearworks/storyMachine';
import { runStory, shortestStory, allStoryPaths } from '../../gameplay/gearworks/storyMachine';
import type { MkBodyId, MkBodyStep, MkCall, MakerGoal } from '../../gameplay/gearworks/makerMachine';
import { runMaker, MK_ARG_MAX } from '../../gameplay/gearworks/makerMachine';
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

// ==================================================================
// Phase 5 — sensor levels: Wait for the Berry + Sensor Workshop
// ==================================================================

export type GwSensorBonusKind = 'secondBerry' | 'bothInputs' | 'noWaste';

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
   *  'noWaste'     — catch every berry: no snaps on air, none ridden by
   */
  readonly bonus: { readonly kind: GwSensorBonusKind; readonly text: string };
  /**
   * A debug-phase level ships with this program already in the slots.
   * It must NOT already win — the child's job is to find what is wrong
   * and repair it (validated below).
   */
  readonly prefill?: readonly GwSensorStep[];
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

/** Events, debug phase: the claw grabs before the eye ever sees anything. */
export const GW_JUMPY_CLAW: GearworksSensorLevel = {
  id: 'gw-jumpy-claw',
  title: 'Gearworks Garage',
  shortTitle: 'The Jumpy Claw',
  family: 'bench',
  goalText: 'This claw grabs too soon — repair it so it catches the berry!',
  emoji: '🔧',
  brief: {
    title: 'The Jumpy Claw!',
    text: 'Somebody already wrote a plan for this claw, but it snaps on empty air every time. WAIT counts ticks and hopes. WAIT UNTIL listens to the eye sensor. Change ONE tile and watch the claw catch the berry.',
    emoji: '🔧',
  },
  machine: 'berry',
  commands: ['gsStartBelt', 'gsWait', 'gsWaitUntil', 'gsGrab'],
  maxSlots: 8,
  par: 3,
  berryGoal: { needBerries: 1 },
  prefill: [{ cmd: 'gsStartBelt' }, { cmd: 'gsWait' }, { cmd: 'gsGrab' }],
  bonus: { kind: 'secondBerry', text: 'The belt keeps going — catch a SECOND berry' },
  coachHint: 'Counting ticks is a guess. Swap WAIT for WAIT UNTIL and let the eye say when!',
};

/** Events, create phase: your own catcher, and not one berry wasted. */
export const GW_BERRY_PARADE: GearworksSensorLevel = {
  id: 'gw-berry-parade',
  title: 'Gearworks Garage',
  shortTitle: 'Berry Parade',
  family: 'bench',
  goalText: 'Build your own catcher — bring in THREE berries!',
  emoji: '🍓',
  brief: {
    title: 'The Berry Parade!',
    text: 'The belt will keep bringing berries all day. This time the plan is yours: catch THREE. Anything that works, works — but a really good machine never snaps on air and never lets a berry ride away.',
    emoji: '🍓',
  },
  machine: 'berry',
  commands: ['gsStartBelt', 'gsWait', 'gsWaitUntil', 'gsGrab'],
  maxSlots: 12,
  par: 7,
  berryGoal: { needBerries: 3 },
  bonus: { kind: 'noWaste', text: 'Catch all three with no snaps and none missed' },
  coachHint: 'Each berry needs its own WAIT UNTIL and GRAB. Start the belt once, then repeat the pair!',
};

export const GEARWORKS_SENSOR_LEVELS: readonly GearworksSensorLevel[] = [
  GW_WAIT_BERRY,
  GW_JUMPY_CLAW,
  GW_SENSOR_WORKSHOP,
  GW_BERRY_PARADE,
];

export function canonicalSensorSolution(level: GearworksSensorLevel): GwSensorStep[] {
  if (level.machine !== 'berry') {
    return [{ cmd: 'gsIfTurning' }, { cmd: 'gsOpenGate' }, { cmd: 'gsIfStill' }, { cmd: 'gsWarnLight' }];
  }
  // One WAIT UNTIL + GRAB per berry the goal asks for — the belt keeps
  // bringing them, so catching more is the same idea repeated.
  const need = level.berryGoal?.needBerries ?? 1;
  const steps: GwSensorStep[] = [{ cmd: 'gsStartBelt' }];
  for (let i = 0; i < need; i++) steps.push({ cmd: 'gsWaitUntil' }, { cmd: 'gsGrab' });
  return steps;
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
  if (level.prefill) {
    if (!level.prefill.every((st) => level.commands.includes(st.cmd))) {
      errors.push('The prefilled program uses tiles this level does not offer.');
    }
    if (level.prefill.length > level.maxSlots) errors.push('The prefilled program does not fit the deck.');
    const buggyWins = level.machine === 'berry'
      ? berryGoalMet(level.berryGoal ?? { needBerries: 1 }, runSensorMachine(level.prefill.map((x) => ({ ...x })), 'berry').finalState)
      : workshopRunCorrect(runSensorMachine(level.prefill.map((x) => ({ ...x })), 'workshop', { gearTurning: true }).finalState, true)
        && workshopRunCorrect(runSensorMachine(level.prefill.map((x) => ({ ...x })), 'workshop', { gearTurning: false }).finalState, false);
    if (buggyWins) errors.push('A debug level\'s prefilled program must NOT already work.');
  }
  return errors;
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
  /**
   * A debug-phase level ships with this program already in the slots.
   * It must NOT already win — the child's job is to find what is wrong
   * and repair it (validated below).
   */
  readonly prefill?: readonly GtStep[];
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

/** If–Else, discover phase: one check, two doors — the very first branch. */
export const GW_FIRST_CHOICE: GearworksSorterLevel = {
  id: 'gw-first-choice',
  title: 'Gearworks Garage',
  shortTitle: 'This Way or That',
  family: 'factory',
  goalText: 'Red goes LEFT. Everything else goes RIGHT. Two items, two doors!',
  emoji: '↔️',
  brief: {
    title: 'This Way or That Way!',
    text: 'Two doors, and the paddle can only pick one. IF RED does the very next tile — so RED goes left. Anything that is not red just carries on to the tile after, and that one sends it right. One check, two different endings!',
    emoji: '↔️',
  },
  commands: ['gtIfRed', 'gtSendLeft', 'gtSendRight'],
  maxSlots: 5,
  par: 3,
  stream: [R('red', 'round'), R('blue', 'round')],
  rules: [
    { match: { color: 'red' }, dest: 'left' },
    { match: {}, dest: 'right' },
  ],
  canonical: [{ cmd: 'gtIfRed' }, { cmd: 'gtSendLeft' }, { cmd: 'gtSendRight' }],
  bonus: { kind: 'elseTrick', text: 'One IF, two endings — the last send catches the rest' },
  coachHint: 'IF RED, SEND LEFT, SEND RIGHT. The last send is the "or else"!',
  binLabels: { left: 'Jam', right: 'Pie', pass: 'Lost' },
};

/** Data, discover phase: grouping by SHAPE — colour is not the only thing. */
export const GW_SHAPE_SHELF: GearworksSorterLevel = {
  id: 'gw-shape-shelf',
  title: 'Gearworks Garage',
  shortTitle: 'Shape Shelf',
  family: 'factory',
  goalText: 'Round things LEFT, everything else RIGHT — sort by SHAPE this time!',
  emoji: '⬜',
  brief: {
    title: 'The Shape Shelf!',
    text: 'Same belt, brand new question. Forget the colours — today the machine only cares whether a thing is ROUND. IF ROUND asks that one question, and everything that is not round rolls on to the next tile. Things can be grouped by whatever you choose to look at!',
    emoji: '⬜',
  },
  commands: ['gtIfRound', 'gtSendLeft', 'gtSendRight'],
  maxSlots: 5,
  par: 3,
  stream: [R('red', 'round'), R('blue', 'square')],
  megaStream: [
    R('red', 'round'), R('blue', 'square'), R('blue', 'round'),
    R('red', 'square'), R('red', 'round'),
  ],
  rules: [
    { match: { shape: 'round' }, dest: 'left' },
    { match: {}, dest: 'right' },
  ],
  canonical: [{ cmd: 'gtIfRound' }, { cmd: 'gtSendLeft' }, { cmd: 'gtSendRight' }],
  bonus: { kind: 'megaBatch', text: 'Sort the MEGA batch of 5 with the same rule' },
  coachHint: 'IF ROUND, SEND LEFT, SEND RIGHT — one question, and the shape decides!',
  binLabels: { left: 'Balls', right: 'Blocks', pass: 'Lost' },
};

/** Data, debug phase: the rules are right, the doors are swapped. */
export const GW_MIXED_UP_BELT: GearworksSorterLevel = {
  id: 'gw-mixed-up-belt',
  title: 'Gearworks Garage',
  shortTitle: 'Mixed-Up Belt',
  family: 'factory',
  goalText: 'Every berry lands in the wrong basket — find the mix-up and fix it!',
  emoji: '🧺',
  brief: {
    title: 'The Mixed-Up Belt!',
    text: 'This sorter was working yesterday. Today the jam basket is full of blue berries and the pie basket is full of red ones. The IF tiles are asking the right questions — it is the SENDS that got shuffled. Put each send back with its own IF.',
    emoji: '🧺',
  },
  commands: ['gtIfRed', 'gtIfBlue', 'gtSendLeft', 'gtSendRight'],
  maxSlots: 6,
  par: 4,
  stream: [R('red', 'round'), R('blue', 'round'), R('blue', 'round'), R('red', 'round')],
  rules: [
    { match: { color: 'red' }, dest: 'left' },
    { match: { color: 'blue' }, dest: 'right' },
  ],
  prefill: [{ cmd: 'gtIfRed' }, { cmd: 'gtSendRight' }, { cmd: 'gtIfBlue' }, { cmd: 'gtSendLeft' }],
  canonical: [{ cmd: 'gtIfRed' }, { cmd: 'gtSendLeft' }, { cmd: 'gtIfBlue' }, { cmd: 'gtSendRight' }],
  bonus: { kind: 'elseTrick', text: 'Repair it AND shrink it to 3 tiles' },
  coachHint: 'Red belongs in the jam basket on the LEFT. Follow each IF to the send right after it.',
  binLabels: { left: 'Jam', right: 'Pie', pass: 'Lost' },
};

export const GEARWORKS_SORTER_LEVELS: readonly GearworksSorterLevel[] = [
  GW_FIRST_CHOICE,
  GW_SENSOR_SORTER,
  GW_SHAPE_SHELF,
  GW_MIXED_UP_BELT,
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
  if (level.prefill) {
    if (!level.prefill.every((st) => level.commands.includes(st.cmd))) {
      errors.push('The prefilled program uses tiles this level does not offer.');
    }
    if (level.prefill.length > level.maxSlots) errors.push('The prefilled program does not fit the deck.');
    if (runSorter(level.prefill.map((x) => ({ ...x })), level.stream, level.rules).allCorrect) {
      errors.push('A debug level\'s prefilled program must NOT already sort the batch.');
    }
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
  /**
   * A debug-phase level ships with this program already in the slots.
   * It must NOT already win — the child's job is to find what is wrong
   * and repair it (validated below).
   */
  readonly prefill?: readonly GcStep[];
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

/** Variables, debug phase: the dial is being pushed the wrong way. */
export const GW_COUNTER_MIXUP: GearworksCounterLevel = {
  id: 'gw-counter-mixup',
  title: 'Gearworks Garage',
  shortTitle: 'Counter Mix-Up',
  family: 'factory',
  goalText: 'This plan takes berries OUT when it should be putting them in — fix it!',
  emoji: '🔻',
  brief: {
    title: 'The Counter Mix-Up!',
    text: 'The wheel starts at 2 and the jar needs to read 5. Whoever wrote this plan reached for SUBTRACT every time, so the wheel keeps going down. Change the plan so the number climbs to 5 instead.',
    emoji: '🔻',
  },
  machine: 'counter',
  commands: ['gcSet', 'gcAdd', 'gcSub'],
  maxSlots: 6,
  par: 2,
  start: 2,
  target: 5,
  prefill: [{ cmd: 'gcSub' }, { cmd: 'gcSub' }],
  bonus: { kind: 'bothWays', text: 'Fix it by counting up AND by SETTING it' },
  coachHint: 'SUBTRACT takes one out. ADD 1 puts one in — or SET VALUE jumps the dial straight to 5.',
};

/** Variables, create phase: pick your own number and reach it your own way. */
export const GW_MY_NUMBER: GearworksCounterLevel = {
  id: 'gw-my-number',
  title: 'Gearworks Garage',
  shortTitle: 'My Own Number',
  family: 'factory',
  goalText: 'The jar wants SEVEN — reach it whichever way you like!',
  emoji: '7️⃣',
  brief: {
    title: 'My Own Number!',
    text: 'A big empty jar, a wheel on zero, and no instructions. Get the wheel to 7 however you want — jump straight there, climb one berry at a time, or overshoot and come back. A number the machine remembers does not care how it got there.',
    emoji: '7️⃣',
  },
  machine: 'counter',
  commands: ['gcSet', 'gcAdd', 'gcSub'],
  maxSlots: 10,
  par: 2,
  start: 0,
  target: 7,
  bonus: { kind: 'bothWays', text: 'Reach 7 by SETTING it and by counting up' },
  coachHint: 'There is no wrong road here — SET VALUE is the quick one, ADD 1 is the scenic one!',
};

export const GEARWORKS_COUNTER_LEVELS: readonly GearworksCounterLevel[] = [
  GW_BERRY_COUNTER,
  GW_COUNTER_MIXUP,
  GW_MY_NUMBER,
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
  if (level.prefill) {
    if (!level.prefill.every((st) => level.commands.includes(st.cmd))) {
      errors.push('The prefilled program uses tiles this level does not offer.');
    }
    if (level.prefill.length > level.maxSlots) errors.push('The prefilled program does not fit the deck.');
    const buggyWins = level.machine === 'counter'
      ? runCounter(level.prefill.map((x) => ({ ...x })), { target: level.target }, level.start).success
      : runSafeStop(level.prefill.map((x) => ({ ...x })), { target: level.target }).success;
    if (buggyWins) errors.push('A debug level\'s prefilled program must NOT already work.');
  }
  return errors;
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
  /**
   * A debug-phase level ships with this program already in the slots.
   * It must NOT already win — the child's job is to find what is wrong
   * and repair it (validated below).
   */
  readonly prefill?: readonly JobStep[];
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

/**
 * Functions (and decomposition), debug phase: the job card is fine, but
 * the plan calls it the wrong number of times — a bug in HOW a saved job
 * is used rather than in the job itself.
 */
export const GW_JOB_MIXUP: GearworksJobLevel = {
  id: 'gw-job-mixup',
  title: 'Gearworks Garage',
  shortTitle: 'Job Card Mix-Up',
  family: 'maker',
  goalText: 'The Make Jam job works — the plan that uses it does not. Repair it!',
  emoji: '🗂️',
  brief: {
    title: 'The Job Card Mix-Up!',
    text: 'Somebody saved the Make Jam job and then wrote a plan that only makes ONE jar. The job card is not the problem — the plan is. Fill in the card, look at how many jars the order wants, and make the plan call the job enough times.',
    emoji: '🗂️',
  },
  jobName: 'Make Jam',
  jobIcon: '🍯',
  jobPrims: ['jbFetch', 'jbPress'],
  jobSlots: 3,
  mainCommands: ['jbFetch', 'jbPress', 'jbDoJob', 'jbRepeat'],
  maxSlots: 6,
  target: 3,
  prefill: [{ ...DO }],
  coachHint: 'One DO makes one jar. The order wants three — call the job three times, or DO it with REPEAT ×3.',
  jobSolution: [F, P],
};

export const GEARWORKS_JOB_LEVELS: readonly GearworksJobLevel[] = [
  GW_SAVE_A_JOB,
  GW_JOB_MIXUP,
];

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
  if (level.prefill) {
    if (level.prefill.length > level.maxSlots) errors.push('The prefilled program does not fit the deck.');
    if (runJobProgram(level.jobSolution, level.prefill.map((x) => ({ ...x })), goal).success) {
      errors.push('A debug level\'s prefilled program must NOT already make the jam.');
    }
  }
  return errors;
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
  /**
   * A guide/debug level can ship one lane already written, so the child
   * only has to build the other side of the hand-off.
   */
  readonly prefill?: {
    readonly packer?: readonly SignalStep[];
    readonly mailer?: readonly SignalStep[];
  };
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

/**
 * Messages, discover phase: the smallest possible hand-off. One gift,
 * one signal, both lanes short enough to see the whole idea at once.
 */
export const GW_FIRST_SIGNAL: GearworksSignalLevel = {
  id: 'gw-first-signal',
  title: 'Gearworks Garage',
  shortTitle: 'The First Signal',
  family: 'delivery',
  goalText: 'One machine tells the other it is ready — send ONE gift together!',
  emoji: '📣',
  brief: {
    title: 'The First Signal!',
    text: 'Two machines cannot see each other. The Packer fills a crate and SENDS A SIGNAL — a little message that says "ready!". The Mailer WAITS FOR that signal, and only then ships. Watch the message fly across and deliver one gift.',
    emoji: '📣',
  },
  lanes: {
    packer: { name: 'Packer', icon: '🎁', commands: ['sgFetch', 'sgPack', 'sgSendSignal'], maxSlots: 7 },
    mailer: { name: 'Mailer', icon: '📮', commands: ['sgWaitSignal', 'sgSendCrate'], maxSlots: 5 },
  },
  target: 1,
  coachHint: 'Packer: FETCH, PACK, SEND SIGNAL. Mailer: WAIT SIGNAL, SHIP. That is the whole message — then try it twice!',
};

/**
 * Parallelism, guide phase: the Mailer's side is already written, so the
 * child builds one lane and feels the two timelines line up.
 */
export const GW_RELAY_RACE: GearworksSignalLevel = {
  id: 'gw-relay-race',
  title: 'Gearworks Garage',
  shortTitle: 'Relay Race',
  family: 'delivery',
  goalText: 'The Mailer is ready and waiting — write the Packer\'s half!',
  emoji: '🏃',
  brief: {
    title: 'The Relay Race!',
    text: 'The Mailer already knows its job: wait for a signal, ship, wait again, ship again. It is sitting there doing nothing because nobody has told it anything! Both lanes run at the same time — write the Packer\'s side so the two of them pass 2 gifts between them.',
    emoji: '🏃',
  },
  lanes: {
    packer: { name: 'Packer', icon: '🎁', commands: ['sgFetch', 'sgPack', 'sgSendSignal', 'sgRepeat'], maxSlots: 8 },
    mailer: { name: 'Mailer', icon: '📮', commands: ['sgWaitSignal', 'sgSendCrate', 'sgRepeat'], maxSlots: 6 },
  },
  target: 2,
  prefill: { mailer: [gWait, gShip, gWait, gShip] },
  coachHint: 'The Mailer waits twice, so the Packer must SEND SIGNAL twice: FETCH, PACK, SEND — again!',
};

export const GEARWORKS_SIGNAL_LEVELS: readonly GearworksSignalLevel[] = [
  GW_FIRST_SIGNAL,
  GW_RELAY_RACE,
  GW_TWO_MACHINE,
];

export function signalFullSolution(level?: GearworksSignalLevel): { packer: SignalStep[]; mailer: SignalStep[] } {
  const reps = level?.target ?? 2;
  const packer: SignalStep[] = [];
  const mailer: SignalStep[] = [];
  for (let i = 0; i < reps; i++) {
    packer.push(gFetch, gPack, gSend);
    mailer.push(gWait, gShip);
  }
  return { packer, mailer };
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

/**
 * works (≥1 gift) / clever (all gifts) / creative.
 *
 * The creative star is "shorten it with a loop" — except on a one-gift
 * level, where a loop has nothing to repeat. There the creative move is
 * to keep the hand-off going and deliver a second gift, so the star is
 * always reachable with the tiles the level actually offers.
 */
export function signalStars(level: GearworksSignalLevel, programs: { packer: SignalStep[]; mailer: SignalStep[] }): number {
  const r = runParallel(programs, { target: level.target });
  if (r.finalState.delivered < 1) return 0;
  const allDelivered = r.finalState.delivered >= level.target;
  const creative = level.target > 1
    ? r.usedLoop && allDelivered
    : r.finalState.delivered >= 2;
  return 1 + (allDelivered ? 1 : 0) + (creative ? 1 : 0);
}

/** The "keep going" plan a one-gift level's creative star asks for. */
export function signalEncoreSolution(): { packer: SignalStep[]; mailer: SignalStep[] } {
  return { packer: [gFetch, gPack, gSend, gFetch, gPack, gSend], mailer: [gWait, gShip, gWait, gShip] };
}

export function validateSignalLevel(level: GearworksSignalLevel): string[] {
  const errors: string[] = [];
  if (!level.id.startsWith('gw-')) errors.push(`Level id "${level.id}" must start with gw-.`);
  const goal: SignalGoal = { target: level.target };
  const full = signalFullSolution(level);
  const loop = signalLoopSolution(level);
  const one = signalOneSolution();
  if (full.packer.length > level.lanes.packer.maxSlots) errors.push('Packer full solution exceeds its lane.');
  if (full.mailer.length > level.lanes.mailer.maxSlots) errors.push('Mailer full solution exceeds its lane.');
  if (!runParallel(full, goal).success) errors.push('Full solution must deliver the target.');
  if (signalStars(level, full) !== 2) errors.push('Full (no-loop) solution should earn 2 stars.');
  if (level.target > 1) {
    if (signalStars(level, loop) !== 3) errors.push('Loop solution should earn all 3 stars.');
    if (!level.lanes.packer.commands.includes('sgRepeat') || !level.lanes.mailer.commands.includes('sgRepeat')) {
      errors.push('A loop-star level must offer the Repeat tile in both lanes.');
    }
  } else {
    // one-gift level: the encore must be buildable AND must earn the star
    const encore = signalEncoreSolution();
    if (encore.packer.length > level.lanes.packer.maxSlots) errors.push('The encore must fit the Packer lane.');
    if (encore.mailer.length > level.lanes.mailer.maxSlots) errors.push('The encore must fit the Mailer lane.');
    if (signalStars(level, encore) !== 3) errors.push('A second hand-off should earn all 3 stars.');
  }
  // On a one-gift level the single hand-off IS the full solution, so
  // there is no shorter run to score lower — that rung only exists when
  // the level asks for more than one gift.
  if (level.target > 1 && signalStars(level, one) !== 1) {
    errors.push('One-handoff solution should earn 1 star.');
  }
  if (level.prefill) {
    const lanes = level.lanes;
    if ((level.prefill.packer?.length ?? 0) > lanes.packer.maxSlots) errors.push('Prefilled Packer lane does not fit.');
    if ((level.prefill.mailer?.length ?? 0) > lanes.mailer.maxSlots) errors.push('Prefilled Mailer lane does not fit.');
    const asRun = { packer: [...(level.prefill.packer ?? [])], mailer: [...(level.prefill.mailer ?? [])] };
    if (runParallel(asRun, goal).success) errors.push('A prefilled level must still leave work for the child.');
  }
  // shipping immediately (before any pack) ships an empty crate — the
  // signal is what makes the hand-off reliable rather than a timing gamble
  const shipEarly = runParallel({ packer: full.packer, mailer: [gShip] }, goal);
  if (shipEarly.finalState.delivered > 0) errors.push('An immediate ship (before a pack) must not deliver a gift.');
  // no-send must deadlock
  const noSend = runParallel({ packer: [gFetch, gPack], mailer: [gWait, gShip] }, goal);
  if (!noSend.deadlocked) errors.push('A missing SEND SIGNAL must deadlock the Mailer.');
  return errors;
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

/**
 * Debugging, discover phase: the child's first meeting with the ACTIVITY
 * of debugging. One machine, one wrong tile, and a hint that says exactly
 * what to look for — nothing here is a test.
 */
export const GW_ONE_WRONG_TILE: GearworksDebugLevel = {
  id: 'gw-one-wrong-tile',
  title: 'Gearworks Garage',
  shortTitle: 'One Wrong Tile',
  family: 'bench',
  goalText: 'One tile is in the wrong place. Run it, watch, and put it right!',
  emoji: '🔍',
  brief: {
    title: 'One Wrong Tile!',
    text: 'Here is a secret about machines: when one goes wrong, it is almost never ALL wrong. Usually it is one tile. Press BOP, watch the Think Trail to see the exact moment it goes wrong, and fix just that tile. That is what debugging is.',
    emoji: '🔍',
  },
  puzzles: [
    {
      n: 1, title: 'The Early Belt-Stop',
      brief: 'This machine makes no jam at all. The belt starts — and then somebody turns it straight back off, so the berry never arrives. Run it, watch the Think Trail, and take that tile out.',
      program: [dSM, dSC, dXC, dWS, dLP, dRP, dXM],
      commands: ALL_JAM, maxSlots: 8,
      goal: { minJam: 1 },
      coachHint: 'Look at tile 3: BELT OFF, right after BELT ON. Remove it and the berry can ride in!',
      fixed: [dSM, dSC, dWS, dLP, dRP, dXC, dXM],
    },
  ],
};

/**
 * Debugging, build phase: no tile is named for them. Two machines, two
 * different faults, and hints that describe the SYMPTOM rather than the
 * cure — the child builds the repair.
 */
export const GW_MACHINE_CLINIC: GearworksDebugLevel = {
  id: 'gw-machine-clinic',
  title: 'Gearworks Garage',
  shortTitle: 'Machine Clinic',
  family: 'bench',
  goalText: 'Two poorly machines, no clues given — diagnose them yourself!',
  emoji: '🩺',
  brief: {
    title: 'The Machine Clinic!',
    text: 'You know the drill now, so this time nobody is going to tell you which tile is wrong. Run the machine, read the Think Trail, decide where the story stops making sense, change ONE thing, and run it again. Change one thing at a time and the machine will tell you if you were right.',
    emoji: '🩺',
  },
  puzzles: [
    {
      n: 1, title: 'The Belt That Never Starts',
      brief: 'This machine has power but makes no jam at all. Something never gets going.',
      program: [dSM, dWS, dLP, dRP, dXC, dXM],
      commands: ALL_JAM, maxSlots: 8,
      goal: { minJam: 1 },
      coachHint: 'Follow the Think Trail from the top and find the first line that cannot possibly happen yet.',
      fixed: [dSM, dSC, dWS, dLP, dRP, dXC, dXM],
    },
    {
      n: 2, title: 'The Impatient Press',
      brief: 'The order is for two jars. This one presses thin air, then manages a single jar.',
      program: [dSM, dSC, dLP, dRP, dWS, dLP, dRP, dXC, dXM],
      commands: ALL_JAM, maxSlots: 12,
      goal: { minJam: 2 },
      coachHint: 'Read the Think Trail from the top and ask: had anything actually arrived yet when the press came down?',
      fixed: [dSM, dSC, dWS, dLP, dRP, dWS, dLP, dRP, dXC, dXM],
    },
  ],
};

/**
 * Debugging, create phase: repair the machine AND take it further than it
 * was ever built to go. Fixing is not the finish line — it is the start
 * of making the thing yours.
 */
export const GW_FIX_AND_FINISH: GearworksDebugLevel = {
  id: 'gw-fix-and-finish',
  title: 'Gearworks Garage',
  shortTitle: 'Fix It, Then Finish It',
  family: 'bench',
  goalText: 'Repair the machine — then make it do MORE than it was built for!',
  emoji: '✨',
  brief: {
    title: 'Fix It, Then Finish It!',
    text: 'This machine was only ever meant to make two jars, and right now it cannot even manage that. So: repair it first. Then the fun part — the order has grown to THREE jars, and nobody has written that plan. It is yours to finish however you like.',
    emoji: '✨',
  },
  puzzles: [
    {
      n: 1, title: 'Repair It',
      brief: 'Two jars were ordered and the belt gives up after one. Get it back to two.',
      program: [dSM, dSC, dWS, dLP, dRP, dXC, dWS, dLP, dRP, dXM],
      commands: ALL_JAM, maxSlots: 12,
      goal: { minJam: 2 },
      coachHint: 'Something switches off in the middle, so the second berry never arrives.',
      fixed: [dSM, dSC, dWS, dLP, dRP, dWS, dLP, dRP, dXC, dXM],
    },
    {
      n: 2, title: 'Now Make It Three',
      brief: 'The order just grew to three jars — and this machine was only ever dialled for two. Stretch it however you like, as long as three jars come out and it switches off safely at the end.',
      program: [dSM, dSC, dWS, dLP, dRP, { cmd: 'jmRepeat', arg: 2 }, dXC, dXM],
      commands: ALL_JAM, maxSlots: 14,
      goal: { minJam: 3, needSafeStop: true },
      coachHint: 'The REPEAT dial says how many times the pressing part runs. Turn it up — or throw it away and write all three out yourself.',
      fixed: [dSM, dSC, dWS, dLP, dRP, { cmd: 'jmRepeat', arg: 3 }, dXC, dXM],
    },
  ],
};

export const GEARWORKS_DEBUG_LEVELS: readonly GearworksDebugLevel[] = [
  GW_ONE_WRONG_TILE,
  GW_BROKEN_MACHINE,
  GW_MACHINE_CLINIC,
  GW_FIX_AND_FINISH,
];

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

/**
 * Parallelism, discover phase: two robots, one beat. Nothing here can go
 * wrong — the point is to hear that both players run at the same time.
 */
export const GW_TWO_ROBOTS: GearworksOrchestraLevel = {
  id: 'gw-two-robots',
  title: 'Gearworks Garage',
  shortTitle: 'Two Robots, One Beat',
  family: 'orchestra',
  goalText: 'Tap squares for two robots — hear them play at the SAME time!',
  emoji: '👯',
  brief: {
    title: 'Two Robots, One Beat!',
    text: 'Two robots, four beats each. Tap a square to give a robot something to play. When two squares sit in the SAME column, both robots play together on that beat — not one after the other. Try stacking a drum and a bell and listen!',
    emoji: '👯',
  },
  tracks: [
    { id: 'drum', label: 'Drum', emoji: '🥁', sound: 'insDrum', color: '#ff5a7a' },
    { id: 'bell', label: 'Bell', emoji: '🔔', sound: 'insBell', color: '#ffb43e' },
  ],
  steps: 4,
  starter: [
    { track: 'drum', step: 0 },
    { track: 'bell', step: 0 },
  ],
  bonus: { text: 'Loop it so the two robots keep playing together' },
  coachHint: 'Squares in the same column play together. Stack them up and BOP!',
};

export const GEARWORKS_ORCHESTRA_LEVELS: readonly GearworksOrchestraLevel[] = [
  GW_TWO_ROBOTS,
  GW_ROBOT_ORCHESTRA,
];

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

// ==================================================================
// Phase 15 — Delivery Depot: queues (first in, first out)
//
// The depot has a LINE of parcels. LOAD always takes the one at the
// FRONT; the truck drives the houses in order and drops each parcel at
// its address. Because the queue is a line and the houses are a row,
// one small loop drains the whole round.
// ==================================================================

export interface GearworksDeliveryLevel {
  readonly id: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly family: GearworksFamilyId;
  readonly goalText: string;
  readonly emoji: string;
  readonly brief: { readonly title: string; readonly text: string; readonly emoji: string };
  readonly commands: readonly DvCommandId[];
  readonly maxSlots: number;
  readonly par: number;
  readonly houses: number;
  /** Parcels in arrival (queue) order; dests run 0..houses-1 so the
   *  first-in-first-out drain lands each one at the matching house. */
  readonly queue: readonly DeliveryPackage[];
  readonly bonus: { readonly text: string };
  readonly coachHint: string;
}

export const GW_MORNING_ROUND: GearworksDeliveryLevel = {
  id: 'gw-morning-round',
  title: 'Gearworks Garage',
  shortTitle: 'Morning Round',
  family: 'delivery',
  goalText: 'Deliver every parcel from the front of the line to its house!',
  emoji: '📦',
  brief: {
    title: 'Delivery Depot!',
    text: 'The parcels wait in a LINE — first in, first out! LOAD always grabs the one at the FRONT and puts it on the truck. DELIVER drops it at the house in front of you, then DRIVE moves to the next house. Deliver all three… and a REPEAT loop can do the whole line for you!',
    emoji: '📦',
  },
  commands: ['dvLoad', 'dvDeliver', 'dvDrive', 'dvRepeat'],
  maxSlots: 9,
  par: 4,
  houses: 3,
  queue: [
    { id: 'p1', dest: 0, emoji: '🎁' },
    { id: 'p2', dest: 1, emoji: '📮' },
    { id: 'p3', dest: 2, emoji: '📚' },
  ],
  bonus: { text: 'One tidy loop — no wasted tiles' },
  coachHint: 'LOAD, DELIVER, DRIVE — then a REPEAT ×3 runs those three tiles for the whole line!',
};

export const GW_RUSH_HOUR: GearworksDeliveryLevel = {
  id: 'gw-rush-hour',
  title: 'Gearworks Garage',
  shortTitle: 'Rush Hour',
  family: 'delivery',
  goalText: 'A longer line! Deliver all four parcels — the same loop still works!',
  emoji: '🚚',
  brief: {
    title: 'Rush Hour!',
    text: 'A bigger round today — four parcels in the queue! The same LOAD, DELIVER, DRIVE loop still drains the whole line: just tap the REPEAT badge up to ×4. One little loop, one big round!',
    emoji: '🚚',
  },
  commands: ['dvLoad', 'dvDeliver', 'dvDrive', 'dvRepeat'],
  maxSlots: 12,
  par: 4,
  houses: 4,
  queue: [
    { id: 'p1', dest: 0, emoji: '🎁' },
    { id: 'p2', dest: 1, emoji: '📮' },
    { id: 'p3', dest: 2, emoji: '📚' },
    { id: 'p4', dest: 3, emoji: '🧁' },
  ],
  bonus: { text: 'Drain the whole queue with one loop' },
  coachHint: 'Same three tiles — LOAD, DELIVER, DRIVE — then REPEAT ×4 for the four parcels!',
};

export const GEARWORKS_DELIVERY_LEVELS: readonly GearworksDeliveryLevel[] = [
  GW_MORNING_ROUND, GW_RUSH_HOUR,
];

export function deliveryGoalOf(level: GearworksDeliveryLevel): DeliveryGoal {
  return { houses: level.houses, queue: level.queue };
}

/** The one-by-one solution: LOAD, DELIVER, DRIVE per parcel (no trailing drive). */
export function deliveryManualSolution(level: GearworksDeliveryLevel): DvStep[] {
  const out: DvStep[] = [];
  for (let i = 0; i < level.queue.length; i++) {
    out.push({ cmd: 'dvLoad' }, { cmd: 'dvDeliver' });
    if (i < level.queue.length - 1) out.push({ cmd: 'dvDrive' });
  }
  return out;
}

/** The tidy loop: LOAD, DELIVER, DRIVE, REPEAT ×queue-length. */
export function deliveryLoopSolution(level: GearworksDeliveryLevel): DvStep[] {
  return [{ cmd: 'dvLoad' }, { cmd: 'dvDeliver' }, { cmd: 'dvDrive' }, { cmd: 'dvRepeat', arg: level.queue.length }];
}

/** works (all delivered right) / clever (used a loop) / creative (par — no waste). */
export function deliveryStars(level: GearworksDeliveryLevel, program: readonly DvStep[]): number {
  const r = runDelivery(program, deliveryGoalOf(level));
  if (!r.allCorrect) return 0;
  return 1 + (r.usedLoop ? 1 : 0) + (program.length <= level.par ? 1 : 0);
}

export function validateDeliveryLevel(level: GearworksDeliveryLevel): string[] {
  const errors: string[] = [];
  if (!level.id.startsWith('gw-')) errors.push(`Level id "${level.id}" must start with gw-.`);
  if (level.houses !== level.queue.length) errors.push('Each parcel needs its own house (houses === queue length).');
  if (level.queue.length > DV_REPEAT_MAX) errors.push('Queue is longer than the loop can repeat (max 4).');
  const goal = deliveryGoalOf(level);
  const manual = deliveryManualSolution(level);
  const loop = deliveryLoopSolution(level);
  if (manual.length > level.maxSlots) errors.push('Manual solution must fit the deck.');
  if (!runDelivery(manual, goal).allCorrect) errors.push('Manual solution must deliver every parcel correctly.');
  if (!runDelivery(loop, goal).allCorrect) errors.push('Loop solution must deliver every parcel correctly (FIFO drain).');
  if (loop.length > level.par) errors.push('Loop solution must fit par.');
  if (loop.length > level.maxSlots) errors.push('Loop solution must fit the deck.');
  if (deliveryStars(level, manual) !== 1) errors.push('Manual solution should earn exactly 1 star.');
  if (deliveryStars(level, loop) !== 3) errors.push('Loop solution should earn all 3 stars.');
  if (manual.length <= loop.length) errors.push('The loop must be shorter than doing it by hand.');
  // The queue must be a real ordered line: dests in arrival order.
  level.queue.forEach((p, i) => { if (p.dest !== i) errors.push(`Parcel ${i + 1} must be addressed to house ${i + 1} (FIFO order).`); });
  return errors;
}

// ==================================================================
// Phase 16 — Paint Parade: nested loops (a loop inside a loop)
//
// An inner REPEAT ROW stamps a line of dots; an outer REPEAT PARADE
// repeats the whole design down the banner. Filling a grid the tidy way
// takes a loop inside a loop.
// ==================================================================

export interface GearworksPaintLevel {
  readonly id: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly family: GearworksFamilyId;
  readonly goalText: string;
  readonly emoji: string;
  readonly brief: { readonly title: string; readonly text: string; readonly emoji: string };
  readonly commands: readonly PpCommandId[];
  readonly maxSlots: number;
  readonly par: number;
  readonly cols: number;
  readonly rows: number;
  readonly bonus: { readonly text: string };
  readonly coachHint: string;
}

export const GW_PAINT_PARADE: GearworksPaintLevel = {
  id: 'gw-paint-parade',
  title: 'Gearworks Garage',
  shortTitle: 'Paint Parade',
  family: 'painter',
  goalText: 'Fill the banner with dots — a row loop inside a parade loop!',
  emoji: '🎨',
  brief: {
    title: 'Paint Parade!',
    text: 'Paint a whole banner of dots! STAMP a dot, STEP along, and REPEAT ROW makes a line. Then NEW ROW drops down and REPEAT PARADE repeats the WHOLE design — a loop inside a loop! Fill every square: 3 across and 2 down.',
    emoji: '🎨',
  },
  commands: ['ppStamp', 'ppStep', 'ppNewRow', 'ppRepeatRow', 'ppRepeatParade'],
  maxSlots: 12,
  par: 5,
  cols: 3,
  rows: 2,
  bonus: { text: 'A loop inside a loop — nested!' },
  coachHint: 'STAMP, STEP, REPEAT ROW ×3 makes a row. Then NEW ROW and REPEAT PARADE ×2 stacks the rows!',
};

export const GW_BIG_BANNER: GearworksPaintLevel = {
  id: 'gw-big-banner',
  title: 'Gearworks Garage',
  shortTitle: 'Big Banner',
  family: 'painter',
  goalText: 'A bigger banner — 4 across and 3 down. The nested loop still fills it!',
  emoji: '🖼️',
  brief: {
    title: 'Big Banner!',
    text: 'A giant banner today — 4 dots across, 3 rows down! Doing it by hand is a LOT of tiles. But the same little nested loop fills it: just tap the Repeat badges up. A loop inside a loop does the whole thing!',
    emoji: '🖼️',
  },
  commands: ['ppStamp', 'ppStep', 'ppNewRow', 'ppRepeatRow', 'ppRepeatParade'],
  maxSlots: 12,
  par: 5,
  cols: 4,
  rows: 3,
  bonus: { text: 'One nested loop paints the whole wall' },
  coachHint: 'STAMP, STEP, REPEAT ROW ×4, NEW ROW, REPEAT PARADE ×3 — a loop inside a loop!',
};

export const GEARWORKS_PAINT_LEVELS: readonly GearworksPaintLevel[] = [
  GW_PAINT_PARADE, GW_BIG_BANNER,
];

export function paintGoalOf(level: GearworksPaintLevel): PaintGoal {
  return { cols: level.cols, rows: level.rows };
}

/** Stamp every cell by hand — no loops (the long baseline, 1 star). */
export function paintManualSolution(level: GearworksPaintLevel): PpStep[] {
  const out: PpStep[] = [];
  for (let r = 0; r < level.rows; r++) {
    for (let c = 0; c < level.cols; c++) out.push({ cmd: 'ppStamp' }, { cmd: 'ppStep' });
    if (r < level.rows - 1) out.push({ cmd: 'ppNewRow' });
  }
  return out;
}

/** One loop only: hand-stamp a row, then the parade loop stacks it (2 stars). */
export function paintOneLoopSolution(level: GearworksPaintLevel): PpStep[] {
  const out: PpStep[] = [];
  for (let c = 0; c < level.cols; c++) out.push({ cmd: 'ppStamp' }, { cmd: 'ppStep' });
  out.push({ cmd: 'ppNewRow' }, { cmd: 'ppRepeatParade', arg: level.rows });
  return out;
}

/** The tidy nested loop: row loop wrapped by a parade loop (3 stars). */
export function paintNestedSolution(level: GearworksPaintLevel): PpStep[] {
  return [
    { cmd: 'ppStamp' }, { cmd: 'ppStep' }, { cmd: 'ppRepeatRow', arg: level.cols },
    { cmd: 'ppNewRow' }, { cmd: 'ppRepeatParade', arg: level.rows },
  ];
}

/** works (banner filled) / clever (used a loop) / creative (nested both loops). */
export function paintStars(level: GearworksPaintLevel, program: readonly PpStep[]): number {
  const r = runPaint(program, paintGoalOf(level));
  if (!r.success) return 0;
  const usedAny = r.usedRowLoop || r.usedParadeLoop;
  const nested = r.usedRowLoop && r.usedParadeLoop;
  return 1 + (usedAny ? 1 : 0) + (nested ? 1 : 0);
}

export function validatePaintLevel(level: GearworksPaintLevel): string[] {
  const errors: string[] = [];
  if (!level.id.startsWith('gw-')) errors.push(`Level id "${level.id}" must start with gw-.`);
  if (level.cols < 2 || level.rows < 2) errors.push('A paint level needs at least a 2×2 banner (so nesting matters).');
  const goal = paintGoalOf(level);
  const manual = paintManualSolution(level);
  const oneLoop = paintOneLoopSolution(level);
  const nested = paintNestedSolution(level);
  if (!runPaint(manual, goal).success) errors.push('Manual solution must fill the banner.');
  if (!runPaint(oneLoop, goal).success) errors.push('One-loop solution must fill the banner.');
  if (!runPaint(nested, goal).success) errors.push('Nested solution must fill the banner.');
  if (paintStars(level, manual) !== 1) errors.push('Manual solution should earn exactly 1 star.');
  if (paintStars(level, oneLoop) !== 2) errors.push('One-loop solution should earn 2 stars.');
  if (paintStars(level, nested) !== 3) errors.push('Nested solution should earn all 3 stars.');
  if (nested.length > level.par) errors.push('Nested solution must fit par.');
  if (nested.length > level.maxSlots) errors.push('Nested solution must fit the deck.');
  if (oneLoop.length > level.maxSlots) errors.push('One-loop solution must fit the deck (the 2-star path must be buildable).');
  if (nested.length >= manual.length) errors.push('The nested loop must be shorter than painting by hand.');
  return errors;
}

// ==================================================================
// Phase 17 — Story Studio: state machines
//
// An actor is always in ONE scene (a state). Each event only moves it
// if there is a transition from the current scene — the same action does
// different things depending on where you are. Reach the target scene.
// ==================================================================

export interface StoryStateDef {
  readonly id: string;
  readonly label: string;
  readonly emoji: string;
  readonly color: string;
}

export interface GearworksStoryLevel {
  readonly id: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly family: GearworksFamilyId;
  readonly goalText: string;
  readonly emoji: string;
  readonly brief: { readonly title: string; readonly text: string; readonly emoji: string };
  readonly actorName: string;
  readonly states: readonly StoryStateDef[];
  readonly transitions: readonly StoryTransition[];
  readonly start: string;
  readonly target: string;
  readonly commands: readonly StoryEventId[];
  readonly maxSlots: number;
  readonly par: number;
  readonly bonus: { readonly text: string };
  /**
   * A debug-phase level ships with this program already in the slots.
   * It must NOT already win — the child's job is to find what is wrong
   * and repair it (validated below).
   */
  readonly prefill?: readonly StoryStep[];
  readonly coachHint: string;
}

export function storyDef(level: GearworksStoryLevel): StoryMachineDef {
  return { states: level.states.map((s) => s.id), transitions: level.transitions, start: level.start };
}

export function storyStateLabel(level: GearworksStoryLevel, id: string): string {
  return level.states.find((s) => s.id === id)?.label ?? id;
}

export const GW_ROBOT_FEELINGS: GearworksStoryLevel = {
  id: 'gw-robot-feelings',
  title: 'Gearworks Garage',
  shortTitle: 'Robot Feelings',
  family: 'story',
  goalText: 'Take Bloop from sleepy to HAPPY — the right events for each mood!',
  emoji: '📖',
  brief: {
    title: 'Story Studio!',
    text: 'Meet Bloop the actor! Bloop is always in one MOOD. Each tile is a thing that happens — but it only works from the right mood! WAKE only works when sleepy; HUG only when curious. Make Bloop happy!',
    emoji: '📖',
  },
  actorName: 'Bloop',
  states: [
    { id: 'sleepy', label: 'sleepy', emoji: '😴', color: '#6f7bd6' },
    { id: 'curious', label: 'curious', emoji: '🤔', color: '#ffb43e' },
    { id: 'happy', label: 'happy', emoji: '😄', color: '#8be04a' },
    { id: 'giggly', label: 'giggly', emoji: '🤪', color: '#ff7ad0' },
  ],
  transitions: [
    { from: 'sleepy', event: 'stWake', to: 'curious' },
    { from: 'curious', event: 'stHug', to: 'happy' },
    { from: 'curious', event: 'stTickle', to: 'giggly' },
    { from: 'happy', event: 'stTickle', to: 'giggly' },
    { from: 'giggly', event: 'stCalm', to: 'happy' },
    { from: 'happy', event: 'stCalm', to: 'curious' },
  ],
  start: 'sleepy',
  target: 'happy',
  commands: ['stWake', 'stHug', 'stTickle', 'stCalm'],
  maxSlots: 6,
  par: 2,
  bonus: { text: 'Reach happy a whole different way' },
  coachHint: 'WAKE the sleepy robot, then HUG the curious one to make it happy!',
};

export const GW_BEDTIME_STORY: GearworksStoryLevel = {
  id: 'gw-bedtime-story',
  title: 'Gearworks Garage',
  shortTitle: 'Bedtime Story',
  family: 'story',
  goalText: 'Tell the bedtime story — get Bloop all the way to ASLEEP!',
  emoji: '🌙',
  brief: {
    title: 'Bedtime Story!',
    text: 'A whole day for Bloop! PLAY and EAT keep the day going, then a big YAWN makes Bloop sleepy — and only then does SLEEP work. Every event needs the right scene before it. Tuck Bloop into bed!',
    emoji: '🌙',
  },
  actorName: 'Bloop',
  states: [
    { id: 'awake', label: 'awake', emoji: '🙂', color: '#6bd0ff' },
    { id: 'playing', label: 'playing', emoji: '😄', color: '#ffcf3e' },
    { id: 'hungry', label: 'hungry', emoji: '😋', color: '#ff7a4d' },
    { id: 'sleepy', label: 'sleepy', emoji: '🥱', color: '#c79bff' },
    { id: 'asleep', label: 'asleep', emoji: '😴', color: '#6f7bd6' },
  ],
  transitions: [
    { from: 'awake', event: 'stPlay', to: 'playing' },
    { from: 'hungry', event: 'stPlay', to: 'playing' },
    { from: 'awake', event: 'stEat', to: 'hungry' },
    { from: 'playing', event: 'stEat', to: 'hungry' },
    { from: 'playing', event: 'stYawn', to: 'sleepy' },
    { from: 'hungry', event: 'stYawn', to: 'sleepy' },
    { from: 'sleepy', event: 'stSleep', to: 'asleep' },
  ],
  start: 'awake',
  target: 'asleep',
  commands: ['stPlay', 'stEat', 'stYawn', 'stSleep'],
  maxSlots: 8,
  par: 3,
  bonus: { text: 'Reach bedtime a whole different way' },
  coachHint: 'PLAY or EAT first, then YAWN to get sleepy, then SLEEP — sleep only works when sleepy!',
};

/**
 * State, guide phase: two moods, two doors. The game names the move in
 * the hint; the child feels that WHERE you are decides WHAT can happen.
 */
export const GW_WAKE_UP_BLOOP: GearworksStoryLevel = {
  id: 'gw-wake-up-bloop',
  title: 'Gearworks Garage',
  shortTitle: 'Wake Up, Bloop',
  family: 'story',
  goalText: 'Bloop is asleep. Wake it, then cheer it up — one mood at a time!',
  emoji: '🌅',
  brief: {
    title: 'Wake Up, Bloop!',
    text: 'Bloop is always in exactly one MOOD, and the mood decides which tiles do anything at all. HUG a sleeping robot and nothing happens — you have to WAKE it first. Follow the arrows on the mood map: sleepy, then curious, then happy.',
    emoji: '🌅',
  },
  actorName: 'Bloop',
  states: [
    { id: 'sleepy', label: 'sleepy', emoji: '😴', color: '#6f7bd6' },
    { id: 'curious', label: 'curious', emoji: '🤔', color: '#ffb43e' },
    { id: 'giggly', label: 'giggly', emoji: '🤪', color: '#ff7ad0' },
    { id: 'happy', label: 'happy', emoji: '😄', color: '#8be04a' },
  ],
  transitions: [
    { from: 'sleepy', event: 'stWake', to: 'curious' },
    { from: 'curious', event: 'stHug', to: 'happy' },
    { from: 'curious', event: 'stTickle', to: 'giggly' },
    { from: 'giggly', event: 'stCalm', to: 'happy' },
  ],
  start: 'sleepy',
  target: 'happy',
  commands: ['stWake', 'stHug', 'stTickle', 'stCalm'],
  maxSlots: 6,
  par: 2,
  bonus: { text: 'Find the giggly way round to happy' },
  coachHint: 'WAKE the sleepy robot first — only then does HUG work. WAKE, then HUG!',
};

export const GEARWORKS_STORY_LEVELS: readonly GearworksStoryLevel[] = [
  GW_WAKE_UP_BLOOP,
  GW_ROBOT_FEELINGS, GW_BEDTIME_STORY,
];

export function storyShortestSolution(level: GearworksStoryLevel): StoryStep[] {
  const seq = shortestStory(storyDef(level), level.target) ?? [];
  return seq.map((cmd) => ({ cmd }));
}

/** works (reached target) / clever (par, no blocked) / creative (two distinct paths). */
export function storyStars(level: GearworksStoryLevel, program: readonly StoryStep[], everBothPaths: boolean): number {
  const r = runStory(program, storyDef(level));
  if (r.finalState !== level.target) return 0;
  return 1 + (program.length <= level.par && r.blockedCount === 0 ? 1 : 0) + (everBothPaths ? 1 : 0);
}

export function validateStoryLevel(level: GearworksStoryLevel): string[] {
  const errors: string[] = [];
  if (!level.id.startsWith('gw-')) errors.push(`Level id "${level.id}" must start with gw-.`);
  const def = storyDef(level);
  const stateIds = new Set(level.states.map((s) => s.id));
  if (!stateIds.has(level.start)) errors.push('Start state is not in the state list.');
  if (!stateIds.has(level.target)) errors.push('Target state is not in the state list.');
  if (level.start === level.target) errors.push('Start and target must differ (or there is no story).');
  for (const t of level.transitions) {
    if (!stateIds.has(t.from) || !stateIds.has(t.to)) errors.push(`Transition ${t.event} names an unknown state.`);
    if (!level.commands.includes(t.event)) errors.push(`Transition uses event ${t.event} that is not an available tile.`);
  }
  const shortest = storyShortestSolution(level);
  if (shortest.length === 0) errors.push('Target must be reachable from the start.');
  if (shortest.length !== level.par) errors.push(`Par (${level.par}) must equal the shortest path (${shortest.length}).`);
  if (shortest.length > level.maxSlots) errors.push('Shortest path must fit the deck.');
  const paths = allStoryPaths(def, level.target);
  const distinct = new Set(paths.map((p) => p.join('>')));
  if (distinct.size < 2) errors.push('There must be at least two distinct paths (so the creative star is reachable).');
  // star ladder
  if (storyStars(level, shortest, false) !== 2) errors.push('Shortest clean path should earn 2 stars.');
  if (storyStars(level, shortest, true) !== 3) errors.push('Two distinct paths should earn all 3 stars.');
  // a longer valid path should still reach (works) but miss clever
  const longer = paths.map((p) => p.map((cmd) => ({ cmd }))).find((p) => p.length > level.par);
  if (longer) {
    if (runStory(longer, def).finalState !== level.target) errors.push('A longer path should still reach the target.');
    if (storyStars(level, longer, false) !== 1) errors.push('A longer path should earn just 1 star.');
  }
  if (level.prefill) {
    if (!level.prefill.every((st) => level.commands.includes(st.cmd))) {
      errors.push('The prefilled program uses tiles this level does not offer.');
    }
    if (level.prefill.length > level.maxSlots) errors.push('The prefilled program does not fit the deck.');
    if (runStory(level.prefill.map((x) => ({ ...x })), def).finalState === level.target) {
      errors.push('A debug level\'s prefilled program must NOT already reach the target.');
    }
  }
  return errors;
}

// ==================================================================
// Phase 18 — Maker Workshop: functions with a parameter
//
// Build one MAKE gadget with an INPUT dial (REPEAT the input), then call
// it with different numbers to build a target block skyline. One
// function, many inputs, many results.
// ==================================================================

export interface GearworksMakerLevel {
  readonly id: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly family: GearworksFamilyId;
  readonly goalText: string;
  readonly emoji: string;
  readonly brief: { readonly title: string; readonly text: string; readonly emoji: string };
  readonly gadgetName: string;
  readonly gadgetSlots: number;
  readonly bodyPrims: readonly MkBodyId[];
  /** Main deck holds MAKE(number) call tiles. */
  readonly maxSlots: number;
  /** Target tower heights, left to right. */
  readonly target: readonly number[];
  readonly bonus: { readonly text: string };
  readonly coachHint: string;
}

export const GW_BLOCK_BOT: GearworksMakerLevel = {
  id: 'gw-block-bot',
  title: 'Gearworks Garage',
  shortTitle: 'Block Bot',
  family: 'maker',
  goalText: 'Build a gadget that stacks blocks — then make three towers of 2!',
  emoji: '🛠️',
  brief: {
    title: 'Maker Workshop!',
    text: 'Make your OWN machine! Build the MAKE gadget: PLACE a block, then REPEAT the input. Now MAKE has a number dial! Call MAKE 2 to stack two blocks. Build three towers of 2 — one gadget does it all!',
    emoji: '🛠️',
  },
  gadgetName: 'MAKE',
  gadgetSlots: 4,
  bodyPrims: ['mkPlace', 'mkRepeatParam'],
  maxSlots: 6,
  target: [2, 2, 2],
  bonus: { text: 'A gadget that reads its input dial' },
  coachHint: 'Gadget: PLACE then REPEAT (input). Then call MAKE with the dial on 2, three times!',
};

export const GW_SKYLINE: GearworksMakerLevel = {
  id: 'gw-skyline',
  title: 'Gearworks Garage',
  shortTitle: 'Skyline',
  family: 'maker',
  goalText: 'A city skyline — towers of 3, 1 and 2! One gadget, three inputs!',
  emoji: '🏙️',
  brief: {
    title: 'Build a Skyline!',
    text: 'Every tower is a different height: 3, then 1, then 2. You could NEVER do that with a gadget that ignores its input — so make MAKE REPEAT the input, then call it MAKE 3, MAKE 1, MAKE 2. Same gadget, three sizes!',
    emoji: '🏙️',
  },
  gadgetName: 'MAKE',
  gadgetSlots: 4,
  bodyPrims: ['mkPlace', 'mkRepeatParam'],
  maxSlots: 6,
  target: [3, 1, 2],
  bonus: { text: 'One gadget builds every size' },
  coachHint: 'Make the gadget PLACE then REPEAT (input). Then MAKE 3, MAKE 1, MAKE 2 — one for each tower!',
};

/**
 * Decomposition, discover phase: one tower, one gadget. The smallest
 * possible version of "give the small job a name, then use the name".
 */
export const GW_ONE_TOWER: GearworksMakerLevel = {
  id: 'gw-one-tower',
  title: 'Gearworks Garage',
  shortTitle: 'Two Little Towers',
  family: 'maker',
  goalText: 'Teach the gadget to stack blocks — then build two little towers!',
  emoji: '🧱',
  brief: {
    title: 'Two Little Towers!',
    text: 'Big jobs are just small jobs with a name. Put PLACE and REPEAT (input) on the gadget card and you have taught the machine what "stack a tower" means. Now call MAKE twice, dial on 2 — and watch your little job do all the work.',
    emoji: '🧱',
  },
  gadgetName: 'MAKE',
  gadgetSlots: 4,
  bodyPrims: ['mkPlace', 'mkRepeatParam'],
  maxSlots: 4,
  target: [2, 2],
  bonus: { text: 'A gadget that reads its input dial' },
  coachHint: 'Gadget: PLACE, then REPEAT (input). Then MAKE 2, MAKE 2 — that is the whole thing!',
};

/**
 * Decomposition, guide phase: the same small job, used twice. The game
 * spells out the move; the child feels the saving for the first time.
 */
export const GW_TWIN_TOWERS: GearworksMakerLevel = {
  id: 'gw-twin-towers',
  title: 'Gearworks Garage',
  shortTitle: 'Twin Towers',
  family: 'maker',
  goalText: 'Two towers, both 3 high — one gadget, called twice!',
  emoji: '🏗️',
  brief: {
    title: 'Twin Towers!',
    text: 'Two towers this time, and they are the same height. You already know how to teach the gadget one tower — so do not write the whole thing twice! Teach it once, then call MAKE 3 and MAKE 3 again. That is what breaking a big job into small jobs buys you.',
    emoji: '🏗️',
  },
  gadgetName: 'MAKE',
  gadgetSlots: 4,
  bodyPrims: ['mkPlace', 'mkRepeatParam'],
  maxSlots: 5,
  target: [3, 3],
  bonus: { text: 'One gadget builds both towers' },
  coachHint: 'Gadget: PLACE, then REPEAT (input). Then MAKE 3, MAKE 3 — the same little job, twice!',
};

export const GEARWORKS_MAKER_LEVELS: readonly GearworksMakerLevel[] = [
  GW_ONE_TOWER, GW_TWIN_TOWERS, GW_BLOCK_BOT, GW_SKYLINE,
];

export function makerGoalOf(level: GearworksMakerLevel): MakerGoal {
  return { target: level.target };
}

/** The parameterized gadget: PLACE then REPEAT(input) (reads the dial). */
export function makerParamBody(): MkBodyStep[] {
  return [{ cmd: 'mkPlace' }, { cmd: 'mkRepeatParam' }];
}

/** A fixed gadget that ignores its input (places a set number). */
export function makerFixedBody(height: number): MkBodyStep[] {
  return Array.from({ length: height }, () => ({ cmd: 'mkPlace' as const }));
}

/** One MAKE call per tower, dialled to each target height. */
export function makerCalls(level: GearworksMakerLevel): MkCall[] {
  return level.target.map((h) => ({ arg: h }));
}

/** works (skyline matches) / clever (one call per tower) / creative (gadget reads its input). */
export function makerStars(level: GearworksMakerLevel, body: readonly MkBodyStep[], main: readonly MkCall[]): number {
  const r = runMaker(body, main, makerGoalOf(level));
  if (!r.match) return 0;
  return 1 + (r.callCount === level.target.length ? 1 : 0) + (r.usesParam ? 1 : 0);
}

export function validateMakerLevel(level: GearworksMakerLevel): string[] {
  const errors: string[] = [];
  if (!level.id.startsWith('gw-')) errors.push(`Level id "${level.id}" must start with gw-.`);
  if (level.target.length < 2) errors.push('A skyline needs at least two towers.');
  if (level.target.some((h) => h < 1 || h > MK_ARG_MAX)) errors.push(`Every tower height must be 1..${MK_ARG_MAX}.`);
  if (level.target.length > level.maxSlots) errors.push('The skyline must fit the main deck (one call per tower).');
  if (makerParamBody().length > level.gadgetSlots) errors.push('The parameterized gadget must fit the gadget card.');
  const goal = makerGoalOf(level);
  const calls = makerCalls(level);
  // the parameterized gadget must earn all 3 stars
  if (!runMaker(makerParamBody(), calls, goal).match) errors.push('The parameterized gadget must build the skyline.');
  if (makerStars(level, makerParamBody(), calls) !== 3) errors.push('The parameterized solution should earn all 3 stars.');
  // a uniform skyline can also be built with a fixed gadget → 2 stars (no input used)
  const uniform = level.target.every((h) => h === level.target[0]);
  if (uniform) {
    const fixed = makerFixedBody(level.target[0]);
    if (!runMaker(fixed, calls, goal).match) errors.push('A fixed gadget should build a uniform skyline.');
    if (makerStars(level, fixed, calls) !== 2) errors.push('A fixed gadget on a uniform skyline should earn 2 stars.');
  } else {
    // a varied skyline is impossible without reading the input
    const fixed = makerFixedBody(level.target[0]);
    if (runMaker(fixed, calls, goal).match) errors.push('A varied skyline must NOT be buildable by a fixed gadget.');
  }
  return errors;
}

