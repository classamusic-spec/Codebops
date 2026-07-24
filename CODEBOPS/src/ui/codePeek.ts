/**
 * Code Peek (addendum §11) — "what you just built, in real code".
 *
 * Shown after a successful run. Four rungs of the same ladder, so a child
 * can climb as far as they like:
 *   picture blocks -> plain-language algorithm -> optional JavaScript
 * plus the curriculum concept badge and one sentence naming the idea.
 *
 * It only ever describes the child's ACTUAL program: every line comes
 * from the steps they placed. Nothing is invented, and if a command
 * cannot be translated it is reported rather than guessed at.
 */
import { el } from './dom';
import { sharedSfx } from '../audio/sfx';
import { stage } from '../data/curriculum/stages';
import type { CurriculumStageId } from '../data/curriculum/stages';
import { levelCurriculum } from '../data/curriculum/levelMeta';

/** One placed tile, reduced to what Code Peek needs. */
export interface PeekStep {
  /** Tile caption, e.g. "Move Up". */
  readonly label: string;
  /** Complete inline `<svg>` markup for the tile's own icon. */
  readonly iconHtml?: string;
  /** Loop/dial value if the tile carried a badge. */
  readonly arg?: number;
  /** Loops wrap the tiles before them (the app-wide convention). */
  readonly isLoop?: boolean;
}

export interface CodePeekInfo {
  readonly steps: readonly PeekStep[];
  /** The concept this level is really about. */
  readonly concept: CurriculumStageId;
  readonly levelTitle: string;
}

/**
 * The concept a level's Code Peek should name, taken from the curriculum
 * registry rather than guessed at the call site. Returns null for levels
 * with no curriculum metadata, so nothing is invented.
 */
export function peekForLevel(
  levelId: string, levelTitle: string, steps: readonly PeekStep[],
): CodePeekInfo | null {
  const meta = levelCurriculum(levelId);
  if (!meta || steps.length === 0) return null;
  const concept = meta.assessedConcepts[0] ?? meta.introducedConcepts[0] ?? meta.practicedConcepts[0];
  if (!concept) return null;
  return { steps, concept, levelTitle };
}

/** Plain-language algorithm, one line per step, loops shown as a block. */
export function plainLanguage(steps: readonly PeekStep[]): string[] {
  const out: string[] = [];
  let blockStart = 0;
  steps.forEach((s, i) => {
    if (s.isLoop) {
      const body = steps.slice(blockStart, i);
      const n = s.arg ?? 2;
      if (body.length === 0) { out.push(`Repeat ${n} times (nothing to repeat yet)`); return; }
      // Re-write the body lines as an indented repeat block.
      out.splice(blockStart, out.length - blockStart);
      out.push(`Repeat ${n} times:`);
      for (const b of body) out.push(`    ${describe(b)}`);
      blockStart = out.length;
      return;
    }
    out.push(describe(s));
  });
  return out;
}

function describe(s: PeekStep): string {
  return s.arg !== undefined && !s.isLoop ? `${s.label} (${s.arg})` : s.label;
}

const IDENT = (label: string): string =>
  label.replace(/[^a-zA-Z0-9 ]/g, '').trim().split(/\s+/)
    .map((w, i) => (i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase()))
    .join('') || 'doStep';

/** A JavaScript preview of the same program. Never shows unrelated code. */
export function javaScriptPreview(steps: readonly PeekStep[]): string[] {
  const out: string[] = [];
  let blockStart = 0;
  steps.forEach((s, i) => {
    if (s.isLoop) {
      const body = steps.slice(blockStart, i);
      const n = s.arg ?? 2;
      out.splice(blockStart, out.length - blockStart);
      if (body.length === 0) { out.push(`// repeat ${n} times — nothing to repeat yet`); blockStart = out.length; return; }
      out.push(`for (let i = 0; i < ${n}; i++) {`);
      for (const b of body) out.push(`  ${IDENT(b.label)}();`);
      out.push('}');
      blockStart = out.length;
      return;
    }
    out.push(s.arg !== undefined ? `${IDENT(s.label)}(${s.arg});` : `${IDENT(s.label)}();`);
  });
  return out;
}

/** One sentence naming what the child actually did, in curriculum terms. */
export function conceptSentence(concept: CurriculumStageId, steps: readonly PeekStep[]): string {
  const loop = steps.find((s) => s.isLoop);
  switch (concept) {
    case 'loops':
      return loop
        ? `You told the machine to do the same job ${loop.arg ?? 2} times.`
        : 'You wrote each step out one by one — a loop could do this for you.';
    case 'sequence':
      return `You put ${steps.length} step${steps.length === 1 ? '' : 's'} in the right order.`;
    case 'conditions': return 'You made the machine check something before it acted.';
    case 'if-else': return 'You gave the machine two ways to go, and it picked one.';
    case 'functions': return 'You saved a job once and used it again.';
    case 'variables': return 'You used a number the machine remembered.';
    case 'state': return 'You changed what was happening, and that changed what could happen next.';
    case 'messages': return 'You had one helper tell another helper something.';
    case 'parallelism': return 'You had two things working at the same time.';
    case 'events': return 'You told the machine what to wait for before starting.';
    case 'debugging': return 'You found the mixed-up step and fixed it.';
    case 'decomposition': return 'You split a big job into smaller jobs.';
    case 'data': return 'You sorted things by what they are like.';
    case 'agents': return 'You gave your helper a goal and let it choose the steps.';
  }
}

/** Render the panel. Returns a dispose function. */
export function showCodePeek(parent: HTMLElement, info: CodePeekInfo): () => void {
  const def = stage(info.concept);
  const scrim = el('div', 'dialog-scrim code-peek-scrim', parent);
  const dlg = el('div', 'dialog code-peek', scrim);
  dlg.setAttribute('role', 'dialog');
  dlg.setAttribute('aria-label', 'Code Peek');

  const head = el('div', 'cp-head', dlg);
  el('span', 'cp-badge-icon', head, def.icon);
  const ht = el('div', 'cp-head-text', head);
  el('div', 'cp-kicker', ht, 'CODE PEEK');
  el('div', 'cp-concept', ht, def.codingName);
  el('div', 'cp-childlang', ht, def.childFacingLanguage);

  el('p', 'cp-sentence', dlg, conceptSentence(info.concept, info.steps));

  // 1. picture blocks — exactly the tiles they placed
  const blocks = el('div', 'cp-blocks', dlg);
  for (const s of info.steps) {
    const b = el('span', `cp-block${s.isLoop ? ' loop' : ''}`, blocks);
    if (s.iconHtml) {
      const ico = el('span', 'cp-block-ico', b);
      ico.innerHTML = s.iconHtml;
    }
    el('span', undefined, b, s.label);
    if (s.arg !== undefined) el('span', 'cp-block-arg', b, `×${s.arg}`);
  }

  // 2. plain language
  const plainWrap = el('div', 'cp-section', dlg);
  el('div', 'cp-section-title', plainWrap, 'In words');
  const plain = el('pre', 'cp-plain', plainWrap);
  plain.textContent = plainLanguage(info.steps).join('\n') || '(no steps yet)';

  // 3. optional JavaScript
  const jsWrap = el('div', 'cp-section', dlg);
  const jsToggle = el('button', 'mini-btn cp-toggle', jsWrap, '{ } Show real code') as HTMLButtonElement;
  jsToggle.type = 'button';
  const js = el('pre', 'cp-js', jsWrap);
  js.textContent = javaScriptPreview(info.steps).join('\n') || '// no steps yet';
  js.hidden = true;
  jsToggle.addEventListener('click', () => {
    js.hidden = !js.hidden;
    jsToggle.textContent = js.hidden ? '{ } Show real code' : '{ } Hide real code';
    sharedSfx.play('tap');
  });

  const close = (): void => { scrim.remove(); };
  const btn = el('button', 'mini-btn', dlg, '👍 Got it') as HTMLButtonElement;
  btn.type = 'button';
  btn.addEventListener('click', () => { sharedSfx.play('tap'); close(); });
  btn.focus();
  return close;
}
