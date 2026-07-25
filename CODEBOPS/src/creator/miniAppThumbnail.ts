/**
 * App thumbnails (spec §21) — a picture of the app on its library card.
 *
 * Drawn from the project itself: the theme's sky, and the glyphs of the
 * things a child actually put on the first scene, laid out roughly where
 * they sit. It is an SVG data URI, so there is no canvas to keep alive, no
 * image to fetch, and nothing to cache beyond the string.
 *
 * Pure and deterministic — the same project always draws the same picture,
 * which is what lets the store treat it as data rather than a render.
 */
import type { MiniAppProject } from './miniAppProject';
import { approvedAsset, APP_LAB_THEMES } from '../data/app-lab/approvedAssets';
import { sceneLayout } from '../data/app-lab/sceneLayouts';

const W = 160;
const H = 100;

/** XML-escape the few characters that matter inside an SVG text node. */
function esc(text: string): string {
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

/** An SVG data URI showing this app's first scene. */
export function thumbnailFor(project: MiniAppProject): string {
  const sky = APP_LAB_THEMES.find((t) => t.id === project.themeId)?.sky ?? '#7ec8ff';
  const scene = project.scenes[0];
  const layout = scene ? sceneLayout(scene.layoutTemplateId) : null;

  const parts: string[] = [
    `<rect width="${W}" height="${H}" rx="12" fill="${sky}"/>`,
  ];

  if (scene && layout) {
    const cellW = W / layout.cols;
    const cellH = H / layout.rows;
    for (const component of scene.components) {
      const slot = layout.slots.find((s) => s.id === component.slotId);
      if (!slot) continue;
      const glyph = approvedAsset(component.assetId)?.glyph ?? '?';
      const x = (slot.col - 0.5) * cellW;
      const y = (slot.row - 0.5) * cellH;
      const size = Math.min(cellW, cellH) * 0.66;
      parts.push(
        `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="${size.toFixed(1)}"`
        + ` text-anchor="middle" dominant-baseline="central">${esc(glyph)}</text>`,
      );
    }
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"`
    + ` viewBox="0 0 ${W} ${H}">${parts.join('')}</svg>`;
  // encodeURIComponent rather than base64: no btoa, so this stays usable
  // from a test runner as well as a browser.
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/** How many things are on the first scene — shown under the picture. */
export function thumbnailSummary(project: MiniAppProject): string {
  const pieces = project.scenes[0]?.components.length ?? 0;
  const scripts = project.scripts.length;
  return `${pieces} thing${pieces === 1 ? '' : 's'} · ${scripts} job${scripts === 1 ? '' : 's'}`;
}
