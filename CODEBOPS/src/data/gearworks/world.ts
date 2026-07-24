/**
 * Gearworks Garage — world registration, command-tile registry, and the
 * level-picker roster (playable machine levels + coming-soon slots).
 */
import type { GearworksCommandId } from '../../gameplay/gearworks/machine';
import { GEARWORKS_MACHINE_LEVELS, GEARWORKS_CHAIN_LEVELS } from './levels';
import type { GearworksMachineLevel, GearworksChainLevel } from './levels';

export const GEARWORKS_WORLD_ID = 'gearworks-garage' as const;

export interface GearworksWorldMeta {
  readonly id: typeof GEARWORKS_WORLD_ID;
  readonly emoji: string;
  readonly name: string;
  readonly tagline: string;
  readonly defaultCamera: 'bench' | 'workshop' | 'factory';
}

export const GEARWORKS_WORLD: GearworksWorldMeta = {
  id: GEARWORKS_WORLD_ID,
  emoji: '⚙️',
  name: 'Gearworks Garage',
  tagline: 'Fix machines, connect gears, and make the whole garage move!',
  defaultCamera: 'bench',
};

export type GearworksFamilyId =
  | 'bench' | 'factory' | 'orchestra' | 'lighthouse'
  | 'delivery' | 'painter' | 'story' | 'maker';

// ---------- command-tile registry (semantic tones from the locked palette) ----------

export type GwTileTone = 'start' | 'stop' | 'rotate' | 'wait' | 'move';

export interface GwTileDef {
  readonly label: string;
  readonly spoken: string;
  readonly tone: GwTileTone;
  readonly icon: string; // inline SVG inner markup, 24×24 viewBox
}

const ICON_PLAY = '<path d="M8 5 L19 12 L8 19 Z"/>';
const ICON_STOP = '<rect x="6.5" y="6.5" width="11" height="11" rx="2.5"/>';
const ICON_CW = '<g fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round"><path d="M6.2 9.4 A7.2 7.2 0 0 1 18.4 8.2"/></g><path d="M19.6 4.4 L19.9 9.4 L14.9 8.7 Z"/><path d="M12 14.5 a3 3 0 1 0 .01 0" fill="none" stroke="currentColor" stroke-width="2.4"/>';
const ICON_CCW = '<g fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round"><path d="M17.8 9.4 A7.2 7.2 0 0 0 5.6 8.2"/></g><path d="M4.4 4.4 L4.1 9.4 L9.1 8.7 Z"/><path d="M12 14.5 a3 3 0 1 0 .01 0" fill="none" stroke="currentColor" stroke-width="2.4"/>';
const ICON_WAIT = '<circle cx="12" cy="12" r="8.4" fill="none" stroke="currentColor" stroke-width="2.6"/><g stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 7.4 V12 L15.2 14.2"/></g>';
const ICON_SPEED = '<path d="M3.5 15.5 a8.5 8.5 0 0 1 17 0" fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round"/><g stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5.4 11.2 L7 12.2"/><path d="M12 7.6 V9.4"/><path d="M18.6 11.2 L17 12.2"/></g><path d="M12 16.5 L16.2 10.4 L13.4 15.1 Z" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><circle cx="12" cy="16.2" r="1.9"/>';

export const GW_TILES: Readonly<Record<GearworksCommandId, GwTileDef>> = {
  gwStart:    { label: 'Start', spoken: 'Start the motor', tone: 'start', icon: ICON_PLAY },
  gwStop:     { label: 'Stop', spoken: 'Stop the motor', tone: 'stop', icon: ICON_STOP },
  gwSpinCw:   { label: 'Spin', spoken: 'Spin clockwise', tone: 'rotate', icon: ICON_CW },
  gwSpinCcw:  { label: 'Spin Back', spoken: 'Spin counterclockwise', tone: 'rotate', icon: ICON_CCW },
  gwSetSpeed: { label: 'Speed', spoken: 'Set the motor speed — tap the badge to change it', tone: 'move', icon: ICON_SPEED },
  gwWait:     { label: 'Wait', spoken: 'Wait and let the machine work', tone: 'wait', icon: ICON_WAIT },
};

export const GW_SPEED_NAMES: Readonly<Record<1 | 2 | 3, string>> = { 1: 'Slow', 2: 'Medium', 3: 'Fast' };

// ---------- level picker roster ----------

/** A playable Gearworks level of either kind, in campaign order. */
export type GearworksLevelEntry =
  | { readonly kind: 'machine'; readonly level: GearworksMachineLevel }
  | { readonly kind: 'chain'; readonly level: GearworksChainLevel };

export const GEARWORKS_SEQUENCE: readonly GearworksLevelEntry[] = [
  ...GEARWORKS_MACHINE_LEVELS.map((level) => ({ kind: 'machine' as const, level })),
  ...GEARWORKS_CHAIN_LEVELS.map((level) => ({ kind: 'chain' as const, level })),
];

/** Save-store id of a sequence entry (unlock chain + star display). */
export function gwEntryId(entry: GearworksLevelEntry): string {
  return entry.level.id;
}

export type GearworksPickerEntry =
  | GearworksLevelEntry
  | { readonly kind: 'soon'; readonly id: string; readonly shortTitle: string; readonly emoji: string };

export const GEARWORKS_PICKER: readonly GearworksPickerEntry[] = [
  ...GEARWORKS_SEQUENCE,
  { kind: 'soon', id: 'gw-sensor-lab', shortTitle: 'Sensor Lab', emoji: '👀' },
];
