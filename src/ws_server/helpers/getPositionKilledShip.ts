import { CellState } from 'ws_server/models/board';
import { Position } from './../models/ships';

export function getPositionKilledShip(
  position: Position,
  realBoard: number[][],
): Set<Position> {
  function updatePosKilledShip(x: number, y: number) {
    if (board![y]![x] == CellState.SHOTED) {
      getPositionKilledShip({ x: x, y: y }, board!).forEach((pos) =>
        result.add(pos),
      );
    }
  }
  const board = JSON.parse(JSON.stringify(realBoard));
  const result = new Set<Position>();
  const { x, y } = position;
  result.add({ x, y });
  board[y][x] = -1;
  if (y > 0) {
    updatePosKilledShip(x, y - 1);
  }
  if (x < 9) {
    updatePosKilledShip(x + 1, y);
  }
  if (y < 9) {
    updatePosKilledShip(x, y + 1);
  }
  if (x > 0) {
    updatePosKilledShip(x - 1, y);
  }
  return result;
}
