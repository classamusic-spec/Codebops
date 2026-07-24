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

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
