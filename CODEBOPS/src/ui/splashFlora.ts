/**
 * Flowers for the splash screen.
 *
 * These used to be emoji — 🌸🌼🌺🌻 — which meant the splash was rendered
 * in four different art styles depending on the device: Apple's flowers on
 * an iPad, Google's on an Android tablet, Microsoft's on a laptop. Next to
 * a hand-drawn logo with a heavy navy outline, none of them matched, and
 * the one thing they all shared was that they could not move.
 *
 * So they are drawn here instead: the same chunky shapes and the same
 * #002152 outline as the wordmark, and every one of them sways on its own
 * stem at its own speed.
 *
 * Built as SVG strings rather than fetched files. They are tiny, and a
 * splash screen should never wait on a network request to look finished.
 */

export interface FlowerStyle {
  /** Petal fill. */
  readonly petal: string;
  /** Middle of the flower. */
  readonly heart: string;
  /** How many petals go round. */
  readonly petals: number;
  /** Petal length, in view units. Wider flowers read as daisies. */
  readonly reach: number;
}

/** The line every shape is drawn with — the wordmark's outline colour. */
const INK = '#002152';
const STEM = '#3f9e3a';
const LEAF = '#4fbc45';

export const SPLASH_FLOWERS: readonly FlowerStyle[] = [
  { petal: '#ff8fc0', heart: '#ffd23e', petals: 6, reach: 26 },  // pink blossom
  { petal: '#ffffff', heart: '#ffcc00', petals: 8, reach: 24 },  // white daisy
  { petal: '#c79bff', heart: '#ffd23e', petals: 5, reach: 27 },  // purple star
  { petal: '#ffd23e', heart: '#ff7402', petals: 8, reach: 25 },  // sunflower
  { petal: '#ff7f9a', heart: '#fff3c4', petals: 6, reach: 25 },  // coral
];

/**
 * One flower, as SVG markup.
 *
 * The art sits in a 100 x 150 box with the base of the stem at the bottom
 * centre, so a caller can position it by its foot and rotate it about the
 * same point to make it sway.
 *
 * `seed` varies the stem's lean and the leaf's side, so a row of the same
 * style does not read as a row of clones.
 */
export function flowerSvg(style: FlowerStyle, seed = 0): string {
  const lean = ((seed % 3) - 1) * 7;          // -7, 0 or 7 view units
  const leafLeft = seed % 2 === 0;
  const headY = 46;
  const petals: string[] = [];
  for (let i = 0; i < style.petals; i++) {
    const angle = (360 / style.petals) * i;
    petals.push(
      `<ellipse cx="50" cy="${headY - style.reach * 0.62}" rx="${style.reach * 0.42}" `
      + `ry="${style.reach * 0.66}" fill="${style.petal}" stroke="${INK}" stroke-width="4" `
      + `transform="rotate(${angle} 50 ${headY})" />`,
    );
  }
  const leafX = leafLeft ? 'M50 108 C34 104 26 92 30 80 C44 82 50 94 50 108 Z'
    : 'M50 108 C66 104 74 92 70 80 C56 82 50 94 50 108 Z';
  return `<svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">`
    + `<path d="M50 150 Q${50 + lean} 110 50 ${headY + 10}" fill="none" stroke="${INK}" `
    + `stroke-width="13" stroke-linecap="round" />`
    + `<path d="M50 150 Q${50 + lean} 110 50 ${headY + 10}" fill="none" stroke="${STEM}" `
    + `stroke-width="7" stroke-linecap="round" />`
    + `<path d="${leafX}" fill="${LEAF}" stroke="${INK}" stroke-width="4" stroke-linejoin="round" />`
    + `<g class="sf-head">${petals.join('')}`
    + `<circle cx="50" cy="${headY}" r="${style.reach * 0.46}" fill="${style.heart}" `
    + `stroke="${INK}" stroke-width="4" /></g>`
    + `</svg>`;
}
