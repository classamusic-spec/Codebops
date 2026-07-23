/**
 * Think Trail panel (Phase 1 shell) — the right-docked cream panel from the
 * reference art that will explain execution step by step. In Phase 1 it
 * mounts, collapses, and shows a friendly empty state; Phase 2 feeds it
 * machine execution events.
 */
import { el } from '../dom';

export interface ThinkTrailStep {
  readonly n: number;
  readonly icon: string;
  readonly text: string;
  readonly verdict?: 'ok' | 'no';
}

export class ThinkTrailPanel {
  readonly root: HTMLElement;
  private readonly list: HTMLElement;
  private readonly hint: HTMLElement;

  constructor(parent: HTMLElement) {
    this.root = el('aside', 'gw-trail', parent);
    this.root.setAttribute('aria-label', 'Think Trail — what happened, step by step');

    const head = el('div', 'gw-trail-head', this.root);
    el('span', 'gw-trail-title', head, 'THINK TRAIL');
    const toggle = el('button', 'gw-trail-toggle', head, '▾') as HTMLButtonElement;
    toggle.type = 'button';
    toggle.setAttribute('aria-label', 'Show or hide the Think Trail');
    toggle.addEventListener('click', () => {
      const collapsed = this.root.classList.toggle('collapsed');
      toggle.textContent = collapsed ? '▸' : '▾';
    });

    this.list = el('div', 'gw-trail-list', this.root);
    this.hint = el('div', 'gw-trail-hint', this.root);
    this.setEmpty();

    // Small screens: start collapsed so the trail never crowds the deck.
    if (window.innerWidth <= 700) {
      this.root.classList.add('collapsed');
      toggle.textContent = '▸';
    }
  }

  setEmpty(): void {
    this.list.innerHTML = '';
    const empty = el('div', 'gw-trail-empty', this.list);
    el('span', undefined, empty, '🔍');
    el('span', undefined, empty, 'When you press BOP!, every step shows up here.');
    this.hint.textContent = '';
    this.hint.hidden = true;
  }

  setSteps(steps: readonly ThinkTrailStep[], hint?: string): void {
    this.list.innerHTML = '';
    for (const step of steps) {
      const row = el('div', 'gw-trail-step', this.list);
      el('span', 'gw-ts-num', row, String(step.n));
      el('span', 'gw-ts-icon', row, step.icon);
      el('span', 'gw-ts-text', row, step.text);
      if (step.verdict) el('span', `gw-ts-verdict ${step.verdict}`, row, step.verdict === 'ok' ? '✓' : '✗');
    }
    this.hint.textContent = hint ?? '';
    this.hint.hidden = !hint;
  }

  dispose(): void {
    this.root.remove();
  }
}
