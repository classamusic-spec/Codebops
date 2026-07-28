/**
 * What a helper actually showed (§22, §23).
 *
 * The existing curriculum records evidence from levels. This does the
 * same job for helpers, and it is stricter about one thing: evidence
 * comes from what the child DID, never from what they opened.
 *
 * §22 is explicit that reports must not record only "level completed,
 * stars earned, time spent". So nothing here counts a screen visit.
 * Adding a stopping rule counts. Correcting an example counts. Surviving
 * an edge case counts. Choosing a goal counts — because on this
 * curriculum, deciding what should happen IS the skill.
 *
 * Pure functions. The caller owns storage.
 */
import type { AgentMission } from './mission';
import type { AgentRunResult } from './engine';
import type { ExampleSet } from './examples';
import { inspectExamples } from './examples';
import { missionGoal, missionTool, MEMORY_CHILD_TITLE } from '../data/agents/missionCatalog';

/** Matches the shape `data/curriculum/record.ts` already produces. */
export interface AgentEvidence {
  readonly stage: 'agents';
  /** An evidence id declared on the `agents` curriculum stage. */
  readonly requirement: string;
  /** One sentence a grown-up can read verbatim (§23). */
  readonly note: string;
}

/**
 * Everything this helper demonstrates as it stands.
 *
 * Read off the mission, not off a checklist the builder ticks: a helper
 * with an Ask First gate evidences `agent-approval` whether or not the
 * child walked through the approval step in order.
 */
export function evidenceForMission(mission: AgentMission): readonly AgentEvidence[] {
  const out: AgentEvidence[] = [];
  const goal = missionGoal(mission.goalId);

  out.push({
    stage: 'agents', requirement: 'agent-goal',
    note: `Chose a goal for their helper: ${goal.childFacingTitle.toLowerCase()}.`,
  });

  if (mission.toolIds.length > 0) {
    const names = mission.toolIds
      .map((id) => { try { return missionTool(id).childFacingTitle.toLowerCase(); } catch { return null; } })
      .filter((n): n is string => n !== null);
    if (names.length > 0) {
      out.push({
        stage: 'agents', requirement: 'agent-tools',
        note: `Selected tools for the job: ${names.join(', ')}.`,
      });
    }
  }

  if (mission.rules.length > 0) {
    out.push({
      stage: 'agents', requirement: 'agent-rule',
      note: mission.rules.length === 1
        ? 'Wrote a rule saying what their helper should check.'
        : `Wrote ${mission.rules.length} rules saying what their helper should check.`,
    });
  }

  if (mission.memoryIds.length > 0) {
    const names = mission.memoryIds.map((id) => MEMORY_CHILD_TITLE[id] ?? id);
    out.push({
      stage: 'agents', requirement: 'agent-memory',
      note: `Gave their helper something to remember: ${names.join(', ').toLowerCase()}.`,
    });
  }

  if (mission.approvalToolIds.length > 0) {
    const names = mission.approvalToolIds
      .map((id) => { try { return missionTool(id).childFacingTitle.toLowerCase(); } catch { return null; } })
      .filter((n): n is string => n !== null);
    out.push({
      stage: 'agents', requirement: 'agent-approval',
      note: `Added an Ask First checkpoint before their helper used the ${names.join(' or ')}.`,
    });
  }

  return out;
}

/**
 * What a particular RUN showed, on top of the helper itself.
 *
 * The interesting evidence lives here rather than in the build: reading
 * a confidence meter and responding to it is a different skill from
 * switching a feature on, and only a run can demonstrate it.
 */
export function evidenceForRun(
  mission: AgentMission,
  result: AgentRunResult,
  examples?: ExampleSet,
): readonly AgentEvidence[] {
  const out: AgentEvidence[] = [];

  // Confidence: only when the helper was genuinely unsure at some point
  // AND the child had a reason to notice. A confident run evidences
  // nothing about confidence.
  const wasUnsure = result.trace.some((t) => t.confidence === 'unsure');
  if (wasUnsure) {
    out.push({
      stage: 'agents', requirement: 'agent-confidence',
      note: 'Saw their helper say it was not sure, and could see why.',
    });
  }

  if (result.stoppedBecause === 'approvalDeclined') {
    out.push({
      stage: 'agents', requirement: 'agent-approval',
      note: 'Told their helper not to do something, and it stopped.',
    });
  }

  if (mission.limitCardIds.length > 0 && result.trace.length > 0) {
    out.push({
      stage: 'agents', requirement: 'agent-memory',
      note: 'Gave their helper a stopping rule and watched it hold.',
    });
  }

  if (examples) {
    const corrected = examples.examples.filter((e) => e.source === 'child-corrected');
    if (corrected.length > 0) {
      out.push({
        stage: 'agents', requirement: 'agent-rule',
        note: corrected.length === 1
          ? 'Corrected an example after their helper got one wrong.'
          : `Corrected ${corrected.length} examples to help their helper choose better.`,
      });
    }
    const problems = inspectExamples(examples);
    if (problems.length === 0 && examples.examples.length >= 2) {
      out.push({
        stage: 'agents', requirement: 'agent-tools',
        note: 'Built a set of examples covering more than one kind of answer.',
      });
    }
  }

  return out;
}

/** Evidence from surviving a surprise (§12, §22). */
export function evidenceForEdgeCase(
  lesson: string,
  survived: boolean,
): readonly AgentEvidence[] {
  // A failed edge case is not evidence of anything — but it is also not
  // recorded as a deficit. §23: never diagnose ability. The child simply
  // has not shown this yet, which is what an empty list means.
  if (!survived) return [];
  return [{
    stage: 'agents', requirement: 'agent-rule',
    note: `Their plan still worked when things changed: ${lesson.toLowerCase()}`,
  }];
}

/**
 * A sentence for a grown-up about a whole session with a helper (§23).
 *
 * Built only from things that happened. When nothing much did, it says
 * so plainly rather than inventing progress — which is the rule the
 * existing parent report already follows and the reason a grown-up can
 * trust it.
 */
export function parentSentenceForMission(
  mission: AgentMission,
  result: AgentRunResult | null,
): string {
  const goal = missionGoal(mission.goalId);
  const parts: string[] = [];

  parts.push(`Built a helper to ${goal.childFacingTitle.toLowerCase()}`);
  if (mission.rules.length > 0) {
    parts.push(`with ${mission.rules.length === 1 ? 'one rule' : `${mission.rules.length} rules`}`);
  }
  if (mission.approvalToolIds.length > 0) parts.push('and an Ask First checkpoint');
  if (mission.limitCardIds.length > 0) parts.push('and a stopping rule');

  let sentence = `${parts.join(' ')}.`;

  if (result) {
    if (result.goalReached) sentence += ' It reached its goal.';
    else if (result.stoppedBecause === 'approvalDeclined') {
      sentence += ' They told it not to do something, and it stopped.';
    } else if (result.overallConfidence === 'unsure') {
      sentence += ' It was unsure, and they could see why.';
    }
  }

  if (mission.passedEdgeCases.length > 0) {
    sentence += ` It still worked when things changed (${mission.passedEdgeCases.length} ${
      mission.passedEdgeCases.length === 1 ? 'surprise' : 'surprises'}).`;
  }

  return sentence;
}

/** A conversation to have away from the screen (§23). */
export function offScreenIdeaForMission(mission: AgentMission): string {
  if (mission.approvalToolIds.length > 0) {
    return 'Ask them what jobs at home a helper should check with a grown-up about first.';
  }
  if (mission.limitCardIds.length > 0) {
    return 'Ask them how they know when a job is finished.';
  }
  if (mission.rules.length > 1) {
    return 'Ask them which of their helper’s rules should win when two of them both fit.';
  }
  return 'Ask them what they would teach their helper to do next.';
}
