import { Injectable } from '@angular/core';
import { ICreature } from '../../stores/creatures-store';
import { CreatureNeighborsService } from './creature-neighbors.service';

@Injectable({
  providedIn: 'root',
})
export class VerifyCreaturesService {
  constructor(private readonly _creatureNeighbors: CreatureNeighborsService) {}

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
