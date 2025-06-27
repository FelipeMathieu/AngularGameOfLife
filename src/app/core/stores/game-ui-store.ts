import { createStore, withProps } from '@ngneat/elf';
import { FPS } from '../../common/constants';

export interface IGameUI {
  running: boolean;
  fps: number;
  generations: number;
}

export const gameUIStore = createStore(
  {
    name: 'Game UI',
  },
  withProps<IGameUI>({ fps: FPS, running: false, generations: 0 })
);
