/**
 * Debug Mode for mini apps (spec §18, §19) — "let us look at what happened".
 *
 * The child's own run, step by step, in the four-line shape the rest of
 * CodeBops uses: I saw / I checked / I chose / this happened. Scrubbing
 * moves through the recorded events; it never re-runs anything, because
 * every event already carries the state before and after it.
 *
 * Nothing here is a failure screen. There is no "game over", no lost work
 * and no red cross — the app is intact behind the panel, and the only
 * buttons out are Change something and Try it again.
 */
import { el } from '../dom';
import { sharedSfx } from '../../audio/sfx';
import { ThinkTrailPanel } from '../gearworks/statePanel';
import type { ThinkTrailStep } from '../gearworks/statePanel';
import type { MiniAppProject } from '../../creator/miniAppProject';
import type { MiniAppExecutionEvent } from '../../creator/miniAppRuntime';
import { describeCommand, describeTrigger } from '../../creator/miniAppChoices';
import { approvedAsset } from '../../data/app-lab/approvedAssets';

export interface DebugModeEvents {
  readonly onEdit: () => void;
  readonly onRunAgain: () => void;
}

/** One event, told as the four lines a child can follow. */
export interface TrailLine {
  readonly step: number;
  readonly saw: string;
  readonly checked?: string;
  readonly chose: string;
  readonly happened: string;
  readonly verdict: 'ok' | 'no';
}

/**
 * Turn a run into readable lines. Pure, so the wording is testable without
 * a browser and Code Peek can borrow the same descriptions.
 */
export function trailLines(
  project: MiniAppProject, events: readonly MiniAppExecutionEvent[],
): TrailLine[] {
  const nameOf = (id: string): string => {
    const c = project.scenes.flatMap((s) => s.components).find((x) => x.id === id);
    return c ? (approvedAsset(c.assetId)?.label ?? id) : 'something';
  };
  return events.map((event) => {
    const script = project.scripts.find((s) => s.id === event.scriptId);
    const saw = script ? describeTrigger(project, script.trigger) : 'Something happened';
    const chose = describeCommand(project, event.command);

    // Which way a question went comes from the run itself. An If-Else
    // always succeeds, so reading it off the outcome would say "yes" every
    // time the else branch ran.
    const checked = event.branchTaken
      ? (event.branchTaken === 'yes' ? 'The answer was yes.' : 'The answer was no.')
      : undefined;

    let happened: string;
    switch (event.outcome.kind) {
      case 'done':
        happened = event.branchTaken === 'no'
          ? 'So it did the other thing instead.'
          : event.branchTaken === 'yes'
            ? 'So it carried on inside.'
            : describeChange(project, event, nameOf);
        break;
      case 'noChange': happened = `Nothing changed — ${event.outcome.why}.`; break;
      case 'unsupported': happened = `That step ${event.outcome.why}.`; break;
    }
    return {
      step: event.step,
      saw,
      ...(checked ? { checked } : {}),
      chose,
      happened,
      verdict: event.outcome.kind === 'done' ? 'ok' : 'no',
    };
  });
}

/** What actually moved between two snapshots, in words. */
function describeChange(
  project: MiniAppProject, event: MiniAppExecutionEvent, nameOf: (id: string) => string,
): string {
  const a = event.stateBefore;
  const b = event.stateAfter;

  for (const [id, after] of Object.entries(b.components)) {
    const before = a.components[id];
    if (!before) continue;
    if (before.state !== after.state) return `${nameOf(id)} became ${after.state}.`;
    if (before.visible !== after.visible) return `${nameOf(id)} ${after.visible ? 'appeared' : 'disappeared'}.`;
    if (before.lit !== after.lit) return `${nameOf(id)}'s light went ${after.lit ? 'on' : 'off'}.`;
    if (before.slotId !== after.slotId) return `${nameOf(id)} moved.`;
    if (before.saying !== after.saying && after.saying) return `${nameOf(id)} spoke.`;
    if (before.color !== after.color && after.color) return `${nameOf(id)} turned ${after.color}.`;
  }
  for (const [id, after] of Object.entries(b.variables)) {
    const before = a.variables[id];
    if (before !== after) {
      const label = project.variables.find((v) => v.id === id)?.accessibilityLabel ?? 'the number';
      return `${label} changed from ${String(before)} to ${String(after)}.`;
    }
  }
  if (!a.won && b.won) return 'The app showed YOU WIN.';
  if (a.sceneId !== b.sceneId) return 'The story moved to the next scene.';
  if (event.sound) return 'A sound played.';
  return 'It did that step.';
}

export class AppDebugMode {
  readonly root: HTMLElement;
  private trail!: ThinkTrailPanel;
  private lines: TrailLine[] = [];
  private at = 0;
  private chips: HTMLElement[] = [];

  constructor(
    parent: HTMLElement,
    project: MiniAppProject,
    events: readonly MiniAppExecutionEvent[],
    private readonly callbacks: DebugModeEvents,
  ) {
    this.root = el('div', 'dbg-wrap', parent);
    // The lines are all this panel needs: every event already carries the
    // state before and after it, so scrubbing never re-runs the app.
    this.lines = trailLines(project, events);
    this.build();
  }

  private build(): void {
    const head = el('div', 'dbg-head', this.root);
    el('span', 'dbg-glyph', head, '🔍');
    const titles = el('div', 'dbg-titles', head);
    el('h2', undefined, titles, 'What happened');
    el('p', undefined, titles, this.lines.length === 0
      ? 'Nothing ran that time — so there is nothing to look at yet.'
      : `Your app did ${this.lines.length} thing${this.lines.length === 1 ? '' : 's'}. Tap a step to see it.`);

    if (this.lines.length > 0) {
      // Scrub strip — one chip per step, exactly like Glitch Replay.
      const strip = el('div', 'dbg-strip', this.root);
      strip.setAttribute('role', 'group');
      strip.setAttribute('aria-label', 'Steps your app took');
      this.chips = this.lines.map((line, i) => {
        const chip = el('button', 'dbg-chip', strip) as HTMLButtonElement;
        chip.type = 'button';
        chip.setAttribute('aria-label', `Step ${line.step}: ${line.chose}`);
        el('span', 'dbg-chip-num', chip, String(line.step));
        el('span', 'dbg-chip-mark', chip, line.verdict === 'ok' ? '✓' : '•');
        chip.addEventListener('click', () => { sharedSfx.play('tap'); this.show(i); });
        return chip;
      });

      const detail = el('div', 'dbg-detail', this.root);
      detail.id = 'dbg-detail';

      const nav = el('div', 'dbg-nav', this.root);
      const back = el('button', 'mini-btn', nav, '← Step back') as HTMLButtonElement;
      back.type = 'button';
      back.addEventListener('click', () => { sharedSfx.play('tap'); this.show(this.at - 1); });
      const fwd = el('button', 'mini-btn', nav, 'Step on →') as HTMLButtonElement;
      fwd.type = 'button';
      fwd.addEventListener('click', () => { sharedSfx.play('tap'); this.show(this.at + 1); });
    }

    // The full trail, always visible, in the panel the rest of the app uses.
    this.trail = new ThinkTrailPanel(this.root);
    this.trail.setSteps(this.toTrailSteps(), this.lines.length === 0
      ? 'Try teaching something a step, then run it again.'
      : 'Nothing here is broken — this is just what your app did.');

    const actions = el('div', 'dbg-actions', this.root);
    const edit = el('button', 'mini-btn purple', actions, '← Change something') as HTMLButtonElement;
    edit.type = 'button';
    edit.addEventListener('click', () => { sharedSfx.play('tap'); this.callbacks.onEdit(); });
    const again = el('button', 'btn-play small', actions, 'Try it again ▶') as HTMLButtonElement;
    again.type = 'button';
    again.addEventListener('click', () => { sharedSfx.play('bop'); this.callbacks.onRunAgain(); });

    if (this.lines.length > 0) this.show(0);
  }

  private toTrailSteps(): ThinkTrailStep[] {
    return this.lines.map((l) => ({
      n: l.step,
      icon: l.verdict === 'ok' ? '✅' : '🔍',
      text: `${l.chose} — ${l.happened}`,
      verdict: l.verdict,
    }));
  }

  /** Move the scrubber. Reads recorded state; never re-runs the app. */
  private show(index: number): void {
    if (this.lines.length === 0) return;
    this.at = Math.max(0, Math.min(this.lines.length - 1, index));
    this.chips.forEach((c, i) => c.classList.toggle('on', i === this.at));
    const line = this.lines[this.at];
    const detail = this.root.querySelector('#dbg-detail');
    if (!detail) return;
    detail.innerHTML = '';
    const box = detail as HTMLElement;
    const row = (label: string, text: string, cls: string): void => {
      const r = el('div', `dbg-line ${cls}`, box);
      el('span', 'dbg-line-label', r, label);
      el('span', 'dbg-line-text', r, text);
    };
    row('I SAW', line.saw, 'saw');
    if (line.checked) row('I CHECKED', line.checked, 'checked');
    row('I CHOSE', line.chose, 'chose');
    row('THIS HAPPENED', line.happened, `happened ${line.verdict}`);
  }

  dispose(): void {
    this.trail?.dispose();
    this.root.remove();
  }
}
