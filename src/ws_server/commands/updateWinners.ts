import { Winner, users } from 'ws_server/store';

export function updateWinners(): string {
  const winners: Winner[] = [];
  users.forEach((users) => {
    winners.push({
      name: users.name,
      wins: users.wins,
    });
  });
  const responseData = JSON.stringify(winners);

  return responseData;
}
