import { BRICK } from './constants';
import { State, Brick } from './interfaces';
import { updatePosition, validGame, validBrick, clearGame } from './game';

const createElem = (column: number): HTMLElement => (elem =>
  (
    elem.style.display = 'inline-block',
    elem.style.marginLeft = '3px',
    elem.style.height = '6px',
    elem.style.width = '6px',
    elem.style['background-color'] = column === BRICK
      ? 'green'
      : 'aliceblue',
    elem
  ))(document.createElement('div'))

export const render = (state: State, brick: Brick): void => {
  const gameFrame = clearGame();

  state.game.forEach((r, i) => r.forEach((c, j) => gameFrame[i][j] = c));
  validBrick(brick).forEach((r, i) =>
    r.forEach((c, j) => gameFrame[i + state.x][j + state.y] =
      updatePosition(gameFrame[i + state.x][j + state.y], c)));

  document.body.innerHTML = `score: ${state.score} <br/>`;
  validGame(gameFrame).forEach(r => {
    const rowContainer = document.createElement('div');
    r.forEach(c => rowContainer.appendChild(createElem(c)));
    document.body.appendChild(rowContainer);
  });
}

export const renderGameOver = () => document.body.innerHTML += '<br/>GAME OVER!';