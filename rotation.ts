import { GAME_SIZE, BRICK_SIZE, EMPTY } from './constants';
import { State, Brick, Key } from './interfaces';

const rightOffsetAfterRotation = (state: State, brick: Brick, rotatedBrick: Brick) =>
  (state.y + rotatedBrick.length === GAME_SIZE + 1) && brick.every(e => e[2] === EMPTY) ? 1 : 0;

const leftOffsetAfterRotation = (game: State) => game.y < 0 ? 1 : 0;
const emptyBrick = (): Brick => Array(BRICK_SIZE).fill(EMPTY).map(e => Array(BRICK_SIZE).fill(EMPTY));

const rotateBrick = (state: State, brick: Brick, rotatedBrick: Brick): [State, Brick] => (
  brick.forEach((r, i) => r.forEach((c, j) => rotatedBrick[j][brick[0].length - 1 - i] = c)),
  state.y -= rightOffsetAfterRotation(state, brick, rotatedBrick),
  state.y += leftOffsetAfterRotation(state),
  [state, rotatedBrick]
)

export const rotate = (state: State, brick: Brick, key: Key): [State, Brick] =>
  key.code === 'ArrowUp' ? rotateBrick(state, brick, emptyBrick()) : [state, brick]