/**
 * Prepared title tokens (spec §22) — how a child names an app without
 * typing. Pick an owner, a describing word and a thing; the App Library
 * shows "Zip's Berry Game".
 *
 * Free text is deliberately impossible here. A parent-gated typed title
 * may be added later; until then every title in the app is assembled from
 * this vocabulary, which is also what makes titles safe to show anywhere.
 */

export type TitleTokenGroup = 'owner' | 'describing' | 'thing';

export interface TitleToken {
  readonly id: string;
  readonly group: TitleTokenGroup;
  readonly word: string;
  readonly glyph: string;
}

const t = (id: string, group: TitleTokenGroup, word: string, glyph: string): TitleToken =>
  ({ id, group, word, glyph });

export const TITLE_TOKENS: readonly TitleToken[] = [
  // owners
  t('owner-zip', 'owner', "Zip's", '🐰'),
  t('owner-mixy', 'owner', "Mixy's", '👾'),
  t('owner-my', 'owner', 'My', '🙂'),
  t('owner-our', 'owner', 'Our', '👨‍👩‍👧'),

  // describing words
  t('desc-happy', 'describing', 'Happy', '😄'),
  t('desc-funny', 'describing', 'Funny', '🤪'),
  t('desc-shiny', 'describing', 'Shiny', '✨'),
  t('desc-blue', 'describing', 'Blue', '🔵'),
  t('desc-red', 'describing', 'Red', '🔴'),
  t('desc-green', 'describing', 'Green', '🟢'),
  t('desc-tiny', 'describing', 'Tiny', '🐜'),
  t('desc-big', 'describing', 'Big', '🐘'),
  t('desc-sleepy', 'describing', 'Sleepy', '😴'),
  t('desc-busy', 'describing', 'Busy', '🐝'),

  // things
  t('thing-game', 'thing', 'Game', '🎮'),
  t('thing-story', 'thing', 'Story', '📖'),
  t('thing-song', 'thing', 'Song', '🎵'),
  t('thing-helper', 'thing', 'Helper', '🤝'),
  t('thing-sorter', 'thing', 'Sorter', '🧺'),
  t('thing-machine', 'thing', 'Machine', '⚙️'),
  t('thing-garden', 'thing', 'Garden', '🌻'),
  t('thing-berry', 'thing', 'Berry', '🍓'),
  t('thing-star', 'thing', 'Star', '⭐'),
  t('thing-flower', 'thing', 'Flower', '🌸'),
  t('thing-music', 'thing', 'Music', '🎼'),
  t('thing-shapes', 'thing', 'Shapes', '🔷'),
];

const BY_ID = new Map(TITLE_TOKENS.map((x) => [x.id, x]));

export function titleToken(id: string): TitleToken | null {
  return BY_ID.get(id) ?? null;
}

export function isTitleToken(id: string): boolean {
  return BY_ID.has(id);
}

export function tokensInGroup(group: TitleTokenGroup): TitleToken[] {
  return TITLE_TOKENS.filter((x) => x.group === group);
}

/** Render a token list as the words a grown-up reads. */
export function tokenWords(ids: readonly string[]): string[] {
  return ids.map((id) => titleToken(id)?.word ?? '').filter(Boolean);
}
