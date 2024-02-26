import { CellState } from 'ws_server/models/board';

export function resolvePos(
  random: number,
  cellState: CellState[],
  board: number[][],
) {
  let x = 0;
  let y = 0;
  board.forEach((row, indexRow) =>
    row.forEach((cell, indexCell) => {
      if (cellState.includes(cell)) {
        random = random - 1;
        if (random == 0) {
          (y = indexRow), (x = indexCell);
        }
      }
    }),
  );
  return { x, y };
}
