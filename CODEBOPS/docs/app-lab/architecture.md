# Zip's App Lab — architecture

The App Lab lets a 3–7-year-old build a small app and run it. Everything
below exists to make that safe, honest and repeatable.

## The one-sentence version

A child assembles a **project** — a plain JSON value drawn entirely from a
closed vocabulary — which a **pure runtime** turns into a list of events,
which the **UI** then animates. Nothing a child makes is code, and nothing
a child makes is executed as code.

## The layers

```
  data/app-lab/*          the closed vocabulary: assets, components,
                          sounds, layouts, title words, kits, rewards
        │
  creator/miniAppTypes    the command/trigger/condition unions
        │
  creator/miniAppProject  the project shape + schema version
  creator/miniAppValidator every project is checked here, twice
        │
  creator/miniAppEditor   pure edits (add/remove/move/undo/redo)
  creator/miniAppRuntime  pure execution → events + final state
  creator/miniAppCodePeek pure translation → words, then JavaScript
  creator/miniAppEvidence pure reading → what the app demonstrates
        │
  ui/app-lab/*            panels: template picker, scene builder,
                          logic builder, play mode, debug mode, code peek
  app/appCreatorScreen    the wiring, the only stateful piece
```

The rule that keeps this honest: **everything under `creator/` is pure.**
No DOM, no storage, no `Date.now()`, no `Math.random()`, no `eval`. A test
scans the source of each module and fails the build if any of those appear.

## Why the runtime is pure

`run(project, options)` returns a list of `MiniAppExecutionEvent`s and a
final state. It touches nothing. That buys four things at once:

- **The result never depends on frame rate.** Watching speed (§14) only
  changes how long the UI dwells on each event.
- **Debug Mode is free.** It replays the same event list the run produced;
  there is no second execution to disagree with the first.
- **Approvals replay.** `askForApproval` stops the run and reports a
  `PendingApproval`. The UI answers, appends the answer to
  `RunOptions.approvals`, and re-runs — producing an identical prefix.
- **It is testable in node** without a browser, which is where nearly all
  of the App Lab's logic coverage lives.

There is exactly **one** runtime for all six kits. A kit is a template
(an allow-list) plus a scene layout, not a separate engine.

## Why the vocabulary is a closed union

```ts
export type MiniAppCommandType = MiniAppCommand['kind'];
```

`MiniAppCommandType` is *derived* from the command union rather than
written out beside it. A template's `allowedCommands` is typed with it, so
a template physically cannot name a command that does not exist, and a new
command cannot be added without every template being type-checked against
it. The allow-lists cannot drift.

The same shape holds for assets, components, sounds, layouts and title
words: each is a table in `data/app-lab/`, and a project may only name an
id from those tables.

## Validation happens twice

`validateMiniAppProject` runs **before a project is written** and **again
when it is read back**. A file that was fine when saved but is not fine now
— because the app shipped a new schema version, or because storage
corrupted it — is caught on read, and the library offers the copy from
before the last save (`<id>:previous`) rather than an error.

## Storage

`MiniAppStore` probes IndexedDB → localStorage → memory and reports which
backend it got and whether it is durable. The standalone `file://` build
frequently cannot use IndexedDB; the Lab says so plainly in its footer
rather than silently losing work.

Two keys matter:
- `<id>` — the current project
- `<id>:previous` — the version before the last successful save

Progress (stars, evidence, settings, unlocked worlds) lives separately in
`SaveStore` under `codebops.save.v1`.

## Evidence

A built app records what it **demonstrated**, not that it was finished.
`miniAppEvidence` reads the child's own scripts, and records nothing at all
until the app has been run. Each claim names a real requirement id on a
real curriculum stage, filed under `phase: 'create'` and
`levelId: 'applab:<projectId>'` — so a creation feeds exactly the same
mastery model a level does, with no special case in the Learning Garden or
the Campfire.

Rewards (§13) are then *derived* from that log rather than stored, so there
is no second list to fall out of step with what actually happened.

## Where state lives

`AppCreatorScreen` is the only stateful piece, and it holds:

- `EditorState { project, past, future, revision }` — undo/redo is a stack
  of whole projects, capped at 30.
- `CreatorState` — which step of `template → build → teach → predict → play`
  the child is on, advanced only through `applyCreatorAction`.
- `lastRun` — the event list Debug Mode reads.

Everything else is rebuilt from the project on each render.

## Safety, structurally

There is no path from a child's input to executed code, because there is no
free-text input anywhere in the App Lab: names come from prepared word
tokens, commands come from pre-bound choices, and assets come from a fixed
shelf. The absence of an input box is the mechanism, not a policy.

See `safety-checklist.md` for the full list and how each item is enforced.
