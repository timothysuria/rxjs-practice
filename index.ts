import { fromEvent, of, interval, combineLatest } from 'rxjs';
import { finalize, map, pluck, scan, startWith, takeWhile, tap } from 'rxjs/operators';
import { score, randomBrick, clearGame, initialState } from './game';
import { render, renderGameOver } from './html-renderer';
import { handleKeyPress, resetKey } from './keyboard';
import { collide } from './collision';
import { rotate } from './rotation';
import { BRICK } from './constants';
import { State, Brick, Key } from './interfaces';

const player$ = combineLatest(
  of(randomBrick()),
  of({ code: '' }),
  fromEvent(document, 'keyup').pipe(startWith({ code: undefined }), pluck('code'))
).pipe(
  map(([brick, key, keyCode]: [Brick, Key, string]) => (key.code = keyCode, [brick, key]))
);

const state$ = interval(1000)
  .pipe(
    scan<number, State>((state, _) => (state.x++ , state), initialState)
  );

const game$ = combineLatest(state$, player$)
  .pipe(
    scan<[State, [Brick, Key]], [State, [Brick, Key]]>(
      ([state, [brick, key]]) => (
        state = handleKeyPress(state, brick, key),
        (([newState, rotatedBrick]: [State, Brick]) => (
          state = newState,
          brick = rotatedBrick
        ))(rotate(state, brick, key)),
        (([newState, collidedBrick]: [State, Brick]) => (
          state = newState,
          brick = collidedBrick
        ))(collide(state, brick)),
        state = score(state),
        resetKey(key),
        [state, [brick, key]]
      )),
    tap(([state, [brick, key]]) => render(state, brick)),
    takeWhile(([state, [brick, key]]) => !state.game[1].some(c => c === BRICK)),
    finalize(renderGameOver)
  );
  
game$.subscribe();