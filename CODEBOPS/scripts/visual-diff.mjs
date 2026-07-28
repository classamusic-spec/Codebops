/**
 * Compare two screenshot sets and report the worst per-shot difference.
 *
 * The threshold below (12, summed across R/G/B) ignores the last bit of
 * software-rasteriser noise while still catching a one-pixel shift in a
 * panel edge.
 *
 * Measured noise floor, same build twice: 14 of 15 screens come back at
 * exactly 0.000%, and one play screen sits between 0.05% and 0.14%. That
 * residue is real and known — it is the characters' ear-spring integrator
 * and their eye highlights, a few hundred pixels inside two faces. Every
 * structural thing the addendum cares about (logo proportions, panel
 * hierarchy, BOP placement, deck layout, scenery scatter) is exact.
 *
 * So: treat anything above ~0.2% as a real visual change. Anything that
 * moves a panel or a button will be far above it — a single button
 * shifting by one pixel already scores higher than the floor.
 *
 * Getting here took removing three separate sources of noise, in order:
 * CSS animation state, the live render loop, and the app's own random
 * seeds. The first two alone left 16.5%; see src/engine/testMode.ts.
 *
 * Usage: node scripts/visual-diff.mjs <dirA> <dirB>
 */
import { PNG } from 'pngjs';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
const [A, B] = [process.argv[2], process.argv[3]];
let worst = 0, rows = [];
for (const f of readdirSync(A).filter(f => f.endsWith('.png'))) {
  if (!existsSync(`${B}/${f}`)) { rows.push(`${f}  MISSING in ${B}`); continue; }
  const a = PNG.sync.read(readFileSync(`${A}/${f}`));
  const b = PNG.sync.read(readFileSync(`${B}/${f}`));
  if (a.width !== b.width || a.height !== b.height) { rows.push(`${f}  SIZE ${a.width}x${a.height} vs ${b.width}x${b.height}`); continue; }
  let diff = 0;
  for (let i = 0; i < a.data.length; i += 4) {
    if (Math.abs(a.data[i]-b.data[i]) + Math.abs(a.data[i+1]-b.data[i+1]) + Math.abs(a.data[i+2]-b.data[i+2]) > 12) diff++;
  }
  const pct = diff / (a.width * a.height) * 100;
  worst = Math.max(worst, pct);
  rows.push(`${f.padEnd(30)} ${pct.toFixed(3)}% (${diff}px)`);
}
rows.sort((x, y) => parseFloat(y.split(/\s+/)[1]) - parseFloat(x.split(/\s+/)[1]));
console.log(rows.join('\n'));
console.log(`\nWORST: ${worst.toFixed(3)}%`);
