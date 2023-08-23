import { GAME_SIZE, EMPTY, BRICK } from './constants';
import { State } from './interfaces';

const bricks = [
  [[0, 0, 0], [1, 1, 1], [0, 0, 0]],
  [[1, 1, 1], [0, 1, 0], [0, 1, 0]],
  [[0, 1, 1], [0, 1, 0], [0, 1, 0]],
  [[1, 1, 0], [0, 1, 0], [0, 1, 0]],
  [[1, 1, 0], [1, 1, 0], [0, 0, 0]]
]

export const clearGame = () => Array(GAME_SIZE).fill(EMPTY).map(e => Array(GAME_SIZE).fill(EMPTY));
export const updatePosition = (position: number, column: number) => position === 0 ? column : position;
export const validGame = (game: number[][]) => game.map(r => r.filter((_, i) => i < GAME_SIZE));
export const validBrick = (brick: number[][]) => brick.filter(e => e.some(b => b === BRICK));
export const randomBrick = () => bricks[Math.floor(Math.random() * bricks.length)];

export const score = (state: State): State => (scoreIndex => (
  scoreIndex > -1
    ? (
      state.score += 1,
      state.game.splice(scoreIndex, 1),
      state.game = [Array(GAME_SIZE).fill(EMPTY), ...state.game],
      state
    )
    : state
))(state.game.findIndex(e => e.every(e => e === BRICK)));

export const initialState = {
  game: clearGame(),
  x: 0,
  y: 0,
  score: 0
};