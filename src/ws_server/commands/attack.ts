import {
  ResponseAttackData,
  ResponseFinishData,
  ResponseTurnData,
} from './../models/response_data';
import { AttackStatus, CellState } from 'ws_server/models/board';
import { ResponseType } from 'ws_server/models/response';
import { finishGame, games, users } from 'ws_server/store';
import { checkKilled } from 'ws_server/helpers/checkKilled';
import { getPositionKilledShip } from 'ws_server/helpers/getPositionKilledShip';
import { getAroundKilledShip } from 'ws_server/helpers/getAroundKilledShip';
import { countCellState } from 'ws_server/helpers/countCellState';

import { sendToGameParticipants } from 'ws_server/helpers/sendToGameParticipants';

export function attack(data: string) {
  const { gameId, x, y, indexPlayer } = JSON.parse(data);
  const indexGame = games.findIndex((elem) => elem.id === gameId);

  if (indexGame == -1) throw new Error('not Game');

  if (games[indexGame]!.currentPlayer == indexPlayer) {
    const indexRival = games[indexGame]!.rivals.findIndex(
      (elem) => elem.player.id != indexPlayer,
    );

    const namePlayer = games[indexGame]!.rivals.find(
      (elem) => elem.player.id == indexPlayer,
    )!.player.name;

    const idRival = games[indexGame]!.rivals[indexRival]!.player.id;
    if (indexRival == -1) throw new Error('not Rival');
    const board = games[indexGame]?.rivals[indexRival]?.battleField;
    const cell = board![y]![x]!;
    // miss
    if (cell == CellState.EMPTY) {
      // miss
      board![y]![x] = CellState.MISSED;
      games[indexGame]!.currentPlayer = idRival;

      const responseAttack: ResponseAttackData = {
        position: { x, y },
        currentPlayer: indexPlayer,
        status: AttackStatus.MISS,
      };
      sendToGameParticipants(
        games[indexGame]!.rivals,
        ResponseType.ATTACK,
        responseAttack,
      );

      const responseTurn: ResponseTurnData = {
        currentPlayer: idRival,
      };
      sendToGameParticipants(
        games[indexGame]!.rivals,
        ResponseType.TURN,
        responseTurn,
      );
    }
    //Shot
    if (cell == CellState.DESK) {
      board![y]![x] = CellState.SHOTED;

      if (checkKilled({ x, y }, board!)) {
        const positionKilledShip = getPositionKilledShip({ x, y }, board!);
        const positionMissAroundShip = getAroundKilledShip({ x, y }, board!);

        const finish = countCellState([CellState.DESK], board!) == 0;

        positionKilledShip.forEach((pos) => {
          const responseAttack: ResponseAttackData = {
            position: pos,
            currentPlayer: indexPlayer,
            status: AttackStatus.KILLED,
          };
          sendToGameParticipants(
            games[indexGame]!.rivals,
            ResponseType.ATTACK,
            responseAttack,
          );
        });

        positionMissAroundShip.forEach((pos) => {
          const { x, y } = pos;
          board![y]![x] = CellState.MISSED;

          const responseAttack: ResponseAttackData = {
            position: pos,
            currentPlayer: indexPlayer,
            status: AttackStatus.MISS,
          };
          sendToGameParticipants(
            games[indexGame]!.rivals,
            ResponseType.ATTACK,
            responseAttack,
          );
        });

        const responseTurn: ResponseTurnData = {
          currentPlayer: indexPlayer,
        };
        sendToGameParticipants(
          games[indexGame]!.rivals,
          ResponseType.TURN,
          responseTurn,
        );

        if (finish) {
          const responseFinish: ResponseFinishData = {
            winPlayer: indexPlayer,
          };
          sendToGameParticipants(
            games[indexGame]!.rivals,
            ResponseType.FINISH,
            responseFinish,
          );
        }
        if (finish) {
          const user = users.get(namePlayer)!;
          user.wins = user.wins + 1;
          users.set(namePlayer, user);
          games.splice(indexGame, 1);
          finishGame.flag = true;
        }
      } else {
        const responseAttack: ResponseAttackData = {
          position: { x, y },
          currentPlayer: indexPlayer,
          status: AttackStatus.SHOT,
        };
        sendToGameParticipants(
          games[indexGame]!.rivals,
          ResponseType.ATTACK,
          responseAttack,
        );

        const responseTurn = {
          currentPlayer: indexPlayer,
        };
        sendToGameParticipants(
          games[indexGame]!.rivals,
          ResponseType.TURN,
          responseTurn,
        );
      }
    }
  }
}
