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
/**
 * From a starting point, this function pings it's directions until it
 * hits the boundaries or it encounters a square not similar to it's
 * starting point
 * @param lastMove
 * @param game
 * @param getIncreasePosition
 * @param getDecreasePosition
 * @returns
 */
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
export const boardFilled = (game: Game) => {
  const filled = game.map((row) => row.every((space) => space !== undefined));
  return filled.every((row) => row);
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
      {
        key: 'horizontal',
        up: getLeftCoordinates,
        down: getRightCoordinates,
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
    const winnerExists = Object.values(result.coordinates).some(
      (val) => val !== undefined
    );
    if (winnerExists) {
      return result;
    } else {
      const catsGame = boardFilled(game);
      return catsGame ? -1 : undefined;
    }
  } else {
    return undefined;
  }
};
