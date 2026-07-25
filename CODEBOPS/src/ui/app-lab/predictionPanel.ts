/**
 * Prediction screen (spec §9.5) — "what will your app do?"
 *
 * The choices are generated from the child's ACTUAL scripts, so predicting
 * means reading their own program rather than guessing between made-up
 * options. There is no wrong answer that costs anything: the prediction is
 * remembered so the celebration can say "and you called it", and that is
 * all it is for.
 *
 * Every choice carries a picture as well as words — a three-year-old must
 * be able to answer this without reading.
 */
import { el } from '../dom';
import { sharedSfx } from '../../audio/sfx';
import type { MiniAppProject } from '../../creator/miniAppProject';
import { describeCommand, describeTrigger } from '../../creator/miniAppChoices';

export interface PredictionChoice {
  readonly id: string;
  readonly glyph: string;
  readonly label: string;
  /** True for the outcome the program actually describes. */
  readonly correct: boolean;
}

/**
 * Build two or three outcomes: what the first script really does, and one
 * or two near-misses drawn from the same project so nothing feels random.
 */
export function predictionChoices(project: MiniAppProject): PredictionChoice[] {
  const withSteps = project.scripts.filter((s) => s.commands.length > 0);
  if (withSteps.length === 0) return [];

  const script = withSteps[0];
  const real = describeCommand(project, script.commands[0]);
  const out: PredictionChoice[] = [
    { id: 'real', glyph: '✅', label: real, correct: true },
  ];

  // A near-miss from a LATER step of the same script reads as plausible —
  // the child has to notice the order, not just recognise a word.
  const later = script.commands[1];
  if (later) {
    const alt = describeCommand(project, later);
    if (alt !== real) out.push({ id: 'later', glyph: '🤔', label: alt, correct: false });
  }
  // Otherwise borrow another script's first step.
  if (out.length < 2) {
    const other = withSteps.find((s) => s.id !== script.id);
    if (other) {
      const alt = describeCommand(project, other.commands[0]);
      if (alt !== real) out.push({ id: 'other', glyph: '🤔', label: alt, correct: false });
    }
  }
  if (out.length < 2) out.push({ id: 'nothing', glyph: '😴', label: 'Nothing happens', correct: false });
  return out;
}

export interface PredictionEvents {
  readonly onAnswer: (predictedCorrectly: boolean) => void;
  readonly onSkip: () => void;
}

export class PredictionPanel {
  readonly root: HTMLElement;

  constructor(
    parent: HTMLElement,
    private readonly project: MiniAppProject,
    private readonly events: PredictionEvents,
  ) {
    this.root = el('div', 'pp-wrap', parent);
    this.render();
  }

  private render(): void {
    const script = this.project.scripts.find((s) => s.commands.length > 0);
    const choices = predictionChoices(this.project);

    el('h2', 'pp-title', this.root, 'What will your app do?');
    if (script) {
      el('p', 'pp-when', this.root, describeTrigger(this.project, script.trigger) + '…');
    }

    if (choices.length === 0) {
      el('p', 'pp-empty', this.root, 'Add a step first, then we can guess together!');
      const skip = el('button', 'btn-play small', this.root, 'Back') as HTMLButtonElement;
      skip.type = 'button';
      skip.addEventListener('click', () => { sharedSfx.play('tap'); this.events.onSkip(); });
      return;
    }

    const row = el('div', 'pp-choices', this.root);
    row.setAttribute('role', 'group');
    row.setAttribute('aria-label', 'Pick what you think will happen');
    for (const choice of choices) {
      const b = el('button', 'pp-choice', row) as HTMLButtonElement;
      b.type = 'button';
      b.setAttribute('aria-label', choice.label);
      el('span', 'pp-choice-glyph', b, choice.glyph);
      el('span', 'pp-choice-label', b, choice.label);
      b.addEventListener('click', () => {
        sharedSfx.play(choice.correct ? 'predictRight' : 'predictWrong');
        b.classList.add('picked');
        this.events.onAnswer(choice.correct);
      });
    }

    const skip = el('button', 'mini-btn pp-skip', this.root, 'Just try it →') as HTMLButtonElement;
    skip.type = 'button';
    skip.setAttribute('aria-label', 'Skip guessing and run the app');
    skip.addEventListener('click', () => { sharedSfx.play('tap'); this.events.onSkip(); });
  }

  dispose(): void {
    this.root.remove();
  }
}
