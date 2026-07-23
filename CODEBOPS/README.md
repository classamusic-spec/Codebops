# CodeBops

**Teach tiny helpers. Build big ideas.**

A playful coding adventure for children ages 3–7. Kids teach Zip — a lovable
blue CodeBop — how to follow sequences and loops by snapping together big,
chunky command tiles, then pressing the giant green **BOP!** button to watch
their plan come alive. Mistakes summon Mixy the GlitchBop, who turns every
bug into a friendly step-by-step inspection game.

Built from scratch with **TypeScript + Three.js + Vite** — no game engine,
no frameworks.

## Play

```bash
npm install
npm run dev        # development server
npm run build      # production build → dist/
npm run preview    # serve the production build
npm run typecheck  # strict TypeScript check
```

## What's inside (Phases 0–14)

### Four worlds, 17 levels
| World | Concept | Levels |
|---|---|---|
| 🌼 Sparkle Meadow | Sequences with absolute arrow tiles | 2 guided |
| 🫧 Bubble Bay | Counted loops, repeat-until, stopping conditions | 3 guided + 1 debug + 1 creative |
| 🌸 Pattern Forest | **Conditions** — "if you see a flower, grab it" | 3 guided + 1 debug + 1 creative |
| 🤖 Robot Town | **Teamwork** — Swap between Zip & Bolt, glass domes | 3 guided + 1 debug + 1 creative |

### Command model (ages 3–7)
- **Absolute screen arrows** — ⬆️ always moves up-screen, ⬅️ left, ➡️ right,
  ⬇️ down. No hidden "facing" state: what you see is where Zip goes.
- **IF tiles** (🌸 / 🍄) guard the NEXT tile — otherwise it's skipped, with
  a live ✓/✗ bubble over the slot. Yucky mushrooms **spoil a fairy ring**
  if dropped on it (the fairy-ring rule), so careful picking matters.
- **Swap** (👥) switches which bot follows the plan — Zip 🐰 or Bolt 🤖
  (Zip's traced SVG with a robo hue-shift). Glass-domed pads stop Zip;
  only Bolt rolls beneath them.
- Counted **Repeat** (×2–×4 badge) and **Repeat Until** (Forever Fred
  overflow rescue) loop tiles, running the block above them.

### Meta-game systems
- **🌻 Bop Garden** — every star plants a swaying flower; Daily Bops plant
  golden ones. Tap flowers to pop them.
- **📅 Daily Bop** — one featured puzzle per day with a 🔥 streak counter
  (local-midnight based, stored in the versioned save).
- **🔥 Grown-Up Campfire** — parent dashboard behind a hold-to-open gate:
  stars, levels, day streak, honest playtime (tracked while playing), and
  per-concept progress (Sequences / Loops / Conditions / Teamwork /
  Creation), plus reset-progress.
- **🏝️ Imagination Island** — the level creator: paint a 5×3 meadow
  (berries, star pads, bushes, Zip's start), TEST IT instantly, save it
  for the family (persists separately from progress), replay or delete
  from the island shelf.

### Canon smooth-vector mascots
- Zip & Mixy are **hand-authored smooth bézier SVGs matched to the
  reference art** — clean anti-aliased curves at any resolution, on-model
  palette and proportions, semantically grouped parts
  (body / ears / crest / eyes / mouth / arms / antenna / fragments).
- **Multiple animated states, zero redesign**: blinking eyelids, glancing
  pupils, smile / open / surprised "o" mouths, excited star-eyes, wave,
  hop, bump shake, celebration spin, thinking pose, and Mixy's glitch
  wobble with flickering pixel fragments. Every state is an overlay on the
  traced base, so the CodeBops always look identical to the reference art.
- In-world, each character is a crisp DOM SVG projected from its 3D anchor
  (perspective-correct scale), with a soft contact shadow — sharp at any
  resolution while staying part of the 3D scene.

### World 1: Sparkle Meadow (sequences)
- 2.5D storybook world: rounded grass puzzle island, winding stream,
  arched bridge, puffy trees, flower patches, drifting clouds, cottage
  hills, twinkling sparkles.
- 2 levels: *Berry Hello!* and *Around the Bushes* (obstacle navigation).

### World 2: Bubble Bay (loops) — Phase 10
- Sunny bay world: animated water, sand tiles, wooden dock, palm trees,
  islets, rising bubbles, treasure-chest goal, pearl pickups, Mixy's
  lookout boat.
- **Counted loops**: a Repeat tile loops the block of commands above it;
  tap the tile's count badge to cycle ×2 → ×3 → ×4. A floating "k of n"
  bubble tracks iterations live, and the looped slots glow while running.
- **Repeat-until**: loops until something stops it — a bump, a grab, or
  reaching the goal. No stopping condition? **Forever Fred** (Mixy's
  endlessly-looping cousin) appears after 12 iterations and explains why
  every "until" needs a stopper.
- 5 levels: *Loopy Dock*, *Pearl Parade* (multi-carry), *Until You Get
  There*, *Copycat's Oopsie* (debug a pre-filled program that repeats too
  many times), *Loop Lagoon* (creative sandbox, bonus star for using a
  loop).
- Level-select screen with per-world sections, lock progression, and
  earned stars.

### Core systems
- **Deterministic interpreter** — pure TypeScript, zero rendering imports:
  move, **sidestep left/right (⬅️ ➡️ tiles — no turning required)**, turns,
  grab, drop, repeat, repeat-until, blocked-move bumps, multi-carry
  backpack, kind-based goals, loop event stream
  (start/iter/end/overflow/fail), max-step + loop-cap protection,
  replayable actor trail.
- **Keyboard controls** (desktop testing + accessibility): `←` adds a
  Move Left tile, `→` Move Right, `↑` Move, `Backspace` undoes the last
  tile, `Enter`/`Space` presses BOP!
- **Fit-any-screen camera** — the stage measures the puzzle's world-space
  corners and dollies to fit every screen aspect, from widescreen monitors
  to portrait phones (with an upward view-shift so the deck never covers
  the puzzle; character sprites project through the same matrix, so they
  stay glued to their tiles).
- **Mobile-first layouts** — portrait phones get a stacked deck
  (scrollable program strip over a wrapped tray), a slim goal chip,
  compact top bar, and edge-peeking mascots on the title screen;
  short landscape phones get their own compact pass.
- **Tablet-first command deck** — big touch targets, tap-to-add, drag &
  drop with pointer capture, magnetic slot snapping, reorder, remove,
  clear, rewind, pre-filled broken programs for debug levels, and the
  glowing green BOP! button.
- **Predict → Bop → Watch → Fix → Celebrate** loop:
  - Level briefs, prediction dialog before every run (the plan is never
    auto-changed), live path-preview dots.
  - Success: 3-star celebration (It Works · It Is Clever ≤ par ·
    It Is Creative) with flying stars, confetti + jingle.
  - Bumps: Mixy's Glitch Replay — scrub every step, fix, rerun.
- **Character acting** — Zip thinks while you predict, cheers on grabs,
  wobbles on bumps, celebrates on success; Mixy watches from her boat.
- **Versioned local save** (stars + settings), calm mode, high-contrast
  mode, left-handed deck, sound on/off, PWA manifest.

## Architecture

```
src/
├── engine/        renderer abstraction (WebGPU-detect + WebGL2), stage
├── rendering/     toon materials, Sparkle Meadow, Bubble Bay,
│                  traced-SVG sprite characters, path preview, tweens
├── gameplay/      grid, deterministic interpreter (no Three.js/DOM)
├── data/          typed level schema + validation, command defs, levels
├── app/           title / level-select / game screens
├── ui/            top bar, goal card, program deck, dialogs, toasts
├── audio/         tiny WebAudio synth hooks
└── storage/       versioned save store (repository-style)
```

Gameplay logic is fully independent of Three.js and the DOM; the UI builds
programs, the interpreter executes them, the renderer visualizes the event
stream.

## Testing

- `npm run test:logic` — 55 node unit tests covering every level's
  canonical solution, loop semantics, condition checks & skips, the
  fairy-ring poison rule, multi-bot swaps, glass-dome bumps, and
  empty-hands drop feedback.
- Playwright E2E (desktop + 390×844 mobile): full runs through all four
  worlds, prefill debugging, Forever Fred, condition bubbles, swap toasts,
  Daily Bop flow, garden, campfire gate, and the level editor
  (create → test → celebrate → save → delete).

## Roadmap (per master prompt)

Pattern Forest (conditions) → Robot Town (jobs & teamwork) → Agent Academy
(rule-based helpers + BopLens) → Imagination Island (creation mode) →
Bop Garden, Grown-Up Campfire parent area, native packaging.

## Notes

- The animation loop includes a watchdog so tweens keep advancing even in
  throttled/headless frame environments.
- `public/art/characters/**` holds the traced canon SVGs; animation states
  are pure CSS class toggles on those layers.
