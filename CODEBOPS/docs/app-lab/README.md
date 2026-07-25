# Zip's App Lab — documentation

The creative capstone of CodeBops: a place where a 3–7-year-old builds a
small app of their own, teaches it what to do, guesses what will happen,
watches it run, and fixes it when it surprises them.

## Start here

| Document | Read it when |
|---|---|
| [architecture.md](architecture.md) | You want to know how the pieces fit and why the runtime is pure |
| [project-schema.md](project-schema.md) | You are changing what an app IS on disk |
| [authoring-templates.md](authoring-templates.md) | You are adding a kit, a template, or a starter |
| [approved-components.md](approved-components.md) | You are adding an asset, sound, layout, word or theme |
| [code-peek-translation.md](code-peek-translation.md) | You added a command and Code Peek needs to know about it |
| [safety-checklist.md](safety-checklist.md) | You are adding anything at all — read before you start |
| [parent-report.md](parent-report.md) | You are changing what grown-ups are told |
| [known-limitations.md](known-limitations.md) | You want the honest ledger of what is missing |

## The six kits

| Kit | Builds | Ideas it exercises |
|---|---|---|
| ✨ Tap Magic | Tap something, it reacts | sequence, events, state |
| 🧺 Sort and Match | A sorting or matching game | conditions, if-else, data |
| 📖 Story Stage | A story with scenes and choices | sequence, events, messages |
| 🥁 Music Maker | A soundboard or a looping song | events, loops, functions |
| 🎮 Tiny Game Maker | A small game with a score and a win | variables, state, conditions |
| 🤝 Helper Builder | A helper with a goal, tools and rules | agents, conditions, state |

## The journey through one app

```
  choose a kit → pick a starter and a sky → put things on the screen
       → teach it what to do → guess what will happen → watch it run
       → (it surprised me) → look at what happened → change it → run again
       → save it to My Apps
```

Saving records what the app **demonstrated** — read from the child's own
scripts, and only after it has actually run.

## Commands

```
npm run typecheck    # tsc --noEmit
npm run lint         # eslint src test
npm run test:logic   # 935 checks, no browser needed
npm run build        # vite build
npm run preview      # serve dist/ on :4173
npm run build:standalone   # one self-contained HTML file
```

## The two rules that hold everything else up

1. **Everything under `src/creator/` is pure.** No DOM, no storage, no
   clock, no randomness, no dynamic code. A test scans each module and
   fails the build if any of those appear.
2. **A child's app is data drawn from a closed vocabulary.** Not code, not
   text, not a URL. There is nothing to sanitise because there is nothing
   that runs.
