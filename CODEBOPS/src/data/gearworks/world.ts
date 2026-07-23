/**
 * Gearworks Garage — world registration + Phase 1 level shell data.
 *
 * Levels here are intentionally minimal: the machine-state model and its
 * typed level schema arrive in Phase 2. Phase 1 only needs enough data to
 * drive the level picker, the mission card, and the workshop shell.
 */

export const GEARWORKS_WORLD_ID = 'gearworks-garage' as const;

export interface GearworksWorldMeta {
  readonly id: typeof GEARWORKS_WORLD_ID;
  readonly emoji: string;
  readonly name: string;
  readonly tagline: string;
  /** Camera preset id used by the workshop shell (see cameraPresets). */
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
  | 'bench'      // gear trains, motors, debugging, jam machine
  | 'factory'    // conveyor sorting
  | 'orchestra'  // music machines
  | 'lighthouse' // signals & timing
  | 'delivery'   // multi-Bop parallelism
  | 'painter'    // code painter
  | 'story'      // story stage
  | 'maker';     // machine maker

/** Phase 1 shell level definition (extended by the Phase 2 machine schema). */
export interface GearworksLevelShell {
  readonly id: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly family: GearworksFamilyId;
  readonly goalText: string;
  readonly emoji: string;
  /** Phase in which this level becomes playable (picker shows 🔒 until then). */
  readonly playable: boolean;
  readonly brief: { readonly title: string; readonly text: string; readonly emoji: string };
}

export const GEARWORKS_LEVELS: readonly GearworksLevelShell[] = [
  {
    id: 'gw-motor-start',
    title: 'Gearworks Garage',
    shortTitle: 'Motor Start',
    family: 'bench',
    goalText: 'Wake up the workshop! Look around — the machines arrive soon.',
    emoji: '🔌',
    playable: true,
    brief: {
      title: 'Welcome to the Garage!',
      text: 'The Great Bop Machine stopped working! Zip needs your help to fix every machine in the garage. Have a look around — your first job starts soon!',
      emoji: '⚙️',
    },
  },
  {
    id: 'gw-gear-train',
    title: 'Gearworks Garage',
    shortTitle: 'Gear Train',
    family: 'bench',
    goalText: 'Connect the gears to make the strawberry press work!',
    emoji: '⚙️',
    playable: false,
    brief: { title: 'Gear Train', text: 'Coming soon!', emoji: '⚙️' },
  },
  {
    id: 'gw-belt-builder',
    title: 'Gearworks Garage',
    shortTitle: 'Belt Builder',
    family: 'bench',
    goalText: 'Stretch belts between the axles to share the spin!',
    emoji: '🔗',
    playable: false,
    brief: { title: 'Belt Builder', text: 'Coming soon!', emoji: '🔗' },
  },
  {
    id: 'gw-motor-programmer',
    title: 'Gearworks Garage',
    shortTitle: 'Motor Programmer',
    family: 'bench',
    goalText: 'Program the motor: speed, direction, start and stop!',
    emoji: '🎛️',
    playable: false,
    brief: { title: 'Motor Programmer', text: 'Coming soon!', emoji: '🎛️' },
  },
];

/** Phase 1 command-tray shell: visible, correctly colored, not yet runnable. */
export interface GearworksTileShell {
  readonly id: string;
  readonly label: string;
  /** Semantic color family from the locked palette (§20). */
  readonly tone: 'start' | 'stop' | 'rotate' | 'wait' | 'move';
  readonly icon: string; // inline SVG inner markup, 24×24 viewBox
}

const ICON_PLAY = '<path d="M8 5 L19 12 L8 19 Z"/>';
const ICON_STOP = '<rect x="6.5" y="6.5" width="11" height="11" rx="2.5"/>';
const ICON_CW = '<g fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round"><path d="M6.2 9.4 A7.2 7.2 0 0 1 18.4 8.2"/></g><path d="M19.6 4.4 L19.9 9.4 L14.9 8.7 Z"/><path d="M12 14.5 a3 3 0 1 0 .01 0" fill="none" stroke="currentColor" stroke-width="2.4"/>';
const ICON_CCW = '<g fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round"><path d="M17.8 9.4 A7.2 7.2 0 0 0 5.6 8.2"/></g><path d="M4.4 4.4 L4.1 9.4 L9.1 8.7 Z"/><path d="M12 14.5 a3 3 0 1 0 .01 0" fill="none" stroke="currentColor" stroke-width="2.4"/>';
const ICON_WAIT = '<circle cx="12" cy="12" r="8.4" fill="none" stroke="currentColor" stroke-width="2.6"/><g stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 7.4 V12 L15.2 14.2"/></g>';

export const GEARWORKS_TRAY_SHELL: readonly GearworksTileShell[] = [
  { id: 'gwStartMotor', label: 'Start', tone: 'start', icon: ICON_PLAY },
  { id: 'gwStopMotor', label: 'Stop', tone: 'stop', icon: ICON_STOP },
  { id: 'gwTurnCw', label: 'Spin', tone: 'rotate', icon: ICON_CW },
  { id: 'gwTurnCcw', label: 'Spin Back', tone: 'rotate', icon: ICON_CCW },
  { id: 'gwWait', label: 'Wait', tone: 'wait', icon: ICON_WAIT },
];
