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

  public Run() {
    const cells = this._creatureSelectors.Creatures;
    const updatedCells: ICreature[] = [];

    values(cells).forEach((cell) => {
      const clonedCell = clone(cell);
      this._verifyCreatures.VerifyCreatureState(clonedCell);

      if (clonedCell.alive !== cell.alive) {
        updatedCells.push(clonedCell);
      }
    });

    if (!isEmpty(updatedCells)) {
      this._creatureReducers.BatchUpdate(updatedCells);
    }

    this._uiReducers.NextGeneration();
  }
}
