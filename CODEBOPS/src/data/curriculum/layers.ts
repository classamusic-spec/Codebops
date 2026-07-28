/**
 * The four learning layers (§3).
 *
 * The fourteen curriculum stages say what is taught and in what order.
 * This says WHY the order looks like that — it groups the stages into
 * four ideas a grown-up can hold in their head, and gives each one a
 * sentence a child would recognise.
 *
 * The layers are not a second progression system. Nothing unlocks from
 * here. A stage belongs to exactly one layer, every stage belongs to
 * some layer, and the validator enforces both — so this can never drift
 * into a competing map of the curriculum.
 *
 * Pure data. No DOM, no THREE.
 */
import type { CurriculumStageId } from './stages';

export type LearningLayerId = 'follow' | 'remember' | 'train' | 'build';

export interface LearningLayerDefinition {
  readonly id: LearningLayerId;
  readonly order: number;
  /** The grown-up name for what this layer is about. */
  readonly formalName: string;
  /** The sentence a child would be told. */
  readonly childFacingIdea: string;
  readonly icon: string;
  /** Stages this layer is responsible for teaching. */
  readonly stages: readonly CurriculumStageId[];
}

export const LEARNING_LAYERS: readonly LearningLayerDefinition[] = [
  {
    id: 'follow', order: 1,
    formalName: 'Follow instructions',
    childFacingIdea: 'Teach your Bop what to do.',
    icon: '👣',
    stages: ['sequence', 'events', 'loops', 'conditions', 'if-else', 'functions'],
  },
  {
    id: 'remember', order: 2,
    formalName: 'Remember and cooperate',
    childFacingIdea: 'Help your Bops remember and work together.',
    icon: '🧠',
    stages: ['variables', 'state', 'messages', 'parallelism', 'decomposition', 'data'],
  },
  {
    id: 'train', order: 3,
    formalName: 'Train intelligent helpers',
    childFacingIdea: 'Teach your helper how to make careful choices.',
    icon: '🎓',
    stages: ['agents'],
  },
  {
    id: 'build', order: 4,
    formalName: 'Build useful creations',
    childFacingIdea: 'Use what you learned to build something new.',
    icon: '🛠️',
    // Debugging lives here on purpose. It is not a thing you learn once
    // and move past — it is what you do the whole time you are making
    // something, and the create-phase levels are where it finally has
    // something worth repairing.
    stages: ['debugging'],
  },
];

const BY_ID = new Map(LEARNING_LAYERS.map((l) => [l.id, l]));
const LAYER_OF = new Map<CurriculumStageId, LearningLayerId>();
for (const l of LEARNING_LAYERS) for (const s of l.stages) LAYER_OF.set(s, l.id);

export function layer(id: LearningLayerId): LearningLayerDefinition {
  const l = BY_ID.get(id);
  if (!l) throw new Error(`[layers] Unknown layer "${id}"`);
  return l;
}

/** Which layer teaches this stage. Throws for an unplaced stage. */
export function layerOfStage(stageId: CurriculumStageId): LearningLayerDefinition {
  const id = LAYER_OF.get(stageId);
  if (!id) throw new Error(`[layers] Stage "${stageId}" is not in any layer`);
  return layer(id);
}

export function isLayerId(id: string): id is LearningLayerId {
  return BY_ID.has(id as LearningLayerId);
}
