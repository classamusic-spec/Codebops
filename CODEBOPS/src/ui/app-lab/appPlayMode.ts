/**
 * Play Mode (spec §8.2, §9.6) — the finished app, as a user meets it.
 *
 * Everything that belongs to making software is gone: no slots, no tray,
 * no labels, no inspector. What is left is the child's scene on their
 * chosen backdrop, and things that respond when tapped. That contrast is
 * the point — a child should feel the difference between building a thing
 * and using it.
 *
 * The runtime decides what happens; this file only plays the resulting
 * events back over time. Nothing here changes app state, so the same tap
 * always produces the same run no matter how fast the animation is.
 */
import { el } from '../dom';
import { sharedSfx } from '../../audio/sfx';
import type { MiniAppProject } from '../../creator/miniAppProject';
import type {
  MiniAppRuntimeSnapshot, MiniAppExecutionEvent, TriggerCause,
} from '../../creator/miniAppRuntime';
import {
  initialRuntimeState, run, tappableComponents, hasStartScript,
} from '../../creator/miniAppRuntime';
import { approvedAsset, APP_LAB_THEMES } from '../../data/app-lab/approvedAssets';
import { approvedSound, preparedPhrase } from '../../data/app-lab/approvedSounds';
import type { PreparedPhraseId } from '../../creator/miniAppTypes';
import { sceneLayout } from '../../data/app-lab/sceneLayouts';

/** Milliseconds per beat. Calm mode slows everything down together. */
const BEAT_MS = 260;
const CALM_BEAT_MS = 420;

export interface PlayModeEvents {
  readonly onExit: () => void;
  /** Offered once something surprising has happened (spec §8.2). */
  readonly onDebug: (events: readonly MiniAppExecutionEvent[]) => void;
  /** Reports each finished run, so the screen can record evidence later. */
  readonly onRan?: (result: { events: readonly MiniAppExecutionEvent[]; triggered: boolean }) => void;
}

export class AppPlayMode {
  readonly root: HTMLElement;
  private stage!: HTMLElement;
  private state: MiniAppRuntimeSnapshot;
  private running = false;
  private sawSomethingOdd = false;
  private timers: number[] = [];
  private disposed = false;
  private lastEvents: readonly MiniAppExecutionEvent[] = [];
  private pieceNodes = new Map<string, HTMLElement>();
  /** The thing a child has picked up, waiting for somewhere to put it. */
  private carrying: string | null = null;
  /** Components a rule says can be dropped somewhere. */
  private draggable = new Set<string>();
  /** Reserved for kits that name explicit drop zones. */
  private readonly dropTargets = new Set<string>();
  /** Approvals already given this run, replayed so the run is reproducible. */
  private approvals: boolean[] = [];

  constructor(
    parent: HTMLElement,
    private readonly project: MiniAppProject,
    private readonly calm: boolean,
    private readonly events: PlayModeEvents,
  ) {
    this.state = initialRuntimeState(project);
    this.root = el('div', 'pm-wrap', parent);
    this.build();
    // "When the app starts" should feel like the app starting.
    if (hasStartScript(project)) {
      this.timers.push(window.setTimeout(() => this.fire({ kind: 'appStart' }), 320));
    }
  }

  private beat(): number { return this.calm ? CALM_BEAT_MS : BEAT_MS; }

  private theme(): { sky: string } {
    return APP_LAB_THEMES.find((t) => t.id === this.project.themeId) ?? { sky: '#7ec8ff' };
  }

  private build(): void {
    const bar = el('div', 'pm-bar', this.root);
    const exit = el('button', 'pm-exit', bar, '✕') as HTMLButtonElement;
    exit.type = 'button';
    exit.setAttribute('aria-label', 'Leave the app');
    exit.addEventListener('click', () => { sharedSfx.play('tap'); this.events.onExit(); });

    const restart = el('button', 'pm-restart', bar, '↻') as HTMLButtonElement;
    restart.type = 'button';
    restart.setAttribute('aria-label', 'Start the app again');
    restart.addEventListener('click', () => this.restart());

    this.stage = el('div', 'pm-stage', this.root);
    this.stage.style.background = this.theme().sky;
    this.stage.setAttribute('role', 'application');
    this.stage.setAttribute('aria-label', 'Your app. Tap the things in it.');

    this.renderScene();
  }

  // ---- drawing ----

  private renderScene(): void {
    this.stage.innerHTML = '';
    this.pieceNodes.clear();
    const scene = this.project.scenes.find((s) => s.id === this.state.sceneId);
    const layout = scene ? sceneLayout(scene.layoutTemplateId) : null;
    if (!scene || !layout) return;

    const board = el('div', 'pm-board', this.stage);
    board.style.setProperty('--cols', String(layout.cols));
    board.style.setProperty('--rows', String(layout.rows));

    const canTap = new Set(tappableComponents(this.project, scene.id));
    this.draggable = new Set(
      this.project.scripts
        .filter((sc) => sc.trigger.kind === 'onDrop')
        .map((sc) => (sc.trigger as { targetId: string }).targetId),
    );

    for (const component of scene.components) {
      const rt = this.state.components[component.id];
      if (!rt) continue;
      const slot = layout.slots.find((s) => s.id === rt.slotId) ?? layout.slots[0];
      const asset = approvedAsset(component.assetId);

      // EVERYTHING is tappable, but only the things that were taught
      // something wear the hint ring. Tapping an untaught thing is a real
      // discovery — "nobody told this one what to do" — so it has to be
      // possible, rather than being silently unclickable.
      const taught = canTap.has(component.id);
      const node = el('button',
        `pm-piece${taught ? ' tappable' : ''}${rt.visible ? '' : ' gone'}`, board) as HTMLButtonElement;
      node.type = 'button';
      node.style.gridColumn = slot.wide ? `${slot.col} / span 2` : String(slot.col);
      node.style.gridRow = String(slot.row);
      node.dataset.state = rt.state;
      if (rt.color) node.dataset.color = rt.color;
      if (rt.lit) node.classList.add('lit');
      // Sorting kits are tap-to-pick-up, tap-to-drop — never a precision
      // drag (§26). Anything with a drop rule can be carried; anything at
      // all can be dropped onto.
      const carryable = this.dropTargets.has(component.id) === false && this.draggable.has(component.id);
      if (this.carrying === component.id) node.classList.add('carrying');
      else if (this.carrying && component.id !== this.carrying) node.classList.add('droppable');

      // The asset label may already say "— tap it"; build from the plain
      // name so a label never reads "Zip — tap it — nothing taught yet".
      const plain = approvedAsset(component.assetId)?.label ?? component.accessibilityLabel;
      node.setAttribute('aria-label', this.carrying === component.id
        ? `${plain} — picked up. Tap where it should go.`
        : this.carrying
          ? `Put it on ${plain}`
          : carryable
            ? `${plain} — tap to pick it up`
            : taught
              ? `${plain} — tap it`
              : `${plain} — nothing taught yet`);

      node.addEventListener('click', () => {
        if (this.carrying && this.carrying !== component.id) {
          const item = this.carrying;
          this.carrying = null;
          sharedSfx.play('place');
          this.fire({ kind: 'drop', componentId: item, ontoId: component.id });
          return;
        }
        if (this.carrying === component.id) {
          this.carrying = null;
          sharedSfx.play('remove');
          this.renderScene();
          return;
        }
        if (carryable) {
          this.carrying = component.id;
          sharedSfx.play('tap');
          this.renderScene();
          return;
        }
        this.fire({ kind: 'tap', componentId: component.id });
      });

      el('span', 'pm-piece-glyph', node, asset?.glyph ?? '❔');
      if (rt.saying) {
        const phrase = preparedPhrase(rt.saying);
        const bubble = el('span', 'pm-bubble', node);
        el('span', undefined, bubble, phrase?.glyph ?? '💬');
        el('span', undefined, bubble, phrase?.text ?? '');
      }
      this.pieceNodes.set(component.id, node);
    }

    // A variable is always something a child can SEE (spec §12). If the
    // scene has a counter or memory piece the number rides on it; if not,
    // it gets its own readout rather than being invisible.
    const holders = scene.components.filter(
      (c) => c.type === 'counter' || c.type === 'memoryContainer');
    let loose: HTMLElement | null = null;
    this.project.variables.forEach((v, i) => {
      const value = this.state.variables[v.id];
      if (typeof value !== 'number') return;
      const holder = holders[i] ?? holders[0];
      const node = holder ? this.pieceNodes.get(holder.id) : null;
      if (node) {
        const badge = el('span', 'pm-count', node, String(value));
        badge.setAttribute('aria-label', `${v.accessibilityLabel}: ${value}`);
        return;
      }
      loose = loose ?? el('div', 'pm-readouts', this.stage);
      const chip = el('div', 'pm-readout', loose);
      chip.setAttribute('aria-label', `${v.accessibilityLabel}: ${value}`);
      el('span', 'pm-readout-name', chip, v.accessibilityLabel);
      el('span', 'pm-readout-value', chip, String(value));
    });

    if (this.state.won) {
      const win = el('div', 'pm-win', this.stage);
      el('span', 'pm-win-glyph', win, '🏆');
      el('span', undefined, win, 'YOU WIN!');
    }
  }

  // ---- running ----

  private fire(cause: TriggerCause): void {
    if (this.running || this.disposed) return;
    this.approvals = [];
    this.runFrom(cause);
  }

  /**
   * Run a cause, pausing at any Ask First gate. Answering re-runs from the
   * same starting state with the answer recorded, which reproduces the run
   * exactly and then carries on — no callbacks held inside the runtime.
   */
  private runFrom(cause: TriggerCause): void {
    const before = this.state;
    const result = run(this.project, cause, before, { approvals: this.approvals });
    if (result.awaitingApproval) {
      const ask = result.awaitingApproval;
      this.askPermission(ask.phrase, (yes) => {
        this.approvals = [...this.approvals, yes];
        this.state = before;
        this.runFrom(cause);
      });
      return;
    }
    this.finishRun(cause, result);
  }

  private askPermission(phrase: PreparedPhraseId, decide: (yes: boolean) => void): void {
    const scrim = el('div', 'pm-ask-scrim', this.root);
    const box = el('div', 'pm-ask', scrim);
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', 'Your helper is asking first');
    el('div', 'pm-ask-glyph', box, '🙋');
    el('p', 'pm-ask-text', box, `Your helper asks: "${preparedPhrase(phrase)?.text ?? 'May I?'}"`);
    const row = el('div', 'pm-ask-row', box);
    const yes = el('button', 'btn-play small', row, 'Yes, go ahead') as HTMLButtonElement;
    yes.type = 'button';
    yes.addEventListener('click', () => { sharedSfx.play('tap'); scrim.remove(); decide(true); });
    const no = el('button', 'mini-btn purple', row, 'Not this time') as HTMLButtonElement;
    no.type = 'button';
    no.addEventListener('click', () => { sharedSfx.play('tap'); scrim.remove(); decide(false); });
    yes.focus();
  }

  private finishRun(cause: TriggerCause, result: ReturnType<typeof run>): void {
    this.lastEvents = result.events;
    this.events.onRan?.({ events: result.events, triggered: result.triggered });

    if (!result.triggered) {
      // Tapping something with no job is a real thing to notice, not an
      // error: the app is telling the child it was never taught this.
      if (cause.kind === 'tap') {
        sharedSfx.play('bump');
        this.pieceNodes.get(cause.componentId)?.classList.add('pm-nudge');
        window.setTimeout(
          () => this.pieceNodes.get(cause.componentId)?.classList.remove('pm-nudge'), 400);
        this.note('That one has not been taught anything yet.');
        this.sawSomethingOdd = true;
        this.renderBar();
      }
      return;
    }
    void this.play(result.events, result.overflowed);
  }

  private async play(events: readonly MiniAppExecutionEvent[], overflowed: boolean): Promise<void> {
    this.running = true;
    for (const event of events) {
      if (this.disposed) return;
      const sceneChanged = event.stateBefore.sceneId !== event.stateAfter.sceneId;
      this.state = event.stateAfter;
      this.renderScene();
      if (sceneChanged) {
        this.stage.classList.remove('pm-scene-in');
        void this.stage.offsetWidth;
        this.stage.classList.add('pm-scene-in');
        // A new scene is its own beginning.
        const sceneId = this.state.sceneId;
        this.timers.push(window.setTimeout(() => {
          if (!this.disposed && !this.running) this.fire({ kind: 'sceneStart', sceneId });
        }, this.beat()));
      }
      this.flash(event);
      if (event.sound) sharedSfx.play(approvedSound(event.sound)?.voice ?? 'tap');
      if (event.outcome.kind !== 'done') {
        this.sawSomethingOdd = true;
        this.note(event.outcome.kind === 'unsupported'
          ? `That step ${event.outcome.why}.`
          : `Nothing to do there — ${event.outcome.why}.`);
      }
      await this.wait(Math.max(1, event.holdBeats) * this.beat());
    }
    if (overflowed) {
      this.sawSomethingOdd = true;
      this.note('That went on for a long time, so the app took a rest.');
    }
    this.running = false;
    this.renderBar();
  }

  /** A small visual pulse on whatever the command touched. */
  private flash(event: MiniAppExecutionEvent): void {
    const cmd = event.command;
    const id = 'targetId' in cmd ? cmd.targetId : event.componentId;
    const node = this.pieceNodes.get(id);
    if (!node) return;
    const animation = cmd.kind === 'animate' ? cmd.animation : 'pulse';
    if (this.calm) { node.classList.add('pm-calm-mark'); return; }
    node.classList.add(`pm-anim-${animation}`);
    this.timers.push(window.setTimeout(
      () => node.classList.remove(`pm-anim-${animation}`), this.beat()));
  }

  private wait(ms: number): Promise<void> {
    return new Promise((resolve) => {
      this.timers.push(window.setTimeout(resolve, ms));
    });
  }

  private note(text: string): void {
    this.root.querySelector('.pm-note')?.remove();
    const n = el('div', 'pm-note', this.root, text);
    this.timers.push(window.setTimeout(() => n.remove(), 2600));
  }

  /** The Debug door appears only once something surprising has happened. */
  private renderBar(): void {
    const bar = this.root.querySelector('.pm-bar');
    if (!bar) return;
    const existing = bar.querySelector('.pm-debug');
    if (!this.sawSomethingOdd) { existing?.remove(); return; }
    if (existing) return;
    const debug = el('button', 'pm-debug', bar as HTMLElement, '🔍 What happened?') as HTMLButtonElement;
    debug.type = 'button';
    debug.addEventListener('click', () => {
      sharedSfx.play('tap');
      this.events.onDebug(this.lastEvents);
    });
  }

  private restart(): void {
    sharedSfx.play('tap');
    this.clearTimers();
    this.running = false;
    this.state = initialRuntimeState(this.project);
    this.renderScene();
    if (hasStartScript(this.project)) {
      this.timers.push(window.setTimeout(() => this.fire({ kind: 'appStart' }), 260));
    }
  }

  private clearTimers(): void {
    for (const t of this.timers) window.clearTimeout(t);
    this.timers = [];
  }

  dispose(): void {
    this.disposed = true;
    this.clearTimers();
    this.root.remove();
  }
}
