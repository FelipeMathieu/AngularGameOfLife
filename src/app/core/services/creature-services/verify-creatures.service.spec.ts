import { VerifyCreaturesService } from './verify-creatures.service';
import { CreatureNeighborsService } from './creature-neighbors.service';
import {
  createServiceFactory,
  SpectatorService,
  SpyObject,
} from '@ngneat/spectator';
import { ICreature } from '../../stores/creatures-store';
import { clone } from 'lodash';

const X = 1;
const Y = 1;

describe('VerifyCreaturesService', () => {
  let spectator: SpectatorService<VerifyCreaturesService>;
  const createService = createServiceFactory({
    service: VerifyCreaturesService,
    mocks: [CreatureNeighborsService],
  });

  let creatureNeighborsMock: SpyObject<CreatureNeighborsService>;

  const makeSureThatGetNeighborsHasBeenCalledOnce = () => {
    expect(creatureNeighborsMock.GetNeighbors).toHaveBeenCalledTimes(1);
  };

  const createCell = (): ICreature => ({
    alive: false,
    dirty: false,
    x: X,
    y: Y,
    id: `${X},${Y}`,
  });

  const createNeighbors = (): ICreature[] => [
    {
      alive: false,
      dirty: false,
      id: `${X - 1},${Y}`,
      x: X - 1,
      y: Y,
    },
    {
      alive: false,
      dirty: false,
      id: `${X + 1},${Y}`,
      x: X + 1,
      y: Y,
    },
    {
      alive: false,
      dirty: false,
      id: `${X},${Y - 1}`,
      y: Y - 1,
      x: X,
    },
    {
      alive: false,
      dirty: false,
      id: `${X},${Y + 1}`,
      y: Y + 1,
      x: X,
    },
    {
      alive: false,
      dirty: false,
      id: `${X + 1},${Y + 1}`,
      x: X + 1,
      y: Y + 1,
    },
    {
      alive: false,
      dirty: false,
      id: `${X - 1},${Y + 1}`,
      x: X - 1,
      y: Y + 1,
    },
    {
      alive: false,
      dirty: false,
      id: `${X - 1},${Y - 1}`,
      x: X - 1,
      y: Y - 1,
    },
    {
      alive: false,
      dirty: false,
      id: `${X + 1},${Y - 1}`,
      x: X + 1,
      y: Y - 1,
    },
  ];

  beforeEach(() => {
    spectator = createService();

    creatureNeighborsMock = spectator.inject<CreatureNeighborsService>(
      CreatureNeighborsService
    );
    creatureNeighborsMock.GetNeighbors.reset();
  });

  describe('When there is no living neighbors', () => {
    beforeEach(() => {
      const creatures = createNeighbors();

      creatureNeighborsMock.GetNeighbors.and.returnValue(creatures);
    });

    it('should keep verified cell with its current state', () => {
      const creature = createCell();

      spectator.service.VerifyCreatureState(creature);

      makeSureThatGetNeighborsHasBeenCalledOnce();
      expect(creature.alive).toBeFalse();
    });

    it('should kill the verified cell', () => {
      const creature = createCell();
      creature.alive = true;

      spectator.service.VerifyCreatureState(creature);

      makeSureThatGetNeighborsHasBeenCalledOnce();
      expect(creature.alive).toBeFalse();
    });
  });

  describe('When there are exactly 3 living neighbors', () => {
    beforeEach(() => {
      const creatures = createNeighbors();

      for (let i = 0; i < 3; i++) {
        creatures[i].alive = true;
      }

      creatureNeighborsMock.GetNeighbors.and.returnValue(creatures);
    });

    it('should revive the verified cell', () => {
      const creature = createCell();

      spectator.service.VerifyCreatureState(creature);

      makeSureThatGetNeighborsHasBeenCalledOnce();
      expect(creature.alive).toBeTrue();
    });

    it('should keep the verified cell alive', () => {
      const creature = createCell();
      creature.alive = true;

      spectator.service.VerifyCreatureState(creature);

      makeSureThatGetNeighborsHasBeenCalledOnce();
      expect(creature.alive).toBeTrue();
    });
  });

  describe('When there is less than 2 living neighbors or greater than 3', () => {
    const reviveNeighbors = (times: 1 | 4) => {
      const creatures = createNeighbors();

      for (let i = 0; i < times; i++) {
        creatures[i].alive = true;
      }

      creatureNeighborsMock.GetNeighbors.and.returnValue(creatures);
    };

    it('should keep the verified cell dead if living neighbors are less than 2', () => {
      reviveNeighbors(1);
      const creature = createCell();

      spectator.service.VerifyCreatureState(creature);

      makeSureThatGetNeighborsHasBeenCalledOnce();
      expect(creature.alive).toBeFalse();
    });

    it('should kill the verified cell if living neighbors are less than 2', () => {
      reviveNeighbors(1);
      const creature = createCell();
      creature.alive = true;

      spectator.service.VerifyCreatureState(creature);

      makeSureThatGetNeighborsHasBeenCalledOnce();
      expect(creature.alive).toBeFalse();
    });

    it('should keep the verified cell dead if living neighbors are greater than 3', () => {
      reviveNeighbors(4);
      const creature = createCell();

      spectator.service.VerifyCreatureState(creature);

      makeSureThatGetNeighborsHasBeenCalledOnce();
      expect(creature.alive).toBeFalse();
    });

    it('should kill the verified cell if living neighbors are greater than 3', () => {
      reviveNeighbors(4);
      const creature = createCell();
      creature.alive = true;

      spectator.service.VerifyCreatureState(creature);

      makeSureThatGetNeighborsHasBeenCalledOnce();
      expect(creature.alive).toBeFalse();
    });
  });
});
