import { CELL_SIZE } from '../../common/constants';
import { ICreature } from '../stores/creatures-store';

/**
 * Draws a single creature on the given canvas context.
 * Fills the cell with black if the creature is alive, white if dead,
 * and draws a gray border around the cell.
 *
 * @param creature The creature object containing position and alive status.
 * @param context The 2D rendering context of the canvas where the creature will be drawn.
 */
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
