import { createBattleField } from 'ws_server/helpers/createBattleField';
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
      battleField: field,
    };
    rivals.push(rival);
  });
  const game: Game = {
    id: id,
    rivals: rivals,
  };
  games.push(game);

  game?.rivals.forEach((rival) => {
    const socket = rival.player.socket!;
    const idPlayer = rival.player.id;
    const respData = {
      data: {
        idGame: id,
        idPlayer: idPlayer,
      },
    };
    const answer = JSON.stringify(respData);
    socket.send(
      JSON.stringify({
        type: ResponseType.CREATE_GAME,
        data: answer,
        id: 0,
      }),
    );
  });
}
