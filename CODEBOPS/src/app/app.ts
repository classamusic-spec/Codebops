/** App bootstrap + screen router (title → select/garden/editor → game). */
import { el } from '../ui/dom';
import { GameScreen } from './gameScreen';
import { ALL_LEVELS } from '../data/levels';
import type { LevelDef } from '../data/schemas/level';
import { SaveStore, dayStamp } from '../storage/saveStore';
import { deleteCustomLevel } from '../storage/customLevels';
import { loadSvg } from '../rendering/svgAsset';
import { mountSkyScene } from '../ui/skyScene';
import { sharedSfx } from '../audio/sfx';
import { sharedMusic, attachFirstGesture } from '../audio/music';
import { sharedHaptics } from '../audio/haptics';
import { resetFrames, resetJitter } from '../engine/testMode';
import { GardenScreen } from './gardenScreen';
import { MissionScreen } from './missionScreen';
import { EditorScreen } from './editorScreen';
import { GearworksScreen } from './gearworksScreen';
import { GearworksChainScreen } from './gearworksChainScreen';
import { GearworksLoopScreen } from './gearworksLoopScreen';
import { GearworksSensorScreen } from './gearworksSensorScreen';
import { GearworksSorterScreen } from './gearworksSorterScreen';
import { GearworksCounterScreen } from './gearworksCounterScreen';
import { GearworksJamScreen } from './gearworksJamScreen';
import { GearworksJobScreen } from './gearworksJobScreen';
import { GearworksSignalScreen } from './gearworksSignalScreen';
import { GearworksDebugScreen } from './gearworksDebugScreen';
import { GearworksOrchestraScreen } from './gearworksOrchestraScreen';
import { GearworksLighthouseScreen } from './gearworksLighthouseScreen';
import { GearworksDeliveryScreen } from './gearworksDeliveryScreen';
import { GearworksPaintScreen } from './gearworksPaintScreen';
import { GearworksStoryScreen } from './gearworksStoryScreen';
import { GearworksMakerScreen } from './gearworksMakerScreen';
import { GEARWORKS_SEQUENCE } from '../data/gearworks/world';
import { GearworksTrophyScreen } from './gearworksTrophyScreen';
import { createCampfireGate, showCampfire } from './campfire';
import { applyAccessibility, stopSpeaking } from '../ui/a11y';
import { watchOrientation } from '../ui/rotateHint';
import type { RotateHintHandle } from '../ui/rotateHint';
import { JourneyScreen } from './journeyScreen';
import { LevelSelectScreen } from './levelSelectScreen';
import { AppLabScreen } from './appLabScreen';
import { AppCreatorScreen } from './appCreatorScreen';
import { AppLibraryScreen } from './appLibraryScreen';
import type { MiniAppProject } from '../creator/miniAppProject';
import type { AppKitDefinition } from '../data/app-lab/appLabDefinition';

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
  private helpers: MissionScreen | null = null;
  private trophy: GearworksTrophyScreen | null = null;
  private journey: JourneyScreen | null = null;
  private select: LevelSelectScreen | null = null;
  private appLab: AppLabScreen | null = null;
  private creator: AppCreatorScreen | null = null;
  private library: AppLibraryScreen | null = null;
  private editor: EditorScreen | null = null;
  private gearworks: GearworksScreen | GearworksChainScreen | GearworksLoopScreen | GearworksSensorScreen | GearworksSorterScreen | GearworksCounterScreen | GearworksJamScreen | GearworksJobScreen | GearworksSignalScreen | GearworksDebugScreen | GearworksOrchestraScreen | GearworksLighthouseScreen | GearworksDeliveryScreen | GearworksPaintScreen | GearworksStoryScreen | GearworksMakerScreen | null = null;
  private store = new SaveStore();
  private mascotStops: Array<() => void> = [];
  private rotate: RotateHintHandle | null = null;
  /** Re-runs the current screen's build — set by guard() on every transition. */
  private reenter: (() => void) | null = null;
  /** Recent recovery timestamps, to spot a crash loop. */
  private failures: number[] = [];

  constructor(host: HTMLElement) {
    this.host = host;
  }

  start(): void {
    // The track cannot begin at boot — every browser blocks audio until
    // the page has been interacted with — so it waits for the first tap
    // anywhere, which on the splash is the child reaching for Play.
    sharedMusic.enabled = this.store.settings.music !== false;
    attachFirstGesture();
    // A child cannot open devtools, reload, or explain what happened. If
    // an error escapes everything else and the page is left with no
    // screen mounted, put the title screen back rather than a blank page.
    window.addEventListener('error', () => this.rescueIfBlank());
    window.addEventListener('unhandledrejection', () => this.rescueIfBlank());
    // Three repaints by itself when a lost WebGL context comes back; the
    // Stage raises this only when the restore never arrives. Rebuilding
    // the screen asks the browser for a fresh context, which is the only
    // remaining way to get the world back on the canvas.
    window.addEventListener('codebops:gpu-stall', () => {
      const again = this.reenter;
      if (again) this.guard('current', again);
    });
    this.showTitle();
  }

  /**
   * Every screen transition runs through here: if building a screen
   * throws (bad save data, a lost GPU, a level that fails validation),
   * the child would otherwise be stranded on a blank page — clearHost()
   * has already emptied it. Catch, and fall back to the title screen.
   */
  private guard(where: string, build: () => void): void {
    this.reenter = build;
    try {
      build();
      this.warnIfNotSaving();
    } catch (err) {
      console.error(`[CodeBops] The ${where} screen failed to open.`, err);
      this.recover();
    }
  }

  /** Once per session: the device stopped keeping the save. */
  private warnedNotSaving = false;

  /**
   * A full device fails silently inside persist(); without this, a child
   * earns stars all afternoon and loses every one on reload with nothing
   * anywhere saying so. Checked here because every screen change passes
   * through guard(), which is the first quiet moment after a write.
   */
  private warnIfNotSaving(): void {
    if (this.store.durable || this.warnedNotSaving) return;
    this.warnedNotSaving = true;
    document.querySelector('.app-toast')?.remove();
    const t = el('div', 'toast app-toast', this.host,
      '⚠️ This tablet is out of space, so new stars can’t be remembered. You can still play!');
    window.setTimeout(() => t.remove(), 6000);
  }

  private recover(): void {
    const now = Date.now();
    this.failures = this.failures.filter((t) => now - t < 10_000);
    this.failures.push(now);
    // Three failures in ten seconds means the title screen itself is
    // broken — stop retrying and offer the one thing that always works.
    if (this.failures.length >= 3) {
      this.lastResort();
      return;
    }
    try {
      this.buildTitle();
    } catch (err) {
      console.error('[CodeBops] The title screen failed too.', err);
      this.lastResort();
    }
  }

  /** No helpers, no styles from anywhere else: nothing left to break. */
  private lastResort(): void {
    this.host.innerHTML = '';
    const card = document.createElement('div');
    card.className = 'crash-card';
    const face = document.createElement('div');
    face.className = 'crash-face';
    face.textContent = '🤖';
    const msg = document.createElement('p');
    msg.textContent = 'Oops! CodeBops got tangled up.';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = 'Start again';
    btn.addEventListener('click', () => window.location.reload());
    card.append(face, msg, btn);
    this.host.appendChild(card);
  }

  /**
   * Global backstop: an async error (a rejected import, a bad timer)
   * can escape guard() entirely. Only act when the page is actually
   * blank — a healthy screen with a logged error should be left alone.
   */
  private rescueIfBlank(): void {
    if (this.host.querySelector('.screen, .crash-card')) return;
    this.recover();
  }

  /**
   * Marks that a PLAY screen is active (as opposed to a menu). Both
   * orientations are fully supported — this only lets the CSS give the
   * deck and panels a tighter, portrait-friendly shape while playing.
   */
  private setNeedsLandscape(on: boolean): void {
    document.body.classList.toggle('playing', on);
    // Every play screen routes through here, so this is the one place the
    // "turn me sideways" offer needs to live (§14).
    this.rotate?.dispose();
    this.rotate = on ? watchOrientation(this.host) : null;
  }

  private clearHost(): void {
    // Same screen, same character phases, same frame count, run after
    // run — see testMode.
    resetJitter();
    resetFrames();
    this.setNeedsLandscape(false);
    // Every screen change re-applies the accessibility settings, so calm
    // mode / high contrast / left-handed reach the App Lab and the menus
    // too rather than only the play screen that first set them (§14).
    applyAccessibility(this.store.settings);
    // The music setting rides along with the rest, so turning it off in
    // the Settings dialog reaches every screen and not only the one the
    // dialog happened to be opened from.
    sharedMusic.enabled = this.store.settings.music !== false;
    // Haptics ride the sound switch. Silencing the game in a waiting room
    // means all of it, not just the speaker.
    sharedHaptics.enabled = this.store.settings.sound;
    stopSpeaking();
    this.mascotStops.forEach((s) => s());
    this.mascotStops = [];
    this.gameScreen?.dispose();
    this.gameScreen = null;
    this.garden?.dispose();
    this.garden = null;
    this.helpers?.dispose();
    this.helpers = null;
    this.trophy?.dispose();
    this.trophy = null;
    this.journey?.dispose();
    this.journey = null;
    this.select?.dispose();
    this.select = null;
    this.appLab?.dispose();
    this.appLab = null;
    this.creator?.dispose();
    this.creator = null;
    this.library?.dispose();
    this.library = null;
    this.editor?.dispose();
    this.editor = null;
    this.gearworks?.dispose();
    this.gearworks = null;
    this.host.innerHTML = '';
  }

  // ---------- title ----------

  private showTitle(): void {
    this.guard('title', () => this.buildTitle());
  }

  private buildTitle(): void {
    this.clearHost();
    const screen = el('section', 'screen title-screen', this.host);
    screen.id = 'screen-title';

    // The splash is a little scene that BUILDS ITSELF while a child looks
    // at it — sky, then sun, then clouds, then the land, then the trees,
    // then the logo lands on top of it. The order is the whole point: a
    // world assembling itself reads as "something is about to happen"
    // in a way a finished picture never does.
    //
    // Every stage is one class on the screen and a CSS delay, so calm mode
    // and prefers-reduced-motion can hand a child the finished scene with
    // nothing moving, by turning the same animations off.
    screen.classList.add('title-build');

    mountSkyScene(screen);
    // Specks of light in the sky. These stay emoji: they are two-pixel
    // twinkles, not artwork, and drawing them would be five more nodes to
    // say what a sparkle already says.
    const sparks = el('div', 'title-sparks', screen);
    sparks.setAttribute('aria-hidden', 'true');
    ['⭐', '✨', '⬡', '✦', '💧', '⭐', '✨'].forEach((d, i) => el('span', `title-spark s${i}`, sparks, d));

    const card = el('div', 'title-card', screen);
    // The logo is the hero now — the mascots used to flank it and on a
    // phone they simply sat on top of the tagline and the Play button.
    const logoBox = el('div', 'title-logo-art', card);
    logoBox.setAttribute('role', 'img');
    logoBox.setAttribute('aria-label', 'CodeBops');
    const shine = el('div', 'logo-shine', logoBox);
    // Inline the logo, and mask the glint with the SAME (inlined) art via a
    // data-URI so it works from a single-file build too — no external URL.
    void loadSvg('./art/splash-logo.svg').then((text) => {
      logoBox.insertAdjacentHTML('afterbegin', text);
      const uri = `url("data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(text)))}")`;
      shine.style.webkitMaskImage = uri;
      shine.style.maskImage = uri;
      logoBox.classList.add('loaded');
    });
    logoBox.addEventListener('pointerdown', () => {
      sharedSfx.play('star');
      logoBox.classList.remove('replay');
      void logoBox.offsetWidth;
      logoBox.classList.add('replay');
    });
    // Words and buttons in one group, so a short landscape phone can put
    // them beside the logo instead of stacking everything off the bottom.
    const actions = el('div', 'title-actions', card);
    // The line used to sit in a cream pill, which read as a label stuck
    // onto the art rather than part of it. White on the sky, with the
    // wordmark's own navy outline holding it legible.
    const TAGLINE = ['Teach tiny helpers.', 'Build big ideas.'];
    const tag = el('div', 'title-tag', actions);
    tag.setAttribute('role', 'text');
    tag.setAttribute('aria-label', TAGLINE.join(' '));
    // One element per SENTENCE, each a row of words. Where there is room
    // the two sit side by side; where there is not they wrap — and
    // because the sentence is the unit that wraps, the break always
    // falls between the two thoughts instead of inside one of them.
    let n = 0;
    for (const sentence of TAGLINE) {
      const line = el('span', 'tag-line', tag);
      for (const word of sentence.split(' ')) {
        const w = el('span', 'tag-word', line, word);
        w.setAttribute('aria-hidden', 'true');
        w.style.setProperty('--i', String(n++));
      }
    }
    const play = el('button', 'btn-play', actions);
    play.type = 'button';
    play.setAttribute('aria-label', 'Play CodeBops');
    el('span', 'gloss', play);
    play.append('PLAY');
    el('span', 'tri', play);
    play.addEventListener('click', () => {
      sharedSfx.play('bop');
      this.showSelect();
    });

    // My Garden and Big Ideas used to sit under Play. Three stacked
    // buttons made the splash a menu, and neither is where a child goes
    // first — Play is. Both are still one tap away from where they
    // belong: the Garden from the star pill on the island header, Big
    // Ideas from the App Lab's own footer.

    // Grown-Up Campfire (hold-to-open gate, bottom corner)
    createCampfireGate(screen, () => {
      this.store = new SaveStore();
      showCampfire(screen, this.store, () => { /* progress reset */ });
    });

  }

  // ---------- level select ----------

  private showSelect(): void {
    this.guard('level select', () => this.buildSelect());
  }

  private buildSelect(): void {
    this.clearHost();
    this.store = new SaveStore(); // re-read stars earned in the last session
    const screen = el('section', 'screen', this.host);
    screen.id = 'screen-select';
    const dailyIdx = dailyLevelIndex();
    this.select = new LevelSelectScreen(screen, this.store, {
      onBack: () => this.showTitle(),
      onPlayLevel: (index) => this.showGame(index),
      onPlayDaily: (index) => this.showGame(index, {
        onSuccess: () => {
          const streak = this.store.completeDaily();
          // Land the streak toast after the celebration dialog mounts.
          window.setTimeout(() => this.streakToast(streak), 900);
        },
      }),
      onPlayGearworks: (seqIndex) => this.showGearworks(seqIndex),
      onGearworksTrophy: () => { sharedSfx.play('bop'); this.showGearworksTrophy(); },
      onAppLab: () => { sharedSfx.play('bop'); this.showAppLab(); },
      onGarden: () => this.showGarden(),
      onHelpers: () => this.showHelpers(),
      onEditor: () => this.showEditor(),
      onCustom: (custom) => this.showCustomGame(custom),
      onDeleteCustom: (id) => { deleteCustomLevel(id); this.showSelect(); },
    }, {
      index: dailyIdx,
      level: ALL_LEVELS[dailyIdx],
      doneToday: this.store.daily.lastCompleted === dayStamp(),
    });
    this.select.enter();
  }

  private streakToast(streak: number): void {
    document.querySelector('.app-toast')?.remove();
    const t = el('div', 'toast app-toast streak-toast', this.host,
      `🔥 Daily Bop streak: ${streak} day${streak === 1 ? '' : 's'}! A golden flower joins your garden 🌻`);
    window.setTimeout(() => t.remove(), 3400);
  }

  // ---------- game ----------

  private showGame(index: number, opts: { onSuccess?: () => void } = {}): void {
    this.guard('level', () => this.buildGame(index, opts));
  }

  private buildGame(index: number, opts: { onSuccess?: () => void } = {}): void {
    this.clearHost();
    this.setNeedsLandscape(true);
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
    this.guard('custom level', () => this.buildCustomGame(level));
  }

  private buildCustomGame(level: LevelDef): void {
    this.clearHost();
    this.setNeedsLandscape(true);
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
    this.guard('Gearworks', () => this.buildGearworks(index));
  }

  private buildGearworks(index: number): void {
    this.clearHost();
    this.setNeedsLandscape(true);
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
              : entry.kind === 'counter'
                ? new GearworksCounterScreen(screen, entry.level, events)
                : entry.kind === 'jam'
                  ? new GearworksJamScreen(screen, entry.level, events)
                  : entry.kind === 'job'
                    ? new GearworksJobScreen(screen, entry.level, events)
                    : entry.kind === 'signal'
                      ? new GearworksSignalScreen(screen, entry.level, events)
                      : entry.kind === 'debug'
                        ? new GearworksDebugScreen(screen, entry.level, events)
                        : entry.kind === 'orchestra'
                          ? new GearworksOrchestraScreen(screen, entry.level, events)
                          : entry.kind === 'lighthouse'
                            ? new GearworksLighthouseScreen(screen, entry.level, events)
                            : entry.kind === 'delivery'
                              ? new GearworksDeliveryScreen(screen, entry.level, events)
                              : entry.kind === 'painter'
                                ? new GearworksPaintScreen(screen, entry.level, events)
                                : entry.kind === 'story'
                                  ? new GearworksStoryScreen(screen, entry.level, events)
                                  : new GearworksMakerScreen(screen, entry.level, events);
    this.gearworks.enter();
  }

  // ---------- gearworks trophy room ----------

  private showGearworksTrophy(): void {
    this.guard('trophy room', () => this.buildGearworksTrophy());
  }

  private buildGearworksTrophy(): void {
    this.clearHost();
    this.store = new SaveStore(); // read the latest stars
    const screen = el('section', 'screen', this.host);
    screen.id = 'screen-gw-trophy';
    this.trophy = new GearworksTrophyScreen(screen, this.store, {
      onBack: () => this.showSelect(),
    });
    this.trophy.enter();
  }

  // ---------- Zip's App Lab ----------

  private showAppLab(): void {
    this.guard('App Lab', () => this.buildAppLab());
  }

  private buildAppLab(): void {
    this.clearHost();
    this.store = new SaveStore(); // read the evidence that unlocks kits
    const screen = el('section', 'screen', this.host);
    screen.id = 'screen-applab';
    this.appLab = new AppLabScreen(screen, this.store, {
      onBack: () => this.showSelect(),
      onOpenJourney: () => this.showJourney(),
      onOpenKit: (kit) => this.showCreator(kit),
      onOpenLibrary: () => this.showAppLibrary(),
    });
    this.appLab.enter();
  }

  private showAppLibrary(): void {
    this.guard('app library', () => this.buildAppLibrary());
  }

  private buildAppLibrary(): void {
    this.clearHost();
    const screen = el('section', 'screen', this.host);
    screen.id = 'screen-app-library';
    this.library = new AppLibraryScreen(screen, {
      onBack: () => this.showAppLab(),
      onPlay: (project) => this.showCreator(null, project, 'play'),
      onEdit: (project) => this.showCreator(null, project, 'edit'),
    });
    this.library.enter();
  }

  private showCreator(
    kit: AppKitDefinition | null, project?: MiniAppProject, open?: 'play' | 'edit',
  ): void {
    this.guard('creator', () => this.buildCreator(kit, project, open));
  }

  private buildCreator(
    kit: AppKitDefinition | null, project?: MiniAppProject, open?: 'play' | 'edit',
  ): void {
    this.clearHost();
    const screen = el('section', 'screen', this.host);
    screen.id = 'screen-creator';
    this.creator = new AppCreatorScreen(screen, kit, this.store, {
      onExitToLab: () => this.showAppLab(),
      onExitToLibrary: () => this.showAppLibrary(),
    });
    this.creator.enter(project, open);
  }

  // ---------- learning garden (curriculum map) ----------

  private showJourney(): void {
    this.guard('journey map', () => this.buildJourney());
  }

  private buildJourney(): void {
    this.clearHost();
    this.store = new SaveStore(); // read the evidence recorded while playing
    const screen = el('section', 'screen', this.host);
    screen.id = 'screen-journey';
    this.journey = new JourneyScreen(screen, this.store, {
      onBack: () => this.showTitle(),
    });
    this.journey.enter();
  }

  // ---------- garden ----------

  private showGarden(): void {
    this.guard('garden', () => this.buildGarden());
  }

  private buildGarden(): void {
    this.clearHost();
    this.store = new SaveStore();
    const screen = el('section', 'screen', this.host);
    screen.id = 'screen-garden';
    this.garden = new GardenScreen(screen, this.store, {
      onBack: () => this.showTitle(),
    });
    this.garden.enter();
  }

  // ---------- helpers (Agent Mission Builder) ----------

  private showHelpers(): void {
    this.guard('helpers', () => this.buildHelpers());
  }

  private buildHelpers(): void {
    this.clearHost();
    // A fresh store, like the garden and the journey: the builder writes
    // evidence, and coming back to a stale copy would show a child their
    // own helper missing from the map.
    this.store = new SaveStore();
    const screen = el('section', 'screen', this.host);
    screen.id = 'screen-helpers';
    this.helpers = new MissionScreen(screen, this.store, {
      onBack: () => this.showSelect(),
    });
    this.helpers.enter();
  }

  // ---------- editor ----------

  private showEditor(): void {
    this.guard('editor', () => this.buildEditor());
  }

  private buildEditor(): void {
    this.clearHost();
    const screen = el('section', 'screen', this.host);
    screen.id = 'screen-editor';
    this.editor = new EditorScreen(screen, {
      onBack: () => this.showSelect(),
      onPlay: (level) => {
        this.clearHost();
        this.setNeedsLandscape(true);
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
