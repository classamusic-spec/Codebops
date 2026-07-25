/**
 * Project validation (spec §14) — the gate every mini app passes through
 * before it runs and before it saves.
 *
 * Two audiences, one pass:
 *  - `childMessage` is what a child sees: a repair, never a failure.
 *  - `issues` is what a developer sees: precise, with a path.
 *
 * An invalid project never executes partially and never crashes the app.
 * The caller keeps the last valid save; this module only ever reports.
 */
import type {
  MiniAppCommand, MiniAppCondition, MiniAppTrigger, MiniAppCommandType,
} from './miniAppTypes';
import {
  MINI_APP_TYPES, flattenCommands, commandDepth, conditionRefs, triggerRefs, nestedCommands,
} from './miniAppTypes';
import type { MiniAppProject, MiniAppScript } from './miniAppProject';
import { MINI_APP_SCHEMA_VERSION, allComponents } from './miniAppProject';
import type { MiniAppTemplateDefinition } from './miniAppTemplateRegistry';
import { miniAppTemplate } from './miniAppTemplateRegistry';
import { isApprovedAsset, isApprovedTheme } from '../data/app-lab/approvedAssets';
import { approvedComponent } from '../data/app-lab/approvedComponents';
import { isApprovedSound, isPreparedPhrase } from '../data/app-lab/approvedSounds';
import { sceneLayout, layoutHasSlot } from '../data/app-lab/sceneLayouts';
import { isTitleToken } from '../data/app-lab/preparedTitleTokens';

export interface MiniAppIssue {
  /** Where the problem is, e.g. "scripts[2].commands[0]". */
  readonly path: string;
  readonly problem: string;
}

export interface MiniAppValidationResult {
  readonly valid: boolean;
  readonly issues: readonly MiniAppIssue[];
  /**
   * A child-facing repair sentence, present only when invalid. Names the
   * fix, never the mistake.
   */
  readonly childMessage?: string;
}

const err = (path: string, problem: string): MiniAppIssue => ({ path, problem });

/**
 * Child-facing repair lines. Deliberately about the NEXT action, and never
 * about what went wrong or who did it.
 */
const REPAIR_TOO_BIG = 'This app has grown a bit big! Take one thing off and try again.';
const REPAIR_MISSING = 'Something in this app is missing. Let us put it back together.';
const REPAIR_UNKNOWN = 'This app was made with a piece the Lab does not have. Let us build it again.';

export function validateMiniAppProject(project: MiniAppProject): MiniAppValidationResult {
  const issues: MiniAppIssue[] = [];
  let repair = REPAIR_MISSING;

  // ---- schema and identity ----
  if (project.schemaVersion !== MINI_APP_SCHEMA_VERSION) {
    issues.push(err('schemaVersion', `expected ${MINI_APP_SCHEMA_VERSION}, found ${project.schemaVersion}`));
    return { valid: false, issues, childMessage: REPAIR_UNKNOWN };
  }
  if (!project.id) issues.push(err('id', 'a project needs an id'));
  if (!MINI_APP_TYPES.includes(project.type)) {
    issues.push(err('type', `unknown app type "${project.type}"`));
  }

  const template = miniAppTemplate(project.templateId);
  if (!template) {
    issues.push(err('templateId', `unknown template "${project.templateId}"`));
    return { valid: false, issues, childMessage: REPAIR_UNKNOWN };
  }
  if (template.type !== project.type) {
    issues.push(err('templateId', `template "${template.id}" is not a ${project.type} template`));
  }
  if (!isApprovedTheme(project.themeId)) {
    issues.push(err('themeId', `unknown theme "${project.themeId}"`));
  }

  // ---- title: prepared tokens only, never free text ----
  if (project.title.tokens.length === 0) {
    issues.push(err('title', 'a project needs at least one title token'));
  }
  project.title.tokens.forEach((tk, i) => {
    if (!isTitleToken(tk)) issues.push(err(`title.tokens[${i}]`, `"${tk}" is not a prepared title token`));
  });

  // ---- scenes, layouts, slots ----
  if (project.scenes.length === 0) issues.push(err('scenes', 'a project needs at least one scene'));
  if (project.scenes.length > template.maximumScenes) {
    issues.push(err('scenes', `${project.scenes.length} scenes exceeds the ${template.maximumScenes} this kit allows`));
    repair = REPAIR_TOO_BIG;
  }

  const sceneIds = new Set<string>();
  const componentIds = new Set<string>();
  project.scenes.forEach((scene, si) => {
    const at = `scenes[${si}]`;
    if (sceneIds.has(scene.id)) issues.push(err(at, `duplicate scene id "${scene.id}"`));
    sceneIds.add(scene.id);

    const layout = sceneLayout(scene.layoutTemplateId);
    if (!layout) {
      issues.push(err(`${at}.layoutTemplateId`, `unknown layout "${scene.layoutTemplateId}"`));
    }
    if (scene.components.length > template.maximumComponentsPerScene) {
      issues.push(err(`${at}.components`,
        `${scene.components.length} components exceeds the ${template.maximumComponentsPerScene} this kit allows per scene`));
      repair = REPAIR_TOO_BIG;
    }

    const usedSlots = new Set<string>();
    scene.components.forEach((comp, ci) => {
      const cAt = `${at}.components[${ci}]`;
      if (componentIds.has(comp.id)) issues.push(err(cAt, `duplicate component id "${comp.id}"`));
      componentIds.add(comp.id);

      if (!template.allowedComponents.includes(comp.type)) {
        issues.push(err(`${cAt}.type`, `this kit does not allow a "${comp.type}"`));
      }
      if (!approvedComponent(comp.type)) {
        issues.push(err(`${cAt}.type`, `"${comp.type}" is not an approved component`));
      }
      if (!isApprovedAsset(comp.assetId)) {
        issues.push(err(`${cAt}.assetId`, `"${comp.assetId}" is not on the approved asset shelf`));
      }
      if (layout && !layoutHasSlot(scene.layoutTemplateId, comp.slotId)) {
        issues.push(err(`${cAt}.slotId`, `layout "${scene.layoutTemplateId}" has no slot "${comp.slotId}"`));
      }
      if (usedSlots.has(comp.slotId)) {
        issues.push(err(`${cAt}.slotId`, `two components share slot "${comp.slotId}"`));
      }
      usedSlots.add(comp.slotId);
      if (!comp.accessibilityLabel.trim()) {
        issues.push(err(`${cAt}.accessibilityLabel`, 'every component needs a label assistive tech can read'));
      }
    });
  });

  // ---- variables and jobs ----
  const variableIds = new Set<string>();
  if (project.variables.length > template.maximumVariables) {
    issues.push(err('variables', `${project.variables.length} variables exceeds the ${template.maximumVariables} this kit allows`));
    repair = REPAIR_TOO_BIG;
  }
  project.variables.forEach((v, i) => {
    if (variableIds.has(v.id)) issues.push(err(`variables[${i}]`, `duplicate variable id "${v.id}"`));
    variableIds.add(v.id);
    if (!template.allowedVariables.includes(v.type)) {
      issues.push(err(`variables[${i}].type`, `this kit does not allow a "${v.type}" variable`));
    }
    if (!v.accessibilityLabel.trim()) {
      issues.push(err(`variables[${i}].accessibilityLabel`, 'every variable needs a readable label'));
    }
  });

  const jobIds = new Set<string>();
  if (project.jobs.length > template.maximumJobs) {
    issues.push(err('jobs', `${project.jobs.length} jobs exceeds the ${template.maximumJobs} this kit allows`));
    repair = REPAIR_TOO_BIG;
  }
  project.jobs.forEach((j, i) => {
    if (jobIds.has(j.id)) issues.push(err(`jobs[${i}]`, `duplicate job id "${j.id}"`));
    jobIds.add(j.id);
    j.title.tokens.forEach((tk, k) => {
      if (!isTitleToken(tk)) issues.push(err(`jobs[${i}].title.tokens[${k}]`, `"${tk}" is not a prepared title token`));
    });
  });

  // ---- scripts ----
  if (project.scripts.length > template.maximumScripts) {
    issues.push(err('scripts', `${project.scripts.length} scripts exceeds the ${template.maximumScripts} this kit allows`));
    repair = REPAIR_TOO_BIG;
  }
  const scriptIds = new Set<string>();
  const refs = { componentIds, variableIds, jobIds, sceneIds };
  project.scripts.forEach((script, i) => {
    const at = `scripts[${i}]`;
    if (scriptIds.has(script.id)) issues.push(err(at, `duplicate script id "${script.id}"`));
    scriptIds.add(script.id);
    validateScript(script, at, template, refs, issues);
    if (flattenCommands(script.commands).length > template.maximumCommandsPerScript) {
      repair = REPAIR_TOO_BIG;
    }
  });

  // Job bodies obey the same command rules as scripts.
  project.jobs.forEach((job, i) => {
    validateCommands(job.commands, `jobs[${i}].commands`, template, refs, issues);
  });

  // ---- goal ----
  if (!template.supportedGoals.includes(project.goal.type)) {
    issues.push(err('goal.type', `this kit does not support the goal "${project.goal.type}"`));
  }
  project.goal.title.tokens.forEach((tk, i) => {
    if (!isTitleToken(tk)) issues.push(err(`goal.title.tokens[${i}]`, `"${tk}" is not a prepared title token`));
  });

  // ---- helper brain ----
  if (project.helper) {
    const h = project.helper;
    if (project.type !== 'helper') {
      issues.push(err('helper', 'only a Helper Builder project may carry a helper definition'));
    }
    for (const toolId of h.toolIds) {
      if (!componentIds.has(toolId)) issues.push(err('helper.toolIds', `unknown tool component "${toolId}"`));
    }
    if (h.memoryVariableId && !variableIds.has(h.memoryVariableId)) {
      issues.push(err('helper.memoryVariableId', `unknown variable "${h.memoryVariableId}"`));
    }
    h.rules.forEach((rule, i) => validateScript(rule, `helper.rules[${i}]`, template, refs, issues));
  }

  // ---- runtime budget ----
  const b = project.runtimeBudget;
  if (b.maximumSteps <= 0) issues.push(err('runtimeBudget.maximumSteps', 'must be positive'));
  if (b.maximumSteps > template.runtimeBudget.maximumSteps) {
    issues.push(err('runtimeBudget.maximumSteps',
      `${b.maximumSteps} exceeds the ${template.runtimeBudget.maximumSteps} this kit allows`));
  }
  if (b.maximumEventChainDepth > template.runtimeBudget.maximumEventChainDepth) {
    issues.push(err('runtimeBudget.maximumEventChainDepth', 'exceeds the kit budget'));
  }
  if (b.maximumMessagesPerStep > template.runtimeBudget.maximumMessagesPerStep) {
    issues.push(err('runtimeBudget.maximumMessagesPerStep', 'exceeds the kit budget'));
  }

  // ---- curriculum metadata ----
  if (project.curriculum.conceptsUsed.length === 0) {
    issues.push(err('curriculum.conceptsUsed', 'a project must declare the ideas it uses'));
  }

  // ---- assets manifest ----
  project.assets.forEach((ref, i) => {
    if (!isApprovedAsset(ref.assetId)) {
      issues.push(err(`assets[${i}]`, `"${ref.assetId}" is not on the approved asset shelf`));
    }
  });

  return issues.length === 0
    ? { valid: true, issues: [] }
    : { valid: false, issues, childMessage: repair };
}

interface RefSets {
  readonly componentIds: Set<string>;
  readonly variableIds: Set<string>;
  readonly jobIds: Set<string>;
  readonly sceneIds: Set<string>;
}

function validateScript(
  script: MiniAppScript, at: string,
  template: MiniAppTemplateDefinition, refs: RefSets, issues: MiniAppIssue[],
): void {
  if (!refs.componentIds.has(script.ownerId)) {
    issues.push(err(`${at}.ownerId`, `script belongs to unknown component "${script.ownerId}"`));
  }
  validateTrigger(script.trigger, `${at}.trigger`, template, refs, issues);

  const flat = flattenCommands(script.commands);
  if (flat.length > template.maximumCommandsPerScript) {
    issues.push(err(`${at}.commands`,
      `${flat.length} commands exceeds the ${template.maximumCommandsPerScript} this kit allows`));
  }
  const depth = commandDepth(script.commands);
  if (depth > template.maximumCommandDepth) {
    issues.push(err(`${at}.commands`,
      `nested ${depth} deep; this kit allows ${template.maximumCommandDepth}`));
  }
  validateCommands(script.commands, `${at}.commands`, template, refs, issues);
}

function validateTrigger(
  trigger: MiniAppTrigger, at: string,
  template: MiniAppTemplateDefinition, refs: RefSets, issues: MiniAppIssue[],
): void {
  if (!template.allowedTriggers.includes(trigger.kind)) {
    issues.push(err(at, `this kit does not allow the trigger "${trigger.kind}"`));
  }
  const r = triggerRefs(trigger);
  for (const id of r.components) {
    if (!refs.componentIds.has(id)) issues.push(err(at, `trigger names unknown component "${id}"`));
  }
  for (const id of r.variables) {
    if (!refs.variableIds.has(id)) issues.push(err(at, `trigger names unknown variable "${id}"`));
  }
  for (const id of r.scenes) {
    if (!refs.sceneIds.has(id)) issues.push(err(at, `trigger names unknown scene "${id}"`));
  }
}

function validateCommands(
  commands: readonly MiniAppCommand[], at: string,
  template: MiniAppTemplateDefinition, refs: RefSets, issues: MiniAppIssue[],
): void {
  commands.forEach((cmd, i) => {
    const cAt = `${at}[${i}]`;
    if (!template.allowedCommands.includes(cmd.kind as MiniAppCommandType)) {
      issues.push(err(cAt, `this kit does not allow the command "${cmd.kind}"`));
    }
    validateCommandRefs(cmd, cAt, template, refs, issues);
    const inner = nestedCommands(cmd);
    if (inner.length > 0) validateCommands(inner, `${cAt}.body`, template, refs, issues);
  });
}

function validateCommandRefs(
  cmd: MiniAppCommand, at: string,
  template: MiniAppTemplateDefinition, refs: RefSets, issues: MiniAppIssue[],
): void {
  const needComponent = (id: string): void => {
    if (!refs.componentIds.has(id)) issues.push(err(at, `names unknown component "${id}"`));
  };
  const needVariable = (id: string): void => {
    if (!refs.variableIds.has(id)) issues.push(err(at, `names unknown variable "${id}"`));
  };

  switch (cmd.kind) {
    case 'move': case 'turn': case 'animate': case 'returnHome':
    case 'show': case 'hide': case 'changeState': case 'changeColor':
    case 'lightOn': case 'lightOff':
      needComponent(cmd.targetId);
      break;
    case 'sendToSlot':
      needComponent(cmd.targetId);
      break;
    case 'speakPhrase':
      needComponent(cmd.targetId);
      if (!isPreparedPhrase(cmd.phrase)) issues.push(err(at, `"${cmd.phrase}" is not a prepared phrase`));
      break;
    case 'askForHelp':
      if (!isPreparedPhrase(cmd.phrase)) issues.push(err(at, `"${cmd.phrase}" is not a prepared phrase`));
      break;
    case 'playSound':
      if (!isApprovedSound(cmd.sound)) issues.push(err(at, `"${cmd.sound}" is not an approved sound`));
      break;
    case 'increaseCounter': case 'decreaseCounter': case 'resetCounter':
      needVariable(cmd.variableId);
      break;
    case 'changeScene':
      if (!refs.sceneIds.has(cmd.sceneId)) issues.push(err(at, `names unknown scene "${cmd.sceneId}"`));
      break;
    case 'callJob':
      if (!refs.jobIds.has(cmd.jobId)) issues.push(err(at, `names unknown job "${cmd.jobId}"`));
      break;
    case 'if': case 'repeatUntil':
      validateCondition(cmd.test, at, template, refs, issues);
      break;
    case 'ifElse':
      validateCondition(cmd.test, at, template, refs, issues);
      break;
    case 'askForApproval':
      if (!isPreparedPhrase(cmd.phrase)) issues.push(err(at, `"${cmd.phrase}" is not a prepared phrase`));
      break;
    case 'wait': case 'repeatN': case 'sendMessage': case 'waitForMessage':
    case 'celebrate': case 'showWin':
      break;
  }
}

function validateCondition(
  test: MiniAppCondition, at: string,
  template: MiniAppTemplateDefinition, refs: RefSets, issues: MiniAppIssue[],
): void {
  if (!template.allowedConditions.includes(test.kind)) {
    issues.push(err(at, `this kit does not allow the question "${test.kind}"`));
  }
  const r = conditionRefs(test);
  for (const id of r.components) {
    if (!refs.componentIds.has(id)) issues.push(err(at, `question names unknown component "${id}"`));
  }
  for (const id of r.variables) {
    if (!refs.variableIds.has(id)) issues.push(err(at, `question names unknown variable "${id}"`));
  }
}

/**
 * Cheap structural check for anything read off disk before we trust its
 * shape enough to run the full validator. Returns a reason, or null when
 * the value at least looks like a project.
 */
export function looksLikeProject(value: unknown): string | null {
  if (typeof value !== 'object' || value === null) return 'not an object';
  const p = value as Partial<MiniAppProject>;
  if (typeof p.id !== 'string') return 'missing id';
  if (typeof p.schemaVersion !== 'number') return 'missing schemaVersion';
  if (typeof p.type !== 'string') return 'missing type';
  if (!Array.isArray(p.scenes)) return 'missing scenes';
  if (!Array.isArray(p.scripts)) return 'missing scripts';
  return null;
}

/** How many components a project holds, for library cards and reports. */
export function componentCount(project: MiniAppProject): number {
  return allComponents(project).length;
}
