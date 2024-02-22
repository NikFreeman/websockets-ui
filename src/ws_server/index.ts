import { MESSAGE } from './models/consts';
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

export function wsServer() {
  function sendUpdateRoom() {
    const response = updateRooms();
    wss.clients.forEach((client) => {
      if (client.readyState == WebSocket.OPEN) {
        sendMessage(ResponseType.UPDATE_ROOM, response, client);
      }
    });
  }

  const WS_PORT = 3000;
  const wss = new WebSocketServer({ port: WS_PORT });
  wss.on('connection', (ws: WebSocket) => {
    console.log(MESSAGE.NEW_CLIENT);
    ws.on('message', (message: string) => {
      const { type, data } = JSON.parse(message);

      switch (type) {
        case RequestType.REG:
          const response = reg(data, ws);
          sendMessage(ResponseType.REG, response, ws);
          sendUpdateRoom();
          break;

        case RequestType.CREATE_ROOM:
          createRoom(ws);
          sendUpdateRoom();
          break;

        case RequestType.ADD_USER:
          const { indexRoom } = JSON.parse(data);
          addUser(indexRoom, ws);
          sendUpdateRoom();
          createGame(indexRoom);
          break;
        case RequestType.ADD_SHIPS:
          addShips(data);
          break;
        case RequestType.ATTACK:
          console.log(data);
          attack(data);
          break;
        case RequestType.RANDOM_ATTACK:
          console.log(data);
          break;
        case RequestType.SINGLE_PLAY:
          console.log('bot');
          break;
        default:
          console.log(`unknown command: ${type}`);
      }
    });
  });
  console.log(MESSAGE.START_SERVER.replace('PORT', String(WS_PORT)));
}
