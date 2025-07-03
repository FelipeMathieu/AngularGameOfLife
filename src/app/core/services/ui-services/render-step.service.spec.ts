import { ICreature } from '../../stores/creatures-store';
import { CreatureReducersService } from '../creature-services/creature-reducers.service';
import { CreatureSelectorsService } from '../creature-services/creature-selectors.service';
import { VerifyCreaturesService } from '../creature-services/verify-creatures.service';
import { RenderStepService } from './render-step.service';
import {
  createServiceFactory,
  createSpyObject,
  SpectatorService,
} from '@ngneat/spectator';
import { UIReducersService } from './ui-reducers.service';

const mockVerifyCreatureState = jasmine
  .createSpy()
  .and.callFake((cell: ICreature) => {
    if (cell.x > 0) cell.alive = true;
  });

const mockBatchUpdate = jasmine.createSpy();
const mockNextGeneration = jasmine.createSpy();

const creatureToBeModified: ICreature = {
  alive: false,
  dirty: false,
  id: `${1},${0}`,
  x: 1,
  y: 0,
};
const creatures: ICreature[] = [
  {
    alive: false,
    dirty: false,
    id: `${0},${0}`,
    x: 0,
    y: 0,
  },
  {
    alive: true,
    dirty: false,
    id: `${0},${1}`,
    x: 0,
    y: 1,
  },
  {
    alive: false,
    dirty: false,
    id: `${0},${2}`,
    x: 0,
    y: 2,
  },
  creatureToBeModified,
];

const mockVerifyCreaturesService = createSpyObject(VerifyCreaturesService, {
  VerifyCreatureState: mockVerifyCreatureState,
});

const mockCreatureReducersService = createSpyObject(CreatureReducersService, {
  BatchUpdate: mockBatchUpdate,
});

const mockCreatureSelectorsService = createSpyObject(CreatureSelectorsService, {
  Creatures: creatures,
});

const mockUIReducersService = createSpyObject(UIReducersService, {
  NextGeneration: mockNextGeneration,
});

describe('RenderStepService', () => {
  let spectator: SpectatorService<RenderStepService>;
  let createService = createServiceFactory({
    service: RenderStepService,
    providers: [
      {
        provide: VerifyCreaturesService,
        useValue: mockVerifyCreaturesService,
      },
      {
        provide: CreatureReducersService,
        useValue: mockCreatureReducersService,
      },
      {
        provide: CreatureSelectorsService,
        useValue: mockCreatureSelectorsService,
      },
      {
        provide: UIReducersService,
        useValue: mockUIReducersService,
      },
    ],
  });

  const resetMocks = () => {
    mockVerifyCreatureState.calls.reset();
    mockBatchUpdate.calls.reset();
    mockNextGeneration.calls.reset();
  };

  beforeEach(() => {
    spectator = createService();
    spectator.service.Run();
  });

  afterEach(() => {
    resetMocks();
    spectator.flushEffects();
  });

  it('should call VerifyCreatureState for all creatures', () => {
    expect(mockVerifyCreatureState).toHaveBeenCalledTimes(creatures.length);
  });

  it('should call batch update for the changed cell', () => {
    expect(mockBatchUpdate).toHaveBeenCalledTimes(1);
    expect(mockBatchUpdate.calls.mostRecent().args[0]).toEqual([
      {
        ...creatureToBeModified,
        alive: true,
        dirty: true,
      } satisfies ICreature,
    ]);
  });

  it('should call next generation after updating the creatures', () => {
    expect(mockNextGeneration).toHaveBeenCalledTimes(1);
  });
});
