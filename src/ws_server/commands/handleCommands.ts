import { RequestType } from 'ws_server/models/request';
import { handleReg } from './handleReg';
import { ResponseReg } from 'ws_server/models/response_data';

import { WebSocket } from 'ws';
import { handleUpdateRoom } from './handleUpdateRooms';
import { handleCreateRoom } from './handleCreateRoom';

export function handleCommands(
  req: string,
  socket: WebSocket,
): ResponseReg | undefined {
  console.log(`${req}`);
  const { type, data } = JSON.parse(req);

  switch (type) {
    case RequestType.REG:
      return handleReg(data, socket);

    case RequestType.CREATE_ROOM:
      handleCreateRoom(socket);
      return handleUpdateRoom();

    default:
      console.log(`unknown command: ${type}`);
  }
}
