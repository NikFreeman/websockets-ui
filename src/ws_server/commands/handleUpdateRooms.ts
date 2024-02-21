import { ResponseType } from 'ws_server/models/response';
import { rooms } from 'ws_server/store';

export function handleUpdateRoom() {
  const data = rooms.map((item) => {
    if ((item.players.length = 1))
      return {
        roomId: item.id,
        roomUsers: item.players.map((elem) => {
          return { name: elem.name, index: elem.id };
        }),
      };
  });
  const answer = JSON.stringify(data);
  return { type: ResponseType.UPDATE_ROOM, data: answer, id: 0 };
}
