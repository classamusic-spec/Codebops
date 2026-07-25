/**
 * Scene builder (spec §9.3) — the slot board and the component tray.
 *
 * Tap-first throughout, because §26 rules out precision dragging: tap a
 * tray piece to put it in the highlighted space, tap a placed piece to
 * pick it up, tap a space to put it down. Every target is a big labelled
 * zone, and a piece that has nowhere to go says so rather than vanishing.
 */
import { el } from '../dom';
import { sharedSfx } from '../../audio/sfx';
import type { MiniAppProject } from '../../creator/miniAppProject';
import { componentChoices } from '../../creator/miniAppChoices';
import { approvedAsset } from '../../data/app-lab/approvedAssets';
import { approvedComponent } from '../../data/app-lab/approvedComponents';
import { sceneLayout } from '../../data/app-lab/sceneLayouts';
import type { MiniAppComponentType } from '../../creator/miniAppTypes';

export interface SceneBuilderEvents {
  readonly onAdd: (type: MiniAppComponentType, assetId: string, slotId: string) => void;
  readonly onMove: (componentId: string, slotId: string) => void;
  readonly onRemove: (componentId: string) => void;
  readonly onSelect: (componentId: string | null) => void;
}

export class SceneBuilder {
  readonly root: HTMLElement;
  private board!: HTMLElement;
  private tray!: HTMLElement;
  private project: MiniAppProject;
  private sceneId: string;
  /** The piece a child has picked up, waiting for a space. */
  private carrying: { componentId: string } | { type: MiniAppComponentType; assetId: string } | null = null;
  private selectedId: string | null = null;

  constructor(
    parent: HTMLElement,
    project: MiniAppProject,
    sceneId: string,
    private readonly events: SceneBuilderEvents,
  ) {
    this.project = project;
    this.sceneId = sceneId;
    this.root = el('div', 'sb-wrap', parent);
    this.board = el('div', 'sb-board', this.root);
    this.board.setAttribute('aria-label', 'The app screen. Tap a space to put something there.');
    this.tray = el('div', 'sb-tray', this.root);
    this.tray.setAttribute('aria-label', 'Things you can add');
    this.renderBoard();
    this.renderTray();
  }

  update(project: MiniAppProject, sceneId = this.sceneId): void {
    this.project = project;
    this.sceneId = sceneId;
    this.carrying = null;
    this.renderBoard();
    this.renderTray();
  }

  private scene(): MiniAppProject['scenes'][number] | undefined {
    return this.project.scenes.find((s) => s.id === this.sceneId);
  }

  // ---- the slot board ----

  private renderBoard(): void {
    this.board.innerHTML = '';
    const scene = this.scene();
    const layout = scene ? sceneLayout(scene.layoutTemplateId) : null;
    if (!scene || !layout) return;

    this.board.style.setProperty('--cols', String(layout.cols));
    this.board.style.setProperty('--rows', String(layout.rows));

    for (const slot of layout.slots) {
      const occupant = scene.components.find((c) => c.slotId === slot.id);
      const cell = el('button', `sb-slot${occupant ? ' filled' : ''}`, this.board) as HTMLButtonElement;
      cell.type = 'button';
      cell.style.gridColumn = slot.wide ? `${slot.col} / span 2` : String(slot.col);
      cell.style.gridRow = String(slot.row);
      if (this.carrying) cell.classList.add('targetable');
      if (occupant && occupant.id === this.selectedId) cell.classList.add('selected');

      if (occupant) {
        const asset = approvedAsset(occupant.assetId);
        el('span', 'sb-piece-glyph', cell, asset?.glyph ?? '❔');
        el('span', 'sb-piece-name', cell, asset?.label ?? occupant.id);
        cell.setAttribute('aria-label', `${occupant.accessibilityLabel}, in ${slot.label}. Tap to pick it up.`);
      } else {
        el('span', 'sb-slot-label', cell, slot.label);
        cell.setAttribute('aria-label', this.carrying
          ? `${slot.label} — empty. Tap to put it here.`
          : `${slot.label} — empty`);
      }

      cell.addEventListener('click', () => this.onSlotTap(slot.id, occupant?.id ?? null));
    }

    // A place to put something down that you have changed your mind about.
    const bin = el('button', `sb-bin${this.carrying && 'componentId' in (this.carrying ?? {}) ? ' ready' : ''}`, this.board) as HTMLButtonElement;
    bin.type = 'button';
    bin.style.gridColumn = `1 / span ${layout.cols}`;
    bin.style.gridRow = String(layout.rows + 1);
    el('span', undefined, bin, '🗑️');
    el('span', undefined, bin, this.carrying && 'componentId' in this.carrying
      ? 'Tap here to take it off the screen'
      : 'Pick something up to move or remove it');
    bin.setAttribute('aria-label', 'Remove the piece you are holding');
    bin.addEventListener('click', () => {
      if (this.carrying && 'componentId' in this.carrying) {
        sharedSfx.play('remove');
        this.events.onRemove(this.carrying.componentId);
        this.carrying = null;
      } else {
        sharedSfx.play('bump');
      }
    });
  }

  private onSlotTap(slotId: string, occupantId: string | null): void {
    if (this.carrying) {
      const carried = this.carrying;
      this.carrying = null;
      sharedSfx.play('place');
      if ('componentId' in carried) this.events.onMove(carried.componentId, slotId);
      else this.events.onAdd(carried.type, carried.assetId, slotId);
      return;
    }
    if (occupantId) {
      // Pick it up, and select it so the logic builder follows along.
      sharedSfx.play('tap');
      this.carrying = { componentId: occupantId };
      this.selectedId = occupantId;
      this.events.onSelect(occupantId);
      this.renderBoard();
      return;
    }
    sharedSfx.play('bump');
  }

  // ---- the component tray ----

  private renderTray(): void {
    this.tray.innerHTML = '';
    const scene = this.scene();
    if (!scene) return;

    const choices = componentChoices(this.project);
    // Group by role so the tray reads as "characters, props, buttons…".
    const byType = new Map<MiniAppComponentType, typeof choices>();
    for (const c of choices) {
      const list = byType.get(c.type) ?? [];
      list.push(c);
      byType.set(c.type, list);
    }

    for (const [type, list] of byType) {
      const def = approvedComponent(type);
      const group = el('div', 'sb-tray-group', this.tray);
      const label = el('div', 'sb-tray-label', group);
      el('span', undefined, label, def?.glyph ?? '❔');
      el('span', undefined, label, def?.label ?? type);
      const row = el('div', 'sb-tray-row', group);
      for (const choice of list) {
        const tile = el('button', 'sb-tray-tile', row) as HTMLButtonElement;
        tile.type = 'button';
        const carrying = this.carrying;
        const active = !!carrying && !('componentId' in carrying)
          && carrying.assetId === choice.assetId && carrying.type === choice.type;
        tile.classList.toggle('carrying', active);
        el('span', 'sb-tile-glyph', tile, choice.glyph);
        el('span', 'sb-tile-name', tile, choice.label);
        tile.setAttribute('aria-label', `Add ${choice.label} as a ${def?.label ?? type}`);
        tile.addEventListener('click', () => {
          sharedSfx.play('tap');
          this.carrying = { type: choice.type, assetId: choice.assetId };
          this.selectedId = null;
          this.renderBoard();
          this.renderTray();
        });
      }
    }
  }

  select(componentId: string | null): void {
    this.selectedId = componentId;
    this.renderBoard();
  }

  dispose(): void {
    this.root.remove();
  }
}
