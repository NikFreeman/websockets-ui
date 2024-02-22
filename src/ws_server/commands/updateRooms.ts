import { MAX_USERS_IN_ROOM } from 'ws_server/models/consts';
import { ResponseType } from 'ws_server/models/response';
import { rooms } from 'ws_server/store';

export function updateRoom() {
  const data = rooms
    .filter((item) => item.players.length < MAX_USERS_IN_ROOM)
    .map((item) => {
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
