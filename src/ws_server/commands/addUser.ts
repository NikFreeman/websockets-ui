import { WebSocket } from 'ws';
import { MAX_USERS_IN_ROOM } from 'ws_server/models/consts';
import { activeConnect, rooms, users } from 'ws_server/store';

export function addUser(data: number, socket: WebSocket): boolean {
  const player = users.get(activeConnect.get(socket)!)!;
  const index = rooms.findIndex((item) => item.id == data);
  if (index != -1) {
    if (rooms[index]!.players.length < MAX_USERS_IN_ROOM)
      rooms[index]?.players.push(player);
    const deleteindex = rooms.findIndex((item) => {
      return item.players[0]?.name == player.name;
    });
    if (deleteindex != -1) rooms.splice(deleteindex, 1);
  }
  return true;
}
