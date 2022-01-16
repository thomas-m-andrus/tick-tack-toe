export enum Player {
  ONE = 1,
  TWO = 2,
}
export type Space = Player | undefined;
export type Row = [Space, Space, Space];
export type Game = [Row, Row, Row];
export type Coordinate = [number, number];
