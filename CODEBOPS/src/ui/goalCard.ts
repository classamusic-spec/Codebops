/**
 * The goal card.
 *
 * It opens full so a child (or the grown-up reading to them) gets the
 * sentence, then folds down to a token — item, arrow, destination — once
 * it has been read. Tapping it opens it again.
 *
 * The folding is not decoration. The card is the widest fixed thing on
 * the play screen, and the camera frames the board into whatever space
 * the chrome leaves: on a landscape tablet the open card was claiming
 * about a fifth of the width for a sentence nobody re-reads after the
 * first few seconds. Folded, that width goes back to the toy.
 *
 * It never folds on its own while a child might still be reading — the
 * timer only starts once, and any tap re-opens it for as long as they
 * want.
 */
import { el } from './dom';

/** How long the sentence stays up before the card folds itself away. */
const READ_MS = 7000;

export class GoalCard {
  readonly root: HTMLElement;
  private timer = 0;
  private open = true;
  private readonly openLabel: string;
  /** Told whenever the card's size changes, so the camera can re-frame. */
  private readonly onResize?: () => void;

  constructor(parent: HTMLElement, goalText: string, itemEmoji: string, onResize?: () => void) {
    this.openLabel = `Goal: ${goalText}`;
    this.onResize = onResize;
    this.root = el('aside', 'goal-card', parent);
    this.root.setAttribute('aria-label', `Goal: ${goalText}`);
    el('div', 'goal-flag', this.root, 'GOAL');
    const visual = el('div', 'goal-visual', this.root);
    el('span', undefined, visual, itemEmoji);
    el('span', 'arrow', visual, '➜');
    const zipImg = el('img', undefined, visual) as HTMLImageElement;
    zipImg.src = './art/characters/zip/zip.svg';
    zipImg.alt = 'Zip';
    el('p', 'goal-text', this.root, goalText);

    // The whole card is the control. A separate little chevron would be
    // one more thing to find and a smaller thing to hit than the card.
    this.root.setAttribute('role', 'button');
    this.root.tabIndex = 0;
    this.root.setAttribute('aria-expanded', 'true');
    this.root.addEventListener('click', () => this.toggle());
    this.root.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); this.toggle(); }
    });

    this.timer = window.setTimeout(() => this.setOpen(false), READ_MS);
  }

  private toggle(): void {
    window.clearTimeout(this.timer);
    this.setOpen(!this.open);
  }

  private setOpen(open: boolean): void {
    this.open = open;
    this.root.classList.toggle('folded', !open);
    this.root.setAttribute('aria-expanded', String(open));
    // Read the label back off the element and the goal text is lost the
    // first time it folds, because by then the element holds the folded
    // label instead.
    this.root.setAttribute('aria-label', open ? this.openLabel : 'Show the goal again');
    // The board is framed into whatever space the chrome leaves, and the
    // chrome just changed size. Without this the width the card gave up
    // stays empty until something else triggers a resize.
    this.onResize?.();
  }

  dispose(): void {
    window.clearTimeout(this.timer);
  }
}
