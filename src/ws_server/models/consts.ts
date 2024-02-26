export enum ERROR {
  HASH = 'Error generate hash value',
  LOGIN = 'Login already exists',
  LOGIN_OR_PASS_LESS = 'Login or password less 5 letter',
}

export enum MESSAGE {
  START_SERVER = 'Start websocket server on ',
  NEW_CLIENT = 'New client connected',
}

export const MAX_USERS_IN_ROOM = 2;

export const bot = {
  name: 'SkyNet',
  password: 'password',
};
