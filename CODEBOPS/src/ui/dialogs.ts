/** Accessible dialogs: prediction, celebration, glitch replay, settings. */
import { el } from './dom';
import type { ExecEvent } from '../gameplay/commands/interpreter';
import type { Sfx } from '../audio/sfx';
import type { SaveStore } from '../storage/saveStore';

function scrim(parent: HTMLElement): HTMLElement {
  return el('div', 'dialog-scrim', parent);
}

/** Remove a dialog and restore focus to the previously focused element. */
function closeDialog(node: HTMLElement, previousFocus: Element | null): void {
  node.remove();
  if (previousFocus instanceof HTMLElement) previousFocus.focus();
}

/* ---------------- Level brief ---------------- */

export function showBrief(
  parent: HTMLElement,
  level: { brief: { readonly title: string; readonly text: string; readonly emoji: string } },
  sfx: Sfx,
): Promise<void> {
  return new Promise((resolve) => {
    const previousFocus = document.activeElement;
    const s = scrim(parent);
    const d = el('div', 'dialog', s);
    d.setAttribute('role', 'dialog');
    d.setAttribute('aria-modal', 'true');
    d.setAttribute('aria-label', level.brief.title);
    el('div', 'intro-emoji', d, level.brief.emoji);
    el('h2', undefined, d, level.brief.title);
    el('p', undefined, d, level.brief.text);
    const go = el('button', 'mini-btn', d, "🚀 Let's go!");
    go.addEventListener('click', () => {
      sfx.play('bop');
      closeDialog(s, previousFocus);
      resolve();
    });
    go.focus();
  });
}

/* ---------------- Forever Fred (loop safety) ---------------- */

export function showFredDialog(parent: HTMLElement, sfx: Sfx, onFix: () => void): void {
  const previousFocus = document.activeElement;
  const s = scrim(parent);
  const d = el('div', 'dialog', s);
  d.setAttribute('role', 'dialog');
  d.setAttribute('aria-modal', 'true');
  d.setAttribute('aria-label', 'Forever Fred found a loop that never stops!');

  const head = el('div', 'goal-visual', d);
  const img = el('img', undefined, head) as HTMLImageElement;
  img.src = './art/characters/mixy/mixy.svg';
  img.alt = 'Forever Fred the GlitchBop';
  img.style.height = '84px';
  img.style.filter = 'hue-rotate(130deg) saturate(1.2)';
  el('h2', undefined, d, 'Whoa — Forever Fred!');

  el('p', undefined, d, 'That loop has no way to stop, so it spun around forever! Every Until loop needs a stopping condition — a bump, a grab, or reaching the goal.');

  const btns = el('div', 'dialog-actions', d);
  const fix = el('button', 'mini-btn', btns, '🛠 Fix My Loop');
  fix.addEventListener('click', () => { sfx.play('tap'); closeDialog(s, previousFocus); onFix(); });
  fix.focus();
}

/* ---------------- Prediction ---------------- */

export interface PredictionSpec {
  readonly prompt: string;
  readonly choices: ReadonlyArray<{ emoji: string; label: string; correct: boolean }>;
}

export function showPrediction(
  parent: HTMLElement,
  level: { prediction: PredictionSpec },
  sfx: Sfx,
): Promise<{ predictedSuccess: boolean }> {
  return new Promise((resolve) => {
    const previousFocus = document.activeElement;
    const s = scrim(parent);
    const d = el('div', 'dialog', s);
    d.setAttribute('role', 'dialog');
    d.setAttribute('aria-modal', 'true');
    d.setAttribute('aria-label', level.prediction.prompt);
    el('h2', undefined, d, '🔮 Make a Prediction!');
    el('p', undefined, d, level.prediction.prompt);
    const choices = el('div', 'dialog-choices', d);
    let answered = false;
    for (const choice of level.prediction.choices) {
      const card = el('button', 'choice-card', choices);
      el('span', 'big', card, choice.emoji);
      el('span', undefined, card, choice.label);
      card.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        sfx.play('tap');
        closeDialog(s, previousFocus);
        resolve({ predictedSuccess: choice.correct });
      });
    }
    (choices.querySelector('button') as HTMLButtonElement | null)?.focus();
  });
}

/* ---------------- Celebration ---------------- */

export interface CelebrationInfo {
  stars: number;
  starNames: string[];
  predictedCorrectly: boolean | null;
}

export function showCelebration(
  parent: HTMLElement,
  info: CelebrationInfo,
  sfx: Sfx,
  actions: { onReplay: () => void; onContinue: () => void },
): void {
  const previousFocus = document.activeElement;
  const s = scrim(parent);
  const d = el('div', 'dialog', s);
  d.setAttribute('role', 'dialog');
  d.setAttribute('aria-modal', 'true');
  d.setAttribute('aria-label', 'Level complete!');
  el('h2', undefined, d, '🎉 You did it!');
  const stars = el('div', 'cele-stars', d);
  const starEls: HTMLElement[] = [];
  for (let i = 0; i < 3; i++) starEls.push(el('span', 'star', stars, '★'));
  const name = el('div', 'cele-name', d, '');
  el('p', undefined, d, info.predictedCorrectly === true
    ? 'And your prediction was right — super thinking!'
    : 'Zip followed YOUR plan perfectly!');

  const btns = el('div', 'dialog-actions', d);
  const again = el('button', 'mini-btn purple', btns, '↩ Play Again');
  const next = el('button', 'mini-btn', btns, '➜ Keep Going');
  again.addEventListener('click', () => { sfx.play('tap'); closeDialog(s, previousFocus); actions.onReplay(); });
  next.addEventListener('click', () => { sfx.play('tap'); closeDialog(s, previousFocus); actions.onContinue(); });
  next.focus();

  // Pop stars one by one with sounds + names (only the EARNED ones —
  // callers may pass the full 3-name roster alongside a smaller count)
  info.starNames.slice(0, info.stars).forEach((starName, i) => {
    setTimeout(() => {
      starEls[i]?.classList.add('pop');
      name.textContent = `⭐ ${starName}`;
      sfx.play('star');
    }, 300 + i * 450);
  });

  // DOM confetti
  spawnConfetti(parent);
}

export function spawnConfetti(parent: HTMLElement): void {
  const colors = ['#ff5fa2', '#ffd23e', '#3ed35f', '#38b6ff', '#a06bff', '#ff9f2e', '#5ee8c7'];
  for (let i = 0; i < 70; i++) {
    const c = el('div', 'confetti', parent);
    const size = 8 + Math.random() * 10;
    c.style.width = `${size}px`;
    c.style.height = `${size * (0.5 + Math.random())}px`;
    c.style.left = `${Math.random() * 100}%`;
    c.style.background = colors[i % colors.length];
    c.style.animationDuration = `${1.8 + Math.random() * 1.8}s`;
    c.style.animationDelay = `${Math.random() * 0.6}s`;
    setTimeout(() => c.remove(), 4500);
  }
}

/* ---------------- Glitch replay (Mixy) ---------------- */

export interface ReplayStep {
  icon: string;
  label: string;
}

export function showGlitchReplay(
  parent: HTMLElement,
  events: ExecEvent[],
  sfx: Sfx,
  callbacks: { onScrub: (stepIndex: number) => void; onTryAgain: () => void },
): void {
  const previousFocus = document.activeElement;
  const s = scrim(parent);
  const d = el('div', 'dialog', s);
  d.setAttribute('role', 'dialog');
  d.setAttribute('aria-modal', 'true');
  d.setAttribute('aria-label', 'Mixy found a glitch! Inspect your plan step by step.');

  const head = el('div', 'goal-visual', d);
  const img = el('img', undefined, head) as HTMLImageElement;
  img.src = './art/characters/mixy/mixy.svg';
  img.alt = 'Mixy the GlitchBop';
  img.style.height = '84px';
  el('h2', undefined, d, "Oops — Mixy found a glitch!");

  el('p', undefined, d, 'No worries! Tap the steps to see what happened, fix your plan, and BOP again!');

  const strip = el('div', 'replay-strip', d);
  const steps = timelineOf(events);
  const chips: HTMLElement[] = [];
  steps.forEach((step, i) => {
    const chip = el('button', 'replay-chip', strip);
    chip.setAttribute('aria-label', `Step ${i + 1}: ${step.label}`);
    el('span', 'ico', chip, step.icon);
    chip.addEventListener('click', () => {
      sfx.play('tap');
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      callbacks.onScrub(i);
    });
    chips.push(chip);
  });

  const btns = el('div', 'dialog-actions', d);
  const fix = el('button', 'mini-btn', btns, '🛠 Fix My Plan');
  fix.addEventListener('click', () => { sfx.play('tap'); closeDialog(s, previousFocus); callbacks.onTryAgain(); });
  fix.focus();
}

function timelineOf(events: ExecEvent[]): ReplayStep[] {
  const steps: ReplayStep[] = [];
  for (const e of events) {
    switch (e.type) {
      case 'move': steps.push({ icon: '⬆️', label: 'Move' }); break;
      case 'bump': steps.push({ icon: '💥', label: 'Bump! Something was in the way' }); break;
      case 'turn': steps.push({ icon: '↱', label: 'Turn' }); break;
      case 'grab': steps.push({ icon: '🍓', label: 'Grabbed the strawberry' }); break;
      case 'grabFail': steps.push({ icon: '✋', label: 'Nothing to grab here' }); break;
      case 'drop': steps.push({ icon: e.onGoal ? '⭐' : '⬇️', label: e.onGoal ? 'Delivered!' : 'Dropped it' }); break;
      case 'dropFail': steps.push({ icon: '🤲', label: 'Nothing to drop' }); break;
      default: break;
    }
  }
  return steps;
}

/* ---------------- Settings ---------------- */

export function showSettings(
  parent: HTMLElement,
  store: SaveStore,
  sfx: Sfx,
  onChange: () => void,
): void {
  const previousFocus = document.activeElement;
  const s = scrim(parent);
  const d = el('div', 'dialog', s);
  d.setAttribute('role', 'dialog');
  d.setAttribute('aria-modal', 'true');
  d.setAttribute('aria-label', 'Settings');
  el('h2', undefined, d, '⚙️ Settings');

  const list = el('div', 'settings-list', d);
  const rows: Array<{ key: 'sound' | 'calmMode' | 'highContrast'; label: string }> = [
    { key: 'sound', label: '🔊 Sound effects' },
    { key: 'calmMode', label: '🍃 Calm mode (softer motion)' },
    { key: 'highContrast', label: '🌗 High contrast' },
  ];
  for (const row of rows) {
    const r = el('div', 'setting-row', list);
    el('span', undefined, r, row.label);
    const t = el('button', 'toggle', r) as HTMLButtonElement;
    t.setAttribute('role', 'switch');
    t.setAttribute('aria-label', row.label);
    t.setAttribute('aria-pressed', String(store.settings[row.key]));
    t.addEventListener('click', () => {
      const next = !store.settings[row.key];
      store.updateSettings({ [row.key]: next });
      t.setAttribute('aria-pressed', String(next));
      sfx.play('tap');
      onChange();
    });
  }

  const btns = el('div', 'dialog-actions', d);
  const done = el('button', 'mini-btn', btns, '✓ Done');
  done.addEventListener('click', () => { sfx.play('tap'); closeDialog(s, previousFocus); });
  done.focus();
}

/* ---------------- Toast hint ---------------- */

let toastTimer = 0;
export function showToast(parent: HTMLElement, text: string): void {
  parent.querySelectorAll('.toast').forEach((t) => t.remove());
  const t = el('div', 'toast', parent, text);
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => t.remove(), 2200);
}
