import { Game, Coordinate } from '@tick-tack-toe/types';

export const getTopLeftCoordinates = (move: Coordinate): Coordinate => {
  return [move[0] - 1, move[1] - 1];
};
export const getBottomRightCoordinates = (move: Coordinate): Coordinate => {
  return [move[0] + 1, move[1] + 1];
};
export const getTopRightCoordinates = (move: Coordinate): Coordinate => {
  return [move[0] - 1, move[1] + 1];
};
export const getBottomLeftCoordinates = (move: Coordinate): Coordinate => {
  return [move[0] + 1, move[1] - 1];
};
export const getLeftCoordinates = (move: Coordinate): Coordinate => {
  return [move[0], move[1] - 1];
};
export const getRightCoordinates = (move: Coordinate): Coordinate => {
  return [move[0], move[1] + 1];
};
export const getTopCoordinates = (move: Coordinate): Coordinate => {
  return [move[0] - 1, move[1]];
};
export const getBottomCoordinates = (move: Coordinate): Coordinate => {
  return [move[0] + 1, move[1]];
};
export const pingCollection = (
  lastMove: Coordinate,
  game: Game,
  getIncreasePosition: (move: Coordinate) => Coordinate,
  getDecreasePosition: (move: Coordinate) => Coordinate
) => {
  const [row, col] = lastMove;
  const player = game[row][col];
  const ping = [lastMove];
  let up = getIncreasePosition(lastMove);
  let down = getDecreasePosition(lastMove);
  const keepGoing = (next: [number, number]) =>
    !next.includes(-1) &&
    !next.includes(3) &&
    game[next[0]][next[1]] === player;
  let keepGoingUp = keepGoing(up);
  let keepGoingDown = keepGoing(down);
  while (keepGoingUp || keepGoingDown) {
    if (keepGoingUp) {
      ping.unshift(up);
      up = getIncreasePosition(up);
      keepGoingUp = keepGoing(up);
    }
    if (keepGoingDown) {
      ping.push(down);
      down = getDecreasePosition(down);
      keepGoingDown = keepGoing(down);
    }
  }
  return ping;
};
export const checkWin = (lastMove: Coordinate, game: Game) => {
  const [row, col] = lastMove;
  const player = game[row][col];
  if (player) {
    const result = [
      { key: 'vertical', up: getTopCoordinates, down: getBottomCoordinates },
      {
        key: 'toBottomRight',
        up: getTopLeftCoordinates,
        down: getBottomRightCoordinates,
      },
      {
        key: 'toTopRight',
        up: getTopRightCoordinates,
        down: getBottomLeftCoordinates,
      },
    ].reduce(
      (acc, { key, up, down }) => {
        const possibleAddition = pingCollection(lastMove, game, up, down);
        return {
          ...acc,
          coordinates: {
            ...acc.coordinates,
            [key]: possibleAddition.length === 3 ? possibleAddition : undefined,
          },
        };
      },
      { player, coordinates: {} }
    );
    return result;
  } else {
    return undefined;
  }
};
