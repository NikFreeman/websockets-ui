import { sendMessage } from 'ws_server/helpers/sendMessage';
import { CellState } from 'ws_server/models/board';
import { ResponseType } from 'ws_server/models/response';
import { Ships } from 'ws_server/models/ships';
import { games } from 'ws_server/store';

export function addShips(data: string) {
  const { gameId, ships, indexPlayer } = JSON.parse(data);
  const indexGame = games.findIndex((elem) => elem.id === gameId);
  if (indexGame == -1) throw new Error('not Game');
  const indexRival = games[indexGame]!.rivals.findIndex(
    (elem) => elem.player.id == indexPlayer,
  );
  if (indexRival == -1) throw new Error('not Rival');
  const board = games[indexGame]?.rivals[indexRival]?.battleField;
  ships.forEach((ship: Ships) => {
    for (let i = 0; i < ship.length; i++) {
      const { x, y } = ship.position;
      if (ship.direction) {
        board![y + i]![x]! = CellState.DESK;
      } else {
        board![y]![x + i]! = CellState.DESK;
      }
    }
  });
  games[indexGame]!.rivals[indexRival]!.ships = ships;
  games[indexGame]!.rivals[indexRival]!.ready = true;
  const startGame = games[indexGame]!.rivals.every((rival) => rival.ready);
  if (startGame) {
    games[indexGame]!.currentPlayer = games[indexGame]!.rivals[0]!.player.id!;

    games[indexGame]!.rivals.forEach((rival) => {
      const responseData = JSON.stringify({
        ships: rival.ships,
        currentPlayerIndex: rival.player.id,
      });
      sendMessage(ResponseType.START_GAME, responseData, rival.player.socket!);

      const responseTurn = JSON.stringify({
        currentPlayer: games[indexGame]!.currentPlayer,
      });
      sendMessage(ResponseType.TURN, responseTurn, rival.player.socket!);
    });
  }
}
