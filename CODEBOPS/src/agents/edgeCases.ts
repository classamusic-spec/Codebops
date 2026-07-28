/**
 * Edge-case play (§12).
 *
 * After a child's plan works, change one thing and ask the same question.
 * The basket is already full. The item is a colour nobody mentioned. The
 * sensor is fogged. The helper remembers yesterday.
 *
 * The lesson is exact and worth stating: **a system that works once is
 * not a system that works.** That is the difference between a child who
 * has produced a correct answer and a child who has built something.
 *
 * The tone rules are as load-bearing as the mechanics. §12 forbids trick
 * questions, harsh failure, lost rewards, shame and timers. So:
 *  - an edge case is offered AFTER a success, never instead of one;
 *  - stars already earned are never taken back;
 *  - the framing is always "let's see if your plan still works", which
 *    is curiosity, not a test.
 */
import type { AgentObservation, AgentMemoryState, AgentToken } from './types';
import type { CurriculumStageId } from '../data/curriculum/stages';
import type { AgentWorld } from './engine';

/**
 * A change to the starting world.
 *
 * Declarative rather than a function so a scenario is data: saveable,
 * replayable, and inspectable by a test. A function could do anything;
 * a patch can only do these five things.
 */
export type StatePatch =
  | { readonly kind: 'removeSubjects'; readonly subjectKind: AgentToken }
  | { readonly kind: 'addSubject'; readonly subject: AgentObservation }
  | { readonly kind: 'setAttribute'; readonly subjectId: string; readonly attribute: AgentToken }
  | { readonly kind: 'obscure'; readonly subjectId: string }
  | { readonly kind: 'presetMemory'; readonly memoryId: string; readonly value: AgentMemoryState[string] };

export interface EdgeCaseDefinition {
  readonly id: string;
  readonly changedInitialState: readonly StatePatch[];
  /** Always an invitation. Never a warning, never a challenge. */
  readonly childFacingPrompt: string;
  readonly expectedConcepts: readonly CurriculumStageId[];
  /**
   * What a good plan does here. Used by the report to say what the child
   * showed, not to gate the level — a plan that fails an edge case still
   * keeps every star it earned.
   */
  readonly childFacingLesson: string;
}

/**
 * The library. Deliberately small and general: these are the surprises
 * that make sense in a meadow, a factory and an app alike, which is what
 * lets one edge case be reused rather than re-authored per level.
 */
export const EDGE_CASES: readonly EdgeCaseDefinition[] = [
  {
    id: 'already-done',
    changedInitialState: [{ kind: 'presetMemory', memoryId: 'watered', value: ['flower-1', 'flower-2'] }],
    childFacingPrompt: 'This time, some of it is already done. Will your plan still work?',
    expectedConcepts: ['state', 'variables'],
    childFacingLesson: 'A good plan checks before it acts.',
  },
  {
    id: 'unknown-thing',
    changedInitialState: [{
      kind: 'addSubject',
      subject: { subjectId: 'mystery-1', kind: 'mystery', attributes: [], clear: true },
    }],
    childFacingPrompt: "There's something new here. What will your helper do?",
    expectedConcepts: ['conditions', 'agents'],
    childFacingLesson: 'When a helper meets something new, asking is a good answer.',
  },
  {
    id: 'cannot-see',
    changedInitialState: [{ kind: 'obscure', subjectId: 'flower-1' }],
    childFacingPrompt: "It's a bit foggy today. Will your helper still know what to do?",
    expectedConcepts: ['conditions', 'agents'],
    childFacingLesson: 'A helper that cannot see should stop, not guess.',
  },
  {
    id: 'nothing-to-do',
    changedInitialState: [{ kind: 'removeSubjects', subjectKind: 'flower' }],
    childFacingPrompt: 'Everything is already finished. What happens now?',
    expectedConcepts: ['conditions', 'loops'],
    childFacingLesson: 'A plan should end tidily even when there is nothing to do.',
  },
  {
    id: 'all-the-same',
    changedInitialState: [
      { kind: 'setAttribute', subjectId: 'flower-1', attribute: 'droopy' },
      { kind: 'setAttribute', subjectId: 'flower-2', attribute: 'droopy' },
      { kind: 'setAttribute', subjectId: 'flower-3', attribute: 'droopy' },
    ],
    childFacingPrompt: 'Today they all need help. Does your plan know when to stop?',
    expectedConcepts: ['loops', 'variables'],
    childFacingLesson: 'A stopping rule matters most when there is a lot to do.',
  },
];

const BY_ID = new Map(EDGE_CASES.map((e) => [e.id, e]));

export function edgeCase(id: string): EdgeCaseDefinition {
  const e = BY_ID.get(id);
  if (!e) throw new Error(`[edgeCases] Unknown edge case "${id}"`);
  return e;
}

/** Apply a scenario's patches. Pure: the original world is untouched. */
export function applyPatches(
  world: AgentWorld,
  memory: AgentMemoryState,
  patches: readonly StatePatch[],
): { world: AgentWorld; memory: AgentMemoryState } {
  let subjects: AgentObservation[] = world.subjects.map((s) => ({ ...s }));
  let nextMemory: AgentMemoryState = { ...memory };

  for (const p of patches) {
    switch (p.kind) {
      case 'removeSubjects':
        subjects = subjects.filter((s) => s.kind !== p.subjectKind);
        break;
      case 'addSubject':
        subjects = [...subjects, { ...p.subject }];
        break;
      case 'setAttribute':
        subjects = subjects.map((s) => (
          s.subjectId === p.subjectId && !s.attributes.includes(p.attribute)
            ? { ...s, attributes: [...s.attributes, p.attribute] }
            : s
        ));
        break;
      case 'obscure':
        subjects = subjects.map((s) => (s.subjectId === p.subjectId ? { ...s, clear: false } : s));
        break;
      case 'presetMemory':
        nextMemory = { ...nextMemory, [p.memoryId]: p.value };
        break;
    }
  }
  return { world: { subjects }, memory: nextMemory };
}

/**
 * Which edge case to offer next.
 *
 * Deterministic — index into the list rather than a random draw — so a
 * child who replays a level gets the same surprise and can actually
 * work on it. A random scenario would make "try again" a lottery, and
 * the point is to let them fix their plan and see it hold.
 *
 * Only cases the level's world can express are considered: offering the
 * fog scenario where there is nothing to obscure would produce a
 * "surprise" in which nothing whatsoever changes.
 */
export function pickEdgeCase(
  world: AgentWorld,
  alreadySeen: readonly string[],
): EdgeCaseDefinition | null {
  const applicable = EDGE_CASES.filter((e) => appliesTo(e, world));
  const fresh = applicable.filter((e) => !alreadySeen.includes(e.id));
  return fresh[0] ?? null;
}

/** Would this scenario actually change anything in this world? */
export function appliesTo(edge: EdgeCaseDefinition, world: AgentWorld): boolean {
  return edge.changedInitialState.some((p) => {
    switch (p.kind) {
      case 'removeSubjects':
        return world.subjects.some((s) => s.kind === p.subjectKind);
      case 'addSubject':
      case 'presetMemory':
        return true;
      case 'setAttribute':
      case 'obscure':
        return world.subjects.some((s) => s.subjectId === p.subjectId);
    }
  });
}
