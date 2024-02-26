import { checkKilled } from './checkKilled';
import { Position } from 'ws_server/models/ships';

describe('checkKilled function', () => {
  const boardTrue = [
    [2, 2, 2, 0, 2, 2, 2, 2, 0, 2],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 2, 2, 0, 0, 2, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 2, 0, 2],
    [0, 2, 0, 0, 0, 0, 0, 2, 0, 2],
    [0, 2, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 2, 0, 0],
    [2, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 2, 2, 0, 2, 0, 0, 0, 0],
  ];
  type TestCase = { position: Position; board: number[][]; expected: boolean };
  const testTrue: TestCase[] = [
    { position: { x: 0, y: 0 }, board: boardTrue, expected: true },
    { position: { x: 1, y: 0 }, board: boardTrue, expected: true },
    { position: { x: 2, y: 0 }, board: boardTrue, expected: true },
    { position: { x: 9, y: 0 }, board: boardTrue, expected: true },
    { position: { x: 4, y: 0 }, board: boardTrue, expected: true },
    { position: { x: 5, y: 0 }, board: boardTrue, expected: true },
    { position: { x: 6, y: 0 }, board: boardTrue, expected: true },
    { position: { x: 7, y: 0 }, board: boardTrue, expected: true },
    { position: { x: 1, y: 2 }, board: boardTrue, expected: true },
    { position: { x: 1, y: 3 }, board: boardTrue, expected: true },
    { position: { x: 1, y: 4 }, board: boardTrue, expected: true },
    { position: { x: 3, y: 2 }, board: boardTrue, expected: true },
    { position: { x: 4, y: 2 }, board: boardTrue, expected: true },
    { position: { x: 7, y: 2 }, board: boardTrue, expected: true },
    { position: { x: 7, y: 3 }, board: boardTrue, expected: true },
    { position: { x: 7, y: 4 }, board: boardTrue, expected: true },
    { position: { x: 9, y: 3 }, board: boardTrue, expected: true },
    { position: { x: 9, y: 4 }, board: boardTrue, expected: true },
    { position: { x: 5, y: 5 }, board: boardTrue, expected: true },
    { position: { x: 0, y: 7 }, board: boardTrue, expected: true },
    { position: { x: 0, y: 8 }, board: boardTrue, expected: true },
    { position: { x: 9, y: 2 }, board: boardTrue, expected: true },
    { position: { x: 9, y: 3 }, board: boardTrue, expected: true },
    { position: { x: 8, y: 5 }, board: boardTrue, expected: true },
    { position: { x: 9, y: 5 }, board: boardTrue, expected: true },
  ];
  const boardFalse = [
    [2, 2, 2, 1, 0, 2, 0, 2, 0, 1],
    [0, 0, 0, 0, 0, 2, 0, 1, 0, 2],
    [2, 2, 1, 2, 0, 1, 0, 2, 0, 2],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 1, 2, 2, 0, 0, 2, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 2],
    [0, 1, 2, 2, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 1, 0, 0],
    [0, 1, 2, 1, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 2],
  ];
  const testFalse: TestCase[] = [
    { position: { x: 0, y: 0 }, board: boardFalse, expected: false },
    { position: { x: 1, y: 0 }, board: boardFalse, expected: false },
    { position: { x: 2, y: 0 }, board: boardFalse, expected: false },
    { position: { x: 5, y: 0 }, board: boardFalse, expected: false },
    { position: { x: 5, y: 1 }, board: boardFalse, expected: false },
    { position: { x: 9, y: 1 }, board: boardFalse, expected: false },
    { position: { x: 0, y: 2 }, board: boardFalse, expected: false },
    { position: { x: 1, y: 2 }, board: boardFalse, expected: false },
    { position: { x: 3, y: 2 }, board: boardFalse, expected: false },
    { position: { x: 7, y: 2 }, board: boardFalse, expected: false },
    { position: { x: 9, y: 2 }, board: boardFalse, expected: false },
    { position: { x: 1, y: 4 }, board: boardFalse, expected: false },
    { position: { x: 3, y: 4 }, board: boardFalse, expected: false },
    { position: { x: 4, y: 4 }, board: boardFalse, expected: false },
    { position: { x: 7, y: 4 }, board: boardFalse, expected: false },
    { position: { x: 9, y: 5 }, board: boardFalse, expected: false },
    { position: { x: 2, y: 6 }, board: boardFalse, expected: false },
    { position: { x: 3, y: 6 }, board: boardFalse, expected: false },
    { position: { x: 4, y: 6 }, board: boardFalse, expected: false },
    { position: { x: 6, y: 7 }, board: boardFalse, expected: false },
    { position: { x: 2, y: 8 }, board: boardFalse, expected: false },
    { position: { x: 3, y: 8 }, board: boardFalse, expected: false },
    { position: { x: 9, y: 9 }, board: boardFalse, expected: false },
  ];
  test.each(testTrue)(
    'should return true if ship is killed ',
    ({ position, board, expected }) => {
      expect(checkKilled(position, board)).toBe(expected);
    },
  );
  test.each(testFalse)(
    'should return false if ship is not killed ',
    ({ position, board, expected }) => {
      expect(checkKilled(position, board)).toBe(expected);
    },
  );
});
