/**
 * Pick a Level — one world at a time.
 *
 * The old screen stacked all eight worlds into one page, which on a phone
 * meant seventy-nine identical rows and a scrollbar that never ended. A
 * four-year-old cannot hold that in their head, and it does not read as a
 * place — it reads as a list.
 *
 * So: a strip of world medallions across the top, and below it exactly ONE
 * island, filling the screen, with its levels as big round stepping
 * stones. Every world is two taps away and nothing scrolls forever.
 *
 * Two things carry the "where am I" job that the endless scroll used to do
 * badly:
 *  - the island opens on the world holding the next thing to play, not on
 *    world one;
 *  - one bubble is marked as next, with Zip standing beside it.
 *
 * Locked stones still respond. They wiggle and say what opens them, which
 * is the difference between a closed door and a wall.
 */
import { el } from '../ui/dom';
import { sharedSfx } from '../audio/sfx';
import { mountMascot } from '../rendering/mascotRig';
import type { SaveStore } from '../storage/saveStore';
import type { LevelDef } from '../data/schemas/level';
import { ALL_LEVELS } from '../data/levels';
import { loadCustomLevels } from '../storage/customLevels';
import {
  GEARWORKS_SEQUENCE, GEARWORKS_WORKSHOPS, gwEntryId,
} from '../data/gearworks/world';
import { garageTotals } from '../data/gearworks/progress';
import { APP_LAB_WORLD } from '../data/app-lab/appLabDefinition';
import { announce } from '../ui/a11y';

export const WORLD_META: Record<string, { emoji: string; name: string; theme: string }> = {
  'sparkle-meadow': { emoji: '🌼', name: 'Sparkle Meadow', theme: 'meadow' },
  'bubble-bay': { emoji: '🐚', name: 'Bubble Bay', theme: 'bay' },
  'pattern-forest': { emoji: '🌸', name: 'Pattern Forest', theme: 'forest' },
  'robot-town': { emoji: '🤖', name: 'Robot Town', theme: 'town' },
  'agent-academy': { emoji: '🎓', name: 'Agent Academy', theme: 'academy' },
};
export const WORLD_ORDER = [
  'sparkle-meadow', 'bubble-bay', 'pattern-forest', 'robot-town', 'agent-academy',
];

/** Little decorations per theme. Purely scenery — always aria-hidden. */
const THEME_DECOR: Record<string, readonly string[]> = {
  meadow: ['🌸', '🌼', '🦋', '🌿'],
  bay: ['🫧', '🐚', '🌊', '🐠'],
  forest: ['🍄', '🌲', '🌸', '🍃'],
  town: ['🔧', '🤖', '📦', '⚡'],
  academy: ['📘', '🎓', '✨', '🧠'],
  garage: ['⚙️', '🔩', '🛠️', '💡'],
  applab: ['🧪', '✨', '🛠️', '💡'],
  island: ['🏝️', '🌴', '⭐', '🐚'],
};

type StoneState = 'done' | 'open' | 'next' | 'locked' | 'soon';

interface TrailStone {
  readonly key: string;
  readonly label: string;
  readonly emoji: string;
  /** What sits in the badge: a number, a star, a trophy. */
  readonly badge: string;
  readonly stars: number;
  readonly showStars: boolean;
  readonly state: StoneState;
  /** Said when a locked stone is tapped — never a scolding. */
  readonly lockedHint?: string;
  readonly onPlay?: () => void;
  /** Shown under the name instead of stars, for the App Lab. */
  readonly note?: string;
  /** An extra ✕ affordance, for a level the child built themselves. */
  readonly onRemove?: () => void;
}

interface TrailWorld {
  readonly id: string;
  readonly name: string;
  readonly emoji: string;
  readonly theme: string;
  readonly unlocked: boolean;
  readonly stones: readonly TrailStone[];
  readonly starsEarned: number;
  /** One line under the island's name. */
  readonly tagline: string;
  readonly isNew?: boolean;
  readonly lockedHint?: string;
}

export interface LevelSelectEvents {
  readonly onBack: () => void;
  readonly onPlayLevel: (index: number) => void;
  readonly onPlayDaily: (index: number) => void;
  readonly onPlayGearworks: (seqIndex: number) => void;
  readonly onGearworksTrophy: () => void;
  readonly onAppLab: () => void;
  readonly onGarden: () => void;
  readonly onEditor: () => void;
  readonly onCustom: (level: LevelDef) => void;
  readonly onDeleteCustom: (id: string) => void;
}

/**
 * Which island the child was last looking at. Kept for the session so
 * coming back from a level lands where they were, not at the beginning.
 */
let lastWorldId: string | null = null;

export class LevelSelectScreen {
  private worlds: TrailWorld[] = [];
  private worldId = '';
  private strip!: HTMLElement;
  private island!: HTMLElement;
  private disposed = false;
  private mascotStops: Array<() => void> = [];

  constructor(
    private readonly root: HTMLElement,
    private readonly store: SaveStore,
    private readonly events: LevelSelectEvents,
    private readonly daily: { index: number; level: LevelDef; doneToday: boolean },
  ) {}

  enter(): void {
    this.root.classList.add('sel2-screen');
    this.worlds = this.buildWorlds();
    // Open on the world holding the next thing to play, so a child who has
    // finished Bubble Bay does not have to find their way back to it.
    const suggested = this.worlds.find((w) => w.unlocked && w.stones.some((s) => s.state === 'next'))
      ?? this.worlds.find((w) => w.unlocked)
      ?? this.worlds[0];
    const remembered = this.worlds.find((w) => w.id === lastWorldId && w.unlocked);
    this.worldId = (remembered ?? suggested).id;

    this.buildHeader();
    this.buildDaily();
    // A wrapper so the "there is more this way" fade can sit still while
    // the strip inside it scrolls.
    const stripWrap = el('div', 'sel2-strip-wrap', this.root);
    this.strip = el('div', 'sel2-strip', stripWrap);
    this.strip.setAttribute('role', 'tablist');
    this.strip.setAttribute('aria-label', 'Places to play');
    const syncFades = (): void => {
      const more = this.strip.scrollWidth - this.strip.clientWidth;
      stripWrap.classList.toggle('more-right', this.strip.scrollLeft < more - 2);
      stripWrap.classList.toggle('more-left', this.strip.scrollLeft > 2);
    };
    this.strip.addEventListener('scroll', syncFades);
    window.setTimeout(syncFades, 0);
    this.island = el('div', 'sel2-island', this.root);
    this.renderStrip();
    this.renderIsland();
  }

  // ---------------- header ----------------

  private buildHeader(): void {
    const head = el('div', 'sel2-head', this.root);
    const back = el('button', 'circle-btn', head, '←') as HTMLButtonElement;
    back.type = 'button';
    back.setAttribute('aria-label', 'Back to title');
    back.addEventListener('click', () => { sharedSfx.play('tap'); this.events.onBack(); });

    el('h1', 'sel2-title', head, 'Where to?');

    const pills = el('div', 'sel2-pills', head);
    const totalStars = Object.values(this.store.stars).reduce((a, b) => a + b, 0);
    const stars = el('div', 'stars-pill', pills);
    stars.setAttribute('aria-label', `${totalStars} stars earned`);
    el('span', 'star earned', stars, '★');
    el('span', undefined, stars, ` ${totalStars}`);

    const garden = el('button', 'stars-pill garden-pill', pills) as HTMLButtonElement;
    garden.type = 'button';
    garden.setAttribute('aria-label', 'Visit the Bop Garden');
    el('span', undefined, garden, '🌻');
    el('span', undefined, garden, ` ${this.store.daily.totalCompleted}`);
    garden.addEventListener('click', () => { sharedSfx.play('tap'); this.events.onGarden(); });
  }

  /** Today's puzzle, as a slim banner rather than a card in the list. */
  private buildDaily(): void {
    const done = this.daily.doneToday;
    const banner = el('button', `sel2-daily${done ? ' done' : ''}`, this.root) as HTMLButtonElement;
    banner.type = 'button';
    el('span', 'sd-glyph', banner, done ? '✅' : '📅');
    const mid = el('span', 'sd-mid', banner);
    el('span', 'sd-title', mid, done ? 'Daily Bop — done!' : 'Daily Bop');
    el('span', 'sd-sub', mid, done
      ? 'Come back tomorrow for a new one.'
      : `Today: ${this.daily.level.shortTitle} ${this.daily.level.brief.emoji}`);
    if (this.store.daily.streak > 0) {
      el('span', 'sd-streak', banner, `🔥 ${this.store.daily.streak}`);
    }
    banner.setAttribute('aria-label', done
      ? 'Daily Bop is done for today'
      : `Play today's Daily Bop: ${this.daily.level.shortTitle}`);
    if (done) {
      banner.addEventListener('click', () => {
        sharedSfx.play('tap');
        this.toast('✅ All done for today — a new one arrives tomorrow!');
      });
    } else {
      banner.addEventListener('click', () => {
        sharedSfx.play('bop');
        this.events.onPlayDaily(this.daily.index);
      });
    }
  }

  // ---------------- the world strip ----------------

  private renderStrip(): void {
    this.strip.innerHTML = '';
    for (const world of this.worlds) {
      const on = world.id === this.worldId;
      const btn = el('button',
        `sel2-med${on ? ' on' : ''}${world.unlocked ? '' : ' locked'}`, this.strip) as HTMLButtonElement;
      btn.type = 'button';
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', String(on));
      btn.setAttribute('aria-label', world.unlocked
        ? `${world.name}${world.starsEarned > 0 ? `, ${world.starsEarned} stars` : ''}`
        : `${world.name} — not open yet`);
      const disc = el('span', `sel2-med-disc th-${world.theme}`, btn);
      el('span', 'sel2-med-glyph', disc, world.emoji);
      if (!world.unlocked) el('span', 'sel2-med-lock', disc, '🔒');
      if (world.isNew && world.unlocked) el('span', 'sel2-med-new', disc, 'NEW');
      el('span', 'sel2-med-name', btn, world.name);
      if (world.starsEarned > 0) {
        el('span', 'sel2-med-stars', btn, `★ ${world.starsEarned}`);
      }
      btn.addEventListener('click', () => {
        if (!world.unlocked) {
          sharedSfx.play('bump');
          btn.classList.remove('shake');
          void btn.offsetWidth;
          btn.classList.add('shake');
          this.toast(world.lockedHint ?? '⭐ Win a few more stars to open this place!');
          return;
        }
        sharedSfx.play('bop');
        this.worldId = world.id;
        lastWorldId = world.id;
        this.renderStrip();
        this.renderIsland();
        announce(`${world.name} opened.`);
        // Keep the chosen medallion in view on a narrow screen.
        btn.scrollIntoView({ block: 'nearest', inline: 'center' });
      });
    }
  }

  // ---------------- the island ----------------

  private renderIsland(): void {
    for (const stop of this.mascotStops) stop();
    this.mascotStops = [];
    this.island.innerHTML = '';
    const world = this.worlds.find((w) => w.id === this.worldId);
    if (!world) return;
    this.island.className = `sel2-island th-${world.theme}`;

    // Scenery. Fixed positions per index so it never jitters on re-render.
    const decor = el('div', 'sel2-decor', this.island);
    decor.setAttribute('aria-hidden', 'true');
    (THEME_DECOR[world.theme] ?? []).forEach((glyph, i) => {
      const s = el('span', `sel2-leaf d${i}`, decor, glyph);
      s.style.setProperty('--i', String(i));
    });

    const head = el('div', 'sel2-island-head', this.island);
    el('span', 'sel2-island-glyph', head, world.emoji);
    const titles = el('div', 'sel2-island-titles', head);
    el('h2', undefined, titles, world.name);
    el('p', undefined, titles, world.tagline);

    if (world.stones.length === 0) {
      el('p', 'sel2-empty', this.island, 'Nothing here yet — check back soon!');
      return;
    }

    // ---- the swipeable rail of big level cards ----
    const railWrap = el('div', 'sel2-rail-wrap', this.island);
    const rail = el('div', 'sel2-rail', railWrap);
    rail.setAttribute('role', 'list');
    rail.setAttribute('aria-label', `Levels in ${world.name}`);
    const cards: HTMLElement[] = [];
    world.stones.forEach((stone, i) => {
      const cell = el('div', 'sel2-cell', rail);
      cell.setAttribute('role', 'listitem');
      cell.style.setProperty('--i', String(i));
      this.renderCard(cell, stone);
      cards.push(cell);
    });

    // Arrows for a mouse or a keyboard; swiping covers touch. They are
    // real buttons so they clear the tap-target floor and get names.
    const prev = el('button', 'sel2-arrow prev', railWrap, '‹') as HTMLButtonElement;
    prev.type = 'button';
    prev.setAttribute('aria-label', 'Show the level before');
    const next = el('button', 'sel2-arrow next', railWrap, '›') as HTMLButtonElement;
    next.type = 'button';
    next.setAttribute('aria-label', 'Show the next level');

    // Position dots. Presentational on purpose: nine tiny buttons would
    // add nine controls a child never needs, and the arrows already do
    // the job with a proper target.
    const pips = el('div', 'sel2-pips', this.island);
    pips.setAttribute('aria-hidden', 'true');
    const pipEls = world.stones.map(() => el('span', 'sel2-pip', pips));

    /** Which card is nearest the middle of the rail right now. */
    const centred = (): number => {
      const mid = rail.scrollLeft + rail.clientWidth / 2;
      let best = 0;
      let bestGap = Infinity;
      cards.forEach((c, i) => {
        const gap = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
        if (gap < bestGap) { bestGap = gap; best = i; }
      });
      return best;
    };
    const sync = (): void => {
      const at = centred();
      pipEls.forEach((p, i) => p.classList.toggle('on', i === at));
      // Signed distance from the middle, in card widths. CSS turns this
      // into a rotation and a push back, so the rail reads as a carousel
      // that TURNS rather than a row that slides.
      const mid = rail.scrollLeft + rail.clientWidth / 2;
      cards.forEach((c, i) => {
        const d = (c.offsetLeft + c.offsetWidth / 2 - mid) / (c.offsetWidth + 12);
        const clamped = Math.max(-2.4, Math.min(2.4, d));
        c.style.setProperty('--d', clamped.toFixed(3));
        c.style.setProperty('--ad', Math.abs(clamped).toFixed(3));
        c.classList.toggle('focused', i === at);
      });
      prev.disabled = at === 0;
      next.disabled = at === cards.length - 1;
      railWrap.classList.toggle('single', cards.length === 1);
    };
    const goTo = (i: number): void => {
      const card = cards[Math.max(0, Math.min(cards.length - 1, i))];
      if (!card) return;
      rail.scrollTo({
        left: card.offsetLeft - (rail.clientWidth - card.offsetWidth) / 2,
        behavior: this.store.settings.calmMode ? 'auto' : 'smooth',
      });
    };
    prev.addEventListener('click', () => { sharedSfx.play('tap'); goTo(centred() - 1); });
    next.addEventListener('click', () => { sharedSfx.play('tap'); goTo(centred() + 1); });
    rail.addEventListener('scroll', sync, { passive: true });

    // Open on the card that matters: the one to play now, else the first
    // that is not finished, else the beginning.
    const startAt = Math.max(0,
      world.stones.findIndex((s) => s.state === 'next' || s.state === 'open'));
    // Jump without animating, so arriving never looks like a scroll away
    // from something else.
    window.setTimeout(() => {
      if (this.disposed) return;
      const card = cards[startAt];
      if (card) {
        rail.scrollLeft = card.offsetLeft - (rail.clientWidth - card.offsetWidth) / 2;
      }
      sync();
    }, 0);
  }

  /**
   * One level, as a free-floating orb.
   *
   * There is no card. The panel that used to sit behind the icon was doing
   * nothing but drawing a box around it, and a box inside a box inside the
   * island read as packaging rather than as a thing to pick up. The orb
   * carries the art, the shadow beneath it carries the weight, and the
   * name, stars and action float underneath with nothing around them.
   */
  private renderCard(cell: HTMLElement, stone: TrailStone): void {
    const locked = stone.state === 'locked' || stone.state === 'soon';
    const btn = el('button', `sel2-stone sel2-card st-${stone.state}`, cell) as HTMLButtonElement;
    btn.type = 'button';
    const named = locked ? `${stone.label} — not open yet` : `Play ${stone.label}`;
    btn.setAttribute('aria-label', stone.showStars && stone.stars > 0
      ? `${named}, ${stone.stars} of 3 stars` : named);

    // ---- the orb ----
    const stack = el('span', 'sel2-orb-stack', btn);
    const orb = el('span', 'sel2-orb', stack);
    el('span', 'sel2-orb-gloss', orb);
    el('span', 'sel2-disc-glyph', orb, stone.emoji);
    if (locked) el('span', 'sel2-stone-lock', orb, '🔒');
    el('span', 'sel2-badge', orb, stone.badge);
    if (stone.state === 'done') el('span', 'sel2-card-tick', orb, '✓');
    // Three sparks that orbit the focused orb. Decorative only.
    if (!locked) {
      const spin = el('span', 'sel2-orbit', stack);
      spin.setAttribute('aria-hidden', 'true');
      for (let i = 0; i < 3; i += 1) {
        const spark = el('span', `sel2-spark s${i}`, spin, '✦');
        spark.style.setProperty('--i', String(i));
      }
    }
    // The contact shadow is what sells "floating" — without it an orb is
    // just a circle sitting on a background.
    el('span', 'sel2-orb-shadow', stack);

    if (stone.state === 'next') el('span', 'sel2-flag', btn, 'Play next!');

    el('span', 'sel2-stone-name', btn, stone.label);
    if (stone.note) {
      el('span', 'sel2-stone-note', btn, stone.note);
    } else if (stone.showStars) {
      const row = el('span', 'sel2-stone-stars', btn);
      for (let s = 0; s < 3; s += 1) el('span', s < stone.stars ? 'on' : '', row, '★');
    }

    // The whole orb is the tap target; this reads as its label.
    el('span', `sel2-go${locked ? ' locked' : ''}`, btn,
      locked ? '🔒 Not yet' : (stone.state === 'done' ? '↻ Play again' : '▶ Play'));

    if (stone.state === 'next') {
      // Zip stands beside the orb that is next, and hops when it is picked.
      const zip = el('span', 'sel2-zip', cell);
      zip.setAttribute('aria-hidden', 'true');
      const mascot = mountMascot(zip, 'zip', { calm: this.store.settings.calmMode });
      this.mascotStops.push(() => mascot.destroy());
    }

    if (stone.onPlay) {
      btn.addEventListener('click', () => { sharedSfx.play('bop'); stone.onPlay?.(); });
    } else {
      btn.addEventListener('click', () => {
        sharedSfx.play('bump');
        btn.classList.remove('shake');
        void btn.offsetWidth;
        btn.classList.add('shake');
        this.toast(stone.lockedHint ?? '⭐ Win the one before this to open it!');
      });
    }

    if (stone.onRemove) {
      const del = el('button', 'sel2-stone-del', cell, '✕') as HTMLButtonElement;
      del.type = 'button';
      del.setAttribute('aria-label', `Delete ${stone.label}`);
      del.addEventListener('click', (e) => {
        e.stopPropagation();
        sharedSfx.play('remove');
        stone.onRemove?.();
      });
    }
  }

  // ---------------- building the worlds ----------------

  private buildWorlds(): TrailWorld[] {
    const worlds: TrailWorld[] = [];
    const stars = this.store.stars;
    /** The first unfinished thing anywhere — only ONE stone wears the flag. */
    let flagged = false;
    const mark = (unlocked: boolean, earned: number): StoneState => {
      if (!unlocked) return 'locked';
      if (earned > 0) return 'done';
      if (!flagged) { flagged = true; return 'next'; }
      return 'open';
    };

    // ---- the five story worlds ----
    let globalIndex = 0;
    for (const worldId of WORLD_ORDER) {
      const levels = ALL_LEVELS.filter((l) => l.worldId === worldId);
      if (levels.length === 0) continue;
      const meta = WORLD_META[worldId];
      const firstIdx = globalIndex;
      const openedByGrownUp = this.store.isWorldUnlocked(worldId);
      const worldUnlocked = openedByGrownUp || firstIdx === 0
        || (stars[ALL_LEVELS[firstIdx - 1].id] ?? 0) >= 1;

      const stones: TrailStone[] = levels.map((level) => {
        const idx = globalIndex;
        globalIndex += 1;
        const unlocked = openedByGrownUp || idx === 0
          || (stars[ALL_LEVELS[idx - 1].id] ?? 0) >= 1;
        const earned = stars[level.id] ?? 0;
        const state = mark(unlocked, earned);
        return {
          key: level.id,
          label: level.shortTitle,
          emoji: level.brief.emoji,
          badge: String(idx + 1),
          stars: earned,
          showStars: true,
          state,
          lockedHint: '⭐ Win the level before this one to open it!',
          onPlay: unlocked ? () => this.events.onPlayLevel(idx) : undefined,
        };
      });

      worlds.push({
        id: worldId,
        name: meta.name,
        emoji: meta.emoji,
        theme: meta.theme,
        unlocked: worldUnlocked,
        stones,
        starsEarned: levels.reduce((a, l) => a + (stars[l.id] ?? 0), 0),
        tagline: `${stones.length} puzzle${stones.length === 1 ? '' : 's'} to play`,
        lockedHint: '⭐ Finish the place before this one to open it!',
      });
    }

    // ---- Gearworks Garage, one workshop at a time ----
    // Forty-six machines in a single island is the same wall the old
    // screen had, just prettier. GEARWORKS_WORKSHOPS cuts the sequence
    // where the ideas change, so each shelf is a screenful.
    {
      const opened = this.store.isWorldUnlocked('gearworks-garage');
      const totals = garageTotals(stars);
      let seqIdx = 0;
      for (const shop of GEARWORKS_WORKSHOPS) {
        const slice = GEARWORKS_SEQUENCE.slice(seqIdx, seqIdx + shop.count);
        const firstSeq = seqIdx;
        const stones: TrailStone[] = slice.map((entry, i) => {
          const thisSeq = firstSeq + i;
          const unlocked = opened || thisSeq === 0
            || (stars[gwEntryId(GEARWORKS_SEQUENCE[thisSeq - 1])] ?? 0) >= 1;
          const earned = stars[entry.level.id] ?? 0;
          return {
            key: entry.level.id,
            label: entry.level.shortTitle,
            emoji: entry.level.emoji,
            badge: String(thisSeq + 1),
            stars: earned,
            showStars: true,
            state: mark(unlocked, earned),
            lockedHint: '⭐ Win the machine before this one to open it!',
            onPlay: unlocked ? () => this.events.onPlayGearworks(thisSeq) : undefined,
          };
        });
        // A workshop opens when its first machine does, so the strip shows
        // what is coming without pretending it is available.
        const shopUnlocked = opened || firstSeq === 0
          || (stars[gwEntryId(GEARWORKS_SEQUENCE[firstSeq - 1])] ?? 0) >= 1;
        worlds.push({
          id: shop.id,
          name: shop.name,
          emoji: shop.emoji,
          theme: 'garage',
          unlocked: shopUnlocked,
          stones,
          starsEarned: slice.reduce((a, e) => a + (stars[e.level.id] ?? 0), 0),
          tagline: shop.tagline,
          isNew: firstSeq === 0,
          lockedHint: '⭐ Finish the workshop before this one to open it!',
        });
        seqIdx += shop.count;
      }

      // The Trophy Room is its own always-open golden shelf.
      worlds.push({
        id: 'gw-trophy-room',
        name: 'Trophy Room',
        emoji: '🏆',
        theme: 'garage',
        unlocked: true,
        starsEarned: totals.earned,
        tagline: 'Everything you have built',
        stones: [{
          key: 'gw-trophy',
          label: "Inventor's Trophies",
          emoji: '🏆',
          badge: '★',
          stars: 0,
          showStars: false,
          note: `★ ${totals.earned} collected`,
          state: totals.allComplete ? 'done' : 'open',
          onPlay: () => this.events.onGearworksTrophy(),
        }],
      });
    }

    // ---- Zip's App Lab ----
    worlds.push({
      id: 'app-lab',
      name: APP_LAB_WORLD.name,
      emoji: APP_LAB_WORLD.glyph,
      theme: 'applab',
      unlocked: true,
      starsEarned: 0,
      tagline: APP_LAB_WORLD.tagline,
      isNew: true,
      stones: [{
        key: 'applab',
        label: 'Build your own app',
        emoji: '🛠️',
        badge: '★',
        stars: 0,
        showStars: false,
        note: 'Six workbenches',
        state: 'open',
        onPlay: () => this.events.onAppLab(),
      }],
    });

    // ---- Imagination Island ----
    {
      const customs = loadCustomLevels();
      const stones: TrailStone[] = [{
        key: 'create',
        label: 'Build a Level',
        emoji: '＋',
        badge: '✎',
        stars: 0,
        showStars: false,
        note: 'Make your own puzzle',
        state: 'open',
        onPlay: () => this.events.onEditor(),
      }];
      customs.forEach((custom, i) => {
        stones.push({
          key: custom.id,
          label: custom.shortTitle,
          emoji: '🛠️',
          badge: String(i + 1),
          stars: 0,
          showStars: false,
          note: 'Made by you',
          state: 'open',
          onPlay: () => this.events.onCustom(custom),
          onRemove: () => this.events.onDeleteCustom(custom.id),
        });
      });
      worlds.push({
        id: 'imagination-island',
        name: 'Imagination Island',
        emoji: '🏝️',
        theme: 'island',
        unlocked: true,
        stones,
        starsEarned: 0,
        tagline: customs.length === 0
          ? 'Invent a puzzle of your own'
          : `${customs.length} puzzle${customs.length === 1 ? '' : 's'} you made`,
      });
    }

    return worlds;
  }

  private toast(text: string): void {
    this.root.querySelector('.sel2-toast')?.remove();
    const t = el('div', 'toast sel2-toast', this.root, text);
    window.setTimeout(() => t.remove(), 2400);
  }

  dispose(): void {
    this.disposed = true;
    for (const stop of this.mascotStops) stop();
    this.mascotStops = [];
    this.root.classList.remove('sel2-screen');
    this.root.innerHTML = '';
  }
}
