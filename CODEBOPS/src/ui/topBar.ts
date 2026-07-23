/** Top bar: back · logo · level title pill · star progress · settings. */
import { el } from './dom';

export interface TopBarEvents {
  onBack: () => void;
  onSettings: () => void;
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

    el('div', 'top-bar-spacer', this.root);

    const pill = el('div', 'title-pill', this.root);
    el('span', 'dot', pill);
    // Split "World X: Name · Level" so small screens can drop the prefix.
    const sep = title.indexOf(' · ');
    if (sep > 0) {
      el('span', 't-world', pill, `${title.slice(0, sep)} · `);
      el('span', 't-text', pill, title.slice(sep + 3));
    } else {
      el('span', 't-text', pill, title);
    }

    el('div', 'top-bar-spacer', this.root);

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
