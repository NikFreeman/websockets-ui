import { CellState } from 'ws_server/models/board';
import { Position } from 'ws_server/models/ships';

export function checkKilled(
  position: Position,
  realBoard: number[][],
): boolean {
  const board = JSON.parse(JSON.stringify(realBoard));
  let killed = true;
  const { x, y } = position;
  board[y][x] = -1;
  if (y > 0) {
    if (board![y - 1]![x] == CellState.DESK) {
      return false;
    } else if (board![y - 1]![x] == CellState.SHOTED)
      killed = checkKilled({ x: x, y: y - 1 }, board!);
  }
  if (x < 9) {
    if (board![y]![x + 1] == CellState.DESK) {
      return false;
    } else if (board![y]![x + 1] == CellState.SHOTED)
      killed = checkKilled({ x: x + 1, y: y }, board!);
  }
  if (y < 9) {
    if (board![y + 1]![x] == CellState.DESK) {
      return false;
    } else if (board![y + 1]![x] == CellState.SHOTED)
      killed = checkKilled({ x: x, y: y + 1 }, board!);
  }
  if (x > 0) {
    if (board![y]![x - 1] == CellState.DESK) {
      return false;
    } else if (board![y]![x - 1] == CellState.SHOTED)
      killed = checkKilled({ x: x - 1, y: y }, board!);
  }
  return killed;
}
