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
      node.setAttribute('aria-label', taught
        ? component.accessibilityLabel
        : `${component.accessibilityLabel} — nothing taught yet`);
      node.addEventListener('click', () => this.fire({ kind: 'tap', componentId: component.id }));

      el('span', 'pm-piece-glyph', node, asset?.glyph ?? '❔');
      if (rt.saying) {
        const phrase = preparedPhrase(rt.saying);
        const bubble = el('span', 'pm-bubble', node);
        el('span', undefined, bubble, phrase?.glyph ?? '💬');
        el('span', undefined, bubble, phrase?.text ?? '');
      }
      this.pieceNodes.set(component.id, node);
    }

    if (this.state.won) {
      const win = el('div', 'pm-win', this.stage);
      el('span', 'pm-win-glyph', win, '🏆');
      el('span', undefined, win, 'YOU WIN!');
    }
  }

  // ---- running ----

  private fire(cause: TriggerCause): void {
    if (this.running || this.disposed) return;
    const result = run(this.project, cause, this.state);
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
      this.state = event.stateAfter;
      this.renderScene();
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
