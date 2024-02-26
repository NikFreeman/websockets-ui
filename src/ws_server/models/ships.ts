export type Ships = {
  position: Position;
  direction: boolean;
  length: number;
  type: ShipType;
};

export type ShipType = 'small' | 'medium' | 'large' | 'huge';

export type Position = {
  x: number;
  y: number;
};
