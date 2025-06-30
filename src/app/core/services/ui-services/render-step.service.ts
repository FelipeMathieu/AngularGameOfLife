import { Injectable } from '@angular/core';
import { CreatureReducersService } from '../creature-services/creature-reducers.service';
import { CreatureSelectorsService } from '../creature-services/creature-selectors.service';
import { clone, isEmpty, values } from 'lodash';
import { ICreature } from '../../stores/creatures-store';
import { VerifyCreaturesService } from '../creature-services/verify-creatures.service';
import { UIReducersService } from './ui-reducers.service';

@Injectable({
  providedIn: 'root',
})
export class RenderStepService {
  constructor(
    private readonly _creatureReducers: CreatureReducersService,
    private readonly _creatureSelectors: CreatureSelectorsService,
    private readonly _uiReducers: UIReducersService,
    private readonly _verifyCreatures: VerifyCreaturesService
  ) {}

  /**
   * Executes a single render step in the Game of Life simulation.
   *
   * - Iterates over all current creatures and verifies their next state (alive or dead).
   * - Detects any changes and marks affected creatures as dirty.
   * - Applies a batch update only for the changed creatures to optimize performance.
   * - Triggers the UI update to reflect the next generation.
   *
   * This method is side-effectful: it mutates the application state and advances the simulation.
   */
  public Run() {
    const cells = this._creatureSelectors.Creatures;
    const updatedCells: ICreature[] = [];

    values(cells).forEach((cell) => {
      const clonedCell = clone(cell);
      this._verifyCreatures.VerifyCreatureState(clonedCell);

      if (clonedCell.alive !== cell.alive) {
        clonedCell.dirty = true;
        updatedCells.push(clonedCell);
      }
    });

    if (!isEmpty(updatedCells)) {
      this._creatureReducers.BatchUpdate(updatedCells);
    }

    this._uiReducers.NextGeneration();
  }
}
