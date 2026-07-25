/**
 * The mini-app project model (spec §12) — what a child's app IS on disk.
 *
 * Deliberately data-only and deliberately boring: scenes hold components,
 * components sit in named slots, scripts belong to a component and hold a
 * trigger plus commands. Nothing here can execute; the runtime reads this
 * and the renderer draws it.
 *
 * Every project is versioned and validated before it runs and before it
 * saves, so a hand-edited or half-written file can never reach a child.
 */
import type {
  MiniAppType, MiniAppComponentType, MiniAppCommand, MiniAppTrigger,
  MiniAppVariableType, MiniAppVariableVisual, MiniAppGoalType,
  SerializableValue, MiniAppStateToken,
} from './miniAppTypes';
import type { CurriculumStageId, LearningPhase } from '../data/curriculum/stages';

/** Bump when the on-disk shape changes; migrations key off it. */
export const MINI_APP_SCHEMA_VERSION = 1;

/**
 * A title assembled from prepared tokens (spec §22) — never typed. Kept
 * as the token list so a title can be re-rendered in another language or
 * re-drawn as icons without re-parsing a string.
 */
export interface MiniAppTitle {
  readonly tokens: readonly string[];
  /** Repeat number for "Star Music 2". Omitted for the first of a name. */
  readonly version?: number;
}

/** A project's icon is a composed glyph, not an uploaded image. */
export interface MiniAppIconDefinition {
  readonly glyph: string;
  readonly backgroundColor: string;
}

/** Points at something in the approved asset registry. Never a URL. */
export interface ApprovedAssetReference {
  readonly assetId: string;
}

export interface MiniAppComponent {
  readonly id: string;
  readonly type: MiniAppComponentType;
  /** Must exist in the approved asset registry. */
  readonly assetId: string;
  /** Must be a slot the scene's layout template offers. */
  readonly slotId: string;
  readonly initialState: SerializableValue;
  /** Read out by assistive tech; required, never blank. */
  readonly accessibilityLabel: string;
  /**
   * Sorting kits compare properties rather than identity, so an item and
   * a basket can be "the same kind of thing".
   */
  readonly properties?: {
    readonly color?: string;
    readonly shape?: string;
    readonly itemType?: string;
  };
}

export interface MiniAppScene {
  readonly id: string;
  /** Must exist in the layout registry; decides the legal slot ids. */
  readonly layoutTemplateId: string;
  readonly components: readonly MiniAppComponent[];
}

export interface MiniAppScript {
  readonly id: string;
  /** The component this script belongs to — scripts are never free-floating. */
  readonly ownerId: string;
  readonly trigger: MiniAppTrigger;
  readonly commands: readonly MiniAppCommand[];
}

export interface MiniAppVariableDefinition {
  readonly id: string;
  readonly type: MiniAppVariableType;
  readonly initialValue: SerializableValue;
  readonly visualRepresentation: MiniAppVariableVisual;
  readonly accessibilityLabel: string;
}

/** A reusable behaviour — a Job Card / Pattern Card. */
export interface MiniAppJobDefinition {
  readonly id: string;
  readonly iconId: string;
  readonly title: MiniAppTitle;
  readonly commands: readonly MiniAppCommand[];
}

export interface MiniAppGoal {
  readonly type: MiniAppGoalType;
  /** Shown on the goal card; assembled from prepared tokens. */
  readonly title: MiniAppTitle;
  readonly glyph: string;
  /** Target for score/collect goals. */
  readonly target?: number;
}

/**
 * A helper's brain (spec §5.5). Deterministic by construction: goal,
 * tools, ordered rules, memory and an explicit approval gate. No model,
 * no free text, no chat.
 */
export interface MiniAppHelperDefinition {
  readonly goalId: string;
  readonly toolIds: readonly string[];
  readonly rules: readonly MiniAppScript[];
  readonly memoryVariableId?: string;
  /** Actions the helper must ASK about before performing. */
  readonly requiresApprovalFor: readonly string[];
}

/** What the project shows about learning (spec §23). */
export interface MiniAppCurriculumMetadata {
  readonly conceptsUsed: readonly CurriculumStageId[];
  /** Which creator step the child has actually reached. */
  readonly creatorStage: 'choose' | 'build' | 'teach' | 'test' | 'debug' | 'present';
  /** The learning phase a finished, tested project evidences. */
  readonly phase: LearningPhase;
}

/**
 * Runtime caps travel WITH the project. If a template's limits are later
 * relaxed, an old save still runs under the budget it was built against.
 */
export interface MiniAppRuntimeBudget {
  readonly maximumSteps: number;
  readonly maximumEventChainDepth: number;
  readonly maximumMessagesPerStep: number;
}

export interface MiniAppProject {
  readonly id: string;
  readonly schemaVersion: number;
  readonly type: MiniAppType;
  readonly templateId: string;
  readonly themeId: string;
  readonly title: MiniAppTitle;
  readonly iconDefinition: MiniAppIconDefinition;
  readonly scenes: readonly MiniAppScene[];
  readonly scripts: readonly MiniAppScript[];
  readonly variables: readonly MiniAppVariableDefinition[];
  readonly jobs: readonly MiniAppJobDefinition[];
  readonly assets: readonly ApprovedAssetReference[];
  readonly goal: MiniAppGoal;
  readonly helper?: MiniAppHelperDefinition;
  readonly curriculum: MiniAppCurriculumMetadata;
  readonly runtimeBudget: MiniAppRuntimeBudget;
  readonly createdAt: number;
  readonly updatedAt: number;
}

// ---------------------------------------------------------------------
// Small read-only helpers. No mutation anywhere in this module.
// ---------------------------------------------------------------------

export function allComponents(project: MiniAppProject): MiniAppComponent[] {
  return project.scenes.flatMap((s) => s.components);
}

export function findComponent(project: MiniAppProject, id: string): MiniAppComponent | null {
  return allComponents(project).find((c) => c.id === id) ?? null;
}

export function scriptsFor(project: MiniAppProject, componentId: string): MiniAppScript[] {
  return project.scripts.filter((s) => s.ownerId === componentId);
}

/** Every component state a project's commands and tests can ask about. */
export function statesUsed(project: MiniAppProject): MiniAppStateToken[] {
  const out = new Set<MiniAppStateToken>();
  for (const c of allComponents(project)) {
    if (typeof c.initialState === 'string') out.add(c.initialState);
  }
  return [...out];
}

/** A stable, human-readable title for reports and the library card. */
export function titleText(title: MiniAppTitle): string {
  const words = title.tokens.join(' ');
  return title.version && title.version > 1 ? `${words} ${title.version}` : words;
}
