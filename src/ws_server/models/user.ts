import { WebSocket } from 'ws';

export interface User {
  name: string;
  id: number;
  password: string;
  socket: WebSocket | undefined;
  winners: number;
}
