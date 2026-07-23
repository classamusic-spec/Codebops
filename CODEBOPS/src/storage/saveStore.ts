/**
 * Versioned local save store (localStorage-backed; repository-style API
 * keeps the door open for an IndexedDB backend in a later phase).
 *
 * v2 adds: Daily Bop streaks, total playtime (for the Grown-Up Campfire),
 * and golden flowers earned from daily completions.
 */
export interface SaveData {
  schemaVersion: number;
  stars: Record<string, number>;
  settings: {
    sound: boolean;
    calmMode: boolean;
    highContrast: boolean;
    leftHanded: boolean;
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
  stars: {},
  settings: { sound: true, calmMode: false, highContrast: false, leftHanded: false },
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
