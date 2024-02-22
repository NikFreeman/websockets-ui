export function createBattleField(
  rows: number = 10,
  cols: number = 10,
): number[][] {
  const zeroArray = new Array<number>(rows)
    .fill(-1)
    .map(() => new Array<number>(cols).fill(0));
  return zeroArray;
}
