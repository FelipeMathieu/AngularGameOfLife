import {
  createServiceFactory,
  SpectatorService,
  SpyObject,
} from '@ngneat/spectator';
import { CreatureNeighborsService } from './creature-neighbors.service';
import { CreatureSelectorsService } from './creature-selectors.service';
import { ICreature, TId } from '../../stores/creatures-store';

const X = 10;
const Y = 10;

const baseCreature: ICreature = {
  alive: false,
  dirty: false,
  id: `${X},${Y}`,
  x: X,
  y: Y,
};

const creatureNeighbors: ICreature[] = [
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

describe('CreatureNeighborsService', () => {
  let spectator: SpectatorService<CreatureNeighborsService>;
  const createService = createServiceFactory({
    service: CreatureNeighborsService,
    mocks: [CreatureSelectorsService],
  });

  let mockCreatureSelectorsService: SpyObject<CreatureSelectorsService>;

  beforeEach(() => {
    spectator = createService();

    mockCreatureSelectorsService = spectator.inject<CreatureSelectorsService>(
      CreatureSelectorsService
    );

    mockCreatureSelectorsService.ById.and.callFake(
      (id: TId) => creatureNeighbors.find((cell) => cell.id === id)!
    );
  });

  it('should be created', () => {
    const neighbors = spectator.service.GetNeighbors(baseCreature);

    expect(mockCreatureSelectorsService.ById).toHaveBeenCalledTimes(
      neighbors.length
    );
    expect(neighbors.length).toBe(8);
  });
});
