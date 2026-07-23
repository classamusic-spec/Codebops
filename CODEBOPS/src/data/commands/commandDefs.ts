import type { CommandId } from '../../gameplay/commands/interpreter';

export interface CommandDef {
  readonly id: CommandId;
  readonly label: string;
  readonly shortLabel: string;
  readonly icon: string; // glyph used on the tile
  readonly spoken: string;
}

export const COMMAND_DEFS: Readonly<Record<CommandId, CommandDef>> = {
  moveUp:      { id: 'moveUp',      label: 'Move Up',    shortLabel: 'Up',    icon: '⬆️', spoken: 'Step one tile up' },
  moveDown:    { id: 'moveDown',    label: 'Move Down',  shortLabel: 'Down',  icon: '⬇️', spoken: 'Step one tile down' },
  moveLeft:    { id: 'moveLeft',    label: 'Move Left',  shortLabel: 'Left',  icon: '⬅️', spoken: 'Step one tile to the left' },
  moveRight:   { id: 'moveRight',   label: 'Move Right', shortLabel: 'Right', icon: '➡️', spoken: 'Step one tile to the right' },
  grab:        { id: 'grab',        label: 'Grab',       shortLabel: 'Grab',  icon: '✋', spoken: 'Grab what is here' },
  drop:        { id: 'drop',        label: 'Drop',       shortLabel: 'Drop',  icon: '🫳', spoken: 'Drop what you carry' },
  repeat:      { id: 'repeat',      label: 'Repeat',     shortLabel: '×2',    icon: '↻',  spoken: 'Repeat the commands above' },
  repeatUntil: { id: 'repeatUntil', label: 'Until',      shortLabel: 'Until', icon: '🔁', spoken: 'Repeat until you get there' },
  ifFlower:    { id: 'ifFlower',    label: 'If Flower',  shortLabel: 'If 🌸', icon: '🌸', spoken: 'If you see a flower, do the next tile' },
  ifMushroom:  { id: 'ifMushroom',  label: 'If Mushroom',shortLabel: 'If 🍄', icon: '🍄', spoken: 'If you see a mushroom, do the next tile' },
  swap:        { id: 'swap',        label: 'Swap Bot',   shortLabel: 'Swap',  icon: '👥', spoken: 'Switch which bot follows the plan' },
  // Legacy relative commands (older saved programs; not offered in trays)
  move:        { id: 'move',        label: 'Move',       shortLabel: 'Move',  icon: '⬆️', spoken: 'Move forward one step' },
  turnRight:   { id: 'turnRight',   label: 'Turn Right', shortLabel: 'Turn',  icon: '↱',  spoken: 'Turn right' },
  turnLeft:    { id: 'turnLeft',    label: 'Turn Left',  shortLabel: 'Turn',  icon: '↰',  spoken: 'Turn left' },
};
