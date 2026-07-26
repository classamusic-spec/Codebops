/** Top bar: back · logo · hint · star progress · settings. */
import { el } from './dom';

export interface TopBarEvents {
  onBack: () => void;
  onSettings: () => void;
  /**
   * Open the hint card. Every play screen passes this; menus do not, and
   * the button is simply absent there rather than present and dead.
   */
  onHint?: () => void;
}

export class TopBar {
  readonly root: HTMLElement;
  private starNodes: HTMLElement[] = [];

  constructor(parent: HTMLElement, title: string, events: TopBarEvents) {
    this.root = el('header', 'top-bar', parent);

    const back = el('button', 'circle-btn', this.root, '←');
    back.setAttribute('aria-label', 'Back to title');
    back.addEventListener('click', events.onBack);

    const mark = el('img', 'logo-chip-img', this.root) as HTMLImageElement;
    mark.src = './art/logo.svg';
    mark.alt = 'CodeBops';

    // The level's name used to ride in a pill across the middle of the bar.
    // A child who just tapped a level knows which level they tapped, and
    // the pill was the widest thing on the screen that nobody reads —
    // sitting over the board and taking the top off the world. The name
    // still reaches a screen reader through the bar's own label.
    this.root.setAttribute('aria-label', title);

    el('div', 'top-bar-spacer', this.root);

    // The one button a stuck child needs, in the same place on every
    // level. It sits before the stars rather than out at the edge: a
    // child looking for help looks at the middle of the bar, and the two
    // corners are already spoken for by Back and Settings.
    if (events.onHint) {
      const hint = el('button', 'circle-btn hint-btn', this.root, '?');
      hint.setAttribute('aria-label', 'Stuck? Get a hint');
      hint.addEventListener('click', events.onHint);
    }

    const stars = el('div', 'stars-pill', this.root);
    stars.setAttribute('aria-label', 'Stars earned');
    for (let i = 0; i < 3; i++) {
      const s = el('span', 'star', stars, '★');
      this.starNodes.push(s);
    }

    const gear = el('button', 'circle-btn blue', this.root, '⚙️');
    gear.setAttribute('aria-label', 'Settings');
    gear.addEventListener('click', events.onSettings);
  }

  setStars(count: number): void {
    this.starNodes.forEach((s, i) => s.classList.toggle('earned', i < count));
  }
}
