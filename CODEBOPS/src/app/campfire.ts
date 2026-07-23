/**
 * Grown-Up Campfire — the parent dashboard. Behind a hold-to-open gate
 * (little fingers can't wander in). Shows real progress: levels, stars,
 * concepts, daily streak, and honest playtime.
 */
import { el } from '../ui/dom';
import { SaveStore } from '../storage/saveStore';
import { ALL_LEVELS } from '../data/levels';
import { loadCustomLevels } from '../storage/customLevels';

interface Concept {
  readonly name: string;
  readonly emoji: string;
  readonly blurb: string;
  readonly levelIds: readonly string[];
}

const CONCEPTS: readonly Concept[] = [
  {
    name: 'Sequences', emoji: '➡️',
    blurb: 'Ordering steps to reach a goal — the foundation of all programs.',
    levelIds: ['sm-1', 'sm-2'],
  },
  {
    name: 'Loops', emoji: '↻',
    blurb: 'Repeating a pattern with counted and stop-conditioned loops.',
    levelIds: ['bb-1', 'bb-2', 'bb-3', 'bb-debug', 'bb-creative'],
  },
  {
    name: 'Conditions', emoji: '🌸',
    blurb: '“If you see a flower, grab it” — decisions inside a program.',
    levelIds: ['pf-1', 'pf-2', 'pf-3', 'pf-debug', 'pf-creative'],
  },
  {
    name: 'Teamwork', emoji: '🤖',
    blurb: 'Coordinating two bots with a shared plan (task switching).',
    levelIds: ['rt-1', 'rt-2', 'rt-3', 'rt-debug', 'rt-creative'],
  },
];

function formatPlaytime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  if (m < 60) return `${m} min`;
  return `${Math.floor(m / 60)}h ${m % 60}m`;
}

/** Hold-to-open gate: returns a button that fires onOpen after 1.2s held. */
export function createCampfireGate(parent: HTMLElement, onOpen: () => void): HTMLButtonElement {
  const btn = el('button', 'campfire-gate', parent) as HTMLButtonElement;
  btn.type = 'button';
  btn.innerHTML = '🔥<span class="ring"></span>';
  btn.setAttribute('aria-label', 'Grown-ups: hold to open the Campfire');
  let timer: number | null = null;
  const cancel = () => {
    if (timer !== null) window.clearTimeout(timer);
    timer = null;
    btn.classList.remove('holding');
  };
  btn.addEventListener('pointerdown', () => {
    btn.classList.add('holding');
    timer = window.setTimeout(() => { cancel(); onOpen(); }, 1200);
  });
  btn.addEventListener('pointerup', cancel);
  btn.addEventListener('pointerleave', cancel);
  btn.addEventListener('pointercancel', cancel);
  return btn;
}

export function showCampfire(parent: HTMLElement, store: SaveStore, onReset: () => void): void {
  const scrim = el('div', 'dialog-scrim', parent);
  const dlg = el('div', 'dialog campfire-dialog', scrim);
  dlg.setAttribute('role', 'dialog');
  dlg.setAttribute('aria-label', 'Grown-Up Campfire');

  el('div', 'intro-emoji', dlg, '🔥');
  el('h2', undefined, dlg, 'Grown-Up Campfire');
  el('p', 'camp-sub', dlg, 'A quiet moment to see how your little builder is doing.');

  // Headline stats
  const stats = el('div', 'camp-stats', dlg);
  const totalStars = Object.values(store.stars).reduce((a, b) => a + b, 0);
  const completed = Object.keys(store.stars).filter((id) => (store.stars[id] ?? 0) > 0).length;
  const stat = (emoji: string, value: string, label: string) => {
    const s = el('div', 'camp-stat', stats);
    el('span', 'cs-emoji', s, emoji);
    el('span', 'cs-value', s, value);
    el('span', 'cs-label', s, label);
  };
  stat('⭐', String(totalStars), 'stars earned');
  stat('🗺️', `${completed}/${ALL_LEVELS.length}`, 'levels completed');
  stat('📅', String(store.daily.streak), 'day streak');
  stat('⏱️', formatPlaytime(store.playSeconds), 'total play time');

  // Concepts
  el('h3', undefined, dlg, 'Concepts practiced');
  const concepts = el('div', 'camp-concepts', dlg);
  for (const c of CONCEPTS) {
    const done = c.levelIds.filter((id) => (store.stars[id] ?? 0) > 0).length;
    const row = el('div', 'camp-concept', concepts);
    el('span', 'cc-emoji', row, c.emoji);
    const mid = el('div', 'cc-mid', row);
    el('div', 'cc-name', mid, c.name);
    el('div', 'cc-blurb', mid, c.blurb);
    el('span', `cc-progress${done === c.levelIds.length ? ' full' : ''}`, row, `${done}/${c.levelIds.length}`);
  }
  const customs = loadCustomLevels().length;
  if (customs > 0) {
    const row = el('div', 'camp-concept', concepts);
    el('span', 'cc-emoji', row, '🏝️');
    const mid = el('div', 'cc-mid', row);
    el('div', 'cc-name', mid, 'Creation');
    el('div', 'cc-blurb', mid, 'Designing original puzzles on Imagination Island.');
    el('span', 'cc-progress full', row, `${customs} built`);
  }

  // Footer actions
  const actions = el('div', 'dlg-actions camp-actions', dlg);
  const reset = el('button', 'mini-btn danger', actions, 'Reset all progress');
  reset.type = 'button';
  let armed = false;
  reset.addEventListener('click', () => {
    if (!armed) { armed = true; reset.textContent = 'Tap again to really reset ⚠️'; return; }
    store.reset();
    onReset();
    close();
  });
  const closeBtn = el('button', 'btn-play small', actions, 'Close');
  closeBtn.type = 'button';
  const close = () => scrim.remove();
  closeBtn.addEventListener('click', close);
  scrim.addEventListener('click', (e) => { if (e.target === scrim) close(); });
}
