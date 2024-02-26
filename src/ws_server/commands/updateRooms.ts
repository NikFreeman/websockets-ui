import { MAX_USERS_IN_ROOM } from 'ws_server/models/consts';
import { rooms } from 'ws_server/store';

export function updateRooms() {
  const responseData = JSON.stringify(
    rooms
      .filter((item) => item.players.length < MAX_USERS_IN_ROOM)
      .map((item) => {
        return {
          roomId: item.id,
          roomUsers: item.players.map((elem) => {
            return { name: elem.name, index: elem.id };
          }),
        };
      }),
  );

  return responseData;
}
