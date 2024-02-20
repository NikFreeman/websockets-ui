import { generateHash } from 'ws_server/helpers/generateHash';
import { users } from 'ws_server/store';

export function login(user: string, password: string): boolean {
  if (!users.has(user)) registration(user, password);
  return authentication(user, password);
}

function authentication(user: string, password: string): boolean {
  if (users.get(user) === generateHash(password)) return true;
  return false;
}

function registration(user: string, password: string) {
  users.set(user, generateHash(password));
}
