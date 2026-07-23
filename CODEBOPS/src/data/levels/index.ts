/** All levels in play order (unlock chain follows this sequence). */
import type { LevelDef } from '../schemas/level';
import { SPARKLE_MEADOW_LEVELS } from './sparkleMeadow';
import { BUBBLE_BAY_LEVELS } from './bubbleBay';
import { PATTERN_FOREST_LEVELS } from './patternForest';
import { ROBOT_TOWN_LEVELS } from './robotTown';
import { AGENT_ACADEMY_LEVELS } from './agentAcademy';

export * from './sparkleMeadow';
export * from './bubbleBay';
export * from './patternForest';
export * from './robotTown';
export * from './agentAcademy';

export const ALL_LEVELS: readonly LevelDef[] = [
  ...SPARKLE_MEADOW_LEVELS,
  ...BUBBLE_BAY_LEVELS,
  ...PATTERN_FOREST_LEVELS,
  ...ROBOT_TOWN_LEVELS,
  ...AGENT_ACADEMY_LEVELS,
];
