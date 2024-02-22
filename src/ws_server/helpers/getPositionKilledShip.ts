import { CellState } from 'ws_server/models/board';
import { Position } from './../models/ships';

export function getPositionKilledShip(
  position: Position,
  realBoard: number[][],
): Set<Position> {
  const board = JSON.parse(JSON.stringify(realBoard));
  const result = new Set<Position>();
  const { x, y } = position;
  result.add({ x, y });
  board[y][x] = -1;
  if (y > 0) {
    if (board![y - 1]![x] == CellState.SHOTED) {
      getPositionKilledShip({ x: x, y: y - 1 }, board!).forEach((pos) =>
        result.add(pos),
      );
    }
  }
  if (x < 9) {
    if (board![y]![x + 1] == CellState.SHOTED) {
      getPositionKilledShip({ x: x + 1, y: y }, board!).forEach((pos) =>
        result.add(pos),
      );
    }
  }
  if (y < 9) {
    if (board![y + 1]![x] == CellState.SHOTED) {
      getPositionKilledShip({ x: x, y: y + 1 }, board!).forEach((pos) =>
        result.add(pos),
      );
    }
  }
  if (x > 0) {
    if (board![y]![x - 1] == CellState.SHOTED) {
      getPositionKilledShip({ x: x - 1, y: y }, board!).forEach((pos) =>
        result.add(pos),
      );
    }
  }
  return result;
}
