/**
 * BopLens (§19) — I SAW → I REMEMBERED → I CHOSE → THIS HAPPENED.
 *
 * The name existed before this file did, attached to something else: a
 * tool that sparkled the tiles a rule could see. Useful, but it showed
 * WHERE, never WHY, and §19 asks for why.
 *
 * Two rules the markup has to keep:
 *  - §4: essential reasoning must not hide inside an animation. Every
 *    line is text, present in the DOM, readable with the run long over.
 *  - §30: a child must not need to read to understand core behaviour.
 *    Each line carries an icon, and the confidence face is a face.
 */
import { el } from '../dom';
import { button, ICON_CLEAR } from '../components/button';
import type { AgentDecisionTrace } from '../../agents/types';
import type { TokenNames } from '../../agents/trace';
import { toLensCard } from '../../agents/trace';

const LINE_ICON = {
  iSaw: '👀', iRemembered: '💎', iChose: '📜', thisHappened: '✨',
} as const;

const LINE_LABEL = {
  iSaw: 'I saw', iRemembered: 'I remembered', iChose: 'I chose', thisHappened: 'This happened',
} as const;

export class BopLensPanel {
  readonly root: HTMLElement;
  private readonly list: HTMLElement;
  private readonly empty: HTMLElement;
  private names: TokenNames = {};

  constructor(parent: HTMLElement) {
    this.root = el('aside', 'lens-panel', parent);
    this.root.hidden = true;
    this.root.setAttribute('role', 'dialog');
    this.root.setAttribute('aria-label', 'Why my helper did that');

    const head = el('div', 'lens-head', this.root);
    el('h2', 'lens-title', head, '🔍 Why?');
    button(head, {
      icon: ICON_CLEAR, label: 'Close', variant: 'nav', shape: 'circle', size: 'sm',
      onClick: () => this.close(),
    });

    this.list = el('div', 'lens-list', this.root);
    this.empty = el('p', 'lens-empty', this.root,
      'Run your helper, then come back to see why it chose what it chose.');
  }

  setNames(names: TokenNames): void {
    this.names = names;
  }

  show(trace: readonly AgentDecisionTrace[]): void {
    this.list.replaceChildren();
    this.empty.hidden = trace.length > 0;

    for (const t of trace) {
      const card = toLensCard(t, this.names);
      const box = el('article', 'lens-card', this.list);

      const top = el('div', 'lens-card-top', box);
      el('span', 'lens-step', top, `${card.step}`);
      const face = el('span', 'lens-face', top, card.confidenceFace);
      // The face is decorative; the word next to it is what carries the
      // meaning for a screen reader and for anyone who cannot read it.
      face.setAttribute('aria-hidden', 'true');
      el('span', `lens-conf conf-${card.confidence}`, top, card.confidenceLabel);

      for (const key of ['iSaw', 'iRemembered', 'iChose', 'thisHappened'] as const) {
        const row = el('div', 'lens-row', box);
        const icon = el('span', 'lens-ico', row, LINE_ICON[key]);
        icon.setAttribute('aria-hidden', 'true');
        el('span', 'lens-label', row, LINE_LABEL[key]);
        el('span', 'lens-text', row, card[key]);
      }

      if (card.details.length > 0) {
        const more = el('details', 'lens-more', box);
        el('summary', undefined, more, 'More');
        for (const d of card.details) {
          const row = el('div', 'lens-detail', more);
          el('span', 'lens-detail-label', row, d.label);
          el('span', 'lens-detail-value', row, d.value);
        }
      }
    }

    this.root.hidden = false;
    this.root.focus?.();
  }

  close(): void {
    this.root.hidden = true;
  }

  get isOpen(): boolean {
    return !this.root.hidden;
  }
}
