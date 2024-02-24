import { CellState } from 'ws_server/models/board';

export function countCellState(
  cellState: CellState[],
  board: number[][],
): number {
  let result = 0;
  board.forEach((row) => {
    row.forEach((cell) => {
      if (cellState.includes(cell)) result = result + 1;
    });
  });
  return result;
}
