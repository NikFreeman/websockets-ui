import { WebSocket } from 'ws';
import { activeConnect, users } from 'ws_server/store';

export function closeConnection(socket: WebSocket) {
  console.log('close connection');
  const name = activeConnect.get(socket);
  const user = users.get(name!)!;
  user.socket = null;
  users.set(user.name, user);
  activeConnect.delete(socket);
}
