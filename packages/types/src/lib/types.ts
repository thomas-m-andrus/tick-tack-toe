export enum Player {
  PLAYER_ONE = 1,
  PLAYER_TWO = 2,
}
export type Space = Player | undefined;
export type Row = [Space, Space, Space];
export type Game = [Row, Row, Row];
