import { WebSocket } from 'ws';
import { activeConnect, users } from 'ws_server/store';

export function closeConnection(socket: WebSocket) {
  console.log('close connection');
  const name = activeConnect.get(socket);
  users.get(name!)!.socket = null;
  activeConnect.delete(socket);
}
