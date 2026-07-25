# Authoring a template and its starters

A **template** says what a kit allows. A **starter** is one ready-made
project a child can open and change. Adding either is a data change — no
new engine, no new screen.

## 1. The template

Add a `MiniAppTemplateDefinition` to `src/creator/miniAppTemplateRegistry.ts`.

```ts
{
  id: 'music-basic',
  type: 'music',                       // one of the six MiniAppType values
  title: 'Sound Maker',
  childFacingDescription: 'Make a soundboard or a looping song.',
  difficultyShapes: 2,                 // 1–3 shapes, never a grade or a number
  layoutTemplateId: 'stage-band',

  // hard limits — the ONLY place they may be written
  maximumScenes: 1,
  maximumComponentsPerScene: 8,
  maximumScripts: 6,
  maximumCommandsPerScript: 8,
  maximumCommandDepth: 2,
  maximumVariables: 1,
  maximumJobs: 2,
  maximumChoicesPerDecision: 2,

  // positive allow-lists: anything not named here is impossible in this kit
  allowedComponents: [...],
  allowedTriggers: [...],
  allowedCommands: [...BASE_ACTIONS, 'repeatN', 'callJob'],
  allowedConditions: [...],
  allowedVariables: [...],
  supportedGoals: [...],

  curriculumPrerequisites: ['sequence', 'events'],
  conceptsTaught: ['events', 'loops', 'functions'],
  runtimeBudget: { ... },
}
```

### Rules the registry enforces

- **Limits live here and nowhere else.** No UI file may invent a cap. The
  validator reads the same numbers the builder does, so "the builder let me
  do it but the runtime refused" cannot happen.
- **Allow-lists are positive.** A command a template does not name is
  impossible in that kit. There is no deny-list to keep in sync.
- `allowedCommands` is typed `MiniAppCommandType[]`, which is *derived*
  from the `MiniAppCommand` union. Naming a command that does not exist is
  a compile error, and adding a command re-checks every template.
- `maximumCommandDepth` is a real constraint, not advice. If a starter
  needs three levels of nesting, **split it into two shallow rules** rather
  than raising the cap — that is what `feed-the-pet` does.

## 2. The scene layout

Add to `src/data/app-lab/sceneLayouts.ts`. A layout is a grid of **named
slots**; a component sits in a slot, never at a pixel position. That is what
makes tap-to-place possible without precision dragging.

```ts
{ id: 'stage-band', name: 'Band Stage', rows: 3, cols: 4, slots: [
  { id: 'drum', row: 2, col: 1, label: 'Drum spot' },
  ...
]}
```

**Give it more slots than the kit's `maximumComponentsPerScene`.** A layout
with fewer slots than components is the single most common authoring bug —
it was found twice during the build (sort-bench had 6 for an 8-component
kit; helper-yard had 7 for 8) and the symptom is a child being unable to
place a piece with no explanation.

## 3. The starter

Add to `src/data/app-lab/` via `miniAppProjectFactory.ts`:

```ts
starter('four-beat-loop', 'music-basic', 'Four Beat Loop', '🥁',
        'A loop that plays itself.', fourBeatLoop),
```

The build function takes a `ProjectSeed { id, now, themeId }` and returns a
`MiniAppProject`. It must be **deterministic**: no `Date.now()`, no
`Math.random()`. Every id it mints derives from the seed.

### What the test suite will check for you

Every starter is automatically checked to:

- validate against its own template (`validateMiniAppProject`),
- fit inside every limit, including slot capacity,
- carry the current `MINI_APP_SCHEMA_VERSION`,
- translate cleanly to plain language **and** to JavaScript,
- run without an unsupported step,
- name only approved assets, sounds, layouts and title words.

You do not need to write those tests. You do need to run `npm run test:logic`.

## 4. Naming

Child-facing names are three-to-four words, no jargon, no numbers, no
difficulty words. `difficultyShapes` carries "how big is this" and it draws
as shapes precisely so it cannot read as a score.

## 5. What you may NOT add

- A free-text field of any kind.
- An asset by URL, path, or upload — only ids from `approvedAssets.ts`.
- A command that runs a string.
- A limit that lives outside the registry.
- A starter that needs a special case in the runtime. If a starter cannot
  be expressed in the existing command union, the union is what changes —
  and then every template is re-checked against it, which is the point.
