import { WebSocket } from 'ws';
import { User } from 'ws_server/models/user';

export const users = new Map<string, User>();

export const activeConnect = new Map<WebSocket, string>();

export const rooms: Room[] = [];

export const roomCounter = { counter: 0 };

export interface Room {
  id: number;
  players: User[];
}
