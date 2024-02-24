import WebSocket from 'ws';
import { ResponseRegData } from 'ws_server/models/response_data';
import { generateHash } from 'ws_server/helpers/generateHash';

import { ERROR } from 'ws_server/models/consts';

import { activeConnect, users } from 'ws_server/store';

export function reg(data: string, socket: WebSocket): string {
  const { name, password } = JSON.parse(data);
  if (!users.has(name)) registration(name, password);
  const responseData: ResponseRegData = {
    name: '',
    index: 0,
    error: false,
    errorText: '',
  };
  if (authentication(name, password)) {
    users.get(name)!['socket'] = socket;
    responseData.name = users.get(name)!.name;
    responseData.index = users.get(name)!.id;
    activeConnect.set(socket, users.get(name)!.name);
  } else {
    responseData.error = true;
    responseData.errorText = ERROR.LOGIN;
  }

  const answer = JSON.stringify(responseData);
  return answer;
}

function authentication(user: string, password: string): boolean {
  return users.get(user)?.password === generateHash(password) ? true : false;
}

function registration(user: string, password: string) {
  users.set(user, {
    name: user,
    password: generateHash(password),
    id: users.size + 1,
    socket: null,
    wins: 0,
  });
}
