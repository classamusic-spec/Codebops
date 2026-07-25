/**
 * The autosave draft (spec §21) — the app a child is in the middle of
 * building, so closing the lid never loses it.
 *
 * Deliberately separate from the library and deliberately synchronous:
 * localStorage, one slot, written on every edit. A draft is a work in
 * progress, so unlike the library this store accepts a project that does
 * not validate yet — a half-built app is normal, not an error. Validation
 * happens on the way out, when the draft is promoted to a saved app.
 */
import type { MiniAppProject } from '../creator/miniAppProject';
import { MINI_APP_SCHEMA_VERSION } from '../creator/miniAppProject';
import { looksLikeProject } from '../creator/miniAppValidator';

const KEY = 'codebops.applab.draft.v1';

export interface DraftRecord {
  readonly project: MiniAppProject;
  readonly savedAt: number;
}

/** Write the current draft. Silent on quota failure — play continues. */
export function saveDraft(project: MiniAppProject, now: number): void {
  try {
    const record: DraftRecord = { project, savedAt: now };
    localStorage.setItem(KEY, JSON.stringify(record));
  } catch {
    // Storage full or unavailable; the session keeps working in memory.
  }
}

/**
 * Read the draft back. Returns null for anything that is not a
 * recognisable project of the current schema — a draft is never worth
 * risking a crash for.
 */
export function loadDraft(): DraftRecord | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<DraftRecord>;
    if (!parsed.project || typeof parsed.savedAt !== 'number') return null;
    if (looksLikeProject(parsed.project) !== null) return null;
    if (parsed.project.schemaVersion !== MINI_APP_SCHEMA_VERSION) return null;
    return { project: parsed.project, savedAt: parsed.savedAt };
  } catch {
    return null;
  }
}

export function clearDraft(): void {
  try { localStorage.removeItem(KEY); } catch { /* nothing to do */ }
}

export function hasDraft(): boolean {
  return loadDraft() !== null;
}
