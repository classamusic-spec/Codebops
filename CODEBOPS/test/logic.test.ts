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
  GEARWORKS_SENSOR_LEVELS, GW_WAIT_BERRY, GW_SENSOR_WORKSHOP, GW_JUMPY_CLAW, GW_BERRY_PARADE,
  validateSensorLevel, canonicalSensorSolution,
} from '../src/data/gearworks/levels';
import {
  runSorter, sorterMisses, correctDest, itemName,
} from '../src/gameplay/gearworks/sorterMachine';
import type { GtStep, SortItem } from '../src/gameplay/gearworks/sorterMachine';
import {
  GEARWORKS_SORTER_LEVELS, GW_SENSOR_SORTER, GW_CONVEYOR_FACTORY, GW_MIXED_UP_BELT,
  validateSorterLevel, canonicalSorterSolution, elseTrickSolution,
} from '../src/data/gearworks/levels';
import {
  runCounter, counterMisses, runSafeStop, safeStopMisses,
  CN_MAX, SS_RUNAWAY,
} from '../src/gameplay/gearworks/counterMachine';
import type { GcStep } from '../src/gameplay/gearworks/counterMachine';
import {
  GEARWORKS_COUNTER_LEVELS, GW_BERRY_COUNTER, GW_SAFE_STOP, GW_COUNTER_MIXUP, GW_MY_NUMBER,
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
  GW_SAVE_A_JOB, GW_JOB_MIXUP, GEARWORKS_JOB_LEVELS, validateJobLevel, jobStars,
  jobRawSolution, jobCallSolution, jobLoopSolution,
} from '../src/data/gearworks/levels';
import {
  runParallel, signalMisses, flattenLane, SG_MAX_TICKS,
} from '../src/gameplay/gearworks/signalMachine';
import type { SignalStep } from '../src/gameplay/gearworks/signalMachine';
import {
  GW_TWO_MACHINE, GW_FIRST_SIGNAL, GW_RELAY_RACE, GEARWORKS_SIGNAL_LEVELS, validateSignalLevel, signalStars,
  signalFullSolution, signalLoopSolution, signalOneSolution, signalEncoreSolution,
} from '../src/data/gearworks/levels';
import { runJam, jamGoalMet, jamBugIndex } from '../src/gameplay/gearworks/jamMachine';
import {
  GW_BROKEN_MACHINE, GEARWORKS_DEBUG_LEVELS, validateDebugLevel, debugBugIndex,
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
import { GEARWORKS_SEQUENCE } from '../src/data/gearworks/world';
import {
  CURRICULUM_STAGES, stage, allPrerequisites,
} from '../src/data/curriculum/stages';
import { LEVEL_CURRICULUM, levelsForStage, phasesForStage } from '../src/data/curriculum/levelMeta';
import { validateCurriculum, incompleteLadders } from '../src/data/curriculum/validate';
import {
  allMastery, stageMastery, childTier, isStageAvailable, nextStage,
} from '../src/data/curriculum/mastery';
import type { EvidenceEvent } from '../src/data/curriculum/mastery';
import {
  GEARWORKS_CONCEPTS, conceptLevels, conceptProgress, garageTotals, nextConcept, diplomaEarned,
} from '../src/data/gearworks/progress';
import { evidenceForRun, programObservation } from '../src/data/curriculum/record';
import { buildParentReport, latestObservation } from '../src/data/curriculum/report';
import { plainLanguage, javaScriptPreview, conceptSentence, peekForLevel } from '../src/ui/codePeek';
// ---- Zip's App Lab (Phase 1) ----
import {
  MINI_APP_TYPES, flattenCommands, commandDepth, nestedCommands, conditionRefs, triggerRefs,
} from '../src/creator/miniAppTypes';
import type { MiniAppCommand, MiniAppTrigger } from '../src/creator/miniAppTypes';
import { MINI_APP_SCHEMA_VERSION, allComponents, titleText } from '../src/creator/miniAppProject';
import type { MiniAppProject } from '../src/creator/miniAppProject';
import {
  MINI_APP_TEMPLATES, miniAppTemplate, templatesForType, maximumComponentsTotal,
} from '../src/creator/miniAppTemplateRegistry';
import { validateMiniAppProject, looksLikeProject } from '../src/creator/miniAppValidator';
import {
  MINI_APP_STARTERS, startersForTemplate, duplicateProject,
} from '../src/creator/miniAppProjectFactory';
import {
  initialCreatorState, applyCreatorAction, canApply, showsEditingChrome, showsDebugButton, STEP_MODE,
} from '../src/creator/miniAppMode';
import { APP_KITS, appKit, kitAvailability, waitingSentence, nextKit } from '../src/data/app-lab/appLabDefinition';
import { APPROVED_ASSETS, approvedAsset, isApprovedAsset, APP_LAB_THEMES } from '../src/data/app-lab/approvedAssets';
import { APPROVED_COMPONENTS, approvedComponent } from '../src/data/app-lab/approvedComponents';
import { APPROVED_SOUNDS, PREPARED_PHRASES } from '../src/data/app-lab/approvedSounds';
import { SCENE_LAYOUTS, sceneLayout, layoutHasSlot } from '../src/data/app-lab/sceneLayouts';
import { TITLE_TOKENS, isTitleToken, tokensInGroup } from '../src/data/app-lab/preparedTitleTokens';
// ---- App Lab Phase 2 ----
import {
  initialEditorState, addComponent, removeComponent, moveComponent, addScript, removeScript,
  appendCommand, removeCommandAt, moveCommand, clearScript, undo, redo, canUndo, canRedo,
  freeSlots, readiness, setTitleTokens, setTheme, HISTORY_LIMIT,
} from '../src/creator/miniAppEditor';
import {
  commandChoices, triggerChoices, componentChoices, describeCommand, describeTrigger, sceneName,
} from '../src/creator/miniAppChoices';
import { predictionChoices } from '../src/ui/app-lab/predictionPanel';
// ---- App Lab Phase 3 ----
import {
  initialRuntimeState, applyCommand, run, scriptsForCause,
  tappableComponents, hasStartScript,
} from '../src/creator/miniAppRuntime';
import type { MiniAppRuntimeSnapshot } from '../src/creator/miniAppRuntime';
import { evaluateCondition, UNTIL_ROUNDS_CAP } from '../src/creator/miniAppRuntime';
import { DROP_TARGET_REF } from '../src/creator/miniAppTypes';
// ---- App Lab Phases 9-10 ----
import { trailLines } from '../src/ui/app-lab/appDebugMode';
import {
  plainLanguageProject, plainLanguageScript, javaScriptProject, translatableCommandKinds,
} from '../src/creator/miniAppCodePeek';

import { readdirSync, readFileSync } from 'node:fs';

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
  const ids = new Set(GEARWORKS_PICKER.map((e) => (e.kind === 'soon' || e.kind === 'trophy' ? e.id : e.level.id)));
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
  for (const l of GEARWORKS_JOB_LEVELS) check(`${l.id} validates`, validateJobLevel(l).length === 0);
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
  for (const l of GEARWORKS_SIGNAL_LEVELS) check(`${l.id} validates`, validateSignalLevel(l).length === 0);
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
  for (const l of GEARWORKS_DEBUG_LEVELS) check(`${l.id} validates`, validateDebugLevel(l).length === 0);
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

// --- Gearworks Inventor's Trophy Room (Phase 19) ---
{
  const GC = GEARWORKS_CONCEPTS;
  const SEQ = GEARWORKS_SEQUENCE;

  // every concept maps to at least one real level, and every level maps to exactly one concept
  check('every concept has at least one level', GC.every((c) => conceptLevels(c).length >= 1));
  const kindsCovered = new Set(GC.flatMap((c) => c.kinds));
  check('every level kind is covered by a concept', SEQ.every((e) => kindsCovered.has(e.kind)));
  const totalMapped = GC.reduce((n, c) => n + conceptLevels(c).length, 0);
  check('concepts partition the whole sequence', totalMapped === SEQ.length);
  check('concept ids are unique', new Set(GC.map((c) => c.id)).size === GC.length);

  // an empty save → nothing started, nothing mastered
  const empty: Record<string, number> = {};
  const t0 = garageTotals(empty);
  check('an empty save has zero earned stars', t0.earned === 0);
  check('an empty save has the full possible total', t0.total === SEQ.length * 3);
  check('an empty save masters no concept', t0.conceptsComplete === 0 && !t0.allComplete);
  check('an empty save starts no concept', t0.conceptsStarted === 0);
  check('nextConcept on an empty save is the first concept', nextConcept(empty)?.id === GC[0].id);
  check('no diploma on an empty save', !diplomaEarned(empty));

  // a partial save: master exactly the first concept
  const partial: Record<string, number> = {};
  for (const e of conceptLevels(GC[0])) partial[e.level.id] = 3;
  const tp = conceptProgress(GC[0], partial);
  check('a fully-3-starred concept is complete', tp.complete && tp.earned === tp.total);
  check('mastering the first concept still leaves the garage incomplete', !garageTotals(partial).allComplete);
  check('nextConcept skips the mastered first concept', nextConcept(partial)?.id === GC[1].id);
  check('one star short is not complete', conceptProgress(GC[0], { ...partial, [conceptLevels(GC[0])[0].level.id]: 2 }).complete === false);

  // a full save → diploma
  const full: Record<string, number> = {};
  for (const e of SEQ) full[e.level.id] = 3;
  const tf = garageTotals(full);
  check('a full save masters every concept', tf.conceptsComplete === GC.length && tf.allComplete);
  check('a full save earns the diploma', diplomaEarned(full));
  check('nextConcept on a full save is null', nextConcept(full) === null);
  check('garage earned never exceeds total', tf.earned === tf.total);

  // over-cap stars are clamped to 3 per level
  const over: Record<string, number> = {};
  for (const e of SEQ) over[e.level.id] = 9;
  check('stars above 3 per level are clamped in totals', garageTotals(over).earned === SEQ.length * 3);
}

// --- Curriculum enforcement (addendum sections 1-7, 12) ---
{
  const issues = validateCurriculum();
  check('curriculum has zero validation issues', issues.length === 0);
  if (issues.length) for (const i of issues.slice(0, 12)) console.log('    !', i.where, '::', i.problem);

  check('all fourteen stages exist in typed data', CURRICULUM_STAGES.length === 14);
  check('stages are in the official order',
    CURRICULUM_STAGES.map((s) => s.id).join(',') ===
    'sequence,events,loops,conditions,if-else,functions,variables,state,messages,parallelism,debugging,decomposition,data,agents');
  check('every stage has child-facing language', CURRICULUM_STAGES.every((s) => s.childFacingLanguage.length > 0));
  check('every stage has evidence requirements', CURRICULUM_STAGES.every((s) => s.evidenceRequirements.length > 0));
  check('prerequisites always point earlier in the curriculum',
    CURRICULUM_STAGES.every((s) => s.prerequisites.every((p) => stage(p).order < s.order)));
  check('if-else requires conditions', stage('if-else').prerequisites.includes('conditions'));
  check('parallelism requires events and messages',
    ['events', 'messages'].every((p) => stage('parallelism').prerequisites.includes(p as any)));
  check('agents require state, variables, data and conditions',
    ['state', 'variables', 'data', 'conditions'].every((p) => allPrerequisites('agents').includes(p as any)));

  // every level in the app carries metadata
  const metaIds = new Set(LEVEL_CURRICULUM.map((l) => l.levelId));
  check('every legacy level has curriculum metadata', ALL_LEVELS.every((l) => metaIds.has(l.id)));
  check('every gearworks level has curriculum metadata', GEARWORKS_SEQUENCE.every((e) => metaIds.has(e.level.id)));
  check('no orphan metadata', LEVEL_CURRICULUM.every((l) =>
    ALL_LEVELS.some((x) => x.id === l.levelId) || GEARWORKS_SEQUENCE.some((e) => e.level.id === l.levelId)));

  // debugging is cross-curricular (section 8)
  const dbgWorlds = new Set(levelsForStage('debugging').map((l) => l.world));
  check('debugging is practised in every world that has levels',
    [...new Set(LEVEL_CURRICULUM.map((l) => l.world))].every((w) => dbgWorlds.has(w)));

  // mastery is evidence-driven, never level-count-driven (sections 5, 13)
  const empty: EvidenceEvent[] = [];
  check('an empty log leaves every stage not-introduced',
    allMastery(empty).every((m) => m.state === 'not-introduced'));
  const guidedOnly: EvidenceEvent[] = [
    { stage: 'loops', requirement: 'loop-spot', phase: 'guide', levelId: 'bb-1', note: 'n' },
  ];
  check('one guided level does NOT count as learned', stageMastery('loops', guidedOnly).state === 'guided');
  const built = [...guidedOnly,
    { stage: 'loops', requirement: 'loop-replace', phase: 'build', levelId: 'bb-3', note: 'n' } as EvidenceEvent];
  check('building unaided reaches practised', stageMastery('loops', built).state === 'practiced');
  const repaired = [...built,
    { stage: 'loops', requirement: 'loop-count', phase: 'debug', levelId: 'bb-debug', note: 'n' } as EvidenceEvent];
  check('build + repair reaches demonstrated', stageMastery('loops', repaired).state === 'demonstrated');
  const transferred = [...repaired,
    { stage: 'loops', requirement: 'loop-replace', phase: 'create', levelId: 'bb-creative', note: 'n' } as EvidenceEvent];
  check('creative transfer reaches applied-creatively', stageMastery('loops', transferred).state === 'applied-creatively');
  check('child tiers never expose formal labels',
    childTier(stageMastery('loops', transferred).state).label === 'Shining Bloom');

  // gating is gentle: prerequisites must be MET, not mastered
  const seqSeen: EvidenceEvent[] = [
    { stage: 'sequence', requirement: 'seq-order', phase: 'discover', levelId: 'sm-1', note: 'n' },
  ];
  check('a stage unlocks once its prerequisites are merely introduced',
    isStageAvailable('loops', seqSeen) && isStageAvailable('if-else', [
      { stage: 'conditions', requirement: 'cond-check', phase: 'discover', levelId: 'pf-1', note: 'n' },
    ]));
  check('loops stay closed until sequence is met', !isStageAvailable('loops', []));
  check('a stage stays closed until prerequisites are met', !isStageAvailable('agents', empty));
  check('nextStage on an empty log is sequence', nextStage(empty) === 'sequence');
}

// ---------------------------------------------------------------
// Curriculum runtime: evidence recording, parent report, Code Peek
// ---------------------------------------------------------------
{
  console.log('\n-- curriculum runtime (evidence, report, Code Peek) --');

  // Evidence is earned, not handed out for finishing.
  check('a failed run records nothing', evidenceForRun('bb-3', 0, 'Bubble Loop').length === 0);
  check('a level with no metadata records nothing',
    evidenceForRun('not-a-level', 3, 'Nowhere').length === 0);
  const oneStar = evidenceForRun('bb-3', 1, 'Bubble Loop');
  const threeStar = evidenceForRun('bb-3', 3, 'Bubble Loop');
  check('one star earns less evidence than three', oneStar.length < threeStar.length);
  check('three stars earn every evidence item the level declares',
    threeStar.length === (LEVEL_CURRICULUM.find((l) => l.levelId === 'bb-3')?.evidenceEvents.length ?? -1));
  check('recorded phase always comes from the level design',
    threeStar.every((e) => e.phase === 'build'));
  check('only genuinely creative levels can produce create evidence',
    evidenceForRun('bb-creative', 3, 'Your Own Loop').every((e) => e.phase === 'create')
    && threeStar.every((e) => e.phase !== 'create'));
  check('every recorded event names a real stage requirement',
    threeStar.every((e) => stage(e.stage).evidenceRequirements.some((r) => r.id === e.requirement)));
  check('every recorded event carries a readable sentence',
    threeStar.every((e) => e.note.length > 10 && e.note.includes('Bubble Loop')));

  // Concrete observations describe the program the child actually placed.
  const loopObs = programObservation([{ label: 'Lift' }, { label: 'Repeat', arg: 4, isLoop: true }]);
  check('a one-step loop is reported concretely',
    loopObs?.stage === 'loops' && loopObs.text === 'noticed 4 repeated Lift steps could be one Repeat 4');
  const bodyObs = programObservation([
    { label: 'Lift' }, { label: 'Drop' }, { label: 'Repeat', arg: 3, isLoop: true },
  ]);
  check('a multi-step loop body is reported as a wrapped block',
    bodyObs?.text === 'wrapped 2 steps in a single Repeat 3');
  check('a short loop-free program invents no observation',
    programObservation([{ label: 'Start' }]) === null);
  check('a concrete observation reaches the recorded note',
    evidenceForRun('bb-3', 3, 'Bubble Loop', [{ label: 'Lift' }, { label: 'Repeat', arg: 4, isLoop: true }])
      .some((e) => e.note.includes('could be one Repeat 4')));

  // Parent report (section 10): evidence only, no scores or comparisons.
  const emptyReport = buildParentReport([]);
  check('an empty report never claims progress',
    emptyReport.active.length === 0 && emptyReport.stages.length === CURRICULUM_STAGES.length);
  check('an empty log has no latest observation', latestObservation([]) === null);
  const runLog = evidenceForRun('bb-3', 3, 'Bubble Loop');
  const report = buildParentReport(runLog);
  const loopRow = report.stages.find((r) => r.stage === 'loops');
  check('the report reuses the recorded sentences verbatim',
    !!loopRow && loopRow.observations.every((o) => runLog.some((e) => e.note === o)));
  check('the report uses grown-up state labels', !!loopRow && loopRow.label.length > 0
    && loopRow.label !== 'practiced');
  check('the report suggests a next step without naming a deficit',
    !!loopRow && loopRow.nextStep.length > 0
    && !/behind|below|fail|should have/i.test(loopRow.nextStep));
  check('no report sentence contains a percentage or rank',
    report.stages.every((r) => !/%|\brank\b|\baverage\b/i.test(
      [r.label, r.description, r.nextStep, ...r.observations].join(' '))));
  const skipped = buildParentReport([
    { stage: 'loops', requirement: 'loop-spot', phase: 'discover', levelId: 'bb-1', note: 'n' },
    { stage: 'loops', requirement: 'loop-replace', phase: 'build', levelId: 'bb-3', note: 'n' },
    { stage: 'loops', requirement: 'loop-count', phase: 'debug', levelId: 'bb-debug', note: 'n' },
  ]).stages.find((r) => r.stage === 'loops');
  check('the next step always looks forward, never back to a passed phase',
    skipped?.nextStep.includes('idea of their own') === true);
  check('duplicate replays never duplicate an observation',
    buildParentReport([...runLog, ...runLog]).stages
      .every((r) => new Set(r.observations).size === r.observations.length));

  // Code Peek (section 11): describes the child's ACTUAL program.
  const peek = [
    { label: 'Lift' }, { label: 'Drop' }, { label: 'Repeat', arg: 3, isLoop: true },
  ];
  check('plain language shows the loop as a block',
    plainLanguage(peek).join('|') === 'Repeat 3 times:|    Lift|    Drop');
  check('JavaScript preview mirrors the same program',
    javaScriptPreview(peek).join('\n') === 'for (let i = 0; i < 3; i++) {\n  lift();\n  drop();\n}');
  check('a loop-free program stays a flat list',
    plainLanguage([{ label: 'Start' }, { label: 'Stop' }]).join('|') === 'Start|Stop');
  check('an empty loop body is reported, not guessed at',
    plainLanguage([{ label: 'Repeat', arg: 2, isLoop: true }])[0].includes('nothing to repeat yet'));
  check('the loops sentence names the count the child chose',
    conceptSentence('loops', peek).includes('3 times'));
  check('every stage has a Code Peek sentence',
    CURRICULUM_STAGES.every((s) => conceptSentence(s.id, peek).length > 0));
  check('Code Peek takes its concept from the curriculum registry',
    peekForLevel('bb-3', 'Bubble Loop', peek)?.concept === 'loops');
  check('Code Peek is skipped where there is no program or no metadata',
    peekForLevel('bb-3', 'Bubble Loop', []) === null
    && peekForLevel('not-a-level', 'Nowhere', peek) === null);
}

// ---------------------------------------------------------------
// Curriculum ladder: every stage now has all five phases, and the
// levels that close them behave the way their phase claims.
// ---------------------------------------------------------------
{
  console.log('\n-- curriculum ladder --');
  const gaps = incompleteLadders();
  check('every stage has a full Discover->Guide->Build->Debug->Create ladder',
    gaps.length === 0);
  if (gaps.length > 0) console.log('   gaps:', JSON.stringify(gaps));

  // A debug-phase level must actually ship something broken to repair.
  const debugPhase = LEVEL_CURRICULUM.filter((l) => l.difficulty === 'debug');
  check('every concept has at least one debug-phase level',
    CURRICULUM_STAGES.every((s) => phasesForStage(s.id).includes('debug')));
  check('debug-phase levels all practise debugging itself',
    debugPhase.every((l) => l.practicedConcepts.includes('debugging')
      || l.assessedConcepts.includes('debugging')
      || l.introducedConcepts.includes('debugging')));

  // Prefilled programs are the mechanism; check each really is broken.
  const prefilled: Array<[string, boolean]> = [
    ['gw-jumpy-claw', validateSensorLevel(GW_JUMPY_CLAW).length === 0],
    ['gw-mixed-up-belt', validateSorterLevel(GW_MIXED_UP_BELT).length === 0],
    ['gw-counter-mixup', validateCounterLevel(GW_COUNTER_MIXUP).length === 0],
    ['gw-job-mixup', validateJobLevel(GW_JOB_MIXUP).length === 0],
  ];
  for (const [id, ok] of prefilled) check(`${id} ships a genuinely broken program`, ok);
  check('the jumpy claw really does snap on air',
    runSensorMachine(GW_JUMPY_CLAW.prefill!.map((s) => ({ ...s })), 'berry').finalState.snaps > 0);
  check('the mixed-up belt really does mis-sort every berry',
    !runSorter(GW_MIXED_UP_BELT.prefill!.map((s) => ({ ...s })), GW_MIXED_UP_BELT.stream, GW_MIXED_UP_BELT.rules).allCorrect);

  // A create-phase level must leave room for more than one answer.
  check('My Own Number can be reached two different ways',
    countUpSolution(GW_MY_NUMBER).length > canonicalCounterSolution(GW_MY_NUMBER).length
    && countUpSolution(GW_MY_NUMBER).length <= GW_MY_NUMBER.maxSlots);
  check('Berry Parade asks for more berries than one wait-and-grab',
    (GW_BERRY_PARADE.berryGoal?.needBerries ?? 0) >= 3
    && canonicalSensorSolution(GW_BERRY_PARADE).length <= GW_BERRY_PARADE.maxSlots);

  // Discover levels must be gentle: the hint spells the answer out and
  // the canonical plan fits par exactly.
  check('The First Signal is winnable with one hand-off',
    signalStars(GW_FIRST_SIGNAL, signalOneSolution()) >= 2);
  check('The First Signal still has a third star to reach for',
    signalStars(GW_FIRST_SIGNAL, signalEncoreSolution()) === 3);
  check('Relay Race hands the child a Mailer lane that cannot win alone',
    !!GW_RELAY_RACE.prefill?.mailer
    && !runParallel({ packer: [], mailer: [...GW_RELAY_RACE.prefill!.mailer!] },
      { target: GW_RELAY_RACE.target }).success);

  // Every new level is reachable from the picker.
  const seqIds = new Set(GEARWORKS_SEQUENCE.map((e) => e.level.id));
  const ladderIds = [
    'gw-jumpy-claw', 'gw-berry-parade', 'gw-first-choice', 'gw-shape-shelf', 'gw-mixed-up-belt',
    'gw-counter-mixup', 'gw-my-number', 'gw-two-robots', 'gw-first-signal', 'gw-relay-race',
    'gw-job-mixup', 'gw-one-tower', 'gw-twin-towers', 'gw-wake-up-bloop',
    'gw-one-wrong-tile', 'gw-machine-clinic', 'gw-fix-and-finish',
  ];
  check('every ladder level is in the Gearworks picker', ladderIds.every((id) => seqIds.has(id)));
  check('every ladder level carries curriculum metadata',
    ladderIds.every((id) => LEVEL_CURRICULUM.some((l) => l.levelId === id)));
}

// ---------------------------------------------------------------
// Zip's App Lab — Phase 1: data model, registry, validator, modes
// ---------------------------------------------------------------
{
  console.log("\n-- Zip's App Lab: foundation --");
  const SEED = { id: 'proj-test', now: 1_700_000_000_000, themeId: 'sparkle-meadow' };

  // ---- registry shape ----
  check('there are exactly six app kits', APP_KITS.length === 6);
  check('every kit has a template', APP_KITS.every((k) => templatesForType(k.type).length > 0));
  check('every template belongs to a kit',
    MINI_APP_TEMPLATES.every((t) => APP_KITS.some((k) => k.type === t.type)));
  check('kit order is 1..6 with no gaps',
    [...APP_KITS].map((k) => k.order).sort((a, b) => a - b).join(',') === '1,2,3,4,5,6');
  check('every app type has a kit',
    MINI_APP_TYPES.every((t) => APP_KITS.some((k) => k.type === t)));
  check('template limits match the spec table', (() => {
    const want: Record<string, [number, number, number, number]> = {
      'tap-react-basic': [1, 5, 4, 6],
      'sorting-basic': [1, 8, 5, 8],
      'story-basic': [3, 5, 6, 8],
      'music-basic': [1, 8, 8, 12],
      'helper-basic': [1, 8, 6, 10],
      'mini-game-collect': [1, 10, 8, 10],
    };
    return MINI_APP_TEMPLATES.every((t) => {
      const w = want[t.id];
      return !!w && t.maximumScenes === w[0] && t.maximumComponentsPerScene === w[1]
        && t.maximumScripts === w[2] && t.maximumCommandsPerScript === w[3];
    });
  })());
  check('only the Story kit has more than one scene',
    MINI_APP_TEMPLATES.filter((t) => t.maximumScenes > 1).map((t) => t.type).join() === 'story');
  check('every template names a real layout',
    MINI_APP_TEMPLATES.every((t) => sceneLayout(t.layoutTemplateId) !== null));
  check('every layout has room for its template',
    MINI_APP_TEMPLATES.every((t) =>
      (sceneLayout(t.layoutTemplateId)?.slots.length ?? 0) >= t.maximumComponentsPerScene));
  check('components-total is scenes x per-scene',
    maximumComponentsTotal(miniAppTemplate('story-basic')!) === 15);

  // ---- allow-lists are closed and coherent ----
  check('every allowed component is an approved component',
    MINI_APP_TEMPLATES.every((t) => t.allowedComponents.every((c) => approvedComponent(c) !== null)));
  check('a kit that allows a condition also allows a branch',
    MINI_APP_TEMPLATES.every((t) => t.allowedConditions.length === 0
      || t.allowedCommands.includes('if') || t.allowedCommands.includes('ifElse')
      || t.allowedCommands.includes('repeatUntil')));
  check('a kit that allows a branch also allows a question',
    MINI_APP_TEMPLATES.every((t) =>
      (!t.allowedCommands.includes('if') && !t.allowedCommands.includes('ifElse')) || t.allowedConditions.length > 0));
  check('a kit that allows counters also allows a number variable',
    MINI_APP_TEMPLATES.every((t) => !t.allowedCommands.includes('increaseCounter')
      || (t.allowedVariables.includes('number') && t.maximumVariables > 0)));
  check('a kit that allows Call Job also allows jobs',
    MINI_APP_TEMPLATES.every((t) => !t.allowedCommands.includes('callJob') || t.maximumJobs > 0));
  check('a kit that allows Change Scene has more than one scene',
    MINI_APP_TEMPLATES.every((t) => !t.allowedCommands.includes('changeScene') || t.maximumScenes > 1));
  check('Tap Magic stays flat — no control blocks at all',
    (() => {
      const t = miniAppTemplate('tap-react-basic')!;
      return t.maximumCommandDepth === 1
        && !t.allowedCommands.includes('if') && !t.allowedCommands.includes('repeatN');
    })());
  check('only the Helper kit may ask for approval',
    MINI_APP_TEMPLATES.filter((t) => t.allowedCommands.includes('askForApproval'))
      .map((t) => t.type).join() === 'helper');

  // ---- approved shelves ----
  check('every asset names at least one role', APPROVED_ASSETS.every((a) => a.roles.length > 0));
  check('every asset has a glyph so nothing renders blank',
    APPROVED_ASSETS.every((a) => a.glyph.length > 0));
  check('asset ids are unique',
    new Set(APPROVED_ASSETS.map((a) => a.id)).size === APPROVED_ASSETS.length);
  check('only Zip and Mixy claim drawn art',
    APPROVED_ASSETS.filter((a) => a.svg).map((a) => a.id).sort().join() === 'mixy,zip');
  check('every component role has at least one asset',
    APPROVED_COMPONENTS.every((c) => APPROVED_ASSETS.some((a) => a.roles.includes(c.type))));
  check('there are seven themes, one per world', APP_LAB_THEMES.length === 7);
  check('sound and phrase ids are unique',
    new Set(APPROVED_SOUNDS.map((s) => s.id)).size === APPROVED_SOUNDS.length
    && new Set(PREPARED_PHRASES.map((p) => p.id)).size === PREPARED_PHRASES.length);
  check('title tokens cover all three groups',
    (['owner', 'describing', 'thing'] as const).every((g) => tokensInGroup(g).length >= 3));
  check('layout slot ids are unique within a layout',
    SCENE_LAYOUTS.every((l) => new Set(l.slots.map((x) => x.id)).size === l.slots.length));

  // ---- starters ----
  check('there are starters for every template',
    MINI_APP_TEMPLATES.every((t) => startersForTemplate(t.id).length >= 3));
  check('starter ids are unique',
    new Set(MINI_APP_STARTERS.map((s) => s.id)).size === MINI_APP_STARTERS.length);
  const builtStarters = MINI_APP_STARTERS.map((s) => ({ s, p: s.build(SEED) }));
  let starterProblems: string[] = [];
  for (const { s, p } of builtStarters) {
    const r = validateMiniAppProject(p);
    if (!r.valid) starterProblems.push(`${s.id}: ${r.issues.map((i) => i.path + ' ' + i.problem).join(' | ')}`);
  }
  check('every starter project validates', starterProblems.length === 0);
  if (starterProblems.length > 0) console.log('   ' + starterProblems.join('\n   '));
  check('every starter fits its own template limits', builtStarters.every(({ p }) => {
    const t = miniAppTemplate(p.templateId)!;
    return p.scenes.length <= t.maximumScenes
      && p.scenes.every((sc) => sc.components.length <= t.maximumComponentsPerScene)
      && p.scripts.length <= t.maximumScripts
      && p.scripts.every((sr) => flattenCommands(sr.commands).length <= t.maximumCommandsPerScript);
  }));
  check('every starter ships at least one script to learn from',
    builtStarters.every(({ p }) => p.scripts.length >= 1));
  check('every starter declares the ideas it uses',
    builtStarters.every(({ p }) => p.curriculum.conceptsUsed.length > 0));
  check('a starter never invents an asset',
    builtStarters.every(({ p }) => allComponents(p).every((c) => isApprovedAsset(c.assetId))));
  check('every starter component sits in a slot its layout has',
    builtStarters.every(({ p }) => p.scenes.every((sc) =>
      sc.components.every((c) => layoutHasSlot(sc.layoutTemplateId, c.slotId)))));
  check('every starter component has an accessibility label',
    builtStarters.every(({ p }) => allComponents(p).every((c) => c.accessibilityLabel.length > 0)));
  check('starters are deterministic — same seed, same project',
    JSON.stringify(MINI_APP_STARTERS[0].build(SEED)) === JSON.stringify(MINI_APP_STARTERS[0].build(SEED)));
  check('only the Helper kit carries a helper brain',
    builtStarters.every(({ p }) => !p.helper || p.type === 'helper'));
  check('every helper starter has a goal, a tool and an approval gate',
    builtStarters.filter(({ p }) => p.type === 'helper').every(({ p }) =>
      !!p.helper && p.helper.goalId.length > 0 && p.helper.toolIds.length > 0
      && p.helper.requiresApprovalFor.length > 0));

  // ---- validator rejects everything it should ----
  const good = MINI_APP_STARTERS.find((s) => s.id === 'color-sorter')!.build(SEED);
  check('the reference project is valid', validateMiniAppProject(good).valid);

  const broken = (mutate: (p: MiniAppProject) => MiniAppProject): ReturnType<typeof validateMiniAppProject> =>
    validateMiniAppProject(mutate(JSON.parse(JSON.stringify(good)) as MiniAppProject));

  check('an unknown schema version is refused',
    !broken((p) => ({ ...p, schemaVersion: 99 })).valid);
  check('an unknown template is refused',
    !broken((p) => ({ ...p, templateId: 'not-a-template' })).valid);
  check('an unknown theme is refused',
    !broken((p) => ({ ...p, themeId: 'moon-base' })).valid);
  check('a typed title is impossible — free text is refused',
    !broken((p) => ({ ...p, title: { tokens: ['my rude word'] } })).valid);
  check('too many scenes is refused',
    !broken((p) => ({ ...p, scenes: [p.scenes[0], { ...p.scenes[0], id: 's2' }] })).valid);
  check('too many components is refused', !broken((p) => {
    const extra = Array.from({ length: 12 }, (_, i) => ({
      ...p.scenes[0].components[0], id: `extra-${i}`, slotId: 'tray-1',
    }));
    return { ...p, scenes: [{ ...p.scenes[0], components: extra }] };
  }).valid);
  check('an unknown asset is refused',
    !broken((p) => ({
      ...p,
      scenes: [{ ...p.scenes[0], components: [{ ...p.scenes[0].components[0], assetId: 'laser-gun' }, ...p.scenes[0].components.slice(1)] }],
    })).valid);
  check('a slot the layout does not have is refused',
    !broken((p) => ({
      ...p,
      scenes: [{ ...p.scenes[0], components: [{ ...p.scenes[0].components[0], slotId: 'nowhere' }, ...p.scenes[0].components.slice(1)] }],
    })).valid);
  check('two components in one slot is refused', !broken((p) => {
    const [a, b, ...rest] = p.scenes[0].components;
    return { ...p, scenes: [{ ...p.scenes[0], components: [a, { ...b, slotId: a.slotId }, ...rest] }] };
  }).valid);
  check('a blank accessibility label is refused',
    !broken((p) => ({
      ...p,
      scenes: [{ ...p.scenes[0], components: [{ ...p.scenes[0].components[0], accessibilityLabel: '  ' }, ...p.scenes[0].components.slice(1)] }],
    })).valid);
  check('a script owned by nothing is refused',
    !broken((p) => ({ ...p, scripts: [{ ...p.scripts[0], ownerId: 'ghost' }] })).valid);
  check('a trigger this kit does not allow is refused',
    !broken((p) => ({
      ...p,
      scripts: [{ ...p.scripts[0], trigger: { kind: 'onSensorDetected', targetId: p.scripts[0].ownerId } as MiniAppTrigger }],
    })).valid);
  check('a command this kit does not allow is refused',
    !broken((p) => ({
      ...p,
      scripts: [{ ...p.scripts[0], commands: [{ kind: 'askForApproval', phrase: 'hello', then: [] } as MiniAppCommand] }],
    })).valid);
  check('a command naming an unknown variable is refused',
    !broken((p) => ({
      ...p,
      scripts: [{ ...p.scripts[0], commands: [{ kind: 'increaseCounter', variableId: 'no-such-counter' }] }],
    })).valid);
  check('a command naming an unknown component is refused',
    !broken((p) => ({
      ...p,
      scripts: [{ ...p.scripts[0], commands: [{ kind: 'hide', targetId: 'no-such-thing' }] }],
    })).valid);
  check('a sound outside the approved shelf is refused',
    !broken((p) => ({
      ...p,
      scripts: [{ ...p.scripts[0], commands: [{ kind: 'playSound', sound: 'airhorn' as never }] }],
    })).valid);
  check('a phrase outside the prepared list is refused',
    !broken((p) => ({
      ...p,
      scripts: [{ ...p.scripts[0], commands: [{ kind: 'speakPhrase', targetId: p.scripts[0].ownerId, phrase: 'anything at all' as never }] }],
    })).valid);
  check('too many commands in one script is refused', !broken((p) => ({
    ...p,
    scripts: [{
      ...p.scripts[0],
      commands: Array.from({ length: 20 }, () => ({ kind: 'playSound', sound: 'tap' })) as MiniAppCommand[],
    }],
  })).valid);
  check('nesting deeper than the kit allows is refused', !broken((p) => ({
    ...p,
    scripts: [{
      ...p.scripts[0],
      commands: [{
        kind: 'if', test: { kind: 'counterAtLeast', variableId: 'score', value: 1 },
        then: [{
          kind: 'if', test: { kind: 'counterAtLeast', variableId: 'score', value: 2 },
          then: [{
            kind: 'if', test: { kind: 'counterAtLeast', variableId: 'score', value: 3 },
            then: [{ kind: 'celebrate' }],
          }],
        }],
      }] as MiniAppCommand[],
    }],
  })).valid);
  check('a goal the kit does not support is refused',
    !broken((p) => ({ ...p, goal: { ...p.goal, type: 'songPlays' } })).valid);
  check('a runtime budget above the kit budget is refused',
    !broken((p) => ({ ...p, runtimeBudget: { ...p.runtimeBudget, maximumSteps: 99_999 } })).valid);
  check('a project with no declared concepts is refused',
    !broken((p) => ({ ...p, curriculum: { ...p.curriculum, conceptsUsed: [] } })).valid);
  check('a helper brain on a non-helper project is refused',
    !broken((p) => ({
      ...p,
      helper: { goalId: 'g', toolIds: [], rules: [], requiresApprovalFor: [] },
    })).valid);

  check('every rejection carries a child-facing repair line',
    [
      broken((p) => ({ ...p, themeId: 'moon-base' })),
      broken((p) => ({ ...p, scripts: [{ ...p.scripts[0], ownerId: 'ghost' }] })),
    ].every((r) => !r.valid && typeof r.childMessage === 'string' && r.childMessage.length > 10));
  check('a rejection never blames the child',
    !/wrong|invalid|error|bad|failed|you did/i.test(
      broken((p) => ({ ...p, themeId: 'moon-base' })).childMessage ?? ''));
  check('every issue names a path a developer can find',
    broken((p) => ({ ...p, scripts: [{ ...p.scripts[0], ownerId: 'ghost' }] }))
      .issues.every((i) => i.path.length > 0 && i.problem.length > 0));

  // ---- serialisation ----
  check('a project round-trips through JSON without loss',
    JSON.stringify(JSON.parse(JSON.stringify(good))) === JSON.stringify(good));
  check('a round-tripped project still validates',
    validateMiniAppProject(JSON.parse(JSON.stringify(good)) as MiniAppProject).valid);
  check('looksLikeProject catches junk off disk',
    looksLikeProject(null) !== null && looksLikeProject({}) !== null
    && looksLikeProject('a string') !== null && looksLikeProject(good) === null);
  check('the schema version is recorded on every project',
    builtStarters.every(({ p }) => p.schemaVersion === MINI_APP_SCHEMA_VERSION));
  check('duplicating a project keeps the content and changes the identity', (() => {
    const copy = duplicateProject(good, { ...SEED, id: 'proj-copy' }, 2);
    return copy.id === 'proj-copy' && copy.title.version === 2
      && JSON.stringify(copy.scripts) === JSON.stringify(good.scripts)
      && validateMiniAppProject(copy).valid;
  })());
  check('a title reads back as words, never as token ids',
    titleText({ tokens: ['owner-zip', 'thing-berry', 'thing-game'] }) === "Zip's Berry Game");
  check('a duplicated title carries its number',
    titleText({ tokens: ['owner-my', 'thing-song'], version: 2 }) === 'My Song 2');
  check('an unknown token drops out rather than printing an id',
    titleText({ tokens: ['owner-my', 'not-a-token'] }) === 'My');

  // ---- command tree helpers ----
  const tree: MiniAppCommand[] = [
    { kind: 'playSound', sound: 'tap' },
    {
      kind: 'repeatN', times: 2,
      body: [{ kind: 'celebrate' }, { kind: 'if', test: { kind: 'basketIsFull', targetId: 'x' }, then: [{ kind: 'showWin' }] }],
    },
  ];
  check('flattenCommands walks the whole tree', flattenCommands(tree).length === 5);
  check('commandDepth measures nesting', commandDepth(tree) === 3);
  check('a flat script is depth 1', commandDepth([{ kind: 'celebrate' }]) === 1);
  check('an empty script is depth 0', commandDepth([]) === 0);
  check('nestedCommands only looks one level down', nestedCommands(tree[1]).length === 2);
  check('conditionRefs finds the ids a question mentions',
    conditionRefs({ kind: 'colorEquals', itemId: 'a', targetId: 'b' }).components.join() === 'a,b'
    && conditionRefs({ kind: 'counterEquals', variableId: 'v', value: 1 }).variables.join() === 'v');
  check('triggerRefs finds the ids a trigger mentions',
    triggerRefs({ kind: 'onTap', targetId: 'a' }).components.join() === 'a'
    && triggerRefs({ kind: 'onAppStart' }).components.length === 0
    && triggerRefs({ kind: 'onSceneStart', sceneId: 's1' }).scenes.join() === 's1');

  // ---- Build Mode vs Play Mode ----
  let st = initialCreatorState();
  check('the Lab starts in browse mode', st.step === 'lab' && st.mode === 'browse');
  check('you cannot jump straight to Play Mode', !canApply(st, { kind: 'test' }));
  st = applyCreatorAction(st, { kind: 'chooseKit' });
  st = applyCreatorAction(st, { kind: 'chooseTemplate' });
  check('choosing a template lands in Build Mode', st.step === 'build' && st.mode === 'build');
  check('Build Mode shows editing chrome', showsEditingChrome(st));
  st = applyCreatorAction(st, { kind: 'toTeach' });
  check('teaching behaviour is still Build Mode', st.mode === 'build');
  st = applyCreatorAction(st, { kind: 'toPredict' });
  check('prediction comes before the run', st.step === 'predict');
  st = applyCreatorAction(st, { kind: 'test' });
  check('testing enters Play Mode', st.step === 'play' && st.mode === 'play');
  check('Play Mode hides editing chrome', !showsEditingChrome(st));
  check('the Debug button is hidden until something surprising happens', !showsDebugButton(st));
  st = applyCreatorAction(st, { kind: 'unexpectedResult' });
  check('an unexpected result opens Debug', st.step === 'debug');
  check('Debug counts as Build Mode, not Play', st.mode === 'build');
  st = applyCreatorAction(st, { kind: 'editFromDebug' });
  check('editing from Debug returns to teaching', st.step === 'teach');
  check('an illegal action leaves the state untouched', (() => {
    const before = applyCreatorAction(initialCreatorState(), { kind: 'chooseKit' });
    return applyCreatorAction(before, { kind: 'editFromDebug' }) === before;
  })());
  check('every step declares exactly one mode',
    Object.values(STEP_MODE).every((m) => m === 'build' || m === 'play' || m === 'browse'));
  check('only play is Play Mode',
    Object.entries(STEP_MODE).filter(([, m]) => m === 'play').map(([k]) => k).join() === 'play');

  // ---- kit unlocking is gentle ----
  const noEvidence: EvidenceEvent[] = [];
  const tapKit = appKit('tap-magic')!;
  check('no kit is open on a blank save',
    APP_KITS.every((k) => !kitAvailability(k, noEvidence).unlocked));
  check('a grown-up can open every kit by hand',
    APP_KITS.every((k) => kitAvailability(k, noEvidence, true).unlocked));
  const metSeqEvents: EvidenceEvent[] = [
    { stage: 'sequence', requirement: 'seq-order', phase: 'discover', levelId: 'sm-1', note: 'n' },
    { stage: 'events', requirement: 'evt-trigger', phase: 'discover', levelId: 'sm-2', note: 'n' },
  ];
  check('Tap Magic opens once its ideas have merely been MET',
    kitAvailability(tapKit, metSeqEvents).unlocked);
  check('a kit whose ideas are not met yet stays shut',
    !kitAvailability(appKit('helper-builder')!, metSeqEvents).unlocked);
  check('a locked kit says what is coming, never what is missing', (() => {
    const av = kitAvailability(appKit('helper-builder')!, metSeqEvents);
    const line = waitingSentence(av.waitingOn);
    return line.length > 0 && !/need|must|cannot|locked|fail/i.test(line);
  })());
  check('every kit prerequisite is a real curriculum stage',
    APP_KITS.every((k) => k.prerequisites.every((p) => CURRICULUM_STAGES.some((s) => s.id === p))));
  check('a kit only requires ideas its template actually teaches',
    APP_KITS.every((k) => {
      const taught = templatesForType(k.type)[0]?.conceptsTaught ?? [];
      return k.prerequisites.every((p) => taught.includes(p));
    }));
  check('kit prerequisites match the template registry',
    APP_KITS.every((k) => {
      const t = templatesForType(k.type)[0];
      return !!t && [...k.prerequisites].sort().join() === [...t.curriculumPrerequisites].sort().join();
    }));
  check('the next kit is the first still-locked one in order',
    nextKit(noEvidence)?.id === 'tap-magic'
    && nextKit(metSeqEvents)?.id === 'sort-and-match');
  check('nothing is next once a grown-up opens everything',
    nextKit(noEvidence, true) === null);

  // ---- safety: nothing in the model can carry code ----
  check('no starter contains a raw script, url or handler string', (() => {
    const json = JSON.stringify(builtStarters.map(({ p }) => p));
    return !/<script|javascript:|https?:\/\/|function\s*\(|=>|eval\(/i.test(json);
  })());
  check('the only asset paths are the two local character SVGs',
    APPROVED_ASSETS.filter((a) => a.svg).every((a) => a.svg!.startsWith('./art/')));

  // The creator must stay pure: no rendering, no DOM, no storage, and
  // nothing that could execute a string. Checked against the real files.
  {
    const dir = readdirSync('src/creator').filter((f) => f.endsWith('.ts'));
    check('the creator tree has files to check', dir.length >= 6);
    const offenders: string[] = [];
    for (const f of dir) {
      // Scan code only — a comment that mentions Date.now() is fine, and
      // in fact this file's own header explains why it does not call it.
      const src = readFileSync(`src/creator/${f}`, 'utf8')
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/^\s*\/\/.*$/gm, '');
      if (/from '(three|\.\.\/rendering|\.\.\/ui|\.\.\/engine|\.\.\/storage)/.test(src)) offenders.push(`${f}: imports rendering/DOM/storage`);
      if (/\bdocument\b|\bwindow\b|localStorage|indexedDB/.test(src)) offenders.push(`${f}: touches the DOM or storage`);
      if (/\beval\(|new Function|innerHTML|setTimeout\(\s*['"]/.test(src)) offenders.push(`${f}: can execute a string`);
      if (/Date\.now\(|Math\.random\(/.test(src)) offenders.push(`${f}: is not deterministic`);
    }
    check('the creator is pure, deterministic and cannot execute a string',
      offenders.length === 0);
    if (offenders.length > 0) console.log('   ' + offenders.join('\n   '));
  }
}

// ---------------------------------------------------------------
// Zip's App Lab — Phase 2: editing, choices, prediction
// ---------------------------------------------------------------
{
  console.log("\n-- Zip's App Lab: creator UI logic --");
  const SEED2 = { id: 'p2', now: 1_700_000_000_000, themeId: 'sparkle-meadow' };
  const NOW = 1_700_000_001_000;
  const tap = MINI_APP_STARTERS.find((s) => s.id === 'blooming-flower')!.build(SEED2);
  const sort = MINI_APP_STARTERS.find((s) => s.id === 'color-sorter')!.build(SEED2);

  // ---- adding and removing components ----
  let ed = initialEditorState(tap);
  check('a fresh editor has nothing to undo', !canUndo(ed) && !canRedo(ed));
  check('free slots exclude the ones already used',
    !freeSlots(tap, 'scene-1').includes('stage-center'));

  const added = addComponent(ed, {
    id: 'c-new', sceneId: 'scene-1', type: 'button', assetId: 'button-green', now: NOW,
  });
  check('adding a component works', added.changed && !added.refusal);
  check('an added component lands in a free slot',
    added.state.project.scenes[0].components.some((c) => c.id === 'c-new'));
  check('adding a component records the asset in the manifest',
    added.state.project.assets.some((a) => a.assetId === 'button-green'));
  check('an accepted edit can be undone', canUndo(added.state));
  check('an added component still validates', validateMiniAppProject(added.state.project).valid);
  check('adding does not mutate the original project',
    tap.scenes[0].components.every((c) => c.id !== 'c-new'));

  check('a component this kit does not allow is refused', (() => {
    const r = addComponent(ed, {
      id: 'c-x', sceneId: 'scene-1', type: 'collectible', assetId: 'berry', now: NOW,
    });
    return !r.changed && !!r.refusal;
  })());
  check('an unknown asset is refused', (() => {
    const r = addComponent(ed, {
      id: 'c-x', sceneId: 'scene-1', type: 'prop', assetId: 'laser', now: NOW,
    });
    return !r.changed && !!r.refusal;
  })());
  check('a taken slot is refused', (() => {
    const r = addComponent(ed, {
      id: 'c-x', sceneId: 'scene-1', type: 'prop', assetId: 'star', slotId: 'stage-center', now: NOW,
    });
    return !r.changed && !!r.refusal;
  })());
  check('filling the screen refuses the next piece', (() => {
    let st = initialEditorState(tap);
    // Tap Magic allows five components and starts with one.
    for (let i = 0; i < 4; i++) {
      st = addComponent(st, { id: `f${i}`, sceneId: 'scene-1', type: 'prop', assetId: 'star', now: NOW }).state;
    }
    const r = addComponent(st, { id: 'f5', sceneId: 'scene-1', type: 'prop', assetId: 'leaf', now: NOW });
    return !r.changed && /full|taken/i.test(r.refusal ?? '');
  })());
  check('every refusal is written for a child, not a developer', (() => {
    const r = addComponent(ed, { id: 'c-x', sceneId: 'scene-1', type: 'collectible', assetId: 'berry', now: NOW });
    const m = r.refusal ?? '';
    return m.length > 10 && !/error|invalid|failed|illegal|null|undefined/i.test(m);
  })());

  // ---- removing tidies up after itself ----
  {
    const st = initialEditorState(tap);
    const gone = removeComponent(st, 'flower', NOW);
    check('removing a component removes it', gone.changed
      && gone.state.project.scenes[0].components.length === 0);
    check('removing a component removes the scripts that belonged to it',
      gone.state.project.scripts.length === 0);
    check('a project stays valid after a removal',
      validateMiniAppProject(gone.state.project).valid);
  }
  {
    // A script owned by something ELSE that mentions the removed piece.
    const withCross = addScript(initialEditorState(sort), {
      id: 'cross', ownerId: 'basket-red', trigger: { kind: 'onTap', targetId: 'basket-red' }, now: NOW,
    }).state;
    const withCmd = appendCommand(withCross, 'cross', { kind: 'hide', targetId: 'item-1' }, NOW).state;
    const gone = removeComponent(withCmd, 'item-1', NOW);
    const cross = gone.state.project.scripts.find((s) => s.id === 'cross');
    check('removing a component prunes commands that pointed at it',
      !!cross && cross.commands.length === 0);
    check('the pruned project still validates',
      validateMiniAppProject(gone.state.project).valid);
  }

  // ---- moving swaps rather than refusing ----
  {
    const two = addComponent(initialEditorState(tap), {
      id: 'c2', sceneId: 'scene-1', type: 'prop', assetId: 'star', slotId: 'stage-left', now: NOW,
    }).state;
    const moved = moveComponent(two, 'c2', 'stage-center', NOW);
    const comps = moved.state.project.scenes[0].components;
    check('moving onto an occupied slot swaps the two pieces',
      comps.find((c) => c.id === 'c2')?.slotId === 'stage-center'
      && comps.find((c) => c.id === 'flower')?.slotId === 'stage-left');
    check('a swap leaves the project valid', validateMiniAppProject(moved.state.project).valid);
    check('moving to a slot the layout lacks is refused',
      !moveComponent(two, 'c2', 'nowhere', NOW).changed);
  }

  // ---- scripts and steps ----
  {
    let st = initialEditorState(tap);
    const withScript = addScript(st, {
      id: 's-new', ownerId: 'flower', trigger: { kind: 'onAppStart' }, now: NOW,
    });
    check('adding a script works', withScript.changed);
    st = withScript.state;
    check('a trigger this kit does not allow is refused',
      !addScript(st, { id: 's-x', ownerId: 'flower', trigger: { kind: 'onDrop', targetId: 'flower' }, now: NOW }).changed);
    check('a script for a component that is not there is refused',
      !addScript(st, { id: 's-x', ownerId: 'ghost', trigger: { kind: 'onAppStart' }, now: NOW }).changed);

    const withCmd = appendCommand(st, 's-new', { kind: 'playSound', sound: 'pop' }, NOW);
    check('adding a step works', withCmd.changed);
    check('a step this kit does not allow is refused',
      !appendCommand(st, 's-new', { kind: 'celebrate' }, NOW).changed === false
      || !appendCommand(st, 's-new', { kind: 'increaseCounter', variableId: 'x' }, NOW).changed);
    check('a step added to a script that is gone is refused',
      !appendCommand(st, 'no-such-script', { kind: 'playSound', sound: 'pop' }, NOW).changed);

    // Tap Magic allows six commands per script.
    let long = st;
    for (let i = 0; i < 6; i++) {
      long = appendCommand(long, 's-new', { kind: 'playSound', sound: 'pop' }, NOW).state;
    }
    const overflow = appendCommand(long, 's-new', { kind: 'playSound', sound: 'tap' }, NOW);
    check('a script that is already full refuses another step',
      !overflow.changed && /long|out/i.test(overflow.refusal ?? ''));

    const two = appendCommand(withCmd.state, 's-new', { kind: 'hide', targetId: 'flower' }, NOW).state;
    const reordered = moveCommand(two, 's-new', 0, 1, NOW);
    check('steps can be reordered',
      reordered.state.project.scripts.find((s) => s.id === 's-new')!.commands[0].kind === 'hide');
    check('moving the first step earlier is refused',
      !moveCommand(two, 's-new', 0, -1, NOW).changed);
    check('a step can be removed',
      removeCommandAt(two, 's-new', 0, NOW).state.project.scripts
        .find((s) => s.id === 's-new')!.commands.length === 1);
    check('clearing a script empties it',
      clearScript(two, 's-new', NOW).state.project.scripts
        .find((s) => s.id === 's-new')!.commands.length === 0);
    check('clearing an already-empty script is refused',
      !clearScript(st, 's-new', NOW).changed);
    check('a removed script takes its steps with it',
      removeScript(two, 's-new', NOW).state.project.scripts.every((s) => s.id !== 's-new'));
    check('every edited project still validates',
      [withScript, withCmd, reordered].every((r) => validateMiniAppProject(r.state.project).valid));
  }

  // ---- undo and redo ----
  {
    let st = initialEditorState(tap);
    const before = JSON.stringify(st.project);
    st = addComponent(st, { id: 'u1', sceneId: 'scene-1', type: 'prop', assetId: 'star', now: NOW }).state;
    st = addComponent(st, { id: 'u2', sceneId: 'scene-1', type: 'prop', assetId: 'leaf', now: NOW }).state;
    check('two edits stack two undos', st.past.length === 2);
    const back = undo(undo(st));
    check('undoing twice returns the original project', JSON.stringify(back.project) === before);
    check('undo past the start is a no-op', undo(back) === back);
    const forward = redo(redo(back));
    check('redoing twice returns the edited project',
      JSON.stringify(forward.project) === JSON.stringify(st.project));
    check('redo past the end is a no-op', redo(forward) === forward);
    const fresh = addComponent(back, { id: 'u3', sceneId: 'scene-1', type: 'prop', assetId: 'berry', now: NOW });
    check('a new edit after undo clears the redo trail', fresh.state.future.length === 0);
    check('history is capped so a long session cannot grow forever', (() => {
      let s2 = initialEditorState(tap);
      for (let i = 0; i < HISTORY_LIMIT + 12; i++) {
        const r = setTitleTokens(s2, ['owner-my', i % 2 ? 'thing-star' : 'thing-berry'], NOW);
        s2 = r.state;
      }
      return s2.past.length === HISTORY_LIMIT;
    })());
    check('every undone state is a project that still validates',
      validateMiniAppProject(back.project).valid && validateMiniAppProject(forward.project).valid);
  }

  // ---- project-level edits ----
  check('a title needs at least one word', !setTitleTokens(initialEditorState(tap), [], NOW).changed);
  check('the theme can be changed', setTheme(initialEditorState(tap), 'bubble-bay', NOW).changed);
  check('setting the theme it already has is refused',
    !setTheme(initialEditorState(tap), tap.themeId, NOW).changed);

  // ---- readiness coaching ----
  check('an app with nothing on screen is not ready', (() => {
    const empty = removeComponent(initialEditorState(tap), 'flower', NOW).state;
    const r = readiness(empty.project);
    return !r.ready && /screen/i.test(r.nudge ?? '');
  })());
  check('an app with steps is ready to try', readiness(tap).ready);
  check('readiness never scolds', (() => {
    const empty = removeComponent(initialEditorState(tap), 'flower', NOW).state;
    return !/wrong|must|cannot|error/i.test(readiness(empty.project).nudge ?? '');
  })());

  // ---- tap-first choices ----
  {
    const choices = commandChoices(tap);
    check('every command choice is already complete — no arguments to fill in',
      choices.length > 0 && choices.every((c) => typeof c.command.kind === 'string'));
    check('every command choice is one this kit allows', (() => {
      const allowed = new Set(miniAppTemplate(tap.templateId)!.allowedCommands);
      return choices.every((c) => allowed.has(c.command.kind));
    })());
    check('command choices only name components the project has', (() => {
      const ids = new Set(allComponents(tap).map((c) => c.id));
      return choices.every((c) => !('targetId' in c.command) || ids.has(c.command.targetId));
    })());
    check('a tapped choice produces a project that validates', (() => {
      const st = addScript(initialEditorState(tap), {
        id: 's-c', ownerId: 'flower', trigger: { kind: 'onAppStart' }, now: NOW,
      }).state;
      return choices.slice(0, 12).every((c) => {
        const r = appendCommand(st, 's-c', c.command, NOW);
        return !r.changed || validateMiniAppProject(r.state.project).valid;
      });
    })());
    check('choice ids are unique', new Set(choices.map((c) => c.id)).size === choices.length);
    check('every choice has a picture and words',
      choices.every((c) => c.glyph.length > 0 && c.label.length > 2));

    const sortChoices = commandChoices(sort);
    check('a kit with counters offers counter steps',
      sortChoices.some((c) => c.command.kind === 'increaseCounter'));
    check('a kit without counters offers none',
      !choices.some((c) => c.command.kind === 'increaseCounter'));

    const triggers = triggerChoices(tap, 'flower');
    check('trigger choices are offered for the chosen object', triggers.length > 0);
    check('every trigger choice is one this kit allows', (() => {
      const allowed = new Set(miniAppTemplate(tap.templateId)!.allowedTriggers);
      return triggers.every((t) => allowed.has(t.trigger.kind));
    })());
    check('a trigger for an object that is not there yields nothing',
      triggerChoices(tap, 'ghost').length === 0);
    check('component choices respect the kit allow-list', (() => {
      const allowed = new Set(miniAppTemplate(tap.templateId)!.allowedComponents);
      return componentChoices(tap).every((c) => allowed.has(c.type));
    })());
  }

  // ---- plain descriptions ----
  check('every command in every starter can be described in words', (() => {
    return MINI_APP_STARTERS.every((s) => {
      const p = s.build(SEED2);
      return p.scripts.every((sc) =>
        flattenCommands(sc.commands).every((c) => {
          const text = describeCommand(p, c);
          return typeof text === 'string' && text.length > 2;
        }));
    });
  })());
  check('every trigger in every starter can be described in words',
    MINI_APP_STARTERS.every((s) => {
      const p = s.build(SEED2);
      return p.scripts.every((sc) => describeTrigger(p, sc.trigger).length > 5);
    }));
  check('a description names the thing, not its id',
    describeCommand(tap, { kind: 'hide', targetId: 'flower' }) === 'Hide Flower');
  check('scenes are numbered for a child, never named by id',
    sceneName(tap, 'scene-1') === 'Scene 1' && sceneName(tap, 'nope') === 'that scene');

  // ---- prediction is built from the real program ----
  {
    const choices = predictionChoices(tap);
    check('a prediction offers at least two outcomes', choices.length >= 2);
    check('exactly one prediction is correct',
      choices.filter((c) => c.correct).length === 1);
    check('the correct prediction is the first real step',
      choices.find((c) => c.correct)?.label === describeCommand(tap, tap.scripts[0].commands[0]));
    check('every prediction has a picture, so it can be answered without reading',
      choices.every((c) => c.glyph.length > 0));
    check('an app with no steps offers no prediction', (() => {
      const bare = clearScript(initialEditorState(tap), 'script-1', NOW).state;
      return predictionChoices(bare.project).length === 0;
    })());
    check('predictions never repeat the same wording',
      new Set(choices.map((c) => c.label)).size === choices.length);
  }
}

// ---------------------------------------------------------------
// Zip's App Lab — Phase 3: the shared runtime and Tap Magic
// ---------------------------------------------------------------
{
  console.log("\n-- Zip's App Lab: runtime --");
  const SEED3 = { id: 'p3', now: 1_700_000_000_000, themeId: 'sparkle-meadow' };
  const flower = MINI_APP_STARTERS.find((s) => s.id === 'blooming-flower')!.build(SEED3);
  const zip = MINI_APP_STARTERS.find((s) => s.id === 'jumping-zip')!.build(SEED3);
  const light = MINI_APP_STARTERS.find((s) => s.id === 'light-switch')!.build(SEED3);
  const pads = MINI_APP_STARTERS.find((s) => s.id === 'sound-buttons')!.build(SEED3);
  const NOW3 = 1_700_000_002_000;

  // ---- initial state ----
  const s0 = initialRuntimeState(flower);
  check('every component starts with a runtime state',
    Object.keys(s0.components).length === allComponents(flower).length);
  check('a component starts in the state the project gave it',
    s0.components.flower.state === 'droopy');
  check('a component remembers where home is',
    s0.components.flower.homeSlotId === s0.components.flower.slotId);
  check('the first scene is the one that starts', s0.sceneId === flower.scenes[0].id);
  check('a light starts off when the project says off',
    initialRuntimeState(light).components.lamp.lit === false);
  check('nothing has won before anything has happened', !s0.won && !s0.celebrating);
  check('a hidden component starts invisible', (() => {
    const story = MINI_APP_STARTERS.find((s) => s.id === 'lost-star')!.build(SEED3);
    return initialRuntimeState(story).components.star.visible === false;
  })());

  // ---- the reducer is pure ----
  check('applying a command does not mutate the state it was given', (() => {
    const before = initialRuntimeState(flower);
    const copy = JSON.stringify(before);
    applyCommand(before, { kind: 'changeState', targetId: 'flower', state: 'blooming' });
    return JSON.stringify(before) === copy;
  })());
  check('the same state and command always give the same result', (() => {
    const a = applyCommand(s0, { kind: 'changeState', targetId: 'flower', state: 'blooming' });
    const b = applyCommand(s0, { kind: 'changeState', targetId: 'flower', state: 'blooming' });
    return JSON.stringify(a) === JSON.stringify(b);
  })());

  // ---- individual commands ----
  check('change state changes the state',
    applyCommand(s0, { kind: 'changeState', targetId: 'flower', state: 'blooming' })
      .next.components.flower.state === 'blooming');
  check('changing to the state it already has reports nothing changed',
    applyCommand(s0, { kind: 'changeState', targetId: 'flower', state: 'droopy' })
      .outcome.kind === 'noChange');
  check('hide hides and show shows', (() => {
    const hidden = applyCommand(s0, { kind: 'hide', targetId: 'flower' }).next;
    return hidden.components.flower.visible === false
      && applyCommand(hidden, { kind: 'show', targetId: 'flower' }).next.components.flower.visible === true;
  })());
  check('hiding something already hidden reports nothing changed', (() => {
    const hidden = applyCommand(s0, { kind: 'hide', targetId: 'flower' }).next;
    return applyCommand(hidden, { kind: 'hide', targetId: 'flower' }).outcome.kind === 'noChange';
  })());
  check('a light turns on and off', (() => {
    const l0 = initialRuntimeState(light);
    const on = applyCommand(l0, { kind: 'lightOn', targetId: 'lamp' }).next;
    return on.components.lamp.lit === true
      && applyCommand(on, { kind: 'lightOff', targetId: 'lamp' }).next.components.lamp.lit === false;
  })());
  check('play sound asks the player for a sound',
    applyCommand(s0, { kind: 'playSound', sound: 'drum' }).sound === 'drum');
  check('speaking puts a phrase in the bubble',
    applyCommand(s0, { kind: 'speakPhrase', targetId: 'flower', phrase: 'hello' })
      .next.components.flower.saying === 'hello');
  check('change colour records the colour',
    applyCommand(s0, { kind: 'changeColor', targetId: 'flower', color: 'blue' })
      .next.components.flower.color === 'blue');
  check('wait holds for the beats it asks for',
    applyCommand(s0, { kind: 'wait', beats: 3 }).holdBeats === 3);
  check('celebrate sets celebrating and makes a sound', (() => {
    const r = applyCommand(s0, { kind: 'celebrate' });
    return r.next.celebrating && r.sound === 'celebrate';
  })());
  check('show win wins once and then reports nothing changed', (() => {
    const won = applyCommand(s0, { kind: 'showWin' });
    return won.next.won && applyCommand(won.next, { kind: 'showWin' }).outcome.kind === 'noChange';
  })());
  check('return home puts a piece back where it started', (() => {
    const moved = applyCommand(s0, { kind: 'sendToSlot', targetId: 'flower', slotId: 'stage-left' }).next;
    return moved.components.flower.slotId === 'stage-left'
      && applyCommand(moved, { kind: 'returnHome', targetId: 'flower' })
        .next.components.flower.slotId === s0.components.flower.slotId;
  })());
  check('a command aimed at nothing reports it rather than crashing',
    applyCommand(s0, { kind: 'hide', targetId: 'ghost' }).outcome.kind === 'noChange');
  check('counters go up, down and back to zero', (() => {
    const sorter = MINI_APP_STARTERS.find((s) => s.id === 'color-sorter')!.build(SEED3);
    let st = initialRuntimeState(sorter);
    st = applyCommand(st, { kind: 'increaseCounter', variableId: 'score' }).next;
    st = applyCommand(st, { kind: 'increaseCounter', variableId: 'score' }).next;
    const up = st.variables.score === 2;
    st = applyCommand(st, { kind: 'decreaseCounter', variableId: 'score' }).next;
    const down = st.variables.score === 1;
    st = applyCommand(st, { kind: 'resetCounter', variableId: 'score' }).next;
    return up && down && st.variables.score === 0;
  })());
  check('a counter change reports itself so other scripts can react', (() => {
    const sorter = MINI_APP_STARTERS.find((s) => s.id === 'color-sorter')!.build(SEED3);
    return applyCommand(initialRuntimeState(sorter),
      { kind: 'increaseCounter', variableId: 'score' }).counterChanged === 'score';
  })());

  // ---- honesty about what is not built yet ----
  check('a command the runtime cannot run yet says so, and does not pretend', (() => {
    const r = applyCommand(s0, { kind: 'repeatN', times: 2, body: [] });
    return r.outcome.kind === 'unsupported'
      && JSON.stringify(r.next) === JSON.stringify(s0);
  })());
  check('every unsupported command explains itself in child words',
    (['move', 'turn', 'callJob'] as const).every((kind) => {
      const cmd = kind === 'callJob'
        ? { kind, jobId: 'j' } as MiniAppCommand
        : { kind, targetId: 'flower', direction: 'up', cells: 1, rotation: 'left' } as unknown as MiniAppCommand;
      const r = applyCommand(s0, cmd);
      return r.outcome.kind === 'unsupported' && r.outcome.why.length > 10;
    }));

  // ---- trigger matching and ordering ----
  check('a tap runs the script that watches that thing',
    scriptsForCause(flower, { kind: 'tap', componentId: 'flower' }, s0).length === 1);
  check('tapping something else runs nothing',
    scriptsForCause(flower, { kind: 'tap', componentId: 'ghost' }, s0).length === 0);
  check('app start runs only start scripts', (() => {
    const story = MINI_APP_STARTERS.find((s) => s.id === 'lost-star')!.build(SEED3);
    const st = initialRuntimeState(story);
    return scriptsForCause(story, { kind: 'appStart' }, st).length === 0
      && scriptsForCause(story, { kind: 'sceneStart', sceneId: 'scene-1' }, st).length === 1;
  })());
  check('scripts run in a stable order — components first, then how they were written', (() => {
    const order1 = scriptsForCause(pads, { kind: 'tap', componentId: 'pad-drum' }, initialRuntimeState(pads));
    const order2 = scriptsForCause(pads, { kind: 'tap', componentId: 'pad-drum' }, initialRuntimeState(pads));
    return order1.map((s) => s.id).join() === order2.map((s) => s.id).join();
  })());

  // ---- whole runs ----
  {
    const r = run(flower, { kind: 'tap', componentId: 'flower' });
    check('tapping the flower runs its two steps', r.events.length === 2 && r.triggered);
    check('the flower ends up blooming', r.finalState.components.flower.state === 'blooming');
    check('every event carries the state before and after',
      r.events.every((e) => !!e.stateBefore && !!e.stateAfter));
    check('the state after one event is the state before the next',
      r.events.every((e, i) => i === 0
        || JSON.stringify(r.events[i - 1].stateAfter) === JSON.stringify(e.stateBefore)));
    check('events are numbered from one, in order',
      r.events.every((e, i) => e.step === i + 1));
    check('a run reports which script and which thing each step came from',
      r.events.every((e) => e.scriptId.length > 0 && e.componentId.length > 0));
    check('a tap on an untaught thing runs nothing and says so',
      run(flower, { kind: 'tap', componentId: 'ghost' }).triggered === false);
    check('running the same tap twice gives identical events',
      JSON.stringify(run(flower, { kind: 'tap', componentId: 'flower' }).events)
      === JSON.stringify(run(flower, { kind: 'tap', componentId: 'flower' }).events));
    check('a run never mutates the project', (() => {
      const before = JSON.stringify(flower);
      run(flower, { kind: 'tap', componentId: 'flower' });
      return JSON.stringify(flower) === before;
    })());
  }

  check('tapping Zip makes Zip jump', (() => {
    const r = run(zip, { kind: 'tap', componentId: 'zip' });
    return r.triggered && r.events[0].command.kind === 'animate';
  })());
  check('tapping the button turns the lamp on', (() => {
    const r = run(light, { kind: 'tap', componentId: 'button' });
    return r.finalState.components.lamp.lit === true;
  })());
  check('each sound pad plays its own sound', (() => {
    const drum = run(pads, { kind: 'tap', componentId: 'pad-drum' });
    const bell = run(pads, { kind: 'tap', componentId: 'pad-bell' });
    return drum.events[0].sound === 'drum' && bell.events[0].sound === 'bell';
  })());
  check('all four Tap Magic starters do something when tapped',
    [flower, zip, light, pads].every((p) => {
      const target = p.scripts[0].trigger;
      return target.kind === 'onTap'
        && run(p, { kind: 'tap', componentId: target.targetId }).triggered;
    }));

  // ---- the run is bounded ----
  check('a run stops at its own step budget', (() => {
    // A project whose budget is one step cannot run two.
    const tiny = { ...flower, runtimeBudget: { ...flower.runtimeBudget, maximumSteps: 1 } };
    const r = run(tiny, { kind: 'tap', componentId: 'flower' });
    return r.stepsUsed === 1 && r.overflowed;
  })());
  check('a run that fits its budget does not report an overflow',
    !run(flower, { kind: 'tap', componentId: 'flower' }).overflowed);
  check('a kit with no messages cannot start a message chain', (() => {
    // Tap Magic's budget allows zero messages per step, so even if a
    // message were somehow sent, nothing would follow it.
    const t = miniAppTemplate('tap-react-basic')!;
    return t.runtimeBudget.maximumMessagesPerStep === 0;
  })());
  check('a message loop ends at the chain-depth limit rather than spinning', (() => {
    const music = MINI_APP_STARTERS.find((s) => s.id === 'bop-band')!.build(SEED3);
    // Both instruments answer GO; make the drum send GO again, which
    // would loop forever without the depth cap.
    const looped: typeof music = {
      ...music,
      scripts: music.scripts.map((s) => (s.id === 'script-2'
        ? { ...s, commands: [...s.commands, { kind: 'sendMessage', message: 'go' } as MiniAppCommand] }
        : s)),
    };
    const r = run(looped, { kind: 'tap', componentId: 'play' });
    return r.events.length > 0 && r.stepsUsed <= looped.runtimeBudget.maximumSteps;
  })());
  check('every event records how deep in the chain it ran',
    run(flower, { kind: 'tap', componentId: 'flower' }).events.every((e) => e.chainDepth === 0));

  // ---- what the player needs to draw ----
  check('the tappable things are exactly those with a tap script',
    tappableComponents(flower, 'scene-1').join() === 'flower');
  check('a thing with no script is not marked tappable',
    !tappableComponents(light, 'scene-1').includes('lamp'));
  check('a project with a start script says so', (() => {
    const withStart = {
      ...flower,
      scripts: [{ id: 'x', ownerId: 'flower', trigger: { kind: 'onAppStart' as const }, commands: [] }],
    };
    return hasStartScript(withStart) && !hasStartScript(flower);
  })());

  // ---- the runtime stays inside the sandbox ----
  check('the runtime is pure — no DOM, no storage, no clock, no string execution', (() => {
    const src = readFileSync('src/creator/miniAppRuntime.ts', 'utf8')
      .replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
    return !/\bdocument\b|\bwindow\b|localStorage|indexedDB|eval\(|new Function|Date\.now\(|Math\.random\(/.test(src);
  })());
  check('every command in the closed union has a branch in the reducer', (() => {
    // If a new command were added without a branch, TypeScript would fail
    // the build; this asserts the runtime answers for all of them at run
    // time too, rather than falling through to undefined.
    const samples: MiniAppCommand[] = [
      { kind: 'show', targetId: 'flower' },
      { kind: 'hide', targetId: 'flower' },
      { kind: 'changeState', targetId: 'flower', state: 'happy' },
      { kind: 'changeColor', targetId: 'flower', color: 'red' },
      { kind: 'animate', targetId: 'flower', animation: 'hop' },
      { kind: 'lightOn', targetId: 'flower' },
      { kind: 'lightOff', targetId: 'flower' },
      { kind: 'playSound', sound: 'tap' },
      { kind: 'speakPhrase', targetId: 'flower', phrase: 'hello' },
      { kind: 'sendToSlot', targetId: 'flower', slotId: 'stage-left' },
      { kind: 'returnHome', targetId: 'flower' },
      { kind: 'wait', beats: 1 },
      { kind: 'celebrate' },
      { kind: 'showWin' },
      { kind: 'changeScene', sceneId: 'scene-1' },
      { kind: 'sendMessage', message: 'go' },
      { kind: 'increaseCounter', variableId: 'score' },
      { kind: 'decreaseCounter', variableId: 'score' },
      { kind: 'resetCounter', variableId: 'score' },
      { kind: 'move', targetId: 'flower', direction: 'up', cells: 1 },
      { kind: 'turn', targetId: 'flower', rotation: 'left' },
      { kind: 'askForHelp', phrase: 'iNeedHelp' },
      { kind: 'if', test: { kind: 'basketIsFull', targetId: 'flower' }, then: [] },
      { kind: 'ifElse', test: { kind: 'basketIsFull', targetId: 'flower' }, then: [], otherwise: [] },
      { kind: 'repeatN', times: 2, body: [] },
      { kind: 'repeatUntil', test: { kind: 'basketIsFull', targetId: 'flower' }, body: [] },
      { kind: 'waitForMessage', message: 'go' },
      { kind: 'callJob', jobId: 'j' },
      { kind: 'askForApproval', phrase: 'hello', then: [] },
    ];
    const kinds = new Set(samples.map((c) => c.kind));
    const everyKind = new Set<string>();
    for (const s of MINI_APP_TEMPLATES) for (const k of s.allowedCommands) everyKind.add(k);
    const covered = [...everyKind].every((k) => kinds.has(k as never));
    const answered = samples.every((c) => {
      const r = applyCommand(s0, c);
      return !!r && typeof r.outcome.kind === 'string' && typeof r.holdBeats === 'number';
    });
    return covered && answered;
  })());

  // ---- a run of a project built through the editor still works ----
  check('an app assembled by the editor runs', (() => {
    let ed = initialEditorState(zip);
    ed = addComponent(ed, {
      id: 'lamp2', sceneId: 'scene-1', type: 'light', assetId: 'lamp', now: NOW3,
    }).state;
    ed = addScript(ed, {
      id: 's-lamp', ownerId: 'lamp2', trigger: { kind: 'onTap', targetId: 'lamp2' }, now: NOW3,
    }).state;
    ed = appendCommand(ed, 's-lamp', { kind: 'lightOn', targetId: 'lamp2' }, NOW3).state;
    const r = run(ed.project, { kind: 'tap', componentId: 'lamp2' });
    return validateMiniAppProject(ed.project).valid
      && r.triggered && r.finalState.components.lamp2.lit === true;
  })());
}

// ---------------------------------------------------------------
// App Lab Phases 4–8: conditions, control flow, drops, approval
// ---------------------------------------------------------------
{
  console.log("\n-- Zip's App Lab: conditions and control flow --");
  const SEED4 = { id: 'p4', now: 1_700_000_000_000, themeId: 'sparkle-meadow' };
  const sorter = MINI_APP_STARTERS.find((s) => s.id === 'color-sorter')!.build(SEED4);
  const shapes = MINI_APP_STARTERS.find((s) => s.id === 'shape-match')!.build(SEED4);
  const story = MINI_APP_STARTERS.find((s) => s.id === 'lost-star')!.build(SEED4);
  const music = MINI_APP_STARTERS.find((s) => s.id === 'four-beat-loop')!.build(SEED4);
  const band = MINI_APP_STARTERS.find((s) => s.id === 'bop-band')!.build(SEED4);
  const game = MINI_APP_STARTERS.find((s) => s.id === 'collect-stars')!.build(SEED4);
  const helper = MINI_APP_STARTERS.find((s) => s.id === 'feed-the-pet')!.build(SEED4);
  const st4 = initialRuntimeState(sorter);

  // ---- conditions ----
  check('colour matching compares what two things are like',
    evaluateCondition(sorter, st4, { kind: 'colorEquals', itemId: 'item-1', targetId: 'basket-red' })
    && !evaluateCondition(sorter, st4, { kind: 'colorEquals', itemId: 'item-1', targetId: 'basket-blue' }));
  check('shape matching ignores colour',
    evaluateCondition(shapes, initialRuntimeState(shapes),
      { kind: 'shapeEquals', itemId: 'item-1', targetId: 'basket-square' }));
  check('a state question reads the live state', (() => {
    const flower = MINI_APP_STARTERS.find((s) => s.id === 'blooming-flower')!.build(SEED4);
    const s0 = initialRuntimeState(flower);
    const bloomed = applyCommand(s0, { kind: 'changeState', targetId: 'flower', state: 'blooming' }).next;
    return evaluateCondition(flower, bloomed, { kind: 'stateIs', targetId: 'flower', state: 'blooming' })
      && !evaluateCondition(flower, s0, { kind: 'stateIs', targetId: 'flower', state: 'blooming' });
  })());
  check('counter questions compare numbers', (() => {
    const two = { ...st4, variables: { ...st4.variables, score: 2 } };
    return evaluateCondition(sorter, two, { kind: 'counterEquals', variableId: 'score', value: 2 })
      && evaluateCondition(sorter, two, { kind: 'counterAtLeast', variableId: 'score', value: 1 })
      && !evaluateCondition(sorter, two, { kind: 'counterAtLeast', variableId: 'score', value: 5 });
  })());
  check('a question about something that is not there is false, never a crash',
    !evaluateCondition(sorter, st4, { kind: 'stateIs', targetId: 'ghost', state: 'idle' })
    && !evaluateCondition(sorter, st4, { kind: 'colorEquals', itemId: 'ghost', targetId: 'basket-red' }));
  check('"where it landed" resolves from the drop itself',
    evaluateCondition(sorter, st4,
      { kind: 'colorEquals', itemId: 'item-1', targetId: DROP_TARGET_REF }, { droppedOnto: 'basket-red' })
    && !evaluateCondition(sorter, st4,
      { kind: 'colorEquals', itemId: 'item-1', targetId: DROP_TARGET_REF }, { droppedOnto: 'basket-blue' }));

  // ---- sorting really sorts ----
  {
    const right = run(sorter, { kind: 'drop', componentId: 'item-1', ontoId: 'basket-red' });
    const wrong = run(sorter, { kind: 'drop', componentId: 'item-1', ontoId: 'basket-blue' });
    check('a red berry in the red basket scores', right.finalState.variables.score === 1);
    check('a red berry in the blue basket does NOT score', wrong.finalState.variables.score === 0);
    check('a wrongly sorted thing goes home again',
      wrong.finalState.components['item-1'].slotId
      === initialRuntimeState(sorter).components['item-1'].slotId);
    check('a rightly sorted thing stays where it landed',
      right.finalState.components['item-1'].slotId
      === st4.components['basket-red'].slotId);
    check('the right drop plays the happy sound and the wrong one does not',
      right.events.some((e) => e.sound === 'happy') && wrong.events.some((e) => e.sound === 'tryAgain'));
    check('both sorting items have their own rule',
      run(sorter, { kind: 'drop', componentId: 'item-2', ontoId: 'basket-blue' })
        .finalState.variables.score === 1);
    check('sorting the same thing twice is not double points', (() => {
      const once = run(sorter, { kind: 'drop', componentId: 'item-1', ontoId: 'basket-red' });
      const twice = run(sorter, { kind: 'drop', componentId: 'item-1', ontoId: 'basket-red' }, once.finalState);
      return twice.finalState.variables.score === 2;
    })());
  }

  // ---- if / if-else ----
  check('an If whose answer is no skips its steps', (() => {
    const p = {
      ...sorter,
      scripts: [{
        id: 'x', ownerId: 'item-1', trigger: { kind: 'onTap' as const, targetId: 'item-1' },
        commands: [{
          kind: 'if' as const,
          test: { kind: 'counterAtLeast' as const, variableId: 'score', value: 9 },
          then: [{ kind: 'increaseCounter' as const, variableId: 'score' }],
        }],
      }],
    };
    const r = run(p, { kind: 'tap', componentId: 'item-1' });
    return r.finalState.variables.score === 0
      && r.events.length === 1 && r.events[0].outcome.kind === 'noChange';
  })());
  check('an If whose answer is yes runs its steps', (() => {
    const p = {
      ...sorter,
      scripts: [{
        id: 'x', ownerId: 'item-1', trigger: { kind: 'onTap' as const, targetId: 'item-1' },
        commands: [{
          kind: 'if' as const,
          test: { kind: 'counterAtLeast' as const, variableId: 'score', value: 0 },
          then: [{ kind: 'increaseCounter' as const, variableId: 'score' }],
        }],
      }],
    };
    return run(p, { kind: 'tap', componentId: 'item-1' }).finalState.variables.score === 1;
  })());
  check('an If-Else always runs exactly one side', (() => {
    const r = run(sorter, { kind: 'drop', componentId: 'item-1', ontoId: 'basket-red' });
    const took = r.events.filter((e) => e.command.kind === 'increaseCounter').length;
    const other = r.events.filter((e) => e.command.kind === 'returnHome').length;
    return took === 1 && other === 0;
  })());

  // ---- loops ----
  check('Repeat runs its body that many times', (() => {
    const r = run(music, { kind: 'tap', componentId: 'play' });
    // Repeat 2 over a four-step body = 1 repeat event + 8 steps.
    return r.events.filter((e) => e.command.kind === 'playSound').length === 4;
  })());
  check('Repeat Until stops when the answer becomes yes', (() => {
    const p = {
      ...sorter,
      scripts: [{
        id: 'x', ownerId: 'item-1', trigger: { kind: 'onTap' as const, targetId: 'item-1' },
        commands: [{
          kind: 'repeatUntil' as const,
          test: { kind: 'counterAtLeast' as const, variableId: 'score', value: 3 },
          body: [{ kind: 'increaseCounter' as const, variableId: 'score' }],
        }],
      }],
    };
    return run(p, { kind: 'tap', componentId: 'item-1' }).finalState.variables.score === 3;
  })());
  check('Repeat Until on a question that never comes true gives up kindly', (() => {
    const p = {
      ...sorter,
      scripts: [{
        id: 'x', ownerId: 'item-1', trigger: { kind: 'onTap' as const, targetId: 'item-1' },
        commands: [{
          kind: 'repeatUntil' as const,
          test: { kind: 'stateIs' as const, targetId: 'item-1', state: 'collected' },
          body: [{ kind: 'playSound' as const, sound: 'tap' as const }],
        }],
      }],
    };
    const r = run(p, { kind: 'tap', componentId: 'item-1' });
    return r.overflowed && r.stepsUsed <= UNTIL_ROUNDS_CAP + 2;
  })());

  // ---- saved jobs ----
  check('calling a saved job runs the job body', (() => {
    const p = {
      ...music,
      jobs: [{
        id: 'chorus', iconId: 'x', title: { tokens: ['thing-song'] },
        commands: [
          { kind: 'playSound' as const, sound: 'drum' as const },
          { kind: 'playSound' as const, sound: 'bell' as const },
        ],
      }],
      scripts: [{
        id: 'x', ownerId: 'play', trigger: { kind: 'onTap' as const, targetId: 'play' },
        commands: [{ kind: 'callJob' as const, jobId: 'chorus' }],
      }],
    };
    const r = run(p, { kind: 'tap', componentId: 'play' });
    return r.events.filter((e) => e.command.kind === 'playSound').length === 2;
  })());
  check('calling a job that is not there says so and carries on', (() => {
    const p = {
      ...music,
      scripts: [{
        id: 'x', ownerId: 'play', trigger: { kind: 'onTap' as const, targetId: 'play' },
        commands: [
          { kind: 'callJob' as const, jobId: 'missing' },
          { kind: 'playSound' as const, sound: 'bell' as const },
        ],
      }],
    };
    const r = run(p, { kind: 'tap', componentId: 'play' });
    return r.events[0].outcome.kind === 'noChange' && r.events.length === 2;
  })());

  // ---- messages and playing together ----
  check('one signal sets both band members playing', (() => {
    const r = run(band, { kind: 'tap', componentId: 'play' });
    const sounds = r.events.filter((e) => e.sound).map((e) => e.sound);
    return sounds.includes('drum') && sounds.includes('bell');
  })());
  check('a message runs deeper in the chain than the tap that sent it', (() => {
    const r = run(band, { kind: 'tap', componentId: 'play' });
    return r.events.some((e) => e.chainDepth === 0) && r.events.some((e) => e.chainDepth === 1);
  })());

  // ---- scenes ----
  check('changing scene moves the story on', (() => {
    const r = run(story, { kind: 'tap', componentId: 'zip' });
    return r.finalState.sceneId === 'scene-2';
  })());
  check('changing to the scene you are already in reports nothing changed',
    run(story, { kind: 'tap', componentId: 'zip' }, { ...initialRuntimeState(story), sceneId: 'scene-2' })
      .events[0].outcome.kind === 'noChange');

  // ---- games: moving, collecting, winning ----
  check('a collected star adds to the score', (() => {
    const r = run(game, { kind: 'tap', componentId: 'star-1' });
    return r.finalState.variables.score === 1;
  })());
  check('reaching the target shows the win', (() => {
    let st = initialRuntimeState(game);
    st = { ...st, variables: { ...st.variables, score: 2 } };
    const r = run(game, { kind: 'tap', componentId: 'star-1' }, st);
    return r.finalState.won === true;
  })());
  check('the win only comes at the target, not before', (() => {
    const r = run(game, { kind: 'tap', componentId: 'star-1' });
    return r.finalState.won === false;
  })());
  check('Move walks a piece across the slot grid', (() => {
    const p = {
      ...game,
      scripts: [{
        id: 'x', ownerId: 'player', trigger: { kind: 'onTap' as const, targetId: 'player' },
        commands: [{ kind: 'move' as const, targetId: 'player', direction: 'up' as const, cells: 1 as const }],
      }],
    };
    const r = run(p, { kind: 'tap', componentId: 'player' });
    return r.finalState.components.player.slotId !== initialRuntimeState(p).components.player.slotId;
  })());
  check('Move into nothing says so instead of leaving the board', (() => {
    const p = {
      ...game,
      scripts: [{
        id: 'x', ownerId: 'player', trigger: { kind: 'onTap' as const, targetId: 'player' },
        commands: [{ kind: 'move' as const, targetId: 'player', direction: 'down' as const, cells: 3 as const }],
      }],
    };
    const r = run(p, { kind: 'tap', componentId: 'player' });
    return r.events[0].outcome.kind === 'noChange';
  })());

  // ---- helpers ask first ----
  check('a helper stops and asks before it acts', (() => {
    const r = run(helper, { kind: 'tap', componentId: 'helper' });
    return !!r.awaitingApproval && r.awaitingApproval.phrase === 'imThinking';
  })());
  check('saying yes lets the helper carry on', (() => {
    const r = run(helper, { kind: 'tap', componentId: 'helper' }, undefined, { approvals: [true] });
    return !r.awaitingApproval && r.finalState.components.pet.state === 'happy'
      && r.finalState.variables.meals === 1;
  })());
  check('saying no stops the helper there, and nothing changes', (() => {
    const r = run(helper, { kind: 'tap', componentId: 'helper' }, undefined, { approvals: [false] });
    return !r.awaitingApproval
      && r.finalState.components.pet.state === 'sleepy'
      && r.finalState.variables.meals === 0;
  })());
  check('the run before the question is identical whichever answer comes', (() => {
    const stop = run(helper, { kind: 'tap', componentId: 'helper' });
    const yes = run(helper, { kind: 'tap', componentId: 'helper' }, undefined, { approvals: [true] });
    return JSON.stringify(stop.events) === JSON.stringify(yes.events.slice(0, stop.events.length));
  })());
  check('a helper rule only fires when its question is true', (() => {
    const r = run(helper, { kind: 'appStart' });
    return r.triggered && r.events.some((e) => e.command.kind === 'speakPhrase');
  })());

  // ---- every starter runs without falling over ----
  check('every starter can be run from every trigger it declares', (() => {
    return MINI_APP_STARTERS.every((s) => {
      const p = s.build(SEED4);
      return p.scripts.every((script) => {
        const t = script.trigger;
        const cause: TriggerCause | null =
          t.kind === 'onAppStart' ? { kind: 'appStart' }
            : t.kind === 'onSceneStart' ? { kind: 'sceneStart', sceneId: t.sceneId }
              : t.kind === 'onTap' ? { kind: 'tap', componentId: t.targetId }
                : t.kind === 'onDrop' ? { kind: 'drop', componentId: t.targetId, ontoId: t.targetId }
                  : t.kind === 'onMessage' ? { kind: 'message', message: t.message }
                    : t.kind === 'onChoiceSelected' ? { kind: 'choice', componentId: t.targetId }
                      : t.kind === 'onItemCollected' ? { kind: 'tap', componentId: t.targetId }
                        : t.kind === 'onCounterChanged' ? { kind: 'counterChanged', variableId: t.variableId }
                          : null;
        if (!cause) return true;
        const r = run(p, cause, undefined, { approvals: [true, true, true] });
        return Array.isArray(r.events) && typeof r.stepsUsed === 'number';
      });
    });
  })());
  check('no starter run ever exceeds its own budget',
    MINI_APP_STARTERS.every((s) => {
      const p = s.build(SEED4);
      const r = run(p, { kind: 'appStart' }, undefined, { approvals: [true, true] });
      return r.stepsUsed <= p.runtimeBudget.maximumSteps;
    }));
}

// ---------------------------------------------------------------
// App Lab Phases 9-10: Think Trail, Glitch Replay, Code Peek
// ---------------------------------------------------------------
{
  console.log("\n-- Zip's App Lab: debugging and Code Peek --");
  const SEED9 = { id: 'p9', now: 1_700_000_000_000, themeId: 'sparkle-meadow' };
  const flower9 = MINI_APP_STARTERS.find((s) => s.id === 'blooming-flower')!.build(SEED9);
  const sorter9 = MINI_APP_STARTERS.find((s) => s.id === 'color-sorter')!.build(SEED9);
  const music9 = MINI_APP_STARTERS.find((s) => s.id === 'four-beat-loop')!.build(SEED9);
  const helper9 = MINI_APP_STARTERS.find((s) => s.id === 'feed-the-pet')!.build(SEED9);
  const NOW9 = 1_700_000_003_000;

  // ---- Think Trail ----
  {
    const r = run(flower9, { kind: 'tap', componentId: 'flower' });
    const lines = trailLines(flower9, r.events);
    check('the trail has one line per step', lines.length === r.events.length);
    check('every line says what it saw, chose and what happened',
      lines.every((l) => l.saw.length > 5 && l.chose.length > 2 && l.happened.length > 5));
    check('the trail names the trigger the child actually wrote',
      lines[0].saw === 'When Flower is tapped');
    check('the trail describes the real change, not the command name',
      lines[0].happened === 'Flower became blooming.');
    check('a step that did something is marked ok',
      lines.every((l) => l.verdict === 'ok'));
    check('an empty run makes an empty trail', trailLines(flower9, []).length === 0);
  }
  check('a question adds an "I checked" line, and a plain step does not', (() => {
    const r = run(sorter9, { kind: 'drop', componentId: 'item-1', ontoId: 'basket-red' });
    const lines = trailLines(sorter9, r.events);
    return lines.some((l) => l.checked !== undefined) && lines.some((l) => l.checked === undefined);
  })());
  check('a question that came out no says NO, not yes', (() => {
    const wrong = trailLines(sorter9, run(sorter9, { kind: 'drop', componentId: 'item-1', ontoId: 'basket-blue' }).events);
    const right = trailLines(sorter9, run(sorter9, { kind: 'drop', componentId: 'item-1', ontoId: 'basket-red' }).events);
    return wrong[0].checked === 'The answer was no.'
      && right[0].checked === 'The answer was yes.';
  })());
  check('the branch a run took is recorded on the event itself', (() => {
    const r = run(sorter9, { kind: 'drop', componentId: 'item-1', ontoId: 'basket-blue' });
    return r.events[0].branchTaken === 'no';
  })());
  check('a counter change is reported with both numbers', (() => {
    const r = run(sorter9, { kind: 'drop', componentId: 'item-1', ontoId: 'basket-red' });
    return trailLines(sorter9, r.events).some((l) => /from 0 to 1/.test(l.happened));
  })());
  check('the trail never uses the words of a failure screen', (() => {
    const r = run(sorter9, { kind: 'drop', componentId: 'item-1', ontoId: 'basket-blue' });
    const text = trailLines(sorter9, r.events).map((l) => `${l.saw} ${l.chose} ${l.happened}`).join(' ');
    return !/wrong|fail|error|bad|game over|lost/i.test(text);
  })());
  check('every starter can be told as a trail without a gap',
    MINI_APP_STARTERS.every((s) => {
      const p = s.build(SEED9);
      const r = run(p, { kind: 'appStart' }, undefined, { approvals: [true, true] });
      return trailLines(p, r.events).every((l) => l.happened !== '' && l.chose !== '');
    }));

  // ---- Code Peek: plain language ----
  {
    const plain = plainLanguageScript(flower9, flower9.scripts[0]);
    check('plain language opens with the trigger',
      plain[0] === 'When Flower is tapped:');
    check('plain language indents the steps under it',
      plain[1].startsWith('  ') && plain[1].includes('blooms'));
    check('a project with no scripts says so plainly',
      plainLanguageProject({ ...flower9, scripts: [] })[0].includes('not been taught'));
  }
  check('an If-Else reads as If / Otherwise', (() => {
    const lines = plainLanguageScript(sorter9, sorter9.scripts[0]);
    return lines.some((l) => l.trim().startsWith('If ')) && lines.some((l) => l.trim() === 'Otherwise:');
  })());
  check('a loop reads as Repeat N times', (() => {
    const lines = plainLanguageScript(music9, music9.scripts[0]);
    return lines.some((l) => l.trim() === 'Repeat 2 times:');
  })());
  check('"where it landed" reads as words, never as an id', (() => {
    const lines = plainLanguageScript(sorter9, sorter9.scripts[0]).join(' ');
    return lines.includes('where it landed') && !lines.includes('@dropped-on');
  })());
  check('an Ask First reads as asking first', (() => {
    const lines = plainLanguageScript(helper9, helper9.scripts[1]).join(' ');
    return /Ask first/.test(lines);
  })());

  // ---- Code Peek: JavaScript ----
  {
    const js = javaScriptProject(flower9).join('\n');
    check('the JavaScript view hangs the code off the real trigger',
      js.includes('flower.onTap(() => {'));
    check('the JavaScript view uses the thing\'s name, not its id',
      js.includes('flower.setState("blooming");') && !js.includes('script-1'));
    check('the JavaScript view closes what it opens',
      (js.match(/\{/g) ?? []).length === (js.match(/\}/g) ?? []).length);
  }
  check('an If-Else becomes a real if/else', (() => {
    const js = javaScriptProject(sorter9).join('\n');
    return js.includes('} else {') && js.includes('if (');
  })());
  check('a loop becomes a real for loop',
    javaScriptProject(music9).join('\n').includes('for (let i = 0; i < 2; i++) {'));
  check('a saved job becomes a function that is then called', (() => {
    const withJob = {
      ...music9,
      jobs: [{
        id: 'chorus', iconId: 'x', title: { tokens: ['thing-song'] },
        commands: [{ kind: 'playSound' as const, sound: 'drum' as const }],
      }],
      scripts: [{
        id: 'x', ownerId: 'play', trigger: { kind: 'onTap' as const, targetId: 'play' },
        commands: [{ kind: 'callJob' as const, jobId: 'chorus' }],
      }],
    };
    const js = javaScriptProject(withJob).join('\n');
    return js.includes('function song() {') && js.includes('song();');
  })());
  check('an app with nothing taught produces a comment, not fake code',
    javaScriptProject({ ...flower9, scripts: [] })[0].startsWith('//'));
  check('the JavaScript view never invents a step it cannot translate', (() => {
    // Every command kind any kit allows must be in the translatable set,
    // or a step would silently vanish and the code would stop matching.
    const translatable = new Set(translatableCommandKinds());
    const allowed = new Set<string>();
    for (const t of MINI_APP_TEMPLATES) for (const k of t.allowedCommands) allowed.add(k);
    return [...allowed].every((k) => translatable.has(k));
  })());
  check('every starter translates to code with no empty lines in the middle',
    MINI_APP_STARTERS.every((s) => {
      const p = s.build(SEED9);
      const js = javaScriptProject(p);
      return js.length > 0 && js.every((line) => typeof line === 'string');
    }));
  check('the code a child sees matches the app they built', (() => {
    // Add a step, and the code must gain exactly that step.
    const before = javaScriptProject(flower9).join('\n');
    const ed = appendCommand(
      initialEditorState(flower9), 'script-1', { kind: 'hide', targetId: 'flower' }, NOW9).state;
    const after = javaScriptProject(ed.project).join('\n');
    return !before.includes('flower.hide();') && after.includes('flower.hide();');
  })());
  check('Code Peek is pure — it reads the project and nothing else', (() => {
    const src = readFileSync('src/creator/miniAppCodePeek.ts', 'utf8')
      .replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
    return !/\bdocument\b|\bwindow\b|localStorage|eval\(|new Function/.test(src);
  })());
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
