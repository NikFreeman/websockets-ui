import { CellState } from 'ws_server/models/board';
import { Position } from './../models/ships';

export function getAroundKilledShip(
  position: Position,
  realBoard: number[][],
): Set<Position> {
  const board = JSON.parse(JSON.stringify(realBoard));
  const result = new Set<Position>();
  const { x, y } = position;

  board[y][x] = -1;
  if (y > 0) {
    if (board![y - 1]![x] == CellState.EMPTY) {
      result.add({ x: x, y: y - 1 });
      board![y - 1]![x] = CellState.MISSED;
    }
    if (x > 0) {
      if (board![y - 1]![x - 1] == CellState.EMPTY) {
        result.add({ x: x - 1, y: y - 1 });
        board![y - 1]![x - 1] = CellState.MISSED;
      }
    }
    if (x < 9) {
      if (board![y - 1]![x + 1] == CellState.EMPTY) {
        result.add({ x: x + 1, y: y - 1 });
        board![y - 1]![x + 1] = CellState.MISSED;
      }
    }
  }
  if (y < 9) {
    if (board![y + 1]![x] == CellState.EMPTY) {
      result.add({ x: x, y: y + 1 });
      board![y + 1]![x] = CellState.MISSED;
    }
    if (x > 0) {
      if (board![y + 1]![x - 1] == CellState.EMPTY) {
        result.add({ x: x - 1, y: y + 1 });
        board![y + 1]![x - 1] = CellState.MISSED;
      }
    }
    if (x < 9) {
      if (board![y + 1]![x + 1] == CellState.EMPTY) {
        result.add({ x: x + 1, y: y + 1 });
        board![y + 1]![x + 1] = CellState.MISSED;
      }
    }
  }
  if (x > 0) {
    if (board![y]![x - 1] == CellState.EMPTY) {
      result.add({ x: x - 1, y: y });
      board![y]![x - 1] = CellState.MISSED;
    }
  }
  if (x < 9) {
    if (board![y]![x + 1] == CellState.EMPTY) {
      result.add({ x: x + 1, y: y });
      board![y]![x + 1] = CellState.MISSED;
    }
  }
  if (x > 0) {
    if (board![y - 1]![x] == CellState.SHOTED) {
      getAroundKilledShip({ x: x, y: y - 1 }, board!).forEach((pos) =>
        result.add(pos),
      );
    }
  }
  if (x < 9) {
    if (board![y]![x + 1] == CellState.SHOTED) {
      getAroundKilledShip({ x: x + 1, y: y }, board!).forEach((pos) =>
        result.add(pos),
      );
    }
  }
  if (y < 9) {
    if (board![y + 1]![x] == CellState.SHOTED) {
      getAroundKilledShip({ x: x, y: y + 1 }, board!).forEach((pos) =>
        result.add(pos),
      );
    }
  }
  if (x > 0) {
    if (board![y]![x - 1] == 2) {
      getAroundKilledShip({ x: x - 1, y: y }, board!).forEach((pos) =>
        result.add(pos),
      );
    }
  }
  return result;
}
