/**
 * Think Trail — "see what happened, one step at a time".
 *
 * It used to be an always-open cream panel pinned to a corner, with a
 * status line and a small chevron. Three things were wrong with that:
 * it occupied prime screen space before it had anything to say, it read
 * as a status readout rather than something you could open, and the
 * decision to collapse was taken once from `window.innerWidth` at
 * construction and never revisited — so rotating a tablet, which this
 * app actively encourages, left it in the wrong state.
 *
 * Now it is a BUTTON that opens a panel. The button carries a dot when a
 * fresh trace is waiting, which is the only nudge a child gets; nothing
 * opens over the world uninvited.
 */
import { el } from '../dom';
import { button, ICON_TRAIL, ICON_CLEAR } from '../components/button';

export interface ThinkTrailStep {
  readonly n: number;
  readonly icon: string;
  readonly text: string;
  readonly verdict?: 'ok' | 'no';
}

export class ThinkTrailPanel {
  /** The entry control. Screens position this; the panel positions itself. */
  readonly root: HTMLElement;
  private readonly toggle: HTMLButtonElement;
  private readonly dot: HTMLElement;
  private readonly panel: HTMLElement;
  private readonly list: HTMLElement;
  private readonly hint: HTMLElement;
  private readonly machineLine: HTMLElement;
  private open = false;

  constructor(parent: HTMLElement) {
    this.root = el('div', 'gw-trail-wrap', parent);

    this.toggle = button(this.root, {
      icon: ICON_TRAIL,
      text: 'Think Trail',
      label: 'Think Trail — see what happened, one step at a time',
      variant: 'revise',
      size: 'sm',
      className: 'gw-trail-open',
      onClick: () => this.setOpen(!this.open),
    });
    // A quiet mark that there is something new to look at. Not a number,
    // not a badge that counts — a child is not managing a queue.
    this.dot = el('span', 'gw-trail-dot', this.toggle);
    this.dot.setAttribute('aria-hidden', 'true');
    this.dot.hidden = true;

    this.panel = el('aside', 'gw-trail', this.root);
    this.panel.setAttribute('aria-label', 'Think Trail — what happened, step by step');
    this.panel.hidden = true;

    const head = el('div', 'gw-trail-head', this.panel);
    el('span', 'gw-trail-title', head, 'THINK TRAIL');
    button(head, {
      icon: ICON_CLEAR, label: 'Close the Think Trail',
      variant: 'nav', shape: 'circle', size: 'sm',
      className: 'gw-trail-close', onClick: () => this.setOpen(false),
    });

    this.machineLine = el('div', 'gw-machine-line', this.panel);
    this.machineLine.hidden = true;
    this.list = el('div', 'gw-trail-list', this.panel);
    this.hint = el('div', 'gw-trail-hint', this.panel);
    this.setEmpty();
  }

  private setOpen(open: boolean): void {
    this.open = open;
    this.panel.hidden = !open;
    this.toggle.setAttribute('aria-expanded', String(open));
    this.root.classList.toggle('open', open);
    if (open) this.dot.hidden = true;
  }

  /** Live machine-state readout, e.g. "Motor: ON, turning, Fast". */
  setMachineLine(text: string): void {
    this.machineLine.textContent = text;
    this.machineLine.hidden = false;
  }

  setEmpty(): void {
    this.list.innerHTML = '';
    const empty = el('div', 'gw-trail-empty', this.list);
    const mark = el('span', 'gw-trail-empty-icon', empty);
    mark.innerHTML = ICON_TRAIL;
    mark.setAttribute('aria-hidden', 'true');
    el('span', undefined, empty, 'When you press BOP!, every step shows up here.');
    this.hint.textContent = '';
    this.hint.hidden = true;
    this.dot.hidden = true;
  }

  setSteps(steps: readonly ThinkTrailStep[], hint?: string): void {
    this.list.innerHTML = '';
    for (const step of steps) {
      const row = el('div', 'gw-trail-step', this.list);
      el('span', 'gw-ts-num', row, String(step.n));
      el('span', 'gw-ts-icon', row, step.icon);
      el('span', 'gw-ts-text', row, step.text);
      if (step.verdict) el('span', `gw-ts-verdict ${step.verdict}`, row, step.verdict === 'ok' ? '✓' : '✗');
    }
    this.hint.textContent = hint ?? '';
    this.hint.hidden = !hint;
    // Something new to look at — but only say so if they are not already
    // looking at it.
    if (steps.length > 0 && !this.open) this.dot.hidden = false;
  }

  dispose(): void {
    this.root.remove();
  }
}
