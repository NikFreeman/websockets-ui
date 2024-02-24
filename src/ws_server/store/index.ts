import { WebSocket } from 'ws';
import { Ships } from 'ws_server/models/ships';

export const users = new Map<string, User>();

export const activeConnect = new Map<WebSocket, string>();

export const rooms: Room[] = [];

export const games: Game[] = [];

export const roomCounter = { counter: 0 };

export const gameCounter = { counter: 0 };

export type Room = {
  id: number;
  players: User[];
};

export type Game = {
  id: number;
  currentPlayer: number;
  rivals: Rival[];
};

export type Rival = {
  player: User;
  ready: boolean;
  ships: Array<Ships>;
  battleField: number[][];
};

export type User = {
  name: string;
  id: number;
  password: string;
  socket: WebSocket | null;
  wins: number;
};

export type Winner = {
  name: string;
  wins: number;
};
