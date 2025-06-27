import { Injectable } from '@angular/core';
import { creaturesStore, ICreature, TId } from '../stores/creatures-store';
import {
  getAllEntities,
  updateEntities,
  upsertEntities,
} from '@ngneat/elf-entities';
import { fillCreature } from '../helpers/fill-creature';

@Injectable()
export class CreatureReducersService {
  constructor() {}

  public BatchUpdate(creatures: ICreature[]) {
    creaturesStore.update(upsertEntities(creatures));
  }

  public UpdateCreature(creature: ICreature) {
    creaturesStore.update(updateEntities(creature.id, creature));
  }
}
