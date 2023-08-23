import { GAME_SIZE, BRICK, EMPTY } from './constants';
import { validBrick, validGame, updatePosition, randomBrick } from './game';
import { State, Brick } from './interfaces';

const isGoingToLevelWithExistingBricks = (state: State, brick: Brick): boolean => {
  const gameHeight = state.game.findIndex(r => r.some(c => c === BRICK));
  const brickBottomX = state.x + brick.length - 1;
  return gameHeight > -1 && brickBottomX + 1 > gameHeight;
}

const areAnyBricksColliding = (state: State, brick: Brick): boolean =>
  validBrick(brick).some((r, i) => r.some((c, j) =>
    c === EMPTY
      ? false
      : ((x, y) => state.game[x][y] === c)(i + state.x, j + state.y)
  ));

const collideBrick = (state: State, brick: Brick, isGoingToCollide: boolean): State => {
  const xOffset = isGoingToCollide ? 1 : 0;
  validBrick(brick).forEach((r, i) => {
    r.forEach((c, j) =>
      state.game[i + state.x - xOffset][j + state.y] =
      updatePosition(state.game[i + state.x - xOffset][j + state.y], c)
    );
  });
  state.game = validGame(state.game);
  state.x = 0;
  state.y = (GAME_SIZE / 2) - 1;
  return state;
}

export const collide = (state: State, brick: Brick): [State, Brick] => {
  const isGoingToCollide =
    isGoingToLevelWithExistingBricks(state, brick) &&
    areAnyBricksColliding(state, brick);

  const isOnBottom = state.x + validBrick(brick).length > GAME_SIZE- 1;

  if (isGoingToCollide || isOnBottom) {
    state = collideBrick(state, brick, isGoingToCollide);
    brick = randomBrick();
  }

  return [state, brick];
}