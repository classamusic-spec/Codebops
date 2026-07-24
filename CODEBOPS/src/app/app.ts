/** App bootstrap + screen router (title → select/garden/editor → game). */
import { el } from '../ui/dom';
import { GameScreen } from './gameScreen';
import { ALL_LEVELS } from '../data/levels';
import type { LevelDef } from '../data/schemas/level';
import { SaveStore, dayStamp } from '../storage/saveStore';
import { loadCustomLevels, deleteCustomLevel } from '../storage/customLevels';
import { inlineSvgInto, startMascotLife, loadSvg } from '../rendering/spriteCharacter';
import { sharedSfx } from '../audio/sfx';
import { GardenScreen } from './gardenScreen';
import { EditorScreen } from './editorScreen';
import { GearworksScreen } from './gearworksScreen';
import { GearworksChainScreen } from './gearworksChainScreen';
import { GearworksLoopScreen } from './gearworksLoopScreen';
import { GearworksSensorScreen } from './gearworksSensorScreen';
import { GearworksSorterScreen } from './gearworksSorterScreen';
import { GearworksCounterScreen } from './gearworksCounterScreen';
import { GEARWORKS_WORLD, GEARWORKS_PICKER, GEARWORKS_SEQUENCE, gwEntryId } from '../data/gearworks/world';
import { createCampfireGate, showCampfire } from './campfire';

const WORLD_META: Record<string, { emoji: string; name: string; theme: string }> = {
  'sparkle-meadow': { emoji: '🌼', name: 'Sparkle Meadow', theme: 'meadow' },
  'bubble-bay': { emoji: '🐚', name: 'Bubble Bay', theme: 'bay' },
  'pattern-forest': { emoji: '🌸', name: 'Pattern Forest', theme: 'forest' },
  'robot-town': { emoji: '🤖', name: 'Robot Town', theme: 'town' },
  'agent-academy': { emoji: '🎓', name: 'Agent Academy', theme: 'academy' },
};
const WORLD_ORDER = ['sparkle-meadow', 'bubble-bay', 'pattern-forest', 'robot-town', 'agent-academy'];

/**
 * Today's featured level for the Daily Bop (stable per LOCAL calendar day,
 * so it flips at the same midnight the streak logic uses).
 */
function dailyLevelIndex(): number {
  const now = new Date();
  const localDays = Math.floor(
    new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() / 86_400_000,
  );
  return ((localDays % ALL_LEVELS.length) + ALL_LEVELS.length) % ALL_LEVELS.length;
}

export class App {
  private readonly host: HTMLElement;
  private gameScreen: GameScreen | null = null;
  private garden: GardenScreen | null = null;
  private editor: EditorScreen | null = null;
  private gearworks: GearworksScreen | GearworksChainScreen | GearworksLoopScreen | GearworksSensorScreen | GearworksSorterScreen | GearworksCounterScreen | null = null;
  private store = new SaveStore();
  private mascotStops: Array<() => void> = [];

  constructor(host: HTMLElement) {
    this.host = host;
  }

  start(): void {
    this.showTitle();
  }

  private clearHost(): void {
    this.mascotStops.forEach((s) => s());
    this.mascotStops = [];
    this.gameScreen?.dispose();
    this.gameScreen = null;
    this.garden?.dispose();
    this.garden = null;
    this.editor?.dispose();
    this.editor = null;
    this.gearworks?.dispose();
    this.gearworks = null;
    this.host.innerHTML = '';
  }

  // ---------- title ----------

  private showTitle(): void {
    this.clearHost();
    const screen = el('section', 'screen title-screen', this.host);
    screen.id = 'screen-title';

    // Sky decor: sun rays, clouds, floating sparkles
    el('div', 'title-rays', screen);
    for (const cls of ['c1', 'c2', 'c3']) el('div', `title-cloud ${cls}`, screen);
    const deco = ['⭐', '✨', '⬡', '✦', '💧', '⭐', '✨'];
    deco.forEach((d, i) => {
      const s = el('span', `title-spark s${i}`, screen, d);
      s.setAttribute('aria-hidden', 'true');
    });

    // Rolling hills with bushes + flowers
    const ground = el('div', 'title-ground', screen);
    el('div', 'title-hill h1', ground);
    el('div', 'title-hill h2', ground);
    for (const cls of ['b1', 'b2', 'b3', 'b4']) el('div', `title-bush ${cls}`, ground);
    const flowers = ['🌸', '🌼', '🌺', '🌻'];
    flowers.forEach((f, i) => el('span', `title-flower f${i}`, ground, f));

    // Live traced mascots (blinking + glancing)
    const zipBox = el('div', 'title-mascot zip', screen);
    void inlineSvgInto(zipBox, './art/characters/zip/zip.svg').then((svg) => {
      if (svg) this.mascotStops.push(startMascotLife(svg));
    });
    const mixyBox = el('div', 'title-mascot mixy', screen);
    void inlineSvgInto(mixyBox, './art/characters/mixy/mixy.svg').then((svg) => {
      if (svg) this.mascotStops.push(startMascotLife(svg));
    });

    const card = el('div', 'title-card', screen);
    // Official CodeBops logo mark, animated: drop-bounce in, idle rock,
    // masked glint sweep; tap it to make it pop again.
    const logoBox = el('div', 'title-logo-art', card);
    logoBox.setAttribute('role', 'img');
    logoBox.setAttribute('aria-label', 'CodeBops');
    const shine = el('div', 'logo-shine', logoBox);
    // Inline the logo, and mask the glint with the SAME (inlined) art via a
    // data-URI so it works from a single-file build too — no external URL.
    void loadSvg('./art/logo.svg').then((text) => {
      logoBox.insertAdjacentHTML('afterbegin', text);
      const uri = `url("data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(text)))}")`;
      shine.style.webkitMaskImage = uri;
      shine.style.maskImage = uri;
    });
    logoBox.addEventListener('pointerdown', () => {
      sharedSfx.play('star');
      logoBox.classList.remove('replay');
      void logoBox.offsetWidth;
      logoBox.classList.add('replay');
    });
    const tag = el('div', 'title-tag', card);
    el('span', 'tag-star', tag, '⭐');
    el('span', undefined, tag, 'Teach tiny helpers. Build big ideas.');
    el('span', 'tag-star', tag, '⭐');
    const play = el('button', 'btn-play', card);
    play.type = 'button';
    play.setAttribute('aria-label', 'Play CodeBops');
    el('span', 'gloss', play);
    play.append('PLAY');
    el('span', 'tri', play);
    play.addEventListener('click', () => {
      sharedSfx.play('bop');
      this.showSelect();
    });

    // Bop Garden entry
    const garden = el('button', 'garden-btn', card);
    garden.type = 'button';
    el('span', undefined, garden, '🌻');
    el('span', undefined, garden, 'My Garden');
    garden.addEventListener('click', () => this.showGarden());

    // Grown-Up Campfire (hold-to-open gate, bottom corner)
    createCampfireGate(screen, () => {
      this.store = new SaveStore();
      showCampfire(screen, this.store, () => { /* progress reset */ });
    });

  }

  // ---------- level select ----------

  private showSelect(): void {
    this.clearHost();
    this.store = new SaveStore(); // re-read stars earned in the last session
    const screen = el('section', 'screen', this.host);
    const wrap = el('div', 'select-wrap', screen);
    for (const cls of ['c1', 'c2']) el('div', `title-cloud select-cloud ${cls}`, wrap);

    const header = el('div', 'select-header', wrap);
    const back = el('button', 'circle-btn', header, '←');
    back.type = 'button';
    back.setAttribute('aria-label', 'Back to title');
    back.addEventListener('click', () => this.showTitle());
    el('h1', undefined, header, 'Pick a Level!');
    const totalStars = Object.values(this.store.stars).reduce((a, b) => a + b, 0);
    const pill = el('div', 'stars-pill', header);
    pill.style.marginLeft = 'auto';
    el('span', 'star earned', pill, '★');
    el('span', undefined, pill, ` ${totalStars}`);
    const gardenPill = el('button', 'stars-pill garden-pill', header) as HTMLButtonElement;
    gardenPill.type = 'button';
    gardenPill.setAttribute('aria-label', 'Visit the Bop Garden');
    el('span', undefined, gardenPill, '🌻');
    el('span', undefined, gardenPill, ` ${this.store.daily.totalCompleted}`);
    gardenPill.addEventListener('click', () => this.showGarden());

    // --- Daily Bop card ---
    const dailyIdx = dailyLevelIndex();
    const dailyLevel = ALL_LEVELS[dailyIdx];
    const doneToday = this.store.daily.lastCompleted === dayStamp();
    const daily = el('button', `daily-card${doneToday ? ' done' : ''}`, wrap) as HTMLButtonElement;
    daily.type = 'button';
    el('span', 'dc-emoji', daily, doneToday ? '✅' : '📅');
    const dcMid = el('span', 'dc-mid', daily);
    el('span', 'dc-title', dcMid, doneToday ? 'Daily Bop — done!' : 'Daily Bop');
    el('span', 'dc-sub', dcMid, doneToday
      ? `Come back tomorrow — 🔥 ${this.store.daily.streak} day streak!`
      : `Today's puzzle: ${dailyLevel.shortTitle} ${dailyLevel.brief.emoji}`);
    el('span', 'dc-streak', daily, `🔥 ${this.store.daily.streak}`);
    if (!doneToday) {
      daily.addEventListener('click', () => this.showGame(dailyIdx, {
        onSuccess: () => {
          const streak = this.store.completeDaily();
          // Land the streak toast after the celebration dialog mounts.
          window.setTimeout(() => this.streakToast(streak), 900);
        },
      }));
    }

    // --- world sections ---
    let globalIndex = 0;
    for (const worldId of WORLD_ORDER) {
      const levels = ALL_LEVELS.filter((l) => l.worldId === worldId);
      if (levels.length === 0) continue;
      const meta = WORLD_META[worldId];
      const firstIdx = globalIndex;
      const worldUnlocked =
        firstIdx === 0 || (this.store.stars[ALL_LEVELS[firstIdx - 1].id] ?? 0) >= 1;
      const section = el('div', `world-panel wp-${meta.theme}${worldUnlocked ? '' : ' locked'}`, wrap);
      const title = el('div', 'world-title', section);
      el('span', 'wemoji', title, meta.emoji);
      el('span', undefined, title, meta.name);
      if (!worldUnlocked) el('span', 'world-lock', title, '🔒');
      const list = el('div', 'level-list', section);

      for (const level of levels) {
        const idx = globalIndex;
        const unlocked = idx === 0 || (this.store.stars[ALL_LEVELS[idx - 1].id] ?? 0) >= 1;
        const stars = this.store.stars[level.id] ?? 0;
        const row = el('button', `level-item${unlocked ? '' : ' locked'}${level.prefill ? ' debug' : ''}`, list) as HTMLButtonElement;
        row.type = 'button';
        row.setAttribute('aria-label', unlocked ? `Play ${level.shortTitle}` : `${level.shortTitle} — locked`);
        const num = el('span', 'li-num', row);
        el('span', 'li-num-text', num, String(idx + 1));
        el('span', 'li-leaf', num, '🍃');
        el('span', 'li-emoji', row, level.brief.emoji);
        el('span', 'li-name', row, level.shortTitle);
        const right = el('span', 'li-right', row);
        if (!unlocked) el('span', 'li-lock', right, '🔒');
        const starRow = el('span', 'li-stars', right);
        for (let s = 0; s < 3; s++) el('span', s < stars ? 'on' : '', starRow, '★');
        if (unlocked) {
          row.addEventListener('click', () => this.showGame(idx));
        } else {
          // Locked rows still respond — wiggle + a friendly hint.
          row.addEventListener('click', () => {
            sharedSfx.play('bump');
            row.classList.remove('shake');
            void row.offsetWidth;
            row.classList.add('shake');
            this.hintToast('⭐ Win the level before this one to unlock it!');
          });
        }
        globalIndex++;
      }
    }

    // --- Gearworks Garage (new world — Phase 1 shell) ---
    {
      const section = el('div', 'world-panel wp-garage', wrap);
      const title = el('div', 'world-title', section);
      el('span', 'wemoji', title, GEARWORKS_WORLD.emoji);
      el('span', undefined, title, GEARWORKS_WORLD.name);
      el('span', 'gw-new-badge', title, 'NEW!');
      const list = el('div', 'level-list', section);
      let seqIdx = 0;
      GEARWORKS_PICKER.forEach((entry, i) => {
        const playable = entry.kind !== 'soon';
        const thisSeqIdx = seqIdx;
        // Playable levels unlock in order (first is always open).
        const unlocked = playable && (thisSeqIdx === 0 ||
          (this.store.stars[gwEntryId(GEARWORKS_SEQUENCE[thisSeqIdx - 1])] ?? 0) >= 1);
        if (playable) seqIdx++;
        const label = entry.kind === 'soon' ? entry.shortTitle : entry.level.shortTitle;
        const emoji = entry.kind === 'soon' ? entry.emoji : entry.level.emoji;
        const row = el('button', `level-item${unlocked ? '' : ' locked'}`, list) as HTMLButtonElement;
        row.type = 'button';
        row.setAttribute('aria-label', unlocked ? `Play ${label}` : `${label} — locked`);
        const num = el('span', 'li-num gw-num', row);
        el('span', 'li-num-text', num, String(i + 1));
        el('span', 'li-leaf', num, '⚙️');
        el('span', 'li-emoji', row, emoji);
        el('span', 'li-name', row, label);
        const right = el('span', 'li-right', row);
        if (!unlocked) el('span', 'li-lock', right, '🔒');
        const stars = entry.kind === 'soon' ? 0 : (this.store.stars[entry.level.id] ?? 0);
        const starRow = el('span', 'li-stars', right);
        for (let s = 0; s < 3; s++) el('span', s < stars ? 'on' : '', starRow, '★');
        if (unlocked) {
          row.addEventListener('click', () => this.showGearworks(thisSeqIdx));
        } else {
          row.addEventListener('click', () => {
            sharedSfx.play('bump');
            row.classList.remove('shake');
            void row.offsetWidth;
            row.classList.add('shake');
            this.hintToast(playable
              ? '⭐ Win the machine before this one to unlock it!'
              : '🔧 Zip is still building this machine!');
          });
        }
      });
    }

    // --- Imagination Island ---
    const customs = loadCustomLevels();
    const section = el('div', 'world-panel wp-island', wrap);
    const title = el('div', 'world-title', section);
    el('span', 'wemoji', title, '🏝️');
    el('span', undefined, title, 'Imagination Island');
    const list = el('div', 'level-list', section);
    const create = el('button', 'level-item create-item', list) as HTMLButtonElement;
    create.type = 'button';
    el('span', 'li-emoji', create, '＋');
    el('span', 'li-name', create, 'Build a Level');
    create.addEventListener('click', () => this.showEditor());
    for (const custom of customs) {
      const row = el('button', 'level-item custom-item', list) as HTMLButtonElement;
      row.type = 'button';
      el('span', 'li-emoji', row, '🛠️');
      el('span', 'li-name', row, custom.shortTitle);
      row.addEventListener('click', () => this.showCustomGame(custom));
      const del = el('span', 'lv-del', row, '✕');
      del.setAttribute('aria-label', `Delete ${custom.shortTitle}`);
      del.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteCustomLevel(custom.id);
        this.showSelect();
      });
    }

  }

  /** Floating toast over whatever screen is active. */
  private hintToast(text: string): void {
    document.querySelector('.app-toast')?.remove();
    const t = el('div', 'toast app-toast', this.host, text);
    window.setTimeout(() => t.remove(), 2200);
  }

  private streakToast(streak: number): void {
    document.querySelector('.app-toast')?.remove();
    const t = el('div', 'toast app-toast streak-toast', this.host,
      `🔥 Daily Bop streak: ${streak} day${streak === 1 ? '' : 's'}! A golden flower joins your garden 🌻`);
    window.setTimeout(() => t.remove(), 3400);
  }

  // ---------- game ----------

  private showGame(index: number, opts: { onSuccess?: () => void } = {}): void {
    this.clearHost();
    const screen = el('section', 'screen', this.host);
    screen.id = 'screen-game';
    const level = ALL_LEVELS[index];
    this.gameScreen = new GameScreen(screen, level, {
      onExit: () => this.showSelect(),
      onNextLevel: () => this.showGame(Math.min(index + 1, ALL_LEVELS.length - 1)),
      hasNext: index < ALL_LEVELS.length - 1,
      onSuccess: opts.onSuccess,
      store: this.store,
    });
    this.gameScreen.enter();
  }

  private showCustomGame(level: LevelDef): void {
    this.clearHost();
    const screen = el('section', 'screen', this.host);
    screen.id = 'screen-game';
    this.gameScreen = new GameScreen(screen, level, {
      onExit: () => this.showSelect(),
      onNextLevel: () => this.showSelect(),
      hasNext: false,
      store: this.store,
    });
    this.gameScreen.enter();
  }

  // ---------- gearworks ----------

  private showGearworks(index: number): void {
    this.clearHost();
    const screen = el('section', 'screen', this.host);
    screen.id = 'screen-gearworks';
    const entry = GEARWORKS_SEQUENCE[index];
    const hasNext = index < GEARWORKS_SEQUENCE.length - 1;
    const events = {
      onExit: () => this.showSelect(),
      onNext: hasNext ? () => this.showGearworks(index + 1) : undefined,
      hasNext,
      store: this.store,
    };
    this.gearworks = entry.kind === 'machine'
      ? new GearworksScreen(screen, entry.level, events)
      : entry.kind === 'chain'
        ? new GearworksChainScreen(screen, entry.level, events)
        : entry.kind === 'loop'
          ? new GearworksLoopScreen(screen, entry.level, events)
          : entry.kind === 'sensor'
            ? new GearworksSensorScreen(screen, entry.level, events)
            : entry.kind === 'sorter'
              ? new GearworksSorterScreen(screen, entry.level, events)
              : new GearworksCounterScreen(screen, entry.level, events);
    this.gearworks.enter();
  }

  // ---------- garden ----------

  private showGarden(): void {
    this.clearHost();
    this.store = new SaveStore();
    const screen = el('section', 'screen', this.host);
    screen.id = 'screen-garden';
    this.garden = new GardenScreen(screen, this.store, {
      onBack: () => this.showTitle(),
    });
    this.garden.enter();
  }

  // ---------- editor ----------

  private showEditor(): void {
    this.clearHost();
    const screen = el('section', 'screen', this.host);
    screen.id = 'screen-editor';
    this.editor = new EditorScreen(screen, {
      onBack: () => this.showSelect(),
      onPlay: (level) => {
        this.clearHost();
        const gameHost = el('section', 'screen', this.host);
        gameHost.id = 'screen-game';
        this.gameScreen = new GameScreen(gameHost, level, {
          onExit: () => this.showEditor(),
          onNextLevel: () => this.showEditor(),
          hasNext: false,
          store: this.store,
        });
        this.gameScreen.enter();
      },
      onSaved: () => { /* stay in the editor; toast already shown */ },
    });
    this.editor.enter();
  }
}
