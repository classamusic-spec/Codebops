/**
 * What a built app SHOWS (Curriculum Addendum §23, §24; App Lab §12).
 *
 * The rule the addendum is emphatic about: finishing something is not
 * evidence. "Built one app" says nothing about what a child understood, so
 * this module reads the project and the run and only records what is
 * actually there — a loop in the scripts, a question with two answers, a
 * repair after a surprise.
 *
 * Two gates keep it honest:
 *  - the concept must appear in the child's own scripts, not merely in the
 *    kit's allow-list;
 *  - the app must have RUN and done something, because a script nobody
 *    ever ran is an intention rather than a demonstration.
 *
 * Pure. The caller writes the events into the same evidence log the levels
 * use, so the Learning Garden and the Campfire need no special case.
 */
import type { MiniAppProject } from './miniAppProject';
import { titleText } from './miniAppProject';
import type { MiniAppCommand } from './miniAppTypes';
import { flattenCommands } from './miniAppTypes';
import type { EvidenceEvent } from '../data/curriculum/mastery';
import type { CurriculumStageId } from '../data/curriculum/stages';
import { appKitForType } from '../data/app-lab/appLabDefinition';

/** What one finished run of a built app can demonstrate. */
export interface CreationFacts {
  readonly usedLoop: boolean;
  readonly usedBranch: boolean;
  readonly usedCondition: boolean;
  readonly usedVariable: boolean;
  readonly usedMessage: boolean;
  readonly usedJob: boolean;
  readonly usedSceneChange: boolean;
  readonly usedStateChange: boolean;
  readonly usedApproval: boolean;
  readonly scriptCount: number;
  readonly parallelScripts: boolean;
  /** True when the app actually ran and something happened. */
  readonly ran: boolean;
  /** True when the child changed the app after seeing it run. */
  readonly repairedAfterRunning: boolean;
}

/** Read the project (and what happened to it) rather than trusting the kit. */
export function factsFor(
  project: MiniAppProject,
  opts: { ran: boolean; repairedAfterRunning: boolean },
): CreationFacts {
  const all: MiniAppCommand[] = project.scripts.flatMap((s) => flattenCommands(s.commands));
  const has = (kind: MiniAppCommand['kind']): boolean => all.some((c) => c.kind === kind);
  // Two or more scripts answering the same trigger genuinely run together.
  const triggerKeys = project.scripts.map((s) => JSON.stringify(s.trigger));
  const parallel = triggerKeys.some((k, i) => triggerKeys.indexOf(k) !== i);
  return {
    usedLoop: has('repeatN') || has('repeatUntil'),
    usedBranch: has('ifElse'),
    usedCondition: has('if') || has('ifElse') || has('repeatUntil'),
    usedVariable: has('increaseCounter') || has('decreaseCounter') || has('resetCounter'),
    usedMessage: has('sendMessage') || has('waitForMessage'),
    usedJob: has('callJob') || project.jobs.length > 0,
    usedSceneChange: has('changeScene'),
    usedStateChange: has('changeState') || has('show') || has('hide'),
    usedApproval: has('askForApproval'),
    scriptCount: project.scripts.length,
    parallelScripts: parallel,
    ran: opts.ran,
    repairedAfterRunning: opts.repairedAfterRunning,
  };
}

interface Claim {
  readonly stage: CurriculumStageId;
  readonly requirement: string;
  readonly when: (f: CreationFacts) => boolean;
  /** Completes "In <app name>, …" */
  readonly note: (f: CreationFacts) => string;
}

/**
 * Each claim names a real evidence requirement from the curriculum
 * registry, so a creation feeds the same mastery model as a level.
 */
const CLAIMS: readonly Claim[] = [
  {
    stage: 'sequence', requirement: 'seq-order',
    when: (f) => f.scriptCount > 0,
    note: (f) => `put ${f.scriptCount === 1 ? 'a job' : `${f.scriptCount} jobs`} in order and ran them`,
  },
  {
    stage: 'events', requirement: 'evt-connect',
    when: (f) => f.scriptCount > 0,
    note: () => 'connected something happening to something being done',
  },
  {
    stage: 'loops', requirement: 'loop-replace',
    when: (f) => f.usedLoop,
    note: () => 'used a loop instead of writing the same step out again',
  },
  {
    stage: 'conditions', requirement: 'cond-check',
    when: (f) => f.usedCondition,
    note: () => 'made the app check something before it acted',
  },
  {
    stage: 'if-else', requirement: 'ifelse-two',
    when: (f) => f.usedBranch,
    note: () => 'gave the app two different ways to go',
  },
  {
    stage: 'variables', requirement: 'var-update',
    when: (f) => f.usedVariable,
    note: () => 'kept a number the app remembered and changed',
  },
  {
    stage: 'state', requirement: 'state-identify',
    when: (f) => f.usedStateChange,
    note: () => 'changed what something was, and what happened next changed too',
  },
  {
    stage: 'messages', requirement: 'msg-send',
    when: (f) => f.usedMessage,
    note: () => 'had one thing tell another thing something',
  },
  {
    stage: 'parallelism', requirement: 'par-coordinate',
    when: (f) => f.parallelScripts || f.usedMessage,
    note: () => 'had more than one thing working at the same time',
  },
  {
    stage: 'functions', requirement: 'fn-reuse',
    when: (f) => f.usedJob,
    note: () => 'saved a job once and used it again',
  },
  {
    stage: 'decomposition', requirement: 'dec-split',
    when: (f) => f.scriptCount >= 3 || f.usedSceneChange,
    note: () => 'split the app into separate small jobs',
  },
  {
    stage: 'debugging', requirement: 'dbg-change',
    when: (f) => f.repairedAfterRunning,
    note: () => 'watched it run, then changed it and tried again',
  },
  {
    stage: 'agents', requirement: 'agent-approval',
    when: (f) => f.usedApproval,
    note: () => 'built a helper that asks a grown-up before it acts',
  },
];

/**
 * Evidence for one finished creation. Returns [] until the app has been
 * run — building it is the intention, running it is the demonstration.
 */
export function evidenceForCreation(
  project: MiniAppProject, facts: CreationFacts,
): EvidenceEvent[] {
  if (!facts.ran) return [];
  const name = titleText(project.title) || 'their own app';
  return CLAIMS.filter((c) => c.when(facts)).map((c) => ({
    stage: c.stage,
    requirement: c.requirement,
    // A built app is transfer by definition: the child chose the problem.
    phase: 'create' as const,
    levelId: `applab:${project.id}`,
    note: `In ${name}, ${c.note(facts)}.`,
  }));
}

/**
 * A sentence for the Campfire describing what a child actually made
 * (spec §24) — the app type, the ideas in it, and one concrete choice.
 */
export function parentSentenceFor(project: MiniAppProject, facts: CreationFacts): string {
  const kit = appKitForType(project.type)?.name ?? 'app';
  const name = titleText(project.title) || 'an app';
  const parts: string[] = [];
  if (facts.usedBranch) parts.push('handles a right and a wrong outcome');
  else if (facts.usedCondition) parts.push('checks something before acting');
  if (facts.usedVariable) parts.push('keeps a score');
  if (facts.usedLoop) parts.push('uses a loop');
  if (facts.usedJob) parts.push('reuses a saved job');
  if (facts.usedMessage) parts.push('has one part signal another');
  if (facts.usedSceneChange) parts.push('moves between scenes');
  if (facts.usedApproval) parts.push('asks permission before acting');

  const built = parts.length === 0
    ? `built "${name}", a ${kit} app with ${facts.scriptCount} job${facts.scriptCount === 1 ? '' : 's'}`
    : `built "${name}", a ${kit} app that ${listOf(parts)}`;
  const repaired = facts.repairedAfterRunning
    ? ' They tried it, changed something, and ran it again.'
    : '';
  return `Your child ${built}.${repaired}`;
}

function listOf(parts: readonly string[]): string {
  if (parts.length === 1) return parts[0];
  return `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`;
}

/** A suggestion a grown-up can act on away from the screen (spec §24). */
export function offScreenIdeaFor(facts: CreationFacts): string {
  if (facts.usedApproval) return 'Ask them what their helper is allowed to do without asking — and why.';
  if (facts.usedBranch) return 'Play "what if it had been the other way?" with their app and see what they change.';
  if (facts.usedLoop) return 'Look for loops together — stair steps, hand-washing, setting the table.';
  if (facts.usedVariable) return 'Count something together and talk about what makes the number go up.';
  return 'Ask them to explain their app to someone else — teaching it is the real test.';
}
