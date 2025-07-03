import { FPS } from '../../../common/constants';
import { gameUIStore } from '../../stores/game-ui-store';
import { UIReducersService } from './ui-reducers.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

describe('UiReducersService', () => {
  let spectator: SpectatorService<UIReducersService>;
  const createService = createServiceFactory({
    service: UIReducersService,
  });

  const updateRunningStateAndMakeSureItHasBeenUpdated = () => {
    const running = true;

    spectator.service.Running = running;

    expect(gameUIStore.getValue().running).toBeTrue();
  };

  beforeEach(() => {
    spectator = createService();
    spectator.service.Reset();
  });

  it('should update the "Fps" state', () => {
    const fps = 15;

    spectator.service.Fps = fps;

    expect(gameUIStore.getValue().fps).toBe(fps);
  });

  it('should update the "running" state', () => {
    updateRunningStateAndMakeSureItHasBeenUpdated();
  });

  it('should update the "generations" state', () => {
    spectator.service.NextGeneration();

    expect(gameUIStore.getValue().generations).toBe(1);
  });

  it('should reset the store', () => {
    updateRunningStateAndMakeSureItHasBeenUpdated();

    spectator.service.Reset();

    const { fps, generations, running } = gameUIStore.getValue();

    expect(fps).toBe(FPS);
    expect(generations).toBe(0);
    expect(running).toBeFalse();
  });
});
