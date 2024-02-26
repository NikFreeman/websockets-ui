import { ResponseData } from './../models/response_data';
import { ResponseType } from 'ws_server/models/response';
import { Rival } from 'ws_server/store';
import { sendMessage } from './sendMessage';
export function sendToGameParticipants(
  rivals: Rival[],
  type: ResponseType,
  data: ResponseData,
) {
  rivals.forEach((rival) => {
    if (rival.player.socket)
      sendMessage(type, JSON.stringify(data), rival.player.socket);
  });
}
