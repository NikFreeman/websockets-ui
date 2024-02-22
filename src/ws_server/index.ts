import { MESSAGE } from './models/consts';
import { WebSocketServer, WebSocket } from 'ws';

import { RequestType } from './models/request';
import { reg } from './commands/reg';
import { updateRoom } from './commands/updateRooms';
import { createRoom } from './commands/createRoom';
import { addUser } from './commands/addUser';

import { createGame } from './commands/createGame';

export function wsServer() {
  function sendUpdateRoom() {
    const response = updateRoom();
    wss.clients.forEach((client) => client.send(JSON.stringify(response)));
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
          ws.send(JSON.stringify(response));
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
