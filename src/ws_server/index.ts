import { MESSAGE, bot } from './models/consts';
import { WebSocketServer, WebSocket } from 'ws';

import { RequestType } from './models/request';
import { reg } from './commands/reg';
import { updateRooms } from './commands/updateRooms';
import { createRoom } from './commands/createRoom';
import { addUser } from './commands/addUser';

import { createGame } from './commands/createGame';
import { addShips } from './commands/addShips';
import { sendMessage } from './helpers/sendMessage';
import { ResponseType } from './models/response';
import { attack } from './commands/attack';
import { randomAttack } from './commands/randomAttack';
import { closeConnection } from './commands/closeConnection';
import { updateWinners } from './commands/updateWinners';
import { sendToEveryone } from './helpers/sendToEveryone';
import { activeConnect, finishGame } from './store';
import { addBot } from './commands/addBot';

export function wsServer(ws_port: number = 3000) {
  const wss = new WebSocketServer({ port: ws_port });
  wss.on('connection', (ws: WebSocket) => {
    console.log(MESSAGE.NEW_CLIENT);
    ws.on('message', (message: string) => {
      const { type, data } = JSON.parse(message);
      console.log(type, data);
      switch (type) {
        case RequestType.REG:
          const response = reg(data, ws);
          sendMessage(ResponseType.REG, response, ws);
          sendToEveryone(wss, ResponseType.UPDATE_ROOM, updateRooms());
          sendToEveryone(wss, ResponseType.UPDATE_WINNERS, updateWinners());
          break;

        case RequestType.CREATE_ROOM:
          createRoom(ws);
          sendToEveryone(wss, ResponseType.UPDATE_ROOM, updateRooms());
          break;

        case RequestType.ADD_USER:
          const { indexRoom } = JSON.parse(data);
          if (addUser(indexRoom, ws)) {
            sendToEveryone(wss, ResponseType.UPDATE_ROOM, updateRooms());
            createGame(indexRoom);
          }
          break;
        case RequestType.ADD_SHIPS:
          addShips(data);
          break;
        case RequestType.ATTACK:
          attack(data);
          if (finishGame.flag)
            sendToEveryone(wss, ResponseType.UPDATE_WINNERS, updateWinners());
          finishGame.flag = false;
          break;
        case RequestType.RANDOM_ATTACK:
          randomAttack(data);
          if (finishGame.flag)
            sendToEveryone(wss, ResponseType.UPDATE_WINNERS, updateWinners());
          finishGame.flag = false;
          break;
        case RequestType.SINGLE_PLAY:
          console.log(bot.name);
          createRoom(ws);
          addBot(ws);
          break;
        default:
          console.log(`unknown command: ${type}`);
      }
    });
    ws.on('close', () => {
      if (activeConnect.has(ws)) closeConnection(ws);
    });

    ws.on('error', (error: Error) => {
      console.log('Error', error.message);
    });
  });
  console.log(MESSAGE.START_SERVER.replace('PORT', String(ws_port)));
}
