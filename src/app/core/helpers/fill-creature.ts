import { CELL_SIZE } from '../../common/constants';
import { ICreature } from '../stores/creatures-store';

export const fillCreature = (
  creature: ICreature,
  context: CanvasRenderingContext2D
) => {
  if (context) {
    context.fillStyle = creature.alive ? 'black' : 'white';

    context.fillRect(
      creature.x * CELL_SIZE,
      creature.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );

    context.strokeStyle = 'gray';
    context.strokeRect(
      creature.x * CELL_SIZE,
      creature.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
  }
};
