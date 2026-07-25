/**
 * Grown-Up Campfire — the parent dashboard. Behind a hold-to-open gate
 * (little fingers can't wander in). Shows real progress: levels, stars,
 * concepts, daily streak, and honest playtime.
 */
import { el } from '../ui/dom';
import { SaveStore } from '../storage/saveStore';
import { ALL_LEVELS } from '../data/levels';
import { loadCustomLevels } from '../storage/customLevels';
import { buildParentReport } from '../data/curriculum/report';
import { APP_LAB_ALL_KITS } from '../data/app-lab/appLabDefinition';
import { sharedSfx } from '../audio/sfx';

/** Worlds a grown-up may open by hand (§7). Ids match the level data. */
const UNLOCKABLE_WORLDS: ReadonlyArray<{ id: string; emoji: string; name: string }> = [
  { id: 'bubble-bay', emoji: '🐚', name: 'Bubble Bay' },
  { id: 'pattern-forest', emoji: '🌸', name: 'Pattern Forest' },
  { id: 'robot-town', emoji: '🤖', name: 'Robot Town' },
  { id: 'gearworks-garage', emoji: '⚙️', name: 'Gearworks Garage' },
  { id: 'agent-academy', emoji: '🎓', name: 'Agent Academy' },
  // Opens every App Lab station at once, for a child who is ready to
  // build before the curriculum has recorded every prerequisite.
  { id: APP_LAB_ALL_KITS, emoji: '🧪', name: 'All App Lab kits' },
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

  const customs = loadCustomLevels().length;

  // ---- Learning report (addendum §10) — evidence, never scores ----
  el('h3', undefined, dlg, 'What we have seen');
  if (customs > 0) {
    el('p', 'camp-note', dlg,
      `${customs} original puzzle${customs === 1 ? '' : 's'} designed on Imagination Island.`);
  }
  const report = buildParentReport(store.evidence);
  el('p', 'camp-summary', dlg, report.summary);
  if (report.active.length > 0) {
    const list = el('div', 'camp-report', dlg);
    for (const r of report.active) {
      const row = el('details', 'cr-row', list);
      const sum = el('summary', 'cr-head', row);
      el('span', 'cr-name', sum, r.codingName);
      el('span', 'cr-state', sum, r.label);
      el('p', 'cr-desc', row, r.description);
      const obs = el('ul', 'cr-obs', row);
      // Every line here is something the child actually did, in a named level.
      for (const note of r.observations.slice(0, 4)) el('li', undefined, obs, note);
      el('p', 'cr-next', row, `→ ${r.nextStep}`);
    }
    const notYet = report.stages.filter((s) => s.state === 'not-introduced');
    if (notYet.length > 0) {
      el('p', 'camp-notyet', dlg,
        `Still to come: ${notYet.map((s) => s.codingName).join(', ')}.`);
    }
  }

  // ---- Open a world by hand (addendum §7) ----
  el('h3', undefined, dlg, 'Open a world');
  el('p', 'camp-note', dlg,
    'Worlds normally open as your builder earns stars. You can also open one by hand — this only ever adds access, and never removes anything they have earned.');
  const worlds = el('div', 'camp-worlds', dlg);
  for (const w of UNLOCKABLE_WORLDS) {
    const on = store.isWorldUnlocked(w.id);
    const btn = el('button', `camp-world${on ? ' on' : ''}`, worlds) as HTMLButtonElement;
    btn.type = 'button';
    btn.setAttribute('role', 'switch');
    btn.setAttribute('aria-checked', String(on));
    el('span', 'cw-emoji', btn, w.emoji);
    el('span', 'cw-name', btn, w.name);
    const pill = el('span', 'cw-state', btn, on ? 'Open' : 'By stars');
    btn.addEventListener('click', () => {
      const next = !store.isWorldUnlocked(w.id);
      store.setWorldUnlocked(w.id, next);
      btn.classList.toggle('on', next);
      btn.setAttribute('aria-checked', String(next));
      pill.textContent = next ? 'Open' : 'By stars';
      sharedSfx.play('tap');
    });
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
