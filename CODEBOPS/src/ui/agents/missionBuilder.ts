/**
 * The Agent Mission Builder (§15, §16) — "Teach a Bop to help."
 *
 * Choose a goal → pick tools → make rules → add memory → add limits →
 * ask first → test → inspect → fix → save.
 *
 * The shape of the screen is doing the teaching. Two decisions are
 * load-bearing:
 *
 *  - **Steps appear as the child meets the ideas** (§16, §30). A first
 *    helper shows goal, tools, rules, test — and that is a whole working
 *    helper, not a crippled one. Memory, limits and Ask First arrive
 *    once those ideas have turned up elsewhere in the game.
 *
 *  - **Nothing is ever refused.** A helper with no stopping rule runs.
 *    That helper is precisely the one Forever Fred exists to talk about,
 *    and blocking it would delete the lesson. Gaps are shown as things
 *    still to try, in the child's words, never as errors.
 *
 * Every choice is a card. There is no text input anywhere in this file,
 * which is what makes §29's "approved goal, approved tools, approved
 * actions" true by construction rather than by review.
 */
import { el } from '../dom';
import { sharedSfx } from '../../audio/sfx';
import { button, ICON_PLAY, ICON_CLEAR } from '../components/button';
import { announce } from '../a11y';
import { askFirst } from '../dialogs';
import type { AgentMission, MissionRule } from '../../agents/mission';
import { missionGaps, GAP_PHRASE, toAgent, missionExamples } from '../../agents/mission';
import {
  MISSION_GOALS, MISSION_MEMORY, LIMIT_CARDS, MEMORY_CHILD_TITLE,
  missionGoal, missionTool, toolsForGoal, whenCardsFor, doCardsFor,
  stepsFor, STEP_TITLE, STEP_ICON,
} from '../../data/agents/missionCatalog';
import type { BuilderStep } from '../../data/agents/missionCatalog';
import type { AgentConcept } from '../../data/curriculum/agentProgression';
import { scenarioFor, SCENARIO_NAMES } from '../../data/agents/scenarios';
import { runAgent } from '../../agents/engine';
import type { AgentRunResult } from '../../agents/engine';
import { detectGlitchBops, headlineGlitch } from '../../agents/glitchBops';
import { pickEdgeCase, applyPatches, edgeCase } from '../../agents/edgeCases';
import { CONFIDENCE_FACE, CONFIDENCE_LABEL } from '../../agents/confidence';
import type { ApprovalAnswer } from '../../agents/approval';
import { SAFE_STOP_PHRASE } from '../../agents/limits';
import { BopLensPanel } from './bopLensPanel';

/** How many Ask First cards a single run may show a child. */
const MAX_APPROVAL_ASKS = 6;

export interface MissionBuilderEvents {
  readonly onChange: (mission: AgentMission) => void;
  readonly onSave: (mission: AgentMission) => void;
  readonly onExit: () => void;
}

export class MissionBuilder {
  readonly root: HTMLElement;
  private mission: AgentMission;
  private step: BuilderStep = 'goal';
  private readonly steps: readonly BuilderStep[];
  private lastRun: AgentRunResult | null = null;
  private pendingApprovals: ApprovalAnswer[] = [];
  private readonly lens: BopLensPanel;
  private body!: HTMLElement;
  private tabs!: HTMLElement;
  private ruleSeq = 0;

  constructor(
    parent: HTMLElement,
    mission: AgentMission,
    availableConcepts: readonly AgentConcept[],
    private readonly events: MissionBuilderEvents,
  ) {
    this.mission = mission;
    this.steps = stepsFor(availableConcepts);
    this.root = el('div', 'mb-root', parent);
    this.lens = new BopLensPanel(this.root);
    this.lens.setNames(this.names());
    this.build();
  }

  // ---------------- shell ----------------

  private build(): void {
    const head = el('div', 'mb-head', this.root);
    button(head, {
      text: 'Done', label: 'Save this helper and go back', variant: 'go', size: 'sm',
      onClick: () => { sharedSfx.play('tap'); this.events.onSave(this.mission); this.events.onExit(); },
    });
    el('h1', 'mb-title', head, 'Teach a Bop to help');

    this.tabs = el('div', 'mb-tabs', this.root);
    this.tabs.setAttribute('role', 'tablist');
    this.body = el('div', 'mb-body', this.root);
    this.renderTabs();
    this.renderStep();
  }

  private renderTabs(): void {
    this.tabs.replaceChildren();
    for (const s of this.steps) {
      const b = el('button', 'mb-tab', this.tabs) as HTMLButtonElement;
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', String(s === this.step));
      b.classList.toggle('on', s === this.step);
      if (this.isStepDone(s)) b.classList.add('done');
      const ico = el('span', 'mb-tab-ico', b, STEP_ICON[s]);
      ico.setAttribute('aria-hidden', 'true');
      el('span', 'mb-tab-text', b, STEP_TITLE[s]);
      b.addEventListener('click', () => {
        sharedSfx.play('tap');
        this.step = s;
        this.renderTabs();
        this.renderStep();
        announce(STEP_TITLE[s]);
      });
    }
  }

  /** A tick on the tab, so a child can see how far they have got. */
  private isStepDone(s: BuilderStep): boolean {
    switch (s) {
      case 'goal': return true;
      case 'tools': return this.mission.toolIds.length > 0;
      case 'rules': return this.mission.rules.length > 0;
      case 'memory': return this.mission.memoryIds.length > 0;
      case 'limits': return this.mission.limitCardIds.length > 0;
      case 'approval': return this.mission.approvalToolIds.length > 0;
      case 'test': return this.lastRun !== null;
      case 'inspect': return this.lastRun !== null;
    }
  }

  private update(next: AgentMission): void {
    this.mission = { ...next, updatedAt: this.mission.updatedAt + 1 };
    this.events.onChange(this.mission);
    this.renderTabs();
    this.renderStep();
  }

  private renderStep(): void {
    this.body.replaceChildren();
    switch (this.step) {
      case 'goal': this.renderGoals(); break;
      case 'tools': this.renderTools(); break;
      case 'rules': this.renderRules(); break;
      case 'memory': this.renderMemory(); break;
      case 'limits': this.renderLimits(); break;
      case 'approval': this.renderApproval(); break;
      case 'test': this.renderTest(); break;
      case 'inspect': this.renderInspect(); break;
    }
    this.renderGaps();
  }

  /** Things still to try. Never errors — see the header comment. */
  private renderGaps(): void {
    const gaps = missionGaps(this.mission);
    if (gaps.length === 0) return;
    const box = el('div', 'mb-gaps', this.body);
    el('h3', 'mb-gaps-title', box, 'Things to try');
    for (const g of gaps.slice(0, 3)) {
      el('p', 'mb-gap', box, GAP_PHRASE[g.kind]);
    }
  }

  // ---------------- §15.1 goal ----------------

  private renderGoals(): void {
    el('p', 'mb-lead', this.body, 'What should your helper do?');
    const grid = el('div', 'mb-grid', this.body);
    for (const g of MISSION_GOALS) {
      const card = this.pickCard(grid, g.icon, g.childFacingTitle, g.id === this.mission.goalId);
      card.addEventListener('click', () => {
        sharedSfx.play('place');
        if (g.id === this.mission.goalId) return;
        // Changing the goal changes the world, so the tools and rules
        // built for the old one would refer to things that no longer
        // exist. Clearing them is honest; silently keeping broken rules
        // would be worse.
        this.lastRun = null;
        this.update({ ...this.mission, goalId: g.id, toolIds: [], rules: [], approvalToolIds: [] });
        this.lens.setNames(this.names());
        announce(`Goal: ${g.childFacingTitle}`);
      });
    }
  }

  // ---------------- §15.2 tools ----------------

  private renderTools(): void {
    el('p', 'mb-lead', this.body, 'What could help?');
    const goal = missionGoal(this.mission.goalId);
    const grid = el('div', 'mb-grid', this.body);
    for (const t of toolsForGoal(goal)) {
      const on = this.mission.toolIds.includes(t.id);
      const card = this.pickCard(grid, t.icon, t.childFacingTitle, on);
      if (t.requiresApproval) {
        el('span', 'mb-ask-flag', card, '🙋 always asks first');
      }
      card.addEventListener('click', () => {
        sharedSfx.play('place');
        const toolIds = on
          ? this.mission.toolIds.filter((id) => id !== t.id)
          : [...this.mission.toolIds, t.id];
        // Dropping a tool must drop the rules that used it, or the helper
        // keeps a rule the child can no longer see the tool for.
        const doIds = new Set(doCardsFor(toolIds).map((c) => c.id));
        const rules = this.mission.rules.filter((r) => doIds.has(r.doCardId));
        this.update({
          ...this.mission, toolIds, rules,
          approvalToolIds: this.mission.approvalToolIds.filter((id) => toolIds.includes(id)),
        });
      });
    }
  }

  // ---------------- §15.3 rules ----------------

  private renderRules(): void {
    el('p', 'mb-lead', this.body, 'What should your helper check?');
    if (this.mission.toolIds.length === 0) {
      el('p', 'mb-note', this.body, 'Pick a tool first, then you can make a rule.');
      return;
    }

    const list = el('div', 'mb-rules', this.body);
    const goal = missionGoal(this.mission.goalId);
    const whens = new Map(whenCardsFor(goal).map((c) => [c.id, c]));
    const dos = new Map(doCardsFor(this.mission.toolIds).map((c) => [c.id, c]));

    this.mission.rules.forEach((r, i) => {
      const row = el('div', 'mb-rule', list);
      if (!r.enabled) row.classList.add('off');
      el('span', 'mb-rule-n', row, `${i + 1}`);
      el('span', 'mb-rule-when', row, whens.get(r.whenCardId)?.childFacingText ?? '—');
      el('span', 'mb-rule-arrow', row, '→');
      el('span', 'mb-rule-do', row, dos.get(r.doCardId)?.childFacingText ?? '—');
      // Order is priority (see mission.ts), so moving a rule up is the
      // child changing which one wins — worth being able to do directly.
      if (i > 0) {
        button(row, {
          text: '↑', label: `Move rule ${i + 1} up`, variant: 'nav', shape: 'circle', size: 'sm',
          onClick: () => { sharedSfx.play('tap'); this.moveRule(i, -1); },
        });
      }
      button(row, {
        icon: ICON_CLEAR, label: `Remove rule ${i + 1}`, variant: 'danger',
        shape: 'circle', size: 'sm',
        onClick: () => {
          sharedSfx.play('tap');
          this.update({ ...this.mission, rules: this.mission.rules.filter((x) => x.id !== r.id) });
        },
      });
    });

    el('h3', 'mb-sub', this.body, 'Add a rule');
    const maker = el('div', 'mb-maker', this.body);
    let pickedWhen: string | null = null;
    let pickedDo: string | null = null;

    const whenBox = el('div', 'mb-half', maker);
    el('h4', undefined, whenBox, 'When…');
    const whenGrid = el('div', 'mb-grid small', whenBox);
    const doBox = el('div', 'mb-half', maker);
    el('h4', undefined, doBox, '…do this');
    const doGrid = el('div', 'mb-grid small', doBox);

    const tryAdd = (): void => {
      if (!pickedWhen || !pickedDo) return;
      this.ruleSeq += 1;
      const rule: MissionRule = {
        id: `r${this.ruleSeq}-${this.mission.rules.length + 1}`,
        whenCardId: pickedWhen, doCardId: pickedDo, enabled: true,
      };
      this.update({ ...this.mission, rules: [...this.mission.rules, rule] });
      announce('Rule added');
    };

    for (const c of whenCardsFor(goal)) {
      const card = this.pickCard(whenGrid, c.icon, c.childFacingText, false);
      card.addEventListener('click', () => {
        sharedSfx.play('place');
        pickedWhen = c.id;
        for (const other of whenGrid.children) other.classList.remove('on');
        card.classList.add('on');
        tryAdd();
      });
    }
    for (const c of doCardsFor(this.mission.toolIds)) {
      const card = this.pickCard(doGrid, c.icon, c.childFacingText, false);
      card.addEventListener('click', () => {
        sharedSfx.play('place');
        pickedDo = c.id;
        for (const other of doGrid.children) other.classList.remove('on');
        card.classList.add('on');
        tryAdd();
      });
    }
  }

  private moveRule(index: number, delta: -1 | 1): void {
    const rules = [...this.mission.rules];
    const to = index + delta;
    if (to < 0 || to >= rules.length) return;
    [rules[index], rules[to]] = [rules[to], rules[index]];
    this.update({ ...this.mission, rules });
  }

  // ---------------- §15.4 memory ----------------

  private renderMemory(): void {
    el('p', 'mb-lead', this.body, 'What should your helper remember?');
    const grid = el('div', 'mb-grid', this.body);
    for (const m of MISSION_MEMORY) {
      const on = this.mission.memoryIds.includes(m.id);
      const card = this.pickCard(grid, '💎', MEMORY_CHILD_TITLE[m.id] ?? m.titleToken, on);
      card.addEventListener('click', () => {
        sharedSfx.play('place');
        this.update({
          ...this.mission,
          memoryIds: on
            ? this.mission.memoryIds.filter((id) => id !== m.id)
            : [...this.mission.memoryIds, m.id],
        });
      });
    }
  }

  // ---------------- §15.5 limits ----------------

  private renderLimits(): void {
    el('p', 'mb-lead', this.body, 'When should your helper stop?');
    const grid = el('div', 'mb-grid', this.body);
    for (const c of LIMIT_CARDS) {
      const on = this.mission.limitCardIds.includes(c.id);
      const card = this.pickCard(grid, c.icon, c.childFacingText, on);
      card.addEventListener('click', () => {
        sharedSfx.play('place');
        this.update({
          ...this.mission,
          limitCardIds: on
            ? this.mission.limitCardIds.filter((id) => id !== c.id)
            : [...this.mission.limitCardIds, c.id],
        });
      });
    }
  }

  // ---------------- §15.6 approval ----------------

  private renderApproval(): void {
    el('p', 'mb-lead', this.body, 'Which jobs should your helper ask about first?');
    if (this.mission.toolIds.length === 0) {
      el('p', 'mb-note', this.body, 'Pick a tool first.');
      return;
    }
    const grid = el('div', 'mb-grid', this.body);
    for (const id of this.mission.toolIds) {
      let tool;
      try { tool = missionTool(id); } catch { continue; }
      const forced = tool.requiresApproval;
      const on = forced || this.mission.approvalToolIds.includes(id);
      const card = this.pickCard(grid, tool.icon, tool.childFacingTitle, on);
      if (forced) {
        // Locked on: some tools ask no matter what, and pretending the
        // child turned that off would be a lie about what the helper does.
        card.classList.add('locked');
        card.setAttribute('aria-disabled', 'true');
        el('span', 'mb-ask-flag', card, 'always asks');
        continue;
      }
      card.addEventListener('click', () => {
        sharedSfx.play('place');
        this.update({
          ...this.mission,
          approvalToolIds: on
            ? this.mission.approvalToolIds.filter((x) => x !== id)
            : [...this.mission.approvalToolIds, id],
        });
      });
    }
  }

  // ---------------- §15.7 test ----------------

  private renderTest(): void {
    el('p', 'mb-lead', this.body, 'Let’s see what your helper does.');

    const buttons = el('div', 'mb-test-buttons', this.body);
    button(buttons, {
      icon: ICON_PLAY, text: 'Try it', label: 'Try your helper on a normal day',
      variant: 'go', size: 'lg',
      onClick: () => { sharedSfx.play('tap'); void this.runTest(null); },
    });

    const surprise = pickEdgeCase(scenarioFor(this.mission.goalId), this.mission.passedEdgeCases);
    if (surprise) {
      button(buttons, {
        text: 'Try a surprise', label: surprise.childFacingPrompt, variant: 'revise', size: 'lg',
        onClick: () => { sharedSfx.play('tap'); void this.runTest(surprise.id); },
      });
    }

    const out = el('div', 'mb-result', this.body);
    if (!this.lastRun) {
      el('p', 'mb-note', out, 'Press Try it to watch your helper work.');
      return;
    }
    this.renderResult(out, this.lastRun);
  }

  private async runTest(edgeCaseId: string | null): Promise<void> {
    const agent = toAgent(this.mission);
    let world = scenarioFor(this.mission.goalId);
    let memory;
    if (edgeCaseId) {
      const e = edgeCase(edgeCaseId);
      const patched = applyPatches(world, {}, e.changedInitialState);
      world = patched.world;
      memory = patched.memory;
    }

    // Approvals are answered by the child, one gate at a time: the run
    // stops and reports, we ask, we run again with one more answer. No
    // callback ever lives inside the engine, which is what keeps a run
    // replayable from its answers alone.
    //
    // The guard is not paranoia — it is the same class of protection as
    // the helper's own limits. A rule that gates every subject in a big
    // world would otherwise ask a four-year-old thirty questions.
    this.pendingApprovals = [];
    let result = runAgent(agent, world, { approvals: this.pendingApprovals, memory });
    let asked = 0;
    while (result.pendingApproval && asked < MAX_APPROVAL_ASKS) {
      asked += 1;
      const answer = await askFirst(this.root, result.pendingApproval.childFacingPrompt, sharedSfx);
      this.pendingApprovals = [...this.pendingApprovals, answer];
      if (answer === 'cancelled') {
        result = runAgent(agent, world, { approvals: this.pendingApprovals, memory });
        break;
      }
      result = runAgent(agent, world, { approvals: this.pendingApprovals, memory });
    }

    this.lastRun = result;
    if (edgeCaseId && result.goalReached && !this.mission.passedEdgeCases.includes(edgeCaseId)) {
      this.update({
        ...this.mission,
        passedEdgeCases: [...this.mission.passedEdgeCases, edgeCaseId],
      });
      return;
    }
    this.renderTabs();
    this.renderStep();
  }

  private renderResult(out: HTMLElement, result: AgentRunResult): void {
    const summary = el('div', 'mb-summary', out);
    const face = el('span', 'mb-face', summary, CONFIDENCE_FACE[result.overallConfidence]);
    face.setAttribute('aria-hidden', 'true');
    el('span', 'mb-conf', summary, CONFIDENCE_LABEL[result.overallConfidence]);
    el('p', 'mb-stop', summary, SAFE_STOP_PHRASE[result.stoppedBecause]);

    el('p', 'mb-count', out, result.handled.length === 1
      ? 'It did 1 job.' : `It did ${result.handled.length} jobs.`);

    // Who turned up, if anyone. One face, not a list — see glitchBops.ts.
    const sighting = headlineGlitch(detectGlitchBops({
      trace: result.trace,
      mission: this.mission,
      stoppedBecause: result.stoppedBecause,
    }));
    if (sighting) {
      const box = el('div', 'mb-glitch', out);
      const ico = el('span', 'mb-glitch-ico', box, sighting.bop.icon);
      ico.setAttribute('aria-hidden', 'true');
      el('strong', undefined, box, sighting.bop.name);
      el('p', 'mb-glitch-say', box, sighting.bop.childFacingPhrase);
      el('p', 'mb-glitch-fix', box, sighting.bop.childFacingFix);
    }

    button(out, {
      text: '🔍 Why?', label: 'See why your helper chose what it chose',
      variant: 'revise', size: 'md',
      onClick: () => { sharedSfx.play('tap'); this.lens.show(result.trace); },
    });
  }

  // ---------------- §15.8 inspect ----------------

  private renderInspect(): void {
    el('p', 'mb-lead', this.body, 'Why did your helper do that?');
    if (!this.lastRun) {
      el('p', 'mb-note', this.body, 'Try your helper first, then come back.');
      return;
    }
    this.lens.show(this.lastRun.trace);
  }

  // ---------------- shared bits ----------------

  private pickCard(parent: HTMLElement, icon: string, text: string, on: boolean): HTMLElement {
    const card = el('button', 'mb-card', parent) as HTMLButtonElement;
    card.type = 'button';
    card.classList.toggle('on', on);
    card.setAttribute('aria-pressed', String(on));
    const ico = el('span', 'mb-card-ico', card, icon);
    ico.setAttribute('aria-hidden', 'true');
    el('span', 'mb-card-text', card, text);
    return card;
  }

  /** Token → the word a child would say, for BopLens. */
  private names(): Record<string, string> {
    const out: Record<string, string> = { ...SCENARIO_NAMES };
    for (const t of MISSION_TOOL_NAMES) out[t.id] = t.name;
    for (const m of MISSION_MEMORY) out[m.id] = MEMORY_CHILD_TITLE[m.id] ?? m.titleToken;
    try {
      const g = missionGoal(this.mission.goalId);
      out[g.id] = g.childFacingTitle;
    } catch { /* a goal that no longer exists just keeps its id */ }
    return out;
  }

  dispose(): void {
    this.root.remove();
  }
}

/** Flattened once, since `names()` runs on every lens open. */
const MISSION_TOOL_NAMES = MISSION_GOALS.length >= 0
  ? (() => {
    const seen: Array<{ id: string; name: string }> = [];
    for (const g of MISSION_GOALS) {
      for (const t of toolsForGoal(g)) {
        if (!seen.some((x) => x.id === t.id)) seen.push({ id: t.id, name: t.childFacingTitle.toLowerCase() });
      }
    }
    return seen;
  })()
  : [];

export { missionExamples };
