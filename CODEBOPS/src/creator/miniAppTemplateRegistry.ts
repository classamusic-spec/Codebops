/**
 * The template registry (spec §13) — one source of truth for what each of
 * the six kits allows and how big a project may get.
 *
 * Limits live HERE and nowhere else. No UI file may invent a cap, and the
 * validator reads the same numbers the builder does, so "the builder let me
 * do it but the runtime refused" cannot happen.
 *
 * Every allow-list is a positive list. A command, trigger or component that
 * a template does not name is impossible in that kit.
 */
import type {
  MiniAppType, MiniAppComponentType, MiniAppTriggerType, MiniAppCommandType,
  MiniAppConditionType, MiniAppVariableType, MiniAppGoalType,
} from './miniAppTypes';
import type { CurriculumStageId } from '../data/curriculum/stages';
import type { MiniAppRuntimeBudget } from './miniAppProject';

export interface MiniAppTemplateDefinition {
  readonly id: string;
  readonly type: MiniAppType;
  readonly title: string;
  readonly childFacingDescription: string;
  /** Difficulty shown as shapes, never a grade (spec §9.2). */
  readonly difficultyShapes: 1 | 2 | 3;
  readonly layoutTemplateId: string;

  // ---- hard limits (spec §11) ----
  readonly maximumScenes: number;
  /**
   * Per scene. For the five single-scene kits this is also the total; the
   * Story kit is the one where the distinction matters.
   */
  readonly maximumComponentsPerScene: number;
  readonly maximumScripts: number;
  readonly maximumCommandsPerScript: number;
  /** How deeply control blocks may nest. 1 = flat. */
  readonly maximumCommandDepth: number;
  readonly maximumVariables: number;
  readonly maximumJobs: number;
  readonly maximumChoicesPerDecision: number;

  // ---- allow-lists ----
  readonly allowedComponents: readonly MiniAppComponentType[];
  readonly allowedTriggers: readonly MiniAppTriggerType[];
  readonly allowedCommands: readonly MiniAppCommandType[];
  readonly allowedConditions: readonly MiniAppConditionType[];
  readonly allowedVariables: readonly MiniAppVariableType[];
  readonly supportedGoals: readonly MiniAppGoalType[];

  readonly curriculumPrerequisites: readonly CurriculumStageId[];
  /** Concepts a finished project of this kind genuinely exercises. */
  readonly conceptsTaught: readonly CurriculumStageId[];
  readonly runtimeBudget: MiniAppRuntimeBudget;
}

/** Actions every kit gets: feedback that cannot break anything. */
const BASE_ACTIONS: readonly MiniAppCommandType[] = [
  'playSound', 'animate', 'show', 'hide', 'changeState', 'changeColor', 'wait',
];

const budget = (
  maximumSteps: number, maximumEventChainDepth = 4, maximumMessagesPerStep = 4,
): MiniAppRuntimeBudget => ({ maximumSteps, maximumEventChainDepth, maximumMessagesPerStep });

export const MINI_APP_TEMPLATES: readonly MiniAppTemplateDefinition[] = [
  // ---------------------------------------------------------------- Tap Magic
  {
    id: 'tap-react-basic',
    type: 'tap-react',
    title: 'Tap Magic',
    childFacingDescription: 'Tap something and watch it react.',
    difficultyShapes: 1,
    layoutTemplateId: 'single-stage',
    maximumScenes: 1,
    maximumComponentsPerScene: 5,
    maximumScripts: 4,
    maximumCommandsPerScript: 6,
    maximumCommandDepth: 1,
    maximumVariables: 0,
    maximumJobs: 0,
    maximumChoicesPerDecision: 0,
    allowedComponents: ['character', 'button', 'imageObject', 'prop', 'light', 'soundPad', 'speechBubble'],
    allowedTriggers: ['onAppStart', 'onTap'],
    allowedCommands: [...BASE_ACTIONS, 'lightOn', 'lightOff', 'speakPhrase', 'celebrate', 'sendToSlot'],
    allowedConditions: [],
    allowedVariables: [],
    supportedGoals: ['somethingReacts'],
    curriculumPrerequisites: ['sequence', 'events'],
    conceptsTaught: ['sequence', 'events', 'state'],
    runtimeBudget: budget(60, 2, 0),
  },

  // ----------------------------------------------------------- Sort and Match
  {
    id: 'sorting-basic',
    type: 'sorting',
    title: 'Sort and Match',
    childFacingDescription: 'Sort things into the right place.',
    difficultyShapes: 2,
    layoutTemplateId: 'sort-bench',
    maximumScenes: 1,
    maximumComponentsPerScene: 8,
    maximumScripts: 5,
    maximumCommandsPerScript: 8,
    maximumCommandDepth: 2,
    maximumVariables: 2,
    maximumJobs: 0,
    maximumChoicesPerDecision: 0,
    allowedComponents: ['collectible', 'basket', 'counter', 'button', 'prop', 'character', 'speechBubble'],
    allowedTriggers: ['onAppStart', 'onTap', 'onDrop', 'onCounterChanged'],
    allowedCommands: [
      ...BASE_ACTIONS, 'if', 'ifElse', 'sendToSlot', 'returnHome',
      'increaseCounter', 'decreaseCounter', 'resetCounter', 'celebrate', 'showWin', 'speakPhrase',
    ],
    allowedConditions: ['colorEquals', 'shapeEquals', 'typeEquals', 'matchesTarget', 'counterEquals', 'counterAtLeast', 'basketIsFull'],
    allowedVariables: ['number'],
    supportedGoals: ['allSorted', 'reachScore'],
    curriculumPrerequisites: ['conditions', 'if-else', 'data'],
    conceptsTaught: ['conditions', 'if-else', 'data', 'variables', 'state'],
    runtimeBudget: budget(120, 3, 2),
  },

  // -------------------------------------------------------------- Story Stage
  {
    id: 'story-basic',
    type: 'story',
    title: 'Story Stage',
    childFacingDescription: 'Tell a story with up to three scenes.',
    difficultyShapes: 2,
    layoutTemplateId: 'story-stage',
    maximumScenes: 3,
    maximumComponentsPerScene: 5,
    maximumScripts: 6,
    maximumCommandsPerScript: 8,
    maximumCommandDepth: 2,
    maximumVariables: 1,
    maximumJobs: 0,
    maximumChoicesPerDecision: 2,
    allowedComponents: ['character', 'prop', 'choiceCard', 'speechBubble', 'scenePortal', 'imageObject'],
    allowedTriggers: ['onAppStart', 'onSceneStart', 'onTap', 'onMessage', 'onChoiceSelected'],
    allowedCommands: [
      ...BASE_ACTIONS, 'speakPhrase', 'sendToSlot', 'returnHome',
      'sendMessage', 'waitForMessage', 'changeScene', 'celebrate', 'if', 'ifElse',
    ],
    allowedConditions: ['stateIs'],
    allowedVariables: ['token'],
    supportedGoals: ['storyReachesEnd'],
    curriculumPrerequisites: ['sequence', 'events', 'messages'],
    conceptsTaught: ['sequence', 'events', 'messages', 'state', 'decomposition'],
    runtimeBudget: budget(140, 4, 3),
  },

  // -------------------------------------------------------------- Music Maker
  {
    id: 'music-basic',
    type: 'music',
    title: 'Music Maker',
    childFacingDescription: 'Build a soundboard or a looping song.',
    difficultyShapes: 2,
    layoutTemplateId: 'music-desk',
    maximumScenes: 1,
    maximumComponentsPerScene: 8,
    maximumScripts: 8,
    maximumCommandsPerScript: 12,
    maximumCommandDepth: 2,
    maximumVariables: 1,
    maximumJobs: 3,
    maximumChoicesPerDecision: 0,
    allowedComponents: ['soundPad', 'instrument', 'button', 'light', 'character'],
    allowedTriggers: ['onAppStart', 'onTap', 'onSignal', 'onMessage'],
    allowedCommands: [
      ...BASE_ACTIONS, 'repeatN', 'callJob', 'sendMessage', 'waitForMessage',
      'lightOn', 'lightOff', 'celebrate',
    ],
    allowedConditions: [],
    allowedVariables: ['number'],
    supportedGoals: ['songPlays'],
    curriculumPrerequisites: ['events', 'loops', 'functions'],
    conceptsTaught: ['events', 'loops', 'functions', 'parallelism', 'messages'],
    runtimeBudget: budget(200, 4, 4),
  },

  // ---------------------------------------------------------- Tiny Game Maker
  {
    id: 'mini-game-collect',
    type: 'mini-game',
    title: 'Tiny Game Maker',
    childFacingDescription: 'Make a small game with a score and a win.',
    difficultyShapes: 3,
    layoutTemplateId: 'game-board',
    maximumScenes: 1,
    maximumComponentsPerScene: 10,
    maximumScripts: 8,
    maximumCommandsPerScript: 10,
    maximumCommandDepth: 2,
    maximumVariables: 2,
    maximumJobs: 2,
    maximumChoicesPerDecision: 0,
    allowedComponents: ['player', 'collectible', 'goal', 'counter', 'friendlyObstacle', 'button', 'prop'],
    allowedTriggers: [
      'onAppStart', 'onTap', 'onItemCollected', 'onGoalReached',
      'onCounterChanged', 'onStateChanged',
    ],
    allowedCommands: [
      ...BASE_ACTIONS, 'move', 'turn', 'if', 'ifElse', 'repeatN',
      'increaseCounter', 'decreaseCounter', 'resetCounter',
      'returnHome', 'sendToSlot', 'showWin', 'celebrate', 'callJob',
    ],
    allowedConditions: ['counterEquals', 'counterAtLeast', 'stateIs', 'matchesTarget'],
    allowedVariables: ['number', 'boolean'],
    supportedGoals: ['collectAll', 'reachTheGoal', 'reachScore'],
    curriculumPrerequisites: ['variables', 'state', 'conditions', 'events'],
    conceptsTaught: ['variables', 'state', 'conditions', 'events', 'loops', 'debugging'],
    runtimeBudget: budget(200, 4, 2),
  },

  // ----------------------------------------------------------- Helper Builder
  {
    id: 'helper-basic',
    type: 'helper',
    title: 'Helper Builder',
    childFacingDescription: 'Teach a helper a goal, tools and rules.',
    difficultyShapes: 3,
    layoutTemplateId: 'helper-yard',
    maximumScenes: 1,
    maximumComponentsPerScene: 8,
    maximumScripts: 6,
    maximumCommandsPerScript: 10,
    maximumCommandDepth: 2,
    maximumVariables: 2,
    maximumJobs: 2,
    maximumChoicesPerDecision: 0,
    allowedComponents: ['character', 'helperTool', 'prop', 'memoryContainer', 'sensor', 'counter', 'speechBubble'],
    allowedTriggers: ['onAppStart', 'onTap', 'onSensorDetected', 'onStateChanged', 'onCounterChanged'],
    allowedCommands: [
      ...BASE_ACTIONS, 'if', 'ifElse', 'repeatUntil', 'askForApproval', 'askForHelp',
      'increaseCounter', 'resetCounter', 'speakPhrase', 'sendToSlot', 'returnHome', 'callJob', 'celebrate',
    ],
    allowedConditions: ['stateIs', 'sensorSees', 'colorEquals', 'typeEquals', 'counterAtLeast'],
    allowedVariables: ['number', 'boolean', 'token'],
    supportedGoals: ['helperFinishes'],
    curriculumPrerequisites: ['agents', 'conditions', 'state', 'data'],
    conceptsTaught: ['agents', 'conditions', 'state', 'data', 'variables', 'decomposition'],
    runtimeBudget: budget(160, 3, 2),
  },
];

const BY_ID = new Map(MINI_APP_TEMPLATES.map((t) => [t.id, t]));
const BY_TYPE = new Map<MiniAppType, MiniAppTemplateDefinition[]>();
for (const t of MINI_APP_TEMPLATES) {
  const list = BY_TYPE.get(t.type) ?? [];
  list.push(t);
  BY_TYPE.set(t.type, list);
}

export function miniAppTemplate(id: string): MiniAppTemplateDefinition | null {
  return BY_ID.get(id) ?? null;
}

export function templatesForType(type: MiniAppType): MiniAppTemplateDefinition[] {
  return BY_TYPE.get(type) ?? [];
}

/** Total components a project of this template may hold, across all scenes. */
export function maximumComponentsTotal(t: MiniAppTemplateDefinition): number {
  return t.maximumComponentsPerScene * t.maximumScenes;
}
