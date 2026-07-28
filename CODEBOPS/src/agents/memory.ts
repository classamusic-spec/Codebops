/**
 * Helper memory (§15.4) — what a Bop remembers, and what it forgets.
 *
 * Memory is the machinery behind Forgetti: "it forgot what already
 * happened" is only a teachable moment if remembering is something the
 * child explicitly added and can watch working.
 *
 * Every function here is pure. Memory state goes in, a NEW state comes
 * out. Nothing mutates, so a trace can hold the memory a decision was
 * actually made against, which is what §18 needs and what makes a wrong
 * answer explainable after the fact rather than only re-runnable.
 */
import type {
  AgentMemoryDefinition, AgentMemoryState, AgentValue, AgentLimits,
} from './types';

/** Starting memory, straight from the definitions. */
export function initialMemory(defs: readonly AgentMemoryDefinition[]): AgentMemoryState {
  const out: Record<string, AgentValue> = {};
  for (const d of defs) out[d.id] = clone(d.initialValue);
  return out;
}

function clone(v: AgentValue): AgentValue {
  return Array.isArray(v) ? [...v] : v;
}

export function readMemory(state: AgentMemoryState, id: string): AgentValue | undefined {
  return state[id];
}

/**
 * Remember one more thing.
 *
 * Returns the state unchanged when the entry is already there — which
 * is what makes "don't water the same flower twice" work at all, and
 * makes the operation safe to call on every pass.
 */
export function remember(
  state: AgentMemoryState,
  def: AgentMemoryDefinition,
  subjectId: string,
  limits: AgentLimits,
): { state: AgentMemoryState; full: boolean } {
  if (def.valueType !== 'token-set') {
    return { state: { ...state, [def.id]: subjectId }, full: false };
  }
  const current = asSet(state[def.id]);
  if (current.includes(subjectId)) return { state, full: false };
  // Two caps, and the tighter one wins: the helper's own budget (§29's
  // "unlimited memory" hazard) and this memory's own declared ceiling.
  const cap = Math.min(def.maximumEntries ?? limits.maximumMemoryEntries, limits.maximumMemoryEntries);
  if (current.length >= cap) return { state, full: true };
  return { state: { ...state, [def.id]: [...current, subjectId] }, full: false };
}

/** Forget everything under one memory id, back to how it started. */
export function forget(
  state: AgentMemoryState,
  def: AgentMemoryDefinition,
): AgentMemoryState {
  return { ...state, [def.id]: clone(def.initialValue) };
}

/** Add to a counter. Non-numeric memory is left alone rather than coerced. */
export function count(
  state: AgentMemoryState,
  def: AgentMemoryDefinition,
  by: number,
): AgentMemoryState {
  if (def.valueType !== 'number') return state;
  const current = typeof state[def.id] === 'number' ? (state[def.id] as number) : 0;
  return { ...state, [def.id]: current + by };
}

export function setFlag(
  state: AgentMemoryState,
  def: AgentMemoryDefinition,
  value: boolean,
): AgentMemoryState {
  if (def.valueType !== 'boolean') return state;
  return { ...state, [def.id]: value };
}

/** Does this memory hold `subjectId`? False for memory that is not a set. */
export function memoryContains(
  state: AgentMemoryState,
  id: string,
  subjectId: string,
): boolean {
  const v = state[id];
  if (Array.isArray(v)) return v.includes(subjectId);
  return typeof v === 'string' && v === subjectId;
}

export function numberOf(state: AgentMemoryState, id: string): number {
  const v = state[id];
  if (typeof v === 'number') return v;
  if (Array.isArray(v)) return v.length;
  return 0;
}

export function flagOf(state: AgentMemoryState, id: string): boolean {
  return state[id] === true;
}

function asSet(v: AgentValue | undefined): readonly string[] {
  return Array.isArray(v) ? v : [];
}

/**
 * Memory that survives to the next run.
 *
 * `resetPolicy` is what makes stale memory a designable thing rather
 * than an accident: a helper that remembers watering across a whole
 * project is the setup for Forgetti's opposite — the helper that
 * remembers something no longer true, and skips a flower that has since
 * drooped again.
 */
export function carryOver(
  state: AgentMemoryState,
  defs: readonly AgentMemoryDefinition[],
  boundary: 'level' | 'project' | 'profile',
): AgentMemoryState {
  const RANK = { level: 0, project: 1, profile: 2 } as const;
  const out: Record<string, AgentValue> = {};
  for (const d of defs) {
    // A memory survives a boundary only if its policy outlives it.
    out[d.id] = RANK[d.resetPolicy] > RANK[boundary]
      ? clone(state[d.id] ?? d.initialValue)
      : clone(d.initialValue);
  }
  return out;
}
