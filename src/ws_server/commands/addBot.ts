import { WebSocket } from 'ws';
import { activeConnect, games, rooms, users } from 'ws_server/store';
import { reg } from './reg';
import { bot } from 'ws_server/models/consts';
import { createGame } from './createGame';
import { addShips } from './addShips';
import { botShips } from 'ws_server/models/bot';

export function addBot(socket: WebSocket) {
  const player = users.get(activeConnect.get(socket)!)!;
  const regDataBot = JSON.stringify({ name: bot.name, password: bot.password });
  reg(regDataBot, null);
  const skyNet = users.get(bot.name)!;
  const indexRoom = rooms.findIndex((item) => {
    return item.players[0]?.name == player.name;
  });

  if (indexRoom != -1) {
    rooms[indexRoom]?.players.push(skyNet);
  }
  createGame(rooms[indexRoom]!.id);
  const game = games.find((elem) => elem.rivals[0]?.player.id == player.id);
  const ships = botShips;
  const shipsdata = { gameId: game!.id, ships: ships, indexPlayer: skyNet.id };
  addShips(JSON.stringify(shipsdata));
  game!.rivals[1]!.ready = true;
}
