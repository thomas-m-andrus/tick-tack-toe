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
    expect(getTopLeftCoordinates(input as [number, number])).toEqual(expected);
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
  ])('should %s when input is %s', (input, expected) => {
    expect(getTopRightCoordinates(input as [number, number])).toEqual(expected);
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
  ])('should %s when input is %s', (input, expected) => {
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
  ])('should %s when input is %s', (input, expected) => {
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
  ])('should %s when input is %s', (input, expected) => {
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
  ])('should %s when input is %s', (input, expected) => {
    expect(getTopCoordinates(input as [number, number])).toEqual(expected);
  });
});
describe('getTopCoordinates', () => {
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
  ])('should %s when input is %s', (input, expected) => {
    expect(getBottomCoordinates(input as [number, number])).toEqual(expected);
  });
});
describe('checkWin', () => {
  it('should return player winning and coordinates when winning game passed in.', () => {
    expect(
      checkWin(
        [0, 0],
        [
          [Player.PLAYER_ONE, undefined, undefined],
          [Player.PLAYER_ONE, undefined, undefined],
          [Player.PLAYER_ONE, undefined, undefined],
        ]
      )
    ).toEqual({
      player: Player.PLAYER_ONE,
      corrdinates: {
        vertical: [
          [0, 0],
          [0, 1],
          [0, 2],
        ],
        horizontal: undefined,
        rightDown: undefined,
        rightUp: undefined,
      },
    });
  });
});
