import { Injectable } from '@angular/core';
import { gameUIStore } from '../../stores/game-ui-store';
import { FPS } from '../../../common/constants';

@Injectable({
  providedIn: 'root',
})
export class UIReducersService {
  constructor() {}

  /**
   * Sets the frames per second (FPS) value in the game UI state.
   * @param value The new FPS value to set.
   */
  public set Fps(value: number) {
    gameUIStore.update((state) => ({
      ...state,
      fps: value,
    }));
  }

  /**
   * Sets whether the game is currently running or paused in the UI state.
   * @param value Boolean indicating if the game is running (true) or stopped (false).
   */
  public set Running(value: boolean) {
    gameUIStore.update((state) => ({
      ...state,
      running: value,
    }));
  }

  /**
   * Advances the game to the next generation by incrementing the generation counter.
   */
  public NextGeneration() {
    gameUIStore.update((state) => ({
      ...state,
      generations: state.generations + 1,
    }));
  }

  /**
   * Resets the game UI state to its initial default values:
   * - FPS set to the default constant
   * - Generation counter reset to zero
   * - Game marked as not running (paused)
   */
  public Reset() {
    gameUIStore.update(() => ({
      fps: FPS,
      generations: 0,
      running: false,
    }));
  }
}
