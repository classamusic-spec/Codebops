/**
 * The Learning Journey — the child-facing curriculum map (addendum §9).
 *
 * Fourteen concept badges on a winding path, each a seed that grows into
 * a shining bloom as the child shows what they can do. Deliberately not a
 * syllabus: no grades, no percentages, no ranks, and nothing that
 * compares one child to another. A badge that has not been met yet simply
 * says what it will be about.
 */
import { el } from '../ui/dom';
import { SaveStore } from '../storage/saveStore';
import { sharedSfx } from '../audio/sfx';
import { CURRICULUM_STAGES, worldsForStage } from '../data/curriculum/stages';
import type { CurriculumStageId } from '../data/curriculum/stages';
import { stageMastery, childTier } from '../data/curriculum/mastery';

const WORLD_LABEL: Record<string, string> = {
  'sparkle-meadow': 'Sparkle Meadow',
  'bubble-bay': 'Bubble Bay',
  'pattern-forest': 'Pattern Forest',
  'robot-town': 'Robot Town',
  'gearworks-garage': 'Gearworks Garage',
  'agent-academy': 'Agent Academy',
  'imagination-island': 'Imagination Island',
};

export class JourneyScreen {
  constructor(
    private readonly root: HTMLElement,
    private readonly store: SaveStore,
    private readonly events: { onBack: () => void },
  ) {}

  enter(): void {
    const screen = this.root;
    screen.classList.add('journey-screen');
    const log = this.store.evidence;

    const header = el('div', 'jr-header', screen);
    const back = el('button', 'circle-btn', header, '←');
    back.type = 'button';
    back.setAttribute('aria-label', 'Back');
    back.addEventListener('click', () => { sharedSfx.play('tap'); this.events.onBack(); });
    const titles = el('div', 'jr-titles', header);
    el('h1', undefined, titles, '🌱 My Learning Garden');
    const grown = CURRICULUM_STAGES
      .filter((s) => stageMastery(s.id, log).state !== 'not-introduced').length;
    el('p', undefined, titles, grown === 0
      ? 'Every big idea starts as a seed. Play to help them grow!'
      : `You have started growing ${grown} of ${CURRICULUM_STAGES.length} big ideas.`);

    const path = el('div', 'jr-path', screen);
    CURRICULUM_STAGES.forEach((s, i) => {
      const m = stageMastery(s.id, log);
      const tier = childTier(m.state);
      const card = el('div', `jr-badge tier-${tier.key}`, path);
      card.style.setProperty('--i', String(i));
      card.setAttribute('aria-label',
        `${s.childFacingLanguage} ${tier.label}. ${m.metRequirements.length} of ${m.totalRequirements} things shown.`);

      const medal = el('div', 'jr-medal', card);
      el('span', 'jr-icon', medal, s.icon);
      el('span', 'jr-tier', medal, tier.icon);

      el('div', 'jr-phrase', card, s.childFacingLanguage);
      el('div', 'jr-tierlabel', card, tier.label);

      // progress as pips, never a number or a percentage
      const pips = el('div', 'jr-pips', card);
      for (let k = 0; k < m.totalRequirements; k++) {
        el('span', k < m.metRequirements.length ? 'on' : '', pips, '●');
      }

      const worlds = el('div', 'jr-worlds', card);
      el('span', 'jr-worlds-label', worlds, 'Found in');
      for (const w of worldsForStage(s.id as CurriculumStageId).slice(0, 3)) {
        el('span', 'jr-world-chip', worlds, WORLD_LABEL[w] ?? w);
      }
    });
  }

  dispose(): void {
    this.root.classList.remove('journey-screen');
    this.root.innerHTML = '';
  }
}
