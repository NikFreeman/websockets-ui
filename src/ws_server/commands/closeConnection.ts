import { WebSocket } from 'ws';
import { addWin } from 'ws_server/helpers/addWin';
import { activeConnect, games, rooms, users } from 'ws_server/store';
import { finishMessage } from './finishMessage';
import { sendMessage } from 'ws_server/helpers/sendMessage';
import { ResponseType } from 'ws_server/models/response';
import { updateWinners } from './updateWinners';

export function closeConnection(socket: WebSocket) {
  console.log('close connection');
  const name = activeConnect.get(socket);
  const user = users.get(name!)!;
  user.socket = null;
  users.set(user.name, user);
  const indexDeleteRoom = rooms.findIndex((room) =>
    room.players.some((player) => player.id === user.id),
  );
  if (indexDeleteRoom != -1) rooms.splice(indexDeleteRoom, 1);
  const indexDeleteGame = games.findIndex((game) =>
    game.rivals.some((rival) => rival.player.id == user.id),
  );
  const nameWinner = games[indexDeleteGame]?.rivals.filter(
    (rival) => rival.player.name != user.name,
  )[0]!.player.name!;
  console.log('close nameWin', nameWinner);
  if (indexDeleteGame != -1) {
    addWin(nameWinner);
    const winner = users.get(nameWinner);
    if (winner?.socket) {
      finishMessage(winner.id, winner.socket);
      sendMessage(ResponseType.UPDATE_WINNERS, updateWinners(), winner.socket);
    }
    games.splice(indexDeleteGame, 1);
  }
  activeConnect.delete(socket);
}
