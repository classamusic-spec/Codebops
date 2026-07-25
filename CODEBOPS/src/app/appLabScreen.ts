/**
 * Zip's App Lab — the home screen (spec §9.1).
 *
 * Six stations in two rows of three, Zip standing by the one that is next.
 * A locked station is never a scolding: it shows what it will be about and
 * which idea the child is about to play with, so the wall reads as a map of
 * what is coming rather than a list of what is missing.
 *
 * Phase 1 is the shell: stations, lock state, curriculum badges, saved
 * counts and the library door. The kits themselves arrive in Phases 3–8.
 */
import { el } from '../ui/dom';
import { SaveStore } from '../storage/saveStore';
import { sharedSfx } from '../audio/sfx';
import { mountMascot } from '../rendering/mascotRig';
import {
  APP_LAB_WORLD, APP_KITS, APP_LAB_ALL_KITS, kitAvailability, waitingSentence, nextKit,
} from '../data/app-lab/appLabDefinition';
import type { AppKitDefinition } from '../data/app-lab/appLabDefinition';
import { templatesForType } from '../creator/miniAppTemplateRegistry';
import { MiniAppStore } from '../storage/miniAppStore';
import { hasDraft } from '../storage/miniAppDraft';
import { showSettings } from '../ui/dialogs';
import { applyAccessibility } from '../ui/a11y';
import {
  CREATOR_REWARDS, makerRecord, earnedRewards,
} from '../data/app-lab/creatorRewards';

export interface AppLabEvents {
  readonly onBack: () => void;
  /** Phase 2 wires this to the template picker. */
  readonly onOpenKit?: (kit: AppKitDefinition) => void;
  readonly onOpenLibrary?: () => void;
  readonly onOpenJourney?: () => void;
}

export class AppLabScreen {
  private readonly library = new MiniAppStore();
  private mascotStops: Array<() => void> = [];
  private disposed = false;

  constructor(
    private readonly root: HTMLElement,
    private readonly store: SaveStore,
    private readonly events: AppLabEvents,
  ) {}

  enter(): void {
    const screen = this.root;
    screen.classList.add('applab-screen');
    const log = this.store.evidence;
    const allOpen = this.store.isWorldUnlocked(APP_LAB_ALL_KITS);

    // ---- header ----
    const header = el('div', 'al-header', screen);
    const back = el('button', 'circle-btn', header, '←') as HTMLButtonElement;
    back.type = 'button';
    back.setAttribute('aria-label', 'Back');
    back.addEventListener('click', () => { sharedSfx.play('tap'); this.events.onBack(); });

    const titles = el('div', 'al-titles', header);
    el('h1', undefined, titles, `${APP_LAB_WORLD.glyph} ${APP_LAB_WORLD.name}`);
    el('p', undefined, titles, APP_LAB_WORLD.tagline);

    // Settings used to live only on a play screen's deck, which put calm
    // mode, contrast, handedness and watching speed out of reach of a
    // child who came straight to the Lab (§14).
    const settingsBtn = el('button', 'circle-btn al-settings', header, '⚙️') as HTMLButtonElement;
    settingsBtn.type = 'button';
    settingsBtn.setAttribute('aria-label', 'Settings');
    settingsBtn.addEventListener('click', () => {
      sharedSfx.play('tap');
      showSettings(this.root, this.store, sharedSfx, () => {
        applyAccessibility(this.store.settings);
        sharedSfx.enabled = this.store.settings.sound;
      });
    });

    const libBtn = el('button', 'al-library-btn', header) as HTMLButtonElement;
    libBtn.type = 'button';
    libBtn.setAttribute('aria-label', 'Open my App Library');
    el('span', undefined, libBtn, '🗂️');
    el('span', undefined, libBtn, 'My Apps');
    const libCount = el('span', 'al-lib-count', libBtn, '…');
    libBtn.addEventListener('click', () => {
      sharedSfx.play('bop');
      this.events.onOpenLibrary?.();
    });

    // ---- an unfinished app waiting to be picked up ----
    if (hasDraft()) {
      const note = el('div', 'al-draft-note', screen);
      el('span', undefined, note, '🚧');
      el('span', undefined, note, 'You have an app you were still building.');
    }

    // ---- the six stations ----
    const wall = el('div', 'al-wall', screen);
    const upNext = nextKit(log, allOpen);
    [...APP_KITS].sort((a, b) => a.order - b.order).forEach((kit, i) => {
      const availability = kitAvailability(kit, log, allOpen);
      const isNext = upNext?.id === kit.id;
      const card = el('div',
        `al-station${availability.unlocked ? '' : ' locked'}${isNext ? ' up-next' : ''}`, wall);
      card.style.setProperty('--i', String(i));

      const badge = el('div', 'al-station-badge', card);
      el('span', 'al-station-glyph', badge, kit.glyph);
      if (!availability.unlocked) el('span', 'al-station-lock', badge, '🔒');
      if (isNext && availability.unlocked) el('span', 'al-station-next', badge, '✨');

      el('div', 'al-station-name', card, kit.name);
      el('div', 'al-station-blurb', card,
        availability.unlocked ? kit.blurb : kit.lockedBlurb);

      // Curriculum badge — the ideas this station uses, in child words.
      const concepts = el('div', 'al-station-concepts', card);
      const templates = templatesForType(kit.type);
      const taught = templates[0]?.conceptsTaught ?? [];
      for (const c of taught.slice(0, 3)) el('span', 'al-concept-chip', concepts, c);

      const foot = el('div', 'al-station-foot', card);
      const saved = el('span', 'al-station-saved', foot, '');
      void this.library.countForType(kit.type).then((n) => {
        if (this.disposed) return;
        saved.textContent = n === 0 ? '' : `${n} saved`;
      });

      const open = el('button', 'al-station-open', foot) as HTMLButtonElement;
      open.type = 'button';
      if (availability.unlocked) {
        open.append('Open');
        open.setAttribute('aria-label', `Open ${kit.name}`);
        open.addEventListener('click', () => {
          sharedSfx.play('bop');
          if (this.events.onOpenKit) this.events.onOpenKit(kit);
          else this.toast(`🔧 ${kit.name} opens in the next phase of the Lab!`);
        });
      } else {
        open.append('Soon');
        open.classList.add('locked');
        open.setAttribute('aria-label', `${kit.name} — not open yet`);
        const waiting = waitingSentence(availability.waitingOn);
        open.addEventListener('click', () => {
          sharedSfx.play('bump');
          card.classList.remove('shake');
          void card.offsetWidth;
          card.classList.add('shake');
          this.toast(waiting || '🔧 Zip is still building this station!');
        });
      }
    });

    // ---- the maker's shelf: badges earned, decorations hung up (§13) ----
    const shelf = el('div', 'al-shelf', screen);
    shelf.hidden = true;
    void this.library.list().then((saved) => {
      if (this.disposed) return;
      this.renderShelf(shelf, makerRecord(log, saved));
    });

    // ---- footer: where the ideas live, with Zip standing alongside ----
    const foot = el('div', 'al-foot', screen);
    const journey = el('button', 'mini-btn purple', foot, '🌱 My Big Ideas') as HTMLButtonElement;
    journey.type = 'button';
    journey.addEventListener('click', () => {
      sharedSfx.play('tap');
      this.events.onOpenJourney?.();
    });
    const note = el('span', 'al-foot-note', foot, '');

    const zipBox = el('div', 'al-zip', foot);
    zipBox.setAttribute('role', 'img');
    zipBox.setAttribute('aria-label', 'Zip');
    const zipMascot = mountMascot(zipBox, 'zip', {
      calm: this.store.settings.calmMode, followPointer: true,
    });
    this.mascotStops.push(() => zipMascot.destroy());
    void this.library.isDurable().then(async (durable) => {
      if (this.disposed) return;
      const n = await this.library.count();
      if (this.disposed) return;
      libCount.textContent = String(n);
      note.textContent = durable
        ? 'Your apps are saved on this device only.'
        : 'Saving is unavailable in this browser — apps will not be kept.';
    });
  }

  /**
   * Badges, decorations and skies a child has collected (§13). Things not
   * yet earned are shown too — dimmed, with the invitation that opens
   * them — because a shelf with room on it is an idea, not a scoreboard.
   * There is no count, no fraction and no "x of y" anywhere.
   */
  private renderShelf(shelf: HTMLElement, record: ReturnType<typeof makerRecord>): void {
    const earned = new Set(earnedRewards(record).map((r) => r.id));
    if (earned.size === 0) return; // nothing to show a brand-new maker yet
    shelf.hidden = false;

    const head = el('div', 'al-shelf-head', shelf);
    el('span', undefined, head, '🏅');
    el('span', undefined, head, 'Things you have collected');

    const row = el('div', 'al-shelf-row', shelf);
    CREATOR_REWARDS.forEach((reward, i) => {
      const got = earned.has(reward.id);
      const item = el('div', `al-collect${got ? '' : ' waiting'}`, row);
      item.style.setProperty('--i', String(i));
      item.setAttribute('role', 'img');
      item.setAttribute('aria-label', got
        ? `${reward.name} — earned. ${reward.childLine}`
        : `${reward.name} — ${reward.invitation}`);
      el('span', 'al-collect-glyph', item, got ? reward.glyph : '·');
      el('span', 'al-collect-name', item, reward.name);
      // The tooltip is the invitation, so hovering never reads as a telling-off.
      item.title = got ? reward.childLine : reward.invitation;
    });

    // Decorations actually get hung on the wall, not just listed.
    const decor = earnedRewards(record).filter((r) => r.kind === 'decoration');
    if (decor.length > 0) {
      const hung = el('div', 'al-decor', shelf);
      hung.setAttribute('aria-hidden', 'true');
      for (const d of decor) el('span', 'al-decor-item', hung, d.glyph);
    }
  }

  private toast(text: string): void {
    this.root.querySelector('.al-toast')?.remove();
    const t = el('div', 'toast al-toast', this.root, text);
    window.setTimeout(() => t.remove(), 2600);
  }

  dispose(): void {
    this.disposed = true;
    for (const stop of this.mascotStops) stop();
    this.mascotStops = [];
    this.root.classList.remove('applab-screen');
    this.root.innerHTML = '';
  }
}
