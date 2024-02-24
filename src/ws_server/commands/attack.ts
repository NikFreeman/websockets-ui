import { sendMessage } from 'ws_server/helpers/sendMessage';
import { ResponseAttackData } from './../models/response_data';
import { AttackStatus, CellState } from 'ws_server/models/board';
import { ResponseType } from 'ws_server/models/response';
import { games, users } from 'ws_server/store';
import { checkKilled } from 'ws_server/helpers/checkKilled';
import { getPositionKilledShip } from 'ws_server/helpers/getPositionKilledShip';
import { getAroundKilledShip } from 'ws_server/helpers/getAroundKilledShip';
import { countCellState } from 'ws_server/helpers/countCellState';
import { finishMessage } from './finish';

export function attack(data: string) {
  console.log(data);
  const { gameId, x, y, indexPlayer } = JSON.parse(data);
  const indexGame = games.findIndex((elem) => elem.id === gameId);
  if (indexGame == -1) throw new Error('not Game');
  if (games[indexGame]?.currentPlayer == indexPlayer) {
    const indexRival = games[indexGame]!.rivals.findIndex(
      (elem) => elem.player.id != indexPlayer,
    );
    const idRival = games[indexGame]?.rivals[indexRival]?.player.id;
    if (indexRival == -1) throw new Error('not Rival');
    const board = games[indexGame]?.rivals[indexRival]?.battleField;
    const cell = board![y]![x]!;

    if (cell == CellState.EMPTY) {
      board![y]![x] = CellState.MISSED;
      games[indexGame]!.currentPlayer = idRival!;

      games[indexGame]!.rivals.forEach((rival) => {
        const responseData: ResponseAttackData = {
          position: { x, y },
          currentPlayer: indexPlayer,
          status: AttackStatus.MISS,
        };
        sendMessage(
          ResponseType.ATTACK,
          JSON.stringify(responseData),
          rival.player.socket!,
        );

        const responseTurn = JSON.stringify({
          currentPlayer: idRival,
        });
        sendMessage(ResponseType.TURN, responseTurn, rival.player.socket!);
      });
    }
    if (cell == CellState.DESK) {
      board![y]![x] = CellState.SHOTED;

      if (checkKilled({ x, y }, board!)) {
        const positionKilledShip = getPositionKilledShip({ x, y }, board!);
        const positionMissAroundShip = getAroundKilledShip({ x, y }, board!);
        const finish = countCellState([CellState.DESK], board!) == 0;
        games[indexGame]!.rivals.forEach((rival) => {
          positionKilledShip.forEach((pos) => {
            const responseData: ResponseAttackData = {
              position: pos,
              currentPlayer: indexPlayer,
              status: AttackStatus.KILLED,
            };
            sendMessage(
              ResponseType.ATTACK,
              JSON.stringify(responseData),
              rival.player.socket!,
            );
          });

          positionMissAroundShip.forEach((pos) => {
            const { x, y } = pos;
            board![y]![x] = CellState.MISSED;

            const responseData: ResponseAttackData = {
              position: pos,
              currentPlayer: indexPlayer,
              status: AttackStatus.MISS,
            };
            sendMessage(
              ResponseType.ATTACK,
              JSON.stringify(responseData),
              rival.player.socket!,
            );
          });
          const responseTurn = JSON.stringify({
            currentPlayer: indexPlayer,
          });
          sendMessage(ResponseType.TURN, responseTurn, rival.player.socket!);
          if (finish) {
            finishMessage(indexPlayer, rival.player.socket!);
            users.get(rival.player.name)!.wins =
              users.get(rival.player.name)!.wins + 1;
            games.splice(indexGame, 1);
          }
        });
      } else {
        games[indexGame]!.rivals.forEach((rival) => {
          const responseData: ResponseAttackData = {
            position: { x, y },
            currentPlayer: indexPlayer,
            status: AttackStatus.SHOT,
          };
          sendMessage(
            ResponseType.ATTACK,
            JSON.stringify(responseData),
            rival.player.socket!,
          );

          const responseTurn = JSON.stringify({
            currentPlayer: indexPlayer,
          });
          sendMessage(ResponseType.TURN, responseTurn, rival.player.socket!);
        });
      }
    }
  }
}
