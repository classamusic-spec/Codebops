/**
 * Where helpers live (§11, §15, §20).
 *
 * A library of saved helpers, and the builder. Reached from the level
 * picker rather than buried inside one world, because §20 says the
 * curriculum culminates in things a child MADE, and a helper is one of
 * those things — it should sit alongside their apps and machines, not
 * inside the level that happened to teach it.
 *
 * Everything a helper can be taught is gated on what the child has met
 * (§30). Concepts come from the agent progression, so the first helper
 * a four-year-old builds has a goal, a tool, a rule and a Try It button,
 * and nothing else to be confused by.
 */
import { el } from '../ui/dom';
import { sharedSfx } from '../audio/sfx';
import { button, backButton, ICON_CLEAR } from '../ui/components/button';
import { announce } from '../ui/a11y';
import { showToast } from '../ui/dialogs';
import type { SaveStore } from '../storage/saveStore';
import type { AgentMission } from '../agents/mission';
import { newMission } from '../agents/mission';
import {
  listMissions, saveMission, deleteMission, newMissionId,
} from '../storage/missionStore';
import { MISSION_GOALS, missionGoal } from '../data/agents/missionCatalog';
import { MissionBuilder } from '../ui/agents/missionBuilder';
import { evidenceForMission } from '../agents/evidence';
import { agentConceptsAvailableBy } from '../data/curriculum/agentProgression';
import type { AgentConcept } from '../data/curriculum/agentProgression';
import { WORLDS } from '../data/worlds';
import type { WorldId } from '../data/curriculum/stages';

export interface MissionScreenEvents {
  readonly onBack: () => void;
}

export class MissionScreen {
  private builder: MissionBuilder | null = null;
  private list!: HTMLElement;

  constructor(
    private readonly root: HTMLElement,
    private readonly store: SaveStore,
    private readonly events: MissionScreenEvents,
  ) {}

  enter(): void {
    this.root.classList.add('helpers-screen');
    this.renderLibrary();
  }

  // ---------------- library ----------------

  private renderLibrary(): void {
    this.root.replaceChildren();
    this.builder?.dispose();
    this.builder = null;

    const head = el('div', 'helpers-head', this.root);
    backButton(head, () => { sharedSfx.play('tap'); this.events.onBack(); }, 'Back');
    el('h1', 'helpers-title', head, 'My Helpers');

    el('p', 'helpers-lead', this.root, 'Teach a Bop to help.');

    this.list = el('div', 'helpers-list', this.root);
    const saved = listMissions();

    if (saved.length === 0) {
      el('p', 'helpers-empty', this.list,
        'You have not taught a helper yet. Pick a job below to start one.');
    }

    for (const m of saved) {
      this.renderCard(m);
    }

    el('h2', 'helpers-sub', this.root, 'Start a new helper');
    const grid = el('div', 'helpers-goals', this.root);
    for (const g of MISSION_GOALS) {
      const card = el('button', 'helpers-goal', grid) as HTMLButtonElement;
      card.type = 'button';
      const ico = el('span', 'helpers-goal-ico', card, g.icon);
      ico.setAttribute('aria-hidden', 'true');
      el('span', 'helpers-goal-text', card, g.childFacingTitle);
      card.addEventListener('click', () => {
        sharedSfx.play('bop');
        // updatedAt is a monotonic counter for sorting, not a clock: the
        // library only needs "which is newest", and a real timestamp would
        // make the deterministic test mode non-deterministic.
        const now = listMissions().length + 1;
        this.openBuilder(newMission(newMissionId(now), g.id, now));
      });
    }
  }

  private renderCard(m: AgentMission): void {
    let goalTitle = 'A helper';
    let icon = '🤖';
    try {
      const g = missionGoal(m.goalId);
      goalTitle = g.childFacingTitle;
      icon = g.icon;
    } catch { /* a goal that vanished still shows as a helper */ }

    const card = el('div', 'helper-card', this.list);
    const open = el('button', 'helper-open', card) as HTMLButtonElement;
    open.type = 'button';
    open.setAttribute('aria-label', `Open helper: ${goalTitle}`);
    const ico = el('span', 'helper-ico', open, icon);
    ico.setAttribute('aria-hidden', 'true');
    const text = el('span', 'helper-text', open);
    el('strong', undefined, text, goalTitle);
    el('span', 'helper-sub', text,
      m.rules.length === 1 ? '1 rule' : `${m.rules.length} rules`);
    if (m.passedEdgeCases.length > 0) {
      el('span', 'helper-badge', text, `✅ tested ×${m.passedEdgeCases.length}`);
    }
    open.addEventListener('click', () => { sharedSfx.play('tap'); this.openBuilder(m); });

    button(card, {
      icon: ICON_CLEAR, label: `Delete helper: ${goalTitle}`, variant: 'danger',
      shape: 'circle', size: 'sm',
      onClick: () => {
        sharedSfx.play('tap');
        deleteMission(m.id);
        announce('Helper removed');
        this.renderLibrary();
      },
    });
  }

  // ---------------- builder ----------------

  private openBuilder(mission: AgentMission): void {
    this.root.replaceChildren();
    this.builder = new MissionBuilder(this.root, mission, this.availableConcepts(), {
      onChange: (m) => { saveMission(m); },
      onSave: (m) => {
        if (!saveMission(m)) {
          // A full quota must not read as "your helper vanished".
          showToast(this.root, 'Could not save — try removing an old helper.');
          return;
        }
        // Evidence, recorded from what they BUILT (§22). The levelId is
        // the helper's own id, so the log holds one entry per helper per
        // requirement — editing a helper updates its evidence rather than
        // stacking a second copy.
        this.store.recordEvidence(evidenceForMission(m).map((e) => ({
          stage: e.stage,
          requirement: e.requirement,
          // A helper is something a child makes from what they know, so
          // it evidences the create phase — the same reading the App Lab
          // already gives its projects.
          phase: 'create' as const,
          levelId: m.id,
          note: e.note,
        })));
      },
      onExit: () => this.renderLibrary(),
    });
  }

  /**
   * Which agent ideas this child has met.
   *
   * Derived from how far along the journey they are, so a helper offers
   * memory once Gearworks has introduced it and not before. A child who
   * has played nothing still gets a complete, working helper.
   */
  private availableConcepts(): readonly AgentConcept[] {
    const order = (id: WorldId): number => WORLDS.find((w) => w.id === id)?.order ?? 99;
    const reached = [...WORLDS]
      .filter((w) => this.store.isWorldUnlocked(w.id) || w.order <= this.furthestOrder())
      .sort((a, b) => b.order - a.order)[0];
    return agentConceptsAvailableBy(reached?.id ?? 'sparkle-meadow', order);
  }

  /** The furthest world with any star in it. */
  private furthestOrder(): number {
    const played = Object.keys(this.store.stars);
    if (played.length === 0) return 1;
    // Level ids carry their world's prefix ('sm-', 'bb-', 'gw-'…), which
    // is enough to place them without importing every level definition.
    const PREFIX: Record<string, WorldId> = {
      sm: 'sparkle-meadow', bb: 'bubble-bay', pf: 'pattern-forest',
      rt: 'robot-town', gw: 'gearworks-garage', aa: 'agent-academy',
    };
    let best = 1;
    for (const id of played) {
      const world = PREFIX[id.split('-')[0]];
      if (!world) continue;
      best = Math.max(best, WORLDS.find((w) => w.id === world)?.order ?? 1);
    }
    return best;
  }

  dispose(): void {
    this.builder?.dispose();
    this.root.classList.remove('helpers-screen');
  }
}
