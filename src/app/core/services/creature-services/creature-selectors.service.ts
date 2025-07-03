import { Injectable } from '@angular/core';
import { creaturesStore, ICreature, TId } from '../../stores/creatures-store';
import {
  getEntity,
  selectAllEntities,
  selectEntitiesCountByPredicate,
  selectEntity,
} from '@ngneat/elf-entities';
import { combineLatest, Observable } from 'rxjs';
import { select } from '@ngneat/elf';
import { values } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class CreatureSelectorsService {
  constructor() {}

  /**
   * Returns an observable of a creature entity by ID.
   * Emits new values when the entity changes in the store.
   */
  public ById$(id: TId): Observable<ICreature | undefined> {
    return creaturesStore.pipe(selectEntity(id));
  }

  /**
   * Synchronously retrieves a creature entity by ID from the store.
   */
  public ById(id: TId): ICreature | undefined {
    return creaturesStore.query(getEntity(id));
  }

  /**
   * Synchronously returns all creature entities as an array.
   */
  public get Creatures(): ICreature[] {
    return values(creaturesStore.query((state) => state.entities));
  }

  /**
   * Returns an observable of all creature entities.
   * Emits whenever any entity changes.
   */
  public get Creatures$(): Observable<ICreature[]> {
    return creaturesStore.pipe(selectAllEntities());
  }

  /**
   * Returns an observable with the count of alive creatures.
   */
  public get Population$(): Observable<number> {
    return creaturesStore.pipe(
      selectEntitiesCountByPredicate((creature) => creature.alive)
    );
  }

  /**
   * Returns an observable of the maximum population value from the store.
   */
  public get MaxPopulation$(): Observable<number> {
    return creaturesStore.pipe(select((state) => state.maxPopulation));
  }

  /**
   * Combines Population$ and MaxPopulation$ into a single observable.
   * Useful for displaying current vs. max population in the UI.
   */
  public get MaxPopulationAndPopulation$(): Observable<[number, number]> {
    return combineLatest([this.Population$, this.MaxPopulation$]);
  }
}
