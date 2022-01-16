import { Player } from '@tick-tack-toe/types';
import {
  checkWin,
  getTopLeftCoordinates,
  getBottomRightCoordinates,
  getTopRightCoordinates,
  getBottomLeftCoordinates,
  getLeftCoordinates,
  getRightCoordinates,
  getTopCoordinates,
  getBottomCoordinates,
} from './game-play';

/**
 * [-1,-1]|[-1,0]|[-1,1]
 * [0,-1] |[0,0] |[0,1]
 * [1,-1] |[1,0] |[1,1]
 */
describe('Coordinate Functions', () => {
  describe('getTopLeftCoordinates', () => {
    it.each([
      [
        [0, 0],
        [-1, -1],
      ],
      [
        [1, 1],
        [0, 0],
      ],
      [
        [2, 2],
        [1, 1],
      ],
    ])('should return %s when input is %s', (input, expected) => {
      expect(getTopLeftCoordinates(input as [number, number])).toEqual(
        expected
      );
    });
  });
  describe('getBottomRightCoordinates', () => {
    it.each([
      [
        [0, 0],
        [1, 1],
      ],
      [
        [1, 1],
        [2, 2],
      ],
      [
        [2, 2],
        [3, 3],
      ],
    ])('should return %s when input is %s', (input, expected) => {
      expect(getBottomRightCoordinates(input as [number, number])).toEqual(
        expected
      );
    });
  });
  describe('getTopRightCoordinates', () => {
    it.each([
      [
        [0, 0],
        [-1, 1],
      ],
      [
        [1, 1],
        [0, 2],
      ],
      [
        [2, 2],
        [1, 3],
      ],
    ])('should return %s when input is %s', (input, expected) => {
      expect(getTopRightCoordinates(input as [number, number])).toEqual(
        expected
      );
    });
  });
  describe('getBottomLeftCoordinates', () => {
    it.each([
      [
        [0, 0],
        [1, -1],
      ],
      [
        [1, 1],
        [2, 0],
      ],
      [
        [2, 2],
        [3, 1],
      ],
    ])('should return %s when input is %s', (input, expected) => {
      expect(getBottomLeftCoordinates(input as [number, number])).toEqual(
        expected
      );
    });
  });
  describe('getLeftCoordinates', () => {
    it.each([
      [
        [0, 0],
        [0, -1],
      ],
      [
        [1, 1],
        [1, 0],
      ],
      [
        [2, 2],
        [2, 1],
      ],
    ])('should return %s when input is %s', (input, expected) => {
      expect(getLeftCoordinates(input as [number, number])).toEqual(expected);
    });
  });
  describe('getRightCoordinates', () => {
    it.each([
      [
        [0, 0],
        [0, 1],
      ],
      [
        [1, 1],
        [1, 2],
      ],
      [
        [2, 2],
        [2, 3],
      ],
    ])('should return %s when input is %s', (input, expected) => {
      expect(getRightCoordinates(input as [number, number])).toEqual(expected);
    });
  });
  describe('getTopCoordinates', () => {
    it.each([
      [
        [0, 0],
        [-1, 0],
      ],
      [
        [1, 1],
        [0, 1],
      ],
      [
        [2, 2],
        [1, 2],
      ],
    ])('should return %s when input is %s', (input, expected) => {
      expect(getTopCoordinates(input as [number, number])).toEqual(expected);
    });
  });
  describe('getBottomCoordinates', () => {
    it.each([
      [
        [0, 0],
        [1, 0],
      ],
      [
        [1, 1],
        [2, 1],
      ],
      [
        [2, 2],
        [3, 2],
      ],
    ])('should return %s when input is %s', (input, expected) => {
      expect(getBottomCoordinates(input as [number, number])).toEqual(expected);
    });
  });
});
describe('checkWin', () => {
  it.each([
    [0, 0],
    [1, 0],
    [2, 0],
  ])(
    'should return player winning vertical and coordinates when winning game passed in with [%s,%s] as last move.',
    (y, x) => {
      expect(
        checkWin(
          [y, x],
          [
            [Player.PLAYER_ONE, undefined, undefined],
            [Player.PLAYER_ONE, undefined, undefined],
            [Player.PLAYER_ONE, undefined, undefined],
          ]
        )
      ).toEqual({
        player: Player.PLAYER_ONE,
        coordinates: {
          vertical: [
            [0, 0],
            [1, 0],
            [2, 0],
          ],
          horizontal: undefined,
          toBottomRight: undefined,
          toTopRight: undefined,
        },
      });
    }
  );
  it.each([
    [0, 0],
    [1, 1],
    [2, 2],
  ])(
    'should return player winning diagonally going down and coordinates when winning game passed in with [%s,%s] as last move.',
    (y, x) => {
      console.log(`I am running with [${y},${x}]`);
      expect(
        checkWin(
          [y, x],
          [
            [Player.PLAYER_ONE, undefined, undefined],
            [undefined, Player.PLAYER_ONE, undefined],
            [undefined, undefined, Player.PLAYER_ONE],
          ]
        )
      ).toEqual({
        player: Player.PLAYER_ONE,
        coordinates: {
          toBottomRight: [
            [0, 0],
            [1, 1],
            [2, 2],
          ],
          horizontal: undefined,
          vertical: undefined,
          toTopRight: undefined,
        },
      });
    }
  );
  it.each([
    [0, 2],
    [1, 1],
    [2, 0],
  ])(
    'should return player winning diagonally going up and coordinates when winning game passed in with [%s,%s] as last move.',
    (y, x) => {
      console.log(`I am running with [${y},${x}]`);
      expect(
        checkWin(
          [y, x],
          [
            [undefined, undefined, Player.PLAYER_ONE],
            [undefined, Player.PLAYER_ONE, undefined],
            [Player.PLAYER_ONE, undefined, undefined],
          ]
        )
      ).toEqual({
        player: Player.PLAYER_ONE,
        coordinates: {
          toBottomRight: undefined,
          horizontal: undefined,
          vertical: undefined,
          toTopRight: [
            [0, 2],
            [1, 1],
            [2, 0],
          ],
        },
      });
    }
  );
});
