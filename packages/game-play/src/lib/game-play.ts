import { Game } from '@tick-tack-toe/types';

export const getTopLeftCoordinates = (move: [number, number]) => {
  return [move[0] - 1, move[1] - 1];
};
export const getBottomRightCoordinates = (move: [number, number]) => {
  return [move[0] + 1, move[1] + 1];
};
export const getTopRightCoordinates = (move: [number, number]) => {
  return [move[0] - 1, move[1] + 1];
};
export const getBottomLeftCoordinates = (move: [number, number]) => {
  return [move[0] + 1, move[1] - 1];
};
export const getLeftCoordinates = (move: [number, number]) => {
  return [move[0], move[1] - 1];
};
export const getRightCoordinates = (move: [number, number]) => {
  return [move[0], move[1] + 1];
};
export const getTopCoordinates = (move: [number, number]) => {
  return [move[0] - 1, move[1]];
};
export const getBottomCoordinates = (move: [number, number]) => {
  return [move[0] + 1, move[1]];
};
export const checkWin = (lastMove: [number, number], game: Game) => {};
