/**
 * Versioned local save store (localStorage-backed; repository-style API
 * keeps the door open for an IndexedDB backend in a later phase).
 *
 * v2 adds: Daily Bop streaks, total playtime (for the Grown-Up Campfire),
 * and golden flowers earned from daily completions.
 */
import type { EvidenceEvent } from '../data/curriculum/mastery';
import { evidenceForRun } from '../data/curriculum/record';
import type { RunStep } from '../data/curriculum/record';

export interface SaveData {
  schemaVersion: number;
  /** Learning evidence — what the child has SHOWN, not just finished. */
  evidence?: EvidenceEvent[];
  /**
   * Worlds a grown-up has opened by hand from the Campfire (addendum §7).
   * Star-based unlocking still works; this only ever ADDS access, so a
   * child can revisit or jump ahead without anything being taken away.
   */
  unlockedWorlds?: string[];
  stars: Record<string, number>;
  settings: {
    sound: boolean;
    /**
     * Background music, separate from `sound` on purpose: a classroom or a
     * car often wants the effects that tell a child what just happened
     * without a track playing under them.
     */
    music?: boolean;
    /** Small taps on snap and success. Absent on devices that cannot. */
    haptics?: boolean;
    calmMode: boolean;
    highContrast: boolean;
    leftHanded: boolean;
    /** Grown-ups may hide Code Peek's JavaScript view (App Lab §20). */
    hideRealCode?: boolean;
    /** Read instructions aloud on this device — output only (§14). */
    spokenInstructions?: boolean;
    /** Show a written caption whenever a sound plays (§14). */
    captions?: boolean;
    /** How fast a test run plays: 'gentle' | 'normal' | 'quick' (§14). */
    testSpeed?: string;
  };
  /** Daily Bop progress. */
  daily: {
    /** ISO date (YYYY-MM-DD, local) of the last completed Daily Bop. */
    lastCompleted: string | null;
    streak: number;
    totalCompleted: number;
  };
  /** Accumulated active play seconds (flushed periodically). */
  playSeconds: number;
}

export const SAVE_SCHEMA_VERSION = 2;

const STORAGE_KEY = 'codebops.save.v1';

const DEFAULT_SAVE: SaveData = {
  schemaVersion: SAVE_SCHEMA_VERSION,
  evidence: [],
  unlockedWorlds: [],
  stars: {},
  settings: { sound: true, music: true, haptics: true, calmMode: false, highContrast: false, leftHanded: false },
  daily: { lastCompleted: null, streak: 0, totalCompleted: 0 },
  playSeconds: 0,
};

/** Local YYYY-MM-DD for a Date (midnight-based streaks). */
export function dayStamp(d = new Date()): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function yesterdayStamp(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return dayStamp(d);
}

export class SaveStore {
  private data: SaveData;

  constructor() {
    this.data = this.load();
  }

  private load(): SaveData {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return structuredClone(DEFAULT_SAVE);
      const parsed = JSON.parse(raw) as Partial<SaveData>;
      // Migration foundation: fill forward from older schema versions.
      return {
        schemaVersion: SAVE_SCHEMA_VERSION,
        stars: { ...parsed.stars },
        settings: { ...DEFAULT_SAVE.settings, ...parsed.settings },
        daily: { ...DEFAULT_SAVE.daily, ...parsed.daily },
        playSeconds: parsed.playSeconds ?? 0,
        evidence: Array.isArray(parsed.evidence) ? parsed.evidence : [],
        unlockedWorlds: Array.isArray(parsed.unlockedWorlds) ? parsed.unlockedWorlds : [],
      };
    } catch {
      return structuredClone(DEFAULT_SAVE);
    }
  }

  private persist(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch {
      // Storage full or unavailable — play session continues without persistence.
    }
  }

  get stars(): Readonly<Record<string, number>> {
    return this.data.stars;
  }

  get settings(): SaveData['settings'] {
    return this.data.settings;
  }

  get daily(): Readonly<SaveData['daily']> {
    return this.data.daily;
  }

  get playSeconds(): number {
    return this.data.playSeconds;
  }

  setStars(levelId: string, count: number): void {
    this.data.stars[levelId] = Math.max(this.data.stars[levelId] ?? 0, count);
    this.persist();
  }

  /**
   * Record what a finished run demonstrated. Every play screen already
   * calls setStars, so routing evidence through one method here keeps
   * all 17 of them from having to know about the curriculum.
   */
  recordRun(levelId: string, stars: number, levelTitle: string, steps: readonly RunStep[] = []): void {
    const fresh = evidenceForRun(levelId, stars, levelTitle, steps);
    if (fresh.length === 0) return;
    const log = this.data.evidence ?? (this.data.evidence = []);
    for (const e of fresh) {
      // One entry per (level, requirement) — replaying never inflates.
      const at = log.findIndex((x) => x.levelId === e.levelId && x.requirement === e.requirement);
      if (at >= 0) log[at] = e; else log.push(e);
    }
    this.persist();
  }

  /**
   * Record evidence a caller derived itself — the App Lab reads a child's
   * own project rather than a level's run steps, so it arrives already
   * shaped. Merging is identical: one entry per (levelId, requirement),
   * so running the same app twice never inflates the log.
   */
  recordEvidence(fresh: readonly EvidenceEvent[]): void {
    if (fresh.length === 0) return;
    const log = this.data.evidence ?? (this.data.evidence = []);
    for (const e of fresh) {
      const at = log.findIndex((x) => x.levelId === e.levelId && x.requirement === e.requirement);
      if (at >= 0) log[at] = e; else log.push(e);
    }
    this.persist();
  }

  get evidence(): readonly EvidenceEvent[] {
    return this.data.evidence ?? [];
  }

  get unlockedWorlds(): readonly string[] {
    return this.data.unlockedWorlds ?? [];
  }

  /** Has a grown-up opened this world by hand? */
  isWorldUnlocked(worldId: string): boolean {
    return (this.data.unlockedWorlds ?? []).includes(worldId);
  }

  setWorldUnlocked(worldId: string, on: boolean): void {
    const list = this.data.unlockedWorlds ?? (this.data.unlockedWorlds = []);
    const at = list.indexOf(worldId);
    if (on && at < 0) list.push(worldId);
    if (!on && at >= 0) list.splice(at, 1);
    this.persist();
  }

  clearEvidence(): void {
    this.data.evidence = [];
    this.persist();
  }

  updateSettings(patch: Partial<SaveData['settings']>): void {
    this.data.settings = { ...this.data.settings, ...patch };
    this.persist();
  }

  /** Mark today's Daily Bop complete; returns the fresh streak. */
  completeDaily(): number {
    const today = dayStamp();
    if (this.data.daily.lastCompleted === today) return this.data.daily.streak;
    this.data.daily.streak = this.data.daily.lastCompleted === yesterdayStamp()
      ? this.data.daily.streak + 1
      : 1;
    this.data.daily.lastCompleted = today;
    this.data.daily.totalCompleted += 1;
    this.persist();
    return this.data.daily.streak;
  }

  addPlaySeconds(n: number): void {
    this.data.playSeconds += Math.max(0, Math.round(n));
    this.persist();
  }

  reset(): void {
    this.data = structuredClone(DEFAULT_SAVE);
    this.persist();
  }
}
