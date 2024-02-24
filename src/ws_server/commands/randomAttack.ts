import { countCellState } from 'ws_server/helpers/countCellState';
import { resolvePos } from 'ws_server/helpers/resolvePos';
import { CellState } from 'ws_server/models/board';
import { games } from 'ws_server/store';
import { randomNumber } from 'ws_server/helpers/randomNumber';
import { attack } from './attack';

export function randomAttack(data: string) {
  const { gameId, indexPlayer } = JSON.parse(data);
  const indexGame = games.findIndex((elem) => elem.id === gameId);
  if (indexGame == -1) throw new Error('not Game');
  if (games[indexGame]?.currentPlayer == indexPlayer) {
    const indexRival = games[indexGame]!.rivals.findIndex(
      (elem) => elem.player.id != indexPlayer,
    );
    if (indexRival == -1) throw new Error('not Rival');
    const board = games[indexGame]?.rivals[indexRival]?.battleField;
    const countEmpty = countCellState(
      [CellState.EMPTY, CellState.DESK],
      board!,
    );
    console.log('count->', countEmpty);
    const randomEmpty = randomNumber(1, countEmpty);
    console.log('random->', randomEmpty);
    const pos = resolvePos(
      randomEmpty,
      [CellState.EMPTY, CellState.DESK],
      board!,
    );
    console.log('pos->', pos);
    console.table(board);
    const dataAttack = {
      gameId: gameId,
      x: pos.x,
      y: pos.y,
      indexPlayer: indexPlayer,
    };
    attack(JSON.stringify(dataAttack));
  }
}
