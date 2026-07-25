/**
 * Starter projects — the "here is one already going" state each template
 * hands a child (spec §9.2).
 *
 * Two rules shape this file:
 *  - Nothing is generated in here. Ids and timestamps arrive as arguments,
 *    so a project is reproducible and the creator stays deterministic (no
 *    Date.now(), no Math.random() anywhere below).
 *  - A starter is never blank and never finished. It shows the shape of an
 *    app with one obvious thing left to teach it, so the first move a child
 *    makes is their own.
 */
import type {
  MiniAppProject, MiniAppScene, MiniAppScript, MiniAppComponent,
  MiniAppVariableDefinition, MiniAppTitle,
} from './miniAppProject';
import { MINI_APP_SCHEMA_VERSION } from './miniAppProject';
import type { MiniAppTemplateDefinition } from './miniAppTemplateRegistry';
import { miniAppTemplate } from './miniAppTemplateRegistry';
import { approvedAsset } from '../data/app-lab/approvedAssets';
import { defaultAccessibilityLabel } from '../data/app-lab/approvedComponents';
import type { MiniAppComponentType, SerializableValue } from './miniAppTypes';
import { DROP_TARGET_REF } from './miniAppTypes';

/** Everything the factory needs from the outside world. */
export interface ProjectSeed {
  /** Stable project id, minted by the caller. */
  readonly id: string;
  /** Wall-clock time, injected so the factory stays pure. */
  readonly now: number;
  readonly themeId: string;
}

/** Build a component, filling in the label from the asset shelf. */
function component(
  id: string, type: MiniAppComponentType, assetId: string, slotId: string,
  initialState: SerializableValue = 'idle',
): MiniAppComponent {
  const asset = approvedAsset(assetId);
  return {
    id, type, assetId, slotId, initialState,
    accessibilityLabel: defaultAccessibilityLabel(type, asset?.label ?? assetId),
    ...(asset?.color || asset?.shape || asset?.itemType
      ? { properties: { color: asset.color, shape: asset.shape, itemType: asset.itemType } }
      : {}),
  };
}

const title = (tokens: string[]): MiniAppTitle => ({ tokens });

const counter = (id: string, label: string): MiniAppVariableDefinition => ({
  id, type: 'number', initialValue: 0, visualRepresentation: 'counter',
  accessibilityLabel: label,
});

/** Assemble a project around one scene, one goal and some scripts. */
function project(
  seed: ProjectSeed, template: MiniAppTemplateDefinition,
  parts: {
    title: MiniAppTitle;
    glyph: string;
    scenes: MiniAppScene[];
    scripts: MiniAppScript[];
    variables?: MiniAppVariableDefinition[];
    goalType: MiniAppProject['goal']['type'];
    goalTitle: MiniAppTitle;
    goalGlyph: string;
    goalTarget?: number;
  },
): MiniAppProject {
  const assetIds = new Set(parts.scenes.flatMap((s) => s.components.map((c) => c.assetId)));
  return {
    id: seed.id,
    schemaVersion: MINI_APP_SCHEMA_VERSION,
    type: template.type,
    templateId: template.id,
    themeId: seed.themeId,
    title: parts.title,
    iconDefinition: { glyph: parts.glyph, backgroundColor: 'cream' },
    scenes: parts.scenes,
    scripts: parts.scripts,
    variables: parts.variables ?? [],
    jobs: [],
    assets: [...assetIds].map((assetId) => ({ assetId })),
    goal: {
      type: parts.goalType,
      title: parts.goalTitle,
      glyph: parts.goalGlyph,
      ...(parts.goalTarget !== undefined ? { target: parts.goalTarget } : {}),
    },
    curriculum: {
      conceptsUsed: template.conceptsTaught,
      creatorStage: 'build',
      phase: 'create',
    },
    runtimeBudget: template.runtimeBudget,
    createdAt: seed.now,
    updatedAt: seed.now,
  };
}

// ---------------------------------------------------------------------
// Starter definitions — four per kit where the spec asks for four.
// ---------------------------------------------------------------------

export interface StarterDefinition {
  readonly id: string;
  readonly templateId: string;
  readonly label: string;
  readonly glyph: string;
  readonly blurb: string;
  readonly build: (seed: ProjectSeed) => MiniAppProject;
}

// ---- Tap Magic ----------------------------------------------------------

const bloomingFlower = (seed: ProjectSeed): MiniAppProject => {
  const t = miniAppTemplate('tap-react-basic')!;
  const flower = component('flower', 'prop', 'flower', 'stage-center', 'droopy');
  return project(seed, t, {
    title: title(['owner-my', 'thing-flower']),
    glyph: '🌸',
    scenes: [{ id: 'scene-1', layoutTemplateId: t.layoutTemplateId, components: [flower] }],
    scripts: [{
      id: 'script-1', ownerId: 'flower', trigger: { kind: 'onTap', targetId: 'flower' },
      commands: [
        { kind: 'changeState', targetId: 'flower', state: 'blooming' },
        { kind: 'playSound', sound: 'sparkle' },
      ],
    }],
    goalType: 'somethingReacts',
    goalTitle: title(['thing-flower']),
    goalGlyph: '🌸',
  });
};

const jumpingZip = (seed: ProjectSeed): MiniAppProject => {
  const t = miniAppTemplate('tap-react-basic')!;
  const zip = component('zip', 'character', 'zip', 'stage-center');
  return project(seed, t, {
    title: title(['owner-zip', 'thing-game']),
    glyph: '🐰',
    scenes: [{ id: 'scene-1', layoutTemplateId: t.layoutTemplateId, components: [zip] }],
    scripts: [{
      id: 'script-1', ownerId: 'zip', trigger: { kind: 'onTap', targetId: 'zip' },
      commands: [
        { kind: 'animate', targetId: 'zip', animation: 'jump' },
        { kind: 'playSound', sound: 'pop' },
      ],
    }],
    goalType: 'somethingReacts',
    goalTitle: title(['owner-zip']),
    goalGlyph: '🐰',
  });
};

const lightSwitch = (seed: ProjectSeed): MiniAppProject => {
  const t = miniAppTemplate('tap-react-basic')!;
  const lamp = component('lamp', 'light', 'lamp', 'stage-center', 'off');
  const btn = component('button', 'button', 'button-green', 'stage-front');
  return project(seed, t, {
    title: title(['owner-my', 'desc-shiny', 'thing-machine']),
    glyph: '💡',
    scenes: [{ id: 'scene-1', layoutTemplateId: t.layoutTemplateId, components: [lamp, btn] }],
    scripts: [{
      id: 'script-1', ownerId: 'button', trigger: { kind: 'onTap', targetId: 'button' },
      commands: [
        { kind: 'lightOn', targetId: 'lamp' },
        { kind: 'playSound', sound: 'tap' },
      ],
    }],
    goalType: 'somethingReacts',
    goalTitle: title(['desc-shiny', 'thing-machine']),
    goalGlyph: '💡',
  });
};

const soundButtons = (seed: ProjectSeed): MiniAppProject => {
  const t = miniAppTemplate('tap-react-basic')!;
  const pads = [
    component('pad-drum', 'soundPad', 'drum-pad', 'stage-left'),
    component('pad-bell', 'soundPad', 'bell-pad', 'stage-center'),
    component('pad-xylo', 'soundPad', 'xylo-pad', 'stage-right'),
  ];
  return project(seed, t, {
    title: title(['owner-my', 'thing-music']),
    glyph: '🎵',
    scenes: [{ id: 'scene-1', layoutTemplateId: t.layoutTemplateId, components: pads }],
    scripts: [
      {
        id: 'script-1', ownerId: 'pad-drum', trigger: { kind: 'onTap', targetId: 'pad-drum' },
        commands: [{ kind: 'playSound', sound: 'drum' }],
      },
      {
        id: 'script-2', ownerId: 'pad-bell', trigger: { kind: 'onTap', targetId: 'pad-bell' },
        commands: [{ kind: 'playSound', sound: 'bell' }],
      },
    ],
    goalType: 'somethingReacts',
    goalTitle: title(['thing-music']),
    goalGlyph: '🎵',
  });
};

// ---- Sort and Match ----------------------------------------------------

const colorSorter = (seed: ProjectSeed): MiniAppProject => {
  const t = miniAppTemplate('sorting-basic')!;
  const items = [
    component('item-1', 'collectible', 'berry', 'tray-1'),
    component('item-2', 'collectible', 'blueberry', 'tray-2'),
  ];
  const baskets = [
    component('basket-red', 'basket', 'basket-red', 'basket-left'),
    component('basket-blue', 'basket', 'basket-blue', 'basket-right'),
  ];
  const score = component('score', 'counter', 'counter-wheel', 'score-slot');
  return project(seed, t, {
    title: title(['owner-my', 'thing-sorter']),
    glyph: '🧺',
    scenes: [{
      id: 'scene-1', layoutTemplateId: t.layoutTemplateId,
      components: [...items, ...baskets, score],
    }],
    variables: [counter('score', 'Score')],
    scripts: ['item-1', 'item-2'].map((id, i) => ({
      id: `script-${i + 1}`, ownerId: id, trigger: { kind: 'onDrop' as const, targetId: id },
      commands: [{
        kind: 'ifElse' as const,
        test: { kind: 'colorEquals' as const, itemId: id, targetId: DROP_TARGET_REF },
        then: [
          { kind: 'increaseCounter' as const, variableId: 'score' },
          { kind: 'playSound' as const, sound: 'happy' as const },
        ],
        otherwise: [
          { kind: 'returnHome' as const, targetId: id },
          { kind: 'playSound' as const, sound: 'tryAgain' as const },
        ],
      }],
    })),
    goalType: 'allSorted',
    goalTitle: title(['thing-sorter']),
    goalGlyph: '🧺',
    goalTarget: 2,
  });
};

const shapeMatch = (seed: ProjectSeed): MiniAppProject => {
  const t = miniAppTemplate('sorting-basic')!;
  const items = [
    component('item-1', 'collectible', 'block', 'tray-1'),
    component('item-2', 'collectible', 'shell', 'tray-2'),
  ];
  const baskets = [
    component('basket-square', 'basket', 'crate', 'basket-left'),
    component('basket-round', 'basket', 'basket-blue', 'basket-right'),
  ];
  return project(seed, t, {
    title: title(['owner-my', 'thing-shapes']),
    glyph: '🔷',
    scenes: [{
      id: 'scene-1', layoutTemplateId: t.layoutTemplateId, components: [...items, ...baskets],
    }],
    variables: [counter('score', 'Score')],
    scripts: [{
      id: 'script-1', ownerId: 'item-1', trigger: { kind: 'onDrop', targetId: 'item-1' },
      commands: [{
        kind: 'ifElse',
        test: { kind: 'shapeEquals', itemId: 'item-1', targetId: DROP_TARGET_REF },
        then: [{ kind: 'increaseCounter', variableId: 'score' }],
        otherwise: [{ kind: 'returnHome', targetId: 'item-1' }],
      }],
    }],
    goalType: 'allSorted',
    goalTitle: title(['thing-shapes']),
    goalGlyph: '🔷',
    goalTarget: 2,
  });
};

const berryBoltSort = (seed: ProjectSeed): MiniAppProject => {
  const t = miniAppTemplate('sorting-basic')!;
  const items = [
    component('item-1', 'collectible', 'berry', 'tray-1'),
    component('item-2', 'collectible', 'bolt', 'tray-2'),
    component('item-3', 'collectible', 'berry', 'tray-3'),
  ];
  const baskets = [
    component('basket-food', 'basket', 'basket-red', 'basket-left'),
    component('basket-parts', 'basket', 'crate', 'basket-right'),
  ];
  return project(seed, t, {
    title: title(['owner-zip', 'thing-berry', 'thing-sorter']),
    glyph: '🍓',
    scenes: [{
      id: 'scene-1', layoutTemplateId: t.layoutTemplateId, components: [...items, ...baskets],
    }],
    variables: [counter('score', 'Score')],
    scripts: [{
      id: 'script-1', ownerId: 'item-1', trigger: { kind: 'onDrop', targetId: 'item-1' },
      commands: [{
        kind: 'ifElse',
        test: { kind: 'typeEquals', itemId: 'item-1', targetId: DROP_TARGET_REF },
        then: [{ kind: 'increaseCounter', variableId: 'score' }],
        otherwise: [{ kind: 'returnHome', targetId: 'item-1' }],
      }],
    }],
    goalType: 'reachScore',
    goalTitle: title(['thing-berry']),
    goalGlyph: '🍓',
    goalTarget: 3,
  });
};

const soundMatch = (seed: ProjectSeed): MiniAppProject => {
  const t = miniAppTemplate('sorting-basic')!;
  const pads = [
    component('pad-drum', 'collectible', 'drum-pad', 'tray-1'),
    component('pad-bell', 'collectible', 'bell-pad', 'tray-2'),
  ];
  const baskets = [
    component('basket-loud', 'basket', 'crate', 'basket-left'),
    component('basket-soft', 'basket', 'basket-blue', 'basket-right'),
  ];
  return project(seed, t, {
    title: title(['owner-my', 'thing-music', 'thing-sorter']),
    glyph: '🎼',
    scenes: [{
      id: 'scene-1', layoutTemplateId: t.layoutTemplateId, components: [...pads, ...baskets],
    }],
    variables: [counter('score', 'Score')],
    scripts: [{
      id: 'script-1', ownerId: 'pad-drum', trigger: { kind: 'onTap', targetId: 'pad-drum' },
      commands: [{ kind: 'playSound', sound: 'drum' }],
    }],
    goalType: 'allSorted',
    goalTitle: title(['thing-music']),
    goalGlyph: '🎼',
    goalTarget: 2,
  });
};

// ---- Story Stage -------------------------------------------------------

const lostStar = (seed: ProjectSeed): MiniAppProject => {
  const t = miniAppTemplate('story-basic')!;
  const scene1: MiniAppScene = {
    id: 'scene-1', layoutTemplateId: t.layoutTemplateId,
    components: [
      component('zip', 'character', 'zip', 'cast-center'),
      component('star', 'prop', 'star', 'cast-right', 'hidden'),
    ],
  };
  const scene2: MiniAppScene = {
    id: 'scene-2', layoutTemplateId: t.layoutTemplateId,
    components: [
      component('zip-2', 'character', 'zip', 'cast-left'),
      component('star-2', 'prop', 'star', 'cast-center'),
    ],
  };
  return project(seed, t, {
    title: title(['owner-zip', 'thing-star', 'thing-story']),
    glyph: '⭐',
    scenes: [scene1, scene2],
    scripts: [
      {
        id: 'script-1', ownerId: 'zip', trigger: { kind: 'onSceneStart', sceneId: 'scene-1' },
        commands: [{ kind: 'speakPhrase', targetId: 'zip', phrase: 'whichWay' }],
      },
      {
        id: 'script-2', ownerId: 'zip', trigger: { kind: 'onTap', targetId: 'zip' },
        commands: [{ kind: 'changeScene', sceneId: 'scene-2' }],
      },
    ],
    goalType: 'storyReachesEnd',
    goalTitle: title(['thing-star', 'thing-story']),
    goalGlyph: '⭐',
  });
};

const gardenRescue = (seed: ProjectSeed): MiniAppProject => {
  const t = miniAppTemplate('story-basic')!;
  return project(seed, t, {
    title: title(['owner-my', 'thing-garden', 'thing-story']),
    glyph: '🌻',
    scenes: [{
      id: 'scene-1', layoutTemplateId: t.layoutTemplateId,
      components: [
        component('zip', 'character', 'zip', 'cast-left'),
        component('flower', 'prop', 'flower', 'cast-right', 'droopy'),
      ],
    }],
    scripts: [{
      id: 'script-1', ownerId: 'zip', trigger: { kind: 'onTap', targetId: 'zip' },
      commands: [
        { kind: 'speakPhrase', targetId: 'zip', phrase: 'lookAtThis' },
        { kind: 'changeState', targetId: 'flower', state: 'blooming' },
      ],
    }],
    goalType: 'storyReachesEnd',
    goalTitle: title(['thing-garden']),
    goalGlyph: '🌻',
  });
};

const mixedUpMachine = (seed: ProjectSeed): MiniAppProject => {
  const t = miniAppTemplate('story-basic')!;
  return project(seed, t, {
    title: title(['owner-mixy', 'desc-funny', 'thing-story']),
    glyph: '👾',
    scenes: [{
      id: 'scene-1', layoutTemplateId: t.layoutTemplateId,
      components: [
        component('mixy', 'character', 'mixy', 'cast-center'),
        component('lamp', 'prop', 'lamp', 'cast-right', 'off'),
      ],
    }],
    scripts: [{
      id: 'script-1', ownerId: 'mixy', trigger: { kind: 'onTap', targetId: 'mixy' },
      commands: [
        { kind: 'animate', targetId: 'mixy', animation: 'shake' },
        { kind: 'speakPhrase', targetId: 'mixy', phrase: 'oopsIFixedIt' },
      ],
    }],
    goalType: 'storyReachesEnd',
    goalTitle: title(['desc-funny', 'thing-story']),
    goalGlyph: '👾',
  });
};

const choosePath = (seed: ProjectSeed): MiniAppProject => {
  const t = miniAppTemplate('story-basic')!;
  return project(seed, t, {
    title: title(['owner-my', 'thing-story']),
    glyph: '🧭',
    scenes: [{
      id: 'scene-1', layoutTemplateId: t.layoutTemplateId,
      components: [
        component('zip', 'character', 'zip', 'cast-center'),
        component('choice-a', 'choiceCard', 'choice-left', 'choice-a'),
        component('choice-b', 'choiceCard', 'choice-right', 'choice-b'),
      ],
    }],
    scripts: [{
      id: 'script-1', ownerId: 'choice-a', trigger: { kind: 'onChoiceSelected', targetId: 'choice-a' },
      commands: [{ kind: 'speakPhrase', targetId: 'zip', phrase: 'letsGo' }],
    }],
    goalType: 'storyReachesEnd',
    goalTitle: title(['owner-my', 'thing-story']),
    goalGlyph: '🧭',
  });
};

// ---- Music Maker -------------------------------------------------------

const fourBeatLoop = (seed: ProjectSeed): MiniAppProject => {
  const t = miniAppTemplate('music-basic')!;
  return project(seed, t, {
    title: title(['owner-my', 'thing-song']),
    glyph: '🥁',
    scenes: [{
      id: 'scene-1', layoutTemplateId: t.layoutTemplateId,
      components: [
        component('pad-drum', 'soundPad', 'drum-pad', 'pad-1'),
        component('pad-bell', 'soundPad', 'bell-pad', 'pad-2'),
        component('play', 'button', 'button-green', 'play-slot'),
      ],
    }],
    scripts: [{
      id: 'script-1', ownerId: 'play', trigger: { kind: 'onTap', targetId: 'play' },
      commands: [{
        kind: 'repeatN', times: 2,
        body: [
          { kind: 'playSound', sound: 'drum' },
          { kind: 'wait', beats: 1 },
          { kind: 'playSound', sound: 'bell' },
          { kind: 'wait', beats: 1 },
        ],
      }],
    }],
    goalType: 'songPlays',
    goalTitle: title(['thing-song']),
    goalGlyph: '🥁',
  });
};

const bopBand = (seed: ProjectSeed): MiniAppProject => {
  const t = miniAppTemplate('music-basic')!;
  return project(seed, t, {
    title: title(['owner-our', 'thing-song']),
    glyph: '🎼',
    scenes: [{
      id: 'scene-1', layoutTemplateId: t.layoutTemplateId,
      components: [
        component('zip', 'instrument', 'drum-pad', 'pad-1'),
        component('mixy', 'instrument', 'bell-pad', 'pad-2'),
        component('play', 'button', 'button-green', 'play-slot'),
      ],
    }],
    scripts: [
      {
        id: 'script-1', ownerId: 'play', trigger: { kind: 'onTap', targetId: 'play' },
        commands: [{ kind: 'sendMessage', message: 'go' }],
      },
      {
        id: 'script-2', ownerId: 'zip', trigger: { kind: 'onMessage', message: 'go' },
        commands: [{ kind: 'playSound', sound: 'drum' }],
      },
      {
        id: 'script-3', ownerId: 'mixy', trigger: { kind: 'onMessage', message: 'go' },
        commands: [{ kind: 'playSound', sound: 'bell' }],
      },
    ],
    goalType: 'songPlays',
    goalTitle: title(['owner-our', 'thing-song']),
    goalGlyph: '🎼',
  });
};

const tapSoundboard = (seed: ProjectSeed): MiniAppProject => {
  const t = miniAppTemplate('music-basic')!;
  const pads = [
    component('pad-1', 'soundPad', 'drum-pad', 'pad-1'),
    component('pad-2', 'soundPad', 'bell-pad', 'pad-2'),
    component('pad-3', 'soundPad', 'xylo-pad', 'pad-3'),
    component('pad-4', 'soundPad', 'shaker-pad', 'pad-4'),
  ];
  return project(seed, t, {
    title: title(['owner-my', 'thing-music']),
    glyph: '🎵',
    scenes: [{ id: 'scene-1', layoutTemplateId: t.layoutTemplateId, components: pads }],
    scripts: [
      { id: 'script-1', ownerId: 'pad-1', trigger: { kind: 'onTap', targetId: 'pad-1' }, commands: [{ kind: 'playSound', sound: 'drum' }] },
      { id: 'script-2', ownerId: 'pad-2', trigger: { kind: 'onTap', targetId: 'pad-2' }, commands: [{ kind: 'playSound', sound: 'bell' }] },
      { id: 'script-3', ownerId: 'pad-3', trigger: { kind: 'onTap', targetId: 'pad-3' }, commands: [{ kind: 'playSound', sound: 'xylophone' }] },
      { id: 'script-4', ownerId: 'pad-4', trigger: { kind: 'onTap', targetId: 'pad-4' }, commands: [{ kind: 'playSound', sound: 'shaker' }] },
    ],
    goalType: 'songPlays',
    goalTitle: title(['thing-music']),
    goalGlyph: '🎵',
  });
};

const lightAndMusicShow = (seed: ProjectSeed): MiniAppProject => {
  const t = miniAppTemplate('music-basic')!;
  return project(seed, t, {
    title: title(['desc-shiny', 'thing-song']),
    glyph: '💡',
    scenes: [{
      id: 'scene-1', layoutTemplateId: t.layoutTemplateId,
      components: [
        component('pad-drum', 'soundPad', 'drum-pad', 'pad-1'),
        component('lamp', 'light', 'lamp', 'pad-3', 'off'),
        component('play', 'button', 'button-star', 'play-slot'),
      ],
    }],
    scripts: [{
      id: 'script-1', ownerId: 'play', trigger: { kind: 'onTap', targetId: 'play' },
      commands: [{
        kind: 'repeatN', times: 2,
        body: [
          { kind: 'lightOn', targetId: 'lamp' },
          { kind: 'playSound', sound: 'drum' },
          { kind: 'wait', beats: 1 },
          { kind: 'lightOff', targetId: 'lamp' },
          { kind: 'wait', beats: 1 },
        ],
      }],
    }],
    goalType: 'songPlays',
    goalTitle: title(['desc-shiny', 'thing-song']),
    goalGlyph: '💡',
  });
};

// ---- Tiny Game Maker ---------------------------------------------------

const collectStars = (seed: ProjectSeed): MiniAppProject => {
  const t = miniAppTemplate('mini-game-collect')!;
  return project(seed, t, {
    title: title(['owner-zip', 'thing-star', 'thing-game']),
    glyph: '⭐',
    scenes: [{
      id: 'scene-1', layoutTemplateId: t.layoutTemplateId,
      components: [
        component('player', 'player', 'zip', 'player-slot'),
        component('star-1', 'collectible', 'star', 'cell-1'),
        component('star-2', 'collectible', 'star', 'cell-2'),
        component('star-3', 'collectible', 'star', 'cell-3'),
        component('score', 'counter', 'counter-wheel', 'counter-slot'),
      ],
    }],
    variables: [counter('score', 'Score')],
    scripts: [
      {
        id: 'script-1', ownerId: 'star-1', trigger: { kind: 'onItemCollected', targetId: 'star-1' },
        commands: [{ kind: 'increaseCounter', variableId: 'score' }],
      },
      {
        id: 'script-2', ownerId: 'score', trigger: { kind: 'onCounterChanged', variableId: 'score' },
        commands: [{
          kind: 'if', test: { kind: 'counterAtLeast', variableId: 'score', value: 3 },
          then: [{ kind: 'showWin' }],
        }],
      },
    ],
    goalType: 'collectAll',
    goalTitle: title(['thing-star', 'thing-game']),
    goalGlyph: '⭐',
    goalTarget: 3,
  });
};

const deliverBerry = (seed: ProjectSeed): MiniAppProject => {
  const t = miniAppTemplate('mini-game-collect')!;
  return project(seed, t, {
    title: title(['owner-zip', 'thing-berry', 'thing-game']),
    glyph: '🍓',
    scenes: [{
      id: 'scene-1', layoutTemplateId: t.layoutTemplateId,
      components: [
        component('player', 'player', 'zip', 'player-slot'),
        component('berry', 'collectible', 'berry', 'cell-2'),
        component('goal', 'goal', 'star-pad', 'goal-slot'),
      ],
    }],
    variables: [counter('score', 'Delivered')],
    scripts: [{
      id: 'script-1', ownerId: 'goal', trigger: { kind: 'onGoalReached', targetId: 'goal' },
      commands: [{ kind: 'showWin' }, { kind: 'celebrate' }],
    }],
    goalType: 'reachTheGoal',
    goalTitle: title(['thing-berry', 'thing-game']),
    goalGlyph: '🍓',
    goalTarget: 1,
  });
};

const guideToGoal = (seed: ProjectSeed): MiniAppProject => {
  const t = miniAppTemplate('mini-game-collect')!;
  return project(seed, t, {
    title: title(['owner-my', 'desc-tiny', 'thing-game']),
    glyph: '🛶',
    scenes: [{
      id: 'scene-1', layoutTemplateId: t.layoutTemplateId,
      components: [
        component('player', 'player', 'mixy', 'player-slot'),
        component('bush', 'friendlyObstacle', 'bush', 'cell-2'),
        component('goal', 'goal', 'dock', 'goal-slot'),
      ],
    }],
    variables: [counter('score', 'Score')],
    scripts: [{
      id: 'script-1', ownerId: 'goal', trigger: { kind: 'onGoalReached', targetId: 'goal' },
      commands: [{ kind: 'showWin' }],
    }],
    goalType: 'reachTheGoal',
    goalTitle: title(['desc-tiny', 'thing-game']),
    goalGlyph: '🛶',
    goalTarget: 1,
  });
};

// ---- Helper Builder ----------------------------------------------------

const waterDroopyFlowers = (seed: ProjectSeed): MiniAppProject => {
  const t = miniAppTemplate('helper-basic')!;
  const base = project(seed, t, {
    title: title(['owner-my', 'thing-garden', 'thing-helper']),
    glyph: '🌻',
    scenes: [{
      id: 'scene-1', layoutTemplateId: t.layoutTemplateId,
      components: [
        component('helper', 'character', 'zip', 'helper-slot'),
        component('can', 'helperTool', 'watering-can', 'tool-slot'),
        component('flower-1', 'prop', 'flower', 'plot-1', 'droopy'),
        component('flower-2', 'prop', 'flower', 'plot-2', 'blooming'),
        component('memory', 'memoryContainer', 'memory-crystal', 'memory-slot'),
      ],
    }],
    variables: [counter('watered', 'Flowers watered')],
    scripts: [{
      id: 'rule-1', ownerId: 'helper', trigger: { kind: 'onAppStart' },
      commands: [{
        kind: 'if', test: { kind: 'stateIs', targetId: 'flower-1', state: 'droopy' },
        then: [
          { kind: 'changeState', targetId: 'flower-1', state: 'watered' },
          { kind: 'increaseCounter', variableId: 'watered' },
        ],
      }],
    }],
    goalType: 'helperFinishes',
    goalTitle: title(['thing-garden', 'thing-helper']),
    goalGlyph: '🌻',
  });
  return {
    ...base,
    helper: {
      goalId: 'keep-flowers-healthy',
      toolIds: ['can'],
      rules: [base.scripts[0]],
      memoryVariableId: 'watered',
      requiresApprovalFor: ['remove-a-flower'],
    },
  };
};

const packByColor = (seed: ProjectSeed): MiniAppProject => {
  const t = miniAppTemplate('helper-basic')!;
  const base = project(seed, t, {
    title: title(['owner-my', 'desc-busy', 'thing-helper']),
    glyph: '📦',
    scenes: [{
      id: 'scene-1', layoutTemplateId: t.layoutTemplateId,
      components: [
        component('helper', 'character', 'zip', 'helper-slot'),
        component('claw', 'helperTool', 'sorting-claw', 'tool-slot'),
        component('item-1', 'prop', 'berry', 'plot-1'),
        component('crate', 'prop', 'crate', 'plot-3'),
      ],
    }],
    variables: [counter('packed', 'Things packed')],
    scripts: [{
      id: 'rule-1', ownerId: 'helper', trigger: { kind: 'onAppStart' },
      commands: [{
        kind: 'if', test: { kind: 'colorEquals', itemId: 'item-1', targetId: 'crate' },
        then: [{ kind: 'increaseCounter', variableId: 'packed' }],
      }],
    }],
    goalType: 'helperFinishes',
    goalTitle: title(['desc-busy', 'thing-helper']),
    goalGlyph: '📦',
  });
  return {
    ...base,
    helper: {
      goalId: 'pack-by-colour',
      toolIds: ['claw'],
      rules: [base.scripts[0]],
      memoryVariableId: 'packed',
      requiresApprovalFor: ['throw-something-away'],
    },
  };
};

const feedThePet = (seed: ProjectSeed): MiniAppProject => {
  const t = miniAppTemplate('helper-basic')!;
  const base = project(seed, t, {
    title: title(['owner-my', 'desc-sleepy', 'thing-helper']),
    glyph: '🥣',
    scenes: [{
      id: 'scene-1', layoutTemplateId: t.layoutTemplateId,
      components: [
        component('helper', 'character', 'zip', 'helper-slot'),
        component('bowl', 'helperTool', 'food-bowl', 'tool-slot'),
        component('pet', 'prop', 'sleepy-bop', 'plot-1', 'sleepy'),
      ],
    }],
    variables: [counter('meals', 'Meals given')],
    scripts: [
      {
        id: 'rule-1', ownerId: 'helper', trigger: { kind: 'onAppStart' },
        commands: [{
          kind: 'if', test: { kind: 'stateIs', targetId: 'pet', state: 'sleepy' },
          then: [{ kind: 'speakPhrase', targetId: 'helper', phrase: 'iNeedHelp' }],
        }],
      },
      {
        id: 'rule-2', ownerId: 'helper', trigger: { kind: 'onTap', targetId: 'helper' },
        commands: [{
          kind: 'askForApproval', phrase: 'imThinking',
          then: [
            { kind: 'changeState', targetId: 'pet', state: 'happy' },
            { kind: 'increaseCounter', variableId: 'meals' },
          ],
        }],
      },
    ],
    goalType: 'helperFinishes',
    goalTitle: title(['desc-sleepy', 'thing-helper']),
    goalGlyph: '🥣',
  });
  return {
    ...base,
    helper: {
      goalId: 'look-after-the-pet',
      toolIds: ['bowl'],
      rules: [...base.scripts],
      memoryVariableId: 'meals',
      requiresApprovalFor: ['wake-the-pet'],
    },
  };
};

// ---------------------------------------------------------------------
// The starter catalogue
// ---------------------------------------------------------------------

const starter = (
  id: string, templateId: string, label: string, glyph: string, blurb: string,
  build: (seed: ProjectSeed) => MiniAppProject,
): StarterDefinition => ({ id, templateId, label, glyph, blurb, build });

export const MINI_APP_STARTERS: readonly StarterDefinition[] = [
  // Tap Magic
  starter('blooming-flower', 'tap-react-basic', 'Blooming Flower', '🌸', 'Tap a flower and it blooms.', bloomingFlower),
  starter('jumping-zip', 'tap-react-basic', 'Jumping Zip', '🐰', 'Tap Zip and Zip jumps.', jumpingZip),
  starter('light-switch', 'tap-react-basic', 'Light Switch', '💡', 'Tap a button and a light comes on.', lightSwitch),
  starter('sound-buttons', 'tap-react-basic', 'Sound Buttons', '🎵', 'Three pads, three sounds.', soundButtons),
  // Sort and Match
  starter('color-sorter', 'sorting-basic', 'Color Sorter', '🧺', 'Drop each thing in the matching basket.', colorSorter),
  starter('shape-match', 'sorting-basic', 'Shape Match', '🔷', 'Sort by shape instead of colour.', shapeMatch),
  starter('berry-bolt-sort', 'sorting-basic', 'Berry and Bolt Sort', '🍓', 'Food one way, parts the other.', berryBoltSort),
  starter('sound-match', 'sorting-basic', 'Sound Match', '🎼', 'Match each sound to its box.', soundMatch),
  // Story Stage
  starter('lost-star', 'story-basic', 'Lost Star', '⭐', 'Zip looks for a star that went missing.', lostStar),
  starter('garden-rescue', 'story-basic', 'Garden Rescue', '🌻', 'Help a droopy flower feel better.', gardenRescue),
  starter('mixed-up-machine', 'story-basic', 'Mixed-Up Machine', '👾', 'Mixy muddles a machine, then fixes it.', mixedUpMachine),
  starter('choose-a-path', 'story-basic', 'Choose a Path', '🧭', 'Two ways to go — which one?', choosePath),
  // Music Maker
  starter('four-beat-loop', 'music-basic', 'Four Beat Loop', '🥁', 'A loop that plays itself.', fourBeatLoop),
  starter('bop-band', 'music-basic', 'Bop Band', '🎼', 'Two Bops play together on one signal.', bopBand),
  starter('tap-soundboard', 'music-basic', 'Tap Soundboard', '🎵', 'Four pads to play with.', tapSoundboard),
  starter('light-music-show', 'music-basic', 'Light and Music Show', '💡', 'The light keeps time with the drum.', lightAndMusicShow),
  // Tiny Game Maker
  starter('collect-stars', 'mini-game-collect', 'Collect Three Stars', '⭐', 'Pick up stars and win.', collectStars),
  starter('deliver-berry', 'mini-game-collect', 'Deliver a Berry', '🍓', 'Take the berry to the pad.', deliverBerry),
  starter('guide-to-goal', 'mini-game-collect', 'Guide to the Dock', '🛶', 'Find a way past the bush.', guideToGoal),
  // Helper Builder
  starter('water-droopy-flowers', 'helper-basic', 'Water Droopy Flowers', '🌻', 'A helper that waters what needs it.', waterDroopyFlowers),
  starter('pack-by-color', 'helper-basic', 'Pack by Color', '📦', 'A helper that packs matching things.', packByColor),
  starter('feed-the-pet', 'helper-basic', 'Feed the Pet', '🥣', 'A helper that asks before it acts.', feedThePet),
];

export function startersForTemplate(templateId: string): StarterDefinition[] {
  return MINI_APP_STARTERS.filter((s) => s.templateId === templateId);
}

export function starterDefinition(id: string): StarterDefinition | null {
  return MINI_APP_STARTERS.find((s) => s.id === id) ?? null;
}

/** Duplicate a project under a new id (spec §11 App Library). */
export function duplicateProject(
  project: MiniAppProject, seed: ProjectSeed, version: number,
): MiniAppProject {
  return {
    ...project,
    id: seed.id,
    title: { ...project.title, version },
    createdAt: seed.now,
    updatedAt: seed.now,
  };
}
