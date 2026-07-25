/**
 * The Code Peek panel for a child's own app (spec §20).
 *
 * Picture blocks are always there. Plain language is one tap away. The
 * JavaScript is a third tap, and a grown-up can turn it off entirely from
 * the Campfire without taking the plain-language view with it.
 *
 * Typing is never required and nothing here is a test.
 */
import { el } from '../dom';
import { sharedSfx } from '../../audio/sfx';
import type { MiniAppProject } from '../../creator/miniAppProject';
import { plainLanguageProject, javaScriptProject } from '../../creator/miniAppCodePeek';
import { describeCommand, describeTrigger } from '../../creator/miniAppChoices';
import { approvedAsset } from '../../data/app-lab/approvedAssets';
import { flattenCommands } from '../../creator/miniAppTypes';

export interface CodePeekPanelOptions {
  /** Grown-ups can hide the JavaScript view (spec §20). */
  readonly showJavaScript: boolean;
  readonly onClose: () => void;
}

export class AppCodePeekPanel {
  readonly root: HTMLElement;

  constructor(
    parent: HTMLElement,
    private readonly project: MiniAppProject,
    private readonly options: CodePeekPanelOptions,
  ) {
    this.root = el('div', 'dialog-scrim acp-scrim', parent);
    this.build();
  }

  private build(): void {
    const dlg = el('div', 'dialog acp', this.root);
    dlg.setAttribute('role', 'dialog');
    dlg.setAttribute('aria-label', 'Code Peek — your app as real code');

    const head = el('div', 'acp-head', dlg);
    el('span', 'acp-glyph', head, '🔍');
    const titles = el('div', undefined, head);
    el('div', 'acp-kicker', titles, 'CODE PEEK');
    el('div', 'acp-title', titles, 'This is your app');

    // ---- view 1: the picture blocks the child placed ----
    const blocks = el('div', 'acp-section', dlg);
    el('div', 'acp-section-title', blocks, 'Your blocks');
    if (this.project.scripts.length === 0) {
      el('p', 'acp-empty', blocks, 'This app has not been taught anything yet.');
    }
    for (const script of this.project.scripts) {
      const lane = el('div', 'acp-lane', blocks);
      const owner = this.project.scenes.flatMap((s) => s.components)
        .find((c) => c.id === script.ownerId);
      el('span', 'acp-lane-glyph', lane, approvedAsset(owner?.assetId ?? '')?.glyph ?? '❔');
      el('span', 'acp-when', lane, describeTrigger(this.project, script.trigger));
      const row = el('div', 'acp-blocks', lane);
      for (const cmd of flattenCommands(script.commands)) {
        el('span', 'acp-block', row, describeCommand(this.project, cmd));
      }
      if (script.commands.length === 0) el('span', 'acp-block empty', row, 'nothing yet');
    }

    // ---- view 2: plain language ----
    const plainWrap = el('div', 'acp-section', dlg);
    const plainBtn = el('button', 'mini-btn acp-toggle', plainWrap, '📖 Read it in words') as HTMLButtonElement;
    plainBtn.type = 'button';
    const plain = el('pre', 'acp-code plain', plainWrap);
    plain.textContent = plainLanguageProject(this.project).join('\n');
    plain.hidden = true;
    plainBtn.addEventListener('click', () => {
      plain.hidden = !plain.hidden;
      plainBtn.textContent = plain.hidden ? '📖 Read it in words' : '📖 Hide the words';
      sharedSfx.play('tap');
    });

    // ---- view 3: the real code, if a grown-up allows it ----
    if (this.options.showJavaScript) {
      const jsWrap = el('div', 'acp-section', dlg);
      const jsBtn = el('button', 'mini-btn acp-toggle', jsWrap, '{ } Show real code') as HTMLButtonElement;
      jsBtn.type = 'button';
      const js = el('pre', 'acp-code js', jsWrap);
      js.textContent = javaScriptProject(this.project).join('\n');
      js.hidden = true;
      jsBtn.addEventListener('click', () => {
        js.hidden = !js.hidden;
        jsBtn.textContent = js.hidden ? '{ } Show real code' : '{ } Hide real code';
        sharedSfx.play('tap');
      });
    }

    const done = el('button', 'btn-play small', dlg, '👍 Got it') as HTMLButtonElement;
    done.type = 'button';
    done.addEventListener('click', () => { sharedSfx.play('tap'); this.close(); });
    done.focus();
    this.root.addEventListener('click', (e) => { if (e.target === this.root) this.close(); });
  }

  private close(): void {
    this.options.onClose();
    this.root.remove();
  }

  dispose(): void { this.root.remove(); }
}
