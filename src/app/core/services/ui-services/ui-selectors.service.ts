import { Injectable } from '@angular/core';
import { gameUIStore } from '../../stores/game-ui-store';
import { select } from '@ngneat/elf';

@Injectable({
  providedIn: 'root',
})
export class UISelectorsService {
  constructor() {}

  public get Generations$() {
    return gameUIStore.pipe(select((state) => state.generations));
  }

  public get Running$() {
    return gameUIStore.pipe(select((state) => state.running));
  }

  public get Running() {
    return gameUIStore.query((state) => state.running);
  }

  public get Fps() {
    return gameUIStore.query((state) => state.fps);
  }

  public get Fps$() {
    return gameUIStore.pipe(select((state) => state.fps));
  }
}
