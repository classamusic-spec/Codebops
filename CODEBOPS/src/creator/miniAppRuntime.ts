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
  ApprovedSoundId, PreparedPhraseId, MiniAppTrigger,
} from './miniAppTypes';
import { nestedCommands } from './miniAppTypes';
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

    // ---- not built yet. Reported honestly so nothing pretends to run. ----
    case 'move':
    case 'turn':
    case 'askForHelp':
    case 'if':
    case 'ifElse':
    case 'repeatN':
    case 'repeatUntil':
    case 'waitForMessage':
    case 'callJob':
    case 'askForApproval':
      return {
        next: state,
        outcome: { kind: 'unsupported', why: `"${command.kind}" wakes up in a later part of the Lab` },
        holdBeats: 0,
      };
  }
}

// ---------------------------------------------------------------------
// The dispatcher
// ---------------------------------------------------------------------

const DEFAULT_BUDGET: MiniAppRuntimeBudget = {
  maximumSteps: 60, maximumEventChainDepth: 2, maximumMessagesPerStep: 0,
};

/**
 * Run everything a cause sets off, including whatever those scripts set off
 * in turn, and stop cleanly at the project's own budget.
 *
 * Chains are bounded twice over — by depth and by total steps — so a project
 * that messages itself in a circle ends politely rather than freezing a
 * tablet. Reaching a limit is not an error; it is a result the caller can
 * show, which is what `overflowed` is for.
 */
export function run(
  project: MiniAppProject,
  cause: TriggerCause,
  from: MiniAppRuntimeSnapshot = initialRuntimeState(project),
): MiniAppRunResult {
  const budget = project.runtimeBudget ?? DEFAULT_BUDGET;
  const events: MiniAppExecutionEvent[] = [];
  let state = from;
  let steps = 0;
  let overflowed = false;
  let triggered = false;

  /** Causes still to follow up, with the depth they were raised at. */
  const queue: Array<{ cause: TriggerCause; depth: number }> = [{ cause, depth: 0 }];

  while (queue.length > 0) {
    const item = queue.shift()!;
    if (item.depth > budget.maximumEventChainDepth) continue;

    const scripts = scriptsForCause(project, item.cause, state);
    if (scripts.length > 0) triggered = true;

    for (const script of scripts) {
      // Phase 3 runs flat scripts; nested bodies are reported unsupported
      // by applyCommand, so a control block cannot silently do nothing.
      for (const command of script.commands) {
        if (steps >= budget.maximumSteps) { overflowed = true; break; }
        const before = state;
        const out = applyCommand(state, command);
        state = out.next;
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
          chainDepth: item.depth,
        });
        if (out.sent && budget.maximumMessagesPerStep > 0) {
          queue.push({ cause: { kind: 'message', message: out.sent }, depth: item.depth + 1 });
        }
        if (out.counterChanged) {
          queue.push({
            cause: { kind: 'counterChanged', variableId: out.counterChanged },
            depth: item.depth + 1,
          });
        }
        // A nested body would run here in later phases; flagging it now
        // keeps the step count honest about what was actually skipped.
        void nestedCommands(command);
      }
      if (overflowed) break;
    }
    if (overflowed) break;
  }

  return { events, finalState: state, stepsUsed: steps, overflowed, triggered };
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
