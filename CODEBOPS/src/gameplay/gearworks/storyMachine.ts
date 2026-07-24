/**
 * Story machine interpreter — Phase 17: Story Studio (state machines).
 *
 * Pure TypeScript, zero THREE/DOM imports. A little actor is always in
 * ONE state (a scene / a mood). Each tile is an EVENT, and an event only
 * moves the actor if there is a transition FROM the current state — the
 * heart of a state machine: the same action does different things (or
 * nothing) depending on where you are. Reach the target scene to win.
 */

export type StoryEventId =
  | 'stWake' | 'stHug' | 'stTickle' | 'stCalm'
  | 'stPlay' | 'stEat' | 'stYawn' | 'stSleep';

export interface StoryStep {
  cmd: StoryEventId;
}

export interface StoryTransition {
  readonly from: string;
  readonly event: StoryEventId;
  readonly to: string;
}

export interface StoryMachineDef {
  readonly states: readonly string[];
  readonly transitions: readonly StoryTransition[];
  readonly start: string;
}

export type StoryEvent =
  | { type: 'start'; state: string }
  | { type: 'transition'; index: number; from: string; event: StoryEventId; to: string }
  | { type: 'blocked'; index: number; state: string; event: StoryEventId }
  | { type: 'done'; state: string };

export interface StoryResult {
  readonly events: readonly StoryEvent[];
  /** Every state the actor stood in, in order (starts with the start state). */
  readonly path: readonly string[];
  readonly finalState: string;
  readonly transitionCount: number;
  readonly blockedCount: number;
}

function nextState(def: StoryMachineDef, from: string, event: StoryEventId): string | null {
  for (const t of def.transitions) if (t.from === from && t.event === event) return t.to;
  return null;
}

export function runStory(program: readonly StoryStep[], def: StoryMachineDef): StoryResult {
  const events: StoryEvent[] = [{ type: 'start', state: def.start }];
  const path: string[] = [def.start];
  let cur = def.start;
  let transitionCount = 0;
  let blockedCount = 0;

  program.forEach((step, index) => {
    const to = nextState(def, cur, step.cmd);
    if (to !== null) {
      events.push({ type: 'transition', index, from: cur, event: step.cmd, to });
      cur = to;
      path.push(cur);
      transitionCount++;
    } else {
      events.push({ type: 'blocked', index, state: cur, event: step.cmd });
      blockedCount++;
    }
  });

  events.push({ type: 'done', state: cur });
  return { events, path, finalState: cur, transitionCount, blockedCount };
}

export function storyReached(program: readonly StoryStep[], def: StoryMachineDef, target: string): boolean {
  return runStory(program, def).finalState === target;
}

/** The ordered list of events the actor took (drops the blocked no-ops). */
export function takenPath(program: readonly StoryStep[], def: StoryMachineDef): StoryEventId[] {
  const out: StoryEventId[] = [];
  for (const ev of runStory(program, def).events) if (ev.type === 'transition') out.push(ev.event);
  return out;
}

/** Breadth-first shortest event sequence from start to target (or null). */
export function shortestStory(def: StoryMachineDef, target: string): StoryEventId[] | null {
  const queue: Array<{ state: string; seq: StoryEventId[] }> = [{ state: def.start, seq: [] }];
  const seen = new Set<string>([def.start]);
  while (queue.length) {
    const { state, seq } = queue.shift()!;
    if (state === target) return seq;
    for (const t of def.transitions) {
      if (t.from === state && !seen.has(t.to)) {
        seen.add(t.to);
        queue.push({ state: t.to, seq: [...seq, t.event] });
      }
    }
  }
  return null;
}

/** All distinct simple (no repeated state) event sequences reaching target. */
export function allStoryPaths(def: StoryMachineDef, target: string, maxLen = 8): StoryEventId[][] {
  const paths: StoryEventId[][] = [];
  const walk = (state: string, seq: StoryEventId[], visited: Set<string>): void => {
    if (state === target && seq.length > 0) { paths.push(seq); return; }
    if (seq.length >= maxLen) return;
    for (const t of def.transitions) {
      if (t.from === state && !visited.has(t.to)) {
        walk(t.to, [...seq, t.event], new Set([...visited, t.to]));
      }
    }
  };
  walk(def.start, [], new Set([def.start]));
  return paths;
}

/** Kid-facing miss report for a run that did not reach the target scene. */
export function storyMisses(
  program: readonly StoryStep[],
  def: StoryMachineDef,
  target: string,
  stateLabel: (id: string) => string,
): string[] {
  const r = runStory(program, def);
  const misses: string[] = [];
  if (r.blockedCount > 0) {
    const firstBlocked = r.events.find((e) => e.type === 'blocked');
    if (firstBlocked && firstBlocked.type === 'blocked') {
      misses.push(`That didn't work while ${stateLabel(firstBlocked.state)} — try it from a different scene!`);
    }
  }
  if (r.finalState !== target) {
    misses.push(`The story ended at ${stateLabel(r.finalState)}, but you want ${stateLabel(target)}. Pick events that lead there!`);
  }
  if (program.length === 0) {
    misses.push('No events yet — add some scene tiles to tell the story!');
  }
  return misses;
}
