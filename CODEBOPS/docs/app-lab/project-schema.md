# The project schema

A child's app is a plain JSON value. It holds no code, no URLs, no free
text, and no reference to anything outside the approved tables.

Defined in `src/creator/miniAppProject.ts`. Current
`MINI_APP_SCHEMA_VERSION = 1`.

## Top level

```ts
interface MiniAppProject {
  id: string;
  schemaVersion: number;
  type: MiniAppType;          // which of the six kits
  templateId: string;         // must exist in the template registry
  themeId: string;            // must exist in APP_LAB_THEMES
  title: MiniAppTitle;        // prepared word tokens, never typed text
  iconDefinition: MiniAppIconDefinition;
  scenes: MiniAppScene[];
  scripts: MiniAppScript[];
  variables: MiniAppVariableDefinition[];
  jobs: MiniAppJobDefinition[];
  goal?: MiniAppGoal;
  helper?: MiniAppHelperDefinition;
  curriculum: MiniAppCurriculumMetadata;
  runtimeBudget: MiniAppRuntimeBudget;
  createdAt: number;
  updatedAt: number;
}
```

## The parts that carry a rule

### `title: { tokens, version? }`

The **token ids**, not the words. Kept that way so a title can be
re-rendered in another language, or drawn as icons, without re-parsing a
string — and so it is structurally impossible for a title to contain
anything a child typed.

`version` is the disambiguating number for a second copy of the same name
("Star Music 2"). It is dropped when a child deliberately picks a
different name, so a "2" never appears without a "1".

**Bug to avoid:** render a title through `titleText()` / `tokenWords()`.
Printing `title.tokens` directly shows raw ids (`owner-my thing-flower`).
This regressed twice during the build; job names have the same trap, and
`jobName()` exists for it.

### `assetId`, `slotId`, `layoutTemplateId`, `themeId`

All are ids into tables in `data/app-lab/`. Never a URL, never a path,
never an upload. The validator rejects an id that is not in its table.

### `scripts[].ownerId`

Scripts belong to a component; they are never free-floating. Removing a
component prunes its scripts, and prunes any command in any other script
that referenced it (`pruneCommands`, driven by `NESTING_FIELDS`).

### `runtimeBudget`

Runtime caps travel **with the project**, not with the template. If a
template's limits are later relaxed, an old save still runs under the
budget it was built against, so re-opening an old app can never make it
behave differently.

### `curriculum.creatorStage`

Which step of `choose → build → teach → test → debug → present` the child
actually reached. This is descriptive, not a gate.

## Commands, triggers, conditions

Defined in `src/creator/miniAppTypes.ts` as closed discriminated unions.

```ts
export type MiniAppCommandType = MiniAppCommand['kind'];
```

Because the type is *derived*, a template's allow-list cannot name a
command that does not exist, and adding a command re-checks every template.

Control-flow commands nest through the fields listed in `NESTING_FIELDS`,
which is the single place nesting is described. `flattenCommands`,
`commandDepth`, `pruneCommands` and the runtime's recursion all read it, so
adding a nesting command means adding one entry, not five.

### The reserved reference

```ts
export const DROP_TARGET_REF = '@dropped-on';
```

Resolves to whatever the item was actually dropped on. It exists because a
sorting rule can only name one basket, and without it a red berry dropped
in the blue basket still scored.

## Validation

`validateMiniAppProject(project)` returns `{ valid, childMessage?, problems }`.
It runs:

- **before every write**, so nothing invalid is stored;
- **on every read**, so a file that has aged out of the schema is caught.

`looksLikeProject(value)` is the cheap structural gate used before the full
check, so a corrupt blob does not throw its way through the validator.

## Adding a field

1. Add it to the interface, optional.
2. Teach the validator to accept it (and to reject bad values).
3. Bump `MINI_APP_SCHEMA_VERSION` only if old saves become *invalid*. If
   the field is optional and absent-means-default, do not bump.
4. Run `npm run test:logic` — every starter is re-validated automatically.

## What is deliberately absent

No `script`, `code`, `expression`, `formula`, `url`, `src`, `html`, or any
field a string could be executed from. There is nothing to sanitise because
there is nothing that runs.
