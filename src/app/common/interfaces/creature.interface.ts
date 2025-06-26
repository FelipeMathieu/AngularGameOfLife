import { TId } from '../types';

export interface ICreature {
  Id: TId;
  Alive: boolean;
  X: number;
  Y: number;
  Revive: () => void;
  Kill: () => void;
}
