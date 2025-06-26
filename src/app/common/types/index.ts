import { ICreature } from '../interfaces/creature.interface';

export type TId = `${number},${number}`;
export type TCreatures = Record<TId, ICreature>;
