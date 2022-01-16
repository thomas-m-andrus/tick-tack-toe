import { Player, Game, Row } from '@tick-tack-toe/types';
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
  describe('Winning Combinations', () => {
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
              [Player.ONE, undefined, undefined],
              [Player.ONE, undefined, undefined],
              [Player.ONE, undefined, undefined],
            ]
          )
        ).toEqual({
          player: Player.ONE,
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
        expect(
          checkWin(
            [y, x],
            [
              [Player.ONE, undefined, undefined],
              [undefined, Player.ONE, undefined],
              [undefined, undefined, Player.ONE],
            ]
          )
        ).toEqual({
          player: Player.ONE,
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
        expect(
          checkWin(
            [y, x],
            [
              [undefined, undefined, Player.ONE],
              [undefined, Player.ONE, undefined],
              [Player.ONE, undefined, undefined],
            ]
          )
        ).toEqual({
          player: Player.ONE,
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
    it.each([
      [1, 0],
      [1, 1],
      [1, 2],
    ])(
      'should return player winning horizontally going up and coordinates when winning game passed in with [%s,%s] as last move.',
      (y, x) => {
        expect(
          checkWin(
            [y, x],
            [
              [undefined, undefined, undefined],
              [Player.ONE, Player.ONE, Player.ONE],
              [undefined, undefined, undefined],
            ]
          )
        ).toEqual({
          player: Player.ONE,
          coordinates: {
            toBottomRight: undefined,
            horizontal: [
              [1, 0],
              [1, 1],
              [1, 2],
            ],
            vertical: undefined,
            toTopRight: undefined,
          },
        });
      }
    );
  });
  const everySpace = [0, 1, 2].reduce((acc, row) => {
    const batch = [0, 1, 2].map((col) => {
      return [row, col];
    });
    return [...acc, ...batch];
  }, []);
  describe('On going Combinations', () => {
    it.each(everySpace)(
      'should return undefined when the last move is [%s,%s] and all the spaces are undefined',
      (row, col) => {
        const emptyRow: Row = new Array(3).fill(undefined) as Row;
        const game: Game = new Array(3).fill(emptyRow) as Game;
        expect(checkWin([row, col], game)).toBe(undefined);
      }
    );
    it('should return undefined when board is surrounded by the other player and undefineds.', () => {
      const game: Game = [
        [undefined, Player.TWO, undefined],
        [Player.TWO, Player.ONE, Player.TWO],
        [undefined, Player.TWO, undefined],
      ];
      expect(checkWin([1, 1], game)).toBe(undefined);
    });
  });
  describe('Draw Scenario', () => {
    it.each(everySpace)(
      'should return -1 if all squares are filled with no winner and last square was [%s,%s]',
      (row, col) => {
        const game: Game = [
          [Player.TWO, Player.TWO, Player.ONE],
          [Player.ONE, Player.ONE, Player.TWO],
          [Player.TWO, Player.ONE, Player.ONE],
        ];
        expect(checkWin([row, col], game)).toBe(-1);
      }
    );
  });
});
