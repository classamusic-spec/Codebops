/**
 * Delivery machine interpreter — Phase 15: Delivery Depot (queues).
 *
 * Pure TypeScript, zero THREE/DOM imports. The depot has a QUEUE of
 * parcels — a line waiting their turn. The big idea of this phase is
 * FIRST IN, FIRST OUT: LOAD always takes the parcel at the FRONT of the
 * line, never one from the middle. The truck drives past the houses in
 * order, dropping each parcel at its address; because the queue is a
 * line and the houses are a row, one small loop drains the whole round.
 *
 * The loop is the app-wide block-before REPEAT: the tiles before a
 * REPEAT tile are its body, run `count` times (see jamMachine.ts).
 */

export type DvCommandId = 'dvLoad' | 'dvDeliver' | 'dvDrive' | 'dvRepeat';

export interface DvStep {
  cmd: DvCommandId;
  /** Repeat count (2–4) for dvRepeat. */
  arg?: number;
}

export const DV_REPEAT_MIN = 2;
export const DV_REPEAT_MAX = 4;

export interface DeliveryPackage {
  readonly id: string;
  /** House index this parcel belongs at (0-based). */
  readonly dest: number;
  readonly emoji: string;
}

export interface DeliveryGoal {
  readonly houses: number;
  readonly queue: readonly DeliveryPackage[];
}

export interface DeliveryRecord {
  readonly pkg: DeliveryPackage;
  readonly house: number;
  readonly correct: boolean;
}

export type DvEvent =
  | { type: 'commandStart'; index: number }
  | { type: 'load'; pkg: DeliveryPackage; front: number }
  | { type: 'loadNoop'; reason: 'full' | 'empty' }
  | { type: 'deliver'; pkg: DeliveryPackage; house: number; correct: boolean }
  | { type: 'deliverNoop' }
  | { type: 'drive'; house: number }
  | { type: 'driveEnd' }
  | { type: 'loopStart'; index: number; count: number }
  | { type: 'loopIter'; index: number; iter: number; count: number }
  | { type: 'loopEnd'; index: number }
  | { type: 'loopFail'; index: number }
  | { type: 'done' };

export interface DvResult {
  readonly events: readonly DvEvent[];
  readonly delivered: readonly DeliveryRecord[];
  readonly deliveredCount: number;
  readonly wrongCount: number;
  readonly allCorrect: boolean;
  readonly usedLoop: boolean;
}

export function runDelivery(program: readonly DvStep[], goal: DeliveryGoal): DvResult {
  let front = 0;                       // next parcel at the head of the queue
  let truck: DeliveryPackage | null = null;
  let atHouse = 0;
  const delivered: DeliveryRecord[] = [];
  const events: DvEvent[] = [];
  let usedLoop = false;

  const exec = (cmd: Exclude<DvCommandId, 'dvRepeat'>, index: number): void => {
    events.push({ type: 'commandStart', index });
    switch (cmd) {
      case 'dvLoad':
        if (truck !== null) { events.push({ type: 'loadNoop', reason: 'full' }); }
        else if (front >= goal.queue.length) { events.push({ type: 'loadNoop', reason: 'empty' }); }
        else { truck = goal.queue[front]; front++; events.push({ type: 'load', pkg: truck, front }); }
        break;
      case 'dvDeliver':
        if (truck === null) { events.push({ type: 'deliverNoop' }); }
        else {
          const correct = truck.dest === atHouse;
          delivered.push({ pkg: truck, house: atHouse, correct });
          events.push({ type: 'deliver', pkg: truck, house: atHouse, correct });
          truck = null;
        }
        break;
      case 'dvDrive':
        if (atHouse >= goal.houses - 1) { events.push({ type: 'driveEnd' }); }
        else { atHouse++; events.push({ type: 'drive', house: atHouse }); }
        break;
    }
  };

  const isRepeat = (cmd: DvCommandId): boolean => cmd === 'dvRepeat';
  const blockBefore = (index: number): Array<{ cmd: Exclude<DvCommandId, 'dvRepeat'>; source: number }> => {
    const body: Array<{ cmd: Exclude<DvCommandId, 'dvRepeat'>; source: number }> = [];
    for (let j = index - 1; j >= 0; j--) {
      if (isRepeat(program[j].cmd)) break;
      body.unshift({ cmd: program[j].cmd as Exclude<DvCommandId, 'dvRepeat'>, source: j });
    }
    return body;
  };
  const consumed = new Set<number>();
  for (let i = 0; i < program.length; i++) {
    if (isRepeat(program[i].cmd)) for (const b of blockBefore(i)) consumed.add(b.source);
  }

  for (let i = 0; i < program.length; i++) {
    if (consumed.has(i)) continue;
    const step = program[i];
    if (isRepeat(step.cmd)) {
      const body = blockBefore(i);
      if (body.length === 0) { events.push({ type: 'loopFail', index: i }); continue; }
      const count = Math.min(DV_REPEAT_MAX, Math.max(DV_REPEAT_MIN, step.arg ?? DV_REPEAT_MIN));
      usedLoop = true;
      events.push({ type: 'loopStart', index: i, count });
      for (let k = 1; k <= count; k++) {
        events.push({ type: 'loopIter', index: i, iter: k, count });
        for (const b of body) exec(b.cmd, b.source);
      }
      events.push({ type: 'loopEnd', index: i });
      continue;
    }
    exec(step.cmd as Exclude<DvCommandId, 'dvRepeat'>, i);
  }

  events.push({ type: 'done' });
  const wrongCount = delivered.filter((d) => !d.correct).length;
  const allCorrect =
    delivered.length === goal.queue.length && wrongCount === 0 && goal.queue.length > 0;
  return {
    events, delivered, deliveredCount: delivered.length, wrongCount, allCorrect, usedLoop,
  };
}

/** Kid-facing near-miss report for a failed round. */
export function deliveryMisses(program: readonly DvStep[], goal: DeliveryGoal): string[] {
  const r = runDelivery(program, goal);
  const misses: string[] = [];
  for (const d of r.delivered) {
    if (!d.correct) {
      misses.push(`Parcel ${d.pkg.emoji} landed at house ${d.house + 1}, but it belongs at house ${d.pkg.dest + 1}!`);
    }
  }
  const left = goal.queue.length - r.deliveredCount;
  if (left > 0) {
    misses.push(left === goal.queue.length
      ? 'Nothing got delivered yet — LOAD the front parcel, then DELIVER it!'
      : `${left} parcel${left === 1 ? '' : 's'} still waiting in line — a REPEAT loop can deliver the whole queue!`);
  }
  if (r.events.some((e) => e.type === 'loadNoop' && e.reason === 'full')) {
    misses.push('The truck was full — DELIVER the parcel you have before you LOAD another.');
  }
  if (misses.length > 3) return [...misses.slice(0, 3), `…and ${misses.length - 3} more.`];
  return misses;
}

/** The tile to spotlight on a failed run (traces the first wrong thing). */
export function deliveryBugIndex(program: readonly DvStep[], goal: DeliveryGoal): number {
  const r = runDelivery(program, goal);
  // an undelivered queue with no loop → the missing loop / too-few tiles
  if (r.deliveredCount < goal.queue.length) {
    const rep = program.findIndex((s) => s.cmd === 'dvRepeat');
    if (rep >= 0) return rep;
    return Math.max(0, program.length - 1);
  }
  // a wrong drop → the deliver tile that fired at the wrong house
  let cur = -1;
  for (const ev of r.events) {
    if (ev.type === 'commandStart') cur = ev.index;
    if (ev.type === 'deliver' && !ev.correct) return cur;
  }
  return -1;
}
