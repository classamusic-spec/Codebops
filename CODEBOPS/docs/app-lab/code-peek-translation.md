# Code Peek — translating a child's app

Code Peek shows a child their own app three ways: the picture blocks they
placed, the same thing in plain words, and the same thing again as real
JavaScript. All three are generated from the project by
`src/creator/miniAppCodePeek.ts`, which is pure — it reads the project and
nothing else.

## The three views

| View | Function | Always available? |
|---|---|---|
| Picture blocks | `describeCommand` / `describeTrigger` | Yes |
| Plain words | `plainLanguageProject` | Yes |
| JavaScript | `javaScriptProject` | Only if a grown-up allows it |

A grown-up can hide the JavaScript view from the Campfire
(`settings.hideRealCode`). Hiding it keeps the plain-language one — the
point is not to withhold the idea, only the syntax.

Nothing here is a test, and typing is never required anywhere.

## The rule that makes it honest

> **The code a child sees must be the app they built.**

Not an approximation, not a sample. A test adds a step to a script and
asserts the JavaScript gains exactly that step:

```ts
const before = javaScriptProject(flower);
const after  = javaScriptProject(appendCommand(..., { kind: 'hide', targetId: 'flower' }));
// after contains 'flower.hide();'  and before does not
```

## Adding a command? Add its translation.

When you add a `MiniAppCommand` variant you must extend **both** walkers:

- `walkPlain` — the plain-words form,
- `walkJs` — the JavaScript form,

and add the kind to `translatableCommandKinds()`.

A test then enforces the invariant that closes the gap:

```
every command kind any template allows must be translatable
```

Without it a step would silently vanish from Code Peek and the code would
stop matching the app — which is exactly the thing Code Peek exists to
never do.

## Naming

Identifiers come from the approved tables, run through `ident()` so they
are legal JavaScript. Two traps, both of which were live bugs during the
build:

- **Titles.** Use `titleText()` / `tokenWords()`. Printing token ids gives
  `owner-my thing-flower`.
- **Job names.** Use `jobName()`. Printing the raw tokens gives
  `thingsong` where it should say `Song`.

If a name shows up in Code Peek looking like an id, that is this bug.

## Style of the generated JavaScript

It is written to be *readable by an adult reading over a child's shoulder*,
not to be re-executed:

- one statement per block the child placed,
- a `function` per saved job, called where the child called it,
- an event handler per trigger, named for what the child chose,
- no imports, no framework, no ceremony.

An app with nothing taught yet produces a comment, not fake code — a test
asserts the first line starts with `//` rather than inventing a body.

## What is never generated

- Anything from a child's typed text. There is none.
- `eval`, `new Function`, `document.write`, or any dynamic construct — the
  lint config bans them from the whole codebase, and the generated string
  is never passed to a parser or an engine anyway. Code Peek produces text
  to *look at*.
