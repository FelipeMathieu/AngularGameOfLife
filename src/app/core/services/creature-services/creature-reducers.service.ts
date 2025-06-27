import { Injectable } from '@angular/core';
import { creaturesStore, ICreature } from '../../stores/creatures-store';
import { updateEntities, upsertEntities } from '@ngneat/elf-entities';
import { emitOnce } from '@ngneat/elf';
import { values } from 'lodash';

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

  public Reset() {
    const livingCreatures = values(
      creaturesStore.query((state) => state.entities)
    ).filter((cell) => cell.alive);

    livingCreatures.forEach((cell) => {
      cell.alive = false;
      cell.dirty = true;
    });

    emitOnce(() => {
      this.BatchUpdate(livingCreatures);
      creaturesStore.update((state) => ({
        ...state,
        maxPopulation: 0,
      }));
    });
  }
}
