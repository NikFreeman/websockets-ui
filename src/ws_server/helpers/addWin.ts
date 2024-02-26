import { finishGame, users } from 'ws_server/store';

export function addWin(namePlayer: string) {
  const user = users.get(namePlayer)!;
  user.wins = user.wins + 1;
  users.set(namePlayer, user);
  finishGame.flag = true;
}
