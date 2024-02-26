import { AttackStatus } from './board';
import { Position } from './ships';

export type ResponseRegData = {
  name: string;
  index: number;
  error: boolean;
  errorText: string;
};

export type ResponseAttackData = {
  position: Position;
  currentPlayer: number;
  status: AttackStatus;
};

export type ResponseFinishData = {
  winPlayer: number;
};

export type ResponseTurnData = {
  currentPlayer: number;
};
export type ResponseData =
  | ResponseAttackData
  | ResponseFinishData
  | ResponseRegData
  | ResponseTurnData;
