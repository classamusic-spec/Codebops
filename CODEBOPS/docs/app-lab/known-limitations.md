# Known limitations

What the App Lab does not do yet, and what it does differently from the
spec. Written to be believed rather than to look complete.

## Not built

### Job Card / Pattern Card builder UI

**The gap:** the runtime executes `callJob`, Code Peek translates it into a
real `function`, `miniAppEvidence` claims `fn-reuse` for it, and starters
can ship with jobs already in them — but **a child cannot create a job**.
There is no "save these steps as a job" affordance in the logic builder.

**What this means in practice:** the Job Saver badge and the `fn-reuse`
requirement are reachable only through a starter that already has a job.
A child cannot get there from their own idea.

**Why it is not a small fix:** it needs a selection model in the logic
builder (which steps?), a naming step (prepared tokens), and a rule for
what happens to a job when a component it referenced is removed.

### BopLens trace panel for Helper Builder (spec §5.5)

Helper Builder runs correctly — goal, tools, ordered rules, memory, and the
approval gate all work, and the ask-first dialog is verified in a browser.
What is missing is the dedicated **trace panel** that shows *why* the
helper chose the rule it chose, rule by rule.

The generic Think Trail covers part of this: it shows each step, the
condition checked, and which branch was taken (`branchTaken`). It does not
show the rules that were *considered and rejected*, which is the specific
thing BopLens was for.

### Offline start

Saved apps and progress survive a full reload — verified, with the app
found intact in IndexedDB (`codebops.applab`) after one. But the build is a
plain static site with **no service worker**, so starting the app with the
network cut fails: the browser cannot fetch `index.html` and the bundle.

Adding a service worker is the fix. It was not done because it changes the
update story (a cached shell needs an update strategy) and that is a
decision worth making deliberately rather than at the end of a phase.

The standalone single-file build (`npm run build:standalone`) does open
from `file://` with no server, but frequently cannot use IndexedDB there —
the Lab says so plainly in its footer rather than silently losing work.

## Different from the spec

### File naming

The spec's file plan uses `PascalCase.ts`. This repository uses
`camelCase.ts` throughout, and the App Lab follows the repository. Changing
one subsystem to match the spec would have made the codebase internally
inconsistent, which costs more than matching a document.

### One runtime, not six

The spec describes each kit separately. There is exactly one
`miniAppRuntime`; a kit is a template (an allow-list) plus a layout. This
was flagged in the Phase 0 report and chosen deliberately: six engines
would drift, and the sixth would be the one with the bug.

## Testing

### No committed browser test suite

Every phase of this build was verified in a real headless browser, and that
is where nearly every genuine bug was found — the toolbar pushed off-screen
by a `position: relative`, the unreachable Debug door, the sorting rule
scoring on the wrong basket, eighteen controls under 44px. But those runs
are **ad-hoc scripts in a scratch directory**, driving a `--no-save` copy of
`playwright-core`. They are not in the repository and `npm test` does not
run them.

This is the most significant testing gap. The 935 logic checks are real and
they cover the pure layers thoroughly, but they cannot see a CSS rule that
hides a button.

### Lint warnings

`npm run lint` reports **0 errors and 4 warnings**:

- one `console.info` in `src/engine/renderer.ts`, gated behind
  `import.meta.env.DEV` — a deliberate startup diagnostic;
- three `any`s in `test/logic.test.ts`, in the checks that deliberately
  feed garbage to the validator.

## Content

### Art

Only Zip and Mixy exist as drawn SVGs. Everything else on the approved
shelf is an emoji stand-in chosen to match the art canon's silhouettes.
`ApprovedAsset.svg` is set only where real art exists, so the renderer
prefers it and falls back to the glyph everywhere else — dropping real art
in later is a data change.

### Frames

Most simple apps earn no card frame. `APP_FRAMES` maps only the larger
ideas (asks first, saves a job, sends a signal, two ways to go, has a loop,
counts something), so a first Tap Magic app with one job wears none. That
is honest rather than generous, but it does mean the feature is invisible
to a child who has only built simple things.

## Scale

Limits are per-project and per-template, and nothing has been tested with a
very large library. `MiniAppStore.list()` reads an index rather than every
project, and the library loads each project lazily to fill in its thumbnail
and counts — but there is no pagination. A child with two hundred saved
apps would render two hundred cards.
