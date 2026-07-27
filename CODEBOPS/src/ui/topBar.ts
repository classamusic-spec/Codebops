/** Top bar: back · logo · hint · star progress · settings. */
import { el } from './dom';
import { backButton, settingsButton, hintButton, ICON_STAR } from './components/button';

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

    backButton(this.root, events.onBack, 'Back to the map');

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
    if (events.onHint) hintButton(this.root, events.onHint);

    // Stars carry their state in SHAPE as well as colour — an unearned
    // star is a hollow outline, an earned one is solid — so the progress
    // survives a colour-blind eye and a greyscale screenshot alike.
    const stars = el('div', 'stars-pill cb-stars', this.root);
    stars.setAttribute('role', 'img');
    for (let i = 0; i < 3; i++) {
      const s = el('span', 'cb-star', stars);
      s.innerHTML = ICON_STAR;
      this.starNodes.push(s);
    }
    this.setStars(0);

    settingsButton(this.root, events.onSettings);
  }

  setStars(count: number): void {
    this.starNodes.forEach((s, i) => s.classList.toggle('earned', i < count));
    this.starNodes[0]?.parentElement?.setAttribute(
      'aria-label', `${count} of 3 stars earned`,
    );
  }
}
