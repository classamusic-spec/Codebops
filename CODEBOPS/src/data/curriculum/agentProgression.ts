/**
 * Agent ideas, spread across the whole journey (§6).
 *
 * The addendum is explicit that agent concepts must not all arrive at
 * the end. That is a real risk here: the app has an `agents` curriculum
 * stage sitting at order 14, which reads as "agents are the last topic".
 *
 * This registry is the corrective. It names, per world, the SIMPLIFIED
 * agent idea that world already carries — Sparkle Meadow genuinely does
 * teach "a goal is a thing you are trying to make happen", it just never
 * said so out loud. Nothing here adds a level or changes gameplay; it
 * gives the existing worlds language for what they are already doing,
 * which is what makes the last world feel like an arrival rather than a
 * new subject.
 *
 * Pure data. No DOM, no THREE.
 */
import type { WorldId } from './stages';

/**
 * The agent ideas, in the order a child meets them. These are NOT
 * curriculum stages — they are facets of the single `agents` stage,
 * introduced early and revisited.
 */
export type AgentConcept =
  | 'goal'          // what should happen
  | 'plan'          // the steps to get there
  | 'stopping'      // when to stop
  | 'observation'   // look before choosing
  | 'rule'          // if this, then that
  | 'tool'          // what can help
  | 'delegation'    // who does which job
  | 'message'       // telling another helper
  | 'memory'        // what to remember
  | 'example'       // learning from what it has been shown
  | 'confidence'    // how sure it is
  | 'approval'      // asking a person first
  | 'explanation';  // why it did that

export interface AgentConceptDefinition {
  readonly id: AgentConcept;
  /** Grown-up name. */
  readonly formalName: string;
  /** The question a child is really answering (§24). */
  readonly childFacingQuestion: string;
  readonly icon: string;
}

export const AGENT_CONCEPTS: readonly AgentConceptDefinition[] = [
  { id: 'goal', formalName: 'Goal', childFacingQuestion: 'What should happen?', icon: '🎯' },
  { id: 'plan', formalName: 'Plan', childFacingQuestion: 'What steps do we need?', icon: '🗺️' },
  { id: 'stopping', formalName: 'Stopping rule', childFacingQuestion: 'When should it stop?', icon: '🛑' },
  { id: 'observation', formalName: 'Observation', childFacingQuestion: 'What can it see?', icon: '👀' },
  { id: 'rule', formalName: 'Rule', childFacingQuestion: 'What should the helper check?', icon: '📜' },
  { id: 'tool', formalName: 'Tool', childFacingQuestion: 'What can help?', icon: '🧰' },
  { id: 'delegation', formalName: 'Delegation', childFacingQuestion: 'Who does which job?', icon: '👥' },
  { id: 'message', formalName: 'Message', childFacingQuestion: 'What should it tell the others?', icon: '📨' },
  { id: 'memory', formalName: 'Memory', childFacingQuestion: 'What should it remember?', icon: '💎' },
  { id: 'example', formalName: 'Example', childFacingQuestion: 'Can you show it another one?', icon: '🖼️' },
  { id: 'confidence', formalName: 'Confidence', childFacingQuestion: 'How sure is it?', icon: '🤔' },
  { id: 'approval', formalName: 'Human approval', childFacingQuestion: 'Should it ask first?', icon: '🙋' },
  { id: 'explanation', formalName: 'Explainability', childFacingQuestion: 'Why did it do that?', icon: '🔍' },
];

export interface WorldAgentProgression {
  readonly world: WorldId;
  /** Ideas this world is the first to show. */
  readonly introduces: readonly AgentConcept[];
  /** Ideas it exercises again in a new setting. */
  readonly revisits: readonly AgentConcept[];
  /** One sentence, in the world's own voice, naming the idea. */
  readonly childFacingExample: string;
}

export const AGENT_PROGRESSION: readonly WorldAgentProgression[] = [
  {
    world: 'sparkle-meadow',
    introduces: ['goal', 'plan'],
    revisits: [],
    childFacingExample: "Zip's goal is to deliver the berry.",
  },
  {
    world: 'bubble-bay',
    introduces: ['stopping'],
    revisits: ['goal', 'plan'],
    childFacingExample: 'Repeat until every shell is collected.',
  },
  {
    world: 'pattern-forest',
    introduces: ['observation', 'rule', 'example'],
    revisits: ['goal', 'stopping'],
    childFacingExample: 'Pixel checks the flower colour before choosing.',
  },
  {
    world: 'robot-town',
    introduces: ['tool', 'delegation', 'message'],
    revisits: ['plan', 'rule'],
    childFacingExample: 'Nova gives each Bop the right job.',
  },
  {
    world: 'gearworks-garage',
    introduces: ['memory', 'approval'],
    revisits: ['observation', 'stopping', 'rule'],
    childFacingExample: 'The machine waits for information before acting.',
  },
  {
    world: 'agent-academy',
    introduces: ['confidence', 'explanation'],
    revisits: ['goal', 'tool', 'rule', 'memory', 'example', 'approval'],
    childFacingExample: 'Your helper says how sure it is — and asks when it is not.',
  },
  {
    world: 'app-lab',
    introduces: [],
    revisits: ['goal', 'tool', 'rule', 'memory', 'approval', 'explanation'],
    childFacingExample: 'Your app has a helper inside it.',
  },
  {
    world: 'imagination-island',
    introduces: [],
    revisits: [
      'goal', 'plan', 'stopping', 'observation', 'rule', 'tool',
      'delegation', 'message', 'memory', 'example', 'confidence',
      'approval', 'explanation',
    ],
    childFacingExample: 'Use any of it, for anything you want to make.',
  },
];

const PROGRESSION_BY_WORLD = new Map(AGENT_PROGRESSION.map((p) => [p.world, p]));

export function agentProgressionFor(worldId: WorldId): WorldAgentProgression | null {
  return PROGRESSION_BY_WORLD.get(worldId) ?? null;
}

/**
 * Every agent idea available by the time a world is reached, including
 * the ones it introduces itself. Drives progressive disclosure (§30):
 * a builder should only offer what the child has actually met.
 */
export function agentConceptsAvailableBy(
  worldId: WorldId,
  order: (id: WorldId) => number,
): readonly AgentConcept[] {
  const limit = order(worldId);
  const out = new Set<AgentConcept>();
  for (const p of AGENT_PROGRESSION) {
    if (order(p.world) > limit) continue;
    for (const c of p.introduces) out.add(c);
  }
  // Stable order: the roster order, not insertion order, so two callers
  // asking the same question always get the same list back.
  return AGENT_CONCEPTS.filter((c) => out.has(c.id)).map((c) => c.id);
}
