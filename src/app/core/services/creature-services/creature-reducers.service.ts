import { Injectable } from '@angular/core';
import { creaturesStore, ICreature } from '../../stores/creatures-store';
import { updateEntities, upsertEntities } from '@ngneat/elf-entities';

@Injectable({
  providedIn: 'root',
})
export class CreatureReducersService {
  constructor() {}

  public BatchUpdate(creatures: ICreature[]) {
    creaturesStore.update(upsertEntities(creatures));
  }

  public UpdateCreature(creature: ICreature) {
    creaturesStore.update(updateEntities(creature.id, creature));
  }

  public UpdateMaxPopulation(value: number) {
    creaturesStore.update((state) => ({
      ...state,
      maxPopulation: value,
    }));
  }
}
