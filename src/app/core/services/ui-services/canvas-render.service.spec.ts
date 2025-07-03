import { CanvasRenderService } from './canvas-render.service';
import {
  createServiceFactory,
  createSpyObject,
  SpectatorService,
} from '@ngneat/spectator';
import { UISelectorsService } from './ui-selectors.service';
import { UIReducersService } from './ui-reducers.service';
import { RenderStepService } from './render-step.service';
import { fakeAsync, tick } from '@angular/core/testing';

const mockRunningSet = jasmine.createSpy();
const mockRun = jasmine.createSpy();

const mockUISelectorsService = createSpyObject(UISelectorsService);
const mockUIReducersService = createSpyObject(UIReducersService, {
  Running: mockRunningSet,
});
const mockRenderStepService = createSpyObject(RenderStepService, {
  Run: mockRun,
});

describe('CanvasRenderService', () => {
  let spectator: SpectatorService<CanvasRenderService>;
  const createService = createServiceFactory({
    service: CanvasRenderService,
    providers: [
      {
        provide: UISelectorsService,
        useValue: mockUISelectorsService,
      },
      {
        provide: UIReducersService,
        useValue: mockUIReducersService,
      },
      {
        provide: RenderStepService,
        useValue: mockRenderStepService,
      },
    ],
  });

  let spyRequestAnimationFrame: jasmine.Spy<
    ((callback: FrameRequestCallback) => number) &
      ((callback: FrameRequestCallback) => number)
  >;
  let spyCancelAnimationFrame: jasmine.Spy<
    ((handle: number) => void) & ((handle: number) => void)
  >;

  beforeEach(() => {
    spectator = createService();

    Object.defineProperty(mockUISelectorsService, 'Fps', { get: () => 1 });
  });

  afterEach(() => {
    mockRunningSet.calls.reset();
    mockRun.calls.reset();
  });

  describe('When the game is running', () => {
    let rafCallback: FrameRequestCallback;

    beforeEach(() => {
      spyRequestAnimationFrame = spyOn(
        window,
        'requestAnimationFrame'
      ).and.callFake((cb: FrameRequestCallback) => {
        rafCallback = cb;
        return 1;
      });
      spyCancelAnimationFrame = spyOn(
        window,
        'cancelAnimationFrame'
      ).and.callFake(() => {});

      Object.defineProperty(mockUISelectorsService, 'Running', {
        get: () => true,
      });
    });

    it('should trigger request animation frame and stop it', fakeAsync(() => {
      spectator.service.start();
      tick();

      expect(spyRequestAnimationFrame).toHaveBeenCalledTimes(1);

      spectator.service.stop();
      tick();

      expect(spyCancelAnimationFrame).toHaveBeenCalledTimes(1);
    }));

    it('should manually animate', () => {
      spectator.service.animate(performance.now(), 5);

      for (let i = 1; i <= 5; i++) {
        rafCallback(performance.now() + i * 1000);
      }

      expect(mockRun).toHaveBeenCalledTimes(5);
    });
  });
});
