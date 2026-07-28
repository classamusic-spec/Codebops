/**
 * Where saved helpers live.
 *
 * Same discipline as the App Library: only validated DATA is stored,
 * every read is validated too, and it is local by construction — there
 * is no upload path in this file.
 *
 * Helpers are small (a few hundred bytes each), so localStorage is
 * enough and the synchronous API keeps the builder simple. The App Lab
 * needed IndexedDB because projects carry scenes; a helper carries ids.
 */
import type { AgentMission } from '../agents/mission';
import { parseMission } from '../agents/mission';

const KEY = 'codebops.helpers.v1';
/**
 * Enough for a child to keep every helper they care about, low enough
 * that a runaway writer cannot fill a device's storage quota. Oldest
 * goes first, and only after the newest is safely written.
 */
const MAX_HELPERS = 24;

function readAll(): AgentMission[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // A single corrupt entry loses one helper, never the library.
    return parsed
      .map((x) => parseMission(x))
      .filter((m): m is AgentMission => m !== null);
  } catch {
    return [];
  }
}

function writeAll(missions: readonly AgentMission[]): boolean {
  try {
    localStorage.setItem(KEY, JSON.stringify(missions));
    return true;
  } catch {
    // A full quota must not lose the helper on screen. The caller keeps
    // its in-memory copy and can try again after the child deletes one.
    return false;
  }
}

export function listMissions(): readonly AgentMission[] {
  return readAll().sort((a, b) => b.updatedAt - a.updatedAt);
}

export function saveMission(mission: AgentMission): boolean {
  const all = readAll().filter((m) => m.id !== mission.id);
  all.push(mission);
  // Newest first, then trim — so the helper just saved is never the one
  // dropped, however full the library is.
  all.sort((a, b) => b.updatedAt - a.updatedAt);
  return writeAll(all.slice(0, MAX_HELPERS));
}

export function deleteMission(id: string): boolean {
  return writeAll(readAll().filter((m) => m.id !== id));
}

/**
 * A fresh id.
 *
 * Time plus a counter rather than `Math.random()`, so the deterministic
 * test mode does not have to know about this file and two helpers made
 * in the same millisecond still differ.
 */
let seq = 0;
export function newMissionId(now: number): string {
  seq += 1;
  return `helper-${now.toString(36)}-${seq.toString(36)}`;
}
