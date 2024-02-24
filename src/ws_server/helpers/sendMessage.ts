import { WebSocket } from 'ws';
import { ResponseType } from 'ws_server/models/response';

export function sendMessage(
  type: ResponseType,
  data: string,
  socket: WebSocket,
) {
  if (socket) socket.send(JSON.stringify({ type: type, data: data, id: 0 }));
}
