/**
 * The App Library (spec §9.8, §21) — the shelf a child's finished apps sit on.
 *
 * Big cards with a picture of the app, and four things you can do: play it,
 * change it, make another one like it, or take it away. Deleting is behind a
 * grown-up hold, because a child tapping ✕ on a week of work should not be
 * one tap away from losing it.
 *
 * There is no publishing here and no way to reach one. The library is this
 * device's shelf and nothing else.
 */
import { el } from '../ui/dom';
import { sharedSfx } from '../audio/sfx';
import { showToast } from '../ui/dialogs';
import type { MiniAppProject } from '../creator/miniAppProject';
import { titleText } from '../creator/miniAppProject';
import type { MiniAppSummary } from '../storage/miniAppStore';
import { MiniAppStore } from '../storage/miniAppStore';
import { thumbnailFor, thumbnailSummary } from '../creator/miniAppThumbnail';
import { appKitForType } from '../data/app-lab/appLabDefinition';
import { APP_LAB_THEMES } from '../data/app-lab/approvedAssets';
import { TITLE_TOKENS, tokensInGroup, titleToken } from '../data/app-lab/preparedTitleTokens';
import { duplicateProject } from '../creator/miniAppProjectFactory';

export interface AppLibraryEvents {
  readonly onBack: () => void;
  readonly onPlay: (project: MiniAppProject) => void;
  readonly onEdit: (project: MiniAppProject) => void;
}

let dupCounter = 0;

export class AppLibraryScreen {
  private readonly store = new MiniAppStore();
  private disposed = false;
  private grid!: HTMLElement;
  private emptyNote!: HTMLElement;

  constructor(
    private readonly root: HTMLElement,
    private readonly events: AppLibraryEvents,
  ) {}

  enter(): void {
    this.root.classList.add('lib-screen');

    const header = el('div', 'lib-header', this.root);
    const back = el('button', 'circle-btn', header, '←') as HTMLButtonElement;
    back.type = 'button';
    back.setAttribute('aria-label', 'Back to the App Lab');
    back.addEventListener('click', () => { sharedSfx.play('tap'); this.events.onBack(); });
    const titles = el('div', 'lib-titles', header);
    el('h1', undefined, titles, '🗂️ My Apps');
    el('p', undefined, titles, 'Everything you have built, kept on this device.');

    this.grid = el('div', 'lib-grid', this.root);
    this.emptyNote = el('div', 'lib-empty', this.root);
    this.emptyNote.hidden = true;
    el('span', 'lib-empty-glyph', this.emptyNote, '🧪');
    el('p', undefined, this.emptyNote,
      'No apps yet! Pick a station in the Lab and build your first one.');

    void this.refresh();
  }

  private async refresh(): Promise<void> {
    const list = await this.store.list();
    if (this.disposed) return;
    this.grid.innerHTML = '';
    this.emptyNote.hidden = list.length > 0;
    for (const summary of list) this.renderCard(summary);
  }

  private renderCard(summary: MiniAppSummary): void {
    const card = el('div', `lib-card${summary.needsRepair ? ' needs-repair' : ''}`, this.grid);
    const kit = appKitForType(summary.type);
    const theme = APP_LAB_THEMES.find((t) => t.id === summary.themeId);

    const shot = el('div', 'lib-shot', card);
    shot.setAttribute('role', 'img');
    const name = summary.titleTokens
      .map((t) => titleToken(t)?.word ?? '')
      .filter(Boolean)
      .join(' ') + (summary.titleVersion && summary.titleVersion > 1 ? ` ${summary.titleVersion}` : '');
    shot.setAttribute('aria-label', `${name}, a ${kit?.name ?? summary.type} app`);

    const meta = el('div', 'lib-meta', card);
    el('div', 'lib-name', meta, name || 'My App');
    const chips = el('div', 'lib-chips', meta);
    el('span', 'lib-chip', chips, `${kit?.glyph ?? '🧪'} ${kit?.name ?? summary.type}`);
    if (theme) el('span', 'lib-chip', chips, `${theme.glyph} ${theme.label}`);
    const sub = el('div', 'lib-sub', meta, '');

    if (summary.needsRepair) {
      el('div', 'lib-repair', card, 'This one needs a little repair before it can run.');
    }

    const actions = el('div', 'lib-actions', card);
    const play = el('button', 'lib-btn play', actions, '▶ Play') as HTMLButtonElement;
    play.type = 'button';
    play.setAttribute('aria-label', `Play ${name}`);
    play.addEventListener('click', () => void this.open(summary.id, 'play'));

    const edit = el('button', 'lib-btn', actions, '✎ Change') as HTMLButtonElement;
    edit.type = 'button';
    edit.setAttribute('aria-label', `Change ${name}`);
    edit.addEventListener('click', () => void this.open(summary.id, 'edit'));

    const copy = el('button', 'lib-btn', actions, '⧉ Copy') as HTMLButtonElement;
    copy.type = 'button';
    copy.setAttribute('aria-label', `Make another one like ${name}`);
    copy.addEventListener('click', () => void this.duplicate(summary.id));

    const rename = el('button', 'lib-btn', actions, '🏷️ Name') as HTMLButtonElement;
    rename.type = 'button';
    rename.setAttribute('aria-label', `Choose a new name for ${name}`);
    rename.addEventListener('click', () => void this.rename(summary.id));

    // Deleting is a grown-up hold, not a tap.
    const del = el('button', 'lib-btn danger', actions, '🗑️') as HTMLButtonElement;
    del.type = 'button';
    del.setAttribute('aria-label', `Grown-ups: hold to remove ${name}`);
    this.holdToDelete(del, summary.id, name);

    // The picture and the counts need the whole project, so fill them in
    // once it has loaded rather than blocking the card.
    void this.store.load(summary.id).then(({ project }) => {
      if (this.disposed || !project) return;
      const img = el('img', undefined, shot) as HTMLImageElement;
      img.src = thumbnailFor(project);
      img.alt = '';
      sub.textContent = thumbnailSummary(project);
    });
  }

  /** A 1.2-second hold, the same gate the Campfire uses. */
  private holdToDelete(btn: HTMLButtonElement, id: string, name: string): void {
    let timer: number | null = null;
    const cancel = (): void => {
      if (timer !== null) window.clearTimeout(timer);
      timer = null;
      btn.classList.remove('holding');
    };
    btn.addEventListener('pointerdown', () => {
      btn.classList.add('holding');
      timer = window.setTimeout(() => {
        cancel();
        void this.remove(id, name);
      }, 1200);
    });
    for (const ev of ['pointerup', 'pointerleave', 'pointercancel']) {
      btn.addEventListener(ev, cancel);
    }
    // A plain tap explains the gate rather than doing nothing.
    btn.addEventListener('click', () => {
      if (btn.classList.contains('holding')) return;
      showToast(this.root, '🔒 Grown-ups: press and hold to remove this app.');
    });
  }

  private async open(id: string, how: 'play' | 'edit'): Promise<void> {
    const { project, repairMessage } = await this.store.load(id);
    if (this.disposed) return;
    if (!project) {
      // Try the copy from before the last save before giving up.
      const previous = await this.store.loadPrevious(id);
      if (previous) {
        sharedSfx.play('star');
        showToast(this.root, '🛟 Opened the version from before the last change.');
        if (how === 'play') this.events.onPlay(previous); else this.events.onEdit(previous);
        return;
      }
      sharedSfx.play('bump');
      showToast(this.root, repairMessage ?? 'That app could not be opened.');
      return;
    }
    sharedSfx.play('bop');
    if (how === 'play') this.events.onPlay(project); else this.events.onEdit(project);
  }

  private async duplicate(id: string): Promise<void> {
    const { project } = await this.store.load(id);
    if (this.disposed || !project) return;
    const siblings = (await this.store.list())
      .filter((s) => s.titleTokens.join() === project.title.tokens.join()).length;
    dupCounter += 1;
    const copy = duplicateProject(
      project,
      { id: `app-copy-${dupCounter}-${Date.now()}`, now: Date.now(), themeId: project.themeId },
      siblings + 1,
    );
    const outcome = await this.store.save(copy);
    if (this.disposed) return;
    if (outcome.ok) {
      sharedSfx.play('star');
      showToast(this.root, `⧉ Made another one: "${titleText(copy.title)}"`);
      await this.refresh();
    } else {
      sharedSfx.play('bump');
      showToast(this.root, outcome.childMessage ?? 'That could not be copied right now.');
    }
  }

  /** Rename from prepared tokens — there is no text field anywhere. */
  private async rename(id: string): Promise<void> {
    const { project } = await this.store.load(id);
    if (this.disposed || !project) return;

    const scrim = el('div', 'dialog-scrim', this.root);
    const dlg = el('div', 'dialog lib-rename', scrim);
    dlg.setAttribute('role', 'dialog');
    dlg.setAttribute('aria-label', 'Choose a name');
    el('h2', undefined, dlg, '🏷️ Choose a name');

    const chosen: string[] = [...project.title.tokens];
    const preview = el('div', 'lib-rename-preview', dlg, '');
    const draw = (): void => {
      preview.textContent = chosen.map((t) => titleToken(t)?.word ?? '').filter(Boolean).join(' ') || '…';
    };
    draw();

    for (const group of ['owner', 'describing', 'thing'] as const) {
      const row = el('div', 'lib-token-row', dlg);
      row.setAttribute('aria-label', group);
      for (const token of tokensInGroup(group)) {
        const b = el('button', `lib-token${chosen.includes(token.id) ? ' on' : ''}`, row) as HTMLButtonElement;
        b.type = 'button';
        b.setAttribute('aria-label', token.word);
        el('span', undefined, b, token.glyph);
        el('span', undefined, b, token.word);
        b.addEventListener('click', () => {
          sharedSfx.play('tap');
          // One word per group, so a name stays short and readable.
          const sameGroup = TITLE_TOKENS.filter((t) => t.group === group).map((t) => t.id);
          const already = chosen.includes(token.id);
          for (const id2 of sameGroup) {
            const at = chosen.indexOf(id2);
            if (at >= 0) chosen.splice(at, 1);
          }
          if (!already) chosen.push(token.id);
          row.querySelectorAll('.lib-token').forEach((n) => n.classList.remove('on'));
          if (!already) b.classList.add('on');
          draw();
        });
      }
    }

    const actions = el('div', 'dlg-actions', dlg);
    const cancel = el('button', 'mini-btn purple', actions, 'Never mind') as HTMLButtonElement;
    cancel.type = 'button';
    cancel.addEventListener('click', () => scrim.remove());
    const save = el('button', 'btn-play small', actions, 'Use this name') as HTMLButtonElement;
    save.type = 'button';
    save.addEventListener('click', () => {
      void (async () => {
        if (chosen.length === 0) {
          showToast(this.root, 'Pick at least one word for the name.');
          return;
        }
        // The trailing number only ever existed to tell two copies of the
        // SAME name apart. Choosing a different name retires it — "My
        // Helper 2" with no "My Helper 1" anywhere would just be confusing.
        const sameName = chosen.join() === project.title.tokens.join();
        const renamed = {
          ...project,
          title: { ...project.title, tokens: chosen, version: sameName ? project.title.version : 1 },
          updatedAt: Date.now(),
        };
        const outcome = await this.store.save(renamed);
        scrim.remove();
        if (this.disposed) return;
        if (outcome.ok) {
          sharedSfx.play('star');
          await this.refresh();
        } else {
          showToast(this.root, outcome.childMessage ?? 'That name could not be saved.');
        }
      })();
    });
  }

  private async remove(id: string, name: string): Promise<void> {
    await this.store.remove(id);
    if (this.disposed) return;
    sharedSfx.play('remove');
    showToast(this.root, `🗑️ "${name}" was removed.`);
    await this.refresh();
  }

  dispose(): void {
    this.disposed = true;
    this.root.classList.remove('lib-screen');
    this.root.innerHTML = '';
  }
}
