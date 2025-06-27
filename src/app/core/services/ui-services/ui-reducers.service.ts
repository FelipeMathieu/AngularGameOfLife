import { Injectable } from '@angular/core';
import { gameUIStore } from '../../stores/game-ui-store';
import { FPS } from '../../../common/constants';

@Injectable({
  providedIn: 'root',
})
export class UIReducersService {
  constructor() {}

  public set Fps(value: number) {
    gameUIStore.update((state) => ({
      ...state,
      fps: value,
    }));
  }

  public set Running(value: boolean) {
    gameUIStore.update((state) => ({
      ...state,
      running: value,
    }));
  }

  public NextGeneration() {
    gameUIStore.update((state) => ({
      ...state,
      generations: state.generations + 1,
    }));
  }

  public Reset() {
    gameUIStore.update(() => ({
      fps: FPS,
      generations: 0,
      running: false,
    }));
  }
}
