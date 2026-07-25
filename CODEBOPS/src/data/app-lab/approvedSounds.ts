/**
 * The approved sound shelf. A project names a token; this file is the only
 * place that maps a token to a real voice, so a saved app can never ask
 * for a sound the game cannot make.
 *
 * The voices come from the existing WebAudio synth (src/audio/sfx.ts) —
 * no audio files, no network, no recording.
 */
import type { SfxName } from '../../audio/sfx';
import type { ApprovedSoundId, PreparedPhraseId } from '../../creator/miniAppTypes';

export interface ApprovedSound {
  readonly id: ApprovedSoundId;
  readonly label: string;
  readonly glyph: string;
  readonly voice: SfxName;
}

export const APPROVED_SOUNDS: readonly ApprovedSound[] = [
  { id: 'tap', label: 'Tap', glyph: '👆', voice: 'tap' },
  { id: 'happy', label: 'Happy', glyph: '😄', voice: 'star' },
  { id: 'tryAgain', label: 'Try Again', glyph: '🤔', voice: 'bump' },
  { id: 'sparkle', label: 'Sparkle', glyph: '✨', voice: 'star' },
  { id: 'celebrate', label: 'Celebrate', glyph: '🎉', voice: 'celebrate' },
  { id: 'pop', label: 'Pop', glyph: '🫧', voice: 'place' },
  { id: 'drum', label: 'Drum', glyph: '🥁', voice: 'insDrum' },
  { id: 'bell', label: 'Bell', glyph: '🔔', voice: 'insBell' },
  { id: 'xylophone', label: 'Xylophone', glyph: '🎵', voice: 'insXylo' },
  { id: 'shaker', label: 'Shaker', glyph: '🪇', voice: 'insShaker' },
  { id: 'gearChime', label: 'Gear Chime', glyph: '⚙️', voice: 'insChime' },
];

const SOUND_BY_ID = new Map(APPROVED_SOUNDS.map((x) => [x.id, x]));

export function approvedSound(id: string): ApprovedSound | null {
  return SOUND_BY_ID.get(id as ApprovedSoundId) ?? null;
}

export function isApprovedSound(id: string): boolean {
  return SOUND_BY_ID.has(id as ApprovedSoundId);
}

/**
 * Prepared speech. A child picks a phrase from this list and it appears in
 * a speech bubble — visible, captioned by construction, and nothing is
 * ever typed or spoken aloud by a synthesiser.
 */
export interface PreparedPhrase {
  readonly id: PreparedPhraseId;
  readonly text: string;
  readonly glyph: string;
}

export const PREPARED_PHRASES: readonly PreparedPhrase[] = [
  { id: 'hello', text: 'Hello!', glyph: '👋' },
  { id: 'thankYou', text: 'Thank you!', glyph: '💛' },
  { id: 'lookAtThis', text: 'Look at this!', glyph: '👀' },
  { id: 'followMe', text: 'Follow me!', glyph: '🏃' },
  { id: 'oopsIFixedIt', text: 'Oops — I fixed it!', glyph: '🔧' },
  { id: 'wellDone', text: 'Well done!', glyph: '🌟' },
  { id: 'letsGo', text: "Let's go!", glyph: '🚀' },
  { id: 'imThinking', text: "I'm thinking…", glyph: '🤔' },
  { id: 'iNeedHelp', text: 'I need help.', glyph: '🙋' },
  { id: 'allDone', text: 'All done!', glyph: '✅' },
  { id: 'whichWay', text: 'Which way?', glyph: '🧭' },
  { id: 'goodMorning', text: 'Good morning!', glyph: '🌅' },
  { id: 'goodNight', text: 'Good night!', glyph: '🌙' },
];

const PHRASE_BY_ID = new Map(PREPARED_PHRASES.map((x) => [x.id, x]));

export function preparedPhrase(id: string): PreparedPhrase | null {
  return PHRASE_BY_ID.get(id as PreparedPhraseId) ?? null;
}

export function isPreparedPhrase(id: string): boolean {
  return PHRASE_BY_ID.has(id as PreparedPhraseId);
}
