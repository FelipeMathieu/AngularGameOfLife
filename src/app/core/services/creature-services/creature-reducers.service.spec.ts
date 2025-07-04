import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { CreatureReducersService } from './creature-reducers.service';
import { creaturesStore, ICreature } from '../../stores/creatures-store';
import { getAllEntitiesApply, getEntity } from '@ngneat/elf-entities';
import { values } from 'lodash';

const X = 0;
const Y = 0;
const ID = `${X},${Y}`;
const ID2 = `${X + 1},${Y}`;

describe('CreatureReducersService', () => {
  let spectator: SpectatorService<CreatureReducersService>;
  const createService = createServiceFactory(CreatureReducersService);

  beforeEach(() => {
    creaturesStore.reset();
    spectator = createService();
  });

  it('should update a single creature', () => {
    const creature: ICreature = {
      alive: true,
      dirty: false,
      id: ID,
      x: X,
      y: Y,
    };
    const previousCreatureState = creaturesStore.query(getEntity(ID));

    spectator.service.UpdateCreature(creature);

    const currentCreatureState = creaturesStore.query(getEntity(ID));

    expect(previousCreatureState).toBeTruthy();
    expect(previousCreatureState).not.toEqual(creature);
    expect(currentCreatureState).toEqual(creature);
  });

  it('should update batch update', () => {
    const creatures: ICreature[] = [
      {
        alive: true,
        dirty: false,
        id: ID,
        x: X,
        y: Y,
      },
      {
        alive: true,
        dirty: false,
        id: ID2,
        x: X + 1,
        y: Y,
      },
    ];
    const previousCreaturesState = creaturesStore.query(
      getAllEntitiesApply({
        filterEntity: (state) => state.id === ID || state.id === ID2,
      })
    );

    spectator.service.BatchUpdate(creatures);

    const currentCreatureState = creaturesStore.query(
      getAllEntitiesApply({
        filterEntity: (state) => state.id === ID || state.id === ID2,
      })
    );

    expect(previousCreaturesState.length).toBe(creatures.length);
    expect(previousCreaturesState).not.toEqual(creatures);
    expect(currentCreatureState).toEqual(creatures);
  });

  it('should update max population', () => {
    const maxPopulation = 10;

    const previousMaxPopulationState = creaturesStore.getValue().maxPopulation;

    spectator.service.UpdateMaxPopulation(maxPopulation);

    const currentMaxPopulationState = creaturesStore.getValue().maxPopulation;

    expect(previousMaxPopulationState).toBe(0);
    expect(previousMaxPopulationState).not.toBe(maxPopulation);
    expect(currentMaxPopulationState).toEqual(maxPopulation);
  });

  it('should reset the store', () => {
    const maxPopulation = 10;

    spectator.service.UpdateMaxPopulation(maxPopulation);

    let currentMaxPopulationState = creaturesStore.getValue().maxPopulation;

    expect(currentMaxPopulationState).toEqual(maxPopulation);

    spectator.service.Reset();

    currentMaxPopulationState = creaturesStore.getValue().maxPopulation;

    expect(currentMaxPopulationState).toBe(0);
    expect(
      values(creaturesStore.getValue().entities).filter((cell) => cell.alive)
        .length
    ).toBe(0);
  });
});
