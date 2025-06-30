import {
  Spectator,
  createComponentFactory,
  createSpyObject,
} from '@ngneat/spectator';
import { GameInfoComponent } from './game-info.component';
import { CreatureSelectorsService } from '../../core/services/creature-services/creature-selectors.service';
import { UISelectorsService } from '../../core/services/ui-services/ui-selectors.service';
import { UIReducersService } from '../../core/services/ui-services/ui-reducers.service';
import { of } from 'rxjs';
import { ICreature } from '../../core/stores/creatures-store';
import { fakeAsync } from '@angular/core/testing';

const creature: ICreature = {
  alive: false,
  dirty: false,
  id: `${0},${0}`,
  x: 0,
  y: 0,
};

const mockCreatureSelector = createSpyObject(CreatureSelectorsService, {
  MaxPopulation$: of(20),
  Population$: of(10),
  ById: jasmine.createSpy().and.returnValue(creature),
  ById$: jasmine.createSpy().and.returnValue(of(creature)),
  Creatures: [creature],
  Creatures$: jasmine.createSpy().and.returnValue(of([creature])),
  MaxPopulationAndPopulation$: of([20, 10]),
});

const mockUISelector = createSpyObject(UISelectorsService, {
  Fps: 30,
  Fps$: of(30),
  Generations$: of(100),
  Running: false,
  Running$: of(false),
});

let mockUIReducers: any;

describe('GameInfoComponent', () => {
  let spectator: Spectator<GameInfoComponent>;
  const createComponent = createComponentFactory({
    component: GameInfoComponent,
    providers: [
      { provide: CreatureSelectorsService, useValue: mockCreatureSelector },
      {
        provide: UISelectorsService,
        useValue: mockUISelector,
      },
      {
        provide: UIReducersService,
        useFactory: () => {
          mockUIReducers = {};
          Object.defineProperty(mockUIReducers, 'Fps', {
            set: jasmine.createSpy('Fps'),
          });
          return mockUIReducers;
        },
      },
    ],
    shallow: true,
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should render game info wrapper', () => {
    const element = spectator.query('#game-info-wrapper');

    expect(element).toBeTruthy();
  });

  it('should render population', fakeAsync(() => {
    spectator.tick();

    const element = spectator.query('#population');

    expect(element).toBeTruthy();
    expect(element).toHaveText('10', false);
  }));

  it('should render max population', fakeAsync(() => {
    spectator.tick();

    const element = spectator.query('#max-population');

    expect(element).toBeTruthy();
    expect(element).toHaveText('20', false);
  }));

  it('should render generation', fakeAsync(() => {
    spectator.tick();

    const element = spectator.query('#generation');

    expect(element).toBeTruthy();
    expect(element).toHaveText('100', false);
  }));

  describe('When handling game FPS', () => {
    it('should render current game FPS', fakeAsync(() => {
      spectator.tick();

      const element = spectator.query('#game-fps');

      expect(element).toHaveText('30', false);
    }));

    it('should trigger new FPS on change', fakeAsync(() => {
      spectator.tick();

      spectator.triggerEventHandler('#fps-slider', 'ngModelChange', 5);

      expect(
        Object.getOwnPropertyDescriptor(mockUIReducers, 'Fps')?.set
      ).toHaveBeenCalledOnceWith(5);
    }));
  });
});
