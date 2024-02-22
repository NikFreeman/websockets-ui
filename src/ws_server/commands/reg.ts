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
    const temp_user = users.get(name)!;
    temp_user['socket'] = socket;
    responseData.name = temp_user.name;
    responseData.index = temp_user.id;
    activeConnect.set(socket, temp_user.name);
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
    socket: undefined,
    wins: 0,
  });
}
