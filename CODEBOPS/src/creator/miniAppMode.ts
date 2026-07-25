/**
 * The creator state machine (spec §7, §8).
 *
 * Build Mode and Play Mode are kept apart on purpose: a child should feel
 * the difference between MAKING software and USING it. That separation is
 * enforced here rather than trusted to whichever screen happens to be
 * mounted, so no UI can end up half in one mode and half in the other.
 *
 * Pure data and a transition table. No DOM, no timers.
 */

/**
 * The creator journey. `choose` → `template` → `build` → `teach` are Build
 * Mode; `play` is Play Mode; `debug` sits between them, reachable only
 * after a run.
 */
export type CreatorStep =
  | 'lab'        // App Lab home: pick a kit
  | 'template'   // pick a starter
  | 'build'      // place components in slots
  | 'teach'      // attach triggers and commands
  | 'predict'    // "what will your app do?"
  | 'play'       // Play Mode — the finished app
  | 'debug'      // Think Trail / Glitch Replay
  | 'library';   // saved apps

/** Which of the two modes a step belongs to (spec §8). */
export type CreatorMode = 'build' | 'play' | 'browse';

export const STEP_MODE: Readonly<Record<CreatorStep, CreatorMode>> = {
  lab: 'browse',
  template: 'browse',
  library: 'browse',
  build: 'build',
  teach: 'build',
  predict: 'build',
  play: 'play',
  debug: 'build',
};

export type CreatorAction =
  | { readonly kind: 'chooseKit' }
  | { readonly kind: 'chooseTemplate' }
  | { readonly kind: 'toTeach' }
  | { readonly kind: 'backToBuild' }
  | { readonly kind: 'toPredict' }
  | { readonly kind: 'test' }
  | { readonly kind: 'unexpectedResult' }
  | { readonly kind: 'editFromDebug' }
  | { readonly kind: 'restart' }
  | { readonly kind: 'exitToLab' }
  | { readonly kind: 'openLibrary' }
  | { readonly kind: 'editSaved' };

/**
 * Legal moves. Anything not listed is refused, which is what stops a
 * project reaching Play Mode without having been built and predicted.
 */
const TRANSITIONS: Readonly<Record<CreatorStep, Partial<Record<CreatorAction['kind'], CreatorStep>>>> = {
  lab: { chooseKit: 'template', openLibrary: 'library' },
  template: { chooseTemplate: 'build', exitToLab: 'lab' },
  build: { toTeach: 'teach', exitToLab: 'lab' },
  teach: { backToBuild: 'build', toPredict: 'predict', test: 'play', exitToLab: 'lab' },
  predict: { test: 'play', backToBuild: 'teach' },
  play: { unexpectedResult: 'debug', restart: 'play', editFromDebug: 'teach', exitToLab: 'lab' },
  debug: { editFromDebug: 'teach', test: 'play', exitToLab: 'lab' },
  library: { editSaved: 'build', test: 'play', exitToLab: 'lab' },
};

export interface CreatorState {
  readonly step: CreatorStep;
  readonly mode: CreatorMode;
  /** True once the child has run the app at least once this session. */
  readonly hasTested: boolean;
  /** True when the last run did not do what they predicted. */
  readonly sawUnexpected: boolean;
}

export function initialCreatorState(): CreatorState {
  return { step: 'lab', mode: 'browse', hasTested: false, sawUnexpected: false };
}

export function canApply(state: CreatorState, action: CreatorAction): boolean {
  // The Debug button only exists after something surprising happened (§8.2).
  if (action.kind === 'unexpectedResult' && !state.hasTested) return false;
  return TRANSITIONS[state.step][action.kind] !== undefined;
}

/** Apply an action, or return the state unchanged when it is not legal. */
export function applyCreatorAction(state: CreatorState, action: CreatorAction): CreatorState {
  if (!canApply(state, action)) return state;
  const step = TRANSITIONS[state.step][action.kind]!;
  return {
    step,
    mode: STEP_MODE[step],
    hasTested: state.hasTested || action.kind === 'test',
    sawUnexpected: action.kind === 'unexpectedResult'
      ? true
      : action.kind === 'test' ? false : state.sawUnexpected,
  };
}

/** Editing chrome is visible only in Build Mode (spec §8.1 / §8.2). */
export function showsEditingChrome(state: CreatorState): boolean {
  return state.mode === 'build';
}

/** Play Mode shows the app and nothing else — plus Debug once earned. */
export function showsDebugButton(state: CreatorState): boolean {
  return state.step === 'play' && state.sawUnexpected;
}
