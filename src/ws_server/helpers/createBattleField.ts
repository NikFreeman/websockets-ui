import { CellState } from 'ws_server/models/board';

export function createBattleField(
  rows: number = 10,
  cols: number = 10,
): number[][] {
  const zeroArray = new Array<number>(rows)
    .fill(CellState.EMPTY)
    .map(() => new Array<number>(cols).fill(CellState.EMPTY));
  return zeroArray;
}
