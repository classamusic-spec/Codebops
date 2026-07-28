/**
 * Everything the Agent Mission Builder is allowed to offer (§15).
 *
 * A closed catalogue, on purpose. A child picks from these lists and
 * cannot type anything, which is what makes §29's "approved goal,
 * approved tools, approved actions" structural rather than a promise —
 * an unapproved helper is not something the builder can express.
 *
 * The lists come straight from the addendum: eight goals (§15.1), twelve
 * tools (§15.2), and the rule/memory/limit/approval shapes from §15.3–6.
 *
 * Pure data. No DOM, no THREE.
 */
import type {
  AgentGoalDefinition, AgentToolDefinition, AgentMemoryDefinition, AgentToken,
  AgentCondition, AgentAction,
} from '../../agents/types';
import type { AgentConcept } from '../curriculum/agentProgression';

// ---------------------------------------------------------------------
// Goals (§15.1)
// ---------------------------------------------------------------------

export interface MissionGoal extends AgentGoalDefinition {
  readonly icon: string;
  /** The words on the card. */
  readonly childFacingTitle: string;
  /** Things this world contains, so the tool and rule lists can be honest. */
  readonly subjectKinds: readonly AgentToken[];
  /** Attributes those things can have — the vocabulary for rules. */
  readonly attributes: readonly AgentToken[];
}

export const MISSION_GOALS: readonly MissionGoal[] = [
  {
    id: 'flowers-healthy', titleToken: 'flowers-healthy', icon: '🌻',
    childFacingTitle: 'Keep the flowers healthy', priority: 1,
    successConditions: [{ kind: 'allHandled', subjectKind: 'flower' }],
    subjectKinds: ['flower'], attributes: ['droopy', 'happy', 'new'],
  },
  {
    id: 'sort-recycling', titleToken: 'sort-recycling', icon: '♻️',
    childFacingTitle: 'Sort the recycling', priority: 1,
    successConditions: [{ kind: 'allHandled', subjectKind: 'item' }],
    subjectKinds: ['item'], attributes: ['metal', 'paper', 'squishy', 'mystery'],
  },
  {
    id: 'deliver-packages', titleToken: 'deliver-packages', icon: '📦',
    childFacingTitle: 'Deliver the packages', priority: 1,
    successConditions: [{ kind: 'allHandled', subjectKind: 'parcel' }],
    subjectKinds: ['parcel'], attributes: ['fragile', 'heavy', 'small'],
  },
  {
    id: 'lighthouse-working', titleToken: 'lighthouse-working', icon: '🗼',
    childFacingTitle: 'Keep the lighthouse working', priority: 1,
    successConditions: [{ kind: 'flagIs', memoryId: 'lamp-on', value: true }],
    subjectKinds: ['ship', 'cloud'], attributes: ['near', 'far', 'dark', 'foggy'],
  },
  {
    id: 'pack-picnic', titleToken: 'pack-picnic', icon: '🧺',
    childFacingTitle: 'Pack a picnic', priority: 1,
    successConditions: [{ kind: 'countAtLeast', memoryId: 'packed', value: 3 }],
    subjectKinds: ['snack'], attributes: ['sweet', 'crunchy', 'squishy'],
  },
  {
    id: 'care-for-pet', titleToken: 'care-for-pet', icon: '🐢',
    childFacingTitle: 'Look after a pretend pet', priority: 1,
    successConditions: [{ kind: 'allHandled', subjectKind: 'pet' }],
    subjectKinds: ['pet'], attributes: ['hungry', 'sleepy', 'playful'],
  },
  {
    id: 'organise-tools', titleToken: 'organise-tools', icon: '🧰',
    childFacingTitle: 'Tidy the workshop tools', priority: 1,
    successConditions: [{ kind: 'allHandled', subjectKind: 'tool' }],
    subjectKinds: ['tool'], attributes: ['sharp', 'round', 'long'],
  },
  {
    id: 'prepare-party', titleToken: 'prepare-party', icon: '🎈',
    childFacingTitle: 'Help get ready for a party', priority: 1,
    successConditions: [{ kind: 'countAtLeast', memoryId: 'ready', value: 3 }],
    subjectKinds: ['balloon', 'plate'], attributes: ['popped', 'clean', 'dirty'],
  },
];

const GOAL_BY_ID = new Map(MISSION_GOALS.map((g) => [g.id, g]));
export function missionGoal(id: string): MissionGoal {
  const g = GOAL_BY_ID.get(id);
  if (!g) throw new Error(`[missions] Unknown goal "${id}"`);
  return g;
}

// ---------------------------------------------------------------------
// Tools (§15.2)
// ---------------------------------------------------------------------

export interface MissionTool extends AgentToolDefinition {
  readonly childFacingTitle: string;
}

/**
 * `requiresApproval` is set here, on the tool, for the ones that are
 * dangerous by nature. §10's lesson only lands if some things ask no
 * matter what the child remembers — a grabber that can remove a plant
 * should not depend on a four-year-old having added a gate.
 */
export const MISSION_TOOLS: readonly MissionTool[] = [
  { id: 'watering-can', titleToken: 'watering can', childFacingTitle: 'Watering can', icon: '🚿',
    capabilities: ['water'], allowedTargets: ['flower', 'pet'], requiresApproval: false },
  { id: 'scanner', titleToken: 'scanner', childFacingTitle: 'Scanner', icon: '📡',
    capabilities: ['observe'], allowedTargets: [], requiresApproval: false },
  { id: 'basket', titleToken: 'basket', childFacingTitle: 'Basket', icon: '🧺',
    capabilities: ['carry'], allowedTargets: [], requiresApproval: false },
  { id: 'map', titleToken: 'map', childFacingTitle: 'Map', icon: '🗺️',
    capabilities: ['move'], allowedTargets: [], requiresApproval: false },
  { id: 'signal', titleToken: 'signal', childFacingTitle: 'Signal', icon: '📨',
    capabilities: ['signal'], allowedTargets: [], requiresApproval: false },
  { id: 'grabber', titleToken: 'grabber', childFacingTitle: 'Grabber', icon: '🦾',
    capabilities: ['grab'], allowedTargets: [], requiresApproval: true },
  { id: 'sorting-gate', titleToken: 'sorting gate', childFacingTitle: 'Sorting gate', icon: '🚪',
    capabilities: ['sort'], allowedTargets: ['item', 'parcel'], requiresApproval: false },
  { id: 'light', titleToken: 'light', childFacingTitle: 'Light', icon: '💡',
    capabilities: ['signal'], allowedTargets: [], requiresApproval: false },
  { id: 'bell', titleToken: 'bell', childFacingTitle: 'Bell', icon: '🔔',
    capabilities: ['signal'], allowedTargets: [], requiresApproval: false },
  { id: 'memory-crystal', titleToken: 'memory crystal', childFacingTitle: 'Memory crystal', icon: '💎',
    capabilities: ['remember'], allowedTargets: [], requiresApproval: false },
  { id: 'counter', titleToken: 'counter', childFacingTitle: 'Counter', icon: '🔢',
    capabilities: ['count'], allowedTargets: [], requiresApproval: false },
  { id: 'magnifying-lens', titleToken: 'magnifying lens', childFacingTitle: 'Magnifying lens', icon: '🔍',
    capabilities: ['observe'], allowedTargets: [], requiresApproval: false },
];

const TOOL_BY_ID = new Map(MISSION_TOOLS.map((t) => [t.id, t]));
export function missionTool(id: string): MissionTool {
  const t = TOOL_BY_ID.get(id);
  if (!t) throw new Error(`[missions] Unknown tool "${id}"`);
  return t;
}

/** Tools that make sense for a goal — a watering can is no use to a parcel. */
export function toolsForGoal(goal: MissionGoal): readonly MissionTool[] {
  return MISSION_TOOLS.filter((t) =>
    t.allowedTargets.length === 0 || t.allowedTargets.some((k) => goal.subjectKinds.includes(k)));
}

// ---------------------------------------------------------------------
// Rules (§15.3)
// ---------------------------------------------------------------------

/**
 * A rule is assembled from a WHEN card and a DO card, never typed.
 * Both halves are drawn from the goal's own vocabulary, so a rule that
 * mentions something the world does not contain cannot be built.
 */
export interface WhenCard {
  readonly id: string;
  readonly childFacingText: string;
  readonly icon: string;
  readonly condition: AgentCondition;
  /** Only offered when the goal has this attribute. Empty = always. */
  readonly needsAttribute?: AgentToken;
}

export interface DoCard {
  readonly id: string;
  readonly childFacingText: string;
  readonly icon: string;
  readonly action: AgentAction;
  /** Only offered when this tool has been picked. */
  readonly needsTool?: string;
}

export function whenCardsFor(goal: MissionGoal): readonly WhenCard[] {
  const cards: WhenCard[] = [
    { id: 'always', childFacingText: 'Every time', icon: '🔁', condition: { kind: 'always' } },
    { id: 'not-done', childFacingText: 'If I have not done it yet', icon: '💎',
      condition: { kind: 'memoryLacks', memoryId: 'done' } },
    { id: 'already-done', childFacingText: 'If I already did it', icon: '✅',
      condition: { kind: 'memoryContains', memoryId: 'done' } },
    { id: 'cannot-see', childFacingText: 'If I cannot see it properly', icon: '🌫️',
      condition: { kind: 'observationUnclear' } },
  ];
  for (const attribute of goal.attributes) {
    cards.push({
      id: `is-${attribute}`, childFacingText: `If it is ${attribute}`, icon: '👀',
      condition: { kind: 'hasAttribute', value: attribute }, needsAttribute: attribute,
    });
    cards.push({
      id: `not-${attribute}`, childFacingText: `If it is not ${attribute}`, icon: '🚫',
      condition: { kind: 'notAttribute', value: attribute }, needsAttribute: attribute,
    });
  }
  return cards;
}

export function doCardsFor(toolIds: readonly string[]): readonly DoCard[] {
  const cards: DoCard[] = [];
  for (const id of toolIds) {
    const tool = TOOL_BY_ID.get(id);
    if (!tool) continue;
    cards.push({
      id: `use-${id}`, childFacingText: `Use the ${tool.childFacingTitle.toLowerCase()}`,
      icon: tool.icon, action: { kind: 'useTool', toolId: id }, needsTool: id,
    });
  }
  cards.push(
    { id: 'remember', childFacingText: 'Remember this one', icon: '💎',
      action: { kind: 'remember', memoryId: 'done' } },
    { id: 'count', childFacingText: 'Count it', icon: '🔢',
      action: { kind: 'count', memoryId: 'howMany', by: 1 } },
    { id: 'skip', childFacingText: 'Leave it alone', icon: '⏭️', action: { kind: 'skip' } },
    { id: 'ask', childFacingText: 'Ask for help', icon: '🙋', action: { kind: 'askForHelp' } },
    { id: 'stop', childFacingText: 'Stop and wait', icon: '🛑', action: { kind: 'stopSafely' } },
  );
  return cards;
}

// ---------------------------------------------------------------------
// Memory (§15.4)
// ---------------------------------------------------------------------

/**
 * Three memories, offered to every mission.
 *
 * Fixed ids rather than child-named ones: the WHEN and DO cards above
 * refer to them by name, and letting a child rename a memory would mean
 * either free text or a rename that silently breaks every rule using it.
 */
export const MISSION_MEMORY: readonly AgentMemoryDefinition[] = [
  { id: 'done', titleToken: 'ones I have finished', valueType: 'token-set',
    initialValue: [], maximumEntries: 16, resetPolicy: 'level' },
  { id: 'howMany', titleToken: 'how many', valueType: 'number',
    initialValue: 0, resetPolicy: 'level' },
  { id: 'lamp-on', titleToken: 'the lamp', valueType: 'boolean',
    initialValue: false, resetPolicy: 'level' },
];

export const MEMORY_CHILD_TITLE: Readonly<Record<string, string>> = {
  done: 'Ones I have finished',
  howMany: 'How many',
  'lamp-on': 'Is the lamp on',
};

// ---------------------------------------------------------------------
// Limits (§15.5)
// ---------------------------------------------------------------------

export interface LimitCard {
  readonly id: string;
  readonly childFacingText: string;
  readonly icon: string;
  /** Which field of AgentLimits it sets, and to what. */
  readonly field: 'maximumActions' | 'maximumMemoryEntries' | 'maximumRepeatsPerSubject';
  readonly value: number;
}

export const LIMIT_CARDS: readonly LimitCard[] = [
  { id: 'stop-3', childFacingText: 'Stop after 3 jobs', icon: '3️⃣', field: 'maximumActions', value: 3 },
  { id: 'stop-5', childFacingText: 'Stop after 5 jobs', icon: '5️⃣', field: 'maximumActions', value: 5 },
  { id: 'stop-10', childFacingText: 'Stop after 10 jobs', icon: '🔟', field: 'maximumActions', value: 10 },
  { id: 'remember-few', childFacingText: 'Only remember a few', icon: '💎', field: 'maximumMemoryEntries', value: 4 },
  { id: 'once-each', childFacingText: 'Only once for each one', icon: '☝️', field: 'maximumRepeatsPerSubject', value: 1 },
];

// ---------------------------------------------------------------------
// Progressive disclosure (§16, §30)
// ---------------------------------------------------------------------

/** The builder's steps, in order. */
export type BuilderStep =
  | 'goal' | 'tools' | 'rules' | 'memory' | 'limits' | 'approval' | 'test' | 'inspect';

export const BUILDER_STEPS: readonly BuilderStep[] = [
  'goal', 'tools', 'rules', 'memory', 'limits', 'approval', 'test', 'inspect',
];

export const STEP_TITLE: Readonly<Record<BuilderStep, string>> = {
  goal: 'Choose a goal',
  tools: 'Pick tools',
  rules: 'Make rules',
  memory: 'Add memory',
  limits: 'Add limits',
  approval: 'Ask first',
  test: 'Try it',
  inspect: 'See why',
};

export const STEP_ICON: Readonly<Record<BuilderStep, string>> = {
  goal: '🎯', tools: '🧰', rules: '📜', memory: '💎',
  limits: '🛑', approval: '🙋', test: '▶️', inspect: '🔍',
};

/** The agent concept each step is really teaching. */
export const STEP_CONCEPT: Readonly<Record<BuilderStep, AgentConcept>> = {
  goal: 'goal', tools: 'tool', rules: 'rule', memory: 'memory',
  limits: 'stopping', approval: 'approval', test: 'plan', inspect: 'explanation',
};

/**
 * Which steps to show.
 *
 * §16: "Do not expose every step immediately to beginners." A first
 * helper is goal → tool → one rule → test, and that is a complete,
 * working helper — not a crippled one. The rest appear as the child
 * meets the ideas elsewhere in the game.
 */
export function stepsFor(available: readonly AgentConcept[]): readonly BuilderStep[] {
  const always: BuilderStep[] = ['goal', 'tools', 'rules', 'test'];
  return BUILDER_STEPS.filter((s) => always.includes(s) || available.includes(STEP_CONCEPT[s]));
}
