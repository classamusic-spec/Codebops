/**
 * The shared mini-app runtime (spec §15, §16, §17).
 *
 * One runtime for all six kits. Templates constrain what a project may
 * contain; this file decides what happens when it runs, and it is the only
 * place that decides. There is no per-kit interpreter and there will not be
 * one — Phases 4–8 add commands here, not new engines.
 *
 * Shape follows the rest of CodeBops: pure TypeScript, zero THREE/DOM,
 * `run` returns a typed event list plus a final state, and the caller
 * animates the events at whatever speed the child's settings ask for. That
 * separation is what makes gameplay reproducible and Glitch Replay possible
 * — no result here depends on frame rate or animation duration.
 *
 * Safety is structural rather than defensive: a project arrives already
 * validated, every command is a closed union member, and the run is bounded
 * by the budget stored on the project itself.
 */
import type {
  MiniAppCommand, MiniAppStateToken, MiniAppColorToken, MessageToken,
  ApprovedSoundId, PreparedPhraseId, MiniAppTrigger, MiniAppCondition,
  MiniAppDirection,
} from './miniAppTypes';
import { DROP_TARGET_REF } from './miniAppTypes';
import { sceneLayout as sceneLayoutOf } from '../data/app-lab/sceneLayouts';
import type { MiniAppProject, MiniAppScript, MiniAppRuntimeBudget } from './miniAppProject';

// ---------------------------------------------------------------------
// Runtime state
// ---------------------------------------------------------------------

export interface ComponentRuntimeState {
  readonly state: MiniAppStateToken;
  readonly visible: boolean;
  readonly slotId: string;
  /** Set only once something has changed it, so "unset" stays meaningful. */
  readonly color?: MiniAppColorToken;
  readonly lit?: boolean;
  /** The phrase currently in this component's speech bubble. */
  readonly saying?: PreparedPhraseId;
  /** Where it started, so Return Home has somewhere to go. */
  readonly homeSlotId: string;
}

export interface MiniAppRuntimeSnapshot {
  readonly sceneId: string;
  readonly components: Readonly<Record<string, ComponentRuntimeState>>;
  readonly variables: Readonly<Record<string, number | boolean | string>>;
  readonly won: boolean;
  readonly celebrating: boolean;
}

export function initialRuntimeState(project: MiniAppProject): MiniAppRuntimeSnapshot {
  const components: Record<string, ComponentRuntimeState> = {};
  for (const scene of project.scenes) {
    for (const c of scene.components) {
      components[c.id] = {
        state: typeof c.initialState === 'string' ? c.initialState : 'idle',
        visible: c.initialState !== 'hidden',
        slotId: c.slotId,
        homeSlotId: c.slotId,
        ...(c.type === 'light' ? { lit: c.initialState === 'on' } : {}),
      };
    }
  }
  const variables: Record<string, number | boolean | string> = {};
  for (const v of project.variables) variables[v.id] = v.initialValue;
  return {
    sceneId: project.scenes[0]?.id ?? '',
    components,
    variables,
    won: false,
    celebrating: false,
  };
}

// ---------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------

export type MiniAppCommandOutcome =
  | { readonly kind: 'done' }
  /** Ran, but there was nothing to change. Not an error — worth showing. */
  | { readonly kind: 'noChange'; readonly why: string }
  /** The runtime does not know this command YET. Reported, never faked. */
  | { readonly kind: 'unsupported'; readonly why: string };

export interface MiniAppExecutionEvent {
  readonly step: number;
  readonly scriptId: string;
  /** The component the script belongs to. */
  readonly componentId: string;
  readonly command: MiniAppCommand;
  readonly stateBefore: MiniAppRuntimeSnapshot;
  readonly stateAfter: MiniAppRuntimeSnapshot;
  readonly outcome: MiniAppCommandOutcome;
  /** How long the player should linger here. 0 = instant. */
  readonly holdBeats: number;
  /** A sound the player should make when it reaches this event. */
  readonly sound?: ApprovedSoundId;
  /** How deep in the trigger chain this ran — 0 is the child's own tap. */
  readonly chainDepth: number;
}

export type TriggerCause =
  | { readonly kind: 'appStart' }
  | { readonly kind: 'sceneStart'; readonly sceneId: string }
  | { readonly kind: 'tap'; readonly componentId: string }
  | { readonly kind: 'drop'; readonly componentId: string; readonly ontoId: string }
  | { readonly kind: 'message'; readonly message: MessageToken }
  | { readonly kind: 'choice'; readonly componentId: string }
  | { readonly kind: 'counterChanged'; readonly variableId: string };

export interface MiniAppRunResult {
  readonly events: readonly MiniAppExecutionEvent[];
  readonly finalState: MiniAppRuntimeSnapshot;
  readonly stepsUsed: number;
  /** True when the run hit its step budget and was stopped. */
  readonly overflowed: boolean;
  /** True when at least one script matched the cause. */
  readonly triggered: boolean;
  /**
   * Set when the run stopped at an Ask First gate. Answer it and call run
   * again with the answer appended to `approvals`; the run replays
   * identically up to that point and then continues.
   */
  readonly awaitingApproval?: PendingApproval;
}

// ---------------------------------------------------------------------
// Trigger matching
// ---------------------------------------------------------------------

function triggerMatches(trigger: MiniAppTrigger, cause: TriggerCause, state: MiniAppRuntimeSnapshot): boolean {
  switch (trigger.kind) {
    case 'onAppStart': return cause.kind === 'appStart';
    case 'onSceneStart':
      return cause.kind === 'sceneStart' && cause.sceneId === trigger.sceneId;
    case 'onTap': return cause.kind === 'tap' && cause.componentId === trigger.targetId;
    case 'onDrop': return cause.kind === 'drop' && cause.componentId === trigger.targetId;
    case 'onChoiceSelected':
      return cause.kind === 'choice' && cause.componentId === trigger.targetId;
    case 'onMessage':
    case 'onSignal':
      return cause.kind === 'message' && cause.message === trigger.message;
    case 'onCounterChanged':
      return cause.kind === 'counterChanged' && cause.variableId === trigger.variableId;
    case 'onItemCollected':
      return cause.kind === 'tap' && cause.componentId === trigger.targetId;
    case 'onGoalReached':
      return cause.kind === 'tap' && cause.componentId === trigger.targetId;
    case 'onStateChanged':
      return state.components[trigger.targetId]?.state === trigger.state;
    case 'onSensorDetected':
      return cause.kind === 'tap' && cause.componentId === trigger.targetId;
  }
}

/**
 * Scripts that answer a cause, in a stable order: the order components sit
 * in their scene, then the order scripts were written. Two runs of the same
 * project always execute the same scripts in the same sequence.
 */
export function scriptsForCause(
  project: MiniAppProject, cause: TriggerCause, state: MiniAppRuntimeSnapshot,
): MiniAppScript[] {
  const order = new Map<string, number>();
  let i = 0;
  for (const scene of project.scenes) for (const c of scene.components) order.set(c.id, i++);
  return project.scripts
    .map((s, index) => ({ s, index }))
    .filter(({ s }) => triggerMatches(s.trigger, cause, state))
    .sort((a, b) => {
      const oa = order.get(a.s.ownerId) ?? 0;
      const ob = order.get(b.s.ownerId) ?? 0;
      return oa !== ob ? oa - ob : a.index - b.index;
    })
    .map(({ s }) => s);
}

// ---------------------------------------------------------------------
// The reducer — one command at a time
// ---------------------------------------------------------------------

interface StepOutput {
  readonly next: MiniAppRuntimeSnapshot;
  readonly outcome: MiniAppCommandOutcome;
  readonly holdBeats: number;
  readonly sound?: ApprovedSoundId;
  /** Messages this command sent, for the dispatcher to follow up. */
  readonly sent?: MessageToken;
  /** Set when a counter changed, so onCounterChanged can fire. */
  readonly counterChanged?: string;
}

const DONE: MiniAppCommandOutcome = { kind: 'done' };

function withComponent(
  state: MiniAppRuntimeSnapshot, id: string, patch: Partial<ComponentRuntimeState>,
): MiniAppRuntimeSnapshot {
  const current = state.components[id];
  if (!current) return state;
  return { ...state, components: { ...state.components, [id]: { ...current, ...patch } } };
}

/**
 * Apply one command. Pure: same state and command always give the same
 * result, and nothing here reads a clock or a random number.
 */
export function applyCommand(
  state: MiniAppRuntimeSnapshot, command: MiniAppCommand,
): StepOutput {
  switch (command.kind) {
    case 'changeState': {
      const c = state.components[command.targetId];
      if (!c) return { next: state, outcome: { kind: 'noChange', why: 'that thing is not here' }, holdBeats: 0 };
      if (c.state === command.state) {
        return { next: state, outcome: { kind: 'noChange', why: 'it was already like that' }, holdBeats: 0 };
      }
      return { next: withComponent(state, command.targetId, { state: command.state }), outcome: DONE, holdBeats: 1 };
    }
    case 'animate':
      return state.components[command.targetId]
        ? { next: state, outcome: DONE, holdBeats: 1 }
        : { next: state, outcome: { kind: 'noChange', why: 'that thing is not here' }, holdBeats: 0 };
    case 'show': {
      const c = state.components[command.targetId];
      if (!c) return { next: state, outcome: { kind: 'noChange', why: 'that thing is not here' }, holdBeats: 0 };
      if (c.visible) return { next: state, outcome: { kind: 'noChange', why: 'it was already showing' }, holdBeats: 0 };
      return { next: withComponent(state, command.targetId, { visible: true }), outcome: DONE, holdBeats: 1 };
    }
    case 'hide': {
      const c = state.components[command.targetId];
      if (!c) return { next: state, outcome: { kind: 'noChange', why: 'that thing is not here' }, holdBeats: 0 };
      if (!c.visible) return { next: state, outcome: { kind: 'noChange', why: 'it was already hidden' }, holdBeats: 0 };
      return { next: withComponent(state, command.targetId, { visible: false }), outcome: DONE, holdBeats: 1 };
    }
    case 'changeColor':
      return state.components[command.targetId]
        ? { next: withComponent(state, command.targetId, { color: command.color }), outcome: DONE, holdBeats: 1 }
        : { next: state, outcome: { kind: 'noChange', why: 'that thing is not here' }, holdBeats: 0 };
    case 'lightOn': {
      const c = state.components[command.targetId];
      if (!c) return { next: state, outcome: { kind: 'noChange', why: 'that thing is not here' }, holdBeats: 0 };
      if (c.lit === true) return { next: state, outcome: { kind: 'noChange', why: 'the light was already on' }, holdBeats: 0 };
      return { next: withComponent(state, command.targetId, { lit: true, state: 'on' }), outcome: DONE, holdBeats: 1 };
    }
    case 'lightOff': {
      const c = state.components[command.targetId];
      if (!c) return { next: state, outcome: { kind: 'noChange', why: 'that thing is not here' }, holdBeats: 0 };
      if (c.lit === false) return { next: state, outcome: { kind: 'noChange', why: 'the light was already off' }, holdBeats: 0 };
      return { next: withComponent(state, command.targetId, { lit: false, state: 'off' }), outcome: DONE, holdBeats: 1 };
    }
    case 'playSound':
      return { next: state, outcome: DONE, holdBeats: 1, sound: command.sound };
    case 'speakPhrase':
      return state.components[command.targetId]
        ? { next: withComponent(state, command.targetId, { saying: command.phrase }), outcome: DONE, holdBeats: 2 }
        : { next: state, outcome: { kind: 'noChange', why: 'that thing is not here' }, holdBeats: 0 };
    case 'sendToSlot':
      return state.components[command.targetId]
        ? { next: withComponent(state, command.targetId, { slotId: command.slotId }), outcome: DONE, holdBeats: 1 }
        : { next: state, outcome: { kind: 'noChange', why: 'that thing is not here' }, holdBeats: 0 };
    case 'returnHome': {
      const c = state.components[command.targetId];
      if (!c) return { next: state, outcome: { kind: 'noChange', why: 'that thing is not here' }, holdBeats: 0 };
      if (c.slotId === c.homeSlotId) {
        return { next: state, outcome: { kind: 'noChange', why: 'it was already home' }, holdBeats: 0 };
      }
      return { next: withComponent(state, command.targetId, { slotId: c.homeSlotId }), outcome: DONE, holdBeats: 1 };
    }
    case 'wait':
      return { next: state, outcome: DONE, holdBeats: command.beats };
    case 'celebrate':
      return { next: { ...state, celebrating: true }, outcome: DONE, holdBeats: 2, sound: 'celebrate' };
    case 'showWin':
      return state.won
        ? { next: state, outcome: { kind: 'noChange', why: 'you had already won' }, holdBeats: 0 }
        : { next: { ...state, won: true }, outcome: DONE, holdBeats: 2, sound: 'celebrate' };
    case 'increaseCounter':
    case 'decreaseCounter':
    case 'resetCounter': {
      const current = state.variables[command.variableId];
      if (typeof current !== 'number') {
        return { next: state, outcome: { kind: 'noChange', why: 'that number is not here' }, holdBeats: 0 };
      }
      const value = command.kind === 'increaseCounter' ? current + 1
        : command.kind === 'decreaseCounter' ? current - 1 : 0;
      if (value === current) {
        return { next: state, outcome: { kind: 'noChange', why: 'the number stayed the same' }, holdBeats: 0 };
      }
      return {
        next: { ...state, variables: { ...state.variables, [command.variableId]: value } },
        outcome: DONE, holdBeats: 1, counterChanged: command.variableId,
      };
    }
    case 'changeScene':
      return state.sceneId === command.sceneId
        ? { next: state, outcome: { kind: 'noChange', why: 'you were already there' }, holdBeats: 0 }
        : { next: { ...state, sceneId: command.sceneId }, outcome: DONE, holdBeats: 2 };
    case 'sendMessage':
      return { next: state, outcome: DONE, holdBeats: 1, sent: command.message };

    case 'askForHelp':
      return state.components[command.phrase] ? { next: state, outcome: DONE, holdBeats: 2 }
        : { next: state, outcome: DONE, holdBeats: 2 };
    case 'waitForMessage':
      // Nothing to wait for once the dispatcher has already delivered it;
      // the wait is expressed by the ORDER the dispatcher runs things in.
      return { next: state, outcome: DONE, holdBeats: 1 };

    // Control blocks are not single steps — the executor walks into them,
    // so reaching one here means it was applied out of context.
    case 'move':
    case 'turn':
    case 'if':
    case 'ifElse':
    case 'repeatN':
    case 'repeatUntil':
    case 'callJob':
    case 'askForApproval':
      return {
        next: state,
        outcome: { kind: 'unsupported', why: 'that step needs the whole app around it' },
        holdBeats: 0,
      };
  }
}

// ---------------------------------------------------------------------
// Conditions — the only questions an app may ask
// ---------------------------------------------------------------------

/**
 * Answer one question about the world. Pure and total: an unanswerable
 * question is false rather than an exception, because a child's app going
 * quiet is recoverable and a crash is not.
 */
export function evaluateCondition(
  project: MiniAppProject, state: MiniAppRuntimeSnapshot, test: MiniAppCondition,
  context: { readonly droppedOnto?: string } = {},
): boolean {
  /** Resolve the reserved "where it landed" reference. */
  const real = (id: string): string =>
    (id === DROP_TARGET_REF ? context.droppedOnto ?? '' : id);
  const propOf = (id: string): { color?: string; shape?: string; itemType?: string } => {
    const c = project.scenes.flatMap((s) => s.components).find((x) => x.id === real(id));
    return c?.properties ?? {};
  };
  switch (test.kind) {
    case 'colorEquals': {
      const a = propOf(test.itemId).color;
      const b = propOf(test.targetId).color;
      return a !== undefined && a === b;
    }
    case 'shapeEquals': {
      const a = propOf(test.itemId).shape;
      const b = propOf(test.targetId).shape;
      return a !== undefined && a === b;
    }
    case 'typeEquals': {
      const a = propOf(test.itemId).itemType;
      const b = propOf(test.targetId).itemType;
      return a !== undefined && a === b;
    }
    case 'matchesTarget': {
      // "Belongs here" — any property the target declares must agree.
      const item = propOf(test.itemId);
      const target = propOf(test.targetId);
      const keys = (['color', 'shape', 'itemType'] as const).filter((k) => target[k] !== undefined);
      return keys.length > 0 && keys.every((k) => item[k] === target[k]);
    }
    case 'stateIs':
      return state.components[real(test.targetId)]?.state === test.state;
    case 'sensorSees':
      return state.components[real(test.targetId)]?.state === test.state;
    case 'counterEquals':
      return state.variables[test.variableId] === test.value;
    case 'counterAtLeast': {
      const v = state.variables[test.variableId];
      return typeof v === 'number' && v >= test.value;
    }
    case 'basketIsFull': {
      // A basket is full when everything that belongs in it has arrived.
      const here = Object.entries(state.components)
        .filter(([, c]) => c.slotId === state.components[real(test.targetId)]?.slotId).length;
      return here >= 3;
    }
  }
}

/** Where a Move command lands, on the scene's own slot grid. */
function slotAfterMove(
  project: MiniAppProject, state: MiniAppRuntimeSnapshot,
  componentId: string, direction: MiniAppDirection, cells: number,
): string | null {
  const scene = project.scenes.find((s) => s.id === state.sceneId);
  const layout = scene ? sceneLayoutOf(scene.layoutTemplateId) : null;
  if (!layout) return null;
  const from = layout.slots.find((s) => s.id === state.components[componentId]?.slotId);
  if (!from) return null;
  const dx = direction === 'left' ? -cells : direction === 'right' ? cells : 0;
  const dy = direction === 'up' ? -cells : direction === 'down' ? cells : 0;
  const target = layout.slots.find((s) => s.col === from.col + dx && s.row === from.row + dy);
  return target?.id ?? null;
}

// ---------------------------------------------------------------------
// The dispatcher
// ---------------------------------------------------------------------

const DEFAULT_BUDGET: MiniAppRuntimeBudget = {
  maximumSteps: 60, maximumEventChainDepth: 2, maximumMessagesPerStep: 0,
};

/** A Repeat Until gives up after this many rounds, kindly. */
export const UNTIL_ROUNDS_CAP = 12;

export interface RunOptions {
  /**
   * Answers a child has already given to Ask First gates, in the order the
   * run asked for them. A run with fewer answers than gates stops at the
   * first unanswered one and reports it — which is how a helper waits for
   * permission without the runtime holding a callback or a clock.
   */
  readonly approvals?: readonly boolean[];
}

/** Why a run stopped before it finished. */
export interface PendingApproval {
  readonly scriptId: string;
  readonly componentId: string;
  readonly phrase: PreparedPhraseId;
  /** How many approvals had been answered when this one came up. */
  readonly index: number;
}

/**
 * Run everything a cause sets off, including whatever those scripts set off
 * in turn, and stop cleanly at the project's own budget.
 *
 * Chains are bounded three ways — depth, total steps, and a cap on Repeat
 * Until rounds — so a project that messages itself in a circle or loops on
 * a condition that never comes true ends politely rather than freezing a
 * tablet. Reaching a limit is a result the caller can show, not an error.
 */
export function run(
  project: MiniAppProject,
  cause: TriggerCause,
  from: MiniAppRuntimeSnapshot = initialRuntimeState(project),
  options: RunOptions = {},
): MiniAppRunResult {
  const budget = project.runtimeBudget ?? DEFAULT_BUDGET;
  const approvals = options.approvals ?? [];
  const events: MiniAppExecutionEvent[] = [];
  let state = from;
  let steps = 0;
  let overflowed = false;
  let triggered = false;
  let approvalsUsed = 0;
  let awaiting: PendingApproval | null = null;

  const queue: Array<{ cause: TriggerCause; depth: number }> = [{ cause, depth: 0 }];
  /** Where the current drop landed, so "did it go in the right place?" works. */
  let dropContext: { droppedOnto?: string } = {};

  /** Record one executed command. */
  const emit = (
    script: MiniAppScript, command: MiniAppCommand, before: MiniAppRuntimeSnapshot,
    out: StepOutput, depth: number,
  ): void => {
    steps += 1;
    events.push({
      step: steps,
      scriptId: script.id,
      componentId: script.ownerId,
      command,
      stateBefore: before,
      stateAfter: state,
      outcome: out.outcome,
      holdBeats: out.holdBeats,
      ...(out.sound ? { sound: out.sound } : {}),
      chainDepth: depth,
    });
    if (out.sent && budget.maximumMessagesPerStep > 0) {
      queue.push({ cause: { kind: 'message', message: out.sent }, depth: depth + 1 });
    }
    if (out.counterChanged) {
      queue.push({
        cause: { kind: 'counterChanged', variableId: out.counterChanged },
        depth: depth + 1,
      });
    }
  };

  /**
   * Walk a list of commands, stepping INTO control blocks. Returns false
   * when the run must stop — budget spent, or waiting on a grown-up.
   */
  const execute = (
    commands: readonly MiniAppCommand[], script: MiniAppScript, depth: number,
  ): boolean => {
    for (const command of commands) {
      if (steps >= budget.maximumSteps) { overflowed = true; return false; }
      if (awaiting) return false;
      const before = state;

      switch (command.kind) {
        case 'if': {
          const holds = evaluateCondition(project, state, command.test, dropContext);
          emit(script, command, before, {
            next: state,
            outcome: holds ? DONE : { kind: 'noChange', why: 'the answer was no, so it skipped ahead' },
            holdBeats: 1,
          }, depth);
          if (holds && !execute(command.then, script, depth)) return false;
          break;
        }
        case 'ifElse': {
          const holds = evaluateCondition(project, state, command.test, dropContext);
          emit(script, command, before, { next: state, outcome: DONE, holdBeats: 1 }, depth);
          const branch = holds ? command.then : command.otherwise;
          if (!execute(branch, script, depth)) return false;
          break;
        }
        case 'repeatN': {
          emit(script, command, before, { next: state, outcome: DONE, holdBeats: 1 }, depth);
          for (let i = 0; i < command.times; i++) {
            if (!execute(command.body, script, depth)) return false;
          }
          break;
        }
        case 'repeatUntil': {
          emit(script, command, before, { next: state, outcome: DONE, holdBeats: 1 }, depth);
          let rounds = 0;
          while (!evaluateCondition(project, state, command.test, dropContext)) {
            if (rounds >= UNTIL_ROUNDS_CAP) { overflowed = true; return false; }
            rounds += 1;
            if (!execute(command.body, script, depth)) return false;
          }
          break;
        }
        case 'callJob': {
          const job = project.jobs.find((j) => j.id === command.jobId);
          emit(script, command, before, {
            next: state,
            outcome: job ? DONE : { kind: 'noChange', why: 'that saved job is not here' },
            holdBeats: 1,
          }, depth);
          if (job && !execute(job.commands, script, depth)) return false;
          break;
        }
        case 'askForApproval': {
          const answer = approvals[approvalsUsed];
          if (answer === undefined) {
            // Stop and ask. The run so far is already recorded, and
            // re-running with the answer reproduces it exactly.
            awaiting = {
              scriptId: script.id, componentId: script.ownerId,
              phrase: command.phrase, index: approvalsUsed,
            };
            return false;
          }
          approvalsUsed += 1;
          emit(script, command, before, {
            next: state,
            outcome: answer ? DONE : { kind: 'noChange', why: 'you said not to, so it stopped there' },
            holdBeats: 2,
          }, depth);
          if (answer && !execute(command.then, script, depth)) return false;
          break;
        }
        case 'move': {
          const to = slotAfterMove(project, state, command.targetId, command.direction, command.cells);
          const out: StepOutput = to
            ? { next: withComponent(state, command.targetId, { slotId: to }), outcome: DONE, holdBeats: 1 }
            : { next: state, outcome: { kind: 'noChange', why: 'there is nothing that way' }, holdBeats: 1 };
          state = out.next;
          emit(script, command, before, out, depth);
          break;
        }
        case 'turn': {
          // Turning is a look, not a position — the player animates it.
          const out: StepOutput = state.components[command.targetId]
            ? { next: state, outcome: DONE, holdBeats: 1 }
            : { next: state, outcome: { kind: 'noChange', why: 'that thing is not here' }, holdBeats: 0 };
          emit(script, command, before, out, depth);
          break;
        }
        default: {
          const out = applyCommand(state, command);
          state = out.next;
          emit(script, command, before, out, depth);
          break;
        }
      }
    }
    return true;
  };

  while (queue.length > 0 && !awaiting) {
    const item = queue.shift()!;
    if (item.depth > budget.maximumEventChainDepth) continue;

    dropContext = item.cause.kind === 'drop' ? { droppedOnto: item.cause.ontoId } : {};
    if (item.cause.kind === 'drop') {
      // The thing lands first; the rules then decide whether it stays.
      const onto = state.components[item.cause.ontoId];
      if (onto) state = withComponent(state, item.cause.componentId, { slotId: onto.slotId });
    }
    const scripts = scriptsForCause(project, item.cause, state);
    if (scripts.length > 0) triggered = true;

    for (const script of scripts) {
      if (!execute(script.commands, script, item.depth)) break;
    }
    if (overflowed || awaiting) break;
  }

  return {
    events,
    finalState: state,
    stepsUsed: steps,
    overflowed,
    triggered,
    ...(awaiting ? { awaitingApproval: awaiting } : {}),
  };
}

/** Components a child can tap right now — used to draw the tap hints. */
export function tappableComponents(project: MiniAppProject, sceneId: string): string[] {
  const scene = project.scenes.find((s) => s.id === sceneId);
  if (!scene) return [];
  const ids = new Set<string>();
  for (const script of project.scripts) {
    const t = script.trigger;
    if ((t.kind === 'onTap' || t.kind === 'onChoiceSelected' || t.kind === 'onItemCollected'
      || t.kind === 'onGoalReached' || t.kind === 'onSensorDetected')
      && scene.components.some((c) => c.id === t.targetId)) {
      ids.add(t.targetId);
    }
  }
  return [...ids];
}

/** Does anything at all happen when the app opens? */
export function hasStartScript(project: MiniAppProject): boolean {
  return project.scripts.some((s) => s.trigger.kind === 'onAppStart');
}
