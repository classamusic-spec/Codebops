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
  readonly binLabels: { readonly left: string; readonly right: string; readonly pass: string };
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

export function assertSorterLevelValid(level: GearworksSorterLevel): void {
  const errors = validateSorterLevel(level);
  if (errors.length > 0) {
    throw new Error(`[Gearworks] Sorter level "${level.id}" invalid:\n- ${errors.join('\n- ')}`);
  }
}
