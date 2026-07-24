/**
 * Gearworks Garage — world registration, command-tile registry, and the
 * level-picker roster (playable machine levels + coming-soon slots).
 */
import type { GearworksCommandId } from '../../gameplay/gearworks/machine';
import type { GwLoopCommandId } from '../../gameplay/gearworks/loopMachine';
import { GEARWORKS_MACHINE_LEVELS, GEARWORKS_CHAIN_LEVELS, GEARWORKS_LOOP_LEVELS } from './levels';
import type { GearworksMachineLevel, GearworksChainLevel, GearworksLoopLevel } from './levels';

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

export type GwTileTone = 'start' | 'stop' | 'rotate' | 'wait' | 'move' | 'loop';

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

// ---------- Phase 4 loop-level tiles ----------

const ICON_GEAR = '<path d="M12 3.2 L13.4 5.4 A6.8 6.8 0 0 1 15.4 6.2 L18 5.5 L19.6 8.3 L17.8 10.2 A6.8 6.8 0 0 1 17.8 12.4 L19.6 14.3 L18 17.1 L15.4 16.4 A6.8 6.8 0 0 1 13.4 17.2 L12 19.4 L10.6 17.2 A6.8 6.8 0 0 1 8.6 16.4 L6 17.1 L4.4 14.3 L6.2 12.4 A6.8 6.8 0 0 1 6.2 10.2 L4.4 8.3 L6 5.5 L8.6 6.2 A6.8 6.8 0 0 1 10.6 5.4 Z"/><circle cx="12" cy="11.3" r="2.6" fill="var(--tile-deep, #333)"/>';
const ICON_BELL = '<path d="M12 3.6 a5.6 5.6 0 0 1 5.6 5.6 c0 3.1 .9 4.6 2 5.6 H4.4 c1.1 -1 2 -2.5 2 -5.6 A5.6 5.6 0 0 1 12 3.6 Z"/><circle cx="12" cy="17.9" r="2.1"/><path d="M3.2 8.4 A9.6 9.6 0 0 1 5.6 4.4 M20.8 8.4 A9.6 9.6 0 0 0 18.4 4.4" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>';
const ICON_LIFT_UP = '<rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M12 15.6 V8.6 M8.8 11.4 L12 8.2 L15.2 11.4" fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"/>';
const ICON_LIFT_DOWN = '<rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M12 8.4 V15.4 M8.8 12.6 L12 15.8 L15.2 12.6" fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"/>';
const ICON_REPEAT = '<path d="M7.2 7.4 H15.2 A4 4 0 0 1 19.2 11.4 V12.4" fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round"/><path d="M16.8 16.6 H8.8 A4 4 0 0 1 4.8 12.6 V11.6" fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round"/><path d="M19.2 10.2 L21.4 13.4 L16.9 13.6 Z"/><path d="M4.8 13.8 L2.6 10.6 L7.1 10.4 Z"/>';

export const GW_LOOP_TILES: Readonly<Record<GwLoopCommandId, GwTileDef>> = {
  glTurnGear: { label: 'Turn Gear', spoken: 'Turn the gear to wind the bell', tone: 'rotate', icon: ICON_GEAR },
  glRingBell: { label: 'Ring Bell', spoken: 'Ring the bell', tone: 'wait', icon: ICON_BELL },
  glLiftUp:   { label: 'Lift Up', spoken: 'Lift up one floor', tone: 'start', icon: ICON_LIFT_UP },
  glLiftDown: { label: 'Lift Down', spoken: 'Lift down one floor', tone: 'move', icon: ICON_LIFT_DOWN },
  glRepeat:   { label: 'Repeat', spoken: 'Repeat the tiles before this one — tap the badge to change how many times', tone: 'loop', icon: ICON_REPEAT },
};

// ---------- level picker roster ----------

/** A playable Gearworks level of either kind, in campaign order. */
export type GearworksLevelEntry =
  | { readonly kind: 'machine'; readonly level: GearworksMachineLevel }
  | { readonly kind: 'chain'; readonly level: GearworksChainLevel }
  | { readonly kind: 'loop'; readonly level: GearworksLoopLevel };

export const GEARWORKS_SEQUENCE: readonly GearworksLevelEntry[] = [
  ...GEARWORKS_MACHINE_LEVELS.map((level) => ({ kind: 'machine' as const, level })),
  ...GEARWORKS_CHAIN_LEVELS.map((level) => ({ kind: 'chain' as const, level })),
  ...GEARWORKS_LOOP_LEVELS.map((level) => ({ kind: 'loop' as const, level })),
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
