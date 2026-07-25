/**
 * Code Peek for mini apps (spec §20).
 *
 * Three rungs of one ladder: the picture blocks a child placed, the same
 * program in plain language, and — only if they want it — the JavaScript.
 *
 * Two rules keep this honest. Every line comes from the child's ACTUAL
 * scripts, so the code always matches the app in front of them. And a
 * command the translator does not know is reported as a comment rather
 * than invented, because fake code that looks real is worse than a gap.
 *
 * Pure: the panel that draws this lives in ui/app-lab.
 */
import type { MiniAppProject, MiniAppScript } from './miniAppProject';
import type { MiniAppCommand, MiniAppCondition } from './miniAppTypes';
import { describeCommand, describeTrigger, sceneName } from './miniAppChoices';
import { approvedAsset } from '../data/app-lab/approvedAssets';
import { APPROVED_SOUNDS, PREPARED_PHRASES } from '../data/app-lab/approvedSounds';
import { tokenWords } from '../data/app-lab/preparedTitleTokens';

/** One line of output, with the nesting level it sits at. */
export interface PeekLine {
  readonly depth: number;
  readonly text: string;
}

const indent = (lines: PeekLine[]): string[] =>
  lines.map((l) => `${'  '.repeat(l.depth)}${l.text}`);

// ---------------------------------------------------------------------
// View 2 — plain-language code
// ---------------------------------------------------------------------

/** The child's scripts, written as sentences. */
export function plainLanguageScript(project: MiniAppProject, script: MiniAppScript): string[] {
  const lines: PeekLine[] = [{ depth: 0, text: `${describeTrigger(project, script.trigger)}:` }];
  walkPlain(project, script.commands, 1, lines);
  if (script.commands.length === 0) lines.push({ depth: 1, text: '(nothing yet)' });
  return indent(lines);
}

function walkPlain(
  project: MiniAppProject, commands: readonly MiniAppCommand[], depth: number, out: PeekLine[],
): void {
  for (const cmd of commands) {
    switch (cmd.kind) {
      case 'if':
        out.push({ depth, text: `If ${plainCondition(project, cmd.test)}:` });
        walkPlain(project, cmd.then, depth + 1, out);
        break;
      case 'ifElse':
        out.push({ depth, text: `If ${plainCondition(project, cmd.test)}:` });
        walkPlain(project, cmd.then, depth + 1, out);
        out.push({ depth, text: 'Otherwise:' });
        walkPlain(project, cmd.otherwise, depth + 1, out);
        break;
      case 'repeatN':
        out.push({ depth, text: `Repeat ${cmd.times} times:` });
        walkPlain(project, cmd.body, depth + 1, out);
        break;
      case 'repeatUntil':
        out.push({ depth, text: `Keep going until ${plainCondition(project, cmd.test)}:` });
        walkPlain(project, cmd.body, depth + 1, out);
        break;
      case 'askForApproval':
        out.push({ depth, text: `Ask first — "${phraseText(cmd.phrase)}". If yes:` });
        walkPlain(project, cmd.then, depth + 1, out);
        break;
      default:
        out.push({ depth, text: `${describeCommand(project, cmd)}.` });
        break;
    }
  }
}

function plainCondition(project: MiniAppProject, test: MiniAppCondition): string {
  const name = (id: string): string => {
    if (id === '@dropped-on') return 'where it landed';
    const c = project.scenes.flatMap((s) => s.components).find((x) => x.id === id);
    return c ? (approvedAsset(c.assetId)?.label ?? id) : 'it';
  };
  const varName = (id: string): string =>
    project.variables.find((v) => v.id === id)?.accessibilityLabel ?? 'the number';
  switch (test.kind) {
    case 'colorEquals': return `${name(test.itemId)} is the same colour as ${name(test.targetId)}`;
    case 'shapeEquals': return `${name(test.itemId)} is the same shape as ${name(test.targetId)}`;
    case 'typeEquals': return `${name(test.itemId)} is the same kind of thing as ${name(test.targetId)}`;
    case 'matchesTarget': return `${name(test.itemId)} belongs with ${name(test.targetId)}`;
    case 'stateIs': return `${name(test.targetId)} is ${test.state}`;
    case 'sensorSees': return `${name(test.targetId)} notices ${test.state}`;
    case 'counterEquals': return `${varName(test.variableId)} is exactly ${test.value}`;
    case 'counterAtLeast': return `${varName(test.variableId)} is ${test.value} or more`;
    case 'basketIsFull': return `${name(test.targetId)} is full`;
  }
}

function phraseText(id: string): string {
  return PREPARED_PHRASES.find((p) => p.id === id)?.text ?? '…';
}

/** Every script, as one plain-language document. */
export function plainLanguageProject(project: MiniAppProject): string[] {
  if (project.scripts.length === 0) return ['This app has not been taught anything yet.'];
  const out: string[] = [];
  project.scripts.forEach((s, i) => {
    if (i > 0) out.push('');
    out.push(...plainLanguageScript(project, s));
  });
  return out;
}

// ---------------------------------------------------------------------
// View 3 — JavaScript preview
// ---------------------------------------------------------------------

/** A job's name in words. Tokens are ids on disk — never print those. */
function jobName(job: { readonly title: { readonly tokens: readonly string[] } }): string {
  return ident(tokenWords(job.title.tokens).join(' ') || 'savedJob');
}

/** A safe identifier for a component: "Red Basket" -> redBasket. */
function ident(label: string): string {
  const cleaned = label.replace(/[^a-zA-Z0-9 ]/g, '').trim().split(/\s+/);
  const name = cleaned
    .map((w, i) => (i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase()))
    .join('');
  return name || 'thing';
}

function jsName(project: MiniAppProject, id: string): string {
  if (id === '@dropped-on') return 'target';
  const c = project.scenes.flatMap((s) => s.components).find((x) => x.id === id);
  return ident(c ? (approvedAsset(c.assetId)?.label ?? id) : id);
}

function jsVar(project: MiniAppProject, id: string): string {
  const v = project.variables.find((x) => x.id === id);
  return ident(v?.accessibilityLabel ?? id);
}

/** The JavaScript this app would be, if it were written by hand. */
export function javaScriptProject(project: MiniAppProject): string[] {
  if (project.scripts.length === 0) return ['// This app has not been taught anything yet.'];
  const out: string[] = [];
  project.jobs.forEach((job) => {
    out.push(`function ${jobName(job)}() {`);
    const body: PeekLine[] = [];
    walkJs(project, job.commands, 1, body);
    out.push(...indent(body));
    out.push('}', '');
  });
  project.scripts.forEach((script, i) => {
    if (i > 0) out.push('');
    out.push(`${jsTrigger(project, script)} {`);
    const body: PeekLine[] = [];
    walkJs(project, script.commands, 1, body);
    if (script.commands.length === 0) body.push({ depth: 1, text: '// nothing yet' });
    out.push(...indent(body));
    out.push('});');
  });
  return out;
}

function jsTrigger(project: MiniAppProject, script: MiniAppScript): string {
  const t = script.trigger;
  switch (t.kind) {
    case 'onAppStart': return 'app.onStart(() =>';
    case 'onSceneStart': return `app.onSceneStart("${sceneName(project, t.sceneId)}", () =>`;
    case 'onTap': return `${jsName(project, t.targetId)}.onTap(() =>`;
    case 'onDrop': return `${jsName(project, t.targetId)}.onDrop((target) =>`;
    case 'onChoiceSelected': return `${jsName(project, t.targetId)}.onChoose(() =>`;
    case 'onItemCollected': return `${jsName(project, t.targetId)}.onCollected(() =>`;
    case 'onGoalReached': return `${jsName(project, t.targetId)}.onReached(() =>`;
    case 'onSensorDetected': return `${jsName(project, t.targetId)}.onDetect(() =>`;
    case 'onCounterChanged': return `${jsVar(project, t.variableId)}.onChange(() =>`;
    case 'onStateChanged': return `${jsName(project, t.targetId)}.onBecome("${t.state}", () =>`;
    case 'onMessage':
    case 'onSignal': return `app.onMessage("${t.message}", () =>`;
  }
}

function walkJs(
  project: MiniAppProject, commands: readonly MiniAppCommand[], depth: number, out: PeekLine[],
): void {
  const n = (id: string): string => jsName(project, id);
  for (const cmd of commands) {
    switch (cmd.kind) {
      case 'if':
        out.push({ depth, text: `if (${jsCondition(project, cmd.test)}) {` });
        walkJs(project, cmd.then, depth + 1, out);
        out.push({ depth, text: '}' });
        break;
      case 'ifElse':
        out.push({ depth, text: `if (${jsCondition(project, cmd.test)}) {` });
        walkJs(project, cmd.then, depth + 1, out);
        out.push({ depth, text: '} else {' });
        walkJs(project, cmd.otherwise, depth + 1, out);
        out.push({ depth, text: '}' });
        break;
      case 'repeatN':
        out.push({ depth, text: `for (let i = 0; i < ${cmd.times}; i++) {` });
        walkJs(project, cmd.body, depth + 1, out);
        out.push({ depth, text: '}' });
        break;
      case 'repeatUntil':
        out.push({ depth, text: `while (!(${jsCondition(project, cmd.test)})) {` });
        walkJs(project, cmd.body, depth + 1, out);
        out.push({ depth, text: '}' });
        break;
      case 'askForApproval':
        out.push({ depth, text: `if (await askGrownUp("${phraseText(cmd.phrase)}")) {` });
        walkJs(project, cmd.then, depth + 1, out);
        out.push({ depth, text: '}' });
        break;
      case 'animate': out.push({ depth, text: `${n(cmd.targetId)}.animate("${cmd.animation}");` }); break;
      case 'changeState': out.push({ depth, text: `${n(cmd.targetId)}.setState("${cmd.state}");` }); break;
      case 'changeColor': out.push({ depth, text: `${n(cmd.targetId)}.setColor("${cmd.color}");` }); break;
      case 'show': out.push({ depth, text: `${n(cmd.targetId)}.show();` }); break;
      case 'hide': out.push({ depth, text: `${n(cmd.targetId)}.hide();` }); break;
      case 'lightOn': out.push({ depth, text: `${n(cmd.targetId)}.lightOn();` }); break;
      case 'lightOff': out.push({ depth, text: `${n(cmd.targetId)}.lightOff();` }); break;
      case 'move': out.push({ depth, text: `${n(cmd.targetId)}.move("${cmd.direction}", ${cmd.cells});` }); break;
      case 'turn': out.push({ depth, text: `${n(cmd.targetId)}.turn("${cmd.rotation}");` }); break;
      case 'sendToSlot': out.push({ depth, text: `${n(cmd.targetId)}.moveTo("${cmd.slotId}");` }); break;
      case 'returnHome': out.push({ depth, text: `${n(cmd.targetId)}.returnHome();` }); break;
      case 'playSound':
        out.push({ depth, text: `playSound("${APPROVED_SOUNDS.find((s) => s.id === cmd.sound)?.label ?? cmd.sound}");` });
        break;
      case 'speakPhrase': out.push({ depth, text: `${n(cmd.targetId)}.say("${phraseText(cmd.phrase)}");` }); break;
      case 'askForHelp': out.push({ depth, text: `askForHelp("${phraseText(cmd.phrase)}");` }); break;
      case 'increaseCounter': out.push({ depth, text: `${jsVar(project, cmd.variableId)} += 1;` }); break;
      case 'decreaseCounter': out.push({ depth, text: `${jsVar(project, cmd.variableId)} -= 1;` }); break;
      case 'resetCounter': out.push({ depth, text: `${jsVar(project, cmd.variableId)} = 0;` }); break;
      case 'changeScene': out.push({ depth, text: `app.goToScene("${sceneName(project, cmd.sceneId)}");` }); break;
      case 'celebrate': out.push({ depth, text: 'app.celebrate();' }); break;
      case 'showWin': out.push({ depth, text: 'app.showWin();' }); break;
      case 'wait': out.push({ depth, text: `await wait(${cmd.beats});` }); break;
      case 'sendMessage': out.push({ depth, text: `app.send("${cmd.message}");` }); break;
      case 'waitForMessage': out.push({ depth, text: `await app.waitFor("${cmd.message}");` }); break;
      case 'callJob': {
        const job = project.jobs.find((j) => j.id === cmd.jobId);
        out.push({
          depth,
          text: job ? `${jobName(job)}();` : '// a saved job that is not here any more',
        });
        break;
      }
    }
  }
}

function jsCondition(project: MiniAppProject, test: MiniAppCondition): string {
  const n = (id: string): string => jsName(project, id);
  switch (test.kind) {
    case 'colorEquals': return `${n(test.itemId)}.color === ${n(test.targetId)}.color`;
    case 'shapeEquals': return `${n(test.itemId)}.shape === ${n(test.targetId)}.shape`;
    case 'typeEquals': return `${n(test.itemId)}.kind === ${n(test.targetId)}.kind`;
    case 'matchesTarget': return `${n(test.itemId)}.belongsWith(${n(test.targetId)})`;
    case 'stateIs': return `${n(test.targetId)}.state === "${test.state}"`;
    case 'sensorSees': return `${n(test.targetId)}.sees("${test.state}")`;
    case 'counterEquals': return `${jsVar(project, test.variableId)} === ${test.value}`;
    case 'counterAtLeast': return `${jsVar(project, test.variableId)} >= ${test.value}`;
    case 'basketIsFull': return `${n(test.targetId)}.isFull()`;
  }
}

/**
 * Every command kind the JavaScript view can write. A command outside this
 * set would be skipped, so a test pins the set against the closed union —
 * silently dropping a step would make the code stop matching the app.
 */
export function translatableCommandKinds(): string[] {
  return [
    'if', 'ifElse', 'repeatN', 'repeatUntil', 'askForApproval',
    'animate', 'changeState', 'changeColor', 'show', 'hide', 'lightOn', 'lightOff',
    'move', 'turn', 'sendToSlot', 'returnHome', 'playSound', 'speakPhrase', 'askForHelp',
    'increaseCounter', 'decreaseCounter', 'resetCounter', 'changeScene',
    'celebrate', 'showWin', 'wait', 'sendMessage', 'waitForMessage', 'callJob',
  ];
}
