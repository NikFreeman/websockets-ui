import { WebSocket } from 'ws';
import { activeConnect, roomCounter, rooms, users } from 'ws_server/store';

export function createRoom(socket: WebSocket) {
  const player = users.get(activeConnect.get(socket)!)!;
  if (
    !rooms.some((item) => {
      return item.players.some((elem) => elem.name === player.name);
    })
  ) {
    const id = (roomCounter.counter = roomCounter.counter + 1);
    rooms.push({ id: id, players: [player] });
  }
}
