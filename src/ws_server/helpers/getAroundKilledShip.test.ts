import { getAroundKilledShip } from './getAroundKilledShip';

describe('getAroundKilledShip function', () => {
  test('should return the correct set of positions around a killed ship', () => {
    const position = { x: 3, y: 3 };
    const realBoard = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    const result = getAroundKilledShip(position, realBoard);
    expect(result.size).toBe(8);
    expect(result.has({ x: 3, y: 2 })).toBe(true);
    expect(result.has({ x: 2, y: 3 })).toBe(true);
    expect(result.has({ x: 4, y: 3 })).toBe(true);
    expect(result.has({ x: 3, y: 4 })).toBe(true);
  });

  test('should handle edge cases correctly', () => {});
});
