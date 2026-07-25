/**
 * Gearworks Garage — world registration, command-tile registry, and the
 * level-picker roster (playable machine levels + coming-soon slots).
 */
import type { GearworksCommandId } from '../../gameplay/gearworks/machine';
import type { GwLoopCommandId } from '../../gameplay/gearworks/loopMachine';
import type { GwSensorCommandId } from '../../gameplay/gearworks/sensorMachine';
import type { GtCommandId } from '../../gameplay/gearworks/sorterMachine';
import type { GcCommandId } from '../../gameplay/gearworks/counterMachine';
import type { GjCommandId } from '../../gameplay/gearworks/jamMachine';
import type { JobMainId } from '../../gameplay/gearworks/jobMachine';
import type { SignalCommandId } from '../../gameplay/gearworks/signalMachine';
import type { LlCommandId } from '../../gameplay/gearworks/logicMachine';
import type { DvCommandId } from '../../gameplay/gearworks/deliveryMachine';
import type { PpCommandId } from '../../gameplay/gearworks/paintMachine';
import type { StoryEventId } from '../../gameplay/gearworks/storyMachine';
import type { MkBodyId } from '../../gameplay/gearworks/makerMachine';
import {
  GEARWORKS_MACHINE_LEVELS, GEARWORKS_CHAIN_LEVELS, GEARWORKS_LOOP_LEVELS, GEARWORKS_SENSOR_LEVELS,
  GEARWORKS_SORTER_LEVELS, GEARWORKS_COUNTER_LEVELS, GEARWORKS_JAM_LEVELS, GEARWORKS_JOB_LEVELS,
  GEARWORKS_SIGNAL_LEVELS, GEARWORKS_DEBUG_LEVELS, GEARWORKS_FACTORY_LEVELS, GEARWORKS_ORCHESTRA_LEVELS,
  GEARWORKS_LIGHTHOUSE_LEVELS, GEARWORKS_DELIVERY_LEVELS, GEARWORKS_PAINT_LEVELS, GEARWORKS_STORY_LEVELS,
  GEARWORKS_MAKER_LEVELS,
} from './levels';
import type {
  GearworksMachineLevel, GearworksChainLevel, GearworksLoopLevel, GearworksSensorLevel,
  GearworksSorterLevel, GearworksCounterLevel, GearworksJamLevel, GearworksJobLevel,
  GearworksSignalLevel, GearworksDebugLevel, GearworksOrchestraLevel, GearworksLighthouseLevel,
  GearworksDeliveryLevel, GearworksPaintLevel, GearworksStoryLevel, GearworksMakerLevel,
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
const ICON_SEND_UP = '<path d="M12 21 V11 A0 0 0 0 1 12 11" fill="none"/><path d="M6.5 20 H17.5 A0 0 0 0 0 17.5 20" fill="none"/><path d="M12 20 V9" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/><path d="M6.4 13 L12 6 L17.6 13 Z"/><path d="M6 20 H18" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>';

export const GW_SORTER_TILES: Readonly<Record<GtCommandId, GwTileDef>> = {
  gtIfRed:     { label: 'If Red', spoken: 'Only do the next tile if the item is red', tone: 'stop', icon: ICON_BERRY },
  gtIfBlue:    { label: 'If Blue', spoken: 'Only do the next tile if the item is blue', tone: 'move', icon: ICON_BERRY },
  gtIfRound:   { label: 'If Round', spoken: 'Only do the next tile if the item is round', tone: 'check', icon: ICON_ROUND },
  gtIfSquare:  { label: 'If Square', spoken: 'Only do the next tile if the item is square', tone: 'check', icon: ICON_BLOCK },
  gtSendLeft:  { label: 'Send Left', spoken: 'Push the item into the left basket', tone: 'rotate', icon: ICON_SEND_LEFT },
  gtSendRight: { label: 'Send Right', spoken: 'Push the item into the right basket', tone: 'loop', icon: ICON_SEND_RIGHT },
  gtSendUp:    { label: 'Send Up', spoken: 'Push the item into the back basket', tone: 'start', icon: ICON_SEND_UP },
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

// ---------- Phase 8 Jam Machine tiles ----------

const ICON_MOTOR_ON = '<rect x="4" y="8" width="12" height="8" rx="2.4"/><rect x="16.5" y="10.4" width="2.6" height="3.2" rx="0.8"/><path d="M8.8 12 L11.4 9 L10.2 11.6 L12.6 11.6 L9.4 15.6 L10.8 12.4 Z" fill="var(--tile-deep, #157a33)"/>';
const ICON_MOTOR_OFF = '<rect x="4" y="8" width="12" height="8" rx="2.4" fill="none" stroke="currentColor" stroke-width="2.4"/><rect x="16.5" y="10.4" width="2.6" height="3.2" rx="0.8"/><rect x="8.4" y="10.4" width="3.2" height="3.2" rx="0.8"/>';
const ICON_CONV_ON = '<rect x="2.8" y="12.5" width="18.4" height="5" rx="2.5" fill="none" stroke="currentColor" stroke-width="2.3"/><circle cx="6.6" cy="15" r="1.2"/><circle cx="12" cy="15" r="1.2"/><circle cx="17.4" cy="15" r="1.2"/><path d="M9.6 4.6 L15.2 8 L9.6 11.4 Z"/>';
const ICON_CONV_OFF = '<rect x="2.8" y="12.5" width="18.4" height="5" rx="2.5" fill="none" stroke="currentColor" stroke-width="2.3"/><circle cx="6.6" cy="15" r="1.2"/><circle cx="12" cy="15" r="1.2"/><circle cx="17.4" cy="15" r="1.2"/><rect x="9.8" y="5" width="4.4" height="4.4" rx="1"/>';
const ICON_LOWER = '<rect x="4.4" y="17" width="15.2" height="3" rx="1.4"/><rect x="9" y="9" width="6" height="6" rx="1.2"/><path d="M12 3 V8 M9.2 5.4 L12 8.2 L14.8 5.4" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>';
const ICON_RAISE = '<rect x="4.4" y="17" width="15.2" height="3" rx="1.4"/><rect x="9" y="9" width="6" height="6" rx="1.2"/><path d="M12 8 V3 M9.2 5.6 L12 2.8 L14.8 5.6" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>';

export const GW_JAM_TILES: Readonly<Record<GjCommandId, GwTileDef>> = {
  jmStartMotor:    { label: 'Start Motor', spoken: 'Start the motor', tone: 'start', icon: ICON_MOTOR_ON },
  jmStopMotor:     { label: 'Stop Motor', spoken: 'Stop the motor', tone: 'stop', icon: ICON_MOTOR_OFF },
  jmStartConveyor: { label: 'Belt On', spoken: 'Start the conveyor belt', tone: 'start', icon: ICON_CONV_ON },
  jmStopConveyor:  { label: 'Belt Off', spoken: 'Stop the conveyor belt', tone: 'stop', icon: ICON_CONV_OFF },
  jmWaitSensor:    { label: 'Wait Sensor', spoken: 'Wait until a strawberry reaches the sensor', tone: 'check', icon: ICON_EYE },
  jmLowerPress:    { label: 'Lower Press', spoken: 'Lower the press to make jam', tone: 'rotate', icon: ICON_LOWER },
  jmRaisePress:    { label: 'Raise Press', spoken: 'Raise the press', tone: 'move', icon: ICON_RAISE },
  jmRepeat:        { label: 'Repeat', spoken: 'Repeat the tiles before this — tap the badge to change how many times', tone: 'loop', icon: ICON_REPEAT },
};

// ---------- Phase 9 job-card tiles ----------

const ICON_FETCH = '<path d="M3 15 H13 A4 4 0 0 0 17 11 V7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M17 4 A3 3 0 0 1 20 7 A3 3 0 0 1 17 10 A3 3 0 0 1 14 7 A3 3 0 0 1 17 4 Z"/><path d="M2.4 12 L6.2 18 L10 12 Z"/>';
const ICON_DO = '<rect x="3.5" y="4.5" width="17" height="15" rx="3" fill="none" stroke="currentColor" stroke-width="2.3"/><path d="M6.5 8.5 H14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M9.6 12.4 L11.8 14.4 L9.6 16.4 Z"/><path d="M12.6 14.4 H16.4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>';

export const GW_JOB_TILES: Readonly<Record<JobMainId, GwTileDef>> = {
  jbFetch:  { label: 'Fetch', spoken: 'Fetch a strawberry onto the press', tone: 'move', icon: ICON_FETCH },
  jbPress:  { label: 'Press', spoken: 'Press the strawberry into a jar of jam', tone: 'rotate', icon: ICON_LOWER },
  jbDoJob:  { label: 'Do Make Jam', spoken: 'Do the whole Make Jam job at once', tone: 'check', icon: ICON_DO },
  jbRepeat: { label: 'Repeat', spoken: 'Repeat the tiles before this — tap the badge to change how many times', tone: 'loop', icon: ICON_REPEAT },
};

// ---------- Phase 10 signal-lane tiles ----------

const ICON_GIFT = '<path d="M4.5 9.5 H19.5 V11.5 H4.5 Z"/><path d="M5.6 11.5 H18.4 V20 H5.6 Z" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M12 6 C12 4 9 3.4 9 5.4 C9 7 11 8 12 9.5 C13 8 15 7 15 5.4 C15 3.4 12 4 12 6 Z"/><path d="M12 9.5 V20" stroke="currentColor" stroke-width="2.2"/>';
const ICON_PACK = '<path d="M12 3 L20 7 V17 L12 21 L4 17 V7 Z" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linejoin="round"/><path d="M4 7 L12 11 L20 7 M12 11 V21" fill="none" stroke="currentColor" stroke-width="2.1"/>';
const ICON_SEND_SIG = '<circle cx="7" cy="17" r="2.2"/><path d="M6 11 A6 6 0 0 1 12 17" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M6 6.6 A10.4 10.4 0 0 1 16.4 17" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>';
const ICON_WAIT_SIG = '<circle cx="17" cy="17" r="2.2"/><path d="M18 11 A6 6 0 0 0 12 17" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M18 6.6 A10.4 10.4 0 0 0 7.6 17" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><circle cx="17" cy="17" r="6.4" fill="none" stroke="currentColor" stroke-width="1.4" stroke-dasharray="2 2.4" opacity="0.7"/>';
const ICON_SHIP = '<path d="M2.6 13 H15 V18 H2.6 Z" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M15 14.4 H18.4 L21 17 V18 H15 Z"/><circle cx="6" cy="19.4" r="1.6"/><circle cx="16.4" cy="19.4" r="1.6"/><path d="M6.5 9.5 H12.5 M9.5 6.5 V12.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';

export const GW_SIGNAL_TILES: Readonly<Record<SignalCommandId, GwTileDef>> = {
  sgFetch:      { label: 'Fetch', spoken: 'Fetch a gift', tone: 'move', icon: ICON_GIFT },
  sgPack:       { label: 'Pack', spoken: 'Pack the gift into the crate', tone: 'rotate', icon: ICON_PACK },
  sgSendSignal: { label: 'Send Signal', spoken: 'Send a signal to the other machine', tone: 'start', icon: ICON_SEND_SIG },
  sgWaitSignal: { label: 'Wait Signal', spoken: 'Wait until a signal arrives', tone: 'check', icon: ICON_WAIT_SIG },
  sgSendCrate:  { label: 'Ship', spoken: 'Ship the crate to the delivery station', tone: 'stop', icon: ICON_SHIP },
  sgRepeat:     { label: 'Repeat', spoken: 'Repeat the tiles before this — tap the badge to change how many times', tone: 'loop', icon: ICON_REPEAT },
};

// ---------- Phase 14 Lighthouse Logic tiles ----------

const ICON_MOON = '<path d="M14.6 3.4 A8.6 8.6 0 1 0 20.6 14.2 A6.6 6.6 0 0 1 14.6 3.4 Z"/><circle cx="17.4" cy="6.6" r="0.9"/><circle cx="19.6" cy="10.2" r="0.7"/>';
const ICON_BOAT = '<path d="M3 14 H21 L18.4 19 H5.6 Z" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linejoin="round"/><path d="M12 3.4 V13" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M12 4.4 L18 11.6 H12 Z"/>';
const ICON_FOG = '<g stroke="currentColor" stroke-width="2.6" stroke-linecap="round" fill="none"><path d="M4 8.5 H18"/><path d="M6 12 H20"/><path d="M4 15.5 H16"/><path d="M8 19 H19"/></g>';
const ICON_STORM = '<path d="M6 4 H15 L12 10 H17 L7 21 L10 12 H5 Z"/>';
const ICON_NOT = '<circle cx="12" cy="12" r="8.4" fill="none" stroke="currentColor" stroke-width="2.8"/><path d="M6.4 6.4 L17.6 17.6" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/>';
const ICON_AND = '<path d="M8 5 H12 A6 6 0 0 1 12 17 H8 Z M8 5 V17" fill="none" stroke="currentColor" stroke-width="2.7" stroke-linejoin="round" stroke-linecap="round"/><path d="M5 9 H8 M5 13 H8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M18 9 V15" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>';
const ICON_OR = '<path d="M6 5 Q11 5 15 12 Q11 19 6 19 Q9 12 6 5 Z" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/><path d="M3.4 9 H6.6 M3.4 13 H6.6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M19.4 12 H15" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>';

export const GW_LIGHTHOUSE_TILES: Readonly<Record<LlCommandId, GwTileDef>> = {
  llIfDark:  { label: 'If Dark', spoken: 'True when the sky is dark', tone: 'check', icon: ICON_MOON },
  llIfShip:  { label: 'If Ship', spoken: 'True when a ship is near', tone: 'move', icon: ICON_BOAT },
  llIfFog:   { label: 'If Fog', spoken: 'True when it is foggy', tone: 'check', icon: ICON_FOG },
  llIfStorm: { label: 'If Storm', spoken: 'True when a storm is blowing', tone: 'stop', icon: ICON_STORM },
  llNot:     { label: 'Not', spoken: 'Flip the next condition — true becomes false', tone: 'stop', icon: ICON_NOT },
  llAnd:     { label: 'And', spoken: 'Both must be true', tone: 'rotate', icon: ICON_AND },
  llOr:      { label: 'Or', spoken: 'Either one can be true', tone: 'loop', icon: ICON_OR },
};

// ---------- Phase 15 Delivery Depot tiles ----------

const ICON_LOAD = '<path d="M2.6 13 H13 V18 H2.6 Z" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M13 14.4 H16.4 L19 17 V18 H13 Z"/><circle cx="6" cy="19.4" r="1.5"/><circle cx="16.2" cy="19.4" r="1.5"/><path d="M8 3 V9 M5 6.2 L8 9.4 L11 6.2" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>';
const ICON_DELIVER = '<path d="M5 10 L12 4.4 L19 10 V20 H5 Z" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linejoin="round"/><rect x="10" y="13.5" width="4" height="6.5"/><path d="M12 6.6 V12 M9.4 9.6 L12 12.2 L14.6 9.6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>';
const ICON_DRIVE = '<path d="M2.6 12 H12.5 V18 H2.6 Z" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M12.5 13.6 H16.4 L19.4 16.6 V18 H12.5 Z"/><circle cx="6" cy="19.4" r="1.6"/><circle cx="16.4" cy="19.4" r="1.6"/><path d="M17.6 7.2 H22 M17.6 10 H21 M17.6 4.4 H20.4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>';

export const GW_DELIVERY_TILES: Readonly<Record<DvCommandId, GwTileDef>> = {
  dvLoad:    { label: 'Load', spoken: 'Load the parcel at the front of the line onto the truck', tone: 'move', icon: ICON_LOAD },
  dvDeliver: { label: 'Deliver', spoken: 'Deliver the parcel to the house in front of you', tone: 'start', icon: ICON_DELIVER },
  dvDrive:   { label: 'Drive', spoken: 'Drive to the next house', tone: 'rotate', icon: ICON_DRIVE },
  dvRepeat:  { label: 'Repeat', spoken: 'Repeat the tiles before this — tap the badge to change how many times', tone: 'loop', icon: ICON_REPEAT },
};

// ---------- Phase 16 Paint Parade tiles ----------

const ICON_STAMP = '<circle cx="12" cy="13.5" r="5.6"/><path d="M12 7.9 V3.4" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M8.6 4.4 H15.4" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>';
const ICON_STEP = '<path d="M4 12 H17" stroke="currentColor" stroke-width="2.9" stroke-linecap="round"/><path d="M13.4 7 L19.6 12 L13.4 17 Z"/>';
const ICON_NEWROW = '<path d="M18 5 V11 A3 3 0 0 1 15 14 H6" fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 10.4 L5 14 L9 17.6 Z"/>';
const ICON_REPEAT_PARADE = '<rect x="3.2" y="4.4" width="17.6" height="15.2" rx="3.4" fill="none" stroke="currentColor" stroke-width="2.2" opacity="0.85"/><path d="M9 9.2 H14.4 A2.6 2.6 0 0 1 17 11.8 V12.4" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/><path d="M15.2 15 H9.8 A2.6 2.6 0 0 1 7.2 12.4 V11.8" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/><path d="M17 10.6 L18.6 13 L15.4 13.1 Z"/><path d="M7.2 13.6 L5.6 11.2 L8.8 11.1 Z"/>';

export const GW_PAINT_TILES: Readonly<Record<PpCommandId, GwTileDef>> = {
  ppStamp:         { label: 'Stamp', spoken: 'Stamp a coloured dot here', tone: 'start', icon: ICON_STAMP },
  ppStep:          { label: 'Step', spoken: 'Step one square to the right', tone: 'move', icon: ICON_STEP },
  ppNewRow:        { label: 'New Row', spoken: 'Drop down to the start of the next row', tone: 'rotate', icon: ICON_NEWROW },
  ppRepeatRow:     { label: 'Repeat Row', spoken: 'Repeat the tiles before this to make a row — tap the badge to change how many', tone: 'loop', icon: ICON_REPEAT },
  ppRepeatParade:  { label: 'Repeat Parade', spoken: 'Repeat the whole design so far down the banner — tap the badge to change how many', tone: 'check', icon: ICON_REPEAT_PARADE },
};

// ---------- Phase 17 Story Studio event tiles ----------

const ICON_SUN = '<circle cx="12" cy="12" r="4.6"/><g stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 2.6 V5.2"/><path d="M12 18.8 V21.4"/><path d="M2.6 12 H5.2"/><path d="M18.8 12 H21.4"/><path d="M5.2 5.2 L7 7"/><path d="M17 17 L18.8 18.8"/><path d="M18.8 5.2 L17 7"/><path d="M7 17 L5.2 18.8"/></g>';
const ICON_HUG = '<path d="M12 20.4 C6 16.4 3.4 12.8 3.4 9.4 A4.2 4.2 0 0 1 12 7.4 A4.2 4.2 0 0 1 20.6 9.4 C20.6 12.8 18 16.4 12 20.4 Z"/>';
const ICON_TICKLE = '<path d="M6 18 C6 10 10 4.4 15.6 4.4 C18 4.4 19.6 6 19.6 8.4 C19.6 13.6 12.4 15.6 6 18 Z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M15.6 4.4 L6 18" stroke="currentColor" stroke-width="1.8"/><path d="M4.4 18.4 L7.4 17.2" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>';
const ICON_CALM = '<path d="M4 14 C7 14 8 11.4 12 11.4 C16 11.4 17 14 20 14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M4 18.2 C7 18.2 8 15.6 12 15.6 C16 15.6 17 18.2 20 18.2" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><circle cx="12" cy="6.2" r="2.2"/>';
const ICON_BALL = '<circle cx="12" cy="12" r="8.2" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M12 3.8 C9 7 9 17 12 20.2 M12 3.8 C15 7 15 17 12 20.2 M3.8 12 H20.2" fill="none" stroke="currentColor" stroke-width="1.9"/>';
const ICON_APPLE = '<path d="M12 7 C12 7 10.4 4.4 7.6 5.2 C10 5.6 11 7 11.4 8 M12 8 C9.6 6.4 5.6 7.2 5 11 C4.4 15.4 7.6 20 10 20 C11 20 11.4 19.4 12 19.4 C12.6 19.4 13 20 14 20 C16.4 20 19.6 15.4 19 11 C18.4 7.2 14.4 6.4 12 8 Z"/>';
const ICON_YAWN = '<circle cx="12" cy="12" r="8.4" fill="none" stroke="currentColor" stroke-width="2.4"/><ellipse cx="12" cy="14.4" rx="3.2" ry="4" /><circle cx="8.6" cy="9.4" r="1.1"/><circle cx="15.4" cy="9.4" r="1.1"/>';
const ICON_MOON2 = '<path d="M14.6 3.4 A8.6 8.6 0 1 0 20.6 14.2 A6.6 6.6 0 0 1 14.6 3.4 Z"/><path d="M15 5.4 H19 L15 8.4 H19" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>';

export const GW_STORY_TILES: Readonly<Record<StoryEventId, GwTileDef>> = {
  stWake:   { label: 'Wake', spoken: 'Wake up', tone: 'start', icon: ICON_SUN },
  stHug:    { label: 'Hug', spoken: 'Give a hug', tone: 'move', icon: ICON_HUG },
  stTickle: { label: 'Tickle', spoken: 'Tickle', tone: 'loop', icon: ICON_TICKLE },
  stCalm:   { label: 'Calm', spoken: 'Calm down', tone: 'check', icon: ICON_CALM },
  stPlay:   { label: 'Play', spoken: 'Play', tone: 'start', icon: ICON_BALL },
  stEat:    { label: 'Eat', spoken: 'Eat a snack', tone: 'move', icon: ICON_APPLE },
  stYawn:   { label: 'Yawn', spoken: 'Yawn a big yawn', tone: 'wait', icon: ICON_YAWN },
  stSleep:  { label: 'Sleep', spoken: 'Go to sleep', tone: 'stop', icon: ICON_MOON2 },
};

// ---------- Phase 18 Maker Workshop tiles ----------

export type MkTileId = MkBodyId | 'mkMake';

const ICON_BLOCK2 = '<rect x="5.5" y="5.5" width="13" height="13" rx="2.6"/><path d="M5.5 9.5 H18.5 M9.5 5.5 V18.5" stroke="var(--tile-deep, #333)" stroke-width="1.6"/>';
const ICON_MAKE = '<rect x="4" y="12.5" width="16" height="7.5" rx="1.6" fill="none" stroke="currentColor" stroke-width="2.3"/><path d="M9 12.5 V9.5 A3 3 0 0 1 15 9.5 V12.5" fill="none" stroke="currentColor" stroke-width="2.3"/><circle cx="12" cy="16.2" r="2.1"/><path d="M12 5 V3.2 M9 5.6 L8 4.2 M15 5.6 L16 4.2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';

export const GW_MAKER_TILES: Readonly<Record<MkTileId, GwTileDef>> = {
  mkPlace:       { label: 'Place', spoken: 'Place one block on the tower', tone: 'start', icon: ICON_BLOCK2 },
  mkRepeatParam: { label: 'Repeat (in)', spoken: 'Repeat the tiles before this as many times as the input number', tone: 'loop', icon: ICON_REPEAT },
  mkMake:        { label: 'Make', spoken: 'Call the Make gadget — tap the dial to set the tower height', tone: 'check', icon: ICON_MAKE },
};

// ---------- level picker roster ----------

/** A playable Gearworks level of either kind, in campaign order. */
export type GearworksLevelEntry =
  | { readonly kind: 'machine'; readonly level: GearworksMachineLevel }
  | { readonly kind: 'chain'; readonly level: GearworksChainLevel }
  | { readonly kind: 'loop'; readonly level: GearworksLoopLevel }
  | { readonly kind: 'sensor'; readonly level: GearworksSensorLevel }
  | { readonly kind: 'sorter'; readonly level: GearworksSorterLevel }
  | { readonly kind: 'counter'; readonly level: GearworksCounterLevel }
  | { readonly kind: 'jam'; readonly level: GearworksJamLevel }
  | { readonly kind: 'job'; readonly level: GearworksJobLevel }
  | { readonly kind: 'signal'; readonly level: GearworksSignalLevel }
  | { readonly kind: 'debug'; readonly level: GearworksDebugLevel }
  | { readonly kind: 'orchestra'; readonly level: GearworksOrchestraLevel }
  | { readonly kind: 'lighthouse'; readonly level: GearworksLighthouseLevel }
  | { readonly kind: 'delivery'; readonly level: GearworksDeliveryLevel }
  | { readonly kind: 'painter'; readonly level: GearworksPaintLevel }
  | { readonly kind: 'story'; readonly level: GearworksStoryLevel }
  | { readonly kind: 'maker'; readonly level: GearworksMakerLevel };

export const GEARWORKS_SEQUENCE: readonly GearworksLevelEntry[] = [
  ...GEARWORKS_MACHINE_LEVELS.map((level) => ({ kind: 'machine' as const, level })),
  ...GEARWORKS_CHAIN_LEVELS.map((level) => ({ kind: 'chain' as const, level })),
  ...GEARWORKS_LOOP_LEVELS.map((level) => ({ kind: 'loop' as const, level })),
  ...GEARWORKS_SENSOR_LEVELS.map((level) => ({ kind: 'sensor' as const, level })),
  ...GEARWORKS_SORTER_LEVELS.map((level) => ({ kind: 'sorter' as const, level })),
  ...GEARWORKS_COUNTER_LEVELS.map((level) => ({ kind: 'counter' as const, level })),
  ...GEARWORKS_JAM_LEVELS.map((level) => ({ kind: 'jam' as const, level })),
  ...GEARWORKS_JOB_LEVELS.map((level) => ({ kind: 'job' as const, level })),
  ...GEARWORKS_SIGNAL_LEVELS.map((level) => ({ kind: 'signal' as const, level })),
  ...GEARWORKS_DEBUG_LEVELS.map((level) => ({ kind: 'debug' as const, level })),
  ...GEARWORKS_FACTORY_LEVELS.map((level) => ({ kind: 'sorter' as const, level })),
  ...GEARWORKS_ORCHESTRA_LEVELS.map((level) => ({ kind: 'orchestra' as const, level })),
  ...GEARWORKS_LIGHTHOUSE_LEVELS.map((level) => ({ kind: 'lighthouse' as const, level })),
  ...GEARWORKS_DELIVERY_LEVELS.map((level) => ({ kind: 'delivery' as const, level })),
  ...GEARWORKS_PAINT_LEVELS.map((level) => ({ kind: 'painter' as const, level })),
  ...GEARWORKS_STORY_LEVELS.map((level) => ({ kind: 'story' as const, level })),
  ...GEARWORKS_MAKER_LEVELS.map((level) => ({ kind: 'maker' as const, level })),
];

/** Save-store id of a sequence entry (unlock chain + star display). */
export function gwEntryId(entry: GearworksLevelEntry): string {
  return entry.level.id;
}

export type GearworksPickerEntry =
  | GearworksLevelEntry
  | { readonly kind: 'soon'; readonly id: string; readonly shortTitle: string; readonly emoji: string }
  | { readonly kind: 'trophy'; readonly id: string; readonly shortTitle: string; readonly emoji: string };

export const GEARWORKS_PICKER: readonly GearworksPickerEntry[] = [
  ...GEARWORKS_SEQUENCE,
  { kind: 'trophy', id: 'gw-trophy-room', shortTitle: 'Inventor\'s Trophies', emoji: '🏆' },
];

/**
 * The garage in workshops (level select §layout).
 *
 * Forty-six machines in one list is a wall, however nicely it is drawn.
 * These are the same levels in the same order, cut where the ideas
 * actually change, so the picker can show one workshop at a time.
 *
 * `count` is how many entries of GEARWORKS_SEQUENCE the workshop covers.
 * A test asserts the counts add up to the sequence exactly, so a level
 * added to any group cannot silently fall off the end of the picker.
 */
export interface GearworksWorkshop {
  readonly id: string;
  readonly name: string;
  readonly emoji: string;
  readonly tagline: string;
  readonly count: number;
}

export const GEARWORKS_WORKSHOPS: readonly GearworksWorkshop[] = [
  {
    id: 'gw-first', name: 'First Machines', emoji: '🔧',
    tagline: 'Motors, gears and belts',
    count: GEARWORKS_MACHINE_LEVELS.length + GEARWORKS_CHAIN_LEVELS.length,
  },
  {
    id: 'gw-again', name: 'Again and Again', emoji: '🔁',
    tagline: 'Loops, sensors and waiting',
    count: GEARWORKS_LOOP_LEVELS.length + GEARWORKS_SENSOR_LEVELS.length,
  },
  {
    id: 'gw-sorting', name: 'Sorting Shed', emoji: '🧺',
    tagline: 'Choices and counting',
    count: GEARWORKS_SORTER_LEVELS.length + GEARWORKS_COUNTER_LEVELS.length,
  },
  {
    id: 'gw-band', name: 'Jam Room', emoji: '🥁',
    tagline: 'Saved jobs and signals',
    count: GEARWORKS_JAM_LEVELS.length + GEARWORKS_JOB_LEVELS.length
      + GEARWORKS_SIGNAL_LEVELS.length,
  },
  {
    id: 'gw-fixing', name: 'Fixing Bay', emoji: '🛠️',
    tagline: 'Finding what went wrong',
    count: GEARWORKS_DEBUG_LEVELS.length,
  },
  {
    id: 'gw-factory', name: 'Big Factory', emoji: '🏭',
    tagline: 'Conveyors, lights and queues',
    count: GEARWORKS_FACTORY_LEVELS.length + GEARWORKS_ORCHESTRA_LEVELS.length
      + GEARWORKS_LIGHTHOUSE_LEVELS.length + GEARWORKS_DELIVERY_LEVELS.length,
  },
  {
    id: 'gw-studio', name: 'Paint & Story', emoji: '🎨',
    tagline: 'Loops in loops, and scenes',
    count: GEARWORKS_PAINT_LEVELS.length + GEARWORKS_STORY_LEVELS.length
      + GEARWORKS_MAKER_LEVELS.length,
  },
];
