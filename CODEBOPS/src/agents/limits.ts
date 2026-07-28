/**
 * Safe stopping (§11, §29) — one policy, for every helper.
 *
 * The inspection found five constants expressing the same idea in five
 * places: `MAX_STEPS 80`, `GW_MAX_TICKS 60`, `GS_MAX_TICKS 30`,
 * `SG_MAX_TICKS 40`, `GL_MAX_ACTIONS 40`. None of them were wrong, but
 * five numbers mean five chances for one of them to be missing, and a
 * missing one is a frozen tablet.
 *
 * The rule this file exists to keep: **the game never freezes because of
 * a child's program.** Reaching a limit is a RESULT — something Forever
 * Fred can turn up and explain — and never an error, and never a hang.
 * A helper that stops on its limit keeps everything it built.
 */
import type { AgentLimits, SafeStopReason } from './types';

/**
 * The default budget.
 *
 * Chosen against real levels, not by feel: the longest hand-authored
 * Agent Academy courtyard needs 11 decisions, and the largest Gearworks
 * line about 30, so 60 leaves generous headroom for a child's inefficient
 * but legitimate plan while still ending in well under a second.
 */
export const DEFAULT_LIMITS: AgentLimits = {
  maximumSteps: 60,
  maximumActions: 40,
  maximumMemoryEntries: 24,
  maximumRepeatsPerSubject: 3,
};

/** A gentler budget for a first helper — fewer steps, same protections. */
export const BEGINNER_LIMITS: AgentLimits = {
  maximumSteps: 24,
  maximumActions: 16,
  maximumMemoryEntries: 8,
  maximumRepeatsPerSubject: 2,
};

/**
 * Fill in anything a saved helper does not specify.
 *
 * Old saves predate fields that get added later, and a helper with an
 * undefined cap is a helper with no cap. Defaulting here means the
 * engine can treat limits as total.
 */
export function withDefaults(limits?: Partial<AgentLimits>): AgentLimits {
  return {
    maximumSteps: positive(limits?.maximumSteps, DEFAULT_LIMITS.maximumSteps),
    maximumActions: positive(limits?.maximumActions, DEFAULT_LIMITS.maximumActions),
    maximumMemoryEntries: positive(limits?.maximumMemoryEntries, DEFAULT_LIMITS.maximumMemoryEntries),
    maximumRepeatsPerSubject: positive(
      limits?.maximumRepeatsPerSubject, DEFAULT_LIMITS.maximumRepeatsPerSubject,
    ),
  };
}

/**
 * A cap must be a positive whole number.
 *
 * Zero is the dangerous case and the reason this is not just `?? default`:
 * a limit of 0 reads as "no budget", the helper stops before its first
 * step, and the level looks broken rather than protected. NaN from a
 * corrupted save behaves the same way.
 */
function positive(value: number | undefined, fallback: number): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return fallback;
  const n = Math.floor(value);
  return n > 0 ? n : fallback;
}

/** What a child is told when a helper stops itself (§11). */
export const SAFE_STOP_PHRASE: Readonly<Record<SafeStopReason, string>> = {
  goalReached: 'All done — the goal is finished!',
  stepLimit: 'That was a lot of steps, so I stopped to check with you.',
  actionLimit: "I've done a lot of jobs — shall we look at the plan?",
  memoryLimit: 'My memory is full. Shall we clear it?',
  approvalDeclined: 'You said no, so I stopped.',
  cannotSee: "I can't see well enough, so I stopped instead of guessing.",
  noRuleMatched: "I didn't have a rule for this one.",
};

/**
 * Whether a stop is a happy ending.
 *
 * §25 says asking for help and stopping safely must not read as failure,
 * and §9 says careful uncertainty must not score below blind action. So
 * the only stop that is genuinely disappointing is the one where nothing
 * matched — and even that is a prompt to add a rule, not a loss.
 */
export function isSuccessfulStop(reason: SafeStopReason): boolean {
  return reason === 'goalReached' || reason === 'cannotSee' || reason === 'approvalDeclined';
}
