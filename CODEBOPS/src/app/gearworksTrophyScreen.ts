/**
 * Inventor's Trophy Room — Phase 19. A celebratory recap of the whole
 * Gearworks journey: one badge per concept the child learned, lit as they
 * collect stars and stamped MASTERED at 3 stars across all its levels. A
 * total-stars ring tracks the garage; mastering every concept unlocks the
 * Inventor's Diploma. Pure reward — no pressure, always reachable.
 */
import { el } from '../ui/dom';
import { SaveStore } from '../storage/saveStore';
import { sharedSfx } from '../audio/sfx';
import { mountMascot } from '../rendering/mascotRig';
import { spawnConfetti } from '../ui/dialogs';
import { GEARWORKS_CONCEPTS, conceptProgress, garageTotals } from '../data/gearworks/progress';

export class GearworksTrophyScreen {
  private stops: Array<() => void> = [];
  private timers: number[] = [];
  /** The mascot SVG loads async — if we're gone by then, don't start it. */

  constructor(
    private readonly root: HTMLElement,
    private readonly store: SaveStore,
    private readonly events: { onBack: () => void },
  ) {}

  enter(): void {
    const screen = this.root;
    screen.classList.add('gw-trophy-screen');
    const stars = this.store.stars;
    const totals = garageTotals(stars);

    // --- header ---
    const header = el('div', 'gw-tr-header', screen);
    const back = el('button', 'circle-btn', header, '←');
    back.type = 'button';
    back.setAttribute('aria-label', 'Back to levels');
    back.addEventListener('click', () => { sharedSfx.play('tap'); this.events.onBack(); });
    const titles = el('div', 'gw-tr-titles', header);
    el('h1', undefined, titles, '🏆 Inventor\'s Trophies');
    el('p', undefined, titles, `You've learned ${totals.conceptsStarted} of ${totals.conceptsTotal} big ideas!`);

    // --- progress ring ---
    const ring = el('div', 'gw-tr-ring', header);
    const pct = totals.total > 0 ? Math.round((totals.earned / totals.total) * 100) : 0;
    ring.style.setProperty('--pct', String(pct));
    const ringInner = el('div', 'gw-tr-ring-in', ring);
    el('span', 'gw-tr-ring-star', ringInner, '★');
    el('span', 'gw-tr-ring-num', ringInner, `${totals.earned}`);
    el('span', 'gw-tr-ring-of', ringInner, `/ ${totals.total}`);

    // --- diploma banner (mastered everything) ---
    if (totals.allComplete) {
      const dip = el('div', 'gw-tr-diploma', screen);
      const mascot = el('div', 'gw-tr-dip-mascot', dip);
      // Zip celebrates on the diploma. The handle's own destroy() covers
      // navigating away mid-load, so there is nothing to guard here.
      const zip = mountMascot(mascot, 'zip', {
        calm: this.store.settings.calmMode, start: 'happy',
      });
      this.stops.push(() => zip.destroy());
      const dtext = el('div', 'gw-tr-dip-text', dip);
      el('div', 'gw-tr-dip-kicker', dtext, 'GEARWORKS GARAGE');
      el('div', 'gw-tr-dip-title', dtext, 'Master Inventor Diploma');
      el('div', 'gw-tr-dip-sub', dtext, 'Every machine mastered — you can code! 🎉');
      this.timers.push(window.setTimeout(() => spawnConfetti(screen), 300));
      sharedSfx.play('celebrate');
    } else {
      const nudge = el('div', 'gw-tr-nudge', screen);
      el('span', undefined, nudge, `⭐ Master every idea (3 stars each) to earn the Inventor's Diploma — ${totals.conceptsComplete}/${totals.conceptsTotal} so far!`);
    }

    // --- badge gallery ---
    const grid = el('div', 'gw-tr-grid', screen);
    GEARWORKS_CONCEPTS.forEach((concept, i) => {
      const p = conceptProgress(concept, stars);
      const state = p.complete ? 'mastered' : p.started ? 'started' : 'locked';
      const card = el('div', `gw-tr-badge ${state}`, grid);
      card.style.setProperty('--i', String(i));
      const medal = el('div', 'gw-tr-medal', card);
      el('span', 'gw-tr-emoji', medal, concept.emoji);
      if (p.complete) el('span', 'gw-tr-crown', medal, '👑');
      el('div', 'gw-tr-name', card, concept.title);
      el('div', 'gw-tr-blurb', card, concept.blurb);
      const pips = el('div', 'gw-tr-pips', card);
      for (let s = 0; s < p.total; s++) el('span', s < p.earned ? 'on' : '', pips, '★');
      if (p.complete) el('div', 'gw-tr-stamp', card, 'MASTERED');
    });
  }

  dispose(): void {
    this.timers.forEach((t) => window.clearTimeout(t));
    this.timers = [];
    this.stops.forEach((s) => s());
    this.stops = [];
    this.root.classList.remove('gw-trophy-screen');
    this.root.innerHTML = '';
  }
}
