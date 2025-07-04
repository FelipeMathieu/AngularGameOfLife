import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { CreatureSelectorsService } from './creature-selectors.service';
import { creaturesStore, ICreature } from '../../stores/creatures-store';
import { FIELD_SIZE } from '../../../common/constants';
import { take, tap } from 'rxjs';
import { upsertEntities } from '@ngneat/elf-entities';
import { fakeAsync, tick } from '@angular/core/testing';

const X = 0;
const Y = 0;

const creature1: ICreature = {
  alive: false,
  dirty: false,
  id: `${X},${Y}`,
  x: X,
  y: Y,
};

const creature2: ICreature = {
  alive: false,
  dirty: false,
  id: `${X + 1},${Y}`,
  x: X + 1,
  y: Y,
};

describe('CreatureSelectorsService', () => {
  let spectator: SpectatorService<CreatureSelectorsService>;
  const createService = createServiceFactory(CreatureSelectorsService);
  const invalidCreatureId = `${X},${FIELD_SIZE + 10}`;

  beforeEach(() => {
    creaturesStore.update(upsertEntities([creature1, creature2]));

    spectator = createService();
  });

  it('should get creature by id synchronously', () => {
    const creature = spectator.service.ById(creature1.id);

    expect(creature).toEqual(creature1);
  });

  it('should return undefined synchronously when creature does not exist', () => {
    const creature = spectator.service.ById(invalidCreatureId);

    expect(creature).toBeUndefined();
  });

  it('should take creature by id asynchronously', () => {
    spectator.service
      .ById$(creature2.id)
      .pipe(
        take(1),
        tap((creature) => {
          expect(creature).toEqual(creature2);
        })
      )
      .subscribe();
  });

  it('should return undefined asynchronously when creature does not exist', () => {
    spectator.service
      .ById$(invalidCreatureId)
      .pipe(
        take(1),
        tap((creature) => {
          expect(creature).toBeUndefined();
        })
      )
      .subscribe();
  });

  it('should get all creatures synchronously', () => {
    const creatures = spectator.service.Creatures;

    expect(creatures.length).toBe(FIELD_SIZE * FIELD_SIZE);
  });

  it('should take all creatures asynchronously', () => {
    spectator.service.Creatures$.pipe(
      take(1),
      tap((creatures) => {
        expect(creatures.length).toBe(FIELD_SIZE * FIELD_SIZE);
      })
    ).subscribe();
  });

  it('should take population asynchronously', fakeAsync(() => {
    creaturesStore.update(
      upsertEntities([
        {
          ...creature1,
          alive: true,
        },
      ])
    );

    tick();

    spectator.service.Population$.pipe(
      take(1),
      tap((population) => {
        expect(population).toBe(1);
      })
    ).subscribe();
  }));

  it('should take max population asynchronously', () => {
    spectator.service.MaxPopulation$.pipe(
      take(1),
      tap((maxPopulation) => {
        expect(maxPopulation).toBe(0);
      })
    );
  });

  it('should take max population and population asynchronously', fakeAsync(() => {
    creaturesStore.update(
      upsertEntities([
        {
          ...creature1,
          alive: true,
        },
      ])
    );

    tick();

    spectator.service.MaxPopulationAndPopulation$.pipe(
      take(1),
      tap(([population, maxPopulation]) => {
        expect(population).toBe(1);
        expect(maxPopulation).toBe(0);
      })
    );
  }));
});
