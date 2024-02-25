import { CellState } from 'ws_server/models/board';
import { Position } from 'ws_server/models/ships';

export function checkKilled(
  position: Position,
  realBoard: number[][],
): boolean {
  const board = JSON.parse(JSON.stringify(realBoard));
  const { x, y } = position;
  board[y][x] = -1;
  console.table(board);
  if (y > 0) {
    if (board![y - 1]![x] == CellState.DESK) {
      return false;
    } else if (board![y - 1]![x] == CellState.SHOTED)
      if (!checkKilled({ x: x, y: y - 1 }, board!)) return false;
  }
  if (x < 9) {
    if (board![y]![x + 1] == CellState.DESK) {
      return false;
    } else if (board![y]![x + 1] == CellState.SHOTED)
      if (!checkKilled({ x: x + 1, y: y }, board!)) return false;
  }
  if (y < 9) {
    if (board![y + 1]![x] == CellState.DESK) {
      return false;
    } else if (board![y + 1]![x] == CellState.SHOTED)
      if (!checkKilled({ x: x, y: y + 1 }, board!)) return false;
  }
  if (x > 0) {
    if (board![y]![x - 1] == CellState.DESK) {
      return false;
    } else if (board![y]![x - 1] == CellState.SHOTED)
      if (!checkKilled({ x: x - 1, y: y }, board!)) return false;
  }
  return true;
}
