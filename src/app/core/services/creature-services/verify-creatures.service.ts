import { Injectable } from '@angular/core';
import { ICreature } from '../../stores/creatures-store';
import { CreatureNeighborsService } from './creature-neighbors.service';

@Injectable({
  providedIn: 'root',
})
export class VerifyCreaturesService {
  constructor(private readonly _creatureNeighbors: CreatureNeighborsService) {}

  /**
   * Updates the state of a single creature (cell) based on the number of living neighbors.
   * Implements Conway's Game of Life rules:
   *  - Any live cell with fewer than 2 or more than 3 live neighbors dies.
   *  - Any live cell with 2 or 3 live neighbors stays alive.
   *  - Any dead cell with exactly 3 live neighbors becomes alive.
   *
   * @param cell The creature (cell) whose state should be verified and possibly updated.
   */
  public VerifyCreatureState(cell: ICreature) {
    const cellNeighbors = this._creatureNeighbors.GetNeighbors(cell);
    const livingNeighbors = cellNeighbors.filter((cell) => cell.alive).length;

    switch (cell.alive) {
      case true: {
        if (livingNeighbors < 2 || livingNeighbors > 3) {
          cell.alive = false;

          break;
        }

        cell.alive = true;
        break;
      }
      default: {
        if (livingNeighbors === 3) {
          cell.alive = true;
        }

        break;
      }
    }
  }
}
