import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { UISelectorsService } from './ui-selectors.service';
import { gameUIStore } from '../../stores/game-ui-store';
import { fakeAsync, tick } from '@angular/core/testing';
import { take, tap } from 'rxjs';

const FPS = 30;
const GENERATIONS = 1;

describe('UiSelectorsService', () => {
  let spectator: SpectatorService<UISelectorsService>;
  const createService = createServiceFactory({
    service: UISelectorsService,
  });

  beforeEach(() => {
    gameUIStore.update(() => ({
      fps: FPS,
      generations: GENERATIONS,
      running: true,
    }));

    spectator = createService();
  });

  it('should get "running" state synchronously', () => {
    const running = spectator.service.Running;

    expect(running).toBeTrue();
  });

  it('should get updated "running" state synchronously', () => {
    expect(spectator.service.Running).toBeTrue();

    gameUIStore.update((state) => ({
      ...state,
      running: false,
    }));

    expect(spectator.service.Running).toBeFalse();
  });

  it('should take "running" state asynchronously', () => {
    const running$ = spectator.service.Running$;

    running$
      .pipe(
        take(1),
        tap((running) => {
          expect(running).toBeTrue();
        })
      )
      .subscribe();
  });

  it('should take updated "running" state asynchronously', fakeAsync(() => {
    const running$ = spectator.service.Running$;

    running$
      .pipe(
        take(1),
        tap((running) => {
          expect(running).toBeTrue();
        })
      )
      .subscribe();

    gameUIStore.update((state) => ({
      ...state,
      running: false,
    }));

    tick();

    running$
      .pipe(
        take(1),
        tap((running) => {
          expect(running).toBeFalse();
        })
      )
      .subscribe();
  }));

  it('should get the "FPS" state synchronously', () => {
    expect(spectator.service.Fps).toBe(FPS);
  });

  it('should get the updated "FPS" state synchronously', () => {
    const newFps = 10;
    expect(spectator.service.Fps).toBe(FPS);

    gameUIStore.update((state) => ({
      ...state,
      fps: newFps,
    }));

    expect(spectator.service.Fps).toBe(newFps);
  });

  it('should take the "FPS" state asynchronously', () => {
    const fps$ = spectator.service.Fps$;

    fps$
      .pipe(
        take(1),
        tap((fps) => {
          expect(fps).toBe(FPS);
        })
      )
      .subscribe();
  });

  it('should take the updated "FPS" state asynchronously', fakeAsync(() => {
    const newFps = 10;
    const fps$ = spectator.service.Fps$;

    fps$
      .pipe(
        take(1),
        tap((fps) => {
          expect(fps).toBe(FPS);
        })
      )
      .subscribe();

    gameUIStore.update((state) => ({
      ...state,
      fps: newFps,
    }));

    tick();

    fps$
      .pipe(
        take(1),
        tap((fps) => {
          expect(fps).toBe(newFps);
        })
      )
      .subscribe();
  }));

  it('should take the "generations" state asynchronously', () => {
    const generations$ = spectator.service.Generations$;

    generations$
      .pipe(
        take(1),
        tap((generations) => {
          expect(generations).toBe(GENERATIONS);
        })
      )
      .subscribe();
  });

  it('should take the updated "generations" state asynchronously', fakeAsync(() => {
    const newGenerations = 20;
    const generations$ = spectator.service.Generations$;

    generations$
      .pipe(
        take(1),
        tap((generations) => {
          expect(generations).toBe(GENERATIONS);
        })
      )
      .subscribe();

    gameUIStore.update((state) => ({
      ...state,
      generations: newGenerations,
    }));

    tick();

    generations$
      .pipe(
        take(1),
        tap((generations) => {
          expect(generations).toBe(newGenerations);
        })
      )
      .subscribe();
  }));
});
