/**
 * A saved helper (§15, §16) — the thing a child builds and keeps.
 *
 * A mission is a small serializable record referring to catalogue ids.
 * It never embeds the catalogue itself, so a tool gaining an ability
 * later reaches every saved helper, and a mission file stays a few
 * hundred bytes.
 *
 * The exception is `limits`, which is stored in full. The App Lab
 * already proved why: a budget that travels WITH the project means
 * relaxing a template later cannot retroactively change what an old
 * save is allowed to do.
 */
import type { AgentDefinition, AgentLimits, AgentRuleDefinition } from './types';
import { DEFAULT_LIMITS, BEGINNER_LIMITS, withDefaults } from './limits';
import {
  MISSION_MEMORY, LIMIT_CARDS, missionGoal, missionTool, whenCardsFor, doCardsFor,
} from '../data/agents/missionCatalog';
import type { ExampleSet } from './examples';

export const MISSION_SCHEMA_VERSION = 1;

/** One rule, as the child assembled it: a WHEN card and a DO card. */
export interface MissionRule {
  readonly id: string;
  readonly whenCardId: string;
  readonly doCardId: string;
  readonly enabled: boolean;
}

export interface AgentMission {
  readonly schemaVersion: number;
  readonly id: string;
  /** Chosen from prepared titles — never typed. */
  readonly titleToken: string;
  readonly goalId: string;
  readonly toolIds: readonly string[];
  readonly rules: readonly MissionRule[];
  /** Memory ids the child switched on. */
  readonly memoryIds: readonly string[];
  readonly limitCardIds: readonly string[];
  /** Tool ids the child gated with Ask First. */
  readonly approvalToolIds: readonly string[];
  /** Edge cases this helper has been tried against and survived. */
  readonly passedEdgeCases: readonly string[];
  readonly createdAt: number;
  readonly updatedAt: number;
}

/** A brand-new helper: a goal, and nothing else decided yet. */
export function newMission(id: string, goalId: string, now: number): AgentMission {
  return {
    schemaVersion: MISSION_SCHEMA_VERSION,
    id,
    titleToken: 'my-helper',
    goalId,
    toolIds: [],
    rules: [],
    memoryIds: [],
    limitCardIds: [],
    approvalToolIds: [],
    passedEdgeCases: [],
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Turn a saved mission into something the engine can run.
 *
 * Everything unknown is DROPPED rather than throwing. A catalogue entry
 * can disappear between versions, and a child opening an old helper
 * should find it slightly simpler, not broken — a crash here would lose
 * work that took them twenty minutes.
 */
export function toAgent(mission: AgentMission): AgentDefinition {
  const goal = missionGoal(mission.goalId);
  const tools = mission.toolIds
    .map((id) => { try { return missionTool(id); } catch { return null; } })
    .filter((t): t is NonNullable<typeof t> => t !== null);

  const whenCards = new Map(whenCardsFor(goal).map((c) => [c.id, c]));
  const doCards = new Map(doCardsFor(mission.toolIds).map((c) => [c.id, c]));

  const rules: AgentRuleDefinition[] = [];
  mission.rules.forEach((r, index) => {
    const when = whenCards.get(r.whenCardId);
    const act = doCards.get(r.doCardId);
    if (!when || !act) return;
    rules.push({
      id: r.id,
      condition: when.condition,
      action: act.action,
      // Priority follows the child's arrangement: the rule at the top is
      // the one they expect to win, and nothing else should decide that.
      priority: index + 1,
      enabled: r.enabled,
    });
  });

  const memory = MISSION_MEMORY.filter((m) => mission.memoryIds.includes(m.id));

  return {
    id: mission.id,
    goal,
    tools,
    rules,
    memory,
    examples: [],
    requiresApprovalFor: mission.approvalToolIds.filter((id) => mission.toolIds.includes(id)),
    limits: limitsFor(mission),
  };
}

/**
 * The helper's budget.
 *
 * Starts from the beginner allowance while a helper is small, then
 * relaxes once it has a few rules — a three-rule helper genuinely needs
 * more steps than a one-rule one, and hitting the cap on your first
 * attempt reads as the game saying no.
 */
export function limitsFor(mission: AgentMission): AgentLimits {
  const base = mission.rules.length <= 1 ? BEGINNER_LIMITS : DEFAULT_LIMITS;
  const chosen: Record<string, number> = {};
  for (const cardId of mission.limitCardIds) {
    const card = LIMIT_BY_ID.get(cardId);
    if (card) chosen[card.field] = card.value;
  }
  return withDefaults({ ...base, ...chosen } as Partial<AgentLimits>);
}

const LIMIT_BY_ID = new Map(LIMIT_CARDS.map((c) => [c.id, c]));

// ---------------------------------------------------------------------
// What is finished, and what is still missing
// ---------------------------------------------------------------------

export type MissionGap =
  | { readonly kind: 'noTool' }
  | { readonly kind: 'noRule' }
  | { readonly kind: 'noStoppingRule' }
  | { readonly kind: 'ruleNeverRuns'; readonly ruleId: string }
  | { readonly kind: 'untested' };

/**
 * Reported, never enforced.
 *
 * A helper with no stopping rule is exactly the helper Forever Fred
 * exists to talk about, and refusing to run it would remove the lesson.
 * The builder shows these as things still to try, not as errors.
 */
export function missionGaps(mission: AgentMission): readonly MissionGap[] {
  const gaps: MissionGap[] = [];
  if (mission.toolIds.length === 0) gaps.push({ kind: 'noTool' });
  if (mission.rules.length === 0) gaps.push({ kind: 'noRule' });
  if (mission.limitCardIds.length === 0 && mission.rules.length > 0) {
    gaps.push({ kind: 'noStoppingRule' });
  }
  // A rule under an "Every time" rule can never get a turn.
  const alwaysAt = mission.rules.findIndex((r) => r.enabled && r.whenCardId === 'always');
  if (alwaysAt >= 0) {
    for (const r of mission.rules.slice(alwaysAt + 1)) {
      if (r.enabled) gaps.push({ kind: 'ruleNeverRuns', ruleId: r.id });
    }
  }
  if (mission.passedEdgeCases.length === 0 && mission.rules.length > 0) {
    gaps.push({ kind: 'untested' });
  }
  return gaps;
}

export const GAP_PHRASE: Readonly<Record<MissionGap['kind'], string>> = {
  noTool: 'Your helper has no tools yet. What could help?',
  noRule: 'Your helper has no rules yet. What should it check?',
  noStoppingRule: 'Your helper has no stopping rule. When should it stop?',
  ruleNeverRuns: 'This rule never gets a turn — the one above it matches everything.',
  untested: 'Try your helper on a surprise to see if it still works.',
};

// ---------------------------------------------------------------------
// Save format
// ---------------------------------------------------------------------

/**
 * Read a mission back from storage.
 *
 * Deliberately forgiving in one direction only: anything missing gets a
 * safe default, anything of the wrong shape is dropped, and a mission
 * from an unknown FUTURE version is refused rather than half-read. A
 * half-read helper would run with rules the child cannot see.
 */
export function parseMission(raw: unknown): AgentMission | null {
  if (typeof raw !== 'object' || raw === null) return null;
  const r = raw as Record<string, unknown>;
  if (typeof r.id !== 'string' || typeof r.goalId !== 'string') return null;
  if (typeof r.schemaVersion === 'number' && r.schemaVersion > MISSION_SCHEMA_VERSION) return null;
  try { missionGoal(r.goalId); } catch { return null; }

  const strings = (v: unknown): string[] =>
    Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [];

  const rules: MissionRule[] = Array.isArray(r.rules)
    ? r.rules.flatMap((x) => {
      if (typeof x !== 'object' || x === null) return [];
      const o = x as Record<string, unknown>;
      if (typeof o.id !== 'string' || typeof o.whenCardId !== 'string'
        || typeof o.doCardId !== 'string') return [];
      return [{
        id: o.id, whenCardId: o.whenCardId, doCardId: o.doCardId,
        enabled: o.enabled !== false,
      }];
    })
    : [];

  const now = typeof r.createdAt === 'number' ? r.createdAt : 0;
  return {
    schemaVersion: MISSION_SCHEMA_VERSION,
    id: r.id,
    titleToken: typeof r.titleToken === 'string' ? r.titleToken : 'my-helper',
    goalId: r.goalId,
    toolIds: strings(r.toolIds),
    rules,
    memoryIds: strings(r.memoryIds),
    limitCardIds: strings(r.limitCardIds),
    approvalToolIds: strings(r.approvalToolIds),
    passedEdgeCases: strings(r.passedEdgeCases),
    createdAt: now,
    updatedAt: typeof r.updatedAt === 'number' ? r.updatedAt : now,
  };
}

/** Examples are per-mission and per-session — §7's scoping rule. */
export function missionExamples(mission: AgentMission): ExampleSet {
  const goal = missionGoal(mission.goalId);
  return {
    id: `${mission.id}:examples`,
    labels: goal.attributes,
    examples: [],
  };
}
