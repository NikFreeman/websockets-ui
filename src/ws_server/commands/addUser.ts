import { WebSocket } from 'ws';
import { activeConnect, rooms, users } from 'ws_server/store';

export function addUser(data: number, socket: WebSocket) {
  const player = users.get(activeConnect.get(socket)!)!;
  const index = rooms.findIndex((item) => item.id == data);

  const deleteindex = rooms.findIndex((item) => {
    return item.players[0]?.name == player.name;
  });
  if (deleteindex != -1) rooms.splice(deleteindex, 1);
  rooms[index]?.players.push(player);
}
