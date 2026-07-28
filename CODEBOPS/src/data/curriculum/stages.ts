/**
 * The official CodeBops curriculum — ONE registry, the single source of
 * truth for the whole app.
 *
 * Fourteen stages in a fixed order. Levels do not restate curriculum
 * rules; they declare which stages they touch (see levelMeta.ts) and
 * everything else — unlocking, the learning-journey map, parent
 * reporting, Code Peek wording and dev-time validation — reads from
 * here. Pure data + pure functions: no DOM, no THREE.
 */

export type CurriculumStageId =
  | 'sequence' | 'events' | 'loops' | 'conditions' | 'if-else'
  | 'functions' | 'variables' | 'state' | 'messages' | 'parallelism'
  | 'debugging' | 'decomposition' | 'data' | 'agents';

/** The five ways a concept must be met before it counts as learned. */
export type LearningPhase = 'discover' | 'guide' | 'build' | 'debug' | 'create';

export const LEARNING_PHASES: readonly LearningPhase[] = [
  'discover', 'guide', 'build', 'debug', 'create',
];

export type WorldId =
  | 'sparkle-meadow' | 'bubble-bay' | 'pattern-forest' | 'robot-town'
  | 'gearworks-garage' | 'agent-academy' | 'imagination-island'
  /** Zip's App Lab — the creative capstone, where concepts get applied. */
  | 'app-lab';

/** A concrete, observable thing a child does that shows understanding. */
export interface EvidenceRequirement {
  readonly id: string;
  /** Written so it can be shown to a grown-up verbatim. */
  readonly description: string;
}

export interface CurriculumStageDefinition {
  readonly id: CurriculumStageId;
  readonly order: number;
  /** The real computing term (grown-up facing). */
  readonly codingName: string;
  /** The words we actually say to a child. */
  readonly childFacingLanguage: string;
  readonly description: string;
  readonly icon: string;
  readonly prerequisites: readonly CurriculumStageId[];
  readonly introductoryWorlds: readonly WorldId[];
  readonly practiceWorlds: readonly WorldId[];
  readonly transferWorlds: readonly WorldId[];
  readonly evidenceRequirements: readonly EvidenceRequirement[];
}

const ev = (id: string, description: string): EvidenceRequirement => ({ id, description });

export const CURRICULUM_STAGES: readonly CurriculumStageDefinition[] = [
  {
    id: 'sequence', order: 1, codingName: 'Sequence',
    childFacingLanguage: 'Put the steps in order.',
    description: 'Instructions run one after another, and the order changes the result.',
    icon: '🔢',
    prerequisites: [],
    introductoryWorlds: ['sparkle-meadow'],
    practiceWorlds: ['bubble-bay', 'pattern-forest', 'robot-town', 'gearworks-garage'],
    transferWorlds: ['imagination-island'],
    evidenceRequirements: [
      ev('seq-order', 'Places instructions in a functional order'),
      ev('seq-predict', 'Predicts what will happen next'),
      ev('seq-swap', 'Repairs two swapped instructions'),
    ],
  },
  {
    id: 'events', order: 2, codingName: 'Events',
    childFacingLanguage: 'When this happens, start.',
    description: 'A program can wait for something to happen before it runs.',
    icon: '⚡',
    prerequisites: ['sequence'],
    introductoryWorlds: ['sparkle-meadow'],
    practiceWorlds: ['gearworks-garage'],
    transferWorlds: ['imagination-island'],
    evidenceRequirements: [
      ev('evt-trigger', 'Selects an appropriate trigger'),
      ev('evt-connect', 'Connects an event to an action'),
      ev('evt-distinguish', 'Distinguishes starting now from starting when something happens'),
    ],
  },
  {
    id: 'loops', order: 3, codingName: 'Loops',
    childFacingLanguage: 'Do it again.',
    description: 'Repeated work can be written once and repeated.',
    icon: '🔁',
    prerequisites: ['sequence'],
    introductoryWorlds: ['bubble-bay'],
    practiceWorlds: ['gearworks-garage'],
    transferWorlds: ['imagination-island'],
    evidenceRequirements: [
      ev('loop-spot', 'Recognizes repeated steps'),
      ev('loop-replace', 'Replaces repeated commands with a loop'),
      ev('loop-count', 'Chooses a useful repetition count'),
      ev('loop-stop', 'Adds a stopping condition where required'),
    ],
  },
  {
    id: 'conditions', order: 4, codingName: 'Conditions',
    childFacingLanguage: 'Check before you choose.',
    description: 'A program can look at the world before it acts.',
    icon: '🔍',
    prerequisites: ['sequence'],
    introductoryWorlds: ['pattern-forest'],
    practiceWorlds: ['gearworks-garage'],
    transferWorlds: ['imagination-island'],
    evidenceRequirements: [
      ev('cond-check', 'Checks information before acting'),
      ev('cond-choose', 'Uses a condition to choose an action'),
    ],
  },
  {
    id: 'if-else', order: 5, codingName: 'If–Else',
    childFacingLanguage: 'This way or that way.',
    description: 'One check can lead to two different outcomes.',
    icon: '🔀',
    prerequisites: ['conditions'],
    introductoryWorlds: ['pattern-forest'],
    practiceWorlds: ['gearworks-garage'],
    transferWorlds: ['imagination-island'],
    evidenceRequirements: [
      ev('ifelse-two', 'Creates two outcomes'),
      ev('ifelse-assign', 'Correctly assigns an action to each branch'),
      ev('ifelse-repair', 'Repairs reversed branches'),
    ],
  },
  {
    id: 'functions', order: 6, codingName: 'Functions',
    childFacingLanguage: 'Save this job.',
    description: 'A named job can be written once and used many times.',
    icon: '📋',
    prerequisites: ['sequence'],
    introductoryWorlds: ['robot-town'],
    practiceWorlds: ['gearworks-garage'],
    transferWorlds: ['imagination-island'],
    evidenceRequirements: [
      ev('fn-create', 'Creates a reusable Job Card'),
      ev('fn-reuse', 'Calls the job more than once'),
      ev('fn-edit', 'Updates the job and observes all calls change'),
    ],
  },
  {
    id: 'variables', order: 7, codingName: 'Variables',
    childFacingLanguage: 'Remember a number.',
    description: 'A machine can hold a value and change it as it works.',
    icon: '🔢',
    prerequisites: ['sequence', 'loops'],
    introductoryWorlds: ['gearworks-garage'],
    practiceWorlds: ['agent-academy'],
    transferWorlds: ['imagination-island'],
    evidenceRequirements: [
      ev('var-container', 'Uses a counter, dial, basket, battery, or memory container'),
      ev('var-update', 'Updates its value'),
      ev('var-decide', 'Uses the value in a decision'),
    ],
  },
  {
    id: 'state', order: 8, codingName: 'State',
    childFacingLanguage: 'What is happening now?',
    description: 'A machine is always in one situation, and that changes what happens next.',
    icon: '🎭',
    prerequisites: ['variables', 'conditions'],
    introductoryWorlds: ['gearworks-garage'],
    practiceWorlds: ['agent-academy'],
    transferWorlds: ['imagination-island'],
    evidenceRequirements: [
      ev('state-identify', 'Identifies whether a machine is running or stopped'),
      ev('state-predict', 'Predicts an action based on current state'),
      ev('state-mismatch', 'Notices a state mismatch'),
    ],
  },
  {
    id: 'messages', order: 9, codingName: 'Messages',
    childFacingLanguage: 'Tell another Bop.',
    description: 'One program can signal another to get things done together.',
    icon: '📡',
    prerequisites: ['events'],
    introductoryWorlds: ['robot-town'],
    practiceWorlds: ['gearworks-garage'],
    transferWorlds: ['imagination-island'],
    evidenceRequirements: [
      ev('msg-send', 'Sends a signal'),
      ev('msg-start', 'Starts another Bop or machine from the signal'),
      ev('msg-wait', 'Waits for a signal when needed'),
    ],
  },
  {
    id: 'parallelism', order: 10, codingName: 'Parallelism',
    childFacingLanguage: 'Work at the same time.',
    description: 'Two programs can run together, which means timing matters.',
    icon: '⚙️',
    prerequisites: ['events', 'messages'],
    introductoryWorlds: ['robot-town'],
    practiceWorlds: ['gearworks-garage'],
    transferWorlds: ['imagination-island'],
    evidenceRequirements: [
      ev('par-coordinate', 'Coordinates two running programs'),
      ev('par-dependency', 'Identifies a dependency'),
      ev('par-timing', 'Repairs a timing or synchronization problem'),
    ],
  },
  {
    id: 'debugging', order: 11, codingName: 'Debugging',
    childFacingLanguage: 'Find the mixed-up step.',
    description: 'When a plan misbehaves, you can find the step at fault and fix just that.',
    icon: '🔧',
    prerequisites: ['sequence'],
    // Debugging is cross-curricular: it is introduced immediately and
    // practised in EVERY world (see the addendum, section 8).
    introductoryWorlds: ['sparkle-meadow'],
    practiceWorlds: ['bubble-bay', 'pattern-forest', 'robot-town', 'gearworks-garage', 'agent-academy'],
    transferWorlds: ['imagination-island'],
    evidenceRequirements: [
      ev('dbg-inspect', 'Inspects the Think Trail'),
      ev('dbg-identify', 'Identifies an unexpected step'),
      ev('dbg-change', 'Changes the relevant command'),
      ev('dbg-retest', 'Retests without discarding the entire program'),
    ],
  },
  {
    id: 'decomposition', order: 12, codingName: 'Decomposition',
    childFacingLanguage: 'Split a big job into smaller jobs.',
    description: 'A big mission becomes easy when it is broken into small pieces.',
    icon: '🧩',
    prerequisites: ['functions'],
    introductoryWorlds: ['robot-town'],
    practiceWorlds: ['gearworks-garage'],
    transferWorlds: ['imagination-island'],
    evidenceRequirements: [
      ev('dec-split', 'Splits one mission into smaller jobs'),
      ev('dec-assign', 'Assigns jobs appropriately'),
      ev('dec-combine', 'Combines smaller jobs into a complete solution'),
    ],
  },
  {
    id: 'data', order: 13, codingName: 'Data',
    childFacingLanguage: 'Sort what you noticed.',
    description: 'Things can be grouped by what they are like, and those groups guide choices.',
    icon: '📊',
    prerequisites: ['conditions'],
    introductoryWorlds: ['pattern-forest'],
    practiceWorlds: ['gearworks-garage', 'agent-academy'],
    transferWorlds: ['imagination-island'],
    evidenceRequirements: [
      ev('data-sort', 'Sorts or classifies observations'),
      ev('data-property', 'Uses a property such as color, shape, or type'),
      ev('data-use', 'Uses collected information in a condition'),
    ],
  },
  {
    id: 'agents', order: 14, codingName: 'Agents',
    childFacingLanguage: 'Give your helper a goal, tools, rules, and memory.',
    description: 'A helper with a goal can choose its own steps — and still asks you first.',
    icon: '🤖',
    prerequisites: ['state', 'variables', 'data', 'conditions'],
    introductoryWorlds: ['agent-academy'],
    practiceWorlds: ['agent-academy'],
    transferWorlds: ['imagination-island'],
    evidenceRequirements: [
      ev('agent-goal', 'Defines a goal'),
      ev('agent-tools', 'Selects appropriate tools'),
      ev('agent-rule', 'Creates a rule'),
      ev('agent-memory', 'Uses or clears memory'),
      ev('agent-confidence', 'Interprets confidence'),
      ev('agent-approval', 'Adds a human-approval checkpoint'),
    ],
  },
];

// ---------- lookups ----------

const BY_ID = new Map(CURRICULUM_STAGES.map((s) => [s.id, s]));

export function stage(id: CurriculumStageId): CurriculumStageDefinition {
  const s = BY_ID.get(id);
  if (!s) throw new Error(`[curriculum] Unknown stage "${id}"`);
  return s;
}

export function isStageId(id: string): id is CurriculumStageId {
  return BY_ID.has(id as CurriculumStageId);
}

/** Worlds where a stage shows up at all (for the journey map). */
export function worldsForStage(id: CurriculumStageId): WorldId[] {
  const s = stage(id);
  return [...new Set([...s.introductoryWorlds, ...s.practiceWorlds, ...s.transferWorlds])];
}

/** Prerequisites closed over the graph, in curriculum order. */
export function allPrerequisites(id: CurriculumStageId): CurriculumStageId[] {
  const seen = new Set<CurriculumStageId>();
  const walk = (sid: CurriculumStageId): void => {
    for (const p of stage(sid).prerequisites) {
      if (seen.has(p)) continue;
      seen.add(p);
      walk(p);
    }
  };
  walk(id);
  return CURRICULUM_STAGES.filter((s) => seen.has(s.id)).map((s) => s.id);
}
