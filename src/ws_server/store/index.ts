import { User } from 'ws_server/models/user';

export const users = new Map<string, User>();
export const rooms: Room[] = [];

export interface Room {
  id: number;
  players: User[];
}
