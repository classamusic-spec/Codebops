# The approved shelf

Four tables in `src/data/app-lab/` decide everything a child can put in an
app. If a thing is not in one of them, a child cannot reach it — not
because a check refuses, but because there is no path to it.

| Table | File | What it holds |
|---|---|---|
| Components | `approvedComponents.ts` | Roles: what a thing is *for* |
| Assets | `approvedAssets.ts` | Looks: what a thing looks like |
| Sounds & phrases | `approvedSounds.ts` | Every sound and every prepared line |
| Layouts | `sceneLayouts.ts` | Named slots a component can sit in |
| Title words | `preparedTitleTokens.ts` | Every word a name can contain |
| Themes | `approvedAssets.ts` | Backdrops, including the earned ones |

## Components are roles, assets are looks

```ts
c('counter', 'Counter', '🔢', 'Shows a number the app remembers.'),
c('collectible', 'Collectible', '🍓', 'Something to collect.', true, true),
```

A component says *this is a thing that counts* or *this is a thing you
tap*. The asset says what it looks like. The split is what lets six kits
share one runtime: the runtime reasons about roles, the renderer draws
assets.

`tappable` and `draggable` drive the default accessibility label, so a
component that can be picked up says so out loud without each kit
remembering to.

## Adding an asset

```ts
a('blueberry', 'Blueberry', '🫐', ['prop', 'imageObject', 'collectible'],
  { color: 'blue', shape: 'round', itemType: 'berry' }),
```

- `roles` — which component types this asset may fill. An asset with no
  matching role is unreachable; a test asserts every component type has at
  least one asset.
- `glyph` — **always required.** It is the fallback, so nothing ever
  renders blank.
- `svg` — set only where real drawn art exists. Today that is Zip and Mixy
  only; everything else is an emoji stand-in matching the art canon's
  silhouettes.
- `color` / `shape` / `itemType` — the sorting properties. A sorting kit
  compares *properties*, not identity, which is how a berry and a red
  basket can be "the same kind of thing".

## Adding a sound

Every sound needs a `label`. That label is what a caption shows and what a
screen reader announces (§14), so a sound with no words is a sound a deaf
child cannot perceive at all. A test enforces it.

`voice` maps the App Lab sound onto one of the game's existing `SfxName`s
— there is no new audio pipeline.

## Adding a prepared phrase

Prepared phrases are the *only* thing a character can say. There is no text
input anywhere. Keep them short, warm, and free of anything that could read
as a scolding — a phrase is said to a three-year-old by their own creation.

## Adding a title word

`preparedTitleTokens.ts` holds three groups: `owner`, `describing`,
`thing`. The name picker offers one word per group, so a name stays short
and readable. Each token is `{ id, word, glyph, group }`.

Render through `tokenWords()` / `titleText()`, never `tokens.join()`.

## Adding a layout

```ts
{ id: 'sort-bench', name: 'Sorting Bench', rows: 3, cols: 4, slots: [...] }
```

A slot is a **named place**, not a coordinate. That is what makes
tap-to-place work without precision dragging — a three-year-old taps a
thing, then taps a spot.

**Give a layout more slots than the kit's `maximumComponentsPerScene`.**
A layout with fewer slots than components is the most common bug in this
area, and the symptom is a child unable to place a piece with no
explanation offered.

## Adding a theme

```ts
{ id: 'starlight', label: 'Starlight', glyph: '🌙', sky: '#3b3f8f',
  unlockedBy: 'theme-starlight' },
```

`unlockedBy` names a reward id from `creatorRewards.ts`. The seven world
skies have none and are **always** open — earning a sky only ever adds.

Crucially, an earned sky is **approved from the start**. Gating happens in
the picker UI only, so a project saved with an earned sky still validates
after a progress reset. A test asserts this.

## What may never be added

- An asset that names a URL, path, or uploaded file.
- A phrase assembled from anything a child typed.
- A component whose behaviour needs a special case in the runtime.
- A sound with no label.
