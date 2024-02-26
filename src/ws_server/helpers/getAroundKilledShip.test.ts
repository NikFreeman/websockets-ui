import { Position } from 'ws_server/models/ships';
import { getAroundKilledShip } from './getAroundKilledShip';

describe('getAroundKilledShip function', () => {
  const board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 2, 2, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 2, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 2, 0, 0, 0, 3, 3, 3, 0],
    [0, 0, 0, 0, 0, 0, 3, 2, 3, 0],
    [0, 2, 0, 0, 0, 0, 3, 3, 3, 0],
    [0, 0, 0, 3, 3, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 2, 0, 0, 0, 0, 0],
  ];
  type TestCase = { position: Position; board: number[][]; expected: number };
  const testCase: TestCase[] = [
    { position: { x: 1, y: 1 }, board: board, expected: 14 },
    { position: { x: 2, y: 1 }, board: board, expected: 14 },
    { position: { x: 3, y: 1 }, board: board, expected: 14 },
    { position: { x: 4, y: 1 }, board: board, expected: 14 },
    { position: { x: 1, y: 3 }, board: board, expected: 12 },
    { position: { x: 2, y: 3 }, board: board, expected: 12 },
    { position: { x: 3, y: 3 }, board: board, expected: 12 },
    { position: { x: 1, y: 5 }, board: board, expected: 10 },
    { position: { x: 2, y: 5 }, board: board, expected: 10 },
    { position: { x: 1, y: 7 }, board: board, expected: 8 },
    { position: { x: 7, y: 6 }, board: board, expected: 0 },
    { position: { x: 3, y: 9 }, board: board, expected: 4 },
    { position: { x: 4, y: 9 }, board: board, expected: 4 },
  ];
  test.each(testCase)(
    'should return the correct set of positions around a killed ship',
    ({ position, board, expected }) => {
      const result = getAroundKilledShip(position, board);
      expect(result.size).toBe(expected);
    },
  );

  test('should handle edge cases correctly', () => {
    const position = { x: 4, y: 9 };
    const compare = new Set<string>();
    const result = getAroundKilledShip(position, board);
    result.forEach((elem) => compare.add(JSON.stringify(elem)));

    expect(compare.has(JSON.stringify({ x: 2, y: 8 }))).toEqual(true);
    expect(compare.has(JSON.stringify({ x: 2, y: 9 }))).toEqual(true);
    expect(compare.has(JSON.stringify({ x: 5, y: 8 }))).toEqual(true);
    expect(compare.has(JSON.stringify({ x: 5, y: 9 }))).toEqual(true);
  });
});
