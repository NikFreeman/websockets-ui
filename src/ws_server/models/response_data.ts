import { ResponseType } from './response';

export interface ResponseRegData {
  name: string;
  index: number;
  error: boolean;
  errorText: string;
}

export interface ResponseReg {
  type: ResponseType;
  data: string;
  id: number;
}
