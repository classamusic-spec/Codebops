/**
 * Zip's App Lab — the closed vocabulary a child-built mini app may use.
 *
 * Everything here is a CLOSED union on purpose. A mini app is data, and
 * the only things that data may say are the things named in this file.
 * There is no command string, no expression, no snippet and no free text
 * anywhere in the model, so a saved project can never describe behaviour
 * the app did not already ship.
 *
 * Pure types and small helpers only: no THREE, no DOM, no storage. A test
 * enforces that for the whole creator/ tree.
 */

/** The six controlled kits (spec §5). No seventh without a template. */
export type MiniAppType =
  | 'tap-react' | 'sorting' | 'story' | 'music' | 'helper' | 'mini-game';

export const MINI_APP_TYPES: readonly MiniAppType[] = [
  'tap-react', 'sorting', 'story', 'music', 'helper', 'mini-game',
];

/** Approved visual components (spec §10). */
export type MiniAppComponentType =
  | 'character' | 'button' | 'imageObject' | 'prop' | 'counter' | 'basket'
  | 'goal' | 'light' | 'soundPad' | 'choiceCard' | 'scenePortal'
  | 'collectible' | 'player' | 'friendlyObstacle' | 'speechBubble'
  | 'instrument' | 'sensor' | 'helperTool' | 'memoryContainer';

/** Approved triggers (spec §10). */
export type MiniAppTriggerType =
  | 'onAppStart' | 'onSceneStart' | 'onTap' | 'onDrop' | 'onSignal'
  | 'onMessage' | 'onItemCollected' | 'onGoalReached' | 'onCounterChanged'
  | 'onStateChanged' | 'onChoiceSelected' | 'onSensorDetected';

// ---------------------------------------------------------------------
// Value tokens — every "value" in a project is one of these words.
// ---------------------------------------------------------------------

/** What a component can BE. Chosen from art that exists, not invented. */
export type MiniAppStateToken =
  | 'idle' | 'active' | 'done' | 'selected' | 'visible' | 'hidden'
  | 'open' | 'closed' | 'on' | 'off' | 'full' | 'empty'
  | 'blooming' | 'droopy' | 'watered' | 'happy' | 'sad' | 'sleepy'
  | 'carried' | 'home' | 'collected';

/** Motion the character rigs already support. */
export type MiniAppAnimationToken =
  | 'hop' | 'jump' | 'wave' | 'spin' | 'wiggle'
  | 'grow' | 'shrink' | 'sparkle' | 'bloom' | 'nod' | 'shake';

/** The locked CodeBops palette, by name. */
export type MiniAppColorToken =
  | 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange' | 'pink'
  | 'cream' | 'navy';

export type MiniAppDirection = 'up' | 'down' | 'left' | 'right';

/** How many cells a single Move may cover. Deliberately tiny. */
export type MiniAppMoveDistance = 1 | 2 | 3;

/** Repeat counts a child can dial. Matches the app-wide ×2–×4 badge. */
export type MiniAppRepeatCount = 2 | 3 | 4;

/** Beats a Wait may last (Music Maker's timing unit). */
export type MiniAppWaitBeats = 1 | 2 | 3 | 4;

/**
 * Sounds a project may name. Resolved to real voices in the App Lab sound
 * registry; the creator only ever holds the token.
 */
export type ApprovedSoundId =
  | 'tap' | 'happy' | 'tryAgain' | 'sparkle' | 'celebrate' | 'pop'
  | 'drum' | 'bell' | 'xylophone' | 'shaker' | 'gearChime';

/**
 * Prepared phrases. A child picks a phrase; they never type one. Rendered
 * as a speech bubble with its emoji — captioned by construction, and no
 * text-to-speech dependency (see the Phase 0 report).
 */
export type PreparedPhraseId =
  | 'hello' | 'thankYou' | 'lookAtThis' | 'followMe' | 'oopsIFixedIt'
  | 'wellDone' | 'letsGo' | 'imThinking' | 'iNeedHelp' | 'allDone'
  | 'whichWay' | 'goodMorning' | 'goodNight';

// ---------------------------------------------------------------------
// Commands — one discriminated union, so a malformed command cannot be
// written down. MiniAppCommandType is DERIVED from it, which means the
// template allow-lists and the union can never drift apart.
// ---------------------------------------------------------------------

/** A reference to something the project already contains. */
export type ComponentRef = string;
export type VariableRef = string;
export type JobRef = string;
export type SceneRef = string;
export type SlotRef = string;
export type MessageToken = 'ready' | 'go' | 'yourTurn' | 'done' | 'help';

export type MiniAppCommand =
  // ---- movement and motion ----
  | { readonly kind: 'move'; readonly targetId: ComponentRef; readonly direction: MiniAppDirection; readonly cells: MiniAppMoveDistance }
  | { readonly kind: 'turn'; readonly targetId: ComponentRef; readonly rotation: 'left' | 'right' }
  | { readonly kind: 'animate'; readonly targetId: ComponentRef; readonly animation: MiniAppAnimationToken }
  | { readonly kind: 'sendToSlot'; readonly targetId: ComponentRef; readonly slotId: SlotRef }
  | { readonly kind: 'returnHome'; readonly targetId: ComponentRef }
  // ---- appearance and state ----
  | { readonly kind: 'show'; readonly targetId: ComponentRef }
  | { readonly kind: 'hide'; readonly targetId: ComponentRef }
  | { readonly kind: 'changeState'; readonly targetId: ComponentRef; readonly state: MiniAppStateToken }
  | { readonly kind: 'changeColor'; readonly targetId: ComponentRef; readonly color: MiniAppColorToken }
  | { readonly kind: 'lightOn'; readonly targetId: ComponentRef }
  | { readonly kind: 'lightOff'; readonly targetId: ComponentRef }
  // ---- sound and speech ----
  | { readonly kind: 'playSound'; readonly sound: ApprovedSoundId }
  | { readonly kind: 'speakPhrase'; readonly targetId: ComponentRef; readonly phrase: PreparedPhraseId }
  // ---- numbers the machine remembers ----
  | { readonly kind: 'increaseCounter'; readonly variableId: VariableRef }
  | { readonly kind: 'decreaseCounter'; readonly variableId: VariableRef }
  | { readonly kind: 'resetCounter'; readonly variableId: VariableRef }
  // ---- scenes and celebration ----
  | { readonly kind: 'changeScene'; readonly sceneId: SceneRef }
  | { readonly kind: 'celebrate' }
  | { readonly kind: 'showWin' }
  | { readonly kind: 'askForHelp'; readonly phrase: PreparedPhraseId }
  // ---- control ----
  | { readonly kind: 'wait'; readonly beats: MiniAppWaitBeats }
  | { readonly kind: 'if'; readonly test: MiniAppCondition; readonly then: readonly MiniAppCommand[] }
  | { readonly kind: 'ifElse'; readonly test: MiniAppCondition; readonly then: readonly MiniAppCommand[]; readonly otherwise: readonly MiniAppCommand[] }
  | { readonly kind: 'repeatN'; readonly times: MiniAppRepeatCount; readonly body: readonly MiniAppCommand[] }
  | { readonly kind: 'repeatUntil'; readonly test: MiniAppCondition; readonly body: readonly MiniAppCommand[] }
  | { readonly kind: 'sendMessage'; readonly message: MessageToken }
  | { readonly kind: 'waitForMessage'; readonly message: MessageToken }
  | { readonly kind: 'callJob'; readonly jobId: JobRef }
  | { readonly kind: 'askForApproval'; readonly phrase: PreparedPhraseId; readonly then: readonly MiniAppCommand[] };

/** Derived — never hand-written, so it cannot fall out of step. */
export type MiniAppCommandType = MiniAppCommand['kind'];

/** Commands that carry nested commands, and the fields they nest in. */
export const NESTING_FIELDS: Readonly<Partial<Record<MiniAppCommandType, readonly string[]>>> = {
  if: ['then'],
  ifElse: ['then', 'otherwise'],
  repeatN: ['body'],
  repeatUntil: ['body'],
  askForApproval: ['then'],
};

/** Every command nested inside `cmd`, one level down. */
export function nestedCommands(cmd: MiniAppCommand): readonly MiniAppCommand[] {
  const fields = NESTING_FIELDS[cmd.kind];
  if (!fields) return [];
  const out: MiniAppCommand[] = [];
  for (const f of fields) {
    const branch = (cmd as unknown as Record<string, readonly MiniAppCommand[] | undefined>)[f];
    if (branch) out.push(...branch);
  }
  return out;
}

/** Flatten a command tree, parents before children. */
export function flattenCommands(commands: readonly MiniAppCommand[]): MiniAppCommand[] {
  const out: MiniAppCommand[] = [];
  const walk = (list: readonly MiniAppCommand[]): void => {
    for (const c of list) { out.push(c); walk(nestedCommands(c)); }
  };
  walk(commands);
  return out;
}

/** How deeply commands nest. A flat script is depth 1. */
export function commandDepth(commands: readonly MiniAppCommand[]): number {
  let deepest = commands.length > 0 ? 1 : 0;
  for (const c of commands) {
    const inner = nestedCommands(c);
    if (inner.length > 0) deepest = Math.max(deepest, 1 + commandDepth(inner));
  }
  return deepest;
}

// ---------------------------------------------------------------------
// Conditions — the only questions a mini app may ask.
// ---------------------------------------------------------------------

export type MiniAppCondition =
  | { readonly kind: 'colorEquals'; readonly itemId: ComponentRef; readonly targetId: ComponentRef }
  | { readonly kind: 'shapeEquals'; readonly itemId: ComponentRef; readonly targetId: ComponentRef }
  | { readonly kind: 'typeEquals'; readonly itemId: ComponentRef; readonly targetId: ComponentRef }
  | { readonly kind: 'matchesTarget'; readonly itemId: ComponentRef; readonly targetId: ComponentRef }
  | { readonly kind: 'stateIs'; readonly targetId: ComponentRef; readonly state: MiniAppStateToken }
  | { readonly kind: 'counterEquals'; readonly variableId: VariableRef; readonly value: number }
  | { readonly kind: 'counterAtLeast'; readonly variableId: VariableRef; readonly value: number }
  | { readonly kind: 'basketIsFull'; readonly targetId: ComponentRef }
  | { readonly kind: 'sensorSees'; readonly targetId: ComponentRef; readonly state: MiniAppStateToken };

export type MiniAppConditionType = MiniAppCondition['kind'];

/** Component ids a condition mentions (used by reference validation). */
export function conditionRefs(test: MiniAppCondition): { components: string[]; variables: string[] } {
  switch (test.kind) {
    case 'colorEquals':
    case 'shapeEquals':
    case 'typeEquals':
    case 'matchesTarget':
      return { components: [test.itemId, test.targetId], variables: [] };
    case 'stateIs':
    case 'basketIsFull':
    case 'sensorSees':
      return { components: [test.targetId], variables: [] };
    case 'counterEquals':
    case 'counterAtLeast':
      return { components: [], variables: [test.variableId] };
  }
}

// ---------------------------------------------------------------------
// Triggers
// ---------------------------------------------------------------------

export type MiniAppTrigger =
  | { readonly kind: 'onAppStart' }
  | { readonly kind: 'onSceneStart'; readonly sceneId: SceneRef }
  | { readonly kind: 'onTap'; readonly targetId: ComponentRef }
  | { readonly kind: 'onDrop'; readonly targetId: ComponentRef }
  | { readonly kind: 'onSignal'; readonly message: MessageToken }
  | { readonly kind: 'onMessage'; readonly message: MessageToken }
  | { readonly kind: 'onItemCollected'; readonly targetId: ComponentRef }
  | { readonly kind: 'onGoalReached'; readonly targetId: ComponentRef }
  | { readonly kind: 'onCounterChanged'; readonly variableId: VariableRef }
  | { readonly kind: 'onStateChanged'; readonly targetId: ComponentRef; readonly state: MiniAppStateToken }
  | { readonly kind: 'onChoiceSelected'; readonly targetId: ComponentRef }
  | { readonly kind: 'onSensorDetected'; readonly targetId: ComponentRef };

/** Component/variable ids a trigger mentions. */
export function triggerRefs(t: MiniAppTrigger): { components: string[]; variables: string[]; scenes: string[] } {
  switch (t.kind) {
    case 'onAppStart': return { components: [], variables: [], scenes: [] };
    case 'onSceneStart': return { components: [], variables: [], scenes: [t.sceneId] };
    case 'onSignal':
    case 'onMessage': return { components: [], variables: [], scenes: [] };
    case 'onCounterChanged': return { components: [], variables: [t.variableId], scenes: [] };
    default: return { components: [t.targetId], variables: [], scenes: [] };
  }
}

// ---------------------------------------------------------------------
// Variables and goals
// ---------------------------------------------------------------------

export type MiniAppVariableType = 'number' | 'boolean' | 'token';

/** A variable is always something a child can SEE. */
export type MiniAppVariableVisual =
  | 'counter' | 'basket' | 'dial' | 'light' | 'memory-crystal';

export type MiniAppGoalType =
  | 'somethingReacts' | 'allSorted' | 'reachScore' | 'storyReachesEnd'
  | 'songPlays' | 'helperFinishes' | 'collectAll' | 'reachTheGoal';

/** A serialisable value, restricted to what the model can mean. */
export type SerializableValue = number | boolean | MiniAppStateToken;
