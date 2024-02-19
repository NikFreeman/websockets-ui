import { WebSocketServer, WebSocket } from 'ws';

export function wsServer() {
  const WS_PORT = 3000;
  const wss = new WebSocketServer({ port: WS_PORT });
  wss.on('connection', (ws: WebSocket) => {
    console.log('New client connected');
    ws.on('message', (message: string) => {
      console.log(`${message}`);
      ws.send(`Answer : ${message}`);
    });
  });
  console.log('start server on 3000 port');
}
