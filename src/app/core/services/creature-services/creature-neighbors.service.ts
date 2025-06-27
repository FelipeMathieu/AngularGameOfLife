import { Injectable } from '@angular/core';
import { ICreature } from '../../stores/creatures-store';
import { FIELD_SIZE } from '../../../common/constants';
import { CreatureSelectorsService } from './creature-selectors.service';

const topOrLeftEdge = 0;
const bottomOrRightEdge = FIELD_SIZE - 1;

@Injectable({
  providedIn: 'root',
})
export class CreatureNeighborsService {
  constructor(private readonly _creatureSelectors: CreatureSelectorsService) {}

  /**
   * A function that returns the giving creature
   */
  public GetNeighbors(cell: ICreature) {
    return [
      ...this._GetUpstairsNeighbors(cell),
      ...this._GetSideNeighbors(cell),
      ...this._GetDownstairsNeighbors(cell),
    ];
  }

  private _UpstairsNeighbor(cell: ICreature) {
    const newY = cell.y - 1;
    const x = cell.x;
    const y = newY < topOrLeftEdge ? bottomOrRightEdge : newY;

    return this._creatureSelectors.ById(`${x},${y}`)!;
  }

  private _DownstairsNeighbor(cell: ICreature) {
    const newY = cell.y + 1;
    const x = cell.x;
    const y = newY > bottomOrRightEdge ? topOrLeftEdge : newY;

    return this._creatureSelectors.ById(`${x},${y}`)!;
  }

  private _NeighborOnTheRight(cell: ICreature) {
    const newX = cell.x + 1;
    const x = newX > bottomOrRightEdge ? topOrLeftEdge : newX;
    const y = cell.y;

    return this._creatureSelectors.ById(`${x},${y}`)!;
  }

  private _NeighborOnTheLeft(cell: ICreature) {
    const newX = cell.x - 1;
    const x = newX < topOrLeftEdge ? bottomOrRightEdge : newX;
    const y = cell.y;

    return this._creatureSelectors.ById(`${x},${y}`)!;
  }

  private _GetUpstairsNeighbors(cell: ICreature) {
    const top = this._UpstairsNeighbor(cell);
    const northeast = this._NeighborOnTheRight(top);
    const northwest = this._NeighborOnTheLeft(top);

    return [top, northeast, northwest];
  }

  private _GetSideNeighbors = (cell: ICreature) => {
    const left = this._NeighborOnTheLeft(cell);
    const right = this._NeighborOnTheRight(cell);

    return [left, right];
  };

  private _GetDownstairsNeighbors(cell: ICreature) {
    const bottom = this._DownstairsNeighbor(cell);
    const southeast = this._NeighborOnTheRight(bottom);
    const southwest = this._NeighborOnTheLeft(bottom);

    return [bottom, southeast, southwest];
  }
}
