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

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
