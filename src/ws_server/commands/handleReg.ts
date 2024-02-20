import { ResponseReg, ResponseRegData } from 'ws_server/models/response_data';
import { login } from './login';
import { ResponseType } from 'ws_server/models/response';
import { ERROR } from 'ws_server/models/consts';

export function handleReg(data: string): ResponseReg {
  const { name, password } = JSON.parse(data);

  const responseData: ResponseRegData = login(name, password)
    ? {
        name: name,
        index: 42,
        error: false,
        errorText: '',
      }
    : {
        name: name,
        index: 42,
        error: true,
        errorText: ERROR.LOGIN,
      };
  const answer = JSON.stringify(responseData);
  return { type: ResponseType.REG, data: answer, id: 0 };
}
