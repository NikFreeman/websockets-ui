import { Position } from './../models/ships';
import { getPositionKilledShip } from './getPositionKilledShip';

describe('getPositionKilledShip', () => {
  const realBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 2, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 2, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
    [0, 0, 0, 0, 0, 2, 0, 0, 2, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 2, 0, 0, 2, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 2, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 2, 0, 0, 0],
  ];
  type TestCase = { position: Position; board: number[][]; expected: number };
  const testCases: TestCase[] = [
    { position: { x: 5, y: 5 }, board: realBoard, expected: 1 },
    { position: { x: 8, y: 4 }, board: realBoard, expected: 2 },
    { position: { x: 8, y: 5 }, board: realBoard, expected: 2 },
    { position: { x: 0, y: 1 }, board: realBoard, expected: 3 },
    { position: { x: 1, y: 1 }, board: realBoard, expected: 3 },
    { position: { x: 2, y: 1 }, board: realBoard, expected: 3 },
    { position: { x: 2, y: 3 }, board: realBoard, expected: 4 },
    { position: { x: 3, y: 3 }, board: realBoard, expected: 4 },
    { position: { x: 4, y: 3 }, board: realBoard, expected: 4 },
    { position: { x: 5, y: 3 }, board: realBoard, expected: 4 },
    { position: { x: 3, y: 6 }, board: realBoard, expected: 4 },
    { position: { x: 3, y: 7 }, board: realBoard, expected: 4 },
    { position: { x: 3, y: 8 }, board: realBoard, expected: 4 },
    { position: { x: 3, y: 9 }, board: realBoard, expected: 4 },
  ];
  test.each(testCases)(
    'should return a set of positions whose length is equal to the length of the killed ship ',
    ({ position, board, expected }) => {
      const result = getPositionKilledShip(position, board);
      expect(result.size).toBe(expected);
    },
  );
  test('should return a set of positions for a killed ship', () => {
    const position = { x: 2, y: 3 };
    const compare = new Set<string>();
    const result = getPositionKilledShip(position, realBoard);
    result.forEach((elem) => compare.add(JSON.stringify(elem)));

    expect(compare.has(JSON.stringify({ x: 2, y: 3 }))).toEqual(true);
    expect(compare.has(JSON.stringify({ x: 3, y: 3 }))).toEqual(true);
    expect(compare.has(JSON.stringify({ x: 4, y: 3 }))).toEqual(true);
    expect(compare.has(JSON.stringify({ x: 5, y: 3 }))).toEqual(true);
  });
});
