import { RequestType } from 'ws_server/models/request';
import { handleReg } from './handleReg';
import { ResponseReg } from 'ws_server/models/response_data';

export function handleCommands(req: string): ResponseReg | undefined {
  console.log(`${req}`);
  const { type, data } = JSON.parse(req);
  switch (type) {
    case RequestType.REG:
      return handleReg(data);

    default:
      console.log(`unknown command: ${type}`);
  }
}
