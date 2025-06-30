import { Injectable } from '@angular/core';
import { gameUIStore } from '../../stores/game-ui-store';
import { select } from '@ngneat/elf';

@Injectable({
  providedIn: 'root',
})
export class UISelectorsService {
  constructor() {}

  /**
   * Observable stream of the current generation count from the game UI state.
   * Emits a new value whenever the generation count changes.
   */
  public get Generations$() {
    return gameUIStore.pipe(select((state) => state.generations));
  }

  /**
   * Observable stream indicating whether the game is running.
   * Emits updates whenever the running state changes.
   */
  public get Running$() {
    return gameUIStore.pipe(select((state) => state.running));
  }

  /**
   * Returns the current running state of the game synchronously.
   */
  public get Running() {
    return gameUIStore.query((state) => state.running);
  }

  /**
   * Returns the current FPS (frames per second) value synchronously from the game UI state.
   */
  public get Fps() {
    return gameUIStore.query((state) => state.fps);
  }

  /**
   * Observable stream of the FPS value from the game UI state.
   * Emits updates whenever the FPS changes.
   */
  public get Fps$() {
    return gameUIStore.pipe(select((state) => state.fps));
  }
}
