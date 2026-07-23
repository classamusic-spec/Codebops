/**
 * Bop Garden — the reward meta-game. Every earned star plants a flower;
 * every Daily Bop plants a golden one. Pure joy, zero pressure.
 */
import { el } from '../ui/dom';
import { SaveStore } from '../storage/saveStore';
import { inlineSvgInto, startMascotLife } from '../rendering/spriteCharacter';
import { Sfx } from '../audio/sfx';

const FLOWERS = ['🌸', '🌼', '🌷', '🌻', '🌹', '💐', '🪻', '🌺'];

/** Deterministic pseudo-random (mulberry32) so the garden is stable. */
function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export class GardenScreen {
  private stops: Array<() => void> = [];
  private readonly sfx = new Sfx();

  constructor(
    private readonly root: HTMLElement,
    private readonly store: SaveStore,
    private readonly events: { onBack: () => void },
  ) {}

  enter(): void {
    const screen = this.root;
    screen.classList.add('garden-screen');

    // Sky + hill
    el('div', 'garden-sky', screen);
    el('div', 'garden-hill', screen);

    // Header
    const header = el('div', 'garden-header', screen);
    const back = el('button', 'circle-btn', header, '←');
    back.type = 'button';
    back.setAttribute('aria-label', 'Back');
    back.addEventListener('click', () => this.events.onBack());
    el('h1', undefined, header, 'Bop Garden');
    const totalStars = Object.values(this.store.stars).reduce((a, b) => a + b, 0);
    const golden = this.store.daily.totalCompleted;
    el('div', 'garden-count', header, `🌼 ${totalStars + golden} flowers`);

    // Mascots enjoying the garden
    const zipBox = el('div', 'garden-mascot zip', screen);
    void inlineSvgInto(zipBox, './art/characters/zip/zip.svg').then((svg) => {
      if (svg) this.stops.push(startMascotLife(svg));
    });
    const mixyBox = el('div', 'garden-mascot mixy', screen);
    void inlineSvgInto(mixyBox, './art/characters/mixy/mixy.svg').then((svg) => {
      if (svg) this.stops.push(startMascotLife(svg));
    });

    // Flower field — deterministic positions, swaying gently
    const field = el('div', 'garden-field', screen);
    const total = Math.min(totalStars + golden, 64);
    if (total === 0) {
      el('div', 'garden-empty', field, 'Earn stars to plant your first flower! 🌱');
    }
    const rand = rng(42);
    for (let i = 0; i < total; i++) {
      const isGolden = i >= totalStars; // daily flowers are golden
      const f = el('button', `garden-flower${isGolden ? ' golden' : ''}`, field,
        isGolden ? '🌻' : FLOWERS[Math.floor(rand() * FLOWERS.length)]) as HTMLButtonElement;
      f.type = 'button';
      f.setAttribute('aria-label', isGolden ? 'Golden daily flower' : 'Star flower');
      f.style.left = `${4 + rand() * 92}%`;
      // Keep flowers on the hill (lower half of the field)
      f.style.top = `${46 + rand() * 48}%`;
      f.style.fontSize = `${26 + rand() * 22}px`;
      f.style.animationDelay = `${rand() * 2.4}s`;
      f.addEventListener('click', () => {
        this.sfx.play('grab');
        f.classList.remove('pop');
        void f.offsetWidth; // restart the pop animation
        f.classList.add('pop');
      });
    }

    el('div', 'garden-note', screen, totalStars > 0
      ? `⭐ ${totalStars} star flowers  ·  🌻 ${golden} daily flowers`
      : 'Play levels to grow your garden!');
  }

  dispose(): void {
    this.stops.forEach((s) => s());
    this.stops = [];
  }
}
