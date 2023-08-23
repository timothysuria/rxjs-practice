import { GAME_SIZE } from './constants';
import { State, Brick, Key } from './interfaces';

const xOffset = (brick: Brick, columnIndex: number) => brick.every(e => e[columnIndex] === 0) ? 1 : 0;

export const handleKeyPress = (state: State, brick: Brick, key: Key): State => (
  state.x += key.code === 'ArrowDown'
    ? 1
    : 0,
  state.y += key.code === 'ArrowLeft' && state.y > 0 - xOffset(brick, 0)
    ? -1
    : key.code === 'ArrowRight' && state.y < GAME_SIZE - 3 + xOffset(brick, 2)
      ? 1
      : 0,
  state
);

export const resetKey = key => key.code = undefined;