/**
 * Signal machine interpreter — Phase 10: signals and parallelism.
 *
 * Pure TypeScript, zero THREE/DOM imports. TWO machines run at the same
 * time in separate lanes, kept in sync by messages:
 *
 *   PACKER  FETCH · PACK · SEND SIGNAL          (fills a crate, tells)
 *   MAILER  WAIT FOR SIGNAL · SEND CRATE        (waits, then ships)
 *
 * A deterministic lockstep scheduler advances both lanes one step per
 * tick, PACKER before MAILER, so a SEND in the same tick is visible to
 * a matching WAIT. WAIT blocks its lane (without burning its program
 * counter) until a signal is pending, then consumes one — signals are
 * messages, received once. If the Mailer ships before the Packer packs,
 * it ships an EMPTY crate; if the Packer never signals, the Mailer
 * waits forever (a deadlock the scheduler detects and reports).
 *
 * Per-lane REPEAT loops are flattened before scheduling (counted, so
 * timing stays deterministic) using the same block-before rule as every
 * other Gearworks loop.
 */

export type SignalLaneId = 'packer' | 'mailer';

export type SignalCommandId =
  | 'sgFetch' | 'sgPack' | 'sgSendSignal'   // packer
  | 'sgWaitSignal' | 'sgSendCrate'          // mailer
  | 'sgRepeat';                             // either lane

export interface SignalStep {
  cmd: SignalCommandId;
  arg?: number;
}

export const SG_REPEAT_MIN = 2;
export const SG_REPEAT_MAX = 4;
export const SG_MAX_TICKS = 40;

export interface SignalState {
  readonly handReady: boolean;
  readonly crateGift: boolean;
  readonly signals: number;
  readonly delivered: number;
  readonly emptySends: number;
}

export interface SignalGoal {
  readonly target: number;
}

export type SgEvent =
  | { type: 'tick'; n: number }
  | { type: 'step'; lane: SignalLaneId; index: number; cmd: SignalCommandId; tick: number }
  | { type: 'fetched'; tick: number }
  | { type: 'packed'; tick: number } | { type: 'packFail'; reason: 'noGift' | 'crateFull'; tick: number }
  | { type: 'signalSent'; tick: number }
  | { type: 'signalReceived'; lane: SignalLaneId; index: number; tick: number }
  | { type: 'waiting'; lane: SignalLaneId; index: number; tick: number }
  | { type: 'delivered'; total: number; tick: number } | { type: 'emptySend'; tick: number }
  | { type: 'deadlock'; tick: number }
  | { type: 'done' };

export interface SgResult {
  readonly events: readonly SgEvent[];
  readonly finalState: SignalState;
  readonly success: boolean;
  readonly deadlocked: boolean;
  /** Did either lane use a REPEAT loop? */
  readonly usedLoop: boolean;
}

const isRepeat = (cmd: SignalCommandId): boolean => cmd === 'sgRepeat';

/** Expand a lane's REPEAT tiles into a flat primitive list (block-before). */
export function flattenLane(steps: readonly SignalStep[]): SignalCommandId[] {
  const flat: SignalCommandId[] = [];
  const blockBefore = (index: number): SignalCommandId[] => {
    const body: SignalCommandId[] = [];
    for (let j = index - 1; j >= 0; j--) {
      if (isRepeat(steps[j].cmd)) break;
      body.unshift(steps[j].cmd);
    }
    return body;
  };
  const consumed = new Set<number>();
  for (let i = 0; i < steps.length; i++) {
    if (isRepeat(steps[i].cmd)) for (let j = i - 1; j >= 0 && !isRepeat(steps[j].cmd); j--) consumed.add(j);
  }
  for (let i = 0; i < steps.length; i++) {
    if (consumed.has(i)) continue;
    const step = steps[i];
    if (isRepeat(step.cmd)) {
      const body = blockBefore(i);
      if (body.length === 0) continue;
      const count = Math.min(SG_REPEAT_MAX, Math.max(SG_REPEAT_MIN, step.arg ?? SG_REPEAT_MIN));
      for (let k = 0; k < count; k++) flat.push(...body);
      continue;
    }
    flat.push(step.cmd);
  }
  return flat;
}

export function runParallel(
  programs: { readonly packer: readonly SignalStep[]; readonly mailer: readonly SignalStep[] },
  goal: SignalGoal,
): SgResult {
  const flat: Record<SignalLaneId, SignalCommandId[]> = {
    packer: flattenLane(programs.packer),
    mailer: flattenLane(programs.mailer),
  };
  const usedLoop = programs.packer.some((s) => isRepeat(s.cmd)) || programs.mailer.some((s) => isRepeat(s.cmd));

  let s: SignalState = { handReady: false, crateGift: false, signals: 0, delivered: 0, emptySends: 0 };
  const pc: Record<SignalLaneId, number> = { packer: 0, mailer: 0 };
  const events: SgEvent[] = [];
  let deadlocked = false;

  const laneOrder: SignalLaneId[] = ['packer', 'mailer'];
  let tick = 0;
  for (; tick < SG_MAX_TICKS; tick++) {
    if (pc.packer >= flat.packer.length && pc.mailer >= flat.mailer.length) break;
    events.push({ type: 'tick', n: tick });
    let progressed = false;

    for (const lane of laneOrder) {
      if (pc[lane] >= flat[lane].length) continue;
      const cmd = flat[lane][pc[lane]];

      if (cmd === 'sgWaitSignal') {
        if (s.signals > 0) {
          s = { ...s, signals: s.signals - 1 };
          events.push({ type: 'signalReceived', lane, index: pc[lane], tick });
          pc[lane]++; progressed = true;
        } else {
          events.push({ type: 'waiting', lane, index: pc[lane], tick });
        }
        continue;
      }

      events.push({ type: 'step', lane, index: pc[lane], cmd, tick });
      switch (cmd) {
        case 'sgFetch': s = { ...s, handReady: true }; events.push({ type: 'fetched', tick }); break;
        case 'sgPack':
          if (s.crateGift) events.push({ type: 'packFail', reason: 'crateFull', tick });
          else if (!s.handReady) events.push({ type: 'packFail', reason: 'noGift', tick });
          else { s = { ...s, crateGift: true, handReady: false }; events.push({ type: 'packed', tick }); }
          break;
        case 'sgSendSignal': s = { ...s, signals: s.signals + 1 }; events.push({ type: 'signalSent', tick }); break;
        case 'sgSendCrate':
          if (s.crateGift) { s = { ...s, crateGift: false, delivered: s.delivered + 1 }; events.push({ type: 'delivered', total: s.delivered, tick }); }
          else { s = { ...s, emptySends: s.emptySends + 1 }; events.push({ type: 'emptySend', tick }); }
          break;
        default: break;
      }
      pc[lane]++; progressed = true;
    }

    if (!progressed) {
      // every remaining lane is blocked on a wait that will never clear
      events.push({ type: 'deadlock', tick });
      deadlocked = true;
      break;
    }
  }

  events.push({ type: 'done' });
  return { events, finalState: s, success: s.delivered >= goal.target, deadlocked, usedLoop };
}

export function signalMisses(
  programs: { readonly packer: readonly SignalStep[]; readonly mailer: readonly SignalStep[] },
  goal: SignalGoal,
): string[] {
  const r = runParallel(programs, goal);
  const misses: string[] = [];
  if (r.finalState.emptySends > 0) {
    misses.push('The Mailer shipped an EMPTY crate — it must WAIT FOR SIGNAL until the Packer is done!');
  }
  if (r.deadlocked) {
    misses.push('The Mailer waited forever — the Packer never sent a signal! Add SEND SIGNAL after PACK.');
  }
  if (r.finalState.delivered < goal.target) {
    misses.push(r.finalState.delivered === 0
      ? 'No gifts delivered yet — PACK a gift, SEND SIGNAL, then the Mailer WAITS and SHIPS!'
      : `Only ${r.finalState.delivered} of ${goal.target} gifts — do the hand-off again (or loop both lanes)!`);
  }
  return misses;
}
