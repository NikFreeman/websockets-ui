import { Room } from './../store/index';
import { RequestType } from 'ws_server/models/request';
import { handleReg } from './handleReg';
import { ResponseReg } from 'ws_server/models/response_data';

import { rooms } from 'ws_server/store';
import { WebSocket } from 'ws';
import { generateId } from 'ws_server/helpers/generateId';

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
      break;
    default:
      console.log(`unknown command: ${type}`);
  }
}
