import { withEntities } from '@ngneat/elf-entities';
import { createStore } from '@ngneat/elf';
import { ICreature } from '../../common/interfaces/creature.interface';

export const creaturesStore = createStore(
  {
    name: 'Creatures',
  },
  withEntities<ICreature, 'Id'>({
    initialValue: [],
    idKey: 'Id',
  })
);
