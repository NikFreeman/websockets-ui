import { MESSAGE } from './models/consts';
import { WebSocketServer, WebSocket } from 'ws';
import { handleCommands } from './commands/handleCommands';

export function wsServer() {
  const WS_PORT = 3000;
  const wss = new WebSocketServer({ port: WS_PORT });
  wss.on('connection', (ws: WebSocket) => {
    console.log(MESSAGE.NEW_CLIENT);
    ws.on('message', (message: string) => {
      const response = handleCommands(message, ws);
      ws.send(JSON.stringify(response));
    });
  });
  console.log(MESSAGE.START_SERVER);
}
