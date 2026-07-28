/**
 * The shared helper engine (§27).
 *
 * One pipeline, for every world:
 *
 *   observe → recall → match rules → confidence → approval → act → trace
 *
 * Worlds configure it with data. They do not fork it. That is the whole
 * point of §27, and the inspection is the argument: seventeen bespoke
 * decision engines had already grown, each with its own idea of when to
 * stop, and only some of them could explain themselves afterwards.
 *
 * Properties this file must keep, in order of how badly they break things:
 *
 *  - **It always terminates.** Every loop is bounded by the helper's own
 *    limits. A child's helper cannot freeze a tablet.
 *  - **It is deterministic.** Same inputs, same trace, every time.
 *  - **It never mutates its arguments.** The world goes in, a new world
 *    comes out, and every trace row holds the memory the decision was
 *    actually made against.
 *  - **Every decision is traced.** Including the ones where nothing
 *    happened — "no rule matched" is the most useful row in the trace
 *    when a child is asking why their helper ignored something.
 */
import type {
  AgentDecisionTrace, AgentDefinition, AgentMemoryState, AgentObservation,
  AgentOutcome, ConfidenceState, SafeStopReason,
} from './types';
import { withDefaults } from './limits';
import {
  count, forget, initialMemory, numberOf, flagOf, remember, setFlag,
} from './memory';
import { matchRules } from './rules';
import { assessConfidence } from './confidence';
import type { ExampleSet } from './examples';
import type { ApprovalAnswer, ApprovalLog, ApprovalRequest } from './approval';
import { answerFor, describeRequest, needsApproval } from './approval';

/**
 * What the helper is working on.
 *
 * A plain list of observations, which is what makes this engine reusable:
 * a meadow of flowers, a conveyor of parcels and a shelf of tools are the
 * same problem once they are a list of things with attributes.
 */
export interface AgentWorld {
  readonly subjects: readonly AgentObservation[];
}

export interface RunAgentOptions {
  readonly approvals?: ApprovalLog;
  readonly examples?: ExampleSet;
  /** Memory carried in from an earlier run — the stale-memory scenario. */
  readonly memory?: AgentMemoryState;
}

export interface AgentRunResult {
  readonly trace: readonly AgentDecisionTrace[];
  readonly memory: AgentMemoryState;
  /** Subjects the helper actually did something to. */
  readonly handled: readonly string[];
  readonly goalReached: boolean;
  readonly stoppedBecause: SafeStopReason;
  /** Set when the run stopped to ask a person. */
  readonly pendingApproval: ApprovalRequest | null;
  /** The weakest confidence reached — drives the helper's face. */
  readonly overallConfidence: ConfidenceState;
}

export function runAgent(
  agent: AgentDefinition,
  world: AgentWorld,
  options: RunAgentOptions = {},
): AgentRunResult {
  const limits = withDefaults(agent.limits);
  const memoryDefs = new Map(agent.memory.map((m) => [m.id, m]));

  let memory: AgentMemoryState = options.memory ?? initialMemory(agent.memory);
  const trace: AgentDecisionTrace[] = [];
  const handled: string[] = [];
  const approvals = options.approvals ?? [];

  let step = 0;
  let actions = 0;
  let approvalsSeen = 0;
  let pendingApproval: ApprovalRequest | null = null;
  let stoppedBecause: SafeStopReason | null = null;
  const confidences: ConfidenceState[] = [];
  // Guards §29's "endless action chains" per subject, so a rule that
  // keeps matching the same flower ends politely instead of spinning.
  const touches = new Map<string, number>();

  const queue = [...world.subjects];

  while (queue.length > 0) {
    if (step >= limits.maximumSteps) { stoppedBecause = 'stepLimit'; break; }
    if (actions >= limits.maximumActions) { stoppedBecause = 'actionLimit'; break; }
    if (goalReached(agent, memory, handled, world)) { stoppedBecause = 'goalReached'; break; }

    const subject = queue.shift()!;
    step += 1;

    const seen = touches.get(subject.subjectId) ?? 0;
    if (seen >= limits.maximumRepeatsPerSubject) continue;
    touches.set(subject.subjectId, seen + 1);

    const memoryRead = agent.memory.map((m) => ({ memoryId: m.id, value: memory[m.id] }));
    const match = matchRules(agent.rules, subject, memory);
    const assessment = assessConfidence({
      subject, rules: agent.rules, memory, examples: options.examples,
    });
    confidences.push(assessment.state);

    const base = {
      step,
      goalId: agent.goal.id,
      observations: [subject],
      memoryRead,
      candidateRules: match.candidates.map((r) => r.id),
      confidence: assessment.state,
    };

    // Nothing matched. Traced rather than skipped: this row is the whole
    // answer to "why did it walk straight past that one?".
    if (!match.selected) {
      trace.push({ ...base, approvalRequested: false, outcome: { kind: 'noRuleMatched' } });
      continue;
    }

    const rule = match.selected;
    const action = rule.action;

    // Ask first, if this needs a person.
    if (needsApproval(agent, action)) {
      const answer = answerFor(approvals, approvalsSeen);
      if (answer === null) {
        const toolId = action.kind === 'useTool' ? action.toolId : undefined;
        const tool = agent.tools.find((t) => t.id === toolId);
        pendingApproval = {
          step,
          ruleId: rule.id,
          toolId,
          subjectId: subject.subjectId,
          childFacingPrompt: describeRequest(tool?.titleToken ?? 'tool', subject),
        };
        trace.push({
          ...base,
          selectedRuleId: rule.id,
          selectedToolId: toolId,
          approvalRequested: true,
          action,
          outcome: { kind: 'waitingForApproval' },
        });
        // Put it back: the same subject is reconsidered once answered.
        queue.unshift(subject);
        touches.set(subject.subjectId, seen);
        break;
      }
      approvalsSeen += 1;
      const resolved = applyApproval(answer);
      if (resolved === 'cancelled') {
        trace.push({
          ...base,
          selectedRuleId: rule.id,
          approvalRequested: true,
          approvalResult: 'cancelled',
          action,
          outcome: { kind: 'stoppedSafely', reason: 'approvalDeclined' },
        });
        stoppedBecause = 'approvalDeclined';
        break;
      }
      if (resolved === 'changed') {
        trace.push({
          ...base,
          selectedRuleId: rule.id,
          approvalRequested: true,
          approvalResult: 'changed',
          action,
          outcome: { kind: 'skipped' },
        });
        continue;
      }
    }

    // Do it.
    const applied = applyAction(action, subject, memory, memoryDefs, limits);
    memory = applied.memory;
    if (applied.counted) actions += 1;
    if (applied.handledSubject) handled.push(subject.subjectId);
    if (applied.requeue) queue.push(subject);

    trace.push({
      ...base,
      selectedRuleId: rule.id,
      selectedToolId: action.kind === 'useTool' ? action.toolId : undefined,
      approvalRequested: needsApproval(agent, action),
      approvalResult: needsApproval(agent, action) ? 'approved' : undefined,
      action,
      outcome: applied.outcome,
    });

    if (applied.stop) { stoppedBecause = applied.stop; break; }
  }

  const reached = goalReached(agent, memory, handled, world);
  if (stoppedBecause === null) stoppedBecause = reached ? 'goalReached' : 'noRuleMatched';

  return {
    trace,
    memory,
    handled,
    goalReached: reached,
    stoppedBecause,
    pendingApproval,
    overallConfidence: weakestOf(confidences),
  };
}

function applyApproval(answer: ApprovalAnswer): ApprovalAnswer {
  return answer;
}

function weakestOf(states: readonly ConfidenceState[]): ConfidenceState {
  const RANK = { confident: 0, maybe: 1, unsure: 2 } as const;
  return states.reduce<ConfidenceState>(
    (worst, s) => (RANK[s] > RANK[worst] ? s : worst), 'confident',
  );
}

interface Applied {
  readonly memory: AgentMemoryState;
  readonly outcome: AgentOutcome;
  /** Counts against the action budget. Bookkeeping does not. */
  readonly counted: boolean;
  readonly handledSubject: boolean;
  readonly requeue: boolean;
  readonly stop: SafeStopReason | null;
}

function applyAction(
  action: AgentDefinition['rules'][number]['action'],
  subject: AgentObservation,
  memory: AgentMemoryState,
  defs: ReadonlyMap<string, AgentDefinition['memory'][number]>,
  limits: AgentDefinition['limits'],
): Applied {
  const still = { memory, counted: false, handledSubject: false, requeue: false, stop: null } as const;
  switch (action.kind) {
    case 'useTool':
      return { ...still, counted: true, handledSubject: true, outcome: { kind: 'acted', toolId: action.toolId } };

    case 'remember': {
      const def = defs.get(action.memoryId);
      if (!def) return { ...still, outcome: { kind: 'skipped' } };
      const res = remember(memory, def, subject.subjectId, limits);
      if (res.full) {
        return {
          ...still, memory: res.state, stop: 'memoryLimit',
          outcome: { kind: 'stoppedSafely', reason: 'memoryLimit' },
        };
      }
      return {
        ...still, memory: res.state, handledSubject: true,
        outcome: { kind: 'remembered', memoryId: action.memoryId },
      };
    }

    case 'forget': {
      const def = defs.get(action.memoryId);
      if (!def) return { ...still, outcome: { kind: 'skipped' } };
      return {
        ...still, memory: forget(memory, def),
        outcome: { kind: 'remembered', memoryId: action.memoryId },
      };
    }

    case 'count': {
      const def = defs.get(action.memoryId);
      if (!def) return { ...still, outcome: { kind: 'skipped' } };
      return {
        ...still, memory: count(memory, def, action.by), counted: true, handledSubject: true,
        outcome: { kind: 'remembered', memoryId: action.memoryId },
      };
    }

    case 'setFlag': {
      const def = defs.get(action.memoryId);
      if (!def) return { ...still, outcome: { kind: 'skipped' } };
      return {
        ...still, memory: setFlag(memory, def, action.value),
        outcome: { kind: 'remembered', memoryId: action.memoryId },
      };
    }

    case 'skip':
      return { ...still, outcome: { kind: 'skipped' } };

    // Asking is a real, successful outcome (§9, §25) — it ends the run
    // for this subject without ending the run.
    case 'askForHelp':
      return { ...still, outcome: { kind: 'askedForHelp' } };

    case 'stopSafely':
      return {
        ...still, stop: 'cannotSee',
        outcome: { kind: 'stoppedSafely', reason: 'cannotSee' },
      };
  }
}

/**
 * Has the goal been met?
 *
 * Checked against the WORLD and the helper's memory, never against the
 * plan. That is what makes §13 possible: any plan that ends with the
 * flowers watered is a correct plan.
 */
export function goalReached(
  agent: AgentDefinition,
  memory: AgentMemoryState,
  handled: readonly string[],
  world: AgentWorld,
): boolean {
  if (agent.goal.successConditions.length === 0) return false;
  return agent.goal.successConditions.every((c) => {
    switch (c.kind) {
      case 'countAtLeast':
        return numberOf(memory, c.memoryId) >= c.value;
      case 'countEquals':
        return numberOf(memory, c.memoryId) === c.value;
      case 'flagIs':
        return flagOf(memory, c.memoryId) === c.value;
      case 'allHandled': {
        const wanted = world.subjects.filter((s) => s.kind === c.subjectKind);
        return wanted.length > 0 && wanted.every((s) => handled.includes(s.subjectId));
      }
      case 'noneRemaining': {
        const wanted = world.subjects.filter((s) => s.kind === c.subjectKind);
        return wanted.every((s) => handled.includes(s.subjectId));
      }
    }
  });
}
