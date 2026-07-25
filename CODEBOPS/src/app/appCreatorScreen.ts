/**
 * The creator screen — one host for the whole build journey (spec §7).
 *
 *   template → build → teach → predict → (play)
 *
 * It owns the editor state, drives the Build/Play state machine, autosaves
 * a draft on every accepted edit, and keeps undo/redo honest. The step
 * panels themselves live in ui/app-lab; this file is the wiring.
 *
 * Play Mode is deliberately empty in Phase 2: the runtime arrives in Phase
 * 3. Rather than fake it, the play panel says plainly that the app is ready
 * to run and offers the way back — nothing here pretends to execute.
 */
import { el } from '../ui/dom';
import { sharedSfx } from '../audio/sfx';
import { showToast } from '../ui/dialogs';
import type { SaveStore } from '../storage/saveStore';
import type { AppKitDefinition } from '../data/app-lab/appLabDefinition';
import { titleText } from '../creator/miniAppProject';
import type { StarterDefinition } from '../creator/miniAppProjectFactory';
import type { EditorState, EditResult } from '../creator/miniAppEditor';
import {
  initialEditorState, addComponent, removeComponent, moveComponent,
  addScript, removeScript, appendCommand, removeCommandAt, moveCommand,
  undo, redo, canUndo, canRedo, readiness, setCreatorStage,
} from '../creator/miniAppEditor';
import { validateMiniAppProject } from '../creator/miniAppValidator';
import { MiniAppStore } from '../storage/miniAppStore';
import { saveDraft, clearDraft } from '../storage/miniAppDraft';
import { TemplatePicker } from '../ui/app-lab/templatePicker';
import { SceneBuilder } from '../ui/app-lab/sceneBuilder';
import { LogicBuilder } from '../ui/app-lab/logicBuilder';
import { PredictionPanel } from '../ui/app-lab/predictionPanel';
import type { CreatorState } from '../creator/miniAppMode';
import { initialCreatorState, applyCreatorAction, showsEditingChrome } from '../creator/miniAppMode';
import { APP_LAB_THEMES } from '../data/app-lab/approvedAssets';
import { sceneName } from '../creator/miniAppChoices';

export interface AppCreatorEvents {
  readonly onExitToLab: () => void;
}

/** Ids are minted here, at the edge, so the creator itself stays pure. */
let idCounter = 0;
function mintId(prefix: string): string {
  idCounter += 1;
  return `${prefix}-${idCounter}-${Math.floor(performance.now())}`;
}

export class AppCreatorScreen {
  private readonly library = new MiniAppStore();
  private editor: EditorState | null = null;
  private creator: CreatorState = initialCreatorState();
  private sceneId = '';
  private selectedId: string | null = null;
  private predictedCorrectly: boolean | null = null;
  private disposed = false;

  private body!: HTMLElement;
  private stepBar!: HTMLElement;
  private toolbar!: HTMLElement;
  private sceneBuilder: SceneBuilder | null = null;
  private logicBuilder: LogicBuilder | null = null;
  private prediction: PredictionPanel | null = null;

  constructor(
    private readonly root: HTMLElement,
    private readonly kit: AppKitDefinition,
    private readonly store: SaveStore,
    private readonly events: AppCreatorEvents,
  ) {
    void this.store;
  }

  enter(): void {
    this.root.classList.add('creator-screen');
    this.creator = applyCreatorAction(initialCreatorState(), { kind: 'chooseKit' });

    const head = el('div', 'cr-head', this.root);
    const back = el('button', 'circle-btn', head, '←') as HTMLButtonElement;
    back.type = 'button';
    back.setAttribute('aria-label', 'Back to the App Lab');
    back.addEventListener('click', () => { sharedSfx.play('tap'); this.exit(); });
    const titles = el('div', 'cr-titles', head);
    el('h1', undefined, titles, `${this.kit.glyph} ${this.kit.name}`);
    const subtitle = el('p', 'cr-subtitle', titles, 'Pick something to start with.');
    subtitle.id = 'cr-subtitle';

    this.stepBar = el('div', 'cr-steps', this.root);
    this.stepBar.setAttribute('aria-label', 'Where you are');
    this.body = el('div', 'cr-body', this.root);
    this.toolbar = el('div', 'cr-toolbar', this.root);

    this.renderStepBar();
    this.renderBody();
    this.renderToolbar();
  }

  // ---------------- step navigation ----------------

  private go(action: Parameters<typeof applyCreatorAction>[1]): void {
    const next = applyCreatorAction(this.creator, action);
    if (next === this.creator) return;
    this.creator = next;
    if (this.editor) {
      const stage = next.step === 'build' ? 'build'
        : next.step === 'teach' ? 'teach'
          : next.step === 'predict' || next.step === 'play' ? 'test' : 'choose';
      const r = setCreatorStage(this.editor, stage, Date.now());
      if (r.changed) this.editor = r.state;
    }
    this.renderStepBar();
    this.renderBody();
    this.renderToolbar();
  }

  private renderStepBar(): void {
    this.stepBar.innerHTML = '';
    const steps: Array<{ key: string; label: string; glyph: string }> = [
      { key: 'template', label: 'Choose', glyph: '🎁' },
      { key: 'build', label: 'Build', glyph: '🧱' },
      { key: 'teach', label: 'Teach', glyph: '🎓' },
      { key: 'predict', label: 'Guess', glyph: '🤔' },
      { key: 'play', label: 'Play', glyph: '▶️' },
    ];
    const at = steps.findIndex((s) => s.key === this.creator.step);
    steps.forEach((s, i) => {
      const chip = el('div',
        `cr-step${i === at ? ' on' : ''}${at >= 0 && i < at ? ' done' : ''}`, this.stepBar);
      el('span', 'cr-step-glyph', chip, s.glyph);
      el('span', 'cr-step-label', chip, s.label);
      if (i === at) chip.setAttribute('aria-current', 'step');
    });
  }

  // ---------------- the body panel ----------------

  private renderBody(): void {
    this.sceneBuilder?.dispose(); this.sceneBuilder = null;
    this.logicBuilder?.dispose(); this.logicBuilder = null;
    this.prediction?.dispose(); this.prediction = null;
    this.body.innerHTML = '';
    const subtitle = document.getElementById('cr-subtitle');

    switch (this.creator.step) {
      case 'template': {
        if (subtitle) subtitle.textContent = 'Pick something to start with.';
        new TemplatePicker(this.body, this.kit, {
          onPick: (starter, themeId) => this.startFrom(starter, themeId),
          onBack: () => this.exit(),
        }).render();
        break;
      }
      case 'build': {
        if (!this.editor) return;
        if (subtitle) subtitle.textContent = 'Put things on the screen.';
        this.renderSceneTabs();
        this.sceneBuilder = new SceneBuilder(this.body, this.editor.project, this.sceneId, {
          onAdd: (type, assetId, slotId) => this.apply(addComponent(this.editor!, {
            id: mintId('c'), sceneId: this.sceneId, type, assetId, slotId, now: Date.now(),
          })),
          onMove: (componentId, slotId) =>
            this.apply(moveComponent(this.editor!, componentId, slotId, Date.now())),
          onRemove: (componentId) =>
            this.apply(removeComponent(this.editor!, componentId, Date.now())),
          onSelect: (componentId) => { this.selectedId = componentId; },
        });
        break;
      }
      case 'teach': {
        if (!this.editor) return;
        if (subtitle) subtitle.textContent = 'Teach it what to do.';
        this.logicBuilder = new LogicBuilder(this.body, this.editor.project, {
          onSelectOwner: (id) => { this.selectedId = id; },
          onAddScript: (ownerId, trigger) => this.apply(addScript(this.editor!, {
            id: mintId('s'), ownerId, trigger, now: Date.now(),
          })),
          onRemoveScript: (scriptId) =>
            this.apply(removeScript(this.editor!, scriptId, Date.now())),
          onAddCommand: (scriptId, command) =>
            this.apply(appendCommand(this.editor!, scriptId, command, Date.now())),
          onRemoveCommand: (scriptId, index) =>
            this.apply(removeCommandAt(this.editor!, scriptId, index, Date.now())),
          onMoveCommand: (scriptId, index, delta) =>
            this.apply(moveCommand(this.editor!, scriptId, index, delta, Date.now())),
        });
        if (this.selectedId) this.logicBuilder.selectOwner(this.selectedId);
        break;
      }
      case 'predict': {
        if (!this.editor) return;
        if (subtitle) subtitle.textContent = 'Guess what will happen.';
        this.prediction = new PredictionPanel(this.body, this.editor.project, {
          onAnswer: (correct) => {
            this.predictedCorrectly = correct;
            window.setTimeout(() => { if (!this.disposed) this.go({ kind: 'test' }); }, 550);
          },
          onSkip: () => this.go({ kind: 'test' }),
        });
        break;
      }
      case 'play': {
        if (subtitle) subtitle.textContent = 'Play Mode.';
        this.renderPlayPlaceholder();
        break;
      }
      default:
        break;
    }
  }

  /** Story apps have up to three scenes; the others quietly skip this. */
  private renderSceneTabs(): void {
    if (!this.editor || this.editor.project.scenes.length < 2) return;
    const tabs = el('div', 'cr-scene-tabs', this.body);
    tabs.setAttribute('role', 'tablist');
    tabs.setAttribute('aria-label', 'Scenes');
    for (const scene of this.editor.project.scenes) {
      const b = el('button', `cr-scene-tab${scene.id === this.sceneId ? ' on' : ''}`, tabs) as HTMLButtonElement;
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', String(scene.id === this.sceneId));
      b.append(sceneName(this.editor.project, scene.id));
      b.addEventListener('click', () => {
        sharedSfx.play('tap');
        this.sceneId = scene.id;
        this.renderBody();
      });
    }
  }

  /**
   * Phase 2 has no runtime yet. This says so honestly rather than showing
   * a still frame that looks like a broken app.
   */
  private renderPlayPlaceholder(): void {
    const wrap = el('div', 'cr-play-soon', this.body);
    el('div', 'cr-play-glyph', wrap, '▶️');
    el('h2', undefined, wrap, 'Your app is ready to run!');
    el('p', undefined, wrap,
      'Play Mode wakes up in the next part of the Lab. Everything you built is saved.');
    if (this.predictedCorrectly !== null) {
      el('p', 'cr-play-guess', wrap, this.predictedCorrectly
        ? '🌟 And your guess matched your plan — good reading!'
        : '🤔 Your guess was different from your plan. Worth a look!');
    }
    const row = el('div', 'cr-play-actions', wrap);
    const backBtn = el('button', 'mini-btn purple', row, '← Keep building') as HTMLButtonElement;
    backBtn.type = 'button';
    backBtn.addEventListener('click', () => { sharedSfx.play('tap'); this.go({ kind: 'editFromDebug' }); });
    const labBtn = el('button', 'btn-play small', row, 'Back to the Lab') as HTMLButtonElement;
    labBtn.type = 'button';
    labBtn.addEventListener('click', () => { sharedSfx.play('tap'); this.exit(); });
  }

  // ---------------- toolbar ----------------

  private renderToolbar(): void {
    this.toolbar.innerHTML = '';
    if (!this.editor || !showsEditingChrome(this.creator)) {
      this.toolbar.hidden = true;
      return;
    }
    this.toolbar.hidden = false;

    const left = el('div', 'cr-tool-left', this.toolbar);
    const undoBtn = el('button', 'cr-tool', left, '↶') as HTMLButtonElement;
    undoBtn.type = 'button';
    undoBtn.setAttribute('aria-label', 'Undo');
    undoBtn.disabled = !canUndo(this.editor);
    undoBtn.addEventListener('click', () => {
      sharedSfx.play('remove');
      this.editor = undo(this.editor!);
      this.afterEdit();
    });
    const redoBtn = el('button', 'cr-tool', left, '↷') as HTMLButtonElement;
    redoBtn.type = 'button';
    redoBtn.setAttribute('aria-label', 'Redo');
    redoBtn.disabled = !canRedo(this.editor);
    redoBtn.addEventListener('click', () => {
      sharedSfx.play('place');
      this.editor = redo(this.editor!);
      this.afterEdit();
    });

    const mid = el('div', 'cr-tool-mid', this.toolbar);
    const r = readiness(this.editor.project);
    el('span', 'cr-nudge', mid, r.nudge ?? 'Looking good!');

    const right = el('div', 'cr-tool-right', this.toolbar);
    if (this.creator.step === 'build') {
      const next = el('button', 'btn-play small', right, 'Teach it →') as HTMLButtonElement;
      next.type = 'button';
      next.addEventListener('click', () => { sharedSfx.play('bop'); this.go({ kind: 'toTeach' }); });
    } else if (this.creator.step === 'teach') {
      const back = el('button', 'mini-btn purple', right, '← Screen') as HTMLButtonElement;
      back.type = 'button';
      back.addEventListener('click', () => { sharedSfx.play('tap'); this.go({ kind: 'backToBuild' }); });
      const test = el('button', 'btn-play small', right, 'Try it! ▶') as HTMLButtonElement;
      test.type = 'button';
      test.disabled = !r.ready;
      test.addEventListener('click', () => { sharedSfx.play('bop'); this.go({ kind: 'toPredict' }); });
    }

    const save = el('button', 'cr-tool save', right, '💾') as HTMLButtonElement;
    save.type = 'button';
    save.setAttribute('aria-label', 'Save this app');
    save.addEventListener('click', () => void this.save());
  }

  // ---------------- editing plumbing ----------------

  private startFrom(starter: StarterDefinition, themeId: string): void {
    const project = starter.build({ id: mintId('app'), now: Date.now(), themeId });
    this.editor = initialEditorState(project);
    this.sceneId = project.scenes[0]?.id ?? '';
    this.selectedId = null;
    this.predictedCorrectly = null;
    saveDraft(project, Date.now());
    this.go({ kind: 'chooseTemplate' });
  }

  /** Apply an edit result: refusals coach, accepted edits redraw and autosave. */
  private apply(result: EditResult): void {
    if (result.refusal) {
      sharedSfx.play('bump');
      showToast(this.root, result.refusal);
      return;
    }
    if (!result.changed) return;
    this.editor = result.state;
    this.afterEdit();
  }

  private afterEdit(): void {
    if (!this.editor) return;
    saveDraft(this.editor.project, Date.now());
    this.sceneBuilder?.update(this.editor.project, this.sceneId);
    if (this.selectedId) this.sceneBuilder?.select(this.selectedId);
    this.logicBuilder?.update(this.editor.project);
    this.renderToolbar();
  }

  private async save(): Promise<void> {
    if (!this.editor) return;
    const project = this.editor.project;
    const check = validateMiniAppProject(project);
    if (!check.valid) {
      sharedSfx.play('bump');
      showToast(this.root, check.childMessage ?? 'Let us tidy this up before saving.');
      return;
    }
    const outcome = await this.library.save(project);
    if (this.disposed) return;
    if (outcome.ok) {
      sharedSfx.play('star');
      clearDraft();
      showToast(this.root, `💾 Saved "${titleText(project.title)}" to My Apps!`);
    } else {
      sharedSfx.play('bump');
      showToast(this.root, outcome.childMessage ?? 'That could not be saved right now.');
    }
  }

  /** The place the theme picker's choice actually lands, for later phases. */
  themeLabel(): string {
    const id = this.editor?.project.themeId;
    return APP_LAB_THEMES.find((t) => t.id === id)?.label ?? '';
  }

  private exit(): void {
    this.events.onExitToLab();
  }

  dispose(): void {
    this.disposed = true;
    this.sceneBuilder?.dispose();
    this.logicBuilder?.dispose();
    this.prediction?.dispose();
    this.root.classList.remove('creator-screen');
    this.root.innerHTML = '';
  }
}
