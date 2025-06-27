import { Injectable } from '@angular/core';
import { creaturesStore, TId } from '../stores/creatures-store';
import {
  getEntity,
  selectAllEntities,
  selectEntitiesCountByPredicate,
  selectEntity,
} from '@ngneat/elf-entities';

@Injectable({
  providedIn: 'root',
})
export class CreatureSelectorsService {
  constructor() {}

  public ById$(id: TId) {
    return creaturesStore.pipe(selectEntity(id));
  }

  public ById(id: TId) {
    return creaturesStore.query(getEntity(id));
  }

  public get Creatures$() {
    return creaturesStore.pipe(selectAllEntities());
  }

  public get Population$() {
    return creaturesStore.pipe(
      selectEntitiesCountByPredicate((creature) => creature.alive)
    );
  }
}
