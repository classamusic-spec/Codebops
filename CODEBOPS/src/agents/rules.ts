/**
 * Rule matching — the deterministic half of a helper's decision.
 *
 * Two properties matter more than anything clever this file could do:
 *
 *  1. **Determinism.** The same observation, memory and rule list always
 *     select the same rule. No randomness, no clock, no iteration order
 *     that depends on object key insertion. A child who re-runs a helper
 *     and sees a different answer has learned that computers are moody,
 *     which is the opposite of the lesson.
 *
 *  2. **Explainability.** Matching reports every rule that COULD have
 *     fired, not just the winner. "Why did it water that one?" is
 *     answerable only if the losers are visible too — and that list is
 *     what Bossy and Shortcut are made of.
 */
import type {
  AgentCondition, AgentMemoryState, AgentObservation, AgentRuleDefinition,
} from './types';
import { flagOf, memoryContains, numberOf } from './memory';

/**
 * Does this condition hold?
 *
 * `subject` is the thing being considered right now. A helper looks at
 * one thing at a time on purpose: "for each flower, decide" is a shape a
 * five-year-old can narrate, and it keeps every trace row about a single
 * nameable object.
 */
export function evaluateCondition(
  condition: AgentCondition,
  subject: AgentObservation | null,
  memory: AgentMemoryState,
): boolean {
  switch (condition.kind) {
    case 'always':
      return true;
    case 'kindIs':
      return subject !== null && subject.kind === condition.value;
    case 'hasAttribute':
      return subject !== null && subject.attributes.includes(condition.value);
    case 'notAttribute':
      return subject !== null && !subject.attributes.includes(condition.value);
    case 'memoryContains':
      return subject !== null && memoryContains(memory, condition.memoryId, subject.subjectId);
    case 'memoryLacks':
      return subject !== null && !memoryContains(memory, condition.memoryId, subject.subjectId);
    case 'countAtLeast':
      return numberOf(memory, condition.memoryId) >= condition.value;
    case 'countBelow':
      return numberOf(memory, condition.memoryId) < condition.value;
    case 'flagIs':
      return flagOf(memory, condition.memoryId) === condition.value;
    case 'observationUnclear':
      return subject !== null && !subject.clear;
    case 'and':
      // An empty AND is true — the identity, so building a rule up one
      // clause at a time never passes through a state that blocks
      // everything. A child mid-edit should not see their helper freeze.
      return condition.all.every((c) => evaluateCondition(c, subject, memory));
    case 'or':
      return condition.any.some((c) => evaluateCondition(c, subject, memory));
    case 'not':
      return !evaluateCondition(condition.test, subject, memory);
  }
}

export interface RuleMatch {
  /** Every enabled rule whose condition held, best first. */
  readonly candidates: readonly AgentRuleDefinition[];
  /** The one that will actually run. */
  readonly selected: AgentRuleDefinition | null;
}

/**
 * Pick the rule to run.
 *
 * Ordering is by `priority` ascending, then by position in the list.
 * Position as the tiebreak is deliberate: a child who drags two rules
 * into an order expects that order to mean something, and giving them
 * equal priority should not hand the decision to a sort implementation.
 */
export function matchRules(
  rules: readonly AgentRuleDefinition[],
  subject: AgentObservation | null,
  memory: AgentMemoryState,
): RuleMatch {
  const eligible = rules
    .map((rule, index) => ({ rule, index }))
    .filter(({ rule }) => rule.enabled)
    .filter(({ rule }) => evaluateCondition(rule.condition, subject, memory))
    .sort((a, b) => (a.rule.priority - b.rule.priority) || (a.index - b.index))
    .map(({ rule }) => rule);
  return { candidates: eligible, selected: eligible[0] ?? null };
}

/**
 * Rules that can never fire because an earlier rule always beats them.
 *
 * This is the Shortcut GlitchBop's evidence, and worth surfacing to a
 * child as "this rule never gets a turn" — a shadowed rule is invisible
 * at runtime, so without a check like this the child's mental model and
 * the helper's behaviour drift apart silently.
 *
 * Only the unambiguous case is reported: an earlier `always` rule. A
 * general "does A imply B" check needs a solver, and a wrong warning
 * about a rule that does work would be worse than no warning.
 */
export function shadowedRules(rules: readonly AgentRuleDefinition[]): readonly string[] {
  const ordered = rules
    .map((rule, index) => ({ rule, index }))
    .filter(({ rule }) => rule.enabled)
    .sort((a, b) => (a.rule.priority - b.rule.priority) || (a.index - b.index));
  const at = ordered.findIndex(({ rule }) => rule.condition.kind === 'always');
  if (at < 0) return [];
  return ordered.slice(at + 1).map(({ rule }) => rule.id);
}

