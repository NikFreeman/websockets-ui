import { WebSocket } from 'ws';
import { User } from 'ws_server/models/user';

export const users = new Map<string, User>();

export const activeConnect = new Map<WebSocket, string>();

export const rooms: Room[] = [];

export const games: Game[] = [];

export const roomCounter = { counter: 0 };

export const gameCounter = { counter: 0 };

export interface Room {
  id: number;
  players: User[];
}

export interface Game {
  id: number;
  rivals: Rival[];
}

export interface Rival {
  player: User;
  battleField: number[][];
}
