/**
 * Human approval (§10) — Ask First.
 *
 * The design is lifted from the App Lab runtime, which already got this
 * right and deserves to be the app-wide answer: a run does not hold a
 * callback and wait. It is given the answers already known, runs until it
 * reaches a gate it has no answer for, and STOPS, reporting the gate.
 * The caller shows a dialog, appends the answer, and runs again.
 *
 * That shape buys three things that a callback cannot:
 *  - the engine stays pure and synchronous, so it is testable in Node;
 *  - a run is fully described by (helper, world, answers), so it replays
 *    exactly — which is what Glitch Replay needs;
 *  - nothing can wedge waiting on a dialog that was dismissed.
 *
 * §10 also requires that approval is not just yes/no. A child can change
 * the plan or cancel, and "cancelled" must read as a real outcome — the
 * lesson is that stopping something is a legitimate thing to do, not a
 * failure to complete the level.
 */
import type { AgentAction, AgentDefinition, AgentObservation } from './types';

export type ApprovalAnswer = 'approved' | 'changed' | 'cancelled';

export interface ApprovalRequest {
  /** Step number in the run, so an answer cannot be applied to the wrong gate. */
  readonly step: number;
  readonly ruleId: string;
  readonly toolId?: string;
  readonly subjectId?: string;
  /** What the helper is about to do, in the child's words. */
  readonly childFacingPrompt: string;
}

/** Answers already given, in the order the run asked for them. */
export type ApprovalLog = readonly ApprovalAnswer[];

/**
 * Does this action need a person first?
 *
 * Two independent sources, and either is enough. A tool can be dangerous
 * by nature (`requiresApproval` on the definition), which must not depend
 * on a child remembering to add a gate; and the child can gate any tool
 * themselves, which is the part they are learning to do.
 */
export function needsApproval(agent: AgentDefinition, action: AgentAction): boolean {
  if (action.kind !== 'useTool') return false;
  if (agent.requiresApprovalFor.includes(action.toolId)) return true;
  const tool = agent.tools.find((t) => t.id === action.toolId);
  return tool?.requiresApproval === true;
}

/**
 * The answer for the Nth gate of this run, or null if we have not been
 * told yet. Null is the signal to stop and ask.
 */
export function answerFor(log: ApprovalLog, index: number): ApprovalAnswer | null {
  return index < log.length ? log[index] : null;
}

export function record(log: ApprovalLog, answer: ApprovalAnswer): ApprovalLog {
  return [...log, answer];
}

/**
 * The sentence on the approval card.
 *
 * Built from tokens rather than assembled from free text, and phrased as
 * a question about a specific named thing — "Shall I water the droopy
 * flower?" beats "Approve action?" for an audience that cannot read the
 * second one and would tap yes anyway.
 */
export function describeRequest(
  toolTitle: string,
  subject: AgentObservation | null,
): string {
  if (!subject) return `Shall I use the ${toolTitle}?`;
  const attribute = subject.attributes[0];
  const thing = attribute ? `${attribute} ${subject.kind}` : subject.kind;
  return `Shall I use the ${toolTitle} on the ${thing}?`;
}

/**
 * §25: asking must never score below acting.
 *
 * A helper that asked and was told no did its job perfectly — so every
 * answer is a successful outcome, including "cancelled". Written as an
 * explicit map rather than `return true` so that the day someone decides
 * cancelling should cost a star, they have to change a line that says
 * `cancelled: true` and read this comment on the way past. The test suite
 * asserts every entry.
 */
const OUTCOME_IS_SUCCESSFUL: Readonly<Record<ApprovalAnswer, boolean>> = {
  approved: true,
  changed: true,
  cancelled: true,
};

export function isSuccessfulOutcome(answer: ApprovalAnswer): boolean {
  return OUTCOME_IS_SUCCESSFUL[answer];
}
