/**
 * "Look what you made" — the celebration for a newly earned reward (§13).
 *
 * Zip cheers making; Mixy cheers fixing. Which one shows up is a property
 * of the reward, so a child learns that the two of them care about
 * different things: Zip is delighted you built it, Mixy is delighted you
 * repaired it.
 *
 * Rules it keeps: it never compares, never counts down, never says how
 * many are left, and it can always be dismissed with one tap. It also
 * never blocks — if a child taps past it, nothing is lost, because the
 * reward is derived from evidence rather than handed out here.
 */
import { el } from '../dom';
import { sharedSfx } from '../../audio/sfx';
import { mountMascot } from '../../rendering/mascotRig';
import type { CreatorReward } from '../../data/app-lab/creatorRewards';

const HEADLINE: Readonly<Record<CreatorReward['kind'], string>> = {
  badge: 'You earned a badge!',
  theme: 'A new sky!',
  decoration: 'Something new for the Lab!',
  frame: 'A new frame for your apps!',
};

/** One kind gets its own words; a mixed handful gets the general cheer. */
function headlineFor(rewards: readonly CreatorReward[]): string {
  const kinds = new Set(rewards.map((r) => r.kind));
  return kinds.size === 1 ? HEADLINE[rewards[0].kind] : 'Look what you made!';
}

const CHEER: Readonly<Record<'zip' | 'mixy', { name: string; line: string }>> = {
  zip: { name: 'Zip', line: 'Zip is doing a little hop.' },
  mixy: { name: 'Mixy', line: 'Mixy is very pleased.' },
};

/**
 * Show one card per reward, in order, on one scrim. Several at once is
 * common (saving a first app can earn a badge and a decoration) and a
 * queue of full-screen takeovers would be exhausting, so they stack.
 */
export function showCreatorCelebration(
  parent: HTMLElement,
  rewards: readonly CreatorReward[],
  opts: { readonly calmMode?: boolean; readonly onClose?: () => void } = {},
): HTMLElement | null {
  if (rewards.length === 0) return null;
  sharedSfx.play('celebrate');

  const scrim = el('div', 'dialog-scrim cc-scrim', parent);
  const dlg = el('div', `dialog cc${opts.calmMode ? ' calm' : ''}`, scrim);
  dlg.setAttribute('role', 'dialog');
  const headline = headlineFor(rewards);
  dlg.setAttribute('aria-label', headline);

  // The character who cares about the FIRST reward greets the child.
  const cheer = CHEER[rewards[0].cheeredBy];
  const mascot = el('div', 'cc-mascot', dlg);
  mascot.setAttribute('role', 'img');
  mascot.setAttribute('aria-label', cheer.name);
  // The cheering character actually cheers: a one-shot happy clip that
  // settles back to idle on its own.
  const rig = mountMascot(mascot, rewards[0].cheeredBy, {
    calm: opts.calmMode === true, start: 'happy', face: 'happy',
  });

  el('h2', 'cc-headline', dlg, headline);

  const list = el('div', 'cc-list', dlg);
  rewards.forEach((reward, i) => {
    const row = el('div', 'cc-row', list);
    row.style.setProperty('--i', String(i));
    el('span', 'cc-glyph', row, reward.glyph);
    const words = el('div', 'cc-words', row);
    el('div', 'cc-name', words, reward.name);
    el('div', 'cc-line', words, reward.childLine);
  });

  el('p', 'cc-cheer', dlg, cheer.line);

  const done = el('button', 'btn-play small', dlg, '🎉 Yay!') as HTMLButtonElement;
  done.type = 'button';
  const close = (): void => {
    rig.destroy();
    scrim.remove();
    opts.onClose?.();
  };
  done.addEventListener('click', () => { sharedSfx.play('tap'); close(); });
  done.focus();
  scrim.addEventListener('click', (e) => { if (e.target === scrim) close(); });
  return scrim;
}
