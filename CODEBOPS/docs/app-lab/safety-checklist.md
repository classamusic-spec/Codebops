# Safety checklist

Every boundary the App Lab spec sets, with **how it is enforced** — not
what policy says, but what makes it true. Structural enforcement first;
"we check for it" is a weaker answer and is marked as such.

## No code execution

| Boundary | How it holds |
|---|---|
| No arbitrary JS / HTML / CSS | A project is JSON drawn from closed unions. There is no field a string could be executed from. |
| No script injection | Nothing a child produces is ever inserted as markup. `textContent` everywhere; the one generated string (Code Peek) is displayed in a `<pre>`, never parsed. |
| No `eval` / `new Function` | Banned by lint across the whole codebase (`no-eval`, `no-implied-eval`, `no-new-func`, `no-script-url`) **and** by a purity test that scans every `creator/` module. |
| No dynamic imports of user data | There is no user data outside the project JSON, and it is never a module specifier. |

## No network

| Boundary | How it holds |
|---|---|
| No network requests | A test scans the App Lab screens for `fetch`, `XMLHttpRequest`, `WebSocket`, `navigator.share` and `http(s)://`. |
| No external URLs or APIs | Assets are **ids into a table**, never URLs. There is no field that takes one. |
| No third-party asset search | There is no search. `approvedAssets.ts` is the entire shelf. |
| No tracking SDKs | No third-party runtime dependency at all. The only dependency is `three`. |
| No ads | None, and no surface that could host one. |

## No unrestricted input

| Boundary | How it holds |
|---|---|
| No unrestricted text input | There is no text field in the App Lab. A test asserts `appLibraryScreen.ts` contains no `input`, `contenteditable`, or `prompt(`. |
| Names | Assembled from `preparedTitleTokens.ts`, one word per group. |
| Speech | Only `PREPARED_PHRASES` ids. |
| No open chat | No chat surface exists. |
| No voice recording | Speech is **output only** — `speechSynthesis`. A test asserts `ui/a11y.ts` contains no `getUserMedia`, `MediaRecorder`, or `SpeechRecognition`. |
| No photo / camera / location | No permission is ever requested; no such API is referenced. |
| No file uploads | No `<input type="file">`, no drop handler that reads a file. |

## No sharing, no other people

| Boundary | How it holds |
|---|---|
| No public publishing | There is no publish path and no button that could reach one. Save / play / duplicate / remix are local only. |
| No child accounts | No account system, no identity, no sign-in. |
| No multiplayer | No transport of any kind. |
| No real-money purchases | No commerce surface. |

## Everything a child makes is validated

- `validateMiniAppProject` runs **before every write** and **again on every
  read**. An app that has aged out of the schema is caught on read, and the
  library offers the version from before the last save.
- Runtime caps travel *with* the project, so relaxing a template later
  cannot change how an old app behaves.
- `UNTIL_ROUNDS_CAP` and the per-project `runtimeBudget` mean a child's
  loop always terminates — the app "takes a rest" and says so rather than
  hanging.

## Non-punitive, structurally

The spec's list — no ranks, percentages, comparisons, streak pressure,
loot boxes, energy limits or public rankings — is enforced by tests over
the *content*, not by review:

- no reward name, line or invitation may match
  `/%|rank|level up|streak|faster|better than|only \d|\d+ of \d+|left to|missing/i`;
- no creation note may match `/%|faster|slower|better|worse|average|than other/i`;
- an unearned reward must read as an invitation: no `must`, `need to`,
  `have not`, `failed`;
- the collected shelf must show no count and no fraction (checked in a real
  browser, on the rendered text);
- rewards are derived, never spent — there is no currency and nothing to
  lose. A record that goes backwards announces a loss to nobody.

## The grown-up controls

- **Campfire** is behind a 1.2-second hold.
- **Deleting an app** is behind the same hold; a plain tap explains the gate
  rather than doing nothing.
- **Hide real code** turns off Code Peek's JavaScript view, keeping the
  plain-language one.
- **Open a world by hand** only ever *adds* access, and never removes
  anything earned.

## When adding anything to the App Lab

1. Can a child reach a string that becomes markup, a URL, or code? If yes,
   stop.
2. Is the new thing an **id into a table**, or a value? It must be an id.
3. Does it add a way to reach another person, or a server? If yes, stop.
4. Does any new copy rank, compare, count down, or scold? Rewrite it.
5. Run `npm run lint`, `npm run typecheck`, `npm run test:logic`.
