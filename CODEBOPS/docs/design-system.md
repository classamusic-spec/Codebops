# CodeBops design system

The visual source of truth is [`src/styles/tokens.css`](../src/styles/tokens.css).
Breakpoints are documented in [`src/styles/breakpoints.css`](../src/styles/breakpoints.css).

This document explains how to use them and, where a decision looks
arbitrary, why it was made.

---

## The rule

> A value used more than once belongs in `tokens.css`, named.
> A value used exactly once may live on its component.
> A token must never be restated as a literal.

That last line is the one that decays. `#ffd23e` and `var(--yellow)` render
identically today, so nothing breaks when you write the literal — until the
brand yellow shifts and only half the yellows follow. Before this pass the
stylesheet held **34 literals that were exact restatements of a token that
already existed**, and a further **357 distinct hex colours** against 28
tokens.

---

## Two deliberate exceptions

**`#fff` and `#000` stay literal.** Pure white and pure black are not brand
colours. `--white` expresses nothing that `#fff` does not, and tokenising a
value that can never change adds indirection for no benefit. (`--white` and
`--black` exist for the rare case where a component wants to state the
intent explicitly.)

**`z-index` values 2–12 stay literal.** Those order children *within* a
single component — the number on a program slot above the slot itself, the
icon above the tile face. A global scale would imply a relationship to
other components that does not exist. Only the layers that genuinely
compete across the app are tokenised.

---

## Colour

Three groups: **ink and surfaces** (navy panels, cream cards), **brand**
(the semantic palette), **world** (grass, water, wood).

Every brand colour that a control can be made of has a `-shade` sibling —
`--purple` / `--purple-shade`, `--blue` / `--blue-shade`. That pairing is
what makes a CodeBops button look moulded rather than flat: the shade is
the colour of its own underside.

```css
/* a purple control */
background: linear-gradient(180deg, var(--purple-light), var(--purple-deep));
box-shadow: var(--pop-5) var(--purple-shade), var(--shadow-soft);
```

### Semantic colour rules

| Colour | Means | Examples |
|---|---|---|
| Green | Go, run, succeed | BOP, Play, Continue |
| Blue | Navigate, neutral utility | Back, Settings, Clear |
| Purple | Revise, undo, edit | Rewind, Undo, Edit |
| Orange / Yellow | Attention, help, reward | Hint, stars, badges |
| Red | Destructive removal **only** | never for a failed run |

Red is not failure feedback. A program that does not reach the goal is a
thing to investigate, not an error — see Glitch Replay.

---

## Type

Two families, both tokenised, plus a monospace stack for code views.
`--font-display` (Fredoka) carries headings and every child-facing label;
`--font-body` (Nunito) carries running text.

**Fixed scale** — `--fs-3xs` (9px) through `--fs-3xl` (32px), ten steps.

**Fluid scale** — `--fs-fluid-xs` through `--fs-fluid-2xl`, six ramps.
Use these for anything that must survive from a phone to a 1920px monitor.

Before this pass there were **68 distinct font sizes and no scale**,
including a half-pixel tier (9.5, 10.5, 11.5, 12.5, 13.5, 14.5px across 46
declarations) — the signature of values nudged by eye. There were also 42
`clamp()` expressions of which 39 were used exactly once, several differing
only in the middle term (`1.5vw` vs `1.6vw` vs `1.7vw`), a difference
nobody can perceive and everybody has to maintain.

---

## Spacing

`--sp-1` (2px) through `--sp-10` (44px), on a 4px base.

---

## Shape

`--r-sm` `--r-md` `--r-lg` `--r-xl` `--r-pill` `--r-circle`.

Use `--r-circle` rather than `50%` when a thing is meant to be a circle, so
that intent survives a later change to the box.

---

## Elevation

The **pop** family is the house style: a hard offset shadow in a darker
shade of the control's own colour.

```css
box-shadow: var(--pop-4) var(--blue-shade), var(--shadow-soft);
```

`--pop-1` through `--pop-10` are the offsets; the colour is yours. This one
shape had been written **98 different ways**.

Soft shadows: `--shadow-soft` (floating), `--shadow-card` (panels),
`--shadow-inset` (wells).

---

## Motion

| Token | Duration | For |
|---|---|---|
| `--dur-instant` | 80ms | state visibility, focus |
| `--dur-fast` | 140ms | button press, tile snap |
| `--dur-med` | 260ms | panel open, card change |
| `--dur-slow` | 420ms | carousel, celebration |
| `--dur-scene` | 700ms | scene transition |

Easing: `--ease-bounce` (arrivals, presses), `--ease-out` (departures),
`--ease-in-out` (loops).

Every decorative animation needs a `prefers-reduced-motion` alternative
that preserves the *state change* while removing the *movement*.

---

## Layering

```
--z-base     0   backdrops
--z-content  1   normal screen content
--z-raised   5   lifted panels
--z-sticky  20   pinned chrome, the rotate hint
--z-overlay 40   modal scrims
--z-modal   50   celebration confetti, above a dialog
--z-drag    70   a tile following a finger
--z-toast   90   transient messages
```

This scale fixed a real bug. `.rotate-hint` was at `z-index: 60`, above
`.dialog-scrim` at `40` — so on a portrait phone the "turn me sideways"
prompt rendered **over** modal dialogs and its own button intercepted taps
meant for theirs. The level-intro dialog could not be dismissed. Four
toasts also sat at four different levels (20, 30, 40, 60, 90); they are all
`--z-toast` now.

---

## Touch targets

`--tap-min` (56px) is the comfortable size for a primary control.
`--tap-floor` (44px) is the absolute minimum for anything tappable — the
WCAG 2.5.5 figure.

They are separate because they answer different questions: *how big should
this be* and *how small may this ever get*. Previously the 56px token was
used on exactly one selector while a hardcoded 44px floor was repeated
twelve times, referencing no token at all.

**Known gap, scheduled for Phase 2:** `.tile`, `.slot`, `.btn-play` and
`.bop-btn` still declare no explicit floor — they rely on padding
arithmetic, which is exactly what breaks when a media query resizes them.

---

## Safe areas

`--sat` `--sab` `--sal` `--sar`, aliasing `env(safe-area-inset-*)`.
`index.html` sets `viewport-fit=cover`, without which these are always 0.

```css
padding-left: max(var(--sp-6), var(--sal));
bottom: max(var(--sp-7), calc(var(--sab) + var(--sp-4)));
```

Bottom coverage is thinner than top (14 uses vs 36) and matters more — the
iPhone home indicator sits there. Check `--sab` on anything pinned low.

---

## Breakpoints

Four layout modes, in `breakpoints.css`. Landscape tablet is the **primary
target and has no media query** — it is what the base stylesheet describes.

```css
@media (max-width: 620px)                                  /* COMPACT  */
@media (max-width: 820px) and (orientation: portrait)      /* PORTRAIT */
@media (max-height: 560px) and (orientation: landscape)    /* SHORT    */
@media (min-width: 1500px)                                 /* WIDE     */
```

Copy these verbatim, **including operand order**. The stylesheet had grown
eight width breakpoints and wrote the same condition in two orders, so any
search over it silently missed half the matches. Two of the old values were
live bugs: `max-height: 540px` and `560px` both meant "short landscape
phone", leaving devices 541–560px tall matching one rule set and not the
other; and `max-width: 1500px` / `min-width: 1600px` left 1500–1600px
matched by neither.

---

## Verifying a change is visually neutral

Token substitution should change nothing on screen. To prove it:

```bash
node /tmp/shoot.mjs /tmp/base      # before
# ...make changes, rebuild...
node /tmp/shoot.mjs /tmp/after     # after
node /tmp/diff.mjs /tmp/base /tmp/after
```

The harness freezes every animation before shooting, so a pixel difference
means a real change and never an animation caught mid-flight. Without that,
the splash alone varies by hundreds of thousands of pixels between two
identical runs.
