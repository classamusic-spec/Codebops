/**
 * Curriculum metadata for every level in the app.
 *
 * Kept in ONE registry rather than scattered through level definitions,
 * so curriculum questions ("where is If–Else taught?", "does anything
 * assess Data before introducing it?") are answered from a single place
 * and can be validated automatically (see validate.ts).
 */
import type { CurriculumStageId, LearningPhase, WorldId } from './stages';

export interface LevelCurriculumMetadata {
  readonly levelId: string;
  readonly world: WorldId;
  /** Concepts this level is the first real meeting with. */
  readonly introducedConcepts: readonly CurriculumStageId[];
  /** Concepts exercised but not newly taught. */
  readonly practicedConcepts: readonly CurriculumStageId[];
  /** Concepts the level actually judges (drives stars / evidence). */
  readonly assessedConcepts: readonly CurriculumStageId[];
  readonly prerequisites: readonly CurriculumStageId[];
  readonly difficulty: LearningPhase;
  /** Evidence requirement ids this level can produce. */
  readonly evidenceEvents: readonly string[];
  /** Shown to the child as the "big idea" of the level. */
  readonly childFacingLearningPhrase: string;
}

type M = LevelCurriculumMetadata;
const m = (
  levelId: string, world: WorldId, difficulty: LearningPhase,
  intro: CurriculumStageId[], practiced: CurriculumStageId[], assessed: CurriculumStageId[],
  prereq: CurriculumStageId[], evidence: string[], phrase: string,
): M => ({
  levelId, world, difficulty,
  introducedConcepts: intro, practicedConcepts: practiced, assessedConcepts: assessed,
  prerequisites: prereq, evidenceEvents: evidence, childFacingLearningPhrase: phrase,
});

export const LEVEL_CURRICULUM: readonly M[] = [
  // ---------------- Sparkle Meadow: Sequence, Events, Debugging ----------------
  m('sm-1', 'sparkle-meadow', 'discover', ['sequence'], [], ['sequence'], [],
    ['seq-order', 'seq-predict'], 'Put the steps in order.'),
  m('sm-2', 'sparkle-meadow', 'guide', ['events', 'debugging'], ['sequence'],
    ['sequence', 'events', 'debugging'], ['sequence'],
    ['seq-order', 'evt-trigger', 'evt-connect', 'seq-swap', 'dbg-identify', 'dbg-change', 'dbg-retest'],
    'When this happens, start.'),

  // ---------------- Bubble Bay: Loops + Debugging ----------------
  m('bb-1', 'bubble-bay', 'discover', ['loops'], ['sequence'], ['loops'], ['sequence'],
    ['loop-spot'], 'Do it again.'),
  m('bb-2', 'bubble-bay', 'guide', [], ['loops', 'sequence'], ['loops'], ['sequence'],
    ['loop-replace', 'loop-count'], 'One loop can do the work of many steps.'),
  m('bb-3', 'bubble-bay', 'build', [], ['loops', 'sequence'], ['loops'], ['sequence'],
    ['loop-replace', 'loop-count'], 'Choose how many times to repeat.'),
  m('bb-debug', 'bubble-bay', 'debug', [], ['debugging', 'loops'], ['debugging', 'loops'], ['sequence'],
    ['dbg-inspect', 'dbg-identify', 'dbg-change', 'dbg-retest'], 'Find the mixed-up step.'),
  m('bb-creative', 'bubble-bay', 'create', [], ['loops', 'sequence'], ['loops'], ['loops'],
    ['loop-replace'], 'Use loops in your own idea.'),

  // ---------------- Pattern Forest: Conditions, If–Else, Data, Debugging ----------------
  m('pf-1', 'pattern-forest', 'discover', ['conditions'], ['sequence'], ['conditions'], ['sequence'],
    ['cond-check'], 'Check before you choose.'),
  m('pf-2', 'pattern-forest', 'guide', ['if-else'], ['conditions'], ['conditions', 'if-else'], ['conditions'],
    ['cond-choose', 'ifelse-two', 'ifelse-assign'], 'This way or that way.'),
  m('pf-3', 'pattern-forest', 'build', ['data'], ['conditions', 'if-else'], ['data', 'if-else'], ['conditions'],
    ['data-sort', 'data-property', 'ifelse-assign'], 'Sort what you noticed.'),
  m('pf-debug', 'pattern-forest', 'debug', [], ['debugging', 'if-else', 'conditions'], ['debugging', 'if-else'], ['conditions'],
    ['dbg-inspect', 'dbg-identify', 'ifelse-repair', 'dbg-retest'], 'Find the branch that went the wrong way.'),
  m('pf-creative', 'pattern-forest', 'create', [], ['conditions', 'if-else', 'data'], ['if-else'], ['if-else'],
    ['cond-choose', 'data-use'], 'Make your own rule.'),

  // ---------------- Robot Town: Functions, Messages, Parallelism, Decomposition ----------------
  m('rt-1', 'robot-town', 'discover', ['functions'], ['sequence'], ['functions'], ['sequence'],
    ['fn-create'], 'Save this job.'),
  m('rt-2', 'robot-town', 'guide', ['messages'], ['functions', 'events'], ['messages'], ['events'],
    ['msg-send', 'msg-start'], 'Tell another Bop.'),
  m('rt-3', 'robot-town', 'build', ['parallelism', 'decomposition'], ['messages', 'functions'],
    ['parallelism', 'decomposition'], ['events', 'messages', 'functions'],
    ['par-coordinate', 'par-dependency', 'dec-split', 'dec-combine'], 'Work at the same time.'),
  m('rt-debug', 'robot-town', 'debug', [], ['debugging', 'parallelism', 'messages'], ['debugging', 'parallelism'], ['messages'],
    ['dbg-inspect', 'dbg-identify', 'par-timing', 'dbg-retest'], 'Fix the helpers that got out of step.'),
  m('rt-creative', 'robot-town', 'create', [], ['functions', 'messages', 'decomposition'], ['functions'], ['functions', 'events'],
    ['fn-reuse', 'dec-assign'], 'Build a team of helpers.'),

  // ---------------- Agent Academy: Variables, State, Data, Agents ----------------
  m('aa-1', 'agent-academy', 'discover', ['agents'], ['state', 'conditions'], ['agents'],
    ['state', 'variables', 'data', 'conditions'], ['agent-goal', 'agent-tools'], 'Give your helper a goal.'),
  m('aa-2', 'agent-academy', 'guide', [], ['agents', 'data', 'conditions'], ['agents', 'data'],
    ['state', 'variables', 'data', 'conditions'], ['agent-rule', 'data-use'], 'Give your helper rules.'),
  m('aa-3', 'agent-academy', 'build', [], ['agents', 'variables', 'state'], ['agents', 'variables'],
    ['state', 'variables', 'data', 'conditions'], ['agent-memory', 'agent-approval', 'var-decide'], 'Memory, and asking first.'),
  m('aa-debug', 'agent-academy', 'debug', [], ['debugging', 'agents', 'state'], ['debugging', 'agents'],
    ['state', 'variables', 'data', 'conditions'], ['dbg-inspect', 'dbg-identify', 'state-mismatch', 'dbg-retest'], 'Fix the helper that got confused.'),
  m('aa-creative', 'agent-academy', 'create', [], ['agents', 'data', 'state'], ['agents'],
    ['state', 'variables', 'data', 'conditions'], ['agent-goal', 'agent-confidence'], 'Design your own helper.'),

  // ================= Gearworks Garage =================
  // Events + Sequence
  m('gw-motor-start', 'gearworks-garage', 'discover', [], ['sequence', 'events'], ['sequence'], ['sequence'],
    ['seq-order', 'seq-predict'], 'Put the steps in order.'),
  m('gw-motor-programmer', 'gearworks-garage', 'guide', [], ['sequence', 'events'], ['sequence', 'events'], ['sequence'],
    ['seq-order', 'evt-connect'], 'Start it, let it work, stop it safely.'),
  m('gw-gear-train', 'gearworks-garage', 'discover', [], ['sequence'], ['sequence'], ['sequence'],
    ['seq-order'], 'Connect the parts in order.'),
  m('gw-belt-builder', 'gearworks-garage', 'build', [], ['sequence'], ['sequence'], ['sequence'],
    ['seq-order'], 'Build the path piece by piece.'),
  // Loops
  m('gw-gear-loop', 'gearworks-garage', 'guide', [], ['loops', 'sequence'], ['loops'], ['sequence'],
    ['loop-spot', 'loop-replace'], 'Do it again.'),
  m('gw-loop-lift', 'gearworks-garage', 'build', [], ['loops'], ['loops'], ['sequence'],
    ['loop-count', 'loop-replace'], 'Choose how many times.'),
  // Events / conditions / sensing
  m('gw-wait-berry', 'gearworks-garage', 'guide', [], ['events', 'conditions'], ['events'], ['sequence'],
    ['evt-trigger', 'evt-distinguish'], 'Wait for the right moment.'),
  m('gw-sensor-workshop', 'gearworks-garage', 'build', [], ['conditions', 'if-else', 'events'], ['conditions', 'if-else'], ['conditions'],
    ['cond-check', 'cond-choose', 'ifelse-two'], 'Check before you choose.'),
  m('gw-sensor-sorter', 'gearworks-garage', 'build', [], ['conditions', 'if-else', 'data'], ['if-else', 'data'], ['conditions'],
    ['ifelse-assign', 'data-sort', 'data-property'], 'This way or that way.'),
  m('gw-conveyor-factory', 'gearworks-garage', 'build', [], ['conditions', 'data', 'if-else'], ['data', 'if-else'], ['conditions'],
    ['data-sort', 'data-use', 'ifelse-assign'], 'Sort what you noticed.'),
  // Variables
  m('gw-berry-counter', 'gearworks-garage', 'discover', ['variables'], [], ['variables'], ['loops'],
    ['var-container', 'var-update'], 'Remember a number.'),
  m('gw-safe-stop', 'gearworks-garage', 'build', [], ['variables', 'loops'], ['variables', 'loops'], ['loops'],
    ['var-decide', 'loop-stop'], 'Every loop needs a way to stop.'),
  // The hero composition level
  m('gw-jam-machine', 'gearworks-garage', 'build', [], ['sequence', 'events', 'loops', 'conditions'],
    ['sequence', 'loops'], ['sequence', 'loops'],
    ['seq-order', 'loop-replace'], 'Put every step of a big machine in order.'),
  // Functions
  m('gw-save-a-job', 'gearworks-garage', 'build', [], ['functions', 'decomposition', 'loops'], ['functions'], ['sequence'],
    ['fn-create', 'fn-reuse', 'fn-edit'], 'Save this job.'),
  // Messages + parallelism
  m('gw-two-machine', 'gearworks-garage', 'build', [], ['messages', 'parallelism', 'events'], ['messages', 'parallelism'], ['events', 'messages'],
    ['msg-send', 'msg-wait', 'par-coordinate', 'par-dependency'], 'Work at the same time.'),
  // Debugging
  m('gw-broken-machine', 'gearworks-garage', 'debug', [], ['debugging', 'loops', 'sequence'], ['debugging'], ['sequence'],
    ['dbg-inspect', 'dbg-identify', 'dbg-change', 'dbg-retest'], 'Find the mixed-up step.'),
  // Data (factory set)
  m('gw-three-way', 'gearworks-garage', 'build', [], ['data', 'conditions', 'if-else'], ['data'], ['conditions'],
    ['data-sort', 'data-property'], 'Sort into more than two groups.'),
  m('gw-factory-rush', 'gearworks-garage', 'build', [], ['data', 'if-else', 'conditions'], ['data', 'if-else'], ['conditions'],
    ['data-use', 'ifelse-assign'], 'Use what is left over as a rule.'),
  // Creative + rhythm
  m('gw-robot-orchestra', 'gearworks-garage', 'create', [], ['loops', 'parallelism', 'sequence'], ['loops', 'parallelism'], ['loops', 'events', 'messages'],
    ['loop-count', 'par-coordinate'], 'Make things happen at the same time.'),
  // Logic (conditions / if-else deepening)
  m('gw-night-light', 'gearworks-garage', 'build', [], ['conditions', 'if-else'], ['conditions'], ['conditions'],
    ['cond-check', 'cond-choose'], 'Check two things before you choose.'),
  m('gw-storm-watch', 'gearworks-garage', 'build', [], ['conditions', 'if-else'], ['conditions', 'if-else'], ['conditions'],
    ['cond-choose', 'ifelse-two'], 'Either one can be enough.'),
  // Queues (data + loops)
  m('gw-morning-round', 'gearworks-garage', 'guide', [], ['data', 'loops', 'sequence'], ['loops', 'data'], ['loops', 'conditions'],
    ['loop-replace', 'data-sort'], 'First in, first out.'),
  m('gw-rush-hour', 'gearworks-garage', 'build', [], ['data', 'loops'], ['loops'], ['loops', 'conditions'],
    ['loop-count', 'loop-replace'], 'One loop empties the whole line.'),
  // Nested loops
  m('gw-paint-parade', 'gearworks-garage', 'build', [], ['loops'], ['loops'], ['loops'],
    ['loop-replace', 'loop-count'], 'A loop inside a loop.'),
  m('gw-big-banner', 'gearworks-garage', 'create', [], ['loops', 'decomposition'], ['loops', 'decomposition'], ['loops', 'functions'],
    ['loop-count', 'dec-split'], 'One small loop fills a big wall.'),
  // State
  m('gw-robot-feelings', 'gearworks-garage', 'discover', ['state'], ['conditions'], ['state'], ['variables', 'conditions'],
    ['state-identify', 'state-predict'], 'What is happening now?'),
  m('gw-bedtime-story', 'gearworks-garage', 'build', [], ['state', 'conditions', 'sequence'], ['state'], ['variables', 'conditions'],
    ['state-predict', 'state-mismatch'], 'Some things only work at the right time.'),
  // Functions with inputs
  m('gw-block-bot', 'gearworks-garage', 'guide', [], ['functions', 'variables'], ['functions'], ['sequence', 'loops'],
    ['fn-create', 'fn-reuse'], 'Save this job.'),
  m('gw-skyline', 'gearworks-garage', 'build', [], ['functions', 'variables', 'decomposition'], ['functions', 'variables'], ['sequence', 'loops'],
    ['fn-reuse', 'fn-edit', 'var-decide'], 'One job, many different answers.'),
  // ================================================================
  // Ladder levels — each closes a Discover→Guide→Build→Debug→Create
  // rung that the curriculum asks for but no level was filling.
  // ================================================================
  // Events: debug + create
  m('gw-jumpy-claw', 'gearworks-garage', 'debug', [], ['events', 'debugging', 'conditions'],
    ['events', 'debugging'], ['sequence', 'events'],
    ['evt-connect', 'evt-distinguish', 'dbg-identify', 'dbg-change'], 'Wait for the right moment.'),
  m('gw-berry-parade', 'gearworks-garage', 'create', [], ['events', 'sequence'], ['events'], ['events'],
    ['evt-trigger', 'evt-connect'], 'Make your own waiting machine.'),
  // If–Else: discover
  m('gw-first-choice', 'gearworks-garage', 'discover', [], ['if-else', 'conditions'], ['if-else'], ['conditions'],
    ['ifelse-two'], 'This way or that way.'),
  // Data: discover + debug
  m('gw-shape-shelf', 'gearworks-garage', 'discover', [], ['data', 'conditions'], ['data'], ['conditions'],
    ['data-property'], 'Sort what you noticed.'),
  m('gw-mixed-up-belt', 'gearworks-garage', 'debug', [], ['data', 'debugging', 'if-else'],
    ['data', 'debugging'], ['conditions'],
    ['data-sort', 'dbg-inspect', 'dbg-identify', 'dbg-retest'], 'Find the mixed-up step.'),
  // Variables: debug + create
  m('gw-counter-mixup', 'gearworks-garage', 'debug', [], ['variables', 'debugging'],
    ['variables', 'debugging'], ['variables'],
    ['var-update', 'dbg-identify', 'dbg-change', 'dbg-retest'], 'Remember a number.'),
  m('gw-my-number', 'gearworks-garage', 'create', [], ['variables'], ['variables'], ['variables'],
    ['var-container', 'var-decide'], 'Reach your number your own way.'),
  // Parallelism: discover (two robots playing together)
  // Parallelism sits behind events + messages (§7), so this first
  // meeting comes after the signal levels rather than before them.
  m('gw-two-robots', 'gearworks-garage', 'discover', [], ['parallelism', 'sequence'], ['parallelism'],
    ['sequence', 'events', 'messages'],
    ['par-timing'], 'Work at the same time.'),
  // Messages: discover
  m('gw-first-signal', 'gearworks-garage', 'discover', [], ['messages', 'parallelism', 'events'],
    ['messages'], ['events'],
    ['msg-send', 'msg-wait'], 'Tell another Bop.'),
  // Parallelism: guide (one lane written for them)
  m('gw-relay-race', 'gearworks-garage', 'guide', [], ['parallelism', 'messages'], ['parallelism'], ['events', 'messages'],
    ['par-coordinate', 'par-dependency'], 'Work at the same time.'),
  // Functions + decomposition: debug
  m('gw-job-mixup', 'gearworks-garage', 'debug', [], ['functions', 'decomposition', 'debugging'],
    ['functions', 'decomposition', 'debugging'], ['sequence', 'functions'],
    ['fn-reuse', 'fn-edit', 'dec-combine', 'dbg-identify', 'dbg-change'], 'Save this job.'),
  // Decomposition: discover + guide
  m('gw-one-tower', 'gearworks-garage', 'discover', [], ['decomposition', 'functions'], ['decomposition'], ['sequence'],
    ['dec-split'], 'Split a big job into smaller jobs.'),
  m('gw-twin-towers', 'gearworks-garage', 'guide', [], ['decomposition', 'functions'], ['decomposition'], ['sequence'],
    ['dec-split', 'dec-assign'], 'Split a big job into smaller jobs.'),
  // State: guide
  m('gw-wake-up-bloop', 'gearworks-garage', 'guide', [], ['state', 'conditions'], ['state'], ['variables', 'conditions'],
    ['state-identify', 'state-mismatch'], 'What is happening now?'),
  // Debugging: discover, build, create
  m('gw-one-wrong-tile', 'gearworks-garage', 'discover', [], ['debugging', 'sequence'], ['debugging'], ['sequence'],
    ['dbg-inspect'], 'Find the mixed-up step.'),
  m('gw-machine-clinic', 'gearworks-garage', 'build', [], ['debugging', 'sequence', 'events'], ['debugging'], ['sequence'],
    ['dbg-inspect', 'dbg-identify', 'dbg-change', 'dbg-retest'], 'Find the mixed-up step.'),
  m('gw-fix-and-finish', 'gearworks-garage', 'create', [], ['debugging', 'loops', 'sequence'],
    ['debugging', 'loops'], ['sequence', 'loops'],
    ['dbg-change', 'dbg-retest', 'loop-count'], 'Fix it, then make it yours.'),
];

const BY_LEVEL = new Map(LEVEL_CURRICULUM.map((x) => [x.levelId, x]));

export function levelCurriculum(levelId: string): LevelCurriculumMetadata | null {
  return BY_LEVEL.get(levelId) ?? null;
}

/** Every level that touches a stage, in registry order. */
export function levelsForStage(id: CurriculumStageId): LevelCurriculumMetadata[] {
  return LEVEL_CURRICULUM.filter((l) =>
    l.introducedConcepts.includes(id)
    || l.practicedConcepts.includes(id)
    || l.assessedConcepts.includes(id));
}

/** Learning phases a stage is available in — the Discover→Create ladder. */
export function phasesForStage(id: CurriculumStageId): LearningPhase[] {
  return [...new Set(levelsForStage(id).map((l) => l.difficulty))];
}
