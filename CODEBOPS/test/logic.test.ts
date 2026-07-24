/**
 * CodeBops logic tests — run with: npm run test:logic
 * (bundled via esbuild, executed in node; no browser needed)
 */
import { runProgram, previewPath, MAX_STEPS } from '../src/gameplay/commands/interpreter';
import type { ProgramStep } from '../src/gameplay/commands/interpreter';
import { SPARKLE_MEADOW_1, SPARKLE_MEADOW_2 } from '../src/data/levels/sparkleMeadow';
import {
  BUBBLE_BAY_1, BUBBLE_BAY_2, BUBBLE_BAY_3, BUBBLE_BAY_DEBUG, BUBBLE_BAY_CREATIVE,
} from '../src/data/levels/bubbleBay';
import {
  PATTERN_FOREST_1, PATTERN_FOREST_2, PATTERN_FOREST_3, PATTERN_FOREST_DEBUG, PATTERN_FOREST_CREATIVE,
} from '../src/data/levels/patternForest';
import {
  ROBOT_TOWN_1, ROBOT_TOWN_2, ROBOT_TOWN_3, ROBOT_TOWN_DEBUG, ROBOT_TOWN_CREATIVE,
} from '../src/data/levels/robotTown';
import {
  AGENT_ACADEMY_1, AGENT_ACADEMY_2, AGENT_ACADEMY_3, AGENT_ACADEMY_DEBUG, AGENT_ACADEMY_CREATIVE,
} from '../src/data/levels/agentAcademy';
import { assertLevelValid } from '../src/data/schemas/level';
import { ALL_LEVELS } from '../src/data/levels/index';
import { GEARWORKS_WORLD, GEARWORKS_PICKER, GW_TILES } from '../src/data/gearworks/world';
import { CAMERA_PRESETS, presetIsNormalized } from '../src/rendering/gearworks/cameraPresets';
import {
  runMachine, stepMachine, initialMachine, goalMet, goalMisses, GW_MAX_TICKS,
} from '../src/gameplay/gearworks/machine';
import type { GearworksStep } from '../src/gameplay/gearworks/machine';
import {
  GEARWORKS_MACHINE_LEVELS, GW_MOTOR_START, GW_MOTOR_PROGRAMMER,
  validateMachineLevel, canonicalSolution, bonusMet,
  GEARWORKS_CHAIN_LEVELS, GW_GEAR_TRAIN, GW_BELT_BUILDER,
  validateChainLevel, chainPredictionChoices,
} from '../src/data/gearworks/levels';
import {
  emptyPlacement, withGear, withBelt, propagate, finalDirection,
  neededPieces, chainComplete, chainMisses,
} from '../src/gameplay/gearworks/gearChain';
import {
  runLoopMachine, loopGoalMisses, GL_MAX_ACTIONS,
} from '../src/gameplay/gearworks/loopMachine';
import type { GwLoopStep } from '../src/gameplay/gearworks/loopMachine';
import {
  GEARWORKS_LOOP_LEVELS, GW_GEAR_LOOP, GW_LOOP_LIFT,
  validateLoopLevel, canonicalLoopSolution, longLoopSolution,
} from '../src/data/gearworks/levels';
import {
  runSensorMachine, berryPresent, berryGoalMet, berryGoalMisses,
  workshopRunCorrect, workshopRunMisses, initialSensorMachine,
  GS_ARRIVAL_DELAY, GS_BERRY_WINDOW, GS_MAX_TICKS,
} from '../src/gameplay/gearworks/sensorMachine';
import type { GwSensorStep } from '../src/gameplay/gearworks/sensorMachine';
import {
  GEARWORKS_SENSOR_LEVELS, GW_WAIT_BERRY, GW_SENSOR_WORKSHOP,
  validateSensorLevel, canonicalSensorSolution,
} from '../src/data/gearworks/levels';
import {
  runSorter, sorterMisses, correctDest, itemName,
} from '../src/gameplay/gearworks/sorterMachine';
import type { GtStep, SortItem } from '../src/gameplay/gearworks/sorterMachine';
import {
  GEARWORKS_SORTER_LEVELS, GW_SENSOR_SORTER, GW_CONVEYOR_FACTORY,
  validateSorterLevel, canonicalSorterSolution, elseTrickSolution,
} from '../src/data/gearworks/levels';
import {
  runCounter, counterMisses, runSafeStop, safeStopMisses,
  CN_MAX, SS_RUNAWAY,
} from '../src/gameplay/gearworks/counterMachine';
import type { GcStep } from '../src/gameplay/gearworks/counterMachine';
import {
  GEARWORKS_COUNTER_LEVELS, GW_BERRY_COUNTER, GW_SAFE_STOP,
  validateCounterLevel, canonicalCounterSolution, countUpSolution, foreverFredSolution,
} from '../src/data/gearworks/levels';
import {
  runJam, jamGoalMet, jamMisses, initialJam, JM_SUPPLY,
} from '../src/gameplay/gearworks/jamMachine';
import type { GjStep } from '../src/gameplay/gearworks/jamMachine';
import {
  GW_JAM_MACHINE, validateJamLevel, jamFinalStars,
} from '../src/data/gearworks/levels';
import {
  runJobProgram, jobMisses,
} from '../src/gameplay/gearworks/jobMachine';
import type { JobStep } from '../src/gameplay/gearworks/jobMachine';
import {
  GW_SAVE_A_JOB, validateJobLevel, jobStars,
  jobRawSolution, jobCallSolution, jobLoopSolution,
} from '../src/data/gearworks/levels';
import {
  runParallel, signalMisses, flattenLane, SG_MAX_TICKS,
} from '../src/gameplay/gearworks/signalMachine';
import type { SignalStep } from '../src/gameplay/gearworks/signalMachine';
import {
  GW_TWO_MACHINE, validateSignalLevel, signalStars,
  signalFullSolution, signalLoopSolution, signalOneSolution,
} from '../src/data/gearworks/levels';
import { runJam, jamGoalMet, jamBugIndex } from '../src/gameplay/gearworks/jamMachine';
import {
  GW_BROKEN_MACHINE, validateDebugLevel, debugBugIndex,
} from '../src/data/gearworks/levels';
import {
  GEARWORKS_FACTORY_LEVELS, GW_THREE_WAY, GW_FACTORY_RUSH,
  canonicalSorterSolution as sorterCanon,
} from '../src/data/gearworks/levels';
import {
  emptyPattern, toggleCell, runBeats, beatStats, beatStars,
  serializePattern, deserializePattern, BEAT_LOOP_MAX,
} from '../src/gameplay/gearworks/beatMachine';
import {
  GW_ROBOT_ORCHESTRA, GEARWORKS_ORCHESTRA_LEVELS, validateOrchestraLevel,
  orchestraTrackIds, orchestraStarterPattern, orchestraStars,
} from '../src/data/gearworks/levels';
import {
  evalRule, runLighthouse, lighthouseMisses, condOrder,
} from '../src/gameplay/gearworks/logicMachine';
import type { LlStep } from '../src/gameplay/gearworks/logicMachine';
import {
  GW_NIGHT_LIGHT, GW_STORM_WATCH, GEARWORKS_LIGHTHOUSE_LEVELS,
  validateLighthouseLevel, altOrderSolution, lighthouseStars,
} from '../src/data/gearworks/levels';
import {
  runDelivery, deliveryMisses, deliveryBugIndex,
} from '../src/gameplay/gearworks/deliveryMachine';
import type { DvStep } from '../src/gameplay/gearworks/deliveryMachine';
import {
  GW_MORNING_ROUND, GW_RUSH_HOUR, GEARWORKS_DELIVERY_LEVELS,
  validateDeliveryLevel, deliveryGoalOf, deliveryManualSolution,
  deliveryLoopSolution, deliveryStars,
} from '../src/data/gearworks/levels';
import {
  runPaint, expandPaint, paintMisses, cellKey,
} from '../src/gameplay/gearworks/paintMachine';
import type { PpStep } from '../src/gameplay/gearworks/paintMachine';
import {
  GW_PAINT_PARADE, GW_BIG_BANNER, GEARWORKS_PAINT_LEVELS,
  validatePaintLevel, paintGoalOf, paintManualSolution,
  paintOneLoopSolution, paintNestedSolution, paintStars,
} from '../src/data/gearworks/levels';
import {
  runStory, storyReached, takenPath, shortestStory, allStoryPaths, storyMisses,
} from '../src/gameplay/gearworks/storyMachine';
import type { StoryStep } from '../src/gameplay/gearworks/storyMachine';
import {
  GW_ROBOT_FEELINGS, GW_BEDTIME_STORY, GEARWORKS_STORY_LEVELS,
  validateStoryLevel, storyDef, storyShortestSolution, storyStars, storyStateLabel,
} from '../src/data/gearworks/levels';
import {
  runGadget, runMaker, gadgetUsesParam, makerMisses,
} from '../src/gameplay/gearworks/makerMachine';
import type { MkBodyStep, MkCall } from '../src/gameplay/gearworks/makerMachine';
import {
  GW_BLOCK_BOT, GW_SKYLINE, GEARWORKS_MAKER_LEVELS,
  validateMakerLevel, makerGoalOf, makerParamBody, makerFixedBody,
  makerCalls, makerStars,
} from '../src/data/gearworks/levels';

let pass = 0, fail = 0;
function check(name: string, cond: boolean): void {
  if (cond) { pass++; console.log('  ✓', name); }
  else { fail++; console.log('  ✗ FAIL:', name); }
}
const P = (...cmds: Array<ProgramStep['cmd'] | [ProgramStep['cmd'], number]>): ProgramStep[] =>
  cmds.map((c) => (Array.isArray(c) ? { cmd: c[0], arg: c[1] } : { cmd: c }));

// --- every level validates ---
for (const l of ALL_LEVELS) {
  try { assertLevelValid(l); check(`${l.id} validates`, true); }
  catch (e) { check(`${l.id} validates: ${e}`, false); }
}

// --- World 1: absolute arrows ---
{
  const r = runProgram(SPARKLE_MEADOW_1, P('moveRight', 'moveRight', 'grab', 'moveRight', 'moveDown', 'moveDown', 'drop'));
  check('sm-1 canonical (arrows) succeeds', r.success);
}
{
  const r = runProgram(SPARKLE_MEADOW_2, P('moveUp', 'moveUp', 'grab', 'moveRight', 'moveRight', 'moveDown', 'moveDown', 'drop'));
  check('sm-2 canonical (arrows) succeeds', r.success);
}
{
  const r = runProgram(SPARKLE_MEADOW_1, P('moveUp'));
  check('moveUp off the north edge bumps', r.events.some((e) => e.type === 'bump'));
}
{
  const r = runProgram(SPARKLE_MEADOW_1, P('moveDown'));
  check('moveDown stays in facing-independent row+1', r.finalState.actors[0].row === 1);
  check('sidesteps never change facing', r.finalState.actors[0].dir === 'E');
}
{
  // dropFail when hands are empty
  const r = runProgram(SPARKLE_MEADOW_1, P('drop'));
  check('drop with empty hands → dropFail event', r.events.some((e) => e.type === 'dropFail'));
}

// --- World 2: loops ---
{
  const r = runProgram(BUBBLE_BAY_1, P('moveRight', ['repeat', 3], 'grab', 'moveRight', 'drop'));
  check('bb-1 loop solution succeeds', r.success);
  check('bb-1 repeat runs 3 iterations', r.events.filter((e) => e.type === 'loopIter').length === 3);
}
{
  const r = runProgram(BUBBLE_BAY_2, P('moveRight', 'grab', ['repeat', 3], 'moveRight', 'drop'));
  check('bb-2 multi-pearl succeeds', r.success);
}
{
  const r = runProgram(BUBBLE_BAY_3, P('moveRight', 'grab', 'repeatUntil', 'moveRight', 'drop'));
  check('bb-3 repeat-until succeeds', r.success && !r.overflowed);
}
{
  const broken = runProgram(BUBBLE_BAY_DEBUG, BUBBLE_BAY_DEBUG.prefill!);
  check('bb-debug prefill fails (overshoot)', !broken.success);
  const fixed = runProgram(BUBBLE_BAY_DEBUG, P('moveRight', ['repeat', 2], 'grab', 'moveRight', 'drop'));
  check('bb-debug fixed (x2) succeeds', fixed.success);
}
{
  const r = runProgram(BUBBLE_BAY_CREATIVE, P('moveRight', ['repeat', 2], 'grab', 'moveRight', ['repeat', 2], 'moveUp', 'moveUp', 'drop'));
  check('bb-creative loop solution succeeds', r.success);
}
{
  const r = runProgram(BUBBLE_BAY_3, P('grab', 'repeatUntil'));
  check('repeatUntil overflow triggers Fred', r.overflowed && r.events.some((e) => e.type === 'loopOverflow'));
}
{
  const r = runProgram(BUBBLE_BAY_1, P('repeat'));
  check('repeat with empty block fails gently', r.events.some((e) => e.type === 'loopFail') && !r.success);
}

// --- World 3: conditions ---
{
  const r = runProgram(PATTERN_FOREST_1, P('moveRight', 'moveRight', 'ifFlower', 'grab', 'moveRight', 'moveRight', 'drop'));
  check('pf-1 IF-solution succeeds', r.success);
  check('pf-1 emits a passing condition', r.events.some((e) => e.type === 'condition' && e.ok));
}
{
  // Blind grabbing poisons the fairy ring (wrong-kind item on goal)
  const blind = runProgram(PATTERN_FOREST_2, P('moveRight', 'grab', 'moveRight', 'grab', 'moveRight', 'grab', 'moveRight', 'drop'));
  check('pf-2 blind grabs poison the ring → fail', !blind.success);
  const careful = runProgram(PATTERN_FOREST_2, P('moveRight', 'ifFlower', 'grab', 'moveRight', 'ifFlower', 'grab', 'moveRight', 'ifFlower', 'grab', 'moveRight', 'drop'));
  check('pf-2 IF-pattern succeeds', careful.success);
  const skips = careful.events.filter((e) => e.type === 'condSkip').length;
  check('pf-2 two mushroom grabs skipped', skips === 2);
}
{
  const r = runProgram(PATTERN_FOREST_3, P('moveRight', 'ifFlower', 'grab', ['repeat', 4], 'moveRight', 'drop'));
  check('pf-3 loop+IF combo succeeds', r.success);
  check('pf-3 collects exactly the 2 flowers',
    r.events.filter((e) => e.type === 'grab').length === 2 &&
    r.events.filter((e) => e.type === 'condSkip').length === 2);
}
{
  const broken = runProgram(PATTERN_FOREST_DEBUG, PATTERN_FOREST_DEBUG.prefill!);
  check('pf-debug prefill poisons ring → fail', !broken.success);
  const fixed = runProgram(PATTERN_FOREST_DEBUG, P('moveRight', 'ifFlower', 'grab', ['repeat', 4], 'moveRight', 'drop'));
  check('pf-debug IF-fix succeeds', fixed.success);
}
{
  const r = runProgram(PATTERN_FOREST_CREATIVE, P(
    'moveRight', ['repeat', 3], 'ifFlower', 'grab', 'moveRight', 'moveRight', 'drop', 'moveDown', 'moveLeft', 'ifFlower', 'grab', 'moveRight', 'drop',
  ));
  check('pf-creative both rings succeed', r.success);
}
{
  // IF with nothing there → next tile skipped, level still runs
  const r = runProgram(PATTERN_FOREST_1, P('ifFlower', 'grab', 'moveRight'));
  check('IF on empty tile skips the grab', r.events.some((e) => e.type === 'condSkip') && !r.events.some((e) => e.type === 'grab'));
}

// --- World 4: teamwork ---
{
  const r = runProgram(ROBOT_TOWN_1, P('moveRight', 'grab', 'moveRight', 'drop', 'swap', 'moveRight', 'grab', 'moveRight', 'drop'));
  check('rt-1 swap teamwork succeeds', r.success);
  check('rt-1 emits one swap', r.events.filter((e) => e.type === 'swap').length === 1);
  check('rt-1 second bot carried battery-b',
    r.finalState.items['battery-b'] !== undefined && 'delivered' in (r.finalState.items['battery-b'] as object));
}
{
  const r = runProgram(ROBOT_TOWN_2, P('moveUp', 'moveUp', 'grab', 'moveRight', 'moveRight', 'drop', 'swap', 'moveUp', 'moveUp', 'grab', 'moveLeft', 'moveLeft', 'drop'));
  check('rt-2 boulevards succeeds', r.success);
}
{
  const r = runProgram(ROBOT_TOWN_3, P('moveRight', ['repeat', 2], 'grab', 'moveRight', ['repeat', 2], 'drop', 'swap', 'moveLeft', 'grab', 'moveLeft', 'moveLeft', 'drop'));
  check('rt-3 loops + teamwork succeed', r.success);
}
{
  // Zip bonks on the glass dome; Bolt rolls through
  const zips = runProgram(ROBOT_TOWN_DEBUG, P('moveDown', 'moveRight', 'moveRight'));
  check('zip bumps on glass dome (zipBlocked)', zips.events.some((e) => e.type === 'bump'));
  const bolts = runProgram(ROBOT_TOWN_DEBUG, P('swap', 'moveRight', 'moveRight'));
  check('bolt rolls under the glass', bolts.events.filter((e) => e.type === 'move').length === 2 && !bolts.events.some((e) => e.type === 'bump'));
  const broken = runProgram(ROBOT_TOWN_DEBUG, ROBOT_TOWN_DEBUG.prefill!);
  check('rt-debug prefill fails (no swap)', !broken.success);
  const fixed = runProgram(ROBOT_TOWN_DEBUG, P('moveRight', 'grab', 'moveRight', 'drop', 'swap', 'moveRight', 'grab', 'moveRight', 'drop'));
  check('rt-debug swap-fix succeeds', fixed.success);
}
{
  const r = runProgram(ROBOT_TOWN_CREATIVE, P('moveUp', 'moveRight', 'grab', 'moveRight', ['repeat', 4], 'drop', 'swap', 'moveRight', 'moveDown', 'grab', 'moveRight', 'drop'));
  check('rt-creative towers succeed', r.success);
}

// --- World 5: helper rules ---
const BADGE_RULE = { trigger: 'badge', action: 'grab' } as const;
const MUSH_RULE = { trigger: 'mushroom', action: 'grab' } as const;
{
  const r = runProgram(AGENT_ACADEMY_1, P('moveRight', ['repeat', 3], 'moveRight', 'drop'), BADGE_RULE);
  check('aa-1 rule solution succeeds', r.success);
  check('aa-1 rule fires 3 times', r.events.filter((e) => e.type === 'ruleFire').length === 3);
  check('aa-1 rule does the grabbing (3 auto-grabs)', r.events.filter((e) => e.type === 'grab').length === 3);
}
{
  const r = runProgram(AGENT_ACADEMY_1, P('moveRight', ['repeat', 3], 'moveRight', 'drop'));
  check('aa-1 with no rule selected delivers nothing → fail', !r.success);
}
{
  const good = runProgram(AGENT_ACADEMY_2, P('moveRight', ['repeat', 3], 'moveRight', 'drop'), BADGE_RULE);
  check('aa-2 badge rule succeeds (mushroom left alone)', good.success);
  const bad = runProgram(AGENT_ACADEMY_2, P('moveRight', ['repeat', 3], 'moveRight', 'drop'), MUSH_RULE);
  check('aa-2 mushroom rule poisons the trophy → fail', !bad.success);
}
{
  // loops clamp to ×4, so the fifth right is its own tile
  const r = runProgram(AGENT_ACADEMY_3, P('moveRight', ['repeat', 4], 'moveRight', 'moveDown', 'moveDown', 'drop'), BADGE_RULE);
  check('aa-3 laps succeed', r.success);
  check('aa-3 collects exactly the 3 badges', r.events.filter((e) => e.type === 'grab').length === 3);
}
{
  const broken = runProgram(AGENT_ACADEMY_DEBUG, AGENT_ACADEMY_DEBUG.prefill!, BADGE_RULE);
  check('aa-debug prefill still blind-grabs the mushroom → fail', !broken.success);
  const fixed = runProgram(AGENT_ACADEMY_DEBUG, P('moveRight', ['repeat', 3], 'moveRight', 'drop'), BADGE_RULE);
  check('aa-debug fixed (rule only, no grab tile) succeeds', fixed.success);
  check('aa-debug rule fires exactly twice', fixed.events.filter((e) => e.type === 'ruleFire').length === 2);
}
{
  // loop-chain route: each loop's body is the single tile before it → 11 tiles ≤ par
  const r = runProgram(
    AGENT_ACADEMY_CREATIVE,
    P('moveRight', ['repeat', 3], 'moveRight', ['repeat', 2], 'moveDown', ['repeat', 2], 'moveLeft', ['repeat', 4], 'moveRight', ['repeat', 4], 'drop'),
    BADGE_RULE,
  );
  check('aa-creative finals succeed (loop-chain route)', r.success);
  const delivered = Object.values(r.finalState.items).filter((loc) => typeof loc === 'object' && 'delivered' in loc).length;
  check('aa-creative delivers all 5 badges', delivered === 5);
  check('aa-creative fires the rule (bonus star)', r.events.some((e) => e.type === 'ruleFire'));
  // collectAll: a shortcut that leaves badge-5 behind must NOT win
  const shortcut = runProgram(
    AGENT_ACADEMY_CREATIVE,
    P('moveRight', ['repeat', 4], 'moveRight', 'moveDown', 'moveDown', 'drop'),
    BADGE_RULE,
  );
  check('aa-creative shortcut missing badges → fail (collectAll)', !shortcut.success);
}
{
  const r = runProgram(AGENT_ACADEMY_1, P('moveRight', 'moveRight', 'moveRight', 'moveRight', 'drop'), BADGE_RULE);
  const fire = r.events.find((e) => e.type === 'ruleFire');
  check('ruleFire event carries the actor index', fire !== undefined && 'actor' in fire && fire.actor === 0);
}

// --- misc safety ---
{
  const path = previewPath(SPARKLE_MEADOW_1, P('moveRight', 'moveRight'));
  check('preview tracks arrow moves', path.length === 2 && path[1].cell.col === 2);
}
{
  const r = runProgram(BUBBLE_BAY_1, P('moveRight', ['repeat', 2], ['repeat', 2], 'grab'));
  check('back-to-back repeats stay bounded', r.events.length < MAX_STEPS * 3);
}

// --- Gearworks Garage: world + camera ---
{
  check('gearworks world id registered', GEARWORKS_WORLD.id === 'gearworks-garage');
  const ids = new Set(GEARWORKS_PICKER.map((e) => (e.kind === 'soon' ? e.id : e.level.id)));
  check('gearworks picker ids unique', ids.size === GEARWORKS_PICKER.length);
  check('gearworks picker leads with machine levels', GEARWORKS_PICKER[0].kind === 'machine');
  check('every gearworks command has a tile', GEARWORKS_MACHINE_LEVELS
    .every((l) => l.commands.every((c) => !!GW_TILES[c])));
  check('camera presets normalized', Object.values(CAMERA_PRESETS).every(presetIsNormalized));
  check('bench pitch is diorama-flat (gears face camera)', CAMERA_PRESETS.bench.pitchDeg <= 18);
  check('factory pitch higher than bench (lane separation)',
    CAMERA_PRESETS.factory.pitchDeg > CAMERA_PRESETS.workshop.pitchDeg
    && CAMERA_PRESETS.workshop.pitchDeg > CAMERA_PRESETS.bench.pitchDeg);
  check('preset fov widens on portrait aspect', Object.values(CAMERA_PRESETS)
    .every((p) => p.fovFor(0.6) > p.fovFor(1.8)));
}

// --- Gearworks machine core (Phase 2) ---
const GP = (...cmds: Array<GearworksStep['cmd'] | [GearworksStep['cmd'], number]>): GearworksStep[] =>
  cmds.map((c) => (Array.isArray(c) ? { cmd: c[0], arg: c[1] } : { cmd: c }));

for (const l of GEARWORKS_MACHINE_LEVELS) {
  const errs = validateMachineLevel(l);
  check(`${l.id} validates`, errs.length === 0);
  const r = runMachine(canonicalSolution(l), l.goal);
  check(`${l.id} canonical solution wins`, r.success);
  check(`${l.id} canonical fits par (clever star)`, canonicalSolution(l).length <= l.par);
}

{
  // reducer basics: start/stop + purity
  const s0 = initialMachine();
  const r1 = stepMachine(s0, { cmd: 'gwStart' }, 0);
  check('start turns motor on', r1.state.motor.on && r1.events.some((e) => e.type === 'motorOn'));
  check('reducer is pure (input untouched)', s0.motor.on === false && s0.ticks === 0);
  const r2 = stepMachine(r1.state, { cmd: 'gwStop' }, 1);
  check('stop turns motor off', !r2.state.motor.on && r2.events.some((e) => e.type === 'motorOff'));
  const r3 = stepMachine(r2.state, { cmd: 'gwStop' }, 2);
  check('stop when off is a gentle noop', r3.events.some((e) => e.type === 'noop' && e.reason === 'alreadyOff'));
}
{
  // wait only works while on; spin sign follows direction
  const idle = runMachine(GP('gwWait', 'gwWait'), { minRunTicks: 1, endStopped: true });
  check('waiting with motor off does no work', !idle.success
    && idle.events.filter((e) => e.type === 'waitIdle').length === 2);
  const cw = runMachine(GP('gwStart', 'gwWait', 'gwStop'), { minRunTicks: 1, endStopped: true });
  check('start-wait-stop wins motor-start goal', cw.success && cw.finalState.motor.spun > 0);
  const ccw = runMachine(GP('gwStart', 'gwSpinCcw', 'gwWait', 'gwStop'), { minRunTicks: 1, endStopped: true });
  check('ccw wait spins negative', ccw.finalState.motor.spun < 0 && ccw.finalState.motor.ranDir.ccw === 1);
}
{
  // speed parameter + fast/ccw goal checks
  const fast = runMachine(GP('gwStart', ['gwSetSpeed', 3], 'gwWait', 'gwSpinCcw', 'gwWait', 'gwStop'), GW_MOTOR_PROGRAMMER.goal);
  check('motor-programmer canonical-style program wins', fast.success);
  check('fast run recorded at speed 3', fast.finalState.motor.ranAt[3] >= 1);
  const noStop = runMachine(GP('gwStart', ['gwSetSpeed', 3], 'gwWait', 'gwSpinCcw', 'gwWait'), GW_MOTOR_PROGRAMMER.goal);
  check('missing safe stop fails + explains', !noStop.success
    && goalMisses(GW_MOTOR_PROGRAMMER.goal, noStop.finalState).some((m) => m.includes('STOP')));
  const slowOnly = runMachine(GP('gwStart', ['gwSetSpeed', 1], 'gwWait', 'gwStop'), GW_MOTOR_PROGRAMMER.goal);
  check('never-fast fails needFastRun', !slowOnly.success);
  check('speed arg clamps to 1..3', stepMachine(initialMachine(), { cmd: 'gwSetSpeed', arg: 9 }, 0).state.motor.speed === 3);
}
{
  // bonus rules + safety cap
  const twoWaits = runMachine(GP('gwStart', 'gwWait', 'gwWait', 'gwStop'), GW_MOTOR_START.goal);
  const rt = twoWaits.finalState.motor.ranDir.cw + twoWaits.finalState.motor.ranDir.ccw;
  check('waitTwice bonus met with two waits', bonusMet(GW_MOTOR_START.bonus, twoWaits.finalState.motor.ranAt, rt));
  const dial = runMachine(
    GP('gwStart', ['gwSetSpeed', 1], 'gwWait', ['gwSetSpeed', 3], 'gwWait', 'gwSpinCcw', 'gwWait', 'gwStop'),
    GW_MOTOR_PROGRAMMER.goal,
  );
  const rt2 = dial.finalState.motor.ranDir.cw + dial.finalState.motor.ranDir.ccw;
  check('triedSlowAndFast bonus met across the dial', dial.success
    && bonusMet(GW_MOTOR_PROGRAMMER.bonus, dial.finalState.motor.ranAt, rt2));
  const huge = runMachine(Array.from({ length: 100 }, () => ({ cmd: 'gwWait' as const })), GW_MOTOR_START.goal);
  check('tick cap bounds runaway programs', huge.overflowed && huge.finalState.ticks <= GW_MAX_TICKS);
  check('goalMet direct: fresh machine fails motor-start', !goalMet(GW_MOTOR_START.goal, initialMachine()));
}

// --- Gearworks gear chains (Phase 3) ---
for (const l of GEARWORKS_CHAIN_LEVELS) {
  const errs = validateChainLevel(l);
  check(`${l.id} validates`, errs.length === 0);
  check(`${l.id} has exactly one correct prediction`,
    chainPredictionChoices(l).filter((c) => c.correct).length === 1);
}

{
  // full gear train: mesh links reverse direction at every hand-off
  const spec = GW_GEAR_TRAIN.chain;
  let p = emptyPlacement(spec);
  check('empty placement keeps fixed gears', p.gears[0] && p.gears[3] && !p.gears[1] && !p.gears[2]);
  check('gear train needs 2 gears, 0 belts',
    neededPieces(spec).gears === 2 && neededPieces(spec).belts === 0);
  p = withGear(withGear(p, 1, true), 2, true);
  check('placing all gears completes the chain', chainComplete(spec, p));
  const flow = propagate(spec, p, true);
  check('complete train reaches the target', flow.reachesTarget && flow.firstBrokenLink === -1);
  check('mesh links alternate direction cw-ccw-cw-ccw',
    flow.dirs[0] === 'cw' && flow.dirs[1] === 'ccw' && flow.dirs[2] === 'cw' && flow.dirs[3] === 'ccw');
  check('finalDirection matches propagate on 3 meshes', finalDirection(spec) === 'ccw');
  check('motor off = nothing turns', propagate(spec, p, false).turning.every((t) => !t));
}
{
  // broken train: power stops at the first gap and the misses explain it
  const spec = GW_GEAR_TRAIN.chain;
  const p = withGear(emptyPlacement(spec), 2, true); // node 1 still empty
  const flow = propagate(spec, p, true);
  check('power stops at the first missing gear',
    flow.firstBrokenLink === 0 && flow.turning[0] && !flow.turning[1] && !flow.turning[2] && !flow.reachesTarget);
  check('node after the gap stays still even with a gear', p.gears[2] && !flow.turning[2]);
  const misses = chainMisses(spec, p);
  check('chain misses point at the empty anchor', misses.length === 1 && misses[0].includes('gear'));
  check('immutable helpers do not mutate', !emptyPlacement(spec).gears[1]);
}
{
  // belt builder: belts pass power but KEEP direction (the lesson)
  const spec = GW_BELT_BUILDER.chain;
  check('belt builder needs 2 gears + 1 belt',
    neededPieces(spec).gears === 2 && neededPieces(spec).belts === 1);
  let p = withGear(withGear(emptyPlacement(spec), 1, true), 2, true);
  check('gears alone do not complete a belt chain', !chainComplete(spec, p));
  const noBelt = propagate(spec, p, true);
  check('missing belt breaks the chain at the belt slot',
    noBelt.firstBrokenLink === 1 && noBelt.turning[1] && !noBelt.turning[2]);
  check('belt miss says to stretch a belt', chainMisses(spec, p).some((m) => m.includes('BELT')));
  p = withBelt(p, 1, true);
  const flow = propagate(spec, p, true);
  check('belted chain reaches the target', flow.reachesTarget);
  check('belt KEEPS direction while meshes flip it',
    flow.dirs[0] === 'cw' && flow.dirs[1] === 'ccw' && flow.dirs[2] === 'ccw' && flow.dirs[3] === 'cw');
  check('belt-builder final direction is cw', finalDirection(spec) === 'cw');
  check('prediction marks cw correct for belt builder',
    chainPredictionChoices(GW_BELT_BUILDER).find((c) => c.correct)?.emoji === '⟳');
  check('prediction marks ccw correct for gear train',
    chainPredictionChoices(GW_GEAR_TRAIN).find((c) => c.correct)?.emoji === '⟲');
  const beltNoGear = propagate(spec, withBelt(emptyPlacement(spec), 1, true), true);
  check('belt without gears still breaks at first empty anchor', beltNoGear.firstBrokenLink === 0);
}

// --- Gearworks loops and lifts (Phase 4) ---
const LP = (...cmds: Array<GwLoopStep['cmd'] | [GwLoopStep['cmd'], number]>): GwLoopStep[] =>
  cmds.map((c) => (Array.isArray(c) ? { cmd: c[0], arg: c[1] } : { cmd: c }));

for (const l of GEARWORKS_LOOP_LEVELS) {
  const errs = validateLoopLevel(l);
  check(`${l.id} validates`, errs.length === 0);
  const short = runLoopMachine(canonicalLoopSolution(l), l.goal, l.machine);
  check(`${l.id} loop solution wins within par`, short.success && canonicalLoopSolution(l).length <= l.par);
  check(`${l.id} loop solution actually loops`, short.usedLoop);
  const long = runLoopMachine(longLoopSolution(l), l.goal, l.machine);
  check(`${l.id} long solution wins too (efficiency comparison)`,
    long.success && !long.usedLoop && longLoopSolution(l).length > l.par);
  check(`${l.id} both plans do the same work`, long.actionsRun === short.actionsRun);
}

{
  // Repeat semantics match the meadow interpreter: body = tiles before it,
  // consumed by the loop (they do NOT also run on their own first)
  const r = runLoopMachine(LP('glTurnGear', 'glRingBell', ['glRepeat', 4]), GW_GEAR_LOOP.goal, 'gearBell');
  check('turn+ring+repeat×4 rings exactly 4 times', r.success && r.finalState.bellRings === 4);
  check('loop events narrate every turn', r.events.filter((e) => e.type === 'loopIter').length === 4);
  const empty = runLoopMachine(LP(['glRepeat', 3]), GW_GEAR_LOOP.goal, 'gearBell');
  check('repeat with nothing before it fails gently', !empty.success
    && empty.events.some((e) => e.type === 'loopFail'));
  const clamped = runLoopMachine(LP('glTurnGear', 'glRingBell', ['glRepeat', 9]), GW_GEAR_LOOP.goal, 'gearBell');
  check('repeat count clamps to 4', clamped.finalState.bellRings === 4);
}
{
  // The bell needs winding: ring without a turn = friendly clunk
  const r = runLoopMachine(LP('glRingBell', ['glRepeat', 4]), GW_GEAR_LOOP.goal, 'gearBell');
  check('unwound rings clunk instead of ring', !r.success
    && r.finalState.bellRings === 0 && r.finalState.clunks === 4);
  check('clunk miss explains the power rule',
    loopGoalMisses(GW_GEAR_LOOP.goal, r.finalState).some((m) => m.includes('power')));
  const partial = runLoopMachine(LP('glTurnGear', 'glRingBell', 'glTurnGear', 'glRingBell'), GW_GEAR_LOOP.goal, 'gearBell');
  check('2-of-4 miss suggests the Repeat tile', !partial.success
    && loopGoalMisses(GW_GEAR_LOOP.goal, partial.finalState).some((m) => m.includes('Repeat')));
}
{
  // Lift: counted loops move the machine; ends of track bump gently
  const win = runLoopMachine(LP('glLiftUp', ['glRepeat', 3], 'glRingBell'), GW_LOOP_LIFT.goal, 'lift');
  check('lift loop reaches floor 3 and delivers', win.success && win.finalState.floor === 3);
  const past = runLoopMachine(LP('glLiftUp', ['glRepeat', 4], 'glRingBell'), GW_LOOP_LIFT.goal, 'lift');
  check('lifting past the top bumps but still delivers', past.success
    && past.events.some((e) => e.type === 'liftBump' && e.at === 'top'));
  const low = runLoopMachine(LP('glLiftUp', 'glLiftUp', 'glRingBell'), GW_LOOP_LIFT.goal, 'lift');
  check('ringing below the top fails with floor coaching', !low.success
    && loopGoalMisses(GW_LOOP_LIFT.goal, low.finalState).some((m) => m.includes('floor')));
  const down = runLoopMachine(LP('glLiftDown'), GW_LOOP_LIFT.goal, 'lift');
  check('down at the bottom bumps', down.events.some((e) => e.type === 'liftBump' && e.at === 'bottom'));
  const trip = runLoopMachine(LP('glLiftUp', ['glRepeat', 3], 'glRingBell', 'glLiftDown', ['glRepeat', 3]), GW_LOOP_LIFT.goal, 'lift');
  check('round trip delivers AND comes home (creative star)', trip.success && trip.finalState.floor === 0);
}
{
  // Step-limit protection bounds any plan
  const huge = runLoopMachine(Array.from({ length: 60 }, () => ({ cmd: 'glTurnGear' as const })), GW_GEAR_LOOP.goal, 'gearBell');
  check('action cap bounds runaway loop plans', huge.overflowed && huge.finalState.actions <= GL_MAX_ACTIONS);
}

// --- Gearworks sensors and waiting (Phase 5) ---
const SP = (...cmds: GwSensorStep['cmd'][]): GwSensorStep[] => cmds.map((cmd) => ({ cmd }));

for (const l of GEARWORKS_SENSOR_LEVELS) {
  const errs = validateSensorLevel(l);
  check(`${l.id} validates`, errs.length === 0);
  check(`${l.id} canonical fits par`, canonicalSensorSolution(l).length <= l.par);
}

{
  // arrival events: the berry shows up on the belt's schedule, not ours
  const r = runSensorMachine(SP('gsStartBelt', 'gsWaitUntil', 'gsGrab'), 'berry');
  check('wait-until grabs the berry', berryGoalMet({ needBerries: 1 }, r.finalState));
  const arrive = r.events.find((e) => e.type === 'berryArrive');
  check('berry arrives exactly on schedule', arrive?.type === 'berryArrive' && arrive.tick === GS_ARRIVAL_DELAY);
  const met = r.events.find((e) => e.type === 'waitUntilMet');
  check('wait-until reports how long it slept', met?.type === 'waitUntilMet' && met.slept === 2);
}
{
  // grabber timing: too early snaps, hand-counted waits also work
  const early = runSensorMachine(SP('gsStartBelt', 'gsGrab'), 'berry');
  check('grabbing too early snaps on air', early.finalState.snaps === 1 && early.finalState.berriesGrabbed === 0);
  check('snap miss coaches wait-until', berryGoalMisses({ needBerries: 1 }, early.finalState).some((m) => m.includes('WAIT UNTIL')));
  const counted = runSensorMachine(SP('gsStartBelt', 'gsWait', 'gsWait', 'gsGrab'), 'berry');
  check('hand-counted waits can also win (timing!)', berryGoalMet({ needBerries: 1 }, counted.finalState));
  check('hand-counting needs more than par tiles', 4 > GW_WAIT_BERRY.par);
}
{
  // the berry window: wait too long and it rides away
  const late = runSensorMachine(SP('gsStartBelt', 'gsWait', 'gsWait', 'gsWait', 'gsWait', 'gsGrab'), 'berry');
  check('late grab misses — the berry rode off', late.finalState.missed >= 1 && late.finalState.berriesGrabbed === 0);
  check('missed-berry coaching mentions the window', berryGoalMisses({ needBerries: 1 }, late.finalState).some((m) => m.includes('2 ticks')));
  const s0 = initialSensorMachine();
  check('berryPresent window is exactly GS_BERRY_WINDOW ticks',
    !berryPresent({ ...s0, nextArrival: 3 }, 2)
    && berryPresent({ ...s0, nextArrival: 3 }, 3)
    && berryPresent({ ...s0, nextArrival: 3 }, 3 + GS_BERRY_WINDOW - 1)
    && !berryPresent({ ...s0, nextArrival: 3 }, 3 + GS_BERRY_WINDOW));
}
{
  // second berry (creative star) + wait-until without a belt gives up kindly
  const two = runSensorMachine(SP('gsStartBelt', 'gsWaitUntil', 'gsGrab', 'gsWaitUntil', 'gsGrab'), 'berry');
  check('the belt keeps delivering — two berries grabbable', two.finalState.berriesGrabbed === 2);
  const noBelt = runSensorMachine(SP('gsWaitUntil', 'gsGrab'), 'berry');
  check('wait-until with no belt gives up gently', noBelt.events.some((e) => e.type === 'waitUntilGaveUp'));
  check('no-belt miss says to start the belt', berryGoalMisses({ needBerries: 1 }, noBelt.finalState).some((m) => m.includes('belt never started')));
}
{
  // if–else via guarded tiles: one program, correct for BOTH inputs
  const canon = canonicalSensorSolution(GW_SENSOR_WORKSHOP);
  const spin = runSensorMachine(canon, 'workshop', { gearTurning: true });
  check('turning input: gate opens, no false alarm',
    workshopRunCorrect(spin.finalState, true) && spin.events.some((e) => e.type === 'gateOpen' && !e.wrong));
  check('turning input skips the warning tile', spin.events.some((e) => e.type === 'skipped'));
  const still = runSensorMachine(canon, 'workshop', { gearTurning: false });
  check('still input: warning shines, gate stays shut',
    workshopRunCorrect(still.finalState, false) && still.events.some((e) => e.type === 'warnLight' && !e.wrong));
  // unguarded program is wrong on some input — booleans need coverage
  const naive = runSensorMachine(SP('gsOpenGate', 'gsWarnLight'), 'workshop', { gearTurning: true });
  check('unguarded plan fails while turning (false alarm)', !workshopRunCorrect(naive.finalState, true));
  check('false-alarm miss explains itself', workshopRunMisses(naive.finalState, true).some((m) => m.includes('False alarm')));
  const naiveStill = runSensorMachine(SP('gsOpenGate', 'gsWarnLight'), 'workshop', { gearTurning: false });
  check('unguarded plan fails while still (gate w/o power)', !workshopRunCorrect(naiveStill.finalState, false));
  const wrongGuard = runSensorMachine(SP('gsIfStill', 'gsOpenGate'), 'workshop', { gearTurning: false });
  check('wrong pairing caught: gate opened while still', !workshopRunCorrect(wrongGuard.finalState, false));
}
{
  // step-limit protection
  const huge = runSensorMachine(Array.from({ length: 40 }, () => ({ cmd: 'gsWait' as const })), 'berry');
  check('sensor runs are bounded by the tick cap', huge.overflowed && huge.finalState.tick <= GS_MAX_TICKS);
}

// --- Gearworks conditions and sorting (Phase 6) ---
const TP = (...cmds: GtStep['cmd'][]): GtStep[] => cmds.map((cmd) => ({ cmd }));
const IT = (color: 'red' | 'blue', shape: 'round' | 'square'): SortItem => ({ color, shape });

for (const l of GEARWORKS_SORTER_LEVELS) {
  const errs = validateSorterLevel(l);
  check(`${l.id} validates`, errs.length === 0);
  const canon = canonicalSorterSolution(l);
  check(`${l.id} canonical sorts the batch within par`,
    canon.length <= l.par && runSorter(canon, l.stream, l.rules).allCorrect);
}

{
  // per-item rule: the same program runs again for every item
  const r = runSorter(canonicalSorterSolution(GW_SENSOR_SORTER), GW_SENSOR_SORTER.stream, GW_SENSOR_SORTER.rules);
  check('sorter routes reds left and blues right',
    r.allCorrect && r.placements.join(',') === 'left,right,right,left');
  check('one itemEnter per stream item',
    r.events.filter((e) => e.type === 'itemEnter').length === GW_SENSOR_SORTER.stream.length);
}
{
  // the ELSE trick: trailing unguarded send catches everything else
  const r = runSorter(elseTrickSolution(), GW_SENSOR_SORTER.stream, GW_SENSOR_SORTER.rules);
  check('3-tile else trick sorts perfectly', r.allCorrect);
  check('else trick fits the creative-star bar', elseTrickSolution().length <= 3);
  // first send wins: red is sent left, the bare Send Right does nothing
  const redOnly = runSorter(elseTrickSolution(), [IT('red', 'round')], GW_SENSOR_SORTER.rules);
  check('first send wins — later sends are noops',
    redOnly.placements[0] === 'left' && redOnly.events.some((e) => e.type === 'alreadySorted'));
}
{
  // chained guards are AND: a skipped IF drags its guarded tile along
  const andPlan = TP('gtIfRed', 'gtIfRound', 'gtSendLeft');
  const redRound = runSorter(andPlan, [IT('red', 'round')], GW_CONVEYOR_FACTORY.rules);
  check('red AND round goes left', redRound.placements[0] === 'left');
  const redSquare = runSorter(andPlan, [IT('red', 'square')], GW_CONVEYOR_FACTORY.rules);
  check('red but square is NOT sent (second guard fails)', redSquare.placements[0] === 'pass');
  const blueRound = runSorter(andPlan, [IT('blue', 'round')], GW_CONVEYOR_FACTORY.rules);
  check('blue skips BOTH the second guard and the send', blueRound.placements[0] === 'pass'
    && blueRound.events.filter((e) => e.type === 'skipped').length === 2);
}
{
  // factory batch: blocks must ride through to the parts crate
  const canon = canonicalSorterSolution(GW_CONVEYOR_FACTORY);
  const r = runSorter(canon, GW_CONVEYOR_FACTORY.stream, GW_CONVEYOR_FACTORY.rules);
  check('factory batch sorts with pass-through blocks',
    r.allCorrect && r.placements.join(',') === 'left,right,pass,left');
  const mega = runSorter(canon, GW_CONVEYOR_FACTORY.megaStream ?? [], GW_CONVEYOR_FACTORY.rules);
  check('same rule survives the mega batch', mega.allCorrect);
  // the else shortcut must NOT work here — blocks would land in pie
  const shortcut = runSorter(TP('gtIfRed', 'gtIfRound', 'gtSendLeft', 'gtSendRight'), GW_CONVEYOR_FACTORY.stream, GW_CONVEYOR_FACTORY.rules);
  check('factory resists the bare-else shortcut (blocks mis-sort)', !shortcut.allCorrect);
}
{
  // misses coach in kid language
  const wrong = runSorter(TP('gtSendLeft'), GW_SENSOR_SORTER.stream, GW_SENSOR_SORTER.rules);
  check('send-everything-left mis-sorts blues', !wrong.allCorrect && wrong.wrongCount === 2);
  check('miss text names the item and basket',
    sorterMisses(TP('gtSendLeft'), GW_SENSOR_SORTER.stream, GW_SENSOR_SORTER.rules)
      .some((m) => m.includes('blue berry')));
  const empty = runSorter([], GW_SENSOR_SORTER.stream, GW_SENSOR_SORTER.rules);
  check('empty rule: everything rides past, batch fails', !empty.allCorrect
    && empty.placements.every((p) => p === 'pass'));
  check('correctDest falls through to pass', correctDest(GW_CONVEYOR_FACTORY.rules, IT('red', 'square')) === 'pass');
  check('itemName reads naturally', itemName(IT('blue', 'round')) === 'blue berry' && itemName(IT('red', 'square')) === 'red block');
}

// --- Gearworks variables and safe loops (Phase 7) ---
const CP = (...cmds: Array<GcStep['cmd'] | [GcStep['cmd'], number]>): GcStep[] =>
  cmds.map((c) => (Array.isArray(c) ? { cmd: c[0], arg: c[1] } : { cmd: c }));

for (const l of GEARWORKS_COUNTER_LEVELS) {
  const errs = validateCounterLevel(l);
  check(`${l.id} validates`, errs.length === 0);
  check(`${l.id} canonical fits par`, canonicalCounterSolution(l).length <= l.par);
}

{
  // counter is a variable: set jumps, add/sub nudge, both reach the target
  const setWin = runCounter(canonicalCounterSolution(GW_BERRY_COUNTER), { target: 5 }, GW_BERRY_COUNTER.start);
  check('SET VALUE reaches the target in one tile', setWin.success && setWin.usedSet && setWin.finalValue === 5);
  const countWin = runCounter(countUpSolution(GW_BERRY_COUNTER), { target: 5 }, GW_BERRY_COUNTER.start);
  check('counting up from 2 reaches 5', countWin.success && !countWin.usedSet);
  check('count-up is longer than par (SET is the clever path)', countUpSolution(GW_BERRY_COUNTER).length > GW_BERRY_COUNTER.par);
  const overshoot = runCounter(CP(['gcSet', 7], 'gcSub', 'gcSub'), { target: 5 }, 2);
  check('subtract brings an overshoot back down', overshoot.success && overshoot.finalValue === 5);
}
{
  // clamps: the wheel never goes below 0 or above CN_MAX
  const floor = runCounter(CP('gcSub', 'gcSub', 'gcSub'), { target: 0 }, 1);
  check('subtract stops at 0 (no negative jars)', floor.finalValue === 0
    && floor.events.some((e) => e.type === 'noop' && e.reason === 'atZero'));
  const ceil = runCounter(CP(['gcSet', 9], 'gcAdd', 'gcAdd'), { target: CN_MAX }, 0);
  check('add stops at the max digit', ceil.finalValue === CN_MAX
    && ceil.events.some((e) => e.type === 'noop' && e.reason === 'atMax'));
  const miss = runCounter(CP('gcAdd'), { target: 5 }, 2);
  check('counter miss coaches the gap', !miss.success
    && counterMisses({ target: 5 }, miss.finalValue).some((m) => m.includes('needs 5') || m.includes('Add')));
}
{
  // safe stop: REPEAT UNTIL FULL stops itself; plain REPEAT runs away
  const safe = runSafeStop(canonicalCounterSolution(GW_SAFE_STOP), { target: 4 });
  check('repeat-until-full fills 4 jars and stops', safe.success && safe.finalJars === 4
    && safe.events.some((e) => e.type === 'loopStopped') && safe.usedSafeLoop);
  const fred = runSafeStop(foreverFredSolution(), { target: 4 });
  check('plain repeat runs away (meets Fred)', fred.ranaway && !fred.success
    && fred.events.some((e) => e.type === 'loopRunaway'));
  check('runaway loop is bounded by SS_RUNAWAY',
    fred.events.filter((e) => e.type === 'loopIter').length === SS_RUNAWAY);
  check('Fred miss explains the missing stop rule',
    safeStopMisses({ target: 4 }, fred).some((m) => m.includes('STOP') || m.includes('forever')));
}
{
  // manual presses also win (gentle path); empty loop fails kindly
  const manual = runSafeStop(CP('ssPress', 'ssPress', 'ssPress', 'ssPress'), { target: 4 });
  check('four manual presses fill four jars', manual.success && manual.finalJars === 4 && !manual.ranaway);
  check('manual path is longer than par', 4 > GW_SAFE_STOP.par);
  const emptyLoop = runSafeStop(CP('ssRepeatUntilFull'), { target: 4 });
  check('a loop with no body fails gently', !emptyLoop.success
    && emptyLoop.events.some((e) => e.type === 'loopFail'));
  const twoBody = runSafeStop(CP('ssPress', 'ssPress', 'ssRepeatUntilFull'), { target: 4 });
  check('two-press body still stops safely at the target', twoBody.success && twoBody.finalJars === 4);
}

// --- Gearworks Jam Machine hero level (Phase 8) ---
const JP = (...cmds: Array<GjStep['cmd'] | [GjStep['cmd'], number]>): GjStep[] =>
  cmds.map((c) => (Array.isArray(c) ? { cmd: c[0], arg: c[1] } : { cmd: c }));

{
  check('jam level validates', validateJamLevel(GW_JAM_MACHINE).length === 0);
  // every mission's built-in solution meets its own goal
  GW_JAM_MACHINE.missions.forEach((m) => {
    check(`jam mission ${m.n} solution meets its goal`, jamGoalMet(m.goal, runJam(m.solution)));
  });
}
{
  // power dependency: the belt needs the motor first
  const noPower = runJam(JP('jmStartConveyor'));
  check('conveyor without a motor has no power', noPower.events.some((e) => e.type === 'conveyorNoPower')
    && !noPower.flags.sawConveyorRun);
  const powered = runJam(JP('jmStartMotor', 'jmStartConveyor', 'jmStopConveyor', 'jmStopMotor'));
  check('motor-then-belt runs and shuts down safely', powered.flags.sawConveyorRun && powered.endedSafe);
}
{
  // the press needs a berry under it (sensor wait first)
  const dryPress = runJam(JP('jmStartMotor', 'jmStartConveyor', 'jmLowerPress'));
  check('lowering the press with no berry misses', dryPress.finalState.jam === 0
    && dryPress.events.some((e) => e.type === 'pressMiss' && e.reason === 'noBerry'));
  const oneJam = runJam(JP('jmStartMotor', 'jmStartConveyor', 'jmWaitSensor', 'jmLowerPress', 'jmRaisePress', 'jmStopConveyor', 'jmStopMotor'));
  check('wait-lower-raise makes one jar of jam', oneJam.finalState.jam === 1 && oneJam.endedSafe);
}
{
  // the loop makes three jars — setup tiles are idempotent inside it
  const looped = runJam(JP('jmStartMotor', 'jmStartConveyor', 'jmWaitSensor', 'jmLowerPress', 'jmRaisePress', ['jmRepeat', 3]));
  check('repeat x3 makes exactly 3 jars', looped.finalState.jam === 3);
  check('idempotent start-motor inside the loop only powers once',
    looped.events.filter((e) => e.type === 'motorOn').length === 1);
  const full = GW_JAM_MACHINE.missions[5].solution as GjStep[];
  check('full program earns all 3 stars', jamFinalStars(GW_JAM_MACHINE, full) === 3);
  const noStop = runJam(JP('jmStartMotor', 'jmStartConveyor', 'jmWaitSensor', 'jmLowerPress', 'jmRaisePress', ['jmRepeat', 3]));
  check('forgetting the shutdown loses only the safe star',
    jamGoalMet({ minJam: 3 }, noStop) && !noStop.endedSafe);
  const stars2 = jamFinalStars(GW_JAM_MACHINE, JP('jmStartMotor', 'jmStartConveyor', 'jmWaitSensor', 'jmLowerPress', 'jmRaisePress', ['jmRepeat', 3]));
  check('no safe stop = 2 stars (works + clever)', stars2 === 2);
}
{
  // supply is bounded; misses coach in kid language
  const greedy = runJam(JP('jmStartMotor', 'jmStartConveyor', 'jmWaitSensor', 'jmLowerPress', 'jmRaisePress', ['jmRepeat', 4]));
  check('cannot make more jam than the berry supply', greedy.finalState.jam <= JM_SUPPLY);
  const miss = jamMisses({ minJam: 1, needSafeStop: true }, runJam(JP('jmStartMotor', 'jmStartConveyor', 'jmLowerPress')));
  check('press-with-no-berry miss coaches WAIT FOR SENSOR', miss.some((m) => m.includes('WAIT FOR SENSOR')));
  check('fresh jam machine is idle', initialJam().jam === 0 && !initialJam().motorOn);
}

// --- Gearworks functions and job cards (Phase 9) ---
const BODY: JobStep[] = [{ cmd: 'jbFetch' }, { cmd: 'jbPress' }];
const MAIN = (...cmds: Array<JobStep['cmd'] | [JobStep['cmd'], number]>): JobStep[] =>
  cmds.map((c) => (Array.isArray(c) ? { cmd: c[0], arg: c[1] } : { cmd: c }));

{
  check('job level validates', validateJobLevel(GW_SAVE_A_JOB).length === 0);
  // the abstraction ladder: raw = 1 star, call = 2, loop = 3
  check('raw fetch/press ×3 works but earns 1 star',
    jobStars(GW_SAVE_A_JOB, BODY, jobRawSolution(GW_SAVE_A_JOB)) === 1);
  check('calling the job earns 2 stars (reuse)',
    jobStars(GW_SAVE_A_JOB, BODY, jobCallSolution(GW_SAVE_A_JOB)) === 2);
  check('looping the call earns 3 stars (refactor)',
    jobStars(GW_SAVE_A_JOB, BODY, jobLoopSolution(GW_SAVE_A_JOB)) === 3);
  check('calling the job is fewer tiles than raw',
    jobCallSolution(GW_SAVE_A_JOB).length < jobRawSolution(GW_SAVE_A_JOB).length);
}
{
  // the job body defines the function; DO expands it inline
  const r = runJobProgram(BODY, MAIN('jbDoJob', 'jbDoJob', 'jbDoJob'), { target: 3 });
  check('three DO calls make three jars', r.finalState.jars === 3 && r.usedJob && !r.refactored);
  check('each call traces its inner steps', r.events.filter((e) => e.type === 'jobCallStart').length === 3
    && r.events.filter((e) => e.type === 'press' && e.inJob).length === 3);
  const loop = runJobProgram(BODY, MAIN('jbDoJob', ['jbRepeat', 3]), { target: 3 });
  check('repeat over one DO call makes three jars', loop.finalState.jars === 3 && loop.refactored);
}
{
  // an empty job card cannot make jam; ordering matters inside the job
  const emptyJob = runJobProgram([], MAIN('jbDoJob', 'jbDoJob', 'jbDoJob'), { target: 3 });
  check('DO-ing an empty job makes nothing', emptyJob.finalState.jars === 0
    && emptyJob.events.some((e) => e.type === 'callEmpty'));
  check('empty-job miss says to fill the card', jobMisses([], MAIN('jbDoJob'), { target: 3 }).some((m) => m.includes('empty')));
  const badOrder = runJobProgram([{ cmd: 'jbPress' }, { cmd: 'jbFetch' }], MAIN('jbDoJob'), { target: 1 });
  check('press-before-fetch inside the job squishes nothing', badOrder.finalState.jars === 0
    && badOrder.events.some((e) => e.type === 'pressMiss'));
  const rawMiss = jobMisses(BODY, MAIN('jbFetch', 'jbFetch'), { target: 3 });
  check('short raw plan coaches making/looping the job', rawMiss.some((m) => m.includes('jar') || m.includes('DO')));
}

// --- Gearworks signals and parallelism (Phase 10) ---
const SGP = (...cmds: Array<SignalStep['cmd'] | [SignalStep['cmd'], number]>): SignalStep[] =>
  cmds.map((c) => (Array.isArray(c) ? { cmd: c[0], arg: c[1] } : { cmd: c }));

{
  check('signal level validates', validateSignalLevel(GW_TWO_MACHINE).length === 0);
  check('one hand-off delivers 1 gift (1 star)', signalStars(GW_TWO_MACHINE, signalOneSolution()) === 1);
  check('two hand-offs deliver both (2 stars)', signalStars(GW_TWO_MACHINE, signalFullSolution()) === 2);
  check('looping both lanes earns 3 stars', signalStars(GW_TWO_MACHINE, signalLoopSolution(GW_TWO_MACHINE)) === 3);
}
{
  // the signal is NECESSARY: waiting synchronizes the hand-off
  const good = runParallel(signalOneSolution(), { target: 1 });
  check('wait-then-ship delivers the packed gift', good.finalState.delivered === 1 && !good.deadlocked);
  const early = runParallel({ packer: SGP('sgFetch', 'sgPack', 'sgSendSignal'), mailer: SGP('sgSendCrate') }, { target: 1 });
  check('shipping without waiting sends an empty crate', early.finalState.delivered === 0
    && early.finalState.emptySends === 1);
  check('empty-ship miss coaches WAIT FOR SIGNAL', signalMisses({ packer: SGP('sgFetch', 'sgPack', 'sgSendSignal'), mailer: SGP('sgSendCrate') }, { target: 1 }).some((m) => m.includes('WAIT')));
}
{
  // determinism + lockstep: same-tick send is seen by a same-tick wait
  const r = runParallel(signalOneSolution(), { target: 1 });
  const sentTick = (r.events.find((e) => e.type === 'signalSent') as { tick: number }).tick;
  const gotTick = (r.events.find((e) => e.type === 'signalReceived') as { tick: number }).tick;
  check('a signal is received on the same tick it is sent (packer first)', sentTick === gotTick);
  const again = runParallel(signalOneSolution(), { target: 1 });
  check('the scheduler is deterministic', JSON.stringify(again.events) === JSON.stringify(r.events));
}
{
  // deadlock: the Mailer waits forever if the Packer never signals
  const stuck = runParallel({ packer: SGP('sgFetch', 'sgPack'), mailer: SGP('sgWaitSignal', 'sgSendCrate') }, { target: 1 });
  check('a missing signal deadlocks the Mailer', stuck.deadlocked && stuck.finalState.delivered === 0);
  check('deadlock miss says the signal never came', signalMisses({ packer: SGP('sgFetch', 'sgPack'), mailer: SGP('sgWaitSignal', 'sgSendCrate') }, { target: 1 }).some((m) => m.includes('never sent') || m.includes('SEND SIGNAL')));
  check('deadlocked runs are bounded by the tick cap', stuck.events.filter((e) => e.type === 'tick').length <= SG_MAX_TICKS);
}
{
  // per-lane loops flatten to the same steps as writing them out
  const flat = flattenLane(SGP('sgFetch', 'sgPack', 'sgSendSignal', ['sgRepeat', 2]));
  check('a lane loop flattens block-before x count',
    flat.join(',') === 'sgFetch,sgPack,sgSendSignal,sgFetch,sgPack,sgSendSignal');
  const loop = runParallel(signalLoopSolution(GW_TWO_MACHINE), { target: 2 });
  check('looped lanes deliver both gifts', loop.finalState.delivered === 2 && loop.usedLoop);
  const signalsBalanced = runParallel(signalFullSolution(), { target: 2 }).finalState.signals;
  check('every signal sent is consumed by a wait', signalsBalanced === 0);
}

// --- Gearworks advanced debugging (Phase 11) ---
{
  check('broken-machine level validates', validateDebugLevel(GW_BROKEN_MACHINE).length === 0);
  GW_BROKEN_MACHINE.puzzles.forEach((p) => {
    check(`bug ${p.n} is actually broken`, !jamGoalMet(p.goal, runJam(p.program)));
    check(`bug ${p.n}'s fix works`, jamGoalMet(p.goal, runJam(p.fixed)));
    const idx = debugBugIndex(p, p.program);
    check(`bug ${p.n} is locatable in the plan`, idx >= 0 && idx < p.program.length);
  });
}
{
  // the bug locator points at the ROOT tile, not just the symptom
  const p1 = GW_BROKEN_MACHINE.puzzles[0]; // stray Stop Motor near the start
  check('extra-brake bug points at the stray Stop Motor',
    p1.program[jamBugIndex(p1.program, p1.goal)].cmd === 'jmStopMotor');
  const p2 = GW_BROKEN_MACHINE.puzzles[1]; // loop runs too few times
  check('loop-miscount bug points at the Repeat tile',
    p2.program[jamBugIndex(p2.program, p2.goal)].cmd === 'jmRepeat');
  const p3 = GW_BROKEN_MACHINE.puzzles[2]; // early Belt Off
  check('early-belt-stop bug points at the Stop Conveyor',
    p3.program[jamBugIndex(p3.program, p3.goal)].cmd === 'jmStopConveyor');
}
{
  // a correct program has no bug to locate
  check('a working program reports no bug', jamBugIndex(GW_BROKEN_MACHINE.puzzles[0].fixed, GW_BROKEN_MACHINE.puzzles[0].goal) === -1);
}

// --- Gearworks Conveyor Factory activity set (Phase 12) ---
{
  for (const l of GEARWORKS_FACTORY_LEVELS) {
    check(`${l.id} validates`, validateSorterLevel(l).length === 0);
    const canon = sorterCanon(l);
    check(`${l.id} canonical sorts the batch within par`,
      canon.length <= l.par && runSorter(canon, l.stream, l.rules).allCorrect);
    check(`${l.id} canonical sorts the mega batch too`,
      !!l.megaStream && runSorter(canon, l.megaStream, l.rules).allCorrect);
  }
}
{
  // three-way routing sends squares UP to the third bin
  const r = runSorter(sorterCanon(GW_THREE_WAY), GW_THREE_WAY.stream, GW_THREE_WAY.rules);
  check('three-way sort uses all three bins',
    r.placements.includes('left') && r.placements.includes('right') && r.placements.includes('up'));
  check('a square block routes UP', correctDest(GW_THREE_WAY.rules, IT('red', 'square')) === 'up'
    && correctDest(GW_THREE_WAY.rules, IT('blue', 'square')) === 'up');
  check('a red round routes LEFT, blue round RIGHT',
    correctDest(GW_THREE_WAY.rules, IT('red', 'round')) === 'left'
    && correctDest(GW_THREE_WAY.rules, IT('blue', 'round')) === 'right');
}
{
  // Factory Rush: compound AND + a bare SEND UP catch-all
  const r = runSorter(sorterCanon(GW_FACTORY_RUSH), GW_FACTORY_RUSH.stream, GW_FACTORY_RUSH.rules);
  check('factory rush sorts its batch', r.allCorrect);
  check('the bare Send Up catches everything else', correctDest(GW_FACTORY_RUSH.rules, IT('red', 'square')) === 'up');
  // dropping the catch-all leaves red squares un-sorted (they would pass)
  const noCatch = runSorter(TP('gtIfRed', 'gtIfRound', 'gtSendLeft', 'gtIfBlue', 'gtSendRight'), GW_FACTORY_RUSH.stream, GW_FACTORY_RUSH.rules);
  check('without Send Up a red square rides past (needs the catch-all)', !noCatch.allCorrect);
}

// --- Gearworks Robot Orchestra (Phase 13) ---
{
  const IDS = ['a', 'b', 'c'];
  // empty pattern is all-off, right shape
  const e = emptyPattern(IDS, 8);
  check('empty pattern has a row per track, all off', IDS.every((id) => e.tracks[id].length === 8 && e.tracks[id].every((v) => v === false)));
  check('empty pattern reports zero beats', beatStats(e, IDS).totalBeats === 0);

  // toggle is a pure add/remove
  const p1 = toggleCell(e, 'a', 2);
  check('toggle lights a single cell', p1.tracks.a[2] === true && beatStats(p1, IDS).totalBeats === 1);
  check('toggle does not mutate the source pattern', e.tracks.a[2] === false);
  const p1off = toggleCell(p1, 'a', 2);
  check('toggling twice clears the cell', p1off.tracks.a[2] === false);
  check('toggle ignores an out-of-range step', toggleCell(e, 'a', 99) === e);
  check('toggle ignores an unknown track', toggleCell(e, 'zzz', 0) === e);

  // runBeats: all tracks fire in parallel per step, in order
  let par = toggleCell(e, 'a', 0);
  par = toggleCell(par, 'b', 0);
  par = toggleCell(par, 'c', 3);
  const rb = runBeats(par, IDS, 1);
  check('runBeats emits a stepStart for every step', rb.events.filter((ev) => ev.type === 'stepStart').length === 8);
  check('runBeats counts every lit cell as a hit', rb.totalHits === 3);
  check('runBeats ends with a single done event', rb.events[rb.events.length - 1].type === 'done');
  // step 0 fires a & b together (parallel), before step 3's hit
  const hitOrder = rb.events.filter((ev) => ev.type === 'hit').map((ev: any) => `${ev.step}:${ev.track}`);
  check('step-0 hits are a then b (track order), before step 3', JSON.stringify(hitOrder) === JSON.stringify(['0:a', '0:b', '3:c']));

  // looping multiplies the timeline deterministically
  const rb2 = runBeats(par, IDS, 3);
  check('looping x3 triples the hits', rb2.totalHits === 9);
  check('looping is clamped to the max', runBeats(par, IDS, 99).totalHits === 3 * BEAT_LOOP_MAX);
  check('runBeats is deterministic', JSON.stringify(runBeats(par, IDS, 2)) === JSON.stringify(runBeats(par, IDS, 2)));

  // stars: works / clever / creative
  check('no beats earns no stars', beatStars(e, IDS, 1) === 0);
  check('one instrument, no loop earns just works', beatStars(toggleCell(e, 'a', 0), IDS, 1) === 1);
  const two = toggleCell(toggleCell(e, 'a', 0), 'b', 1);
  check('two instruments earn works + clever', beatStars(two, IDS, 1) === 2);
  check('two instruments looped earn all three', beatStars(two, IDS, 2) === 3);
  check('one instrument looped earns works + creative only', beatStars(toggleCell(e, 'a', 0), IDS, 2) === 2);

  // song save round-trips through localStorage-shaped JSON
  const json = serializePattern(two, 3);
  const back = deserializePattern(json, IDS, 8);
  check('a saved song round-trips its pattern', back !== null && JSON.stringify(back.pattern.tracks) === JSON.stringify(two.tracks));
  check('a saved song round-trips its loop count', back?.loops === 3);
  check('a mismatched step count refuses to load', deserializePattern(serializePattern(two, 1), IDS, 4) === null);
  check('garbage JSON refuses to load', deserializePattern('not json', IDS, 8) === null);

  // level data + helpers
  check('robot orchestra level validates', validateOrchestraLevel(GW_ROBOT_ORCHESTRA).length === 0);
  check('every orchestra level validates', GEARWORKS_ORCHESTRA_LEVELS.every((l) => validateOrchestraLevel(l).length === 0));
  check('starter groove is never blank (earns works)', orchestraStars(GW_ROBOT_ORCHESTRA, orchestraStarterPattern(GW_ROBOT_ORCHESTRA), 1) >= 1);
  check('orchestra track ids are unique', new Set(orchestraTrackIds(GW_ROBOT_ORCHESTRA)).size === GW_ROBOT_ORCHESTRA.tracks.length);
  // a full looped ensemble reaches the ceiling
  const ids = orchestraTrackIds(GW_ROBOT_ORCHESTRA);
  let full = emptyPattern(ids, GW_ROBOT_ORCHESTRA.steps);
  ids.forEach((id, i) => { full = toggleCell(full, id, i % GW_ROBOT_ORCHESTRA.steps); });
  check('a full looped ensemble earns all three stars', orchestraStars(GW_ROBOT_ORCHESTRA, full, BEAT_LOOP_MAX) === 3);
}

// --- Gearworks Lighthouse Logic (Phase 14) ---
{
  const P = (...cmds: LlStep['cmd'][]): LlStep[] => cmds.map((cmd) => ({ cmd }));

  // AND: juxtaposition means AND (app-wide guard-chaining rule)
  const and = P('llIfDark', 'llIfShip');
  check('AND: both true → true', evalRule(and, { dark: true, ship: true }) === true);
  check('AND: one false → false', evalRule(and, { dark: true, ship: false }) === false);
  check('AND: other false → false', evalRule(and, { dark: false, ship: true }) === false);
  check('AND: both false → false', evalRule(and, { dark: false, ship: false }) === false);

  // OR: any true → true
  const or = P('llIfFog', 'llOr', 'llIfStorm');
  check('OR: both false → false', evalRule(or, { fog: false, storm: false }) === false);
  check('OR: one true → true', evalRule(or, { fog: true, storm: false }) === true);
  check('OR: other true → true', evalRule(or, { fog: false, storm: true }) === true);
  check('OR: both true → true', evalRule(or, { fog: true, storm: true }) === true);

  // NOT flips the next condition
  check('NOT flips a true to false', evalRule(P('llNot', 'llIfShip'), { ship: true }) === false);
  check('NOT flips a false to true', evalRule(P('llNot', 'llIfShip'), { ship: false }) === true);
  check('NOT only binds the next condition', evalRule(P('llNot', 'llIfDark', 'llIfShip'), { dark: false, ship: true }) === true);

  // left-to-right fold: "dark and ship or fog"
  const mix = P('llIfDark', 'llIfShip', 'llOr', 'llIfFog');
  check('mixed folds left-to-right: (dark AND ship) OR fog — fog alone wins', evalRule(mix, { dark: false, ship: false, fog: true }) === true);
  check('mixed: dark+ship but no fog still wins', evalRule(mix, { dark: true, ship: true, fog: false }) === true);
  check('mixed: nothing → false', evalRule(mix, { dark: false, ship: false, fog: false }) === false);

  check('an empty rule leaves the lamp dark', evalRule([], { dark: true }) === false);
  check('evalRule is a pure function of inputs', evalRule(and, { dark: true, ship: true }) === evalRule(and, { dark: true, ship: true }));

  // runLighthouse over a truth table
  const rL = runLighthouse(GW_NIGHT_LIGHT.canonical, GW_NIGHT_LIGHT.scenarios);
  check('night-light canonical lights every sky right', rL.allCorrect && rL.wrongCount === 0);
  check('runLighthouse produces one lamp per sky', rL.lamps.length === GW_NIGHT_LIGHT.scenarios.length);
  check('runLighthouse ends with done', rL.events[rL.events.length - 1].type === 'done');
  check('runLighthouse is deterministic', JSON.stringify(runLighthouse(GW_NIGHT_LIGHT.canonical, GW_NIGHT_LIGHT.scenarios)) === JSON.stringify(rL));

  // a plausible-but-wrong rule fails the truth table (the whole lesson)
  const orInstead = runLighthouse(P('llIfDark', 'llOr', 'llIfShip'), GW_NIGHT_LIGHT.scenarios);
  check('OR where AND is needed fails some skies', !orInstead.allCorrect);
  check('the miss report names a wrong sky', lighthouseMisses(P('llIfDark', 'llOr', 'llIfShip'), GW_NIGHT_LIGHT.scenarios).length >= 1);
  check('a single condition is not enough for AND', !runLighthouse(P('llIfDark'), GW_NIGHT_LIGHT.scenarios).allCorrect);

  // storm-watch OR level
  check('storm-watch canonical solves it', runLighthouse(GW_STORM_WATCH.canonical, GW_STORM_WATCH.scenarios).allCorrect);
  check('AND where OR is needed fails storm-watch', !runLighthouse(P('llIfFog', 'llIfStorm'), GW_STORM_WATCH.scenarios).allCorrect);

  // creative "other way round" — reversed order also solves, and differs
  for (const l of GEARWORKS_LIGHTHOUSE_LEVELS) {
    check(`${l.id} validates`, validateLighthouseLevel(l).length === 0);
    const alt = altOrderSolution(l);
    check(`${l.id} reversed order still solves`, runLighthouse(alt, l.scenarios).allCorrect);
    check(`${l.id} reversed order actually differs`, condOrder(alt).join() !== condOrder(l.canonical).join());
  }

  // star tiers
  check('no solution earns no stars', lighthouseStars(GW_NIGHT_LIGHT, P('llIfDark'), false, false) === 0);
  check('solved over par earns just works', lighthouseStars(GW_NIGHT_LIGHT, GW_NIGHT_LIGHT.canonical, false, false) === 1);
  check('solved at par earns works + clever', lighthouseStars(GW_NIGHT_LIGHT, GW_NIGHT_LIGHT.canonical, true, false) === 2);
  check('solved both ways earns all three', lighthouseStars(GW_NIGHT_LIGHT, GW_NIGHT_LIGHT.canonical, true, true) === 3);
}

// --- Gearworks Delivery Depot (Phase 15) ---
{
  const P = (...steps: Array<DvStep['cmd'] | [DvStep['cmd'], number]>): DvStep[] =>
    steps.map((s) => (Array.isArray(s) ? { cmd: s[0], arg: s[1] } : { cmd: s }));
  const goal = deliveryGoalOf(GW_MORNING_ROUND);

  // FIFO: LOAD always takes the FRONT parcel
  const oneLoad = runDelivery(P('dvLoad'), goal);
  const firstLoad = oneLoad.events.find((e) => e.type === 'load');
  check('LOAD takes the parcel at the FRONT of the queue', firstLoad?.type === 'load' && firstLoad.pkg.id === 'p1');

  // manual drain delivers all in order
  const manual = deliveryManualSolution(GW_MORNING_ROUND);
  const rm = runDelivery(manual, goal);
  check('manual round delivers every parcel correctly', rm.allCorrect && rm.deliveredCount === 3 && rm.wrongCount === 0);
  check('manual round does not use a loop', !rm.usedLoop);

  // loop drain: LOAD, DELIVER, DRIVE, REPEAT xN
  const loop = deliveryLoopSolution(GW_MORNING_ROUND);
  const rl = runDelivery(loop, goal);
  check('the loop drains the whole queue', rl.allCorrect && rl.deliveredCount === 3);
  check('the loop run reports usedLoop', rl.usedLoop);
  check('the loop body runs count times', rl.events.filter((e) => e.type === 'loopIter').length === 3);

  // a truck can only hold one parcel (LOAD twice without deliver = full)
  const full = runDelivery(P('dvLoad', 'dvLoad'), goal);
  check('a second LOAD with a full truck is a no-op', full.events.some((e) => e.type === 'loadNoop' && e.reason === 'full'));

  // too-small a loop leaves parcels waiting
  const short = runDelivery(P('dvLoad', 'dvDeliver', 'dvDrive', ['dvRepeat', 2]), goal);
  check('a x2 loop on a 3-queue leaves one waiting', !short.allCorrect && short.deliveredCount === 2);
  check('the miss report mentions parcels still in line', deliveryMisses(P('dvLoad', 'dvDeliver', 'dvDrive', ['dvRepeat', 2]), goal).some((m) => m.includes('waiting')));
  check('the bug finder points at the repeat tile when undercounting', deliveryBugIndex(P('dvLoad', 'dvDeliver', 'dvDrive', ['dvRepeat', 2]), goal) === 3);

  // delivering to the wrong house is caught (drive too far first)
  const wrong = runDelivery(P('dvDrive', 'dvLoad', 'dvDeliver'), goal);
  check('a parcel dropped at the wrong house is marked wrong', wrong.wrongCount === 1 && !wrong.allCorrect);

  // determinism
  check('runDelivery is deterministic', JSON.stringify(runDelivery(loop, goal)) === JSON.stringify(rl));

  // stars
  check('an unfinished round earns no stars', deliveryStars(GW_MORNING_ROUND, P('dvLoad', 'dvDeliver')) === 0);
  check('the manual round earns exactly 1 star', deliveryStars(GW_MORNING_ROUND, manual) === 1);
  check('the tidy loop earns all 3 stars', deliveryStars(GW_MORNING_ROUND, loop) === 3);

  // levels validate + Rush Hour scales the same loop to 4
  for (const l of GEARWORKS_DELIVERY_LEVELS) {
    check(`${l.id} validates`, validateDeliveryLevel(l).length === 0);
    check(`${l.id} loop solution wins`, runDelivery(deliveryLoopSolution(l), deliveryGoalOf(l)).allCorrect);
  }
  check('Rush Hour needs a x4 loop', runDelivery(deliveryLoopSolution(GW_RUSH_HOUR), deliveryGoalOf(GW_RUSH_HOUR)).deliveredCount === 4);
}

// --- Gearworks Paint Parade (Phase 16) ---
{
  const P = (...steps: Array<PpStep['cmd'] | [PpStep['cmd'], number]>): PpStep[] =>
    steps.map((s) => (Array.isArray(s) ? { cmd: s[0], arg: s[1] } : { cmd: s }));
  const goal = paintGoalOf(GW_PAINT_PARADE); // 3×2

  // inner loop stamps a row
  const oneRow = runPaint(P('ppStamp', 'ppStep', ['ppRepeatRow', 3]), goal);
  check('REPEAT ROW ×3 stamps 3 dots in a row', oneRow.painted.size === 3 &&
    oneRow.painted.has(cellKey(0, 0)) && oneRow.painted.has(cellKey(1, 0)) && oneRow.painted.has(cellKey(2, 0)));
  check('a single row does not fill the whole banner', !oneRow.success);

  // nested loop fills the grid
  const nested = paintNestedSolution(GW_PAINT_PARADE);
  const rn = runPaint(nested, goal);
  check('the nested loop fills the whole 3×2 banner', rn.success && rn.painted.size === 6);
  check('the nested run reports both loops used', rn.usedRowLoop && rn.usedParadeLoop);
  check('nested paint paints no stray dots', rn.strayCount === 0);

  // the OUTER loop wraps EVERYTHING before it (nesting semantics)
  const exp = expandPaint(nested);
  check('the parade loop expands the whole row design', exp.prims.filter((p) => p.cmd === 'ppStamp').length === 6);

  // one loop only (hand-stamped row, parade loop stacks it) → 2 stars
  const oneLoop = paintOneLoopSolution(GW_PAINT_PARADE);
  check('one-loop still fills the banner', runPaint(oneLoop, goal).success);
  check('one-loop uses the parade loop but not the row loop',
    runPaint(oneLoop, goal).usedParadeLoop && !runPaint(oneLoop, goal).usedRowLoop);

  // manual fills it with no loops
  const manual = paintManualSolution(GW_PAINT_PARADE);
  const rmn = runPaint(manual, goal);
  check('painting by hand fills the banner with no loops', rmn.success && !rmn.usedRowLoop && !rmn.usedParadeLoop);

  // over-counting a loop stamps off the banner (a stray)
  const over = runPaint(P('ppStamp', 'ppStep', ['ppRepeatRow', 4], 'ppNewRow', ['ppRepeatParade', 2]), goal);
  check('a row loop counted too high stamps off the banner', over.strayCount > 0 && !over.success);
  check('the miss report warns about dots off the banner', paintMisses(P('ppStamp', 'ppStep', ['ppRepeatRow', 4], 'ppNewRow', ['ppRepeatParade', 2]), goal).some((m) => m.includes('off the banner')));

  // under-counting the row loop leaves a column blank
  const under = runPaint(P('ppStamp', 'ppStep', ['ppRepeatRow', 2], 'ppNewRow', ['ppRepeatParade', 2]), goal);
  check('a row loop of 2 on a 3-wide banner leaves the last column blank', !under.success && under.painted.size === 4);

  // an empty loop is flagged
  check('a REPEAT with nothing before it is an empty loop', expandPaint(P('ppRepeatRow', 2)).emptyLoop);

  // determinism
  check('runPaint is deterministic', JSON.stringify(runPaint(nested, goal)) === JSON.stringify(rn));

  // stars ladder
  check('an unfinished banner earns no stars', paintStars(GW_PAINT_PARADE, P('ppStamp')) === 0);
  check('painting by hand earns exactly 1 star', paintStars(GW_PAINT_PARADE, manual) === 1);
  check('one loop earns 2 stars', paintStars(GW_PAINT_PARADE, oneLoop) === 2);
  check('the nested loop earns all 3 stars', paintStars(GW_PAINT_PARADE, nested) === 3);

  // levels validate + Big Banner scales the same nested loop to 4×3
  for (const l of GEARWORKS_PAINT_LEVELS) {
    check(`${l.id} validates`, validatePaintLevel(l).length === 0);
    check(`${l.id} nested solution wins`, runPaint(paintNestedSolution(l), paintGoalOf(l)).success);
  }
  check('Big Banner fills 12 dots with the nested loop', runPaint(paintNestedSolution(GW_BIG_BANNER), paintGoalOf(GW_BIG_BANNER)).painted.size === 12);
}

// --- Gearworks Story Studio (Phase 17) ---
{
  const P = (...cmds: StoryStep['cmd'][]): StoryStep[] => cmds.map((cmd) => ({ cmd }));
  const def = storyDef(GW_ROBOT_FEELINGS);

  // an event only fires from the right state
  const wakeThenHug = runStory(P('stWake', 'stHug'), def);
  check('WAKE from sleepy then HUG from curious reaches happy', wakeThenHug.finalState === 'happy' && wakeThenHug.blockedCount === 0);

  const hugFirst = runStory(P('stHug'), def);
  check('HUG while sleepy is blocked (wrong scene)', hugFirst.finalState === 'sleepy' && hugFirst.blockedCount === 1);
  check('a blocked event leaves the state unchanged', hugFirst.path.length === 1);

  // the same event does different things from different states
  check('TICKLE from curious goes to giggly', runStory(P('stWake', 'stTickle'), def).finalState === 'giggly');
  check('TICKLE from happy also goes to giggly', runStory(P('stWake', 'stHug', 'stTickle'), def).finalState === 'giggly');

  // start/done events bookend the stream
  check('the run starts with a start event', wakeThenHug.events[0].type === 'start');
  check('the run ends with a done event', wakeThenHug.events[wakeThenHug.events.length - 1].type === 'done');
  check('runStory is deterministic', JSON.stringify(runStory(P('stWake', 'stHug'), def)) === JSON.stringify(wakeThenHug));

  // reached / taken path
  check('storyReached agrees with finalState', storyReached(P('stWake', 'stHug'), def, 'happy'));
  check('takenPath drops blocked no-ops', JSON.stringify(takenPath(P('stHug', 'stWake', 'stHug'), def)) === JSON.stringify(['stWake', 'stHug']));

  // shortest + distinct paths
  check('shortest story to happy is 2 events', shortestStory(def, 'happy')?.length === 2);
  const paths = allStoryPaths(def, 'happy');
  check('there are at least two distinct paths to happy', new Set(paths.map((p) => p.join('>'))).size >= 2);

  // a scenic route reaches happy a different way
  const scenic = runStory(P('stWake', 'stTickle', 'stCalm'), def);
  check('the giggly detour also reaches happy', scenic.finalState === 'happy');

  // miss report speaks in scene labels
  check('the miss report names the stuck scene', storyMisses(P('stHug'), def, 'happy', (id) => storyStateLabel(GW_ROBOT_FEELINGS, id)).some((m) => m.includes('sleepy') || m.includes('happy')));

  // stars ladder
  const shortest = storyShortestSolution(GW_ROBOT_FEELINGS);
  check('a failed story earns no stars', storyStars(GW_ROBOT_FEELINGS, P('stTickle'), false) === 0);
  check('reaching happy over par (blocked detour) earns just works', storyStars(GW_ROBOT_FEELINGS, P('stHug', 'stWake', 'stHug'), false) === 1);
  check('the tidy shortest path earns 2 stars', storyStars(GW_ROBOT_FEELINGS, shortest, false) === 2);
  check('two different paths earn all 3 stars', storyStars(GW_ROBOT_FEELINGS, shortest, true) === 3);

  // bedtime: SLEEP only works when sleepy
  const bd = storyDef(GW_BEDTIME_STORY);
  check('SLEEP while awake is blocked', runStory(P('stSleep'), bd).blockedCount === 1);
  check('play, yawn, sleep tucks Bloop in', runStory(P('stPlay', 'stYawn', 'stSleep'), bd).finalState === 'asleep');
  check('eat, yawn, sleep is a different bedtime route', runStory(P('stEat', 'stYawn', 'stSleep'), bd).finalState === 'asleep');

  // levels validate
  for (const l of GEARWORKS_STORY_LEVELS) {
    check(`${l.id} validates`, validateStoryLevel(l).length === 0);
    check(`${l.id} shortest solution reaches target`, storyReached(storyShortestSolution(l), storyDef(l), l.target));
  }
}

// --- Gearworks Maker Workshop (Phase 18) ---
{
  const B = (...cmds: MkBodyStep['cmd'][]): MkBodyStep[] => cmds.map((cmd) => ({ cmd }));
  const calls = (...args: number[]): MkCall[] => args.map((arg) => ({ arg }));
  const paramBody = makerParamBody(); // PLACE, REPEAT(input)

  // the gadget reads its input dial
  check('gadget MAKE(3) places 3 blocks', runGadget(paramBody, 3) === 3);
  check('gadget MAKE(1) places 1 block', runGadget(paramBody, 1) === 1);
  check('the SAME gadget makes different sizes', runGadget(paramBody, 4) === 4 && runGadget(paramBody, 2) === 2);
  check('runGadget is a pure function of its input', runGadget(paramBody, 3) === runGadget(paramBody, 3));

  // a fixed gadget ignores its input
  const fixed = makerFixedBody(2); // PLACE, PLACE
  check('a fixed gadget ignores the input dial', runGadget(fixed, 4) === 2 && runGadget(fixed, 1) === 2);
  check('gadgetUsesParam is true only when REPEAT follows a PLACE', gadgetUsesParam(paramBody) && !gadgetUsesParam(fixed));
  check('a lone REPEAT with nothing before it does not count as using the input', !gadgetUsesParam(B('mkRepeatParam')));

  // building a skyline with the parameterized gadget
  const goal = makerGoalOf(GW_SKYLINE); // [3,1,2]
  const built = runMaker(paramBody, calls(3, 1, 2), goal);
  check('one gadget + three inputs builds the 3-1-2 skyline', built.match && JSON.stringify(built.towers) === JSON.stringify([3, 1, 2]));
  check('runMaker reports the gadget used its parameter', built.usesParam);
  check('runMaker places one block-event per block', built.events.filter((e) => e.type === 'place').length === 6);
  check('runMaker is deterministic', JSON.stringify(runMaker(paramBody, calls(3, 1, 2), goal)) === JSON.stringify(built));

  // a fixed gadget CANNOT build a varied skyline
  const fixedTry = runMaker(makerFixedBody(3), calls(3, 1, 2), goal);
  check('a fixed gadget cannot build a varied skyline', !fixedTry.match);
  check('the miss report tells the maker to use the input', makerMisses(makerFixedBody(3), calls(3, 1, 2), goal).some((m) => m.toLowerCase().includes('input')));

  // stars — Skyline (varied): only the parameterized gadget wins, all 3 stars
  check('a wrong skyline earns no stars', makerStars(GW_SKYLINE, fixed, calls(2, 2, 2)) === 0);
  check('the parameterized skyline earns all 3 stars', makerStars(GW_SKYLINE, paramBody, calls(3, 1, 2)) === 3);

  // stars — Block Bot (uniform): a fixed gadget still earns 2, param earns 3
  check('uniform skyline with a fixed gadget earns 2 stars', makerStars(GW_BLOCK_BOT, makerFixedBody(2), calls(2, 2, 2)) === 2);
  check('uniform skyline with a parameterized gadget earns 3 stars', makerStars(GW_BLOCK_BOT, paramBody, calls(2, 2, 2)) === 3);

  // levels validate + canonical wins
  for (const l of GEARWORKS_MAKER_LEVELS) {
    check(`${l.id} validates`, validateMakerLevel(l).length === 0);
    check(`${l.id} parameterized gadget builds the skyline`, runMaker(makerParamBody(), makerCalls(l), makerGoalOf(l)).match);
  }
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
