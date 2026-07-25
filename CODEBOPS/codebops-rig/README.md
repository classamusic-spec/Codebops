# codebops-rig

Layered vector character rigs for the CodeBops mascots **Zip** and **Mixy (Glitch Bop)**.
One ES module, **zero dependencies**, no image assets — every layer is drawn from
path data traced from the reference artwork at pixel level.

```
codebops-rig.js       engine (~42 KB, no deps)
codebops-rig.d.ts     TypeScript definitions
characters/zip.js     Zip artwork + rig    (34 layers, 22 nodes)
characters/mixy.js    Mixy artwork + rig   (41 layers, 31 nodes)
three-adapter.js      optional Three.js renderer
demo.html             working page with both characters
atlas/zip-atlas.png   36-frame sprite sheet, 512x512 cells, transparent
atlas/mixy-atlas.png  48-frame sprite sheet (adds glitch + error)
atlas/*.json          per-frame rects, clip boundaries, fps, loop flags
package.json
```

---

## Install

Copy the folder into your project and import. No build step, no bundler needed.

```js
import { createRig } from './codebops-rig.js';
import ZIP from './characters/zip.js';

const zip = await createRig(ZIP, { canvas: document.querySelector('#zip') });
zip.start();
```

Zip now idles, breathes, blinks on a seeded schedule and glances around.
Swap the import for `./characters/mixy.js` to get Mixy instead — same API.

---

## Animations

| name        | Zip | Mixy | kind     | length | notes                              |
|-------------|:---:|:----:|----------|--------|------------------------------------|
| `idle`      | ●   | ●    | loop     | 3.2 s  | float, breathing, ear/crest sway   |
| `happy`     | ●   | ●    | one-shot | 2.0 s  | squash, two hops, sparkles         |
| `hop`       | ●   | ●    | one-shot | 1.3 s  | travelling jump with air tilt      |
| `bounce`    | ●   | ●    | one-shot | 1.75 s | heavier in-place anticipation      |
| `talk`      | ●   | ●    | loop     | 3.2 s  | speech nods + lip-sync             |
| `thinking`  | ●   | ●    | loop     | 5.4 s  | held tilt, narrowed eyes, brow     |
| `surprised` | ●   | ●    | one-shot | 1.6 s  | pop, wide eyes, brow               |
| `glitch`    | —   | ●    | loop     | 2.0 s  | channel split, chip scatter, scan  |
| `error`     | —   | ●    | one-shot | 2.4 s  | hard fault, eye crosses, recovery  |

One-shot clips return to `idle` automatically; every transition crossfades.
`rig.animations` tells you what the loaded character supports, and `play()`
ignores a clip the character does not have.

```js
zip.play('happy', { restart: true });
zip.hop();                 // alias: zip.jump()
mixy.glitch();             // alias: mixy.play('glitch', { restart: true })
mixy.error();
zip.blink();               // additive, plays over anything
```

### Glitch and error (Mixy)

`glitch` and `error` are driven by **stepped seeded noise** — values are held for
1/14 s rather than eased, which is what makes them read as digital corruption
instead of smooth wobble. They drive cyan/magenta channel-split ghosts, a face
slice tear, chips scattering off the head, and a scanline band. `error` also
swaps the eyes for magenta crosses and then recovers cleanly to rest.

Because the noise is seeded, a given time always produces the same frame — which
is why the sprite atlas and the live rig agree exactly.

## Face, gaze and speech

```js
rig.setFace('thinking');       // neutral | happy | talk | thinking | surprised | glitched | error
rig.look(-1, 0.2);             // x: -1 left … 1 right, y: -1 up … 1 down
rig.followPointer(canvas);     // eyes track the pointer
rig.setTalk(0.8);              // 0…1 lip-sync amount, seeded phoneme cycle
rig.setMouth('round');         // closed | small | medium | wide | smile | round | auto
```

Gaze is split between the eye body and the pupil, and the pupil is clamped to an
**ellipse** derived from each character's socket/pupil radius difference — so it
can never escape the eye, including on diagonal looks. Mixy's two eyes are
genuinely different sizes in the source art; the clamp uses the tighter of the
two so both stay safe.

## Three-quarter turn

```js
rig.setTurn(-1);   // -1 = 3/4 left, 0 = front, 1 = 3/4 right
```

Up to ±25° of head yaw. The silhouette compresses by `cos(yaw)` and each layer
shifts by `sin(yaw) x depth`, so the face slides across the head correctly. The
far eye and ear narrow, the near side widens. Measured against a real GPU render,
the silhouette lands within 0.15% of `cos(25°)`.

## Layers

```js
rig.setLayerVisible('crestFill', false);
rig.setGroupVisible('ears', false);
rig.isolate('eyes');     // dim everything else
rig.resetLayers();
```

Groups: `ears crest headFill facePatch eyes pupils highlights brows mouth shadow effects glitch`

## Playback

```js
rig.setSpeed(0.5);
rig.setPaused(true);
rig.setReducedMotion(true);   // damps locomotion, keeps expression + blinks
rig.stop();                   // pause the rAF loop
rig.destroy();                // release everything
```

`reducedMotion` defaults to the user's `prefers-reduced-motion` setting.

---

## Driving your own renderer

Ask for `renderer: 'none'`, then read draw records each frame:

```js
const rig = await createRig(MIXY, { renderer: 'none' });

function frame(dt) {
  rig.update(dt);
  for (const d of rig.getLayerDraws()) {
    // d.image   HTMLCanvasElement for this layer
    // d.box     {x,y,w,h} the canvas covers, in art space
    // d.matrix  [a,b,c,d,e,f] affine placing it into the 1024x1024 art space
    // d.opacity d.order (painter order) d.depth (parallax depth)
  }
}
```

`rig.getNodeTransforms()` gives the raw per-node records if you would rather
build your own hierarchy.

### Three.js

```js
import * as THREE from 'three';
import { attachThree } from './three-adapter.js';

const rig  = await createRig(ZIP, { renderer: 'none' });
const view = attachThree(THREE, rig, { scene });
// loop: rig.update(dt); view.sync(); renderer.render(scene, camera);
```

Use an **orthographic** camera. Layers sit at `z = depth x 0.01`, which is what
turns the yaw into real parallax.

### React

```jsx
function Mascot({ character }) {
  const ref = useRef(null);
  const rig = useRef(null);
  useEffect(() => {
    let live = true;
    createRig(character, { canvas: ref.current }).then(r => {
      if (!live) return r.destroy();
      rig.current = r; r.followPointer(ref.current); r.start();
    });
    return () => { live = false; rig.current?.destroy(); };
  }, [character]);
  return <canvas ref={ref} onClick={() => rig.current?.play('happy', { restart: true })} />;
}
```

### Sizing

The canvas backing store is set from its CSS size times `devicePixelRatio`
(capped at 2). Call `rig.resize()` when the element changes size:

```js
new ResizeObserver(() => rig.resize()).observe(canvas);
```

---

## Export

```js
rig.toSVG();        // standalone SVG of the current pose
rig.toPNG(1024);    // PNG data URL
```

`renderSVG(pose, character, opts)` is exported standalone and **runs in Node** —
it touches no DOM, so you can bake frames server-side:

```js
import { buildPose, renderSVG } from './codebops-rig.js';
import MIXY from './characters/mixy.js';

const pose = buildPose({ base: 'error', baseT: 0.4, face: 'error' }, MIXY);
fs.writeFileSync('error.svg', renderSVG(pose, MIXY, { viewBox: [-98, -98, 1220, 1220] }));
```

Widen the `viewBox` for clips like `hop` that travel outside the artboard.

## Sprite atlases

If you would rather not run the rig at all, the atlases are pre-baked
transparent sheets of 512x512 cells:

- **`atlas/zip-atlas.png`** — 36 frames, 6x6
- **`atlas/mixy-atlas.png`** — 48 frames, 6x8 (adds `glitch` and `error`)

Clips: `idle` 4 @6fps · `happy` 6 @10 · `talk` 6 @12 · `bounce` 6 @10 ·
`hop` 6 @12 · `blink` 5 @16 · `turnLeft` / `front` / `turnRight` 1 each
(· `glitch` 6 @12 · `error` 6 @12 for Mixy).

The JSON carries per-frame rects, clip boundaries, fps and loop flags. Both were
generated **by this package**, from the same `buildPose` the runtime uses.

---

## Notes

- **Rasterisation** happens once, inside `createRig()`. Each layer is rendered
  from SVG into its own canvas at 2.2x. Decodes are bounded by a timeout and
  retried through a blob URL, because some in-app WebViews never fire image
  events for SVG data URIs.
- **Determinism.** Blink schedule, idle saccades, phoneme order and glitch noise
  are all seeded. The same descriptor always yields the same pose.
- **Painter order.** Layers composite strictly back to front via `order`. Under
  Three.js this maps to `renderOrder` with depth testing off, so coplanar layers
  never z-fight.
- **Art space** is 1024x1024, `+y` down, matching SVG. `layerMatrix()` returns
  standard SVG affines.
- **Mixy is not symmetric.** Her ears, eyes and single eyebrow all differ per
  side, so nothing in her data is generated by mirroring.
