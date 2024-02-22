import { AttackStatus } from './board';
import { Position } from './ships';

export interface ResponseRegData {
  name: string;
  index: number;
  error: boolean;
  errorText: string;
}

export interface ResponseAttackData {
  position: Position;
  currentPlayer: number;
  status: AttackStatus;
}
