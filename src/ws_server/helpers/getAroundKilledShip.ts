import { CellState } from 'ws_server/models/board';
import { Position } from './../models/ships';

export function getAroundKilledShip(
  position: Position,
  realBoard: number[][],
): Set<Position> {
  function updateEmpty(x: number, y: number) {
    if (board![y]![x] == CellState.EMPTY) {
      result.add({ x: x, y: y });
      board![y]![x] = CellState.MISSED;
    }
  }
  function checkShoted(x: number, y: number) {
    if (board![y]![x] == CellState.SHOTED) {
      getAroundKilledShip({ x: x, y: y }, board!).forEach((pos) =>
        result.add(pos),
      );
    }
  }

  const board = JSON.parse(JSON.stringify(realBoard));
  const result = new Set<Position>();
  const { x, y } = position;

  board[y][x] = -1;

  if (y > 0) {
    updateEmpty(x, y - 1);
    if (x > 0) {
      updateEmpty(x - 1, y - 1);
    }
    if (x < 9) {
      updateEmpty(x + 1, y - 1);
    }
  }
  if (y < 9) {
    updateEmpty(x, y + 1);
    if (x > 0) {
      updateEmpty(x - 1, y + 1);
    }
    if (x < 9) {
      updateEmpty(x + 1, y + 1);
    }
  }
  if (x > 0) {
    updateEmpty(x - 1, y);
  }
  if (x < 9) {
    updateEmpty(x + 1, y);
  }
  if (y > 0) {
    checkShoted(x, y - 1);
  }
  if (x < 9) {
    checkShoted(x + 1, y);
  }
  if (y < 9) {
    checkShoted(x, y + 1);
  }
  if (x > 0) {
    checkShoted(x - 1, y);
  }
  return result;
}
