# The parent report

Everything a grown-up sees in the Grown-Up Campfire, and where each
sentence comes from.

Open it by holding the 🔥 button for 1.2 seconds.

## What it is not

There is no score, no percentage, no comparison to other children, no
age-expected band, and no "levels completed out of N" as a measure of
learning. Level count is shown as a fact about *play*, never as a claim
about *understanding*.

## "What we have seen" — the learning report

Built by `buildParentReport(store.evidence)`.

Each row is one curriculum stage a child has shown something in:

- **The real name** (grown-up facing): *Conditionals*, *Iteration*,
  *Decomposition*. The child-facing words (*Seed / Sprout / Bloom /
  Shining Bloom*) stay on the child's screens.
- **A state**, derived from evidence — never from level count. A stage
  advances because distinct evidence requirements were met across distinct
  learning phases (`discover → guide → build → debug → create`), not
  because a number went up.
- **Observations.** Every line is something the child actually did, in a
  named level or a named app. These are safe to read aloud verbatim.
- **One next step**, written forwards from the furthest phase reached.

  > A bug worth knowing about: this used to scan for the *first* missing
  > phase, so a child well past `build` was told "next they will try it
  > with the game guiding them". It now looks forward from the furthest
  > phase actually reached.

"Still to come" lists stages not yet introduced. It is a map of what is
ahead, not a list of gaps.

## "What they built" — creations

One row per saved app, from `parentSentenceFor` and `offScreenIdeaFor` in
`src/creator/miniAppEvidence.ts`.

> Your child built "Berry Sorter", a Sort and Match app that handles a
> right and a wrong outcome, keeps a score and uses a loop.
> They tried it, changed something, and ran it again.
>
> *Away from the screen: Play "what if it had been the other way?" with
> their app and see what they change.*

Two things to know about these sentences:

- **They describe what is actually in the child's scripts**, not what the
  kit allows. A Tiny Game Maker app with no counter does not claim a score.
- **An app that has never been run says so.** Building is the intention;
  running is the demonstration. The row reads "They have not run this one
  yet — ask them to show you what it does."

The off-screen idea is deliberately something to *do*, not something to
buy or install.

## Where the evidence comes from

Two sources, one log.

- **Levels** record through `SaveStore.recordRun`, which derives evidence
  from the run's steps.
- **Creations** record through `SaveStore.recordEvidence`, from
  `evidenceForCreation`, filed under `phase: 'create'` and
  `levelId: 'applab:<projectId>'`.

Both merge one entry per `(levelId, requirement)`. **Replaying never
inflates the log.** Doing the same thing twice does not count twice.

## Reading a creation claim

A creation claims `dbg-change` (debugging) only when the child changed the
app *after watching it run* — whether or not anything was broken. Looking,
then acting, is the behaviour being named.

It claims `agent-approval` only when the child's own helper actually asks
before acting. It claims `loop-replace` only when a loop is in their
scripts.

## The grown-up controls, and what they do

| Control | Effect |
|---|---|
| **Show real code** | Turns Code Peek's JavaScript view on or off. The plain-language view stays either way. |
| **Open a world** | Adds access to a world by hand. Only ever adds — nothing earned is removed. "All App Lab kits" opens every station at once for a child ready to build before every prerequisite is recorded. |
| **Reset all progress** | Clears stars and evidence. Requires a second tap. Saved apps live in a separate store and are not touched. |

## What a grown-up should take away

The report answers *"what has my child understood?"* with specific,
checkable observations. If a row says a child gave their app two ways to
go, there is an `if… or else…` in a script they built. That is the whole
design: nothing in this report is inferred from time spent or levels
finished.
