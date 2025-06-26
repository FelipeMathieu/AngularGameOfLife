import { Injectable } from '@angular/core';
import { TId } from '../../common/types';
import { creaturesStore } from '../stores/creatures-store';
import {
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

  public Creatures$() {
    return creaturesStore.pipe(selectAllEntities());
  }

  public Population$() {
    return creaturesStore.pipe(
      selectEntitiesCountByPredicate((creature) => creature.Alive)
    );
  }
}
