import { WebSocket } from 'ws';
import { sendMessage } from 'ws_server/helpers/sendMessage';
import { ResponseType } from 'ws_server/models/response';
import { ResponseFinishData } from 'ws_server/models/response_data';

export function finishMessage(winPlayer: number, socket: WebSocket) {
  const responseData: ResponseFinishData = {
    winPlayer: winPlayer,
  };
  sendMessage(ResponseType.FINISH, JSON.stringify(responseData), socket);
}
