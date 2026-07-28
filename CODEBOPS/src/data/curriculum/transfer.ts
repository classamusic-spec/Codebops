/**
 * Transfer challenges (§21).
 *
 * A concept met in one world and never seen again was not learned, it
 * was performed. This registry names, for each idea, the places it shows
 * up wearing different clothes — a Loop is a Bubble Bay swim, a Gearworks
 * lift, an Orchestra chorus, a Code Painter square and an App Lab
 * animation, and the point of the list is that a child should be able to
 * feel those are the same idea.
 *
 * It is also the honest check on the curriculum: if a stage has only one
 * home, the validator says so. That is a real finding about the design,
 * not a bug in this file, so it reports rather than throws.
 *
 * Pure data. No DOM, no THREE.
 */
import type { CurriculumStageId, WorldId } from './stages';

export interface TransferSite {
  readonly world: WorldId;
  /** What the idea looks like HERE, in the child's words. */
  readonly childFacingForm: string;
}

export interface TransferChallenge {
  readonly stage: CurriculumStageId;
  /** The question that makes the link visible. */
  readonly childFacingPrompt: string;
  readonly sites: readonly TransferSite[];
}

export const TRANSFER_CHALLENGES: readonly TransferChallenge[] = [
  {
    stage: 'loops',
    childFacingPrompt: 'Where else have you seen something repeat?',
    sites: [
      { world: 'bubble-bay', childFacingForm: 'Swimming the same way again and again' },
      { world: 'gearworks-garage', childFacingForm: 'A lift going up over and over' },
      { world: 'app-lab', childFacingForm: 'An animation that keeps playing' },
      { world: 'imagination-island', childFacingForm: 'Anything you want to happen more than once' },
    ],
  },
  {
    stage: 'conditions',
    childFacingPrompt: 'Where else does something get checked first?',
    sites: [
      { world: 'pattern-forest', childFacingForm: 'Checking a flower before picking it' },
      { world: 'gearworks-garage', childFacingForm: 'Sending an item left or right' },
      { world: 'agent-academy', childFacingForm: 'A helper rule that only fires sometimes' },
      { world: 'app-lab', childFacingForm: 'A quiz that knows if the answer is right' },
    ],
  },
  {
    stage: 'functions',
    childFacingPrompt: 'Where else did you save a job to use again?',
    sites: [
      { world: 'robot-town', childFacingForm: 'A Job Card a Bop can follow' },
      { world: 'gearworks-garage', childFacingForm: 'A press job saved once and reused' },
      { world: 'app-lab', childFacingForm: 'A behaviour more than one thing can use' },
    ],
  },
  {
    stage: 'variables',
    childFacingPrompt: 'Where else did a number get remembered?',
    sites: [
      { world: 'gearworks-garage', childFacingForm: 'The speed of a gear' },
      { world: 'robot-town', childFacingForm: 'How many berries are in the basket' },
      { world: 'app-lab', childFacingForm: 'A score going up' },
    ],
  },
  {
    stage: 'messages',
    childFacingPrompt: 'Where else did one helper tell another something?',
    sites: [
      { world: 'robot-town', childFacingForm: 'Passing a delivery along' },
      { world: 'gearworks-garage', childFacingForm: 'One machine starting another' },
      { world: 'app-lab', childFacingForm: 'One part of your app waking up another' },
    ],
  },
  {
    stage: 'state',
    childFacingPrompt: 'Where else did something change what it was doing?',
    sites: [
      { world: 'gearworks-garage', childFacingForm: 'A machine that is running or stopped' },
      { world: 'app-lab', childFacingForm: 'A story that moves to the next scene' },
    ],
  },
  {
    stage: 'agents',
    childFacingPrompt: 'Where else did a helper choose for itself?',
    sites: [
      { world: 'agent-academy', childFacingForm: 'A helper that waters only the droopy flowers' },
      { world: 'gearworks-garage', childFacingForm: 'A machine that waits for a sensor' },
      { world: 'app-lab', childFacingForm: 'A helper living inside your app' },
      { world: 'imagination-island', childFacingForm: 'A helper you invented' },
    ],
  },
  {
    stage: 'sequence',
    childFacingPrompt: 'Where else did the order matter?',
    sites: [
      { world: 'sparkle-meadow', childFacingForm: 'Walking, then grabbing, then dropping' },
      { world: 'gearworks-garage', childFacingForm: 'Start, then wait, then stop' },
      { world: 'app-lab', childFacingForm: 'The steps your app takes when it is tapped' },
    ],
  },
  {
    stage: 'decomposition',
    childFacingPrompt: 'Where else did you split a big job into small ones?',
    sites: [
      { world: 'robot-town', childFacingForm: 'Giving each Bop part of the work' },
      { world: 'gearworks-garage', childFacingForm: 'One machine per step of the line' },
      { world: 'app-lab', childFacingForm: 'One script per thing on the screen' },
    ],
  },
];

const BY_STAGE = new Map(TRANSFER_CHALLENGES.map((t) => [t.stage, t]));

export function transferFor(stageId: CurriculumStageId): TransferChallenge | null {
  return BY_STAGE.get(stageId) ?? null;
}

