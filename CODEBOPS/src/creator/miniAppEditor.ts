/**
 * Editing a mini app (spec §9.3, §9.4) — every change a child can make,
 * as a pure function from one project to the next.
 *
 * Two things fall out of doing it this way. Undo is a stack of whole
 * projects rather than a pile of inverse operations, which is both simpler
 * and impossible to get subtly wrong. And every edit can be tested without
 * a browser, so the rules about limits and dangling references are
 * enforced in one place instead of in each screen.
 *
 * An edit that would break a limit is REFUSED, not clamped: the child gets
 * a sentence about what to do next and the project is left exactly as it
 * was. Nothing here mutates its input.
 */
import type { MiniAppProject, MiniAppScript, MiniAppComponent } from './miniAppProject';
import type {
  MiniAppCommand, MiniAppTrigger, MiniAppComponentType, SerializableValue,
} from './miniAppTypes';
import { flattenCommands, commandDepth, conditionRefs, triggerRefs, NESTING_FIELDS } from './miniAppTypes';
import { miniAppTemplate } from './miniAppTemplateRegistry';
import type { MiniAppTemplateDefinition } from './miniAppTemplateRegistry';
import { approvedAsset } from '../data/app-lab/approvedAssets';
import { defaultAccessibilityLabel } from '../data/app-lab/approvedComponents';
import { sceneLayout } from '../data/app-lab/sceneLayouts';

/** How many steps back a child can go. Deep enough to feel safe. */
export const HISTORY_LIMIT = 30;

export interface EditorState {
  readonly project: MiniAppProject;
  readonly past: readonly MiniAppProject[];
  readonly future: readonly MiniAppProject[];
  /** Bumped on every accepted edit, so a UI can tell "changed" from "same". */
  readonly revision: number;
}

export interface EditResult {
  readonly state: EditorState;
  /** True when the edit changed anything. */
  readonly changed: boolean;
  /** Present when the edit was refused. Written for a child to read. */
  readonly refusal?: string;
}

export function initialEditorState(project: MiniAppProject): EditorState {
  return { project, past: [], future: [], revision: 0 };
}

/** Accept an edit: push the old project onto the undo stack. */
function accept(state: EditorState, next: MiniAppProject): EditResult {
  const past = [...state.past, state.project].slice(-HISTORY_LIMIT);
  return {
    state: { project: next, past, future: [], revision: state.revision + 1 },
    changed: true,
  };
}

/** Refuse an edit: nothing moves, and the child is told what to try. */
function refuse(state: EditorState, refusal: string): EditResult {
  return { state, changed: false, refusal };
}

export function canUndo(state: EditorState): boolean { return state.past.length > 0; }
export function canRedo(state: EditorState): boolean { return state.future.length > 0; }

export function undo(state: EditorState): EditorState {
  if (state.past.length === 0) return state;
  const previous = state.past[state.past.length - 1];
  return {
    project: previous,
    past: state.past.slice(0, -1),
    future: [state.project, ...state.future].slice(0, HISTORY_LIMIT),
    revision: state.revision + 1,
  };
}

export function redo(state: EditorState): EditorState {
  if (state.future.length === 0) return state;
  const next = state.future[0];
  return {
    project: next,
    past: [...state.past, state.project].slice(-HISTORY_LIMIT),
    future: state.future.slice(1),
    revision: state.revision + 1,
  };
}

function templateOf(project: MiniAppProject): MiniAppTemplateDefinition | null {
  return miniAppTemplate(project.templateId);
}

function touch(project: MiniAppProject, now: number): MiniAppProject {
  return { ...project, updatedAt: now };
}

// ---------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------

/** Slots in a scene that nothing is standing in yet. */
export function freeSlots(project: MiniAppProject, sceneId: string): string[] {
  const scene = project.scenes.find((s) => s.id === sceneId);
  if (!scene) return [];
  const layout = sceneLayout(scene.layoutTemplateId);
  if (!layout) return [];
  const taken = new Set(scene.components.map((c) => c.slotId));
  return layout.slots.filter((s) => !taken.has(s.id)).map((s) => s.id);
}

export interface AddComponentRequest {
  readonly sceneId: string;
  readonly type: MiniAppComponentType;
  readonly assetId: string;
  /** Where to put it. Omit to use the first free slot. */
  readonly slotId?: string;
  readonly initialState?: SerializableValue;
  /** Stable id, minted by the caller so the editor stays deterministic. */
  readonly id: string;
  readonly now: number;
}

export function addComponent(state: EditorState, req: AddComponentRequest): EditResult {
  const { project } = state;
  const template = templateOf(project);
  if (!template) return refuse(state, 'This app is missing its kit.');

  const scene = project.scenes.find((s) => s.id === req.sceneId);
  if (!scene) return refuse(state, 'That scene is not here any more.');
  if (scene.components.length >= template.maximumComponentsPerScene) {
    return refuse(state, 'This screen is full! Take something off to make room.');
  }
  if (!template.allowedComponents.includes(req.type)) {
    return refuse(state, 'That piece belongs in a different kind of app.');
  }
  const slotId = req.slotId ?? freeSlots(project, req.sceneId)[0];
  if (!slotId) return refuse(state, 'Every space on this screen is taken.');
  if (scene.components.some((c) => c.slotId === slotId)) {
    return refuse(state, 'Something is already standing there.');
  }

  const asset = approvedAsset(req.assetId);
  if (!asset) return refuse(state, 'The Lab does not have that piece.');

  const component: MiniAppComponent = {
    id: req.id,
    type: req.type,
    assetId: req.assetId,
    slotId,
    initialState: req.initialState ?? 'idle',
    accessibilityLabel: defaultAccessibilityLabel(req.type, asset.label),
    ...(asset.color || asset.shape || asset.itemType
      ? { properties: { color: asset.color, shape: asset.shape, itemType: asset.itemType } }
      : {}),
  };

  const scenes = project.scenes.map((s) =>
    s.id === req.sceneId ? { ...s, components: [...s.components, component] } : s);
  const assets = project.assets.some((a) => a.assetId === req.assetId)
    ? project.assets
    : [...project.assets, { assetId: req.assetId }];

  return accept(state, touch({ ...project, scenes, assets }, req.now));
}

/**
 * Remove a component, and with it everything that pointed at it. Leaving a
 * dangling reference behind would make the project fail validation through
 * no fault of the child, so the tidy-up is part of the edit.
 */
export function removeComponent(state: EditorState, componentId: string, now: number): EditResult {
  const { project } = state;
  const exists = project.scenes.some((s) => s.components.some((c) => c.id === componentId));
  if (!exists) return refuse(state, 'That piece has already gone.');

  const scenes = project.scenes.map((s) => ({
    ...s, components: s.components.filter((c) => c.id !== componentId),
  }));
  const scripts = project.scripts
    .filter((sc) => sc.ownerId !== componentId)
    .filter((sc) => !triggerRefs(sc.trigger).components.includes(componentId))
    .map((sc) => ({ ...sc, commands: pruneCommands(sc.commands, componentId) }));

  return accept(state, touch({ ...project, scenes, scripts }, now));
}

/**
 * Drop any command that mentions a component that is no longer here, and
 * recurse into whatever branches the command happens to nest in.
 */
function pruneCommands(commands: readonly MiniAppCommand[], componentId: string): MiniAppCommand[] {
  const keep: MiniAppCommand[] = [];
  for (const cmd of commands) {
    if (commandMentions(cmd, componentId)) continue;
    const fields = NESTING_FIELDS[cmd.kind];
    if (!fields) { keep.push(cmd); continue; }
    // Rebuild through a loose record so one branch of code handles every
    // nesting shape — `then`, `otherwise` and `body` alike.
    const rebuilt: Record<string, unknown> = { ...(cmd as unknown as Record<string, unknown>) };
    for (const f of fields) {
      const branch = rebuilt[f] as readonly MiniAppCommand[] | undefined;
      if (branch) rebuilt[f] = pruneCommands(branch, componentId);
    }
    keep.push(rebuilt as unknown as MiniAppCommand);
  }
  return keep;
}

/** Does this command name the component directly (not via its body)? */
function commandMentions(cmd: MiniAppCommand, componentId: string): boolean {
  if ('targetId' in cmd && cmd.targetId === componentId) return true;
  if ('test' in cmd && conditionRefs(cmd.test).components.includes(componentId)) return true;
  return false;
}

export function moveComponent(
  state: EditorState, componentId: string, slotId: string, now: number,
): EditResult {
  const { project } = state;
  const scene = project.scenes.find((s) => s.components.some((c) => c.id === componentId));
  if (!scene) return refuse(state, 'That piece has already gone.');
  const layout = sceneLayout(scene.layoutTemplateId);
  if (!layout?.slots.some((s) => s.id === slotId)) {
    return refuse(state, 'Nothing can stand there.');
  }
  const occupant = scene.components.find((c) => c.slotId === slotId);
  // Swapping beats refusing: a child moving something onto a full space
  // means "these two should trade places".
  const components = scene.components.map((c) => {
    if (c.id === componentId) return { ...c, slotId };
    if (occupant && c.id === occupant.id) {
      const from = scene.components.find((x) => x.id === componentId)!;
      return { ...c, slotId: from.slotId };
    }
    return c;
  });
  const scenes = project.scenes.map((s) => (s.id === scene.id ? { ...s, components } : s));
  return accept(state, touch({ ...project, scenes }, now));
}

// ---------------------------------------------------------------------
// Scripts
// ---------------------------------------------------------------------

export interface AddScriptRequest {
  readonly id: string;
  readonly ownerId: string;
  readonly trigger: MiniAppTrigger;
  readonly now: number;
}

export function addScript(state: EditorState, req: AddScriptRequest): EditResult {
  const { project } = state;
  const template = templateOf(project);
  if (!template) return refuse(state, 'This app is missing its kit.');
  if (project.scripts.length >= template.maximumScripts) {
    return refuse(state, 'This app has all the jobs it can hold. Take one away first.');
  }
  if (!template.allowedTriggers.includes(req.trigger.kind)) {
    return refuse(state, 'That starting point belongs in a different kind of app.');
  }
  const owner = project.scenes.flatMap((s) => s.components).find((c) => c.id === req.ownerId);
  if (!owner) return refuse(state, 'Pick something on the screen first.');

  const script: MiniAppScript = { id: req.id, ownerId: req.ownerId, trigger: req.trigger, commands: [] };
  return accept(state, touch({ ...project, scripts: [...project.scripts, script] }, req.now));
}

export function removeScript(state: EditorState, scriptId: string, now: number): EditResult {
  const { project } = state;
  if (!project.scripts.some((s) => s.id === scriptId)) {
    return refuse(state, 'That job has already gone.');
  }
  return accept(state, touch({
    ...project, scripts: project.scripts.filter((s) => s.id !== scriptId),
  }, now));
}

export function appendCommand(
  state: EditorState, scriptId: string, command: MiniAppCommand, now: number,
): EditResult {
  const { project } = state;
  const template = templateOf(project);
  if (!template) return refuse(state, 'This app is missing its kit.');
  const script = project.scripts.find((s) => s.id === scriptId);
  if (!script) return refuse(state, 'Pick a job to add to first.');
  if (!template.allowedCommands.includes(command.kind)) {
    return refuse(state, 'That step belongs in a different kind of app.');
  }
  const next = [...script.commands, command];
  if (flattenCommands(next).length > template.maximumCommandsPerScript) {
    return refuse(state, 'This job is as long as it can be. Try taking a step out.');
  }
  if (commandDepth(next) > template.maximumCommandDepth) {
    return refuse(state, 'That would tuck steps too deep inside each other.');
  }
  return accept(state, touch({
    ...project,
    scripts: project.scripts.map((s) => (s.id === scriptId ? { ...s, commands: next } : s)),
  }, now));
}

export function removeCommandAt(
  state: EditorState, scriptId: string, index: number, now: number,
): EditResult {
  const { project } = state;
  const script = project.scripts.find((s) => s.id === scriptId);
  if (!script || index < 0 || index >= script.commands.length) {
    return refuse(state, 'That step has already gone.');
  }
  const commands = script.commands.filter((_, i) => i !== index);
  return accept(state, touch({
    ...project,
    scripts: project.scripts.map((s) => (s.id === scriptId ? { ...s, commands } : s)),
  }, now));
}

/** Move a step one place earlier or later in its job. */
export function moveCommand(
  state: EditorState, scriptId: string, index: number, delta: -1 | 1, now: number,
): EditResult {
  const { project } = state;
  const script = project.scripts.find((s) => s.id === scriptId);
  if (!script) return refuse(state, 'That job has already gone.');
  const to = index + delta;
  if (index < 0 || index >= script.commands.length || to < 0 || to >= script.commands.length) {
    return refuse(state, 'That step is already at the end.');
  }
  const commands = [...script.commands];
  const [moved] = commands.splice(index, 1);
  commands.splice(to, 0, moved);
  return accept(state, touch({
    ...project,
    scripts: project.scripts.map((s) => (s.id === scriptId ? { ...s, commands } : s)),
  }, now));
}

export function clearScript(state: EditorState, scriptId: string, now: number): EditResult {
  const { project } = state;
  const script = project.scripts.find((s) => s.id === scriptId);
  if (!script || script.commands.length === 0) return refuse(state, 'That job is already empty.');
  return accept(state, touch({
    ...project,
    scripts: project.scripts.map((s) => (s.id === scriptId ? { ...s, commands: [] } : s)),
  }, now));
}

// ---------------------------------------------------------------------
// Project-level edits
// ---------------------------------------------------------------------

export function setTitleTokens(state: EditorState, tokens: string[], now: number): EditResult {
  if (tokens.length === 0) return refuse(state, 'Pick at least one word for the name.');
  return accept(state, touch({ ...state.project, title: { ...state.project.title, tokens } }, now));
}

export function setTheme(state: EditorState, themeId: string, now: number): EditResult {
  if (state.project.themeId === themeId) return refuse(state, 'That is already the place.');
  return accept(state, touch({ ...state.project, themeId }, now));
}

export function setCreatorStage(
  state: EditorState, stage: MiniAppProject['curriculum']['creatorStage'], now: number,
): EditResult {
  if (state.project.curriculum.creatorStage === stage) {
    return { state, changed: false };
  }
  return accept(state, touch({
    ...state.project, curriculum: { ...state.project.curriculum, creatorStage: stage },
  }, now));
}

// ---------------------------------------------------------------------
// Readiness — what the builder tells a child before they press Test
// ---------------------------------------------------------------------

export interface Readiness {
  readonly ready: boolean;
  /** One friendly nudge toward the next thing worth doing. */
  readonly nudge?: string;
}

/**
 * Not validation — this is coaching. The project may be perfectly valid
 * and still have nothing to watch, which is the most common way a first
 * app disappoints.
 */
export function readiness(project: MiniAppProject): Readiness {
  const components = project.scenes.flatMap((s) => s.components);
  if (components.length === 0) {
    return { ready: false, nudge: 'Put something on the screen to start with.' };
  }
  if (project.scripts.length === 0) {
    return { ready: false, nudge: 'Now teach something what to do.' };
  }
  const empty = project.scripts.filter((s) => s.commands.length === 0);
  if (empty.length === project.scripts.length) {
    return { ready: false, nudge: 'Add a step or two, then try it out!' };
  }
  if (empty.length > 0) {
    return { ready: true, nudge: 'One job has no steps yet — it will just sit quietly.' };
  }
  return { ready: true };
}
