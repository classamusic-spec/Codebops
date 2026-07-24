/**
 * Gearworks Garage — world registration, command-tile registry, and the
 * level-picker roster (playable machine levels + coming-soon slots).
 */
import type { GearworksCommandId } from '../../gameplay/gearworks/machine';
import type { GwLoopCommandId } from '../../gameplay/gearworks/loopMachine';
import type { GwSensorCommandId } from '../../gameplay/gearworks/sensorMachine';
import type { GtCommandId } from '../../gameplay/gearworks/sorterMachine';
import type { GcCommandId } from '../../gameplay/gearworks/counterMachine';
import {
  GEARWORKS_MACHINE_LEVELS, GEARWORKS_CHAIN_LEVELS, GEARWORKS_LOOP_LEVELS, GEARWORKS_SENSOR_LEVELS,
  GEARWORKS_SORTER_LEVELS, GEARWORKS_COUNTER_LEVELS,
} from './levels';
import type {
  GearworksMachineLevel, GearworksChainLevel, GearworksLoopLevel, GearworksSensorLevel,
  GearworksSorterLevel, GearworksCounterLevel,
} from './levels';

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

export type GwTileTone = 'start' | 'stop' | 'rotate' | 'wait' | 'move' | 'loop' | 'check';

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

// ---------- Phase 5 sensor-level tiles ----------

const ICON_BELT = '<rect x="2.6" y="12.5" width="18.8" height="5.4" rx="2.7" fill="none" stroke="currentColor" stroke-width="2.4"/><circle cx="7" cy="15.2" r="1.3"/><circle cx="12" cy="15.2" r="1.3"/><circle cx="17" cy="15.2" r="1.3"/><path d="M9.5 4.4 L15.5 8 L9.5 11.6 Z"/>';
const ICON_EYE = '<path d="M12 6.2 C7 6.2 3.6 10.1 2.6 12 C3.6 13.9 7 17.8 12 17.8 C17 17.8 20.4 13.9 21.4 12 C20.4 10.1 17 6.2 12 6.2 Z" fill="none" stroke="currentColor" stroke-width="2.4"/><circle cx="12" cy="12" r="3.1"/>';
const ICON_CLAW = '<path d="M6.4 4.6 C4.4 7.2 4.6 10.4 7.2 12.6 L10 14.8 M17.6 4.6 C19.6 7.2 19.4 10.4 16.8 12.6 L14 14.8" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><circle cx="12" cy="17.6" r="3.0"/>';
const ICON_IF_TURN = '<path d="M12 3.4 L13.2 5.3 A6 6 0 0 1 15 6 L17.2 5.4 L18.6 7.8 L17 9.5 A6 6 0 0 1 17 11.5 L18.6 13.2 L17.2 15.6 L15 15 A6 6 0 0 1 13.2 15.7 L12 17.6 L10.8 15.7 A6 6 0 0 1 9 15 L6.8 15.6 L5.4 13.2 L7 11.5 A6 6 0 0 1 7 9.5 L5.4 7.8 L6.8 5.4 L9 6 A6 6 0 0 1 10.8 5.3 Z"/><circle cx="12" cy="10.5" r="2.2" fill="var(--tile-deep, #333)"/><path d="M5.4 20.6 L9.4 20.6 M7.4 18.6 L9.4 20.6 L7.4 22.6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14.6 20.6 H18.6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
const ICON_IF_STILL = '<path d="M12 3.4 L13.2 5.3 A6 6 0 0 1 15 6 L17.2 5.4 L18.6 7.8 L17 9.5 A6 6 0 0 1 17 11.5 L18.6 13.2 L17.2 15.6 L15 15 A6 6 0 0 1 13.2 15.7 L12 17.6 L10.8 15.7 A6 6 0 0 1 9 15 L6.8 15.6 L5.4 13.2 L7 11.5 A6 6 0 0 1 7 9.5 L5.4 7.8 L6.8 5.4 L9 6 A6 6 0 0 1 10.8 5.3 Z" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M8.4 20.9 L15.6 20.9" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><circle cx="12" cy="10.5" r="2.2"/>';
const ICON_GATE = '<path d="M4 20 V7 M20 20 V7" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" fill="none"/><path d="M4 8.4 L20 8.4" stroke="currentColor" stroke-width="2.4" fill="none"/><path d="M7.2 12 L12 16.4 L16.8 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>';
const ICON_WARN = '<path d="M12 3.6 L21.4 19.6 H2.6 Z" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M12 9 V13.8" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><circle cx="12" cy="16.9" r="1.4"/>';

export const GW_SENSOR_TILES: Readonly<Record<GwSensorCommandId, GwTileDef>> = {
  gsStartBelt: { label: 'Start Belt', spoken: 'Start the conveyor belt', tone: 'start', icon: ICON_BELT },
  gsWait:      { label: 'Wait', spoken: 'Wait one tick', tone: 'wait', icon: ICON_WAIT },
  gsWaitUntil: { label: 'Wait Until', spoken: 'Sleep until the eye sensor sees the berry', tone: 'check', icon: ICON_EYE },
  gsGrab:      { label: 'Grab', spoken: 'Close the claw and grab', tone: 'move', icon: ICON_CLAW },
  gsIfTurning: { label: 'If Turning', spoken: 'Only do the next tile if the gear is turning', tone: 'check', icon: ICON_IF_TURN },
  gsIfStill:   { label: 'If Still', spoken: 'Only do the next tile if the gear is still', tone: 'check', icon: ICON_IF_STILL },
  gsOpenGate:  { label: 'Open Gate', spoken: 'Open the gate', tone: 'start', icon: ICON_GATE },
  gsWarnLight: { label: 'Warning', spoken: 'Shine the warning light', tone: 'stop', icon: ICON_WARN },
};

// ---------- Phase 6 sorter-level tiles ----------

const ICON_BERRY = '<path d="M12 5.2 C15.6 5.2 18.4 8 18.4 11.2 C18.4 15.4 15.2 19.4 12 19.4 C8.8 19.4 5.6 15.4 5.6 11.2 C5.6 8 8.4 5.2 12 5.2 Z"/><path d="M9.4 4.8 L12 2.6 L14.6 4.8 L12 6.4 Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>';
const ICON_BLOCK = '<rect x="5" y="5" width="14" height="14" rx="2.6"/>';
const ICON_ROUND = '<circle cx="12" cy="12" r="7.4" fill="none" stroke="currentColor" stroke-width="2.7"/><circle cx="12" cy="12" r="2.4"/>';
const ICON_SEND_LEFT = '<path d="M20 6.4 H10 A4.4 4.4 0 0 0 5.6 10.8 V17" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/><path d="M1.8 13.6 L5.6 19.4 L9.4 13.6 Z"/>';
const ICON_SEND_RIGHT = '<path d="M4 6.4 H14 A4.4 4.4 0 0 1 18.4 10.8 V17" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/><path d="M14.6 13.6 L18.4 19.4 L22.2 13.6 Z"/>';

export const GW_SORTER_TILES: Readonly<Record<GtCommandId, GwTileDef>> = {
  gtIfRed:     { label: 'If Red', spoken: 'Only do the next tile if the item is red', tone: 'stop', icon: ICON_BERRY },
  gtIfBlue:    { label: 'If Blue', spoken: 'Only do the next tile if the item is blue', tone: 'move', icon: ICON_BERRY },
  gtIfRound:   { label: 'If Round', spoken: 'Only do the next tile if the item is round', tone: 'check', icon: ICON_ROUND },
  gtIfSquare:  { label: 'If Square', spoken: 'Only do the next tile if the item is square', tone: 'check', icon: ICON_BLOCK },
  gtSendLeft:  { label: 'Send Left', spoken: 'Push the item into the left basket', tone: 'rotate', icon: ICON_SEND_LEFT },
  gtSendRight: { label: 'Send Right', spoken: 'Push the item into the right basket', tone: 'loop', icon: ICON_SEND_RIGHT },
};

// ---------- Phase 7 counter-level tiles ----------

const ICON_SET = '<circle cx="12" cy="12" r="8.4" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M12 12 L12 6.4" stroke="currentColor" stroke-width="2.7" stroke-linecap="round"/><path d="M12 12 L16 14.4" stroke="currentColor" stroke-width="2.7" stroke-linecap="round"/><circle cx="12" cy="12" r="1.6"/><path d="M12 2.6 L13 4.4 L11 4.4 Z"/>';
const ICON_ADD1 = '<path d="M12 5 V19 M5 12 H19" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>';
const ICON_SUB1 = '<path d="M5 12 H19" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>';
const ICON_PRESS = '<rect x="4.4" y="16.4" width="15.2" height="3.4" rx="1.5"/><rect x="9.2" y="8.6" width="5.6" height="6.4" rx="1.2"/><path d="M6 4.6 H18" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/><path d="M12 5 V8" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>';
const ICON_REPEAT_UNTIL = '<path d="M7.2 7.6 H14 A4 4 0 0 1 18 11.6 V12.4" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M15.6 16.4 H9.2 A4 4 0 0 1 5.2 12.4 V11.8" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M18 10.4 L20 13.4 L15.8 13.6 Z"/><rect x="2.6" y="15.6" width="4.4" height="4.4" rx="1"/><path d="M3.4 17.8 L4.4 18.8 L6.2 16.6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>';

export const GW_COUNTER_TILES: Readonly<Record<GcCommandId, GwTileDef>> = {
  gcSet:              { label: 'Set Value', spoken: 'Set the counter — tap the dial to pick a number', tone: 'move', icon: ICON_SET },
  gcAdd:              { label: 'Add 1', spoken: 'Add one to the counter', tone: 'start', icon: ICON_ADD1 },
  gcSub:              { label: 'Take 1', spoken: 'Take one off the counter', tone: 'stop', icon: ICON_SUB1 },
  ssPress:            { label: 'Press', spoken: 'Stamp one jar with the press', tone: 'rotate', icon: ICON_PRESS },
  ssRepeatUntilFull:  { label: 'Until Full', spoken: 'Repeat the tiles before this until the jar is full, then stop', tone: 'check', icon: ICON_REPEAT_UNTIL },
  ssRepeat:           { label: 'Repeat', spoken: 'Repeat the tiles before this — but it never stops on its own!', tone: 'loop', icon: ICON_REPEAT },
};

// ---------- level picker roster ----------

/** A playable Gearworks level of either kind, in campaign order. */
export type GearworksLevelEntry =
  | { readonly kind: 'machine'; readonly level: GearworksMachineLevel }
  | { readonly kind: 'chain'; readonly level: GearworksChainLevel }
  | { readonly kind: 'loop'; readonly level: GearworksLoopLevel }
  | { readonly kind: 'sensor'; readonly level: GearworksSensorLevel }
  | { readonly kind: 'sorter'; readonly level: GearworksSorterLevel }
  | { readonly kind: 'counter'; readonly level: GearworksCounterLevel };

export const GEARWORKS_SEQUENCE: readonly GearworksLevelEntry[] = [
  ...GEARWORKS_MACHINE_LEVELS.map((level) => ({ kind: 'machine' as const, level })),
  ...GEARWORKS_CHAIN_LEVELS.map((level) => ({ kind: 'chain' as const, level })),
  ...GEARWORKS_LOOP_LEVELS.map((level) => ({ kind: 'loop' as const, level })),
  ...GEARWORKS_SENSOR_LEVELS.map((level) => ({ kind: 'sensor' as const, level })),
  ...GEARWORKS_SORTER_LEVELS.map((level) => ({ kind: 'sorter' as const, level })),
  ...GEARWORKS_COUNTER_LEVELS.map((level) => ({ kind: 'counter' as const, level })),
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
  { kind: 'soon', id: 'gw-jam-machine', shortTitle: 'Jam Machine', emoji: '🍯' },
];
