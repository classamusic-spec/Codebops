/**
 * Template picker (spec §9.2) — "here are some apps already going; pick
 * one and make it yours."
 *
 * Difficulty is shown as shapes, never as a grade or a number, and every
 * card names the ideas the app uses so a child can recognise something
 * they have played with before.
 */
import { el } from '../dom';
import { sharedSfx } from '../../audio/sfx';
import type { AppKitDefinition } from '../../data/app-lab/appLabDefinition';
import { templatesForType } from '../../creator/miniAppTemplateRegistry';
import { startersForTemplate } from '../../creator/miniAppProjectFactory';
import type { StarterDefinition } from '../../creator/miniAppProjectFactory';
import { APP_LAB_THEMES } from '../../data/app-lab/approvedAssets';
import { creatorReward } from '../../data/app-lab/creatorRewards';
import { backButton } from '../components/button';

/** The child-facing sentence that says how a sky opens. */
function themeInvitation(rewardId: string | undefined): string {
  return creatorReward(rewardId ?? '')?.invitation ?? 'This sky opens later.';
}

export interface TemplatePickerEvents {
  readonly onPick: (starter: StarterDefinition, themeId: string) => void;
  readonly onBack: () => void;
  /** Reward ids the child has earned, for the extra skies (§13). */
  readonly earnedRewardIds?: readonly string[];
  /** Explains a sky that is not open yet, rather than doing nothing. */
  readonly onLockedTheme?: (invitation: string) => void;
}

export class TemplatePicker {
  private themeId = APP_LAB_THEMES[0].id;

  constructor(
    private readonly parent: HTMLElement,
    private readonly kit: AppKitDefinition,
    private readonly events: TemplatePickerEvents,
  ) {}

  /** The seven world skies are always open; earned ones need their reward. */
  private themeOpen(theme: { readonly unlockedBy?: string }): boolean {
    if (!theme.unlockedBy) return true;
    return (this.events.earnedRewardIds ?? []).includes(theme.unlockedBy);
  }

  render(): void {
    const wrap = el('div', 'tp-wrap', this.parent);

    const head = el('div', 'tp-head', wrap);
    backButton(head, () => { sharedSfx.play('tap'); this.events.onBack(); }, 'Back to the App Lab');
    const titles = el('div', 'tp-titles', head);
    el('h2', undefined, titles, `${this.kit.glyph} ${this.kit.name}`);
    el('p', undefined, titles, 'Pick one to start with — you can change everything.');

    // ---- theme portals (spec §7 step 2) ----
    el('div', 'tp-section-title', wrap, 'Where does it happen?');
    const themes = el('div', 'tp-themes', wrap);
    themes.setAttribute('role', 'radiogroup');
    themes.setAttribute('aria-label', 'Choose a place');
    const themeBtns: HTMLButtonElement[] = [];
    for (const theme of APP_LAB_THEMES) {
      const open = this.themeOpen(theme);
      const b = el('button',
        `tp-theme${theme.id === this.themeId ? ' on' : ''}${open ? '' : ' waiting'}`,
        themes) as HTMLButtonElement;
      b.type = 'button';
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-checked', String(theme.id === this.themeId));
      b.setAttribute('aria-label', open ? theme.label : `${theme.label} — not open yet`);
      el('span', 'tp-theme-glyph', b, open ? theme.glyph : '🔒');
      el('span', 'tp-theme-name', b, theme.label);
      b.addEventListener('click', () => {
        if (!open) {
          // A sky that is not open yet explains itself rather than doing
          // nothing — the same shape as a locked station.
          sharedSfx.play('bump');
          this.events.onLockedTheme?.(themeInvitation(theme.unlockedBy));
          return;
        }
        sharedSfx.play('tap');
        this.themeId = theme.id;
        themeBtns.forEach((x, i) => {
          const on = APP_LAB_THEMES[i].id === this.themeId;
          x.classList.toggle('on', on);
          x.setAttribute('aria-checked', String(on));
        });
      });
      themeBtns.push(b);
    }

    // ---- starters ----
    el('div', 'tp-section-title', wrap, 'What shall we build?');
    const grid = el('div', 'tp-grid', wrap);
    const templates = templatesForType(this.kit.type);
    for (const template of templates) {
      for (const starter of startersForTemplate(template.id)) {
        const card = el('button', 'tp-card', grid) as HTMLButtonElement;
        card.type = 'button';
        card.setAttribute('aria-label', `${starter.label}. ${starter.blurb}`);

        const preview = el('div', 'tp-preview', card);
        el('span', 'tp-preview-glyph', preview, starter.glyph);

        el('div', 'tp-card-name', card, starter.label);
        el('div', 'tp-card-blurb', card, starter.blurb);

        const concepts = el('div', 'tp-card-concepts', card);
        for (const c of template.conceptsTaught.slice(0, 3)) {
          el('span', 'tp-concept', concepts, c);
        }

        // Difficulty as shapes, never a grade (spec §9.2).
        const diff = el('div', 'tp-difficulty', card);
        diff.setAttribute('aria-label',
          `${'●'.repeat(template.difficultyShapes)} of three — how much this one does`);
        for (let i = 0; i < 3; i++) {
          el('span', i < template.difficultyShapes ? 'on' : '', diff, '◆');
        }

        card.addEventListener('click', () => {
          sharedSfx.play('bop');
          this.events.onPick(starter, this.themeId);
        });
      }
    }
  }
}
