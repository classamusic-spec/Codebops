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
import { inlineSvgInto } from '../rendering/spriteCharacter';
import {
  APP_LAB_WORLD, APP_KITS, APP_LAB_ALL_KITS, kitAvailability, waitingSentence, nextKit,
} from '../data/app-lab/appLabDefinition';
import type { AppKitDefinition } from '../data/app-lab/appLabDefinition';
import { templatesForType } from '../creator/miniAppTemplateRegistry';
import { MiniAppStore } from '../storage/miniAppStore';
import { hasDraft } from '../storage/miniAppDraft';

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
    void inlineSvgInto(zipBox, './art/characters/zip/zip.svg').then((svg) => {
      if (this.disposed || !svg) return;
      zipBox.classList.add('ready');
    });
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
