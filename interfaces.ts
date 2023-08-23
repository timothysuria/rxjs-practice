export interface State {
  game: number[][];
  x: number;
  y: number;
  score: number;
}

export interface Key {
  code: string;
}

export type Brick = number[][];