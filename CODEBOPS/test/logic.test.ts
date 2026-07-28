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
import type {
  AgentDefinition, AgentToolDefinition, AgentMemoryDefinition, AgentObservation,
  AgentRuleDefinition, AgentCondition,
} from '../src/agents/types';
import { runAgent } from '../src/agents/engine';
import type { AgentWorld } from '../src/agents/engine';
// Aliased: `evaluateCondition` is also exported by the App Lab runtime,
// and esbuild silently let the second import win — which is how this
// file's checks quietly started calling the wrong function.
import { evaluateCondition as evalAgentCondition, shadowedRules } from '../src/agents/rules';
import {
  initialMemory, remember, forget, count, carryOver,
} from '../src/agents/memory';
import {
  DEFAULT_LIMITS, BEGINNER_LIMITS, withDefaults, SAFE_STOP_PHRASE, isSuccessfulStop,
} from '../src/agents/limits';
import {
  assessConfidence, weakest, actionsFor, CONFIDENCE_PHRASE, CONFIDENCE_LABEL,
} from '../src/agents/confidence';
import {
  classify, inspectExamples, addExample, correctExample, describeProblem,
} from '../src/agents/examples';
import type { ExampleSet } from '../src/agents/examples';
import { isSuccessfulOutcome } from '../src/agents/approval';
import { EDGE_CASES, edgeCase, applyPatches, pickEdgeCase, appliesTo } from '../src/agents/edgeCases';
import {
  evaluateSolution, compareSolutions, TRAIT_PHRASE, TRAIT_STRENGTH, TRADEOFF_CARDS,
} from '../src/agents/evaluate';
import { toLensCard, toTrailRows } from '../src/agents/trace';
import { WORLDS, trailWorlds } from '../src/data/worlds';
import { LEARNING_LAYERS, layerOfStage } from '../src/data/curriculum/layers';
import {
  AGENT_CONCEPTS, AGENT_PROGRESSION, agentProgressionFor, agentConceptsAvailableBy,
} from '../src/data/curriculum/agentProgression';
import { TRANSFER_CHALLENGES, transferFor } from '../src/data/curriculum/transfer';
import { validateAlignment, stagesWithoutTransfer } from '../src/data/curriculum/validate';
import { assertLevelValid } from '../src/data/schemas/level';
import { levelHints, benchHints } from '../src/gameplay/hints';
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
import { jamBugIndex } from '../src/gameplay/gearworks/jamMachine';
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
import { APPROVED_ASSETS, isApprovedAsset, APP_LAB_THEMES } from '../src/data/app-lab/approvedAssets';
import { APPROVED_COMPONENTS, approvedComponent } from '../src/data/app-lab/approvedComponents';
import { APPROVED_SOUNDS, PREPARED_PHRASES } from '../src/data/app-lab/approvedSounds';
import { SCENE_LAYOUTS, sceneLayout, layoutHasSlot } from '../src/data/app-lab/sceneLayouts';
import { tokensInGroup } from '../src/data/app-lab/preparedTitleTokens';
// ---- App Lab Phases 11-12 ----
import { thumbnailFor, thumbnailSummary } from '../src/creator/miniAppThumbnail';
import {
  factsFor, evidenceForCreation, parentSentenceFor, offScreenIdeaFor,
} from '../src/creator/miniAppEvidence';
import { isStageId } from '../src/data/curriculum/stages';
import type { TriggerCause } from '../src/creator/miniAppRuntime';
import type { AgentMission, MissionRule } from '../src/agents/mission';
import {
  newMission, toAgent, limitsFor, missionGaps, GAP_PHRASE, parseMission,
} from '../src/agents/mission';
import {
  MISSION_GOALS, MISSION_TOOLS, BUILDER_STEPS, STEP_TITLE, STEP_ICON,
  missionGoal, toolsForGoal, whenCardsFor, doCardsFor, stepsFor,
} from '../src/data/agents/missionCatalog';
import { scenarioFor, SCENARIO_NAMES } from '../src/data/agents/scenarios';
import { GLITCH_BOPS, detectGlitchBops, headlineGlitch } from '../src/agents/glitchBops';
// Aliased: `evidenceForRun` is also exported by curriculum/record, and
// the two take different arguments. tsc catches it now; before test/ was
// typechecked, esbuild would have silently picked one.
import {
  evidenceForMission, evidenceForRun as evidenceForHelperRun, evidenceForEdgeCase,
  parentSentenceForMission, offScreenIdeaForMission,
} from '../src/agents/evidence';
// ---- App Lab Phase 13 ----
import {
  CREATOR_REWARDS, creatorReward, makerRecord, earnedRewards, newlyEarned,
  frameForApp, APP_FRAMES,
} from '../src/data/app-lab/creatorRewards';
import type { MakerRecord } from '../src/data/app-lab/creatorRewards';
import { isApprovedTheme } from '../src/data/app-lab/approvedAssets';
// ---- level select redesign ----
import { GEARWORKS_WORKSHOPS } from '../src/data/gearworks/world';
import { WORLD_META, WORLD_ORDER } from '../src/app/levelSelectScreen';
// ---- App Lab Phase 14 ----
import { TEST_SPEEDS, speedFactor, isTestSpeed } from '../src/ui/a11y';
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
import { evaluateCondition, UNTIL_ROUNDS_CAP } from '../src/creator/miniAppRuntime';
import { DROP_TARGET_REF } from '../src/creator/miniAppTypes';
// ---- App Lab Phases 9-10 ----
import { trailLines } from '../src/ui/app-lab/appDebugMode';
import {
  plainLanguageProject, plainLanguageScript, javaScriptProject, translatableCommandKinds,
} from '../src/creator/miniAppCodePeek';

import { readdirSync, readFileSync, existsSync } from 'node:fs';

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
  check('a REPEAT with nothing before it is an empty loop', expandPaint(P(['ppRepeatRow', 2])).emptyLoop);

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
  // Seven always-open skies, one per world, plus the ones a maker earns (§13).
  check('there are seven always-open themes, one per world',
    APP_LAB_THEMES.filter((t) => !t.unlockedBy).length === 7);
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
  const starterProblems: string[] = [];
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
  const ed = initialEditorState(tap);
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
          test: { kind: 'stateIs' as const, targetId: 'item-1', state: 'collected' as const },
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

// ============================================================
// App Lab Phase 11 — the App Library (thumbnails, copies)
// ============================================================
{
  const SEED11 = { id: 'p11', now: 1_700_000_000_000, themeId: 'sparkle-meadow' };
  const flower11 = MINI_APP_STARTERS.find((s) => s.id === 'blooming-flower')!.build(SEED11);
  const sorter11 = MINI_APP_STARTERS.find((s) => s.id === 'color-sorter')!.build(SEED11);

  check('a thumbnail is an inline SVG data URI — nothing is fetched',
    thumbnailFor(flower11).startsWith('data:image/svg+xml;charset=utf-8,'));
  check('a thumbnail is deterministic — the same project draws the same picture',
    thumbnailFor(flower11) === thumbnailFor(flower11));
  check('different apps draw different pictures',
    thumbnailFor(flower11) !== thumbnailFor(sorter11));
  check('every starter draws a thumbnail with at least one glyph in it',
    MINI_APP_STARTERS.every((s) => {
      const svg = decodeURIComponent(thumbnailFor(s.build(SEED11)).split(',')[1]);
      return svg.includes('<svg') && svg.includes('<text');
    }));
  check('a thumbnail never emits a raw angle bracket from a glyph', (() => {
    // Glyphs come from the approved list, but the escape must still hold.
    const svg = decodeURIComponent(thumbnailFor(flower11).split(',')[1]);
    const body = svg.replace(/<[^>]*>/g, '');
    return !body.includes('<') && !body.includes('>');
  })());
  check('the thumbnail caption counts things and jobs, never a score',
    /^\d+ things? · \d+ jobs?$/.test(thumbnailSummary(flower11)));
  check('a project with no scenes still draws something rather than throwing',
    thumbnailFor({ ...flower11, scenes: [] }).startsWith('data:image/svg+xml'));

  check('a copy is a new app, not a second name for the same one', (() => {
    const copy = duplicateProject(flower11, { ...SEED11, id: 'p11-copy' }, 2);
    return copy.id !== flower11.id && copy.scripts.length === flower11.scripts.length;
  })());
  check('the library is pure of the DOM in its data modules', (() => {
    const src = readFileSync('src/creator/miniAppThumbnail.ts', 'utf8')
      .replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
    return !/\bdocument\b|\bwindow\b|localStorage|eval\(|new Function/.test(src);
  })());
  check('the library screen never reaches the network', (() => {
    const src = readFileSync('src/app/appLibraryScreen.ts', 'utf8');
    return !/\bfetch\(|XMLHttpRequest|WebSocket|navigator\.share|https?:\/\//.test(src);
  })());
  check('renaming offers prepared words only — there is no text input anywhere', (() => {
    const src = readFileSync('src/app/appLibraryScreen.ts', 'utf8');
    return !/input|contenteditable|prompt\(/i.test(src);
  })());
  check('deleting is behind a hold, not a tap', (() => {
    const src = readFileSync('src/app/appLibraryScreen.ts', 'utf8');
    return src.includes('holdToDelete') && src.includes('1200');
  })());
}

// ============================================================
// App Lab Phase 12 — what a built app SHOWS
// ============================================================
{
  const SEED12 = { id: 'p12', now: 1_700_000_000_000, themeId: 'sparkle-meadow' };
  const flower12 = MINI_APP_STARTERS.find((s) => s.id === 'blooming-flower')!.build(SEED12);
  const sorter12 = MINI_APP_STARTERS.find((s) => s.id === 'color-sorter')!.build(SEED12);
  const music12 = MINI_APP_STARTERS.find((s) => s.id === 'four-beat-loop')!.build(SEED12);
  const helper12 = MINI_APP_STARTERS.find((s) => s.id === 'feed-the-pet')!.build(SEED12);
  const RAN = { ran: true, repairedAfterRunning: false };

  check('building an app records nothing — running it is the demonstration',
    evidenceForCreation(flower12, factsFor(flower12, { ran: false, repairedAfterRunning: false })).length === 0);
  check('running an app records evidence',
    evidenceForCreation(flower12, factsFor(flower12, RAN)).length > 0);

  check('every claim names a real requirement on a real stage',
    MINI_APP_STARTERS.every((s) => {
      const p = s.build(SEED12);
      return evidenceForCreation(p, factsFor(p, RAN)).every((e) => {
        if (!isStageId(e.stage)) return false;
        return stage(e.stage).evidenceRequirements.some((r) => r.id === e.requirement);
      });
    }));
  check('creation evidence is always transfer — the child chose the problem',
    evidenceForCreation(music12, factsFor(music12, RAN)).every((e) => e.phase === 'create'));
  check('creation evidence is filed against the app, not a level',
    evidenceForCreation(music12, factsFor(music12, RAN)).every((e) => e.levelId === `applab:${music12.id}`));

  check('a loop is only claimed when a loop is actually in the scripts', (() => {
    const withLoop = factsFor(music12, RAN);
    const stripped = factsFor({ ...music12, scripts: [] }, RAN);
    return withLoop.usedLoop && !stripped.usedLoop;
  })());
  check('an if-else in the child\'s own scripts is what claims two-way thinking',
    factsFor(sorter12, RAN).usedBranch
    && !factsFor({ ...sorter12, scripts: [] }, RAN).usedBranch);
  check('asking a grown-up first is claimed only by an app that really asks',
    factsFor(helper12, RAN).usedApproval && !factsFor(flower12, RAN).usedApproval);
  check('the kit\'s allow-list never counts as evidence on its own', (() => {
    // Tiny Game Maker ALLOWS counters; an app with none must not claim one.
    const bare = { ...sorter12, scripts: [] };
    return !factsFor(bare, RAN).usedVariable;
  })());
  check('debugging is claimed only after the child changed it and ran again', (() => {
    const no = factsFor(flower12, RAN);
    const yes = factsFor(flower12, { ran: true, repairedAfterRunning: true });
    return !evidenceForCreation(flower12, no).some((e) => e.requirement === 'dbg-change')
      && evidenceForCreation(flower12, yes).some((e) => e.requirement === 'dbg-change');
  })());
  check('running the same app twice never doubles a requirement', (() => {
    const list = evidenceForCreation(flower12, factsFor(flower12, RAN));
    const keys = list.map((e) => `${e.levelId}|${e.requirement}`);
    return new Set(keys).size === keys.length;
  })());

  check('every parent sentence names the app and reads as plain English',
    MINI_APP_STARTERS.every((s) => {
      const p = s.build(SEED12);
      const line = parentSentenceFor(p, factsFor(p, RAN));
      return line.startsWith('Your child built "') && line.endsWith('.')
        && !/undefined|null|\[object/.test(line);
    }));
  check('a parent sentence never prints a raw token id',
    !/[a-z]+-[a-z]+-[a-z]+/.test(parentSentenceFor(flower12, factsFor(flower12, RAN))));
  check('the off-screen idea is an action a grown-up can take, never a score',
    MINI_APP_STARTERS.every((s) => {
      const p = s.build(SEED12);
      const idea = offScreenIdeaFor(factsFor(p, RAN));
      return idea.length > 12 && !/%|score|rank|behind|ahead/i.test(idea);
    }));
  check('no creation note ever compares a child to anyone',
    MINI_APP_STARTERS.every((s) => {
      const p = s.build(SEED12);
      return evidenceForCreation(p, factsFor(p, RAN))
        .every((e) => !/%|faster|slower|better|worse|average|than other/i.test(e.note));
    }));
  check('evidence is pure — it reads the project and nothing else', (() => {
    const src = readFileSync('src/creator/miniAppEvidence.ts', 'utf8')
      .replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
    return !/\bdocument\b|\bwindow\b|localStorage|eval\(|new Function|Date\.now|Math\.random/.test(src);
  })());
}

// ============================================================
// App Lab Phase 13 — what a maker collects
// ============================================================
{
  const none: MakerRecord = {
    appsSaved: 0, kitsBuilt: [], requirementsShown: [], appsRun: 0,
  };
  const rec = (over: Partial<MakerRecord>): MakerRecord => ({ ...none, ...over });

  check('a brand-new maker has collected nothing — and is told nothing is missing',
    earnedRewards(none).length === 0);
  check('running one app earns the Maker badge',
    earnedRewards(rec({ appsRun: 1, appsSaved: 1 })).some((r) => r.id === 'maker'));
  check('rewards are earned by what the child SHOWED, not what they saved', (() => {
    // Fifty saved apps that were never run earn nothing but the frame,
    // which is explicitly about having a shelf.
    const hoarder = earnedRewards(rec({ appsSaved: 50 })).map((r) => r.id);
    return !hoarder.includes('maker') && !hoarder.includes('loop-weaver');
  })());
  check('every reward is reachable from some record a child could really have',
    CREATOR_REWARDS.every((r) => r.earned(rec({
      appsSaved: 9, appsRun: 9,
      kitsBuilt: APP_KITS.map((k) => k.type),
      requirementsShown: [
        'seq-order', 'evt-connect', 'loop-replace', 'cond-check', 'ifelse-two',
        'var-update', 'state-identify', 'msg-send', 'par-coordinate', 'fn-reuse',
        'dec-split', 'dbg-change', 'agent-approval',
      ],
    }))));
  check('reward ids are unique', (() => {
    const ids = CREATOR_REWARDS.map((r) => r.id);
    return new Set(ids).size === ids.length;
  })());
  check('no reward name or line ever ranks, compares, or counts down',
    CREATOR_REWARDS.every((r) =>
      !/%|rank|level up|streak|faster|better than|only \d|\d+ of \d+|left to|missing/i
        .test(`${r.name} ${r.childLine} ${r.invitation}`)));
  check('an unearned reward reads as an invitation, not a shortfall',
    CREATOR_REWARDS.every((r) => r.invitation.length > 10 && !/must|need to|have not|failed/i.test(r.invitation)));
  check('Mixy cheers the fixing rewards; Zip cheers the making ones', (() => {
    const repairer = CREATOR_REWARDS.find((r) => r.id === 'repairer')!;
    const maker = CREATOR_REWARDS.find((r) => r.id === 'maker')!;
    return repairer.cheeredBy === 'mixy' && maker.cheeredBy === 'zip';
  })());

  check('rewards are derived, so the same record always earns the same set', (() => {
    const r = rec({ appsRun: 3, appsSaved: 3, requirementsShown: ['loop-replace'] });
    return earnedRewards(r).map((x) => x.id).join() === earnedRewards(r).map((x) => x.id).join();
  })());
  check('newlyEarned reports only what is new', (() => {
    const before = rec({ appsRun: 1, appsSaved: 1 });
    const after = rec({ appsRun: 1, appsSaved: 1, requirementsShown: ['loop-replace'] });
    const fresh = newlyEarned(before, after).map((r) => r.id);
    return fresh.includes('loop-weaver') && !fresh.includes('maker');
  })());
  check('a record going backwards announces a loss to nobody',
    newlyEarned(rec({ appsRun: 5, appsSaved: 5 }), none).length === 0);

  check('the maker record only counts evidence from the child\'s own apps', (() => {
    const log = [
      { stage: 'loops' as const, requirement: 'loop-replace', phase: 'build' as const, levelId: 'gw-lift-1', note: '' },
      { stage: 'loops' as const, requirement: 'loop-replace', phase: 'create' as const, levelId: 'applab:a1', note: '' },
    ];
    const r = makerRecord(log, [{ type: 'tap-react' as const }]);
    return r.requirementsShown.length === 1 && r.appsRun === 1;
  })());
  check('every kit built is counted once, however many apps are in it', (() => {
    const r = makerRecord([], [
      { type: 'tap-react' as const }, { type: 'tap-react' as const }, { type: 'music' as const },
    ]);
    return r.kitsBuilt.length === 2 && r.appsSaved === 3;
  })());

  check('every earned sky names a reward that really exists',
    APP_LAB_THEMES.every((t) => !t.unlockedBy || creatorReward(t.unlockedBy) !== null));
  check('the seven world skies are always open, and always will be',
    ['sparkle-meadow', 'bubble-bay', 'pattern-forest', 'robot-town',
      'gearworks-garage', 'agent-academy', 'imagination-island']
      .every((id) => APP_LAB_THEMES.find((t) => t.id === id)?.unlockedBy === undefined));
  check('an earned sky is approved from the start, so a saved app never breaks',
    APP_LAB_THEMES.filter((t) => t.unlockedBy).every((t) => isApprovedTheme(t.id)));
  check('a project using an earned sky still validates after a progress reset', (() => {
    const p = MINI_APP_STARTERS[0].build({ id: 'pth', now: 1, themeId: 'starlight' });
    return validateMiniAppProject(p).valid;
  })());

  check('an app\'s frame comes from that app\'s own evidence', (() => {
    const log = [
      { stage: 'if-else' as const, requirement: 'ifelse-two', phase: 'create' as const, levelId: 'applab:a1', note: '' },
    ];
    return frameForApp(log, 'a1')?.frame === 'twoway' && frameForApp(log, 'a2') === null;
  })());
  check('a frame label describes the app, never rates it',
    APP_FRAMES.every((f) => !/best|top|great|good|winner|\d/i.test(f.label)));
  check('every frame names a requirement the creation module can actually claim', (() => {
    const claimable = new Set(
      MINI_APP_STARTERS.flatMap((s) => {
        const p = s.build({ id: 'pf', now: 1, themeId: 'sparkle-meadow' });
        return evidenceForCreation(p, factsFor(p, { ran: true, repairedAfterRunning: true }))
          .map((e) => e.requirement);
      }),
    );
    // Not every frame must be reachable from a STARTER, but each must name
    // a requirement that exists on a real stage.
    return APP_FRAMES.every((f) => CURRICULUM_STAGES.some(
      (s) => s.evidenceRequirements.some((r) => r.id === f.requirement),
    )) && claimable.size > 0;
  })());

  check('the rewards module is pure — no DOM, no storage, no clock', (() => {
    const src = readFileSync('src/data/app-lab/creatorRewards.ts', 'utf8')
      .replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
    return !/\bdocument\b|\bwindow\b|localStorage|eval\(|new Function|Date\.now|Math\.random/.test(src);
  })());
  check('the celebration can always be dismissed and never blocks', (() => {
    const src = readFileSync('src/ui/app-lab/creatorCelebration.ts', 'utf8');
    return src.includes('scrim.remove()') && !/setInterval|requestAnimationFrame/.test(src);
  })());
}

// ============================================================
// App Lab Phase 14 — getting there for everybody
// ============================================================
{
  const css = readFileSync('src/styles/main.css', 'utf8');
  const a11y = readFileSync('src/ui/a11y.ts', 'utf8');

  check('there are three watching speeds and one of them is normal',
    TEST_SPEEDS.length === 3 && TEST_SPEEDS.some((s) => s.id === 'normal'));
  check('gentle is slower than normal, and quick is faster',
    speedFactor('gentle') > speedFactor('normal') && speedFactor('quick') < speedFactor('normal'));
  check('an unknown or missing speed falls back to normal, never to zero',
    speedFactor(undefined) === 1 && speedFactor('nonsense' as never) === 1);
  check('no watching speed is fast enough to skip a step',
    TEST_SPEEDS.every((s) => s.factor >= 0.5));
  check('speed labels are child words, not numbers',
    TEST_SPEEDS.every((s) => !/\d|x$|ms|second/i.test(s.label)));
  check('isTestSpeed only accepts a real speed',
    isTestSpeed('gentle') && !isTestSpeed('turbo') && !isTestSpeed(undefined));

  check('speech is output only — nothing listens, records, or uploads',
    !/getUserMedia|MediaRecorder|SpeechRecognition|webkitSpeechRecognition|fetch\(|XMLHttpRequest/
      .test(a11y));
  check('speech degrades to nothing when the browser has none',
    a11y.includes('if (!s) return;') && a11y.includes('speechAvailable'));
  check('reading aloud is off unless somebody turned it on',
    a11y.includes('if (!enabled') );
  check('the live region replaces its message rather than queueing',
    a11y.includes("region.textContent = ''"));

  check('the accessibility settings are applied on every screen change', (() => {
    const app = readFileSync('src/app/app.ts', 'utf8');
    // clearHost runs before every screen is built, so a menu gets the
    // same calm mode / contrast / handedness a play screen does.
    const at = app.indexOf('private clearHost');
    return at > 0 && app.slice(at, at + 700).includes('applyAccessibility');
  })());
  check('every accessibility mode has a switch a grown-up can find', (() => {
    const dlg = readFileSync('src/ui/dialogs.ts', 'utf8');
    return ['calmMode', 'highContrast', 'leftHanded', 'captions', 'spokenInstructions']
      .every((k) => dlg.includes(`'${k}'`));
  })());

  check('there is a screen-reader-only class that really hides on screen',
    /\.sr-only\s*\{[^}]*clip-path:\s*inset\(50%\)/.test(css));
  check('App Lab honours calm mode and the OS reduce-motion setting alike',
    css.includes('.calm-mode .al-collect') && css.includes('prefers-reduced-motion'));
  check('high contrast reaches the App Lab, not only the play screen',
    css.includes('body.high-contrast .al-station') && css.includes('body.high-contrast .lib-card'));
  check('"not yet" is never carried by opacity alone in high contrast',
    /body\.high-contrast[^{]*\.waiting[^{]*\{[^}]*opacity:\s*1/.test(css));
  check('the left-handed layout reaches the App Lab too',
    css.includes('body.left-handed .cr-toolbar') && css.includes('body.left-handed .lib-actions'));
  check('every App Lab tap target is at least 44px', (() => {
    // The rule the audit enforces: any App Lab button class that sets its
    // own size must set a min of 44 (or inherit one that does).
    const classes = ['.lib-btn', '.speed-btn', '.al-collect'];
    return classes.every((c) => {
      const at = css.indexOf(`${c} {`);
      if (at < 0) return false;
      const block = css.slice(at, css.indexOf('}', at));
      return /min-height:\s*44px/.test(block) || /min-\w+:\s*(4[4-9]|[5-9]\d)px/.test(block);
    });
  })());

  check('watching speed changes only how long a child looks, never the result', (() => {
    // The run is computed before any playback, so speed cannot reach it.
    const pm = readFileSync('src/ui/app-lab/appPlayMode.ts', 'utf8');
    const runtime = readFileSync('src/creator/miniAppRuntime.ts', 'utf8');
    return pm.includes('speedFactor(this.options.speed)')
      && !/speedFactor|TestSpeed|captions/.test(runtime);
  })());
  check('a sound always has words available for it',
    APPROVED_SOUNDS.every((s) => typeof s.label === 'string' && s.label.length > 0));
}

// ============================================================
// App Lab Phase 15 — the boundaries, swept across every file
// ============================================================
{
  const appLabFiles = [
    ...readdirSync('src/creator').map((f) => `src/creator/${f}`),
    ...readdirSync('src/data/app-lab').map((f) => `src/data/app-lab/${f}`),
    ...readdirSync('src/ui/app-lab').map((f) => `src/ui/app-lab/${f}`),
    'src/app/appLabScreen.ts', 'src/app/appCreatorScreen.ts', 'src/app/appLibraryScreen.ts',
    'src/storage/miniAppStore.ts', 'src/storage/miniAppDraft.ts', 'src/ui/a11y.ts',
  ].filter((f) => f.endsWith('.ts'));
  const sourceOf = new Map(appLabFiles.map((f) => [f, readFileSync(f, 'utf8')]));

  const offenders = (re: RegExp): string[] =>
    [...sourceOf].filter(([, src]) => re.test(src)).map(([f]) => f);

  check('nothing in the App Lab runs a string as code',
    offenders(/\beval\(|new Function\(|document\.write|setTimeout\(\s*['"`]/).length === 0);
  check('nothing in the App Lab reaches the network',
    offenders(/\bfetch\(|XMLHttpRequest|WebSocket|EventSource|navigator\.sendBeacon|navigator\.share/)
      .length === 0);
  check('nothing in the App Lab names an external address',
    offenders(/https?:\/\/(?!www\.w3\.org)/).length === 0);
  check('nothing in the App Lab opens a camera, a microphone or a location',
    offenders(/getUserMedia|MediaRecorder|SpeechRecognition|geolocation|<input[^>]*type=["']file/)
      .length === 0);
  check('nothing in the App Lab inserts a child\'s data as markup', (() => {
    // innerHTML is used to CLEAR and nothing else; anything assigned to it
    // would be an injection surface for a value out of a project. Capture
    // the right-hand side and check it rather than using a lookahead —
    // a lookahead after \s* just backtracks around itself.
    const bad: string[] = [];
    for (const [file, src] of sourceOf) {
      for (const m of src.matchAll(/\.innerHTML\s*=\s*([^;]+);/g)) {
        if (!/^(''|""|``)$/.test(m[1].trim())) bad.push(`${file}: ${m[1].trim()}`);
      }
      if (/insertAdjacentHTML|\.outerHTML\s*=/.test(src)) bad.push(`${file}: outerHTML`);
    }
    return bad.length === 0;
  })());
  check('the App Lab has no text field anywhere',
    offenders(/createElement\(['"]input['"]\)|contentEditable|window\.prompt\(/).length === 0);

  check('the lint config bans dynamic code across the whole codebase', (() => {
    const cfg = readFileSync('eslint.config.js', 'utf8');
    return ['no-eval', 'no-implied-eval', 'no-new-func', 'no-script-url']
      .every((r) => cfg.includes(`'${r}': 'error'`));
  })());

  check('every creator module is pure of the DOM, storage, clock and randomness',
    readdirSync('src/creator').filter((f) => f.endsWith('.ts')).every((f) => {
      const src = readFileSync(`src/creator/${f}`, 'utf8')
        .replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
      return !/\bdocument\b|\bwindow\b|localStorage|indexedDB|eval\(|new Function|Date\.now\(|Math\.random\(/
        .test(src);
    }));

  check('every App Lab document the README points at exists', (() => {
    const readme = readFileSync('docs/app-lab/README.md', 'utf8');
    const linked = [...readme.matchAll(/\]\(([a-z-]+\.md)\)/g)].map((m) => m[1]);
    return linked.length >= 7 && linked.every((f) => existsSync(`docs/app-lab/${f}`));
  })());
}

// ============================================================
// Vendored code — the character rig
// ============================================================
{
  // src/vendor holds third-party code copied in verbatim, so ESLint skips
  // it and no reviewer reads it line by line on an update. That is exactly
  // why the safety boundary has to be a test: an update that started
  // executing strings or calling home would otherwise land unnoticed.
  const vendorFiles = [
    ...readdirSync('src/vendor/codebops-rig').map((f) => `src/vendor/codebops-rig/${f}`),
    ...readdirSync('src/vendor/codebops-rig/characters')
      .map((f) => `src/vendor/codebops-rig/characters/${f}`),
  ].filter((f) => f.endsWith('.js'));
  const vendor = new Map(vendorFiles.map((f) => [f, readFileSync(f, 'utf8')]));

  check('the rig ships as more than one file', vendor.size >= 3);

  check('the rig never runs a string as code', [...vendor]
    .filter(([, s]) => /\beval\(|new Function\(|document\.write|setTimeout\(\s*['"`]/.test(s))
    .length === 0);

  check('the rig never reaches the network', [...vendor]
    .filter(([, s]) => /\bfetch\(|XMLHttpRequest|WebSocket|EventSource|sendBeacon/.test(s))
    .length === 0);

  // The one innerHTML in the rig writes bundled artwork into an offscreen
  // SVG probe to measure a layer's bounding box. Nothing a child typed can
  // reach it — but it is the sort of line that must stay accounted for, so
  // this pins it to that single call site.
  check('the only markup the rig inserts is its own bundled art', (() => {
    const sites: string[] = [];
    for (const [file, src] of vendor) {
      for (const m of src.matchAll(/\.innerHTML\s*=\s*([^;]+);/g)) sites.push(`${file}: ${m[1].trim()}`);
      if (/insertAdjacentHTML|\.outerHTML\s*=/.test(src)) sites.push(`${file}: outerHTML`);
    }
    return sites.length === 1
      && sites[0] === 'src/vendor/codebops-rig/codebops-rig.js: character.defs + layer.svg';
  })());

  check('the rig names no external address',
    [...vendor].filter(([, s]) => /https?:\/\/(?!www\.w3\.org)/.test(s)).length === 0);

  // A wrapper that edited the vendored files would turn every future
  // update into a merge. The app talks to the rig through one module.
  // The adapter takes the Three namespace as an argument, and handing it
  // the real one costs 168KB of tree-shaking, so spriteCharacter passes a
  // hand-built object with only the symbols the adapter touches. Nothing
  // in the type system connects those two facts: a rig update that starts
  // using THREE.Sprite would throw at runtime, on a screen, in front of a
  // child. This is the check that makes that impossible.
  // A browser allows about sixteen live WebGL contexts and this app builds
  // a stage per level. renderer.dispose() frees what Three uploaded but
  // leaves the context attached to the canvas, so without an explicit
  // release the console starts announcing "Too many active WebGL
  // contexts" and a later level opens blank.
  // ---- the camera ----
  // The board must read square-on. A yaw of any size turns every row of
  // tiles a few degrees and the whole board looks like a photograph taken
  // crooked; it was 0.02 for a long time and nobody could name why the
  // grids leaned.
  check('the world camera has no yaw — the board reads square-on', (() => {
    const src = readFileSync('src/engine/stage.ts', 'utf8');
    const m = /VIEW_DIR = new THREE\.Vector3\(([^,]+),/.exec(src);
    return m !== null && Number(m[1].trim()) === 0;
  })());

  // The chrome is not symmetric — the deck is several times the height of
  // the top bar — so fitting the puzzle to a box centred on the CANVAS
  // wasted a band of sky and pressed the board into the deck.
  check('the puzzle is framed into the free area, not the whole canvas', (() => {
    const src = readFileSync('src/engine/stage.ts', 'utf8');
    return /this\.centerY = \(bottom - top\) \/ h;/.test(src)
      && /Math\.abs\(p\.y - this\.centerY\) \/ this\.fitY/.test(src);
  })());

  // ---- the play screen's chrome ----
  // On a short screen the goal card becomes a chip under the top bar, and
  // the GOAL flag hangs above the chip's own edge. Every compact rule used
  // to pick its own offset by hand — 44, 48, 50px — all of them less than
  // the 56px back button, so the flag sat on the button on every landscape
  // phone. One variable, derived from the button, and no rule may go back
  // to a hand-picked number.
  check('nothing under the top bar clears it by a hand-picked number', (() => {
    const css = readFileSync('src/styles/main.css', 'utf8');
    // Derived from the button's own height...
    const derived = /--under-bar:\s*calc\(var\(--tap-min\)\s*\+\s*\d+px\)/
      .test(readFileSync('src/styles/tokens.css', 'utf8'));
    // ...used by every compact rule...
    const uses = (css.match(/var\(--under-bar\)/g) ?? []).length;
    // ...and no .goal-card rule clears the bar with a number of its own.
    // Other panels legitimately pick their own offsets; this is only about
    // the card that shares the corner with the back button.
    const handPicked: string[] = [];
    for (const m of css.matchAll(/\.goal-card\s*\{([^}]*)\}/g)) {
      const top = /top:\s*calc\(max\([^;]*?\)\s*\+\s*([^;)]+)\)/.exec(m[1]);
      if (top && !top[1].includes('--under-bar')) handPicked.push(top[1].trim());
    }
    if (handPicked.length > 0) console.log('   hand-picked offsets: ' + handPicked.join(', '));
    return derived && uses >= 3 && handPicked.length === 0;
  })());

  // The deck is the floor of the screen; an inset down each side made it
  // look dropped on rather than built in. Safe-area insets stay.
  check('the command deck reaches the sides of the screen', (() => {
    const css = readFileSync('src/styles/main.css', 'utf8');
    const at = css.indexOf('.bottom-deck {');
    const block = css.slice(at, css.indexOf('}', at));
    return /left:\s*var\(--sal\)/.test(block) && /right:\s*var\(--sar\)/.test(block);
  })());

  // The deck was a full-width navy slab holding eight small slots, so most
  // of the bottom of the screen was empty panel. It shrink-wraps its slots
  // and centres now, which is only true while it is allowed to shrink AND
  // is not stretched by the flex line it sits on.
  check('the deck shrink-wraps its slots rather than filling the screen', (() => {
    const css = readFileSync('src/styles/main.css', 'utf8');
    const at = css.indexOf('.deck-panel {');
    const block = css.slice(at, css.indexOf('}', at));
    const deck = css.slice(css.indexOf('.bottom-deck {'), css.indexOf('}', css.indexOf('.bottom-deck {')));
    return /flex:\s*0 1 auto/.test(block) && /justify-content:\s*center/.test(deck);
  })());

  // The one button a child presses most should be the biggest thing they
  // can hit, and square — a wide pill reads as a label, not a trigger.
  check('BOP is a large square', (() => {
    const css = readFileSync('src/styles/main.css', 'utf8');
    const at = css.indexOf('.bop-btn {');
    const block = css.slice(at, css.indexOf('}', at));
    const h = /height:\s*clamp\((\d+)px/.exec(block);
    return /aspect-ratio:\s*1/.test(block) && h !== null && Number(h[1]) >= 100;
  })());

  // The pill was the widest element on the level screen and carried a name
  // the child had just tapped. It went; the name must not go with it, or
  // a screen reader loses the only statement of which level is open.
  check('the level name reaches assistive tech without a title pill', (() => {
    const bar = readFileSync('src/ui/topBar.ts', 'utf8');
    const css = readFileSync('src/styles/main.css', 'utf8');
    return /this\.root\.setAttribute\('aria-label', title\)/.test(bar)
      && !/'title-pill'/.test(bar) && !/\.title-pill\b/.test(css);
  })());

  // The fit used to break out of its loop the moment the frame fitted, so
  // the arbitrary starting distance was a ceiling: a board that already
  // fitted at 11 units stayed there and left the free area half empty.
  check('the camera fit converges in both directions', (() => {
    const src = readFileSync('src/engine/stage.ts', 'utf8');
    const at = src.indexOf('private applyFrame()');
    const body = src.slice(at, src.indexOf('\n  }', at));
    // A bare `if (need <= 1) break` is the bug — it can only dolly out.
    return !/if \(need <= 1[^)]*\) break/.test(body)
      && /need > 0\.98 && need <= 1/.test(body)
      && /dist = Math\.min\(60, Math\.max\(4, dist \* need\)\)/.test(body);
  })());

  // The deck is opaque and centred, and so is the board. Weighting its
  // inset by how much of the width it spans hid the front row of tiles
  // behind it on a landscape phone — the row a child is about to walk on.
  check('a centred bottom panel is reserved in full, side panels are not', (() => {
    const src = readFileSync('src/engine/stage.ts', 'utf8');
    const at = src.indexOf('private measureChrome()');
    const body = src.slice(at, src.indexOf('\n  private ', at + 10));
    return /edge === 'bottom' && r\.left <= mid && r\.right >= mid/.test(body)
      && /const cover = underBoard \? 1/.test(body)
      // Naming a layout wrapper instead of the panel that paints makes the
      // inset claim the whole width and over-reserve by ~60px.
      && /bottom: \['\.deck-panel'/.test(src) && !/'\.bottom-deck'/.test(src);
  })());

  // ---- hints ----
  // The ? button must never be a dead end: a child taps it because they
  // are stuck, and an empty card is worse than no button at all.
  check('every level offers a hint on an empty deck', (() => {
    const bad: string[] = [];
    for (const lv of ALL_LEVELS) {
      const hints = levelHints(lv, []);
      if (hints.length === 0) bad.push(lv.id);
      else if (hints.some((h) => !h.text.trim() || !h.title.trim())) bad.push(`${lv.id} (blank)`);
    }
    if (bad.length > 0) console.log('   no hint: ' + bad.slice(0, 6).join(', '));
    return bad.length === 0;
  })());

  // Two tiers: a nudge to look somewhere, then one concrete tile. Never a
  // third that finishes the level.
  check('a hint never runs past two tiers', (() => {
    const over = ALL_LEVELS.filter((lv) => levelHints(lv, []).length > 2);
    if (over.length > 0) console.log('   over two tiers: ' + over.map((l) => l.id).slice(0, 5).join(', '));
    return over.length === 0;
  })());

  // The step tier is walked over the real grid, so it can only ever name a
  // move that is legal from where the child's plan actually leaves Zip. A
  // hint that says "try MOVE RIGHT" into a tree teaches distrust.
  check('the step a hint suggests is always a legal move', (() => {
    const bad: string[] = [];
    for (const lv of ALL_LEVELS) {
      const step = levelHints(lv, []).find((h) => h.title === 'Try this next');
      if (!step) continue;
      const m = /the next tile is ([A-Z ]+)\./.exec(step.text);
      if (!m) continue;
      const dir = m[1].trim();
      const delta: Record<string, { dc: number; dr: number }> = {
        'MOVE RIGHT': { dc: 1, dr: 0 }, 'MOVE LEFT': { dc: -1, dr: 0 },
        'MOVE UP': { dc: 0, dr: -1 }, 'MOVE DOWN': { dc: 0, dr: 1 },
      };
      const d = delta[dir];
      if (!d) { bad.push(`${lv.id} (unknown tile ${dir})`); continue; }
      const to = { col: lv.start.col + d.dc, row: lv.start.row + d.dr };
      const wall = [...lv.blocked, ...(lv.zipBlocked ?? [])]
        .some((c) => c.col === to.col && c.row === to.row);
      const off = to.col < 0 || to.row < 0 || to.col >= lv.cols || to.row >= lv.rows;
      if (wall || off) bad.push(`${lv.id} -> ${dir}`);
    }
    if (bad.length > 0) console.log('   illegal step: ' + bad.slice(0, 6).join(', '));
    return bad.length === 0;
  })());

  // The hint has to describe the plan the child actually built, which is
  // the whole reason it is worked out rather than written down.
  check('a hint changes as the child builds their plan', (() => {
    const lv = SPARKLE_MEADOW_1;
    const empty = levelHints(lv, [])[0].text;
    const oneStep = levelHints(lv, [{ cmd: 'moveRight' }] as ProgramStep[])[0].text;
    const onIt = levelHints(lv, [{ cmd: 'moveRight' }, { cmd: 'moveRight' }] as ProgramStep[])[0].text;
    const carrying = levelHints(lv,
      [{ cmd: 'moveRight' }, { cmd: 'moveRight' }, { cmd: 'grab' }] as ProgramStep[])[0].text;
    return new Set([empty, oneStep, onIt, carrying]).size === 4
      && /GRAB/.test(onIt) && /star pad/.test(carrying);
  })());

  // Once Zip is holding the berry the thing to walk toward is the pad. The
  // step tier used to name the berry he was already carrying.
  check('a carried item is never named as the place to walk to', (() => {
    const carrying = levelHints(SPARKLE_MEADOW_1,
      [{ cmd: 'moveRight' }, { cmd: 'moveRight' }, { cmd: 'grab' }] as ProgramStep[]);
    const step = carrying.find((h) => h.title === 'Try this next');
    return step !== undefined && /star pad is/.test(step.text) && !/strawberry is/.test(step.text);
  })());

  // A hand-written nudge replaces only the QUESTION. The concrete step
  // stays derived, so an override cannot point at a square that has moved.
  check('an authored hint overrides the nudge but not the step', (() => {
    const withHint = { ...SPARKLE_MEADOW_1, hint: 'Look at the trees!' };
    const hints = levelHints(withHint, []);
    return hints[0].text === 'Look at the trees!'
      && hints.length === 2 && hints[1].title === 'Try this next';
  })());

  // Bench levels lead with the goal. Their coachHint was written for the
  // Think Trail — which a child only sees after a run has gone wrong — and
  // several name the tiles outright, so it belongs behind "Show me more".
  check('a bench hint opens with the goal, not with the answer', (() => {
    const h = benchHints({ goalText: 'Ring the bell!', coachHint: 'Try: START then STOP.' });
    return h.length === 2 && h[0].text === 'Ring the bell!'
      && h[1].title === 'Try this next' && h[1].text === 'Try: START then STOP.';
  })());

  // One button, one place, every play screen. Sixteen Gearworks screens
  // plus the grid screen: a new screen that forgets it leaves a child on
  // that level with no way to ask for help.
  check('every play screen wires the ? button', (() => {
    const screens = readdirSync('src/app').filter((f) => /Screen\.ts$/.test(f));
    const play = screens.filter((f) => readFileSync(`src/app/${f}`, 'utf8').includes('new TopBar('));
    const missing = play.filter((f) => !readFileSync(`src/app/${f}`, 'utf8').includes('onHint:'));
    if (missing.length > 0) console.log('   no ? button: ' + missing.join(', '));
    // The Trophy Room is a display case, not a level — nothing to hint at.
    return play.length >= 17 && missing.every((f) => f === 'gearworksTrophyScreen.ts');
  })());

  // ---- command system (Phase 6) ----
  // A disabled button that swallows a tap teaches a child that the button
  // is broken. BOP must say what it is waiting for, and point at the
  // empty slots, which is where the answer is.
  check('BOP explains itself instead of doing nothing', (() => {
    const deck = readFileSync('src/ui/programDeck.ts', 'utf8');
    const css = readFileSync('src/styles/main.css', 'utf8');
    return /onNeedProgram\?\.\(\)/.test(deck)
      && /needs-plan/.test(deck)
      && /\.deck-panel\.needs-plan .slot:not\(\.filled\)/.test(css);
  })());

  // One tile is nothing to lose. Four is a plan a child built, and losing
  // it to a mis-tap beside BOP is the sort of thing that ends a session.
  check('Clear asks before taking a real plan away', (() => {
    const deck = readFileSync('src/ui/programDeck.ts', 'utf8');
    return /this\.program\.length > 2/.test(deck) && /confirming/.test(deck);
  })());

  // Dark navy dashes at 35% on a dark navy panel: the row read as texture
  // rather than as places waiting for a tile.
  check('an empty slot is visible enough to invite a tile', (() => {
    const css = readFileSync('src/styles/main.css', 'utf8');
    const at = css.indexOf('.slot {');
    const rule = css.slice(at, css.indexOf('}', at));
    const alpha = /border: 3px dashed rgba\(255, 255, 255, \.(\d+)\)/.exec(rule);
    return alpha !== null && Number(`0.${alpha[1]}`) >= 0.5;
  })());

  // The controls a child touches most had no declared floor at all — they
  // relied on padding arithmetic, which is what broke when a media query
  // resized them.
  check('the controls a child touches most declare a tap floor', (() => {
    const css = readFileSync('src/styles/main.css', 'utf8');
    const missing: string[] = [];
    for (const sel of ['.tile {', '.slot {', '.btn-play {', '.bop-btn {']) {
      const at = css.indexOf(sel);
      const rule = css.slice(at, css.indexOf('}', at));
      if (!/min-height: var\(--tap-(min|floor)\)/.test(rule)) missing.push(sel);
    }
    if (missing.length > 0) console.log('   no floor: ' + missing.join(', '));
    return missing.length === 0;
  })());

  // ---- Gearworks (Phase 8) ----
  // The gauge used to sit on the bench near the gear with nothing between
  // them, so a child watching the needle move had no reason to believe
  // the gear moved it. The chain has to be visible end to end.
  check('the machine chain reaches the gauge', (() => {
    const rig = readFileSync('src/rendering/gearworks/motorRig.ts', 'utf8');
    return /takeoff/.test(rig)
      // ...and the link has to MOVE. A link that does not is scenery.
      && /this\.takeoff\.rotation\.z \+= dt \* rate/.test(rig);
  })());

  // 0.44 was the top of a Sparkle Meadow tile, hard-coded — so in the
  // garage, where the floor is at 0.05, both bops' shadows hovered 39cm
  // in the air and they read as stickers pasted onto the room.
  check('a character shadow lands on whatever it is standing on', (() => {
    const src = readFileSync('src/rendering/spriteCharacter.ts', 'utf8');
    const at = src.indexOf('private syncShadow');
    // Strip comments first: the one explaining why 0.44 went would
    // otherwise fail the check that 0.44 is gone.
    const body = src.slice(at, src.indexOf('\n  }', at)).replace(/\/\/[^\n]*/g, '');
    return /this\.root\.position\.y \+ 0\.02/.test(body) && !/0\.44/.test(body);
  })());

  // ---- feedback (Phase 11) ----
  // Never as punishment: a wrong drop gets no buzz. A child who feels the
  // device flinch at a mistake learns to stop trying things.
  check('haptics reward, never punish', (() => {
    const h = readFileSync('src/audio/haptics.ts', 'utf8');
    const kinds = /export type Haptic = ([^;]+);/.exec(h);
    return kinds !== null
      && !/error|wrong|fail|invalid|bump/i.test(kinds[1])
      && /success/.test(kinds[1]);
  })());

  // A switch that does nothing is worse than no switch: a grown-up flips
  // it, nothing changes, and now they distrust the other settings too.
  // iOS has no Vibration API, so this is hidden on every iPad.
  check('the haptics setting hides itself where it cannot work', (() => {
    const d = readFileSync('src/ui/dialogs.ts', 'utf8');
    const h = readFileSync('src/audio/haptics.ts', 'utf8');
    return /only: hapticsAvailable\(\)/.test(d)
      && /export function hapticsAvailable/.test(h);
  })());

  // Silencing the game in a waiting room means all of it.
  check('haptics follow the sound switch', (() => {
    const app = readFileSync('src/app/app.ts', 'utf8');
    return /sharedHaptics\.enabled = this\.store\.settings\.sound/.test(app);
  })());

  // ---- accessibility (Phase 12) ----
  // High contrast flattens the moulded look but keeps the family colour,
  // because colour is one of the channels and removing it costs
  // information rather than adding it.
  check('the shared components answer every accessibility mode', (() => {
    const css = readFileSync('src/styles/components.css', 'utf8');
    return /body\.high-contrast \.cb-btn/.test(css)
      && /body\.calm-mode \.cb-btn\.cb-hint/.test(css)
      && /body\.left-handed \.gw-trail-wrap/.test(css)
      && /prefers-reduced-motion/.test(css);
  })());

  // ---- shared components (Phase 2) ----
  // Nine screens built their own back arrow, five their own BOP, four
  // their own Clear. A change to any of them had to be made nine, five or
  // four times and in practice was made once.
  check('the back arrow is built in one place', (() => {
    const files = readdirSync('src/app').filter((f) => f.endsWith('.ts'))
      .map((f) => `src/app/${f}`)
      .concat(readdirSync('src/ui').filter((f) => f.endsWith('.ts')).map((f) => `src/ui/${f}`));
    const rolled = files.filter((f) => /el\('button', 'circle-btn'[^)]*'←'/.test(readFileSync(f, 'utf8')));
    if (rolled.length > 0) console.log('   hand-rolled back buttons: ' + rolled.join(', '));
    return rolled.length === 0;
  })());

  // Every shared button sets type="button". A button with no type inside a
  // form is a submit button, which is a bug waiting for the first form.
  check('the shared button always declares its type', (() => {
    const src = readFileSync('src/ui/components/button.ts', 'utf8');
    return /b\.type = 'button'/.test(src);
  })());

  // Chrome icons must be drawn, not borrowed from the platform: emoji
  // render differently on every OS, so the same bar looks like a
  // different app on an iPad and an Android tablet.
  check('the top bar draws its own icons', (() => {
    const bar = readFileSync('src/ui/topBar.ts', 'utf8');
    return !/[\u{1F300}-\u{1FAFF}\u{2699}\u{2605}]/u.test(bar)
      && /ICON_STAR/.test(bar) && /backButton|settingsButton/.test(bar);
  })());

  // A permanent name label on both characters, on every level, forever.
  // A child who has met Zip does not need telling he is Zip.
  check('character names are shown on demand, not worn permanently', (() => {
    const sprite = readFileSync('src/rendering/spriteCharacter.ts', 'utf8');
    const css = readFileSync('src/styles/main.css', 'utf8');
    const screens = readdirSync('src/app').filter((f) => /^gearworks.*Screen\.ts$/.test(f));
    const stillLocal = screens.filter((f) => /private addNameChip/.test(readFileSync(`src/app/${f}`, 'utf8')));
    if (stillLocal.length > 0) console.log('   local copies left: ' + stillLocal.length);
    return stillLocal.length === 0
      && /setName\(name: string/.test(sprite)
      && /\.char-name-chip \{[^}]*opacity: 0/.test(css)
      && /\.char-name-chip\.on \{[^}]*opacity: 1/.test(css);
  })());

  // The Think Trail must look like something you can open. It used to be
  // an always-open panel holding prime corner space before it had
  // anything to say, and its collapse decision was taken once from
  // window.innerWidth and never revisited — wrong after any rotation.
  check('the Think Trail is a button that opens a panel', (() => {
    const src = readFileSync('src/ui/gearworks/statePanel.ts', 'utf8');
    return /gw-trail-open/.test(src)
      && /this\.panel\.hidden = !open/.test(src)
      // ...on code, not on the comment that explains why it went.
      && !/if \(window\.innerWidth/.test(src);
  })());

  // ---- responsive shell (Phase 3) ----
  // `vh` resolves against the LARGEST viewport, so a panel sized in vh
  // overflows while a mobile browser's toolbar is showing.
  check('viewport heights track the visible viewport', (() => {
    const css = readFileSync('src/styles/main.css', 'utf8');
    // Keyframe transforms may use vh — they move things, they do not size them.
    const layout = css.replace(/@keyframes[^{]*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g, '');
    const bad = (layout.match(/(?<![\w-])\d+(?:\.\d+)?vh\b/g) ?? []);
    if (bad.length > 0) console.log('   static vh left: ' + bad.slice(0, 6).join(', '));
    return bad.length === 0 && /dvh/.test(css);
  })());

  // Portrait is a supported fallback, so the manifest must not lock the
  // installed app to landscape — that makes the fallback unreachable.
  // The in-app rotate hint does the encouraging instead.
  check('the installed app allows both orientations', (() => {
    const m = JSON.parse(readFileSync('public/manifest.webmanifest', 'utf8'));
    const maskable = m.icons.some((i: { purpose?: string }) => /maskable/.test(i.purpose ?? ''));
    return m.orientation === 'any' && maskable && m.scope === './';
  })());

  // iOS reads none of the manifest. Without these the app opens inside
  // Safari chrome and the toolbar sits over the command deck.
  check('iOS is told the app is standalone', (() => {
    const html = readFileSync('index.html', 'utf8');
    return /apple-mobile-web-app-capable/.test(html)
      && /apple-mobile-web-app-status-bar-style/.test(html);
  })());

  // ---- pickers (Phase 5) ----
  // grayscale(.75) turned eight of fifteen worlds into identical grey
  // discs: a child could not tell the Jam Room from the Paint Studio, so
  // "not yet" read as "nothing here" rather than something to look
  // forward to. Dim it; do not erase it.
  check('a locked world keeps enough colour to stay itself', (() => {
    const css = readFileSync('src/styles/main.css', 'utf8');
    const at = css.indexOf('.sel2-med.locked .sel2-med-disc');
    const rule = css.slice(at, css.indexOf('}', at));
    const gray = /grayscale\(\s*\.?(\d*\.?\d+)\s*\)/.exec(rule);
    return !gray || Number(gray[1]) <= 0.4;
  })());

  // A row of same-size discs is a list, not a carousel. The spec asks for
  // the selected world to be substantially larger with its neighbours
  // partly visible, so the strip has a focus.
  check('the world strip has a focused world and reliable snapping', (() => {
    const css = readFileSync('src/styles/main.css', 'utf8');
    const at = css.indexOf('.sel2-med.on .sel2-med-disc');
    const rule = css.slice(at, css.indexOf('}', at));
    const scale = /scale\(([\d.]+)\)/.exec(rule);
    return scale !== null && Number(scale[1]) >= 1.25
      && /scroll-snap-type: x mandatory/.test(css)
      && /\.sel2-strip \{[^}]*mask-image/.test(css);
  })());

  // ---- design system ----
  // A token restated as a literal is the way a design system rots: both
  // render the same today, so nothing breaks until the brand colour moves
  // and only half the uses follow. 34 of these existed before Phase 1.
  check('no colour token is restated as a literal', (() => {
    const tokens = readFileSync('src/styles/tokens.css', 'utf8');
    const css = readFileSync('src/styles/main.css', 'utf8');
    const bad: string[] = [];
    for (const m of tokens.matchAll(/(--[\w-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)) {
      const [, name, hex] = m;
      // #fff / #000 are deliberately literal — see docs/design-system.md.
      if (/^#(ffffff|000000)$/i.test(hex)) continue;
      const uses = css.match(new RegExp(hex + '(?![0-9a-fA-F])', 'gi'));
      if (uses) bad.push(`${hex} (${name}) x${uses.length}`);
    }
    if (bad.length > 0) console.log('   restated: ' + bad.slice(0, 8).join(', '));
    return bad.length === 0;
  })());

  // The scale exists so that layers can be reasoned about. It also fixed a
  // real bug: the rotate hint sat above the modal scrim and its button
  // stole taps meant for the dialog underneath, so a level-intro dialog
  // could not be dismissed on a portrait phone.
  check('overlays are ordered by the z-index scale, not magic numbers', (() => {
    const css = readFileSync('src/styles/main.css', 'utf8');
    const tokens = readFileSync('src/styles/tokens.css', 'utf8');
    const scale = new Map<string, number>();
    for (const m of tokens.matchAll(/(--z-[\w-]+):\s*(\d+)/g)) scale.set(m[1], Number(m[2]));
    // Values 2..12 order children inside one component and stay literal.
    const rogue = [...css.matchAll(/z-index:\s*(\d+)/g)]
      .map((m) => Number(m[1])).filter((v) => v > 12);
    if (rogue.length > 0) console.log('   un-tokenized z-index: ' + rogue.join(', '));
    const zOf = (name: string): number => {
      const at = css.indexOf(name);
      const m = /z-index:\s*var\((--z-[\w-]+)\)/.exec(css.slice(at, at + 400));
      return m ? scale.get(m[1]) ?? -1 : -1;
    };
    // The rotate hint must sit BELOW the modal scrim so dialogs win taps.
    return rogue.length === 0
      && zOf('.rotate-hint') < zOf('.dialog-scrim')
      && zOf('.rotate-hint') > 0;
  })());

  // ...and z-index alone is NOT enough, which is why the guard below has
  // to exist. `.screen` carries a transform and is therefore a stacking
  // context, so a dialog's z-index only competes inside the screen, while
  // the rotate card is a sibling of `.screen` at the root. Measured: with
  // the ordering "fixed" and this rule removed, elementFromPoint at the
  // centre of the dialog's own button still returned the rotate card's
  // button, and the level-intro dialog could not be dismissed.
  check('the rotate invitation stands down while a dialog is open', (() => {
    const css = readFileSync('src/styles/main.css', 'utf8');
    return /body:has\(\.dialog-scrim\) \.rotate-hint \{ display: none/.test(css);
  })());

  // A splash a three-year-old cannot press is a broken splash. Measured at
  // 2957ms before this: the Play button sat at opacity 0 while six tagline
  // words revealed one at a time, and only then rose in.
  check('the splash offers its Play button in well under a second', (() => {
    const css = readFileSync('src/styles/main.css', 'utf8');
    const play = /\.title-screen \.btn-play \{ animation: rise-in ([\d.]+)s [^}]*?([\d.]+)s both/.exec(css);
    if (!play) return false;
    const readyAt = Number(play[2]);
    const words = /animation-delay: calc\(([\d.]+)s \+ var\(--i\) \* (\d+)ms\)/.exec(css);
    if (!words) return false;
    // Six words in the tagline; the last one starts last.
    const tagDone = Number(words[1]) + 5 * (Number(words[2]) / 1000) + 0.5;
    if (readyAt > 1) console.log(`   play appears at ${readyAt}s`);
    return readyAt <= 1 && tagDone <= 1.8;
  })());

  // Anything pinned to the bottom of the screen has to clear the home
  // indicator. `.app-toast` used a bare percentage and landed on it.
  check('bottom-pinned chrome respects the safe area', (() => {
    const css = readFileSync('src/styles/main.css', 'utf8');
    const at = css.indexOf('.app-toast');
    const block = css.slice(at, css.indexOf('}', at));
    return /--sab/.test(block);
  })());

  // Two floors answering two questions, both named. Before Phase 1 the
  // 56px token was used on exactly one selector while a hardcoded 44px
  // floor was repeated twelve times referencing no token at all.
  check('the touch-target floors are tokens', (() => {
    const tokens = readFileSync('src/styles/tokens.css', 'utf8');
    return /--tap-min:\s*56px/.test(tokens) && /--tap-floor:\s*44px/.test(tokens);
  })());

  // The 540/560 split meant a device 550px tall matched one rule set and
  // not the other. One value, and it must be the larger.
  check('short-landscape uses one breakpoint, not two', (() => {
    const css = readFileSync('src/styles/main.css', 'utf8');
    const at540 = (css.match(/max-height:\s*540px/g) ?? []).length;
    if (at540 > 0) console.log(`   ${at540} rules still on 540px`);
    return at540 === 0 && /max-height:\s*560px/.test(css);
  })());

  // ---- background music ----
  // A browser's own `loop` restarts an MP3 through its encoder padding,
  // which is an audible hiccup every pass, forever. Two elements take
  // turns and their volumes cross over the seam instead.
  check('the music loops by crossfade, not by the element\'s own loop flag', (() => {
    const src = readFileSync('src/audio/music.ts', 'utf8');
    return /e\.loop = false/.test(src) && !/e\.loop = true/.test(src)
      && /private handover\(fade: number\)/.test(src)
      && /addEventListener\('ended'/.test(src);
  })());

  // Fades read the clock. Counting ticks makes the duration a hostage of
  // timer health, and a timer sharing a thread with a Three.js loop was
  // measured firing at ~600ms instead of 40 — a 0.7s fade became 11s and
  // music kept playing well after it had been switched off.
  check('a music fade is timed by the clock, not by counting ticks', (() => {
    const src = readFileSync('src/audio/music.ts', 'utf8');
    const at = src.indexOf('private fadeTo(');
    const body = src.slice(at, src.indexOf('\n  }', at));
    return /performance\.now\(\)/.test(body) && !/i \/ steps/.test(body);
  })());

  // The setting and the app's own request are different facts. Folding
  // them together meant switching music off cleared the request too, so
  // switching it back on left silence.
  check('turning music off and on again brings it back', (() => {
    const src = readFileSync('src/audio/music.ts', 'utf8');
    const setter = src.slice(src.indexOf('set enabled('), src.indexOf('\n  }', src.indexOf('set enabled(')));
    const silence = src.slice(src.indexOf('private silence()'), src.indexOf('\n  }', src.indexOf('private silence()')));
    return /this\.silence\(\)/.test(setter) && /this\.wanted\) this\.start\(\)/.test(setter)
      // silence() must not touch `wanted` — only stop() may.
      && !/this\.wanted/.test(silence);
  })());

  // Nothing may play before the child touches the screen: every browser
  // blocks it, and a rejected play() with nobody awaiting it is an
  // unhandled rejection in the console on every load.
  check('music waits for a gesture and never leaves a rejection behind', (() => {
    const src = readFileSync('src/audio/music.ts', 'utf8');
    const app = readFileSync('src/app/app.ts', 'utf8');
    return /export function attachFirstGesture/.test(src)
      && /'pointerdown', 'keydown', 'touchstart'/.test(src)
      && /try \{ await e\.play\(\); \} catch/.test(src)
      && /attachFirstGesture\(\)/.test(app);
  })());

  // Music is a separate switch from the effects: a classroom often wants
  // the sounds that explain what happened without a track underneath.
  check('music has its own setting, defaulting to on for old saves', (() => {
    const store = readFileSync('src/storage/saveStore.ts', 'utf8');
    const dialogs = readFileSync('src/ui/dialogs.ts', 'utf8');
    const app = readFileSync('src/app/app.ts', 'utf8');
    return /music\?: boolean/.test(store) && /music: true/.test(store)
      && /key: 'music', label: '🎵 Background music'/.test(dialogs)
      && /sharedMusic\.enabled = next/.test(dialogs)
      // `!== false`, never `=== true`: a save written before this existed
      // has no music key, and `=== true` would read that as "off".
      && /settings\.music !== false/.test(app) && !/settings\.music === true/.test(app);
  })());

  // A file:// page cannot fetch a sibling, so the single-file build has to
  // carry the track inside it — and <audio> lives on a different prototype
  // from <img>, so the existing image interception never sees it.
  check('the standalone build embeds the music and rewrites audio src', (() => {
    const build = readFileSync('scripts/build-standalone.mjs', 'utf8');
    return /audioData\[`\.\/audio\/\$\{name\}`\] = `data:audio\/mpeg;base64/.test(build)
      && /HTMLMediaElement\.prototype/.test(build)
      && /no audio found to embed/.test(build);
  })());

  // ---- the characters ----
  // A bop that only floats reads as a picture of a bop. The idle hop is the
  // difference, and two things have to hold for it to look deliberate
  // rather than frantic: it is spaced in the rig's own clamped clock (a
  // wall-clock timer drains faster than the clip it spaces out as soon as
  // the frame rate drops, and the gap collapses — measured at 97% of frames
  // mid-hop on a software renderer), and it only ever starts from idle, so
  // it cannot restack on itself or clip the tail of a game-driven clip.
  check('the idle hop is paced in rig time and starts only from idle', (() => {
    const src = readFileSync('src/rendering/spriteCharacter.ts', 'utf8');
    const at = src.indexOf('this.hopClock -=');
    const block = src.slice(at, at + 600);
    return /this\.hopClock -= Math\.min\(0\.05,/.test(block)
      && /this\.currentClip\(\) === 'idle'/.test(block)
      && /play\('bounce', \{ restart: true \}\)/.test(block);
  })());

  // `rig.pose` is a channel map of NUMBERS — `pose.base` is a blend weight.
  // Reading it as the clip name typechecks nowhere and, cast away, would
  // silently label every character "0".
  check('the clip name is read from rig state, never from the pose map', (() => {
    const src = readFileSync('src/rendering/spriteCharacter.ts', 'utf8');
    const decl = readFileSync('src/vendor/codebops-rig/codebops-rig.d.ts', 'utf8');
    return /interface Pose \{ \[channel: string\]: number \}/.test(decl)
      && /\{ s\?: \{ base\?: string \} \}/.test(src)
      && !/\.pose\.base/.test(src);
  })());

  // ---- the splash ----
  // Play is the only button on it now. That is only safe while the two
  // it replaced still have a door somewhere else: the Garden opens from
  // the island header, Big Ideas from the App Lab's footer. If either
  // loses its entry point, the screen becomes unreachable and nothing
  // else in the codebase would notice.
  check('the Garden and Big Ideas are still reachable without the splash', (() => {
    const select = readFileSync('src/app/levelSelectScreen.ts', 'utf8');
    const lab = readFileSync('src/app/appLabScreen.ts', 'utf8');
    const app = readFileSync('src/app/app.ts', 'utf8');
    return /garden-pill/.test(select) && /this\.events\.onGarden\(\)/.test(select)
      && /onOpenJourney\?\.\(\)/.test(lab)
      && /onGarden: \(\) => this\.showGarden\(\)/.test(app)
      && /onOpenJourney: \(\) => this\.showJourney\(\)/.test(app);
  })());

  // Emoji render in a different art style on every platform, so a splash
  // built from them looks like four illustrators disagreeing. The flowers
  // are drawn to match the wordmark instead.
  check('the scene draws its flowers rather than borrowing the platform\'s', (() => {
    const scene = readFileSync('src/ui/skyScene.ts', 'utf8');
    const app = readFileSync('src/app/app.ts', 'utf8');
    const splash = app.slice(app.indexOf('private showTitle'), app.indexOf('// ---------- level select'));
    // Sparkles are still emoji on purpose — they are specks, not artwork.
    return /flowerSvg\(/.test(scene) && !/[\u{1F330}-\u{1F33F}]/u.test(splash);
  })());

  // Both screens mount the same scene. If the menu ever stops, it goes
  // back to being a flat gradient that looks like a different app.
  check('the splash and the menu stand in the same world', (() => {
    const app = readFileSync('src/app/app.ts', 'utf8');
    const select = readFileSync('src/app/levelSelectScreen.ts', 'utf8');
    return /mountSkyScene\(screen\)/.test(app)
      && /mountSkyScene\(this\.root, \{ compact: true \}\)/.test(select);
  })());

  // The scatter of theme emoji is gone from the menu.
  check('the menu scatters no decorative emoji of its own', (() => {
    const src = readFileSync('src/app/levelSelectScreen.ts', 'utf8');
    return !/THEME_DECOR/.test(src) && !/sel2-leaf/.test(src);
  })());

  check('every splash flower has petals, a heart and a stem', (() => {
    const src = readFileSync('src/ui/splashFlora.ts', 'utf8');
    return /SPLASH_FLOWERS/.test(src)
      && /<ellipse/.test(src) && /<circle/.test(src) && /stroke-linecap="round"/.test(src);
  })());

  check('the stage releases its WebGL context, not just its uploads', (() => {
    const src = readFileSync('src/engine/stage.ts', 'utf8');
    return /this\.renderer\.dispose\(\);/.test(src)
      && /this\.renderer\.forceContextLoss\(\);/.test(src);
  })());

  // The worlds are full of THREE.Points — sparkles, petals, bubbles,
  // fireflies, spores. A Points is not a Mesh, so a teardown that checks
  // `instanceof THREE.Mesh` frees none of them.
  check('the stage teardown frees points and lines, not only meshes', (() => {
    const src = readFileSync('src/engine/stage.ts', 'utf8');
    const teardown = src.slice(src.indexOf('dispose(): void'));
    return !/instanceof THREE\.Mesh/.test(teardown) && /holder\.geometry/.test(teardown);
  })());

  check('the Three shim covers every symbol the adapter uses', (() => {
    const adapter = readFileSync('src/vendor/codebops-rig/three-adapter.js', 'utf8')
      .replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
    const used = new Set([...adapter.matchAll(/\bTHREE\.([A-Za-z_$][\w$]*)/g)].map((m) => m[1]));
    const shim = readFileSync('src/rendering/spriteCharacter.ts', 'utf8')
      .split('THREE_FOR_ADAPTER = {')[1]?.split('}')[0] ?? '';
    const missing = [...used].filter((n) => !new RegExp(`\\b${n}\\s*:`).test(shim));
    if (missing.length > 0) console.log('   missing from the shim: ' + missing.join(', '));
    return used.size >= 6 && missing.length === 0;
  })());

  // The rig's ear and crest springs are integrated explicitly and are
  // stiff. Its own loop clamps dt to 0.05; the stage clamps to 0.25, so
  // driving the rig from the stage without re-clamping diverges the
  // springs on the first long frame and never recovers.
  check('the rig is never stepped with a frame longer than it can take', (() => {
    const src = readFileSync('src/rendering/spriteCharacter.ts', 'utf8');
    return /this\.rig\.update\(Math\.min\(0\.05,/.test(src);
  })());

  check('calm mode stops the world clock rather than the wind alone', (() => {
    const src = readFileSync('src/app/gameScreen.ts', 'utf8');
    // The ambient clock only advances when calm mode is off, and the
    // world is stepped with that clock — not the stage's raw elapsed.
    return /if \(!calm\) this\.ambient \+= dt;/.test(src)
      && /this\.world\.update\(calm \? 0 : dt, this\.ambient/.test(src);
  })());

  check('no screen still asks for a character by its old art URL', (() => {
    const bad: string[] = [];
    for (const f of readdirSync('src/app').filter((n) => n.endsWith('.ts'))) {
      const src = readFileSync(`src/app/${f}`, 'utf8');
      if (/svgUrl|art\/characters\//.test(src)) bad.push(f);
    }
    return bad.length === 0;
  })());

  // A wrapper that edited the vendored files would turn every future
  // update into a merge. Two modules front the rig and nothing else may
  // reach past them: mascotRig owns the engine and the character data,
  // spriteCharacter owns the Three adapter.
  check('nothing reaches the vendored rig except its two front doors', (() => {
    const OWNERS: Readonly<Record<string, RegExp>> = {
      'src/rendering/mascotRig.ts': /codebops-rig\.js|characters\/(zip|mixy)\.js/,
      'src/rendering/spriteCharacter.ts': /three-adapter\.js|codebops-rig\.js/,
    };
    const strays: string[] = [];
    const walk = (dir: string): void => {
      for (const f of readdirSync(dir, { withFileTypes: true })) {
        if (f.name === 'vendor') continue;
        const path = `${dir}/${f.name}`;
        if (f.isDirectory()) { walk(path); continue; }
        if (!path.endsWith('.ts')) continue;
        const src = readFileSync(path, 'utf8');
        if (!/vendor\/codebops-rig/.test(src)) continue;
        const allowed = OWNERS[path];
        if (!allowed) { strays.push(`${path}: not a front door`); continue; }
        for (const m of src.matchAll(/vendor\/codebops-rig\/([^'"]+)/g)) {
          if (!allowed.test(m[1])) strays.push(`${path}: reaches ${m[1]}`);
        }
      }
    };
    walk('src');
    if (strays.length > 0) console.log('   ' + strays.join('\n   '));
    return strays.length === 0;
  })());

  // Only mascotRig may build a rig, so the shared raster cache cannot be
  // bypassed. createRig() rasterises 34-41 SVG layers at 2.2x; doing that
  // per screen is the difference between a level opening and a level
  // stalling.
  check('nothing calls createRig directly — rigs come from the cache', (() => {
    const users: string[] = [];
    const walk = (dir: string): void => {
      for (const f of readdirSync(dir, { withFileTypes: true })) {
        if (f.name === 'vendor') continue;
        const path = `${dir}/${f.name}`;
        if (f.isDirectory()) walk(path);
        else if (path.endsWith('.ts')) {
          // Comments explain why createRig is avoided; scan code only.
          const src = readFileSync(path, 'utf8')
            .replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
          if (/\bcreateRig\s*\(/.test(src)) users.push(path);
        }
      }
    };
    walk('src');
    return users.length === 0;
  })());

}

// ============================================================
// Pick a Level — one island at a time
// ============================================================
{
  check('the garage workshops cover the sequence exactly, with nothing lost', (() => {
    // If a level is added to any GEARWORKS_*_LEVELS group and no workshop
    // claims it, it would silently vanish from the picker. This is the
    // check that makes that impossible.
    const covered = GEARWORKS_WORKSHOPS.reduce((a, w) => a + w.count, 0);
    return covered === GEARWORKS_SEQUENCE.length;
  })());
  check('every workshop holds at least one machine',
    GEARWORKS_WORKSHOPS.every((w) => w.count > 0));
  check('no workshop is big enough to be a wall again',
    GEARWORKS_WORKSHOPS.every((w) => w.count <= 12));
  check('workshop ids are unique', (() => {
    const ids = GEARWORKS_WORKSHOPS.map((w) => w.id);
    return new Set(ids).size === ids.length;
  })());
  check('workshop names and taglines are child words, never grades',
    GEARWORKS_WORKSHOPS.every((w) =>
      !/\d|level|hard|easy|advanced|beginner|%/i.test(`${w.name} ${w.tagline}`)));

  check('every story level lands in exactly one island', (() => {
    const claimed = WORLD_ORDER.flatMap((id) => ALL_LEVELS.filter((l) => l.worldId === id));
    return claimed.length === ALL_LEVELS.length
      && new Set(claimed.map((l) => l.id)).size === ALL_LEVELS.length;
  })());
  // The per-theme scatter of emoji is gone — the sky scene carries the
  // scenery now — so a theme needs two things: a disc colour for its
  // medallion, and a glow colour for the island it opens.
  check('every world in the strip has a disc colour and an island glow', (() => {
    const css = readFileSync('src/styles/main.css', 'utf8');
    const themes = [...new Set([
      ...Object.values(WORLD_META).map((m) => m.theme), 'garage', 'applab', 'island',
    ])];
    return themes.every((t) =>
      css.includes(`.sel2-med-disc.th-${t}`) && css.includes(`.sel2-island.th-${t}`));
  })());

  // The disc gradients and the island glow both hang off the same th-*
  // class. While those gradients were unscoped, opening a world painted a
  // medallion's background across the whole island — which is what was
  // hiding the sky scene behind it.
  check('a theme gradient paints a medallion disc, never the island', (() => {
    const css = readFileSync('src/styles/main.css', 'utf8');
    return !/^\.th-[a-z]+\s/m.test(css);
  })());
  check('the select screen never scrolls the page — the island scrolls', (() => {
    const css = readFileSync('src/styles/main.css', 'utf8');
    const at = css.indexOf('.sel2-screen {');
    const block = css.slice(at, css.indexOf('}', at));
    return /overflow:\s*hidden/.test(block);
  })());
  check('a tappable pill clears the 44px floor', (() => {
    const css = readFileSync('src/styles/main.css', 'utf8');
    return /button\.stars-pill\s*\{[^}]*min-height:\s*44px/.test(css);
  })());
}


// ============================================================
// Polish addendum — the phases that shipped without tests
// ============================================================
{
  // --- Phase 7: the goal card gets out of the way -------------------
  // A goal card that sits open forever eats the top-left corner of a
  // small landscape screen for the whole level, which is exactly where
  // the play area wants to be.
  check('the goal card folds itself after a readable pause', (() => {
    const src = readFileSync('src/ui/goalCard.ts', 'utf8');
    const m = /const READ_MS = (\d+)/.exec(src);
    if (!m) return false;
    const ms = Number(m[1]);
    // Long enough for a grown-up to read it aloud, short enough that the
    // corner comes back before the child has finished their first plan.
    return ms >= 5000 && ms <= 10000;
  })());
  check('the folded goal card can always be opened again', (() => {
    const src = readFileSync('src/ui/goalCard.ts', 'utf8');
    return /classList\.toggle\('folded'/.test(src) && /addEventListener\('click'/.test(src);
  })());
  check('the goal card says which of its two states it is in', (() => {
    const src = readFileSync('src/ui/goalCard.ts', 'utf8');
    // Both labels must exist: a control that keeps the same name in both
    // states tells a screen-reader user nothing about what tapping does.
    return /Show the goal again/.test(src) && /openLabel/.test(src);
  })());
  check('folding tells the camera to re-fit, or the world stays cropped', (() => {
    const src = readFileSync('src/ui/goalCard.ts', 'utf8');
    return /onResize\?\.\(\)/.test(src);
  })());
  check('the folded card is still big enough to hit', (() => {
    const css = readFileSync('src/styles/main.css', 'utf8');
    const at = css.indexOf('.goal-card.folded');
    if (at < 0) return false;
    const block = css.slice(at, css.indexOf('}', at));
    return /min-height|height/.test(block);
  })());

  // --- Phase 9: Glitch Replay points at the likely step -------------
  check('the replay marks the first step that surprised the child', (() => {
    const src = readFileSync('src/ui/dialogs.ts', 'utf8');
    return /suspectAt/.test(src) && /classList\.add\('suspect'\)/.test(src);
  })());
  check('exactly one step is ever marked suspect', (() => {
    const src = readFileSync('src/ui/dialogs.ts', 'utf8');
    // findIndex, not filter: a row with four rings is a row with none.
    return /findIndex\(\(st\) =>/.test(src.slice(src.indexOf('const suspectAt')));
  })());
  check('the suspect step is announced, not only drawn', (() => {
    const src = readFileSync('src/ui/dialogs.ts', 'utf8');
    return /look here first/.test(src);
  })());
  check('nothing suspect means no glowing-step prompt', (() => {
    const src = readFileSync('src/ui/dialogs.ts', 'utf8');
    return /lead\.hidden = suspectAt < 0/.test(src);
  })());
  check('the suspect ring is drawn, not just named', (() => {
    const css = readFileSync('src/styles/main.css', 'utf8');
    return css.includes('.replay-chip.suspect');
  })());

  // --- Phase 13: the offline shell ----------------------------------
  check('the service worker exists and claims a version', (() => {
    const sw = readFileSync('public/sw.js', 'utf8');
    return /CACHE|VERSION/.test(sw);
  })());
  check('the worker never caches another origin', (() => {
    const sw = readFileSync('public/sw.js', 'utf8');
    return /origin/.test(sw);
  })());
  check('navigations go to the network first, so a new build is picked up', (() => {
    const sw = readFileSync('public/sw.js', 'utf8');
    return /navigate/.test(sw);
  })());
  check('registration is silent — a child never sees an update prompt', (() => {
    const src = readFileSync('src/pwa.ts', 'utf8');
    return /catch\(\(\) => \{/.test(src) && !/confirm\(|alert\(/.test(src);
  })());
  check('file:// skips registration — the standalone build IS the offline copy', (() => {
    const src = readFileSync('src/pwa.ts', 'utf8');
    return /location\.protocol/.test(src);
  })());
  check('the precache list is generated from the build, never hand-kept', (() => {
    const src = readFileSync('scripts/build-sw.mjs', 'utf8');
    return /__CB_PRECACHE__/.test(src);
  })());
  check('a cached asset is served even when Vary would block the match', (() => {
    // Measured: the main bundle, present in the cache and served by an
    // activated worker, failed to load on roughly one offline start in
    // three. caches.match honours Vary; the network retry then fails too,
    // offline, and the whole promise rejects as ERR_FAILED with nothing
    // in the console. 11/11 offline boots after adding the relaxed retry.
    const sw = readFileSync('public/sw.js', 'utf8');
    return /ignoreVary: true/.test(sw);
  })());
  check('the worker never rejects a request into a silent network error', (() => {
    const sw = readFileSync('public/sw.js', 'utf8');
    return /Response\.error\(\)/.test(sw);
  })());
  check('the precache follows what index.html references, not what dist holds', (() => {
    // emptyOutDir is false, so dist/assets keeps every hashed bundle ever
    // emitted. Precaching the directory shipped 11.7 MB of dead copies.
    const src = readFileSync('scripts/build-sw.mjs', 'utf8');
    return /reachable/.test(src) && /queue/.test(src);
  })());
  check('the crawl resolves a reference against the file that makes it', (() => {
    // index.html says `assets/index-x.js`, but inside that bundle a lazy
    // chunk is `import("./zip-y.js")` with no `assets/` in it at all.
    // Matching only the `assets/` form dropped every character and rig
    // chunk, and the offline SPLASH still worked — so the omission looked
    // like a pass right up until a child opened a level.
    const src = readFileSync('scripts/build-sw.mjs', 'utf8');
    return /lastIndexOf\('\/'\)/.test(src) && /candidates/.test(src);
  })());
  check('Zip, Mixy and the rig are lazily imported, so the crawl must find them', (() => {
    // These dynamic imports are what Rollup turns into separate chunks,
    // and separate chunks are what the crawl above has to reach. If they
    // ever became static imports the bug would stop mattering — and so
    // would this test, which is exactly why it is pinned here.
    const src = readFileSync('src/rendering/mascotRig.ts', 'utf8');
    return /import\('\.\.\/vendor\/codebops-rig\/characters\/zip\.js'\)/.test(src)
      && /import\('\.\.\/vendor\/codebops-rig\/characters\/mixy\.js'\)/.test(src)
      && /import\('\.\.\/vendor\/codebops-rig\/codebops-rig\.js'\)/.test(src);
  })());

  // --- Phase 14: the screenshot suite means something ---------------
  check('deterministic mode is opt-in through the URL only', (() => {
    const src = readFileSync('src/engine/testMode.ts', 'utf8');
    return /cbtest/.test(src) && /location\.search/.test(src);
  })());
  check('nothing random is left in the scenery once a test is watching', (() => {
    // Every visual Math.random() has to go through jitter(), or two runs
    // of the same build scatter different rocks and the diff is noise.
    const files = [
      'src/rendering/worldFactories.ts', 'src/rendering/bubbleBay.ts',
      'src/rendering/patternForest.ts', 'src/rendering/robotTown.ts',
      'src/rendering/paperCharacter.ts', 'src/rendering/spriteCharacter.ts',
    ];
    return files.every((f) => {
      const src = readFileSync(f, 'utf8').replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '');
      return !src.includes('Math.random()');
    });
  })());
  check('the seeded sequence is a generator, not a fixed step', (() => {
    // A constant increment puts consecutive draws on a diagonal, so every
    // scattered thing lands on a lattice and the baseline stops proving
    // that scattering works at all.
    const src = readFileSync('src/engine/testMode.ts', 'utf8');
    return /Math\.imul/.test(src);
  })());
  check('the render loop counts frames instead of reading a clock in test mode', (() => {
    const src = readFileSync('src/engine/stage.ts', 'utf8');
    return /FIXED_DT/.test(src) && /tickFrame\(\)/.test(src);
  })());
  check('the loop stops itself on the exact frame a test asked for', (() => {
    const src = readFileSync('src/engine/stage.ts', 'utf8');
    return /frameLimit\(\)/.test(src) && /frameCount\(\) >= frameLimit\(\)/.test(src);
  })());
  check('the frame count restarts with each screen, not with the session', (() => {
    const app = readFileSync('src/app/app.ts', 'utf8');
    return /resetFrames\(\)/.test(app) && /resetJitter\(\)/.test(app);
  })());
  check('deterministic mode costs a child nothing', (() => {
    // jitter() must fall straight through to Math.random() when no test
    // is watching, or the shipped game gets the test's scenery.
    const src = readFileSync('src/engine/testMode.ts', 'utf8');
    return /if \(!deterministic\(\)\) return Math\.random\(\);/.test(src);
  })());
  check('the screenshot harness lives in the repo, not in someone tmp dir', (() => {
    const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
    return typeof pkg.scripts.visual === 'string'
      && typeof pkg.scripts['visual:diff'] === 'string';
  })());
  check('the harness opens pages in deterministic mode', (() => {
    const src = readFileSync('scripts/visual-shoot.mjs', 'utf8');
    return /cbtest=1/.test(src) && /cbframes=/.test(src);
  })());
}


// ============================================================
// Type — the app owns its own fonts
// ============================================================
{
  check('no page asks a third party for a font', (() => {
    const html = readFileSync('index.html', 'utf8').replace(/<!--[\s\S]*?-->/g, '');
    return !/fonts\.googleapis\.com|fonts\.gstatic\.com/.test(html);
  })());
  check('the fonts are in the repo, so a build never needs the network', (() => {
    const css = readFileSync('public/fonts/fonts.css', 'utf8');
    return /@font-face/.test(css) && !/https?:/.test(css);
  })());
  check('font urls are relative to their own stylesheet', (() => {
    // `./fonts/x.woff2` inside public/fonts/fonts.css resolves to
    // fonts/fonts/x.woff2, which a dev server answers with index.html and
    // a 200 — no console error, and every heading silently wrong.
    const css = readFileSync('public/fonts/fonts.css', 'utf8');
    return /url\(\.\/[^/)]+\.woff2\)/.test(css) && !/url\(\.\/fonts\//.test(css);
  })());
  check('both families the design uses are covered', (() => {
    const css = readFileSync('public/fonts/fonts.css', 'utf8');
    return /font-family: 'Fredoka'/.test(css) && /font-family: 'Nunito'/.test(css);
  })());
  check('only the subsets this game can spell are shipped', (() => {
    // Cyrillic, greek, hebrew and vietnamese are most of the bytes and
    // none of the glyphs for an English game with system emoji.
    const css = readFileSync('public/fonts/fonts.css', 'utf8');
    return /\/\* latin \*\//.test(css) && !/\/\* cyrillic \*\//.test(css)
      && !/\/\* hebrew \*\//.test(css);
  })());
  check('the standalone file embeds its fonts instead of linking them', (() => {
    const src = readFileSync('scripts/build-standalone.mjs', 'utf8');
    return /data:font\/woff2;base64/.test(src);
  })());
  check('a missing font set warns but never fails the build', (() => {
    const src = readFileSync('scripts/build-standalone.mjs', 'utf8');
    return /console\.warn\(.*fonts/.test(src);
  })());
  check('the font stacks still name a rounded fallback', (() => {
    // Fonts load lazily per weight and per subset, so there is always a
    // first paint before they arrive.
    const css = readFileSync('src/styles/tokens.css', 'utf8');
    return /--font-display:[^;]*ui-rounded/.test(css)
      && /--font-body:[^;]*ui-rounded/.test(css);
  })());
}


// ============================================================
// Intelligent Systems — the shared helper engine
// ============================================================
{
  // ---- fixtures ------------------------------------------------------
  const wateringCan: AgentToolDefinition = {
    id: 'can', titleToken: 'watering can', icon: '🚿',
    capabilities: ['water'], allowedTargets: ['flower'], requiresApproval: false,
  };
  const spade: AgentToolDefinition = {
    id: 'spade', titleToken: 'spade', icon: '🪏',
    capabilities: ['grab'], allowedTargets: ['flower'], requiresApproval: true,
  };
  const wateredMemory: AgentMemoryDefinition = {
    id: 'watered', titleToken: 'watered', valueType: 'token-set',
    initialValue: [], maximumEntries: 10, resetPolicy: 'level',
  };
  const countMemory: AgentMemoryDefinition = {
    id: 'howMany', titleToken: 'how many', valueType: 'number',
    initialValue: 0, resetPolicy: 'level',
  };

  const flower = (id: string, attrs: string[] = ['droopy'], clear = true): AgentObservation =>
    ({ subjectId: id, kind: 'flower', attributes: attrs, clear });

  const gardener = (over: Partial<AgentDefinition> = {}): AgentDefinition => ({
    id: 'gardener',
    goal: {
      id: 'keep-healthy', titleToken: 'keep flowers healthy', priority: 1,
      successConditions: [{ kind: 'allHandled', subjectKind: 'flower' }],
    },
    tools: [wateringCan, spade],
    rules: [{
      id: 'water-droopy', priority: 1, enabled: true,
      condition: { kind: 'hasAttribute', value: 'droopy' },
      action: { kind: 'useTool', toolId: 'can' },
    }],
    memory: [wateredMemory, countMemory],
    examples: [],
    requiresApprovalFor: [],
    limits: DEFAULT_LIMITS,
    ...over,
  });

  const garden = (n: number, attrs: string[] = ['droopy']): AgentWorld =>
    ({ subjects: Array.from({ length: n }, (_, i) => flower(`flower-${i + 1}`, attrs)) });

  // ---- Phase 2: goals, tools, rules, memory ---------------------------
  check('a helper with a matching rule acts on every subject', (() => {
    const r = runAgent(gardener(), garden(3));
    return r.handled.length === 3 && r.goalReached;
  })());
  check('a goal is judged against the world, never against the plan', (() => {
    // The SAME goal, reached by a helper with a completely different rule
    // set. This is what makes more than one right answer possible (§13).
    const viaSkipThenWater = gardener({
      rules: [
        { id: 'ignore-happy', priority: 1, enabled: true,
          condition: { kind: 'notAttribute', value: 'droopy' }, action: { kind: 'skip' } },
        { id: 'water', priority: 2, enabled: true,
          condition: { kind: 'always' }, action: { kind: 'useTool', toolId: 'can' } },
      ],
    });
    return runAgent(viaSkipThenWater, garden(3)).goalReached;
  })());
  check('a rule that does not match leaves the subject alone', (() => {
    const r = runAgent(gardener(), garden(2, ['happy']));
    return r.handled.length === 0
      && r.trace.every((t) => t.outcome.kind === 'noRuleMatched');
  })());
  check('walking past something is still recorded', (() => {
    // The row a child needs when asking "why did it ignore that one?"
    const r = runAgent(gardener(), garden(2, ['happy']));
    return r.trace.length === 2;
  })());
  check('rules run in priority order, lowest first', (() => {
    const a = gardener({
      rules: [
        { id: 'second', priority: 9, enabled: true,
          condition: { kind: 'always' }, action: { kind: 'skip' } },
        { id: 'first', priority: 1, enabled: true,
          condition: { kind: 'always' }, action: { kind: 'useTool', toolId: 'can' } },
      ],
    });
    return runAgent(a, garden(1)).trace[0].selectedRuleId === 'first';
  })());
  check('equal priorities break on the order the child arranged them', (() => {
    const a = gardener({
      rules: [
        { id: 'top', priority: 1, enabled: true,
          condition: { kind: 'always' }, action: { kind: 'skip' } },
        { id: 'bottom', priority: 1, enabled: true,
          condition: { kind: 'always' }, action: { kind: 'useTool', toolId: 'can' } },
      ],
    });
    return runAgent(a, garden(1)).trace[0].selectedRuleId === 'top';
  })());
  check('a disabled rule never fires', (() => {
    const a = gardener({
      rules: [{ id: 'off', priority: 1, enabled: false,
        condition: { kind: 'always' }, action: { kind: 'useTool', toolId: 'can' } }],
    });
    return runAgent(a, garden(2)).handled.length === 0;
  })());
  check('the trace lists every rule that could have fired, not just the winner', (() => {
    const a = gardener({
      rules: [
        { id: 'a', priority: 1, enabled: true, condition: { kind: 'always' }, action: { kind: 'skip' } },
        { id: 'b', priority: 2, enabled: true, condition: { kind: 'always' }, action: { kind: 'skip' } },
      ],
    });
    return runAgent(a, garden(1)).trace[0].candidateRules.join(',') === 'a,b';
  })());
  check('the same helper and world always produce the same trace', (() => {
    const a = gardener();
    const one = JSON.stringify(runAgent(a, garden(4)).trace);
    const two = JSON.stringify(runAgent(a, garden(4)).trace);
    return one === two;
  })());
  check('running a helper never mutates the world it was given', (() => {
    const w = garden(2);
    const before = JSON.stringify(w);
    runAgent(gardener(), w);
    return JSON.stringify(w) === before;
  })());
  check('AND with no clauses is true, so a half-built rule never blocks', (() => {
    return evalAgentCondition({ kind: 'and', all: [] }, flower('f'), {});
  })());
  check('OR with no clauses is false', (() => {
    return !evalAgentCondition({ kind: 'or', any: [] }, flower('f'), {});
  })());
  check('NOT flips its test', (() => {
    const c: AgentCondition = { kind: 'not', test: { kind: 'hasAttribute', value: 'droopy' } };
    return !evalAgentCondition(c, flower('f', ['droopy']), {})
      && evalAgentCondition(c, flower('f', ['happy']), {});
  })());
  check('a rule shadowed by an earlier always-rule is reported', (() => {
    const rules: AgentRuleDefinition[] = [
      { id: 'catch-all', priority: 1, enabled: true, condition: { kind: 'always' }, action: { kind: 'skip' } },
      { id: 'never-runs', priority: 2, enabled: true,
        condition: { kind: 'hasAttribute', value: 'droopy' }, action: { kind: 'skip' } },
    ];
    return shadowedRules(rules).join(',') === 'never-runs';
  })());
  check('nothing is called shadowed when there is no catch-all', (() => {
    const rules: AgentRuleDefinition[] = [
      { id: 'a', priority: 1, enabled: true,
        condition: { kind: 'hasAttribute', value: 'droopy' }, action: { kind: 'skip' } },
      { id: 'b', priority: 2, enabled: true,
        condition: { kind: 'hasAttribute', value: 'happy' }, action: { kind: 'skip' } },
    ];
    return shadowedRules(rules).length === 0;
  })());

  // ---- memory --------------------------------------------------------
  check('memory starts from its declared initial value', (() => {
    const m = initialMemory([wateredMemory, countMemory]);
    return Array.isArray(m.watered) && m.watered.length === 0 && m.howMany === 0;
  })());
  check('remembering the same thing twice changes nothing', (() => {
    let m = initialMemory([wateredMemory]);
    m = remember(m, wateredMemory, 'flower-1', DEFAULT_LIMITS).state;
    const once = JSON.stringify(m);
    m = remember(m, wateredMemory, 'flower-1', DEFAULT_LIMITS).state;
    return JSON.stringify(m) === once;
  })());
  check('a memory that is full says so instead of growing forever', (() => {
    const small: AgentMemoryDefinition = { ...wateredMemory, maximumEntries: 2 };
    let m = initialMemory([small]);
    m = remember(m, small, 'a', DEFAULT_LIMITS).state;
    m = remember(m, small, 'b', DEFAULT_LIMITS).state;
    const third = remember(m, small, 'c', DEFAULT_LIMITS);
    return third.full && (third.state.watered as string[]).length === 2;
  })());
  check("the helper's own budget caps memory even when the memory asks for more", (() => {
    const greedy: AgentMemoryDefinition = { ...wateredMemory, maximumEntries: 999 };
    const tight = { ...DEFAULT_LIMITS, maximumMemoryEntries: 1 };
    let m = initialMemory([greedy]);
    m = remember(m, greedy, 'a', tight).state;
    return remember(m, greedy, 'b', tight).full;
  })());
  check('forgetting puts a memory back to how it started', (() => {
    let m = initialMemory([wateredMemory]);
    m = remember(m, wateredMemory, 'x', DEFAULT_LIMITS).state;
    m = forget(m, wateredMemory);
    return (m.watered as string[]).length === 0;
  })());
  check('counting only works on a number memory', (() => {
    const m = count(initialMemory([wateredMemory]), wateredMemory, 1);
    return Array.isArray(m.watered);
  })());
  check('level memory is cleared at a level boundary', (() => {
    let m = initialMemory([wateredMemory]);
    m = remember(m, wateredMemory, 'x', DEFAULT_LIMITS).state;
    const after = carryOver(m, [wateredMemory], 'level');
    return (after.watered as string[]).length === 0;
  })());
  check('project memory survives a level boundary', (() => {
    const projectMem: AgentMemoryDefinition = { ...wateredMemory, resetPolicy: 'project' };
    let m = initialMemory([projectMem]);
    m = remember(m, projectMem, 'x', DEFAULT_LIMITS).state;
    const after = carryOver(m, [projectMem], 'level');
    return (after.watered as string[]).length === 1;
  })());
  check('memory a helper reads is captured in the trace, not looked up later', (() => {
    // The whole point of §18: a trace has to hold the memory the decision
    // was made against, or a wrong answer is only re-runnable, never
    // explainable.
    const a = gardener({
      rules: [
        { id: 'remember-it', priority: 1, enabled: true,
          condition: { kind: 'memoryLacks', memoryId: 'watered' },
          action: { kind: 'remember', memoryId: 'watered' } },
      ],
    });
    const r = runAgent(a, garden(2));
    const first = r.trace[0].memoryRead.find((x) => x.memoryId === 'watered');
    const second = r.trace[1].memoryRead.find((x) => x.memoryId === 'watered');
    return (first!.value as string[]).length === 0 && (second!.value as string[]).length === 1;
  })());
  check('a helper can be told not to do the same job twice', (() => {
    const a = gardener({
      goal: { id: 'g', titleToken: 'g', priority: 1,
        successConditions: [{ kind: 'countAtLeast', memoryId: 'howMany', value: 99 }] },
      rules: [
        { id: 'skip-known', priority: 1, enabled: true,
          condition: { kind: 'memoryContains', memoryId: 'watered' }, action: { kind: 'skip' } },
        { id: 'water-new', priority: 2, enabled: true,
          condition: { kind: 'always' }, action: { kind: 'remember', memoryId: 'watered' } },
      ],
    });
    const r = runAgent(a, { subjects: [flower('f1'), flower('f1'), flower('f2')] });
    return (r.memory.watered as string[]).length === 2;
  })());

  // ---- Phase 3: confidence ------------------------------------------
  check('a helper that cannot see clearly is never confident', (() => {
    const a = assessConfidence({
      subject: flower('f', ['droopy'], false), rules: gardener().rules, memory: {},
    });
    return a.state === 'unsure';
  })());
  check('no matching rule reads as unsure', (() => {
    const a = assessConfidence({ subject: flower('f', ['happy']), rules: gardener().rules, memory: {} });
    return a.state === 'unsure';
  })());
  check('exactly one matching rule and a clear view reads as confident', (() => {
    const a = assessConfidence({ subject: flower('f'), rules: gardener().rules, memory: {} });
    return a.state === 'confident';
  })());
  check('two rules matching the same thing reads as maybe', (() => {
    const rules: AgentRuleDefinition[] = [
      { id: 'a', priority: 1, enabled: true, condition: { kind: 'always' }, action: { kind: 'skip' } },
      { id: 'b', priority: 2, enabled: true, condition: { kind: 'always' }, action: { kind: 'skip' } },
    ];
    return assessConfidence({ subject: flower('f'), rules, memory: {} }).state === 'maybe';
  })());
  check('confidence always says WHY, never just how much', (() => {
    const a = assessConfidence({ subject: flower('f', ['droopy'], false), rules: [], memory: {} });
    return a.reasons.length > 0 && a.reasons.every((r) => r.trim().length > 0);
  })());
  check('the weakest input decides — a helper is only as sure as its worst part', (() => {
    return weakest(['confident', 'unsure', 'maybe']) === 'unsure'
      && weakest(['confident', 'maybe']) === 'maybe'
      && weakest([]) === 'confident';
  })());
  check('confidence is never a percentage for a child', (() => {
    // §9: no percentages by default. Shape, face and words instead.
    const values = Object.values(CONFIDENCE_PHRASE).concat(Object.values(CONFIDENCE_LABEL));
    return values.every((v) => !/\d/.test(v));
  })());
  check('an unsure helper is not offered "just try it"', (() => {
    // §9: the child has to give it something, not tell it to guess.
    return !actionsFor('unsure').includes('try') && actionsFor('confident').includes('try');
  })());
  check('stopping safely is offered at every confidence level', (() => {
    return (['confident', 'maybe', 'unsure'] as const)
      .every((s) => actionsFor(s).includes('stopSafely'));
  })());
  check('asking a grown-up is offered exactly when the helper is unsure', (() => {
    return actionsFor('unsure').includes('askAGrownUp')
      && !actionsFor('confident').includes('askAGrownUp');
  })());
  check('confidence is never authored by a level — only derived', (() => {
    // Guards the design decision. If a ConfidenceState ever becomes a
    // field on a level or a rule, this fails and someone has to argue for it.
    const src = readFileSync('src/agents/types.ts', 'utf8').replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '');
    const ruleBlock = src.slice(src.indexOf('interface AgentRuleDefinition'));
    return !ruleBlock.slice(0, 400).includes('ConfidenceState');
  })());

  // ---- Phase 4: human approval ---------------------------------------
  check('a tool marked as needing approval stops the run to ask', (() => {
    const a = gardener({
      rules: [{ id: 'dig', priority: 1, enabled: true,
        condition: { kind: 'always' }, action: { kind: 'useTool', toolId: 'spade' } }],
    });
    const r = runAgent(a, garden(2));
    return r.pendingApproval !== null && r.handled.length === 0;
  })());
  check('the child can gate a tool the helper does not think is dangerous', (() => {
    const a = gardener({ requiresApprovalFor: ['can'] });
    return runAgent(a, garden(1)).pendingApproval !== null;
  })());
  check('an approval question names the actual thing, not "an action"', (() => {
    const a = gardener({ requiresApprovalFor: ['can'] });
    const p = runAgent(a, garden(1)).pendingApproval!;
    return p.childFacingPrompt.includes('watering can') && p.childFacingPrompt.includes('flower');
  })());
  check('answering yes lets the run carry on', (() => {
    const a = gardener({ requiresApprovalFor: ['can'] });
    const r = runAgent(a, garden(2), { approvals: ['approved', 'approved'] });
    return r.handled.length === 2 && r.pendingApproval === null;
  })());
  check('answering "change the plan" skips that one and keeps going', (() => {
    const a = gardener({ requiresApprovalFor: ['can'] });
    const r = runAgent(a, garden(2), { approvals: ['changed', 'approved'] });
    return r.handled.length === 1;
  })());
  check('cancelling stops the helper there', (() => {
    const a = gardener({ requiresApprovalFor: ['can'] });
    const r = runAgent(a, garden(3), { approvals: ['cancelled'] });
    return r.stoppedBecause === 'approvalDeclined' && r.handled.length === 0;
  })());
  check('a run waiting for approval is replayable from its answers alone', (() => {
    // No callbacks, no clock: (helper, world, answers) fully describes it.
    const a = gardener({ requiresApprovalFor: ['can'] });
    const one = JSON.stringify(runAgent(a, garden(3), { approvals: ['approved', 'changed'] }).trace);
    const two = JSON.stringify(runAgent(a, garden(3), { approvals: ['approved', 'changed'] }).trace);
    return one === two;
  })());
  check('every approval answer counts as a successful outcome', (() => {
    // §25: asking must never score below acting, including when the
    // answer is no.
    return (['approved', 'changed', 'cancelled'] as const).every(isSuccessfulOutcome);
  })());
  check('the helper waiting for a person is visible in the trace', (() => {
    const a = gardener({ requiresApprovalFor: ['can'] });
    const r = runAgent(a, garden(1));
    return r.trace.some((t) => t.approvalRequested && t.outcome.kind === 'waitingForApproval');
  })());

  // ---- Phase 5: teach by example -------------------------------------
  const berrySet: ExampleSet = {
    id: 'berries', labels: ['berry', 'not-berry'],
    examples: [
      { id: 'e1', inputToken: 'strawberry', labelToken: 'berry', source: 'starter' },
      { id: 'e2', inputToken: 'blueberry', labelToken: 'berry', source: 'starter' },
      { id: 'e3', inputToken: 'bolt', labelToken: 'not-berry', source: 'starter' },
    ],
  };
  check('a helper can label something it has been shown', (() => {
    return classify(berrySet, 'strawberry').label === 'berry';
  })());
  check('a helper says it does not know rather than guessing', (() => {
    const g = classify(berrySet, 'mango');
    return g.label === null && g.confidence === 'unsure';
  })());
  check('one example is a fact about one thing, not a pattern', (() => {
    const thin: ExampleSet = { ...berrySet, examples: [berrySet.examples[0], berrySet.examples[2]] };
    return classify(thin, 'strawberry').confidence === 'maybe';
  })());
  check('two examples pointing the same way earn confidence', (() => {
    const twice: ExampleSet = {
      ...berrySet,
      examples: [...berrySet.examples,
        { id: 'e4', inputToken: 'strawberry', labelToken: 'berry', source: 'child-corrected' }],
    };
    return classify(twice, 'strawberry').confidence === 'confident';
  })());
  check('a helper shown only one kind of answer is flagged as one-sided', (() => {
    const oneSided: ExampleSet = {
      id: 's', labels: ['berry', 'not-berry'],
      examples: [
        { id: 'a', inputToken: 'strawberry', labelToken: 'berry', source: 'starter' },
        { id: 'b', inputToken: 'raspberry', labelToken: 'berry', source: 'starter' },
      ],
    };
    return inspectExamples(oneSided).some((p) => p.kind === 'oneSided');
  })());
  check('too few examples is reported before anything else', (() => {
    const thin: ExampleSet = { id: 's', labels: ['berry'], examples: [] };
    return inspectExamples(thin)[0].kind === 'tooFew';
  })());
  check('two examples disagreeing about the same thing is a conflict', (() => {
    const conflicted: ExampleSet = {
      ...berrySet,
      examples: [...berrySet.examples,
        { id: 'x', inputToken: 'strawberry', labelToken: 'not-berry', source: 'starter' }],
    };
    const problems = inspectExamples(conflicted);
    return problems[0].kind === 'conflict';
  })());
  check('a conflicted example makes the helper unsure, not wrong', (() => {
    const conflicted: ExampleSet = {
      ...berrySet,
      examples: [...berrySet.examples,
        { id: 'x', inputToken: 'strawberry', labelToken: 'not-berry', source: 'starter' }],
    };
    const g = classify(conflicted, 'strawberry');
    return g.label === null && g.confidence === 'unsure';
  })());
  check('correcting an example replaces it rather than arguing with it', (() => {
    const fixed = correctExample(berrySet, 'strawberry', 'not-berry', 'fix1');
    const problems = inspectExamples(fixed);
    return classify(fixed, 'strawberry').label === 'not-berry'
      && !problems.some((p) => p.kind === 'conflict');
  })());
  check('an example outside the approved labels is refused', (() => {
    // No free text can become a label.
    const same = addExample(berrySet, {
      id: 'bad', inputToken: 'rock', labelToken: 'sandwich', source: 'child-corrected',
    });
    return same.examples.length === berrySet.examples.length;
  })());
  check('classification shows which examples decided it', (() => {
    const g = classify(berrySet, 'bolt');
    return g.basis.length === 1 && g.basis[0].id === 'e3';
  })());
  check('example problems are explained without technical words', (() => {
    // §8 bans "training distribution", "bias", "model weights" and friends.
    const banned = /bias|distribution|weights|probabilit|statistic|model|calibrat/i;
    return inspectExamples({ id: 'x', labels: ['a', 'b'], examples: [] })
      .every((p) => !banned.test(describeProblem(p)));
  })());
  check('an example set is a plain value the caller owns', (() => {
    // §7: every learned classification stays scoped. Nothing here is
    // global and nothing persists on its own.
    const src = readFileSync('src/agents/examples.ts', 'utf8');
    return !/localStorage|indexedDB|window\./.test(src);
  })());

  // ---- Phase 6: edge cases -------------------------------------------
  check('an edge case changes the world without touching the original', (() => {
    const w = garden(3);
    const before = JSON.stringify(w);
    applyPatches(w, {}, edgeCase('cannot-see').changedInitialState);
    return JSON.stringify(w) === before;
  })());
  check('the fog scenario really does stop the helper seeing', (() => {
    const { world: w } = applyPatches(garden(3), {}, edgeCase('cannot-see').changedInitialState);
    return w.subjects.some((s) => !s.clear);
  })());
  check('a helper that cannot see is unsure in the edge case, not wrong', (() => {
    const { world: w } = applyPatches(garden(1), {}, edgeCase('cannot-see').changedInitialState);
    return runAgent(gardener(), w).overallConfidence === 'unsure';
  })());
  check('the already-done scenario preloads memory', (() => {
    const { memory } = applyPatches(garden(3), initialMemory([wateredMemory]),
      edgeCase('already-done').changedInitialState);
    return (memory.watered as string[]).length === 2;
  })());
  check('the nothing-to-do scenario empties the world', (() => {
    const { world: w } = applyPatches(garden(3), {}, edgeCase('nothing-to-do').changedInitialState);
    return w.subjects.length === 0;
  })());
  check('a plan still ends tidily when there is nothing to do', (() => {
    const { world: w } = applyPatches(garden(3), {}, edgeCase('nothing-to-do').changedInitialState);
    const r = runAgent(gardener(), w);
    return r.trace.length === 0 && r.stoppedBecause === 'noRuleMatched';
  })());
  check('the same edge case is offered again on a replay, never a random one', (() => {
    // A random surprise would make "try again" a lottery; the child has
    // to be able to fix their plan and watch it hold.
    const w = garden(3);
    return pickEdgeCase(w, [])?.id === pickEdgeCase(w, [])?.id;
  })());
  check('an edge case that would change nothing here is not offered', (() => {
    const empty: AgentWorld = { subjects: [] };
    return !appliesTo(edgeCase('cannot-see'), empty);
  })());
  check('seen edge cases are not repeated', (() => {
    const w = garden(3);
    const first = pickEdgeCase(w, [])!;
    return pickEdgeCase(w, [first.id])?.id !== first.id;
  })());
  check('every edge case is phrased as an invitation, never a warning', (() => {
    // §12: no trick questions, no harsh failure, no shame, no timers.
    // Word-bounded on purpose — an earlier version of this check matched
    // "time" inside "This time," and reported a perfectly kind sentence.
    const harsh = /\b(fail(ed|s)?|wrong|lose|lost|mistake|hurry|quickly|timer|score)\b/i;
    return EDGE_CASES.every((e) => !harsh.test(e.childFacingPrompt));
  })());
  check('every edge case names what it teaches', (() => {
    return EDGE_CASES.every((e) => e.childFacingLesson.trim().length > 0
      && e.expectedConcepts.length > 0);
  })());

  // ---- Phase 7: more than one right answer ---------------------------
  const direct = evaluateSolution({
    worksAgainstGoal: true, commandCount: 3, usesLoop: false, usesFunction: false,
    usesCondition: false, hasStoppingRule: false, usesApproval: false,
    usesMemory: false, handlesEdgeCases: [],
  });
  const looped = evaluateSolution({
    worksAgainstGoal: true, commandCount: 2, usesLoop: true, usesFunction: false,
    usesCondition: false, hasStoppingRule: false, usesApproval: false,
    usesMemory: false, handlesEdgeCases: [],
  });
  const adaptive = evaluateSolution({
    worksAgainstGoal: true, commandCount: 2, usesLoop: true, usesFunction: false,
    usesCondition: false, hasStoppingRule: true, usesApproval: false,
    usesMemory: false, handlesEdgeCases: ['all-the-same'],
  });
  check('all three of the addendum’s example solutions work', (() => {
    return direct.works && looped.works && adaptive.works;
  })());
  check('the direct plan is described as direct, not as worse', (() => {
    return direct.explanationTokens.includes('direct')
      && TRAIT_PHRASE.direct === 'You gave every step.';
  })());
  check('a loop is called clever and a stopping rule adaptable', (() => {
    return looped.explanationTokens.includes('clever')
      && adaptive.explanationTokens.includes('adaptable');
  })());
  check('comparing two working plans never picks a winner', (() => {
    const c = compareSolutions(direct, adaptive);
    return c.bothWork && !('better' in c) && !('winner' in c) && !('score' in c);
  })());
  check('no trait is phrased as a deficiency', (() => {
    // Ranking words, not the word "not": "Does not do the same job twice"
    // is a strength stated plainly, and an earlier version of this check
    // failed it for containing "not ".
    const negative = /\b(worse|worst|best|better|bad|poor|inefficient|suboptimal|fail(ed|s)?|wrong)\b/i;
    return Object.values(TRAIT_PHRASE).every((p) => !negative.test(p))
      && Object.values(TRAIT_STRENGTH).every((p) => !negative.test(p));
  })());
  check('a shorter plan is noted as shorter, and nothing more', (() => {
    const c = compareSolutions(looped, direct);
    return c.childFacingSummary.includes('fewer tiles')
      && c.childFacingSummary.includes('good at different things');
  })());
  check('surviving an edge case earns "tested"', (() => {
    return adaptive.explanationTokens.includes('tested')
      && !direct.explanationTokens.includes('tested');
  })());
  check('asking first is a trait a plan HAS, not a cost it pays', (() => {
    const careful = evaluateSolution({
      worksAgainstGoal: true, commandCount: 4, usesLoop: false, usesFunction: false,
      usesCondition: false, hasStoppingRule: false, usesApproval: true,
      usesMemory: false, handlesEdgeCases: [],
    });
    return careful.explanationTokens.includes('careful')
      && careful.conceptsShown.includes('agents');
  })());
  check('every tradeoff card leaves both answers open', (() => {
    // §14: never declare one approach universally best.
    return TRADEOFF_CARDS.every((c) =>
      c.optionA.whenBetter.trim().length > 0 && c.optionB.whenBetter.trim().length > 0)
      && TRADEOFF_CARDS.every((c) => !('correct' in c.optionA) && !('correct' in c.optionB));
  })());
  check('a plan that does not reach the goal is compared gently', (() => {
    const broken = evaluateSolution({
      worksAgainstGoal: false, commandCount: 1, usesLoop: false, usesFunction: false,
      usesCondition: false, hasStoppingRule: false, usesApproval: false,
      usesMemory: false, handlesEdgeCases: [],
    });
    const c = compareSolutions(direct, broken);
    return !c.bothWork && !/wrong|fail/i.test(c.childFacingSummary);
  })());

  // ---- safe stopping (§11, §29) --------------------------------------
  check('a helper always stops, whatever the child builds', (() => {
    const forever = gardener({
      goal: { id: 'never', titleToken: 'never', priority: 1,
        successConditions: [{ kind: 'countAtLeast', memoryId: 'howMany', value: 999999 }] },
      rules: [{ id: 'loop', priority: 1, enabled: true,
        condition: { kind: 'always' }, action: { kind: 'skip' } }],
    });
    const r = runAgent(forever, garden(50));
    return r.trace.length <= DEFAULT_LIMITS.maximumSteps;
  })());
  check('the step limit is reported as a reason, never as an error', (() => {
    const forever = gardener({
      goal: { id: 'never', titleToken: 'never', priority: 1,
        successConditions: [{ kind: 'countAtLeast', memoryId: 'howMany', value: 999999 }] },
      rules: [{ id: 'act', priority: 1, enabled: true,
        condition: { kind: 'always' }, action: { kind: 'useTool', toolId: 'can' } }],
    });
    const r = runAgent(forever, garden(200));
    return r.stoppedBecause === 'stepLimit' || r.stoppedBecause === 'actionLimit';
  })());
  check('a helper keeps everything it built when it stops safely', (() => {
    const forever = gardener({
      goal: { id: 'never', titleToken: 'never', priority: 1,
        successConditions: [{ kind: 'countAtLeast', memoryId: 'howMany', value: 999999 }] },
      rules: [{ id: 'note', priority: 1, enabled: true,
        condition: { kind: 'memoryLacks', memoryId: 'watered' },
        action: { kind: 'remember', memoryId: 'watered' } }],
    });
    const r = runAgent(forever, garden(200));
    return r.trace.length > 0 && Array.isArray(r.memory.watered);
  })());
  check('the same subject cannot be worked on forever', (() => {
    const a = gardener({
      goal: { id: 'never', titleToken: 'never', priority: 1,
        successConditions: [{ kind: 'flagIs', memoryId: 'nope', value: true }] },
      rules: [{ id: 'again', priority: 1, enabled: true,
        condition: { kind: 'always' }, action: { kind: 'useTool', toolId: 'can' } }],
    });
    const one = flower('only-one');
    const r = runAgent(a, { subjects: [one, one, one, one, one, one, one, one] });
    const touched = r.trace.filter((t) => t.outcome.kind === 'acted').length;
    return touched <= DEFAULT_LIMITS.maximumRepeatsPerSubject;
  })());
  check('a limit of zero falls back to the default instead of freezing the level', (() => {
    // A cap of 0 means the helper stops before its first step, and the
    // level looks broken rather than protected.
    return withDefaults({ maximumSteps: 0 }).maximumSteps === DEFAULT_LIMITS.maximumSteps
      && withDefaults({ maximumActions: -3 }).maximumActions === DEFAULT_LIMITS.maximumActions;
  })());
  check('a corrupted save cannot remove a helper’s limits', (() => {
    return withDefaults({ maximumSteps: NaN }).maximumSteps === DEFAULT_LIMITS.maximumSteps
      && withDefaults(undefined).maximumSteps > 0;
  })());
  check('a beginner helper is gentler but no less protected', (() => {
    return BEGINNER_LIMITS.maximumSteps < DEFAULT_LIMITS.maximumSteps
      && BEGINNER_LIMITS.maximumSteps > 0
      && BEGINNER_LIMITS.maximumMemoryEntries > 0;
  })());
  check('every safe-stop reason has words a child can hear', (() => {
    const reasons = ['goalReached', 'stepLimit', 'actionLimit', 'memoryLimit',
      'approvalDeclined', 'cannotSee', 'noRuleMatched'] as const;
    return reasons.every((r) => SAFE_STOP_PHRASE[r].trim().length > 0);
  })());
  check('stopping because you were told no is not a failure', (() => {
    return isSuccessfulStop('approvalDeclined') && isSuccessfulStop('cannotSee')
      && isSuccessfulStop('goalReached');
  })());
  check('a full memory stops the helper rather than dropping what it knows', (() => {
    const tiny: AgentMemoryDefinition = { ...wateredMemory, maximumEntries: 2 };
    const a = gardener({
      memory: [tiny],
      goal: { id: 'never', titleToken: 'never', priority: 1,
        successConditions: [{ kind: 'countAtLeast', memoryId: 'watered', value: 99 }] },
      rules: [{ id: 'note', priority: 1, enabled: true,
        condition: { kind: 'memoryLacks', memoryId: 'watered' },
        action: { kind: 'remember', memoryId: 'watered' } }],
    });
    const r = runAgent(a, garden(6));
    return r.stoppedBecause === 'memoryLimit' && (r.memory.watered as string[]).length === 2;
  })());

  // ---- traces, BopLens and Think Trail (§18, §19) ---------------------
  check('every decision becomes a four-line explanation', (() => {
    const r = runAgent(gardener(), garden(1));
    const card = toLensCard(r.trace[0]);
    return card.iSaw.length > 0 && card.iRemembered.length > 0
      && card.iChose.length > 0 && card.thisHappened.length > 0;
  })());
  check('BopLens never says the helper wanted, believed or understood', (() => {
    // §19: no language implying the Bop is conscious.
    const banned = /\bwant|\bbelieve|\bunderstood|\bunderstand|\bfeel|\bthinks\b|\bhopes?\b/i;
    const r = runAgent(gardener({ requiresApprovalFor: ['can'] }), garden(2));
    const cards = r.trace.map((t) => toLensCard(t));
    const text = cards.flatMap((c) => [c.iSaw, c.iRemembered, c.iChose, c.thisHappened,
      ...c.details.map((d) => `${d.label} ${d.value}`)]).join(' ');
    return !banned.test(text);
  })());
  check('the lens explains why a rule won when others also matched', (() => {
    const a = gardener({
      rules: [
        { id: 'water', priority: 1, enabled: true,
          condition: { kind: 'always' }, action: { kind: 'useTool', toolId: 'can' } },
        { id: 'also-matches', priority: 2, enabled: true,
          condition: { kind: 'always' }, action: { kind: 'skip' } },
      ],
    });
    const card = toLensCard(runAgent(a, garden(1)).trace[0]);
    return card.details.some((d) => d.label === 'Other rules that matched');
  })());
  check('the lens says why the helper stopped', (() => {
    const a = gardener({ requiresApprovalFor: ['can'] });
    const r = runAgent(a, garden(2), { approvals: ['cancelled'] });
    const last = toLensCard(r.trace[r.trace.length - 1]);
    return last.details.some((d) => d.label === 'Why I stopped');
  })());
  check('confidence rides along with every explanation', (() => {
    const r = runAgent(gardener(), garden(1));
    const card = toLensCard(r.trace[0]);
    return card.confidenceFace.length > 0 && card.confidenceLabel.length > 0;
  })());
  check('an empty memory reads as "nothing yet", not as a blank', (() => {
    const r = runAgent(gardener(), garden(1));
    return toLensCard(r.trace[0]).iRemembered === 'Nothing yet.';
  })());
  check('trail rows plug straight into the existing Think Trail shape', (() => {
    const rows = toTrailRows(runAgent(gardener(), garden(2)).trace);
    return rows.length === 2 && rows.every((r) => typeof r.n === 'number'
      && typeof r.icon === 'string' && typeof r.text === 'string');
  })());
  check('asking for help is not marked with a cross', (() => {
    // §25: careful uncertainty must not look like a mistake.
    const a = gardener({
      rules: [{ id: 'ask', priority: 1, enabled: true,
        condition: { kind: 'always' }, action: { kind: 'askForHelp' } }],
    });
    const rows = toTrailRows(runAgent(a, garden(1)).trace);
    return rows[0].verdict !== 'no';
  })());
  check('walking past something IS marked, so the child has something to fix', (() => {
    const rows = toTrailRows(runAgent(gardener(), garden(1, ['happy'])).trace);
    return rows[0].verdict === 'no';
  })());
  check('tokens are resolved to names the child recognises', (() => {
    const r = runAgent(gardener(), garden(1));
    const card = toLensCard(r.trace[0], { can: 'watering can', flower: 'sunflower' });
    return card.thisHappened.includes('watering can') && card.iSaw.includes('sunflower');
  })());

  // ---- the shared engine is the only engine (§27) ---------------------
  check('nothing in the agent engine imports THREE or the DOM', (() => {
    const files = ['types', 'engine', 'rules', 'memory', 'confidence',
      'examples', 'approval', 'limits', 'trace', 'edgeCases', 'evaluate'];
    return files.every((f) => {
      const src = readFileSync(`src/agents/${f}.ts`, 'utf8');
      return !/from 'three'|document\.|window\./.test(src);
    });
  })());
  check('the engine needs no network, no model and no chat', (() => {
    // §28: the child-facing experience stays deterministic and explainable.
    const files = ['types', 'engine', 'rules', 'memory', 'confidence',
      'examples', 'approval', 'limits', 'trace', 'edgeCases', 'evaluate'];
    const banned = /fetch\(|XMLHttpRequest|openai|anthropic|WebSocket|prompt\(/i;
    return files.every((f) => !banned.test(readFileSync(`src/agents/${f}.ts`, 'utf8')));
  })());
  check('the engine draws no randomness and reads no clock', (() => {
    const files = ['engine', 'rules', 'memory', 'confidence', 'examples',
      'approval', 'limits', 'trace', 'edgeCases', 'evaluate'];
    return files.every((f) => {
      const src = readFileSync(`src/agents/${f}.ts`, 'utf8').replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '');
      return !/Math\.random|Date\.now|performance\.now/.test(src);
    });
  })());
}

// ============================================================
// Curriculum alignment — layers, worlds, agent ladder, transfer
// ============================================================
{
  check('the four-layer model and the curriculum agree completely', (() => {
    return validateAlignment().length === 0;
  })());
  check('every stage sits in exactly one learning layer', (() => {
    const counts = new Map<string, number>();
    for (const l of LEARNING_LAYERS) for (const s of l.stages) {
      counts.set(s, (counts.get(s) ?? 0) + 1);
    }
    return CURRICULUM_STAGES.every((s) => counts.get(s.id) === 1);
  })());
  check('every layer speaks to a child as well as to a grown-up', (() => {
    return LEARNING_LAYERS.every((l) => l.childFacingIdea.trim().length > 0
      && l.formalName.trim().length > 0);
  })());
  check('layerOfStage finds a home for all fourteen stages', (() => {
    return CURRICULUM_STAGES.every((s) => layerOfStage(s.id).id.length > 0);
  })());

  check('the world registry holds every world the app can reach', (() => {
    const ids = WORLDS.map((w) => w.id);
    return ['sparkle-meadow', 'bubble-bay', 'pattern-forest', 'robot-town',
      'gearworks-garage', 'agent-academy', 'app-lab', 'imagination-island']
      .every((w) => ids.includes(w as never));
  })());
  check('the level picker reads worlds from the registry, not its own list', (() => {
    // This drifted once already: the picker knew five worlds while the
    // curriculum named eight, and nothing noticed for months.
    const src = readFileSync('src/app/levelSelectScreen.ts', 'utf8');
    return src.includes("from '../data/worlds'")
      && !/WORLD_META[^=]*=\s*\{\s*'sparkle-meadow'/.test(src);
  })());
  check('every world says what a child walks away holding', (() => {
    // §2: every major learning journey produces something meaningful.
    return WORLDS.filter((w) => w.capstone !== null)
      .every((w) => w.capstone!.trim().length > 0);
  })());
  check('the trail is a subset of the worlds, in journey order', (() => {
    const trail = trailWorlds();
    const orders = trail.map((w) => w.order);
    return trail.length > 0 && trail.length <= WORLDS.length
      && orders.every((o, i) => i === 0 || o > orders[i - 1]);
  })());

  check('agent ideas start in the very first world', (() => {
    // §6: do not introduce all agent ideas only at the end.
    const first = agentProgressionFor('sparkle-meadow');
    return first !== null && first.introduces.length > 0;
  })());
  check('no world revisits an agent idea before one introduces it', (() => {
    return validateAlignment().every((i) => !i.problem.includes('before anything introduces'));
  })());
  check('every agent idea is introduced exactly once', (() => {
    const counts = new Map<string, number>();
    for (const p of AGENT_PROGRESSION) for (const c of p.introduces) {
      counts.set(c, (counts.get(c) ?? 0) + 1);
    }
    return AGENT_CONCEPTS.every((c) => counts.get(c.id) === 1);
  })());
  check('every agent idea is phrased as a question a child would ask', (() => {
    return AGENT_CONCEPTS.every((c) => c.childFacingQuestion.trim().endsWith('?'));
  })());
  check('progressive disclosure only offers ideas the child has met', (() => {
    // §30: a beginner sees goal + one tool + one rule, not the lot.
    const order = (id: string): number => WORLDS.find((w) => w.id === id)?.order ?? 99;
    const early = agentConceptsAvailableBy('sparkle-meadow', order as never);
    const late = agentConceptsAvailableBy('agent-academy', order as never);
    return early.length < late.length
      && !early.includes('confidence') && late.includes('confidence');
  })());
  check('the concept list comes back in a stable order every time', (() => {
    const order = (id: string): number => WORLDS.find((w) => w.id === id)?.order ?? 99;
    const a = agentConceptsAvailableBy('robot-town', order as never).join(',');
    const b = agentConceptsAvailableBy('robot-town', order as never).join(',');
    return a === b;
  })());

  check('ideas that travel name more than one world', (() => {
    return TRANSFER_CHALLENGES.every((t) => t.sites.length >= 2);
  })());
  check('a transfer prompt asks where else, never what is the answer', (() => {
    return TRANSFER_CHALLENGES.every((t) => /where else|other/i.test(t.childFacingPrompt));
  })());
  check('loops, conditions and functions all travel', (() => {
    return ['loops', 'conditions', 'functions'].every((s) => transferFor(s as never) !== null);
  })());
  check('stages with only one home are reported, not hidden', (() => {
    // An honest finding about how much content exists — not a failure.
    // Five stages sit here today; the number should go DOWN over time.
    const orphans = stagesWithoutTransfer();
    return Array.isArray(orphans) && orphans.length <= 6;
  })());
}


// ============================================================
// Agent Mission Builder, GlitchBops, and helper evidence
// ============================================================
{
  const mk = (over: Partial<AgentMission> = {}): AgentMission => ({
    ...newMission('m1', 'flowers-healthy', 1), ...over,
  });
  const rule = (id: string, whenCardId: string, doCardId: string): MissionRule =>
    ({ id, whenCardId, doCardId, enabled: true });

  // ---- Phase 8: the catalogue is closed ------------------------------
  check('the builder offers the eight goals the spec names', (() => {
    return MISSION_GOALS.length === 8;
  })());
  check('the builder offers the twelve tools the spec names', (() => {
    return MISSION_TOOLS.length === 12;
  })());
  check('every goal says what it is in words a child would use', (() => {
    return MISSION_GOALS.every((g) => g.childFacingTitle.trim().length > 0
      && !/\d|level|advanced|beginner/i.test(g.childFacingTitle));
  })());
  check('every goal names the things its world contains', (() => {
    return MISSION_GOALS.every((g) => g.subjectKinds.length > 0 && g.attributes.length > 0);
  })());
  check('every goal can actually be reached', (() => {
    return MISSION_GOALS.every((g) => g.successConditions.length > 0);
  })());
  check('goal ids and tool ids are unique', (() => {
    const g = MISSION_GOALS.map((x) => x.id);
    const t = MISSION_TOOLS.map((x) => x.id);
    return new Set(g).size === g.length && new Set(t).size === t.length;
  })());
  check('a tool is only offered where it makes sense', (() => {
    // A watering can is no use to a parcel.
    const parcels = missionGoal('deliver-packages');
    return !toolsForGoal(parcels).some((t) => t.id === 'watering-can');
  })());
  check('some tools ask a person no matter what the child chose', (() => {
    // §10: the lesson only lands if some things ask by nature.
    return MISSION_TOOLS.some((t) => t.requiresApproval);
  })());
  check('rule cards only mention things the chosen world has', (() => {
    const flowers = missionGoal('flowers-healthy');
    const cards = whenCardsFor(flowers);
    return cards.some((c) => c.id === 'is-droopy')
      && !cards.some((c) => c.id === 'is-metal');
  })());
  check('an action card only appears once its tool is picked', (() => {
    return doCardsFor([]).every((c) => c.needsTool === undefined)
      && doCardsFor(['watering-can']).some((c) => c.needsTool === 'watering-can');
  })());
  check('asking for help and stopping are always offered as actions', (() => {
    const ids = doCardsFor([]).map((c) => c.id);
    return ids.includes('ask') && ids.includes('stop');
  })());

  // ---- progressive disclosure (§16, §30) -----------------------------
  check('a first helper is goal, tools, rules and test — and nothing else', (() => {
    const steps = stepsFor([]);
    return steps.join(',') === 'goal,tools,rules,test';
  })());
  check('a first helper is still a complete working helper', (() => {
    // The point of §16: a beginner's helper is simpler, not crippled.
    const m = mk({ toolIds: ['watering-can'], rules: [rule('r1', 'is-droopy', 'use-watering-can')] });
    const r = runAgent(toAgent(m), scenarioFor('flowers-healthy'));
    return r.handled.length === 2;
  })());
  check('memory, limits and Ask First appear once the child has met them', (() => {
    const steps = stepsFor(['memory', 'stopping', 'approval', 'explanation']);
    return steps.includes('memory') && steps.includes('limits')
      && steps.includes('approval') && steps.includes('inspect');
  })());
  check('every builder step has a title and an icon', (() => {
    return BUILDER_STEPS.every((s) => STEP_TITLE[s].trim().length > 0
      && STEP_ICON[s].trim().length > 0);
  })());

  // ---- mission → agent ------------------------------------------------
  check('a mission becomes a runnable helper', (() => {
    const m = mk({ toolIds: ['watering-can'], rules: [rule('r1', 'is-droopy', 'use-watering-can')] });
    const a = toAgent(m);
    return a.rules.length === 1 && a.tools.length === 1 && a.goal.id === 'flowers-healthy';
  })());
  check('rule order is the order the child arranged, and that is priority', (() => {
    const m = mk({
      toolIds: ['watering-can'],
      rules: [rule('top', 'always', 'skip'), rule('bottom', 'always', 'use-watering-can')],
    });
    const a = toAgent(m);
    return a.rules[0].id === 'top' && a.rules[0].priority < a.rules[1].priority;
  })());
  check('a rule referring to a card that no longer exists is dropped, not fatal', (() => {
    // A catalogue entry can disappear between versions; twenty minutes of
    // a child's work should not disappear with it.
    const m = mk({ toolIds: ['watering-can'], rules: [rule('r1', 'ghost-card', 'use-watering-can')] });
    return toAgent(m).rules.length === 0;
  })());
  check('an approval gate for a tool that was removed is ignored', (() => {
    const m = mk({ toolIds: [], approvalToolIds: ['grabber'] });
    return toAgent(m).requiresApprovalFor.length === 0;
  })());
  check('a small helper gets a gentle budget, a bigger one gets more room', (() => {
    const small = limitsFor(mk({ rules: [rule('r1', 'always', 'skip')] }));
    const big = limitsFor(mk({
      rules: [rule('r1', 'always', 'skip'), rule('r2', 'always', 'skip'), rule('r3', 'always', 'skip')],
    }));
    return small.maximumSteps < big.maximumSteps;
  })());
  check('a chosen limit card overrides the default', (() => {
    return limitsFor(mk({ limitCardIds: ['stop-3'] })).maximumActions === 3;
  })());

  // ---- gaps are reported, never enforced ------------------------------
  check('a helper with no stopping rule still runs', (() => {
    // It is the helper Forever Fred exists to talk about. Blocking it
    // would delete the lesson.
    const m = mk({ toolIds: ['watering-can'], rules: [rule('r1', 'always', 'use-watering-can')] });
    return runAgent(toAgent(m), scenarioFor('flowers-healthy')).trace.length > 0;
  })());
  check('missing pieces are named as things to try', (() => {
    const kinds = missionGaps(mk()).map((g) => g.kind);
    return kinds.includes('noTool') && kinds.includes('noRule');
  })());
  check('a rule that can never get a turn is pointed out', (() => {
    const m = mk({
      toolIds: ['watering-can'],
      rules: [rule('catch', 'always', 'use-watering-can'), rule('never', 'is-droopy', 'skip')],
    });
    return missionGaps(m).some((g) => g.kind === 'ruleNeverRuns' && g.ruleId === 'never');
  })());
  check('every gap is phrased as a question, never as an error', (() => {
    return Object.values(GAP_PHRASE).every((p) => !/error|invalid|must|cannot|wrong/i.test(p));
  })());

  // ---- saving ---------------------------------------------------------
  check('a saved helper survives a round trip', (() => {
    const m = mk({ toolIds: ['watering-can'], rules: [rule('r1', 'is-droopy', 'use-watering-can')] });
    const back = parseMission(JSON.parse(JSON.stringify(m)));
    return back !== null && back.rules.length === 1 && back.toolIds[0] === 'watering-can';
  })());
  check('a corrupted helper is refused rather than half-read', (() => {
    return parseMission({ id: 'x' }) === null
      && parseMission(null) === null
      && parseMission({ id: 'x', goalId: 'not-a-goal' }) === null;
  })());
  check('a helper from a newer version is refused, not partly loaded', (() => {
    // A half-read helper would run with rules the child cannot see.
    return parseMission({ id: 'x', goalId: 'flowers-healthy', schemaVersion: 99 }) === null;
  })());
  check('junk inside a saved helper is dropped, not crashed on', (() => {
    const back = parseMission({
      id: 'x', goalId: 'flowers-healthy',
      toolIds: ['watering-can', 42, null], rules: [{ nonsense: true }, 7],
    });
    return back !== null && back.toolIds.length === 1 && back.rules.length === 0;
  })());
  check('a new helper starts empty but valid', (() => {
    const m = newMission('n1', 'sort-recycling', 1);
    return m.rules.length === 0 && m.toolIds.length === 0 && toAgent(m).goal.id === 'sort-recycling';
  })());

  // ---- scenarios -------------------------------------------------------
  check('every goal has a world to be tried in', (() => {
    return MISSION_GOALS.every((g) => {
      try { return scenarioFor(g.id).subjects.length > 0; } catch { return false; }
    });
  })());
  check('a test world mixes things that need doing with things that do not', (() => {
    // A world where everything matches would let "every time, use the
    // tool" look correct, and teach nothing about checking.
    const w = scenarioFor('flowers-healthy');
    return w.subjects.some((s) => s.attributes.includes('droopy'))
      && w.subjects.some((s) => !s.attributes.includes('droopy'));
  })());
  check('running a test never marks the shared scenario', (() => {
    const before = JSON.stringify(scenarioFor('flowers-healthy'));
    const m = mk({ toolIds: ['watering-can'], rules: [rule('r1', 'always', 'use-watering-can')] });
    runAgent(toAgent(m), scenarioFor('flowers-healthy'));
    return JSON.stringify(scenarioFor('flowers-healthy')) === before;
  })());
  check('every token a scenario uses has a word a child would say', (() => {
    for (const g of MISSION_GOALS) {
      for (const s of scenarioFor(g.id).subjects) {
        if (!SCENARIO_NAMES[s.kind]) return false;
        for (const a of s.attributes) if (!SCENARIO_NAMES[a]) return false;
      }
    }
    return true;
  })());

  // ---- Phase 10: GlitchBops ------------------------------------------
  check('all ten GlitchBops exist', (() => {
    return GLITCH_BOPS.length === 10;
  })());
  check('the four new ones are here', (() => {
    const ids = GLITCH_BOPS.map((g) => g.id);
    return ['echo', 'shortcut', 'guessy', 'example-mixer'].every((x) => ids.includes(x as never));
  })());
  check('every GlitchBop says what went wrong AND what to try', (() => {
    return GLITCH_BOPS.every((g) => g.childFacingPhrase.trim().length > 0
      && g.childFacingFix.trim().length > 0 && g.formalProblem.trim().length > 0);
  })());
  check('a GlitchBop describes the plan, never the child', (() => {
    // §17: friendly explanations of understandable mistakes. Never "you".
    return GLITCH_BOPS.every((g) => !/\byou\b|\byour\b/i.test(g.childFacingPhrase));
  })());
  check('every fix is a direction to look, never the answer', (() => {
    return GLITCH_BOPS.every((g) => g.childFacingFix.trim().endsWith('?'));
  })());
  check('a GlitchBop is detected from a real run, never authored', (() => {
    // Authored, it would be a cutscene and the child would learn that
    // Forever Fred is a character rather than a shape their plan can have.
    const src = readFileSync('src/agents/glitchBops.ts', 'utf8');
    return /detectGlitchBops/.test(src) && !/levelId|declaredGlitch/.test(src);
  })());
  check('running out of budget summons Forever Fred', (() => {
    const found = detectGlitchBops({ trace: [], stoppedBecause: 'stepLimit' });
    return found.some((s) => s.bop.id === 'forever-fred');
  })());
  check('a rule that never gets a turn summons Shortcut', (() => {
    const m = mk({
      toolIds: ['watering-can'],
      rules: [rule('catch', 'always', 'use-watering-can'), rule('never', 'is-droopy', 'skip')],
    });
    const found = detectGlitchBops({ trace: [], mission: m });
    return found.some((s) => s.bop.id === 'shortcut' && s.ruleId === 'never');
  })());
  check('acting on something it could not see summons Guessy', (() => {
    const m = mk({ toolIds: ['watering-can'], rules: [rule('r1', 'always', 'use-watering-can')] });
    const foggy: AgentWorld = {
      subjects: [{ subjectId: 'f1', kind: 'flower', attributes: ['droopy'], clear: false }],
    };
    const r = runAgent(toAgent(m), foggy);
    return detectGlitchBops({ trace: r.trace }).some((s) => s.bop.id === 'guessy');
  })());
  check('a one-sided example set summons Example Mixer', (() => {
    const oneSided: ExampleSet = {
      id: 's', labels: ['berry', 'not-berry'],
      examples: [
        { id: 'a', inputToken: 'strawberry', labelToken: 'berry', source: 'starter' },
        { id: 'b', inputToken: 'raspberry', labelToken: 'berry', source: 'starter' },
      ],
    };
    return detectGlitchBops({ trace: [], examples: oneSided })
      .some((s) => s.bop.id === 'example-mixer');
  })());
  check('a run where nothing matched summons Mixy', (() => {
    const m = mk({ toolIds: ['watering-can'], rules: [rule('r1', 'is-metal', 'use-watering-can')] });
    const r = runAgent(toAgent(m), scenarioFor('flowers-healthy'));
    return detectGlitchBops({ trace: r.trace }).some((s) => s.bop.id === 'mixy');
  })());
  check('a clean run summons nobody', (() => {
    const m = mk({
      toolIds: ['watering-can'],
      rules: [rule('r1', 'is-droopy', 'use-watering-can'), rule('r2', 'is-happy', 'skip')],
    });
    const r = runAgent(toAgent(m), scenarioFor('flowers-healthy'));
    return detectGlitchBops({ trace: r.trace, mission: m, stoppedBecause: r.stoppedBecause })
      .length === 0;
  })());
  check('the same GlitchBop never turns up twice in one run', (() => {
    const m = mk({ toolIds: ['watering-can'], rules: [rule('r1', 'always', 'use-watering-can')] });
    const foggy: AgentWorld = {
      subjects: [
        { subjectId: 'f1', kind: 'flower', attributes: [], clear: false },
        { subjectId: 'f2', kind: 'flower', attributes: [], clear: false },
      ],
    };
    const found = detectGlitchBops({ trace: runAgent(toAgent(m), foggy).trace });
    return new Set(found.map((s) => s.bop.id)).size === found.length;
  })());
  check('only one GlitchBop is put in front of a child at a time', (() => {
    // A run can genuinely have several problems; saying so all at once is
    // how a child stops reading.
    const found = detectGlitchBops({ trace: [], stoppedBecause: 'stepLimit' });
    return headlineGlitch(found) !== null && headlineGlitch([]) === null;
  })());

  // ---- Phase 12: what a grown-up is told ------------------------------
  check('choosing a goal is itself evidence', (() => {
    // §22: deciding what should happen IS the skill on this curriculum.
    return evidenceForMission(mk()).some((e) => e.requirement === 'agent-goal');
  })());
  check('an Ask First checkpoint is recorded', (() => {
    const m = mk({ toolIds: ['grabber'], approvalToolIds: ['grabber'] });
    return evidenceForMission(m).some((e) => e.requirement === 'agent-approval');
  })());
  check('a confident run evidences nothing about confidence', (() => {
    // Two rules, so every flower is covered. A ONE-rule helper is
    // genuinely unsure about the happy flowers it has no rule for, which
    // is the engine being right — an earlier version of this check used
    // one rule and failed for that reason.
    const m = mk({
      toolIds: ['watering-can'],
      rules: [rule('r1', 'is-droopy', 'use-watering-can'), rule('r2', 'is-happy', 'skip')],
    });
    const r = runAgent(toAgent(m), scenarioFor('flowers-healthy'));
    return !evidenceForHelperRun(m, r).some((e) => e.requirement === 'agent-confidence');
  })());
  check('adding the missing rule is what makes a helper confident', (() => {
    const one = mk({ toolIds: ['watering-can'], rules: [rule('r1', 'is-droopy', 'use-watering-can')] });
    const two = mk({
      toolIds: ['watering-can'],
      rules: [rule('r1', 'is-droopy', 'use-watering-can'), rule('r2', 'is-happy', 'skip')],
    });
    const w = scenarioFor('flowers-healthy');
    return runAgent(toAgent(one), w).overallConfidence === 'unsure'
      && runAgent(toAgent(two), w).overallConfidence === 'confident';
  })());
  check('seeing a helper be unsure IS evidence', (() => {
    const m = mk({ toolIds: ['watering-can'], rules: [rule('r1', 'always', 'use-watering-can')] });
    const foggy: AgentWorld = {
      subjects: [{ subjectId: 'f1', kind: 'flower', attributes: [], clear: false }],
    };
    const r = runAgent(toAgent(m), foggy);
    return evidenceForHelperRun(m, r).some((e) => e.requirement === 'agent-confidence');
  })());
  check('a failed surprise records nothing, and never a deficit', (() => {
    // §23: never diagnose ability.
    return evidenceForEdgeCase('a lesson', false).length === 0
      && evidenceForEdgeCase('A good plan checks first.', true).length === 1;
  })());
  check('every helper evidence id is one the curriculum declares', (() => {
    const declared = new Set(stage('agents').evidenceRequirements.map((r) => r.id));
    const m = mk({
      toolIds: ['grabber'], approvalToolIds: ['grabber'], memoryIds: ['done'],
      rules: [rule('r1', 'always', 'skip')],
    });
    return evidenceForMission(m).every((e) => declared.has(e.requirement));
  })());
  check('a parent sentence describes what happened, never a score', (() => {
    const m = mk({
      toolIds: ['watering-can'], rules: [rule('r1', 'is-droopy', 'use-watering-can')],
      limitCardIds: ['stop-3'],
    });
    const s = parentSentenceForMission(m, runAgent(toAgent(m), scenarioFor('flowers-healthy')));
    return s.includes('keep the flowers healthy') && !/\d+%|score|rank|better than/i.test(s);
  })());
  check('a parent sentence never invents progress', (() => {
    const s = parentSentenceForMission(mk(), null);
    return !/reached its goal|still worked/.test(s);
  })());
  check('every parent sentence offers something to talk about away from the screen', (() => {
    const m = mk({ toolIds: ['grabber'], approvalToolIds: ['grabber'] });
    return offScreenIdeaForMission(m).trim().length > 0;
  })());
  check('helper evidence is recorded per helper, so editing does not inflate it', (() => {
    // The store merges on (levelId, requirement); a helper's id is its
    // levelId, so saving twice updates rather than stacks.
    const src = readFileSync('src/app/missionScreen.ts', 'utf8');
    return /levelId: m\.id/.test(src);
  })());

  // ---- the builder itself ----------------------------------------------
  check('there is no free text anywhere in the builder', (() => {
    // §29's "approved goal, approved tools, approved actions" is true by
    // construction only if a child cannot type.
    const src = readFileSync('src/ui/agents/missionBuilder.ts', 'utf8');
    return !/<input|createElement\('input'|contentEditable|el\('input'/.test(src);
  })());
  check('Ask First offers three answers, not two', (() => {
    // §10: continue, change the plan, cancel. A native confirm gives two.
    const src = readFileSync('src/ui/dialogs.ts', 'utf8');
    const at = src.indexOf('export function askFirst');
    const block = src.slice(at, at + 2200);
    return /'approved'/.test(block) && /'changed'/.test(block) && /'cancelled'/.test(block);
  })());
  check('the builder never blocks the tab with a native prompt', (() => {
    const src = readFileSync('src/ui/agents/missionBuilder.ts', 'utf8');
    return !/window\.confirm|window\.prompt|window\.alert/.test(src);
  })());
  check('a run cannot ask a child an unbounded number of questions', (() => {
    const src = readFileSync('src/ui/agents/missionBuilder.ts', 'utf8');
    return /MAX_APPROVAL_ASKS/.test(src);
  })());
  check('BopLens keeps every line as text, not as animation', (() => {
    // §4: essential reasoning must not hide inside an animation.
    const src = readFileSync('src/ui/agents/bopLensPanel.ts', 'utf8');
    return /iSaw/.test(src) && /iRemembered/.test(src)
      && /iChose/.test(src) && /thisHappened/.test(src);
  })());
  check('the confidence face is hidden from screen readers, the word is not', (() => {
    const src = readFileSync('src/ui/agents/bopLensPanel.ts', 'utf8');
    return /face\.setAttribute\('aria-hidden', 'true'\)/.test(src);
  })());
  check('selected cards are marked by more than colour', (() => {
    // §30 and the app's own a11y rule: never colour alone.
    const css = readFileSync('src/styles/main.css', 'utf8');
    return css.includes(".mb-card.on::after") && /aria-pressed/.test(
      readFileSync('src/ui/agents/missionBuilder.ts', 'utf8'));
  })());
  check('every builder control clears the tap floor', (() => {
    const css = readFileSync('src/styles/main.css', 'utf8');
    // Brace-anchored: plain '.mb-rule' also matches '.mb-rules {', which
    // is a flex column with no min-height, and the check failed on the
    // wrong block. Same trap as an earlier '.sel2-strip' check.
    for (const sel of ['.helpers-goal, .mb-card {', '.mb-tab {', '.helper-open {', '.mb-rule {']) {
      const at = css.indexOf(sel);
      if (at < 0) return false;
      const block = css.slice(at, css.indexOf('}', at));
      if (!/min-height:\s*var\(--tap-(min|floor)\)/.test(block)) return false;
    }
    return true;
  })());
  check('high contrast and reduced motion reach the builder', (() => {
    const css = readFileSync('src/styles/main.css', 'utf8');
    return css.includes('body.high-contrast .mb-card')
      && /@media \(prefers-reduced-motion: reduce\) \{\s*\.mb-card/.test(css);
  })());
  check('every CSS variable the styles use is actually defined', (() => {
    // I invented --panel and --panel-hi while building the Mission
    // Builder. Neither existed, so every surface in it rendered
    // transparent and the page showed through the BopLens panel.
    const tokens = readFileSync('src/styles/tokens.css', 'utf8');
    const defined = new Set(
      [...tokens.matchAll(/(--[a-z0-9-]+)\s*:/gi)].map((m) => m[1]),
    );
    // Properties the app sets on an element at runtime are defined too,
    // just not in a stylesheet — `--i`, `--cols`, `--deck-h` and friends.
    const scanned = ['src/app', 'src/ui', 'src/rendering'];
    const walk = (dir: string): string[] => readdirSync(dir, { withFileTypes: true })
      .flatMap((e) => (e.isDirectory() ? walk(`${dir}/${e.name}`)
        : e.name.endsWith('.ts') ? [`${dir}/${e.name}`] : []));
    for (const f of scanned.flatMap(walk)) {
      const src = readFileSync(f, 'utf8');
      for (const m of src.matchAll(/(?:setProperty\(|style=")\s*['"`]?\s*(--[a-z0-9-]+)/gi)) {
        defined.add(m[1]);
      }
    }

    const files = ['src/styles/main.css', 'src/styles/components.css'];
    const missing = new Set<string>();
    for (const f of files) {
      const css = readFileSync(f, 'utf8');
      // Locally-defined variables count too — a file may declare its own.
      // Any position, not just line start: `.th-meadow { --isle: … }`
      // declares a token on the same line as its selector.
      for (const m of css.matchAll(/(--[a-z0-9-]+)\s*:/gi)) defined.add(m[1]);
      // Only references with NO fallback. `var(--deck-h, 190px)` is safe
      // by construction; `var(--panel)` renders as nothing at all, which
      // is the bug this check exists for.
      for (const m of css.matchAll(/var\((--[a-z0-9-]+)\s*([,)])/g)) {
        if (m[2] === ')' && !defined.has(m[1])) missing.add(m[1]);
      }
    }
    // Re-scan once, since a later file may define what an earlier one used.
    for (const f of files) {
      const css = readFileSync(f, 'utf8');
      for (const m of css.matchAll(/var\((--[a-z0-9-]+)/g)) {
        if (defined.has(m[1])) missing.delete(m[1]);
      }
    }
    if (missing.size > 0) console.log('    undefined tokens:', [...missing].join(', '));
    return missing.size === 0;
  })());
  check('the BopLens panel is sized against the visible viewport', (() => {
    // A percentage max-height inside the scrolling builder resolved
    // against the scroll height, so the panel ran off the screen.
    const css = readFileSync('src/styles/main.css', 'utf8');
    const at = css.indexOf('.lens-panel {');
    const block = css.slice(at, css.indexOf('}', at));
    return /max-height:\s*[0-9]+dvh/.test(block) && /position:\s*fixed/.test(block);
  })());
  check('helpers are reachable from the level picker', (() => {
    const src = readFileSync('src/app/levelSelectScreen.ts', 'utf8');
    return /onHelpers/.test(src) && /'My Helpers'/.test(src);
  })());
  check('the helper library is local, with no upload path', (() => {
    // Comments stripped first: the file's own header says "there is no
    // upload path in this file", which an earlier version of this check
    // read as an upload path.
    const src = readFileSync('src/storage/missionStore.ts', 'utf8')
      .replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '');
    return !/fetch\(|XMLHttpRequest|upload/i.test(src);
  })());
  check('a full storage quota does not lose the helper on screen', (() => {
    const src = readFileSync('src/storage/missionStore.ts', 'utf8');
    return /return false;/.test(src) && /catch/.test(src);
  })());
  check('the library is capped, and drops the oldest not the newest', (() => {
    const src = readFileSync('src/storage/missionStore.ts', 'utf8');
    return /MAX_HELPERS/.test(src) && /sort\(\(a, b\) => b\.updatedAt - a\.updatedAt\)/.test(src);
  })());
}


// ============================================================
// Device-report fixes — chrome icons, board framing, deck, drag
// ============================================================
{
  check('a round icon button sizes its glyph off the button, not off text', (() => {
    // Measured on a real phone: the icon box came out 90x50 inside a 56px
    // circular button, and an SVG with a square viewBox letterboxes rather
    // than stretches, so the glyph drew at 27px. That is what made the
    // cog read as a small white starburst.
    const css = readFileSync('src/styles/components.css', 'utf8');
    const at = css.indexOf('.cb-btn.s-circle .cb-btn-icon {');
    if (at < 0) return false;
    const block = css.slice(at, css.indexOf('}', at));
    return /width:\s*calc\(var\(--tap-min\)/.test(block)
      && /height:\s*calc\(var\(--tap-min\)/.test(block);
  })());
  check('the icon box is square', (() => {
    const css = readFileSync('src/styles/components.css', 'utf8');
    const at = css.indexOf('.cb-btn-icon {');
    const block = css.slice(at, css.indexOf('}', at));
    const w = /width:\s*([0-9.]+)em/.exec(block);
    const h = /height:\s*([0-9.]+)em/.exec(block);
    return !!w && !!h && w[1] === h[1];
  })());
  check('the two icon-size rules no longer multiply each other', (() => {
    // A 2em box and then 55% of it left a 24px glyph in a 56px button.
    const css = readFileSync('src/styles/components.css', 'utf8');
    return !/\.cb-btn\.s-circle \.cb-btn-icon svg \{[^}]*55%/.test(css);
  })());
  check('the settings cog is drawn as a gear, not a filled star', (() => {
    const src = readFileSync('src/ui/components/button.ts', 'utf8');
    const at = src.indexOf('export const ICON_SETTINGS');
    const block = src.slice(at, at + 600);
    return /stroke="currentColor"/.test(block) && /<circle/.test(block);
  })());

  check('the board frame does not have to contain the whole off-board perch', (() => {
    // Framing both of her outer edges made her the binding constraint, so
    // the board came back small with a lap of empty meadow around it.
    const src = readFileSync('src/app/gameScreen.ts', 'utf8');
    return /const inner = perch\.x > center\.x/.test(src)
      && !/for \(const dx of \[-HALF_W, HALF_W\]\)/.test(src);
  })());
  check('the camera tilts to suit the shape of the screen', (() => {
    // A grid is wider than it is deep, so on a tall phone the fit is
    // always width-limited and half the screen went unused.
    const src = readFileSync('src/engine/stage.ts', 'utf8');
    return /tiltForAspect/.test(src) && /camera\.aspect/.test(src);
  })());
  check('a pinned preset view is never re-aimed by the aspect ratio', (() => {
    // The Gearworks benches face a back wall; tilting them would look at
    // the ceiling.
    const src = readFileSync('src/engine/stage.ts', 'utf8');
    return /viewPinned/.test(src) && /if \(this\.viewPinned\) return;/.test(src);
  })());
  check('head room scales with the board, not with the viewport', (() => {
    // 7% of screen height was enough while the board was small; once it
    // grew, a character's head drew over the logo.
    const src = readFileSync('src/engine/stage.ts', 'utf8');
    return /freeH \* 0\.2/.test(src);
  })());

  check('the slot row fits on screen instead of scrolling out of it', (() => {
    // Eight 54px slots came to 481px on a 390px phone, so the last one
    // sat off the right edge behind a gesture a four-year-old will not try.
    const css = readFileSync('src/styles/main.css', 'utf8');
    const at = css.indexOf('.deck-sequence .slot {');
    if (at < 0) return false;
    const block = css.slice(at, css.indexOf('}', at));
    return /flex:\s*1 1 0/.test(block) && /aspect-ratio:\s*1/.test(block);
  })());
  check('a toast wraps rather than growing past both edges', (() => {
    const css = readFileSync('src/styles/main.css', 'utf8');
    const at = css.indexOf('.toast {');
    const block = css.slice(at, css.indexOf('}', at));
    return /max-width:/.test(block) && !/white-space:\s*nowrap/.test(block);
  })());

  check('drag listeners live on the window, not on the dragged tile', (() => {
    // The tile is replaced by renderSlots() mid-drag, which destroyed the
    // pointerup handler with its element — so endDrag() never ran and the
    // ghost stayed on the page. That is the floating command tile.
    const src = readFileSync('src/ui/programDeck.ts', 'utf8');
    return /window\.addEventListener\('pointerup', this\.onPointerUp\)/.test(src)
      && !/tile\.addEventListener\('pointerup'/.test(src);
  })());
  check('starting a drag sweeps away any ghost that outlived its drag', (() => {
    const src = readFileSync('src/ui/programDeck.ts', 'utf8');
    return /querySelectorAll\('\.drag-ghost'\)/.test(src);
  })());
  check('losing pointer capture cannot strand a drag', (() => {
    const src = readFileSync('src/ui/programDeck.ts', 'utf8');
    return /releaseDragListeners/.test(src)
      && /try \{ tile\.setPointerCapture/.test(src);
  })());
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
