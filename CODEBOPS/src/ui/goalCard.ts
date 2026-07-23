/** Cream goal card (reference left panel). */
import { el } from './dom';

export class GoalCard {
  readonly root: HTMLElement;

  constructor(parent: HTMLElement, goalText: string, itemEmoji: string) {
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
  }
}
