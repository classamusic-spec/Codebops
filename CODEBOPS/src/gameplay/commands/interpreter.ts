/**
 * Deterministic command interpreter — Phase 11+ edition.
 * Pure logic: no Three.js, no DOM, no CSS. Fully serializable in/out.
 *
 * Command model (ages 3–7): ABSOLUTE screen directions. The ⬆️ tile always
 * moves up-screen, ⬅️ left, etc. — no hidden "facing" state to reason
 * about. (Legacy relative commands 'move'/'turnLeft'/'turnRight' still
 * execute for backward compatibility.)
 *
 * Condition tiles (Pattern Forest): an IF tile guards the NEXT tile —
 * "if you see a flower, grab it" — otherwise the next tile is skipped.
 *
 * Multi-bot (Robot Town): a Swap tile switches which bot the following
 * commands control. Some pads are glass-domed (zipBlocked) — only bots
 * may roll through.
 *
 * Fairy-ring rule: a goal is spoiled if a WRONG-kind item is dropped on
 * it — careful picking matters.
 */
import {
  Cell, Direction, cellKey, dirDelta, inBounds, sameCell, turnLeft, turnRight,
} from '../grid/grid';
import type { LevelDef } from '../../data/schemas/level';

export type CommandId =
  | 'move' | 'moveUp' | 'moveDown' | 'moveLeft' | 'moveRight'
  | 'turnLeft' | 'turnRight' | 'grab' | 'drop'
  | 'repeat' | 'repeatUntil'
  | 'ifFlower' | 'ifMushroom'
  | 'swap';

export interface ProgramStep {
  readonly cmd: CommandId;
  /** Repeat count (2–4) for 'repeat' steps. */
  readonly arg?: number;
}

export type ItemLocation = Cell | { carriedBy: number } | { delivered: Cell };

export interface ActorState {
  col: number;
  row: number;
  dir: Direction;
}

export interface GameState {
  readonly cols: number;
  readonly rows: number;
  readonly blocked: ReadonlySet<string>;
  /** Cells only bots (actor > 0) may enter — Zip bumps on their glass domes. */
  readonly zipBlocked: ReadonlySet<string>;
  actors: ActorState[];
  /** Index into actors — which bot the commands currently control. */
  active: number;
  items: Record<string, ItemLocation>;
  /** Goals accept an item KIND ('strawberry' | 'pearl' | 'flower' | 'battery'). */
  goals: ReadonlyArray<{ col: number; row: number; accepts: string }>;
}

export type ExecEvent =
  | { type: 'commandStart'; index: number; command: CommandId; iter?: { k: number; n: number | '∞' } }
  | { type: 'move'; actor: number; from: Cell; to: Cell; dir: Direction }
  | { type: 'bump'; actor: number; at: Cell; dir: Direction }
  | { type: 'turn'; actor: number; from: Direction; to: Direction }
  | { type: 'grab'; actor: number; item: string; at: Cell }
  | { type: 'grabFail'; actor: number; at: Cell }
  | { type: 'drop'; actor: number; item: string; at: Cell; onGoal: boolean }
  | { type: 'dropFail'; actor: number; at: Cell }
  | { type: 'condition'; index: number; kind: string; ok: boolean }
  | { type: 'condSkip'; index: number; command: CommandId }
  | { type: 'swap'; from: number; to: number }
  | { type: 'ruleFire'; actor: number; trigger: string; action: string }
  | { type: 'loopStart'; index: number; kind: 'count' | 'until'; count?: number }
  | { type: 'loopIter'; index: number; iter: number; count?: number }
  | { type: 'loopEnd'; index: number }
  | { type: 'loopOverflow'; index: number }
  | { type: 'loopFail'; index: number; reason: 'nothing' | 'nested' }
  | { type: 'done'; success: boolean };

export interface RunResult {
  events: ExecEvent[];
  finalState: GameState;
  success: boolean;
  /** Snapshot of ALL actors after each emitted action (replay scrubbing). */
  actorTrail: Array<{ actors: ActorState[] }>;
  /** True when a repeat-until hit the safety cap (Forever Fred moment). */
  overflowed: boolean;
}

export const MAX_STEPS = 80;
export const UNTIL_CAP = 12;

const CONDITION_KIND: Partial<Record<CommandId, string>> = {
  ifFlower: 'flower',
  ifMushroom: 'mushroom',
};

export function initialState(level: LevelDef): GameState {
  const items: Record<string, ItemLocation> = {};
  for (const item of level.items) items[item.id] = { col: item.col, row: item.row };
  const actors: ActorState[] = [{ ...level.start }];
  if (level.botStart) actors.push({ ...level.botStart });
  return {
    cols: level.cols,
    rows: level.rows,
    blocked: new Set(level.blocked.map(cellKey)),
    zipBlocked: new Set((level.zipBlocked ?? []).map(cellKey)),
    actors,
    active: 0,
    items,
    goals: level.goals,
  };
}

function successOf(state: GameState, kindOf: (id: string) => string, collectAll = false): boolean {
  const goalsOk = state.goals.every((g) => {
    let hasWanted = false;
    for (const [id, loc] of Object.entries(state.items)) {
      if (typeof loc !== 'object') continue;
      const at = 'delivered' in loc ? loc.delivered : loc;
      if (!sameCell(at as Cell, g)) continue;
      if (kindOf(id) === g.accepts && 'delivered' in loc) hasWanted = true;
      // Fairy-ring rule: a wrong-kind item on the ring spoils it.
      if (kindOf(id) !== g.accepts) return false;
    }
    return hasWanted;
  });
  if (!goalsOk) return false;
  if (!collectAll) return true;
  // "Collect every badge": all goal-accepted items must be delivered.
  return Object.entries(state.items).every(([id, loc]) => {
    const accepted = state.goals.some((g) => g.accepts === kindOf(id));
    if (!accepted) return true;
    return typeof loc === 'object' && 'delivered' in loc;
  });
}

/** A helper rule (Agent Academy): "WHEN you step on a <trigger>, GRAB it." */
export interface HelperRule {
  readonly trigger: string;
  readonly action: 'grab';
}

/** Execute a program deterministically. Never mutates `level`. */
export function runProgram(
  level: LevelDef,
  program: readonly ProgramStep[],
  rule: HelperRule | null = null,
): RunResult {
  const state = initialState(level);
  const events: ExecEvent[] = [];
  const actorTrail: RunResult['actorTrail'] = [];
  let steps = 0;
  let overflowed = false;
  /** Set by a failed IF — the next simple command is skipped. */
  let skipNext = false;

  const kindOf = (id: string): string => level.items.find((it) => it.id === id)?.kind ?? id;
  const goalAt = (c: Cell) => state.goals.find((g) => g.col === c.col && g.row === c.row);
  const snapshot = () => actorTrail.push({ actors: state.actors.map((a) => ({ ...a })) });

  const tryStep = (dir: Direction): ExecEvent => {
    const me = state.actors[state.active];
    const { dc, dr } = dirDelta(dir);
    const to = { col: me.col + dc, row: me.row + dr };
    const from = { col: me.col, row: me.row };
    const glass = state.active === 0 && state.zipBlocked.has(cellKey(to));
    if (!inBounds(to, state.cols, state.rows) || state.blocked.has(cellKey(to)) || glass) {
      return { type: 'bump', actor: state.active, at: to, dir };
    }
    me.col = to.col;
    me.row = to.row;
    return { type: 'move', actor: state.active, from, to, dir };
  };

  /** Execute one tile (simple command, condition, or swap). */
  const execTile = (
    cmd: Exclude<CommandId, 'repeat' | 'repeatUntil'>,
    index: number,
    iter?: { k: number; n: number | '∞' },
  ): ExecEvent | null => {
    if (steps >= MAX_STEPS) return null;
    steps++;

    const condKind = CONDITION_KIND[cmd];
    if (condKind) {
      const me = state.actors[state.active];
      const ok = Object.entries(state.items).some(
        ([id, loc]) =>
          typeof loc === 'object' && !('delivered' in loc) && !('carriedBy' in loc) &&
          sameCell(loc as Cell, me) && kindOf(id) === condKind,
      );
      events.push({ type: 'condition', index, kind: condKind, ok });
      skipNext = !ok;
      snapshot();
      return null;
    }

    events.push({ type: 'commandStart', index, command: cmd, ...(iter ? { iter } : {}) });

    if (skipNext) {
      skipNext = false;
      events.push({ type: 'condSkip', index, command: cmd });
      snapshot();
      return null;
    }

    let action: ExecEvent | null = null;
    switch (cmd) {
      case 'move':
        action = tryStep(state.actors[state.active].dir);
        break;
      case 'moveUp': action = tryStep('N'); break;
      case 'moveDown': action = tryStep('S'); break;
      case 'moveLeft': action = tryStep('W'); break;
      case 'moveRight': action = tryStep('E'); break;
      case 'turnLeft':
      case 'turnRight': {
        const me = state.actors[state.active];
        const to = cmd === 'turnLeft' ? turnLeft(me.dir) : turnRight(me.dir);
        action = { type: 'turn', actor: state.active, from: me.dir, to };
        me.dir = to;
        break;
      }
      case 'swap': {
        if (state.actors.length > 1) {
          const from = state.active;
          state.active = (state.active + 1) % state.actors.length;
          action = { type: 'swap', from, to: state.active };
        }
        break;
      }
      case 'grab': {
        const me = state.actors[state.active];
        const at = { col: me.col, row: me.row };
        const found = Object.entries(state.items).find(
          ([, loc]) =>
            typeof loc === 'object' && !('delivered' in loc) && !('carriedBy' in loc) &&
            sameCell(loc as Cell, at),
        );
        if (found) {
          state.items[found[0]] = { carriedBy: state.active };
          action = { type: 'grab', actor: state.active, item: found[0], at };
        } else {
          action = { type: 'grabFail', actor: state.active, at };
        }
        break;
      }
      case 'drop': {
        const me = state.actors[state.active];
        const at = { col: me.col, row: me.row };
        const mine = Object.entries(state.items).filter(
          ([, loc]) => typeof loc === 'object' && 'carriedBy' in loc && loc.carriedBy === state.active,
        );
        if (mine.length === 0) {
          action = { type: 'dropFail', actor: state.active, at };
        } else {
          // The active bot unpacks everything it carries, one piece at a time.
          for (const [id] of mine) {
            const goal = goalAt(at);
            const onGoal = !!goal && goal.accepts === kindOf(id);
            state.items[id] = onGoal ? { delivered: { ...at } } : { ...at };
            events.push({ type: 'drop', actor: state.active, item: id, at, onGoal });
          }
          action = null;
        }
        break;
      }
    }
    if (action) events.push(action);
    // Helper rule (Agent Academy): stepping onto a trigger fires it.
    if (action && action.type === 'move' && rule) {
      const me = state.actors[state.active];
      const hit = Object.entries(state.items).find(
        ([id, loc]) =>
          typeof loc === 'object' && !('delivered' in loc) && !('carriedBy' in loc) &&
          sameCell(loc as Cell, me) && kindOf(id) === rule.trigger,
      );
      if (hit) {
        events.push({ type: 'ruleFire', actor: state.active, trigger: rule.trigger, action: rule.action });
        state.items[hit[0]] = { carriedBy: state.active };
        events.push({ type: 'grab', actor: state.active, item: hit[0], at: { col: me.col, row: me.row } });
      }
    }
    snapshot();
    return action;
  };

  /** The loop body = every tile since the last loop tile (or program start). */
  const blockBefore = (index: number): Array<{ cmd: Exclude<CommandId, 'repeat' | 'repeatUntil'>; source: number }> => {
    const body: Array<{ cmd: Exclude<CommandId, 'repeat' | 'repeatUntil'>; source: number }> = [];
    for (let j = index - 1; j >= 0; j--) {
      const s = program[j];
      if (s.cmd === 'repeat' || s.cmd === 'repeatUntil') break;
      body.unshift({ cmd: s.cmd, source: j });
    }
    return body;
  };

  /**
   * Block commands are "definitions" consumed by their loop tile:
   * [Right, Repeat ×3] means step right three times TOTAL — the loop tile
   * stands in for writing the block out again and again.
   */
  const consumed = new Set<number>();
  for (let i = 0; i < program.length; i++) {
    const s = program[i];
    if (s.cmd === 'repeat' || s.cmd === 'repeatUntil') {
      for (const b of blockBefore(i)) consumed.add(b.source);
    }
  }

  /** Stop condition for repeat-until: bump, successful grab, or a goal reached. */
  const shouldStop = (actions: Array<ExecEvent | null>): boolean => {
    for (const a of actions) {
      if (!a) continue;
      if (a.type === 'bump' || a.type === 'grab') return true;
      if (a.type === 'drop' && a.onGoal) return true;
    }
    const me = state.actors[state.active];
    return state.goals.some((g) => g.col === me.col && g.row === me.row);
  };

  for (let i = 0; i < program.length; i++) {
    if (steps >= MAX_STEPS) break;
    if (consumed.has(i)) continue; // part of a loop block — runs inside its loop
    const step = program[i];

    if (step.cmd === 'repeat') {
      const body = blockBefore(i);
      if (body.length === 0) {
        events.push({ type: 'loopFail', index: i, reason: 'nothing' });
        continue;
      }
      const count = Math.min(4, Math.max(2, step.arg ?? 2));
      events.push({ type: 'loopStart', index: i, kind: 'count', count });
      for (let k = 1; k <= count && steps < MAX_STEPS; k++) {
        events.push({ type: 'loopIter', index: i, iter: k, count });
        for (const b of body) execTile(b.cmd, b.source, { k, n: count });
        // An IF only guards a tile inside its own iteration.
        skipNext = false;
      }
      events.push({ type: 'loopEnd', index: i });
      continue;
    }

    if (step.cmd === 'repeatUntil') {
      const body = blockBefore(i);
      if (body.length === 0) {
        events.push({ type: 'loopFail', index: i, reason: 'nothing' });
        continue;
      }
      events.push({ type: 'loopStart', index: i, kind: 'until' });
      let k = 0;
      for (;;) {
        k++;
        if (k > UNTIL_CAP || steps >= MAX_STEPS) {
          events.push({ type: 'loopOverflow', index: i });
          overflowed = true;
          break;
        }
        events.push({ type: 'loopIter', index: i, iter: k });
        const actions = body.map((b) => execTile(b.cmd, b.source, { k, n: '∞' }));
        // An IF only guards a tile inside its own iteration.
        skipNext = false;
        if (shouldStop(actions)) break;
      }
      events.push({ type: 'loopEnd', index: i });
      continue;
    }

    execTile(step.cmd, i);
  }

  const success = successOf(state, kindOf, level.collectAll === true);
  events.push({ type: 'done', success });
  return { events, finalState: state, success, actorTrail, overflowed };
}

/** Path preview: predicted cells the ACTIVE bot will visit (before running). */
export function previewPath(
  level: LevelDef,
  program: readonly ProgramStep[],
): Array<{ cell: Cell; kind: 'visit' | 'bump' | 'goal' }> {
  const { events } = runProgram(level, program);
  const out: Array<{ cell: Cell; kind: 'visit' | 'bump' | 'goal' }> = [];
  const goalKeys = new Set(level.goals.map(cellKey));
  for (const e of events) {
    if (e.type === 'move') out.push({ cell: e.to, kind: goalKeys.has(cellKey(e.to)) ? 'goal' : 'visit' });
    if (e.type === 'bump') out.push({ cell: e.at, kind: 'bump' });
  }
  return out;
}
