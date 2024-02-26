import { Winner, users } from 'ws_server/store';

export function updateWinners(): string {
  const winners: Winner[] = [];
  users.forEach((users) => {
    winners.push({
      name: users.name,
      wins: users.wins,
    });
  });
  const responseData = JSON.stringify(
    winners.sort((a, b) => {
      return b.wins - a.wins;
    }),
  );

  return responseData;
}
