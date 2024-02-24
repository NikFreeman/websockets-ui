import { WebSocket, WebSocketServer } from 'ws';
import { ResponseType } from 'ws_server/models/response';
import { sendMessage } from './sendMessage';

export function sendToEveryone(
  wss: WebSocketServer,
  type: ResponseType,
  response: string,
) {
  wss.clients.forEach((client) => {
    if (client.readyState == WebSocket.OPEN) {
      sendMessage(type, response, client);
    }
  });
}
