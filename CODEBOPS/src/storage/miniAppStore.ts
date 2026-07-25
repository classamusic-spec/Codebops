/**
 * The App Library's repository (spec §21).
 *
 * Rules this file exists to enforce:
 *  - Only validated project DATA is stored. Never generated code, never a
 *    rendered scene, never anything executable.
 *  - Every read is validated too. A project that fails validation is kept
 *    but quarantined, so a bad write can never take the library down and
 *    the last good version stays recoverable.
 *  - Local only. There is no upload path in here, by construction.
 */
import type { MiniAppProject } from '../creator/miniAppProject';
import { MINI_APP_SCHEMA_VERSION } from '../creator/miniAppProject';
import { validateMiniAppProject, looksLikeProject } from '../creator/miniAppValidator';
import type { KeyValueStore, StoreBackend } from './keyValueStore';
import { openKeyValueStore, MemoryStore } from './keyValueStore';

const DB_NAME = 'codebops.applab';
const STORE_NAME = 'projects';
const LS_PREFIX = 'codebops.applab.v1.';
const INDEX_KEY = '__index';
const PREVIOUS_SUFFIX = ':previous';

/** What the library needs to draw a card without loading the whole project. */
export interface MiniAppSummary {
  readonly id: string;
  readonly type: MiniAppProject['type'];
  readonly templateId: string;
  readonly themeId: string;
  readonly titleTokens: readonly string[];
  readonly titleVersion?: number;
  readonly glyph: string;
  readonly updatedAt: number;
  /** Set when the stored project no longer validates. */
  readonly needsRepair?: boolean;
}

export interface SaveOutcome {
  readonly ok: boolean;
  /** Present when the save was refused. Safe to show a child. */
  readonly childMessage?: string;
  /** Present for the developer. */
  readonly reason?: string;
}

function summaryOf(p: MiniAppProject, needsRepair = false): MiniAppSummary {
  return {
    id: p.id,
    type: p.type,
    templateId: p.templateId,
    themeId: p.themeId,
    titleTokens: p.title.tokens,
    ...(p.title.version !== undefined ? { titleVersion: p.title.version } : {}),
    glyph: p.iconDefinition.glyph,
    updatedAt: p.updatedAt,
    ...(needsRepair ? { needsRepair: true } : {}),
  };
}

export class MiniAppStore {
  private store: KeyValueStore = new MemoryStore();
  private ready: Promise<void>;

  constructor() {
    this.ready = this.open();
  }

  private async open(): Promise<void> {
    this.store = await openKeyValueStore(DB_NAME, STORE_NAME, LS_PREFIX);
  }

  /** Which backend we actually got, so the UI can be honest about saving. */
  async backend(): Promise<StoreBackend> {
    await this.ready;
    return this.store.backend;
  }

  async isDurable(): Promise<boolean> {
    await this.ready;
    return this.store.durable;
  }

  // ---- index -------------------------------------------------------

  async list(): Promise<MiniAppSummary[]> {
    await this.ready;
    const index = (await this.store.get<MiniAppSummary[]>(INDEX_KEY)) ?? [];
    return [...index].sort((a, b) => b.updatedAt - a.updatedAt);
  }

  private async writeIndex(entries: MiniAppSummary[]): Promise<void> {
    await this.store.put(INDEX_KEY, entries);
  }

  private async upsertIndex(summary: MiniAppSummary): Promise<void> {
    const index = (await this.store.get<MiniAppSummary[]>(INDEX_KEY)) ?? [];
    const at = index.findIndex((x) => x.id === summary.id);
    if (at >= 0) index[at] = summary; else index.push(summary);
    await this.writeIndex(index);
  }

  // ---- projects ----------------------------------------------------

  /**
   * Save a project. Refuses invalid ones and keeps the previous good copy,
   * so "the app broke and ate my work" cannot happen.
   */
  async save(project: MiniAppProject): Promise<SaveOutcome> {
    await this.ready;
    const check = validateMiniAppProject(project);
    if (!check.valid) {
      return {
        ok: false,
        childMessage: check.childMessage,
        reason: check.issues.map((i) => `${i.path}: ${i.problem}`).join('; '),
      };
    }
    try {
      const existing = await this.store.get<MiniAppProject>(project.id);
      if (existing) await this.store.put(`${project.id}${PREVIOUS_SUFFIX}`, existing);
      await this.store.put(project.id, project);
      await this.upsertIndex(summaryOf(project));
      return { ok: true };
    } catch (e) {
      // Almost always a quota failure. The child keeps playing; the app
      // says so rather than pretending the save worked.
      return {
        ok: false,
        childMessage: 'There is no room to save right now. Ask a grown-up to tidy up some old apps.',
        reason: e instanceof Error ? e.message : 'write failed',
      };
    }
  }

  /**
   * Load a project. Returns null when it is missing, and a quarantined
   * result when it is present but no longer valid.
   */
  async load(id: string): Promise<{ project: MiniAppProject | null; repairMessage?: string }> {
    await this.ready;
    const raw = await this.store.get<unknown>(id);
    if (raw === null) return { project: null };

    const shapeProblem = looksLikeProject(raw);
    if (shapeProblem) {
      return { project: null, repairMessage: 'That app could not be opened. Let us build a new one.' };
    }
    const project = raw as MiniAppProject;
    if (project.schemaVersion !== MINI_APP_SCHEMA_VERSION) {
      // No migrations exist yet; refusing beats guessing. The file stays
      // on disk untouched so a future migration can still read it.
      return {
        project: null,
        repairMessage: 'That app was made by a different version of the Lab.',
      };
    }
    const check = validateMiniAppProject(project);
    if (!check.valid) return { project: null, repairMessage: check.childMessage };
    return { project };
  }

  /** The copy that was there before the most recent save (spec §21). */
  async loadPrevious(id: string): Promise<MiniAppProject | null> {
    await this.ready;
    const raw = await this.store.get<unknown>(`${id}${PREVIOUS_SUFFIX}`);
    if (raw === null || looksLikeProject(raw)) return null;
    const project = raw as MiniAppProject;
    return validateMiniAppProject(project).valid ? project : null;
  }

  /** Delete a project and its recovery copy. Guard this behind a grown-up. */
  async remove(id: string): Promise<void> {
    await this.ready;
    await this.store.remove(id);
    await this.store.remove(`${id}${PREVIOUS_SUFFIX}`);
    const index = (await this.store.get<MiniAppSummary[]>(INDEX_KEY)) ?? [];
    await this.writeIndex(index.filter((x) => x.id !== id));
  }

  async count(): Promise<number> {
    return (await this.list()).length;
  }

  /** How many saved apps of one kit — the station card's badge. */
  async countForType(type: MiniAppProject['type']): Promise<number> {
    return (await this.list()).filter((x) => x.type === type).length;
  }

  /**
   * Re-derive the index from the stored projects. Used if an index write
   * was lost midway; also the honest way to surface projects that no
   * longer validate.
   */
  async rebuildIndex(): Promise<MiniAppSummary[]> {
    await this.ready;
    const keys = (await this.store.keys()).filter(
      (k) => k !== INDEX_KEY && !k.endsWith(PREVIOUS_SUFFIX),
    );
    const entries: MiniAppSummary[] = [];
    for (const key of keys) {
      const raw = await this.store.get<unknown>(key);
      if (raw === null || looksLikeProject(raw)) continue;
      const project = raw as MiniAppProject;
      entries.push(summaryOf(project, !validateMiniAppProject(project).valid));
    }
    await this.writeIndex(entries);
    return entries;
  }
}
