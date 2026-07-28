/**
 * The shared vocabulary for helpers (§26).
 *
 * ONE set of types for goals, tools, rules, memory, examples, confidence,
 * approval and traces — used by Agent Academy, the Mission Builder, the
 * App Lab helper and anything later. The addendum's §27 is blunt about
 * why: "do not create unrelated decision engines in different worlds",
 * and the inspection found seventeen of them, with five different names
 * for "stop before this runs forever".
 *
 * Design rules, all load-bearing:
 *
 *  - Everything is a CLOSED union. A helper cannot express an idea the
 *    app has not approved, which is what makes §29's "approved actions"
 *    guarantee structural rather than a promise.
 *  - Everything is `readonly` and serializable. A helper is data; it is
 *    saved, replayed and diffed, never a live object holding callbacks.
 *  - Nothing imports THREE or the DOM. This whole folder is testable in
 *    Node, and the logic suite does exactly that.
 *  - No free text anywhere a child can reach. Labels are tokens the UI
 *    resolves, so nothing a child types can become a rule.
 */

// ---------------------------------------------------------------------
// Values
// ---------------------------------------------------------------------

/**
 * Everything a helper can know. Deliberately narrow: numbers count
 * things, booleans answer yes/no questions, tokens name approved things,
 * and a token-set remembers which of them have already been dealt with.
 */
export type AgentValue = number | boolean | string | readonly string[];

/** Approved nouns a helper may reason about. */
export type AgentToken = string;

// ---------------------------------------------------------------------
// Goals (§15.1)
// ---------------------------------------------------------------------

/**
 * A goal is checked against the world, never against the program. That
 * is what lets §13 be true — three different programs that all end with
 * three berries in the basket are all correct, because correctness is a
 * question about the basket.
 */
export type GoalCondition =
  | { readonly kind: 'countAtLeast'; readonly memoryId: string; readonly value: number }
  | { readonly kind: 'countEquals'; readonly memoryId: string; readonly value: number }
  | { readonly kind: 'allHandled'; readonly subjectKind: AgentToken }
  | { readonly kind: 'noneRemaining'; readonly subjectKind: AgentToken }
  | { readonly kind: 'flagIs'; readonly memoryId: string; readonly value: boolean };

export interface AgentGoalDefinition {
  readonly id: string;
  /** UI token, not a sentence — see the no-free-text rule above. */
  readonly titleToken: string;
  readonly successConditions: readonly GoalCondition[];
  /** Lower runs first when a helper carries more than one goal. */
  readonly priority: number;
}

// ---------------------------------------------------------------------
// Tools (§15.2)
// ---------------------------------------------------------------------

export type ToolCapability =
  | 'observe' | 'water' | 'grab' | 'carry' | 'drop'
  | 'sort' | 'signal' | 'count' | 'remember' | 'move';

export interface AgentToolDefinition {
  readonly id: string;
  readonly titleToken: string;
  readonly icon: string;
  readonly capabilities: readonly ToolCapability[];
  /** Subject kinds this tool may be pointed at. Empty means "any". */
  readonly allowedTargets: readonly AgentToken[];
  /**
   * When true, every action using this tool stops for a person first,
   * whatever the rules say. A tool can be dangerous by nature, and that
   * should not depend on a child remembering to add a gate.
   */
  readonly requiresApproval: boolean;
}

// ---------------------------------------------------------------------
// Observations — what the helper can see
// ---------------------------------------------------------------------

/**
 * One thing in the world, as the helper perceives it. `attributes` are
 * approved tokens ('red', 'droopy', 'metal'), never measurements: a
 * three-year-old sorts by "is it droopy", not by turgor pressure.
 */
export interface AgentObservation {
  readonly subjectId: string;
  readonly kind: AgentToken;
  readonly attributes: readonly AgentToken[];
  /**
   * False when the helper can tell it is not seeing properly — a covered
   * sensor, a half-hidden object. This is the honest input to confidence
   * (§9): a helper that cannot see should not be sure.
   */
  readonly clear: boolean;
}

// ---------------------------------------------------------------------
// Conditions and actions
// ---------------------------------------------------------------------

export type AgentCondition =
  | { readonly kind: 'always' }
  | { readonly kind: 'kindIs'; readonly value: AgentToken }
  | { readonly kind: 'hasAttribute'; readonly value: AgentToken }
  | { readonly kind: 'notAttribute'; readonly value: AgentToken }
  | { readonly kind: 'memoryContains'; readonly memoryId: string }
  | { readonly kind: 'memoryLacks'; readonly memoryId: string }
  | { readonly kind: 'countAtLeast'; readonly memoryId: string; readonly value: number }
  | { readonly kind: 'countBelow'; readonly memoryId: string; readonly value: number }
  | { readonly kind: 'flagIs'; readonly memoryId: string; readonly value: boolean }
  | { readonly kind: 'observationUnclear' }
  | { readonly kind: 'and'; readonly all: readonly AgentCondition[] }
  | { readonly kind: 'or'; readonly any: readonly AgentCondition[] }
  | { readonly kind: 'not'; readonly test: AgentCondition };

export type AgentAction =
  | { readonly kind: 'useTool'; readonly toolId: string }
  | { readonly kind: 'remember'; readonly memoryId: string }
  | { readonly kind: 'forget'; readonly memoryId: string }
  | { readonly kind: 'count'; readonly memoryId: string; readonly by: number }
  | { readonly kind: 'setFlag'; readonly memoryId: string; readonly value: boolean }
  | { readonly kind: 'skip' }
  | { readonly kind: 'askForHelp' }
  | { readonly kind: 'stopSafely' };

export interface AgentRuleDefinition {
  readonly id: string;
  readonly condition: AgentCondition;
  readonly action: AgentAction;
  /** Lower wins. Ties break on array order, which is stable. */
  readonly priority: number;
  readonly enabled: boolean;
}

// ---------------------------------------------------------------------
// Memory (§15.4)
// ---------------------------------------------------------------------

export type AgentMemoryType = 'number' | 'boolean' | 'token' | 'token-set';

export interface AgentMemoryDefinition {
  readonly id: string;
  readonly titleToken: string;
  readonly valueType: AgentMemoryType;
  readonly initialValue: AgentValue;
  /**
   * Token-sets only. Unbounded memory is one of §29's named hazards, and
   * a set that grows per observation is exactly how it happens.
   */
  readonly maximumEntries?: number;
  readonly resetPolicy: 'level' | 'project' | 'profile';
}

/** Live memory: definition id → current value. */
export type AgentMemoryState = Readonly<Record<string, AgentValue>>;

// ---------------------------------------------------------------------
// Confidence (§9)
// ---------------------------------------------------------------------

export type ConfidenceState = 'confident' | 'maybe' | 'unsure';

// ---------------------------------------------------------------------
// Examples (§7)
// ---------------------------------------------------------------------

export interface TrainingExample {
  readonly id: string;
  readonly inputToken: AgentToken;
  readonly labelToken: AgentToken;
  readonly source: 'starter' | 'child-corrected';
}

// ---------------------------------------------------------------------
// Traces (§18, §19)
// ---------------------------------------------------------------------

export type AgentOutcome =
  | { readonly kind: 'acted'; readonly toolId?: string }
  | { readonly kind: 'remembered'; readonly memoryId: string }
  | { readonly kind: 'skipped' }
  | { readonly kind: 'askedForHelp' }
  | { readonly kind: 'waitingForApproval' }
  | { readonly kind: 'stoppedSafely'; readonly reason: SafeStopReason }
  | { readonly kind: 'noRuleMatched' };

export type SafeStopReason =
  | 'goalReached'
  | 'stepLimit'
  | 'actionLimit'
  | 'memoryLimit'
  | 'approvalDeclined'
  | 'cannotSee'
  | 'noRuleMatched';

export interface AgentMemoryRead {
  readonly memoryId: string;
  readonly value: AgentValue;
}

export interface AgentDecisionTrace {
  readonly step: number;
  readonly goalId: string;
  readonly observations: readonly AgentObservation[];
  readonly memoryRead: readonly AgentMemoryRead[];
  /** Every rule that was eligible, in priority order. */
  readonly candidateRules: readonly string[];
  readonly selectedRuleId?: string;
  readonly selectedToolId?: string;
  readonly confidence: ConfidenceState;
  readonly approvalRequested: boolean;
  readonly approvalResult?: 'approved' | 'changed' | 'cancelled';
  readonly action?: AgentAction;
  readonly outcome: AgentOutcome;
}

// ---------------------------------------------------------------------
// The helper itself
// ---------------------------------------------------------------------

export interface AgentDefinition {
  readonly id: string;
  readonly goal: AgentGoalDefinition;
  readonly tools: readonly AgentToolDefinition[];
  readonly rules: readonly AgentRuleDefinition[];
  readonly memory: readonly AgentMemoryDefinition[];
  readonly examples: readonly TrainingExample[];
  /** Tool ids that must be approved by a person before use. */
  readonly requiresApprovalFor: readonly string[];
  readonly limits: AgentLimits;
}

/**
 * §29's protections, in one place, travelling WITH the helper.
 *
 * On the helper rather than in a constant on purpose, and the App Lab
 * already proved the point: a budget stored on the project means loosening
 * a template later cannot retroactively change what an old save is allowed
 * to do.
 */
export interface AgentLimits {
  readonly maximumSteps: number;
  readonly maximumActions: number;
  readonly maximumMemoryEntries: number;
  /** Repeats of the same action on the same subject before stopping. */
  readonly maximumRepeatsPerSubject: number;
}
