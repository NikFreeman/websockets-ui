import { createBattleField } from 'ws_server/helpers/createBattleField';
import { sendMessage } from 'ws_server/helpers/sendMessage';
import { ResponseType } from 'ws_server/models/response';
import { Game, Rival, gameCounter, games, rooms } from 'ws_server/store';

export function createGame(indexRoom: number) {
  const room = rooms.find((elem) => {
    return elem.id == indexRoom;
  });
  const id = (gameCounter.counter = gameCounter.counter + 1);
  const rivals: Rival[] = [];

  room?.players.forEach((elem) => {
    const field = createBattleField();
    const rival: Rival = {
      player: elem,
      ready: false,
      ships: [],
      battleField: field,
    };
    rivals.push(rival);
  });
  const game: Game = {
    id: id,
    currentPlayer: -1,
    rivals: rivals,
  };
  games.push(game);

  game?.rivals.forEach((rival) => {
    const idPlayer = rival.player.id;
    const responseData = JSON.stringify({
      idGame: id,
      idPlayer: idPlayer,
    });
    sendMessage(ResponseType.CREATE_GAME, responseData, rival.player.socket!);
  });
  rooms.splice(indexRoom, 1);
}
