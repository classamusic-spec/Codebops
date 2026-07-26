/**
 * The sky scene — the world the splash builds, reusable behind any screen.
 *
 * It was written for the splash and it does the job a splash needs: sky,
 * then a sun rising, then clouds sliding in, then the land, then the
 * trees growing on it, then the flowers. Roughly a second and a half of
 * a world assembling itself.
 *
 * "Where to?" sat on a flat blue gradient with a solid panel over it, and
 * next to that splash it looked like a different app. So the scene lives
 * here now and both screens mount it. The menu gets the same living world
 * to stand on, and there is exactly one place to change it.
 *
 * Everything is decorative and marked aria-hidden. Nothing here is ever
 * the only way to learn anything.
 */
import { el } from './dom';
import { SPLASH_FLOWERS, flowerSvg } from './splashFlora';

export interface SkySceneOptions {
  /**
   * A menu carries its own content and cannot spare half the screen for
   * hills. Compact drops the land to a strip along the bottom and thins
   * out what grows on it.
   */
  readonly compact?: boolean;
}

/**
 * Build the scene as the FIRST children of `host`, so everything already
 * there keeps sitting on top of it.
 *
 * The entrance choreography is CSS: each piece animates with a delay and
 * `both` fill, which is what lets calm mode cancel every animation and
 * still leave a finished scene rather than one stuck half-built.
 */
export function mountSkyScene(host: HTMLElement, options: SkySceneOptions = {}): void {
  const compact = options.compact === true;
  const frag = document.createDocumentFragment();
  const wrap = el('div', `sky-scene${compact ? ' compact' : ''}`, frag as unknown as HTMLElement);
  wrap.setAttribute('aria-hidden', 'true');

  const sky = el('div', 'title-sky', wrap);
  const sun = el('div', 'title-sun', sky);
  el('div', 'title-sun-core', sun);
  el('div', 'title-rays', sun);
  for (const cls of ['c1', 'c2', 'c3', 'c4']) el('div', `title-cloud ${cls}`, sky);

  const ground = el('div', 'title-ground', wrap);
  el('div', 'title-hill h1', ground);
  el('div', 'title-hill h2', ground);
  // A menu keeps the two big trees at the edges; the splash gets all five.
  const trees = compact ? ['t1', 't3'] : ['t1', 't2', 't3', 't4', 't5'];
  for (const cls of trees) {
    const tree = el('div', `title-tree ${cls}`, ground);
    el('div', 'tree-trunk', tree);
    el('div', 'tree-leaf l1', tree);
    el('div', 'tree-leaf l2', tree);
    el('div', 'tree-leaf l3', tree);
  }
  for (const cls of ['b1', 'b2', 'b3', 'b4']) el('div', `title-bush ${cls}`, ground);
  const flowers = compact ? SPLASH_FLOWERS.slice(0, 3) : SPLASH_FLOWERS;
  flowers.forEach((style, i) => {
    const f = el('div', `title-flower f${i}`, ground);
    f.innerHTML = flowerSvg(style, i);
  });

  host.prepend(frag);
}
