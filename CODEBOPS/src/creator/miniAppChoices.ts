/**
 * What a child can actually tap in the logic builder.
 *
 * The spec is explicit that App Lab must not look like an IDE: no property
 * grids, no inspectors, no dense little panels (§4). So instead of "add a
 * Play Sound command, then open a panel and pick which sound", the trays
 * offer fully-formed choices — "🥁 Play Drum", "🐰 Zip jumps", "💡 Light on"
 * — built from the components this project actually contains and the
 * commands this kit actually allows.
 *
 * That means a tapped choice is always a complete, valid command. There is
 * no half-configured state a child can get stuck in, and no argument
 * editor to build.
 */
import type { MiniAppProject, MiniAppComponent } from './miniAppProject';
import type {
  MiniAppCommand, MiniAppTrigger, MiniAppAnimationToken, MiniAppStateToken,
} from './miniAppTypes';
import { miniAppTemplate } from './miniAppTemplateRegistry';
import { approvedAsset, APPROVED_ASSETS } from '../data/app-lab/approvedAssets';
import { APPROVED_SOUNDS, PREPARED_PHRASES } from '../data/app-lab/approvedSounds';

export interface CommandChoice {
  /** Stable id for the tray tile. */
  readonly id: string;
  readonly glyph: string;
  /** Child-facing label, e.g. "Zip jumps". */
  readonly label: string;
  readonly command: MiniAppCommand;
  /** Groups the tray into small readable rows. */
  readonly group: 'do' | 'say' | 'sound' | 'count' | 'control';
}

export interface TriggerChoice {
  readonly id: string;
  readonly glyph: string;
  readonly label: string;
  readonly trigger: MiniAppTrigger;
}

function labelOf(c: MiniAppComponent): string {
  return approvedAsset(c.assetId)?.label ?? c.id;
}

/** Animations that read well on any component, in child words. */
const ANIMATIONS: ReadonlyArray<{ token: MiniAppAnimationToken; verb: string; glyph: string }> = [
  { token: 'jump', verb: 'jumps', glyph: '⤴️' },
  { token: 'hop', verb: 'hops', glyph: '🐇' },
  { token: 'wave', verb: 'waves', glyph: '👋' },
  { token: 'spin', verb: 'spins', glyph: '🌀' },
  { token: 'wiggle', verb: 'wiggles', glyph: '〰️' },
  { token: 'sparkle', verb: 'sparkles', glyph: '✨' },
  { token: 'grow', verb: 'grows', glyph: '🔎' },
  { token: 'shake', verb: 'shakes', glyph: '📳' },
];

/** State changes worth offering, and the words that describe them. */
const STATES: ReadonlyArray<{ token: MiniAppStateToken; phrase: string; glyph: string }> = [
  { token: 'blooming', phrase: 'blooms', glyph: '🌸' },
  { token: 'happy', phrase: 'looks happy', glyph: '😄' },
  { token: 'sleepy', phrase: 'gets sleepy', glyph: '😴' },
  { token: 'open', phrase: 'opens', glyph: '🔓' },
  { token: 'closed', phrase: 'closes', glyph: '🔒' },
  { token: 'watered', phrase: 'gets watered', glyph: '💧' },
  { token: 'done', phrase: 'is finished', glyph: '✅' },
];

/**
 * Every command a child may add to a script right now, already bound to
 * real components. Returns [] when the kit is unknown.
 */
export function commandChoices(project: MiniAppProject): CommandChoice[] {
  const template = miniAppTemplate(project.templateId);
  if (!template) return [];
  const allowed = new Set(template.allowedCommands);
  const components = project.scenes.flatMap((s) => s.components);
  const out: CommandChoice[] = [];

  // ---- things that happen to a component ----
  for (const c of components) {
    const name = labelOf(c);

    if (allowed.has('animate')) {
      for (const a of ANIMATIONS) {
        out.push({
          id: `animate:${c.id}:${a.token}`,
          glyph: a.glyph,
          label: `${name} ${a.verb}`,
          command: { kind: 'animate', targetId: c.id, animation: a.token },
          group: 'do',
        });
      }
    }
    if (allowed.has('changeState')) {
      for (const st of STATES) {
        out.push({
          id: `state:${c.id}:${st.token}`,
          glyph: st.glyph,
          label: `${name} ${st.phrase}`,
          command: { kind: 'changeState', targetId: c.id, state: st.token },
          group: 'do',
        });
      }
    }
    if (allowed.has('show')) {
      out.push({
        id: `show:${c.id}`, glyph: '👁️', label: `Show ${name}`,
        command: { kind: 'show', targetId: c.id }, group: 'do',
      });
    }
    if (allowed.has('hide')) {
      out.push({
        id: `hide:${c.id}`, glyph: '🙈', label: `Hide ${name}`,
        command: { kind: 'hide', targetId: c.id }, group: 'do',
      });
    }
    if (allowed.has('lightOn') && c.type === 'light') {
      out.push({
        id: `lightOn:${c.id}`, glyph: '💡', label: `${name} on`,
        command: { kind: 'lightOn', targetId: c.id }, group: 'do',
      });
      out.push({
        id: `lightOff:${c.id}`, glyph: '🌑', label: `${name} off`,
        command: { kind: 'lightOff', targetId: c.id }, group: 'do',
      });
    }
    if (allowed.has('returnHome')) {
      out.push({
        id: `home:${c.id}`, glyph: '🏠', label: `${name} goes home`,
        command: { kind: 'returnHome', targetId: c.id }, group: 'do',
      });
    }
    if (allowed.has('speakPhrase') && (c.type === 'character' || c.type === 'speechBubble')) {
      for (const p of PREPARED_PHRASES.slice(0, 6)) {
        out.push({
          id: `say:${c.id}:${p.id}`,
          glyph: p.glyph,
          label: `${name} says "${p.text}"`,
          command: { kind: 'speakPhrase', targetId: c.id, phrase: p.id },
          group: 'say',
        });
      }
    }
  }

  // ---- sounds ----
  if (allowed.has('playSound')) {
    for (const s of APPROVED_SOUNDS) {
      out.push({
        id: `sound:${s.id}`, glyph: s.glyph, label: `Play ${s.label}`,
        command: { kind: 'playSound', sound: s.id }, group: 'sound',
      });
    }
  }

  // ---- numbers the app remembers ----
  for (const v of project.variables) {
    if (allowed.has('increaseCounter')) {
      out.push({
        id: `inc:${v.id}`, glyph: '➕', label: `Add 1 to ${v.accessibilityLabel}`,
        command: { kind: 'increaseCounter', variableId: v.id }, group: 'count',
      });
    }
    if (allowed.has('decreaseCounter')) {
      out.push({
        id: `dec:${v.id}`, glyph: '➖', label: `Take 1 from ${v.accessibilityLabel}`,
        command: { kind: 'decreaseCounter', variableId: v.id }, group: 'count',
      });
    }
    if (allowed.has('resetCounter')) {
      out.push({
        id: `reset:${v.id}`, glyph: '🔄', label: `Set ${v.accessibilityLabel} to 0`,
        command: { kind: 'resetCounter', variableId: v.id }, group: 'count',
      });
    }
  }

  // ---- celebration and timing ----
  if (allowed.has('celebrate')) {
    out.push({ id: 'celebrate', glyph: '🎉', label: 'Celebrate', command: { kind: 'celebrate' }, group: 'do' });
  }
  if (allowed.has('showWin')) {
    out.push({ id: 'showWin', glyph: '🏆', label: 'Show YOU WIN', command: { kind: 'showWin' }, group: 'do' });
  }
  if (allowed.has('wait')) {
    out.push({ id: 'wait1', glyph: '⏱️', label: 'Wait one beat', command: { kind: 'wait', beats: 1 }, group: 'control' });
    out.push({ id: 'wait2', glyph: '⏳', label: 'Wait two beats', command: { kind: 'wait', beats: 2 }, group: 'control' });
  }
  if (allowed.has('repeatN')) {
    out.push({
      id: 'repeat2', glyph: '🔁', label: 'Repeat 2 times',
      command: { kind: 'repeatN', times: 2, body: [] }, group: 'control',
    });
    out.push({
      id: 'repeat3', glyph: '🔁', label: 'Repeat 3 times',
      command: { kind: 'repeatN', times: 3, body: [] }, group: 'control',
    });
  }
  if (allowed.has('sendMessage')) {
    out.push({
      id: 'sendGo', glyph: '📣', label: 'Tell everyone: GO',
      command: { kind: 'sendMessage', message: 'go' }, group: 'control',
    });
  }
  if (allowed.has('changeScene')) {
    for (const scene of project.scenes) {
      out.push({
        id: `scene:${scene.id}`, glyph: '🚪', label: `Go to ${sceneName(project, scene.id)}`,
        command: { kind: 'changeScene', sceneId: scene.id }, group: 'control',
      });
    }
  }

  return out;
}

/** "Scene 2" — scenes are numbered for a child, never named by id. */
export function sceneName(project: MiniAppProject, sceneId: string): string {
  const i = project.scenes.findIndex((s) => s.id === sceneId);
  return i < 0 ? 'that scene' : `Scene ${i + 1}`;
}

/**
 * Starting points available for one component. A trigger belongs to the
 * thing it watches, which is why this takes an owner.
 */
export function triggerChoices(project: MiniAppProject, ownerId: string): TriggerChoice[] {
  const template = miniAppTemplate(project.templateId);
  if (!template) return [];
  const allowed = new Set(template.allowedTriggers);
  const owner = project.scenes.flatMap((s) => s.components).find((c) => c.id === ownerId);
  if (!owner) return [];
  const name = labelOf(owner);
  const out: TriggerChoice[] = [];

  if (allowed.has('onAppStart')) {
    out.push({ id: 'start', glyph: '▶️', label: 'When the app starts', trigger: { kind: 'onAppStart' } });
  }
  if (allowed.has('onSceneStart')) {
    for (const scene of project.scenes) {
      out.push({
        id: `sceneStart:${scene.id}`, glyph: '🎬',
        label: `When ${sceneName(project, scene.id)} starts`,
        trigger: { kind: 'onSceneStart', sceneId: scene.id },
      });
    }
  }
  if (allowed.has('onTap')) {
    out.push({
      id: `tap:${ownerId}`, glyph: '👆', label: `When ${name} is tapped`,
      trigger: { kind: 'onTap', targetId: ownerId },
    });
  }
  if (allowed.has('onDrop')) {
    out.push({
      id: `drop:${ownerId}`, glyph: '🫳', label: `When ${name} is dropped somewhere`,
      trigger: { kind: 'onDrop', targetId: ownerId },
    });
  }
  if (allowed.has('onChoiceSelected') && owner.type === 'choiceCard') {
    out.push({
      id: `choice:${ownerId}`, glyph: '🔀', label: `When ${name} is chosen`,
      trigger: { kind: 'onChoiceSelected', targetId: ownerId },
    });
  }
  if (allowed.has('onItemCollected') && owner.type === 'collectible') {
    out.push({
      id: `collect:${ownerId}`, glyph: '🎯', label: `When ${name} is collected`,
      trigger: { kind: 'onItemCollected', targetId: ownerId },
    });
  }
  if (allowed.has('onGoalReached') && owner.type === 'goal') {
    out.push({
      id: `goal:${ownerId}`, glyph: '🏁', label: `When ${name} is reached`,
      trigger: { kind: 'onGoalReached', targetId: ownerId },
    });
  }
  if (allowed.has('onSensorDetected') && owner.type === 'sensor') {
    out.push({
      id: `sensor:${ownerId}`, glyph: '👁️', label: `When ${name} notices something`,
      trigger: { kind: 'onSensorDetected', targetId: ownerId },
    });
  }
  if (allowed.has('onCounterChanged')) {
    for (const v of project.variables) {
      out.push({
        id: `counter:${v.id}`, glyph: '🔢', label: `When ${v.accessibilityLabel} changes`,
        trigger: { kind: 'onCounterChanged', variableId: v.id },
      });
    }
  }
  if (allowed.has('onMessage')) {
    out.push({
      id: 'msgGo', glyph: '📨', label: 'When it hears GO',
      trigger: { kind: 'onMessage', message: 'go' },
    });
  }
  return out;
}

/** One line describing a command, for the script lane and Code Peek. */
export function describeCommand(project: MiniAppProject, cmd: MiniAppCommand): string {
  const name = (id: string): string => {
    const c = project.scenes.flatMap((s) => s.components).find((x) => x.id === id);
    return c ? labelOf(c) : 'it';
  };
  const varName = (id: string): string =>
    project.variables.find((v) => v.id === id)?.accessibilityLabel ?? 'the number';

  switch (cmd.kind) {
    case 'animate': return `${name(cmd.targetId)} ${ANIMATIONS.find((a) => a.token === cmd.animation)?.verb ?? cmd.animation}`;
    case 'changeState': return `${name(cmd.targetId)} ${STATES.find((s) => s.token === cmd.state)?.phrase ?? `becomes ${cmd.state}`}`;
    case 'changeColor': return `${name(cmd.targetId)} turns ${cmd.color}`;
    case 'show': return `Show ${name(cmd.targetId)}`;
    case 'hide': return `Hide ${name(cmd.targetId)}`;
    case 'lightOn': return `${name(cmd.targetId)} on`;
    case 'lightOff': return `${name(cmd.targetId)} off`;
    case 'move': return `${name(cmd.targetId)} moves ${cmd.direction}`;
    case 'turn': return `${name(cmd.targetId)} turns ${cmd.rotation}`;
    case 'sendToSlot': return `${name(cmd.targetId)} goes to its place`;
    case 'returnHome': return `${name(cmd.targetId)} goes home`;
    case 'playSound': return `Play ${APPROVED_SOUNDS.find((s) => s.id === cmd.sound)?.label ?? cmd.sound}`;
    case 'speakPhrase': return `${name(cmd.targetId)} says "${PREPARED_PHRASES.find((p) => p.id === cmd.phrase)?.text ?? '…'}"`;
    case 'askForHelp': return 'Ask for help';
    case 'increaseCounter': return `Add 1 to ${varName(cmd.variableId)}`;
    case 'decreaseCounter': return `Take 1 from ${varName(cmd.variableId)}`;
    case 'resetCounter': return `Set ${varName(cmd.variableId)} to 0`;
    case 'changeScene': return `Go to ${sceneName(project, cmd.sceneId)}`;
    case 'celebrate': return 'Celebrate';
    case 'showWin': return 'Show YOU WIN';
    case 'wait': return `Wait ${cmd.beats === 1 ? 'one beat' : `${cmd.beats} beats`}`;
    case 'repeatN': return `Repeat ${cmd.times} times`;
    case 'repeatUntil': return 'Keep going until…';
    case 'if': return 'If…';
    case 'ifElse': return 'If… or else…';
    case 'sendMessage': return `Tell everyone: ${cmd.message.toUpperCase()}`;
    case 'waitForMessage': return `Wait for ${cmd.message.toUpperCase()}`;
    case 'callJob': return 'Do the saved job';
    case 'askForApproval': return 'Ask first, then…';
  }
}

/** One line describing a trigger. */
export function describeTrigger(project: MiniAppProject, trigger: MiniAppTrigger): string {
  const name = (id: string): string => {
    const c = project.scenes.flatMap((s) => s.components).find((x) => x.id === id);
    return c ? labelOf(c) : 'it';
  };
  switch (trigger.kind) {
    case 'onAppStart': return 'When the app starts';
    case 'onSceneStart': return `When ${sceneName(project, trigger.sceneId)} starts`;
    case 'onTap': return `When ${name(trigger.targetId)} is tapped`;
    case 'onDrop': return `When ${name(trigger.targetId)} is dropped`;
    case 'onSignal': return `When it gets ${trigger.message.toUpperCase()}`;
    case 'onMessage': return `When it hears ${trigger.message.toUpperCase()}`;
    case 'onItemCollected': return `When ${name(trigger.targetId)} is collected`;
    case 'onGoalReached': return `When ${name(trigger.targetId)} is reached`;
    case 'onCounterChanged': return `When ${project.variables.find((v) => v.id === trigger.variableId)?.accessibilityLabel ?? 'the number'} changes`;
    case 'onStateChanged': return `When ${name(trigger.targetId)} becomes ${trigger.state}`;
    case 'onChoiceSelected': return `When ${name(trigger.targetId)} is chosen`;
    case 'onSensorDetected': return `When ${name(trigger.targetId)} notices something`;
  }
}

/** Components a child may add, filtered to what this kit allows. */
export function componentChoices(project: MiniAppProject): Array<{
  readonly type: MiniAppComponent['type'];
  readonly assetId: string;
  readonly label: string;
  readonly glyph: string;
}> {
  const template = miniAppTemplate(project.templateId);
  if (!template) return [];
  const out: Array<{ type: MiniAppComponent['type']; assetId: string; label: string; glyph: string }> = [];
  for (const type of template.allowedComponents) {
    for (const asset of assetsFor(type)) {
      out.push({ type, assetId: asset.id, label: asset.label, glyph: asset.glyph });
    }
  }
  return out;
}

function assetsFor(type: MiniAppComponent['type']): Array<{ id: string; label: string; glyph: string }> {
  return APPROVED_ASSETS.filter((a) => a.roles.includes(type))
    .map((a) => ({ id: a.id, label: a.label, glyph: a.glyph }));
}
