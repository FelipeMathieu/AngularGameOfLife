import { withEntities } from '@ngneat/elf-entities';
import { createStore } from '@ngneat/elf';
import { FIELD_SIZE } from '../../common/constants';

export type TId = `${number},${number}`;

export interface ICreature {
  id: TId;
  alive: boolean;
  x: number;
  y: number;
  dirty: boolean;
}

const buildCreatures = () => {
  const creatures: ICreature[] = [];

  for (let y = 0; y < FIELD_SIZE; y++) {
    for (let x = 0; x < FIELD_SIZE; x++) {
      const creature = {
        alive: false,
        id: `${x},${y}`,
        x,
        y,
        dirty: true,
      } satisfies ICreature;

      creatures.push(creature);
    }
  }

  return creatures;
};

export const creaturesStore = createStore(
  {
    name: 'Creatures',
  },
  withEntities<ICreature>({
    initialValue: buildCreatures(),
  })
);
