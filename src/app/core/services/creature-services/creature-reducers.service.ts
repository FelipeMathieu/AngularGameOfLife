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

  /**
   * Inserts or updates a list of creatures in the store.
   * If a creature already exists, it will be updated; otherwise, it will be added.
   */
  public BatchUpdate(creatures: ICreature[]) {
    creaturesStore.update(upsertEntities(creatures));
  }

  /**
   * Updates an existing creature in the store by its ID.
   * Only updates if the creature already exists.
   */
  public UpdateCreature(creature: ICreature) {
    creaturesStore.update(updateEntities(creature.id, creature));
  }

  /**
   * Updates the maximum population value in the store.
   */
  public UpdateMaxPopulation(value: number) {
    creaturesStore.update((state) => ({
      ...state,
      maxPopulation: value,
    }));
  }

  /**
   * Resets all living creatures to a dead and dirty state.
   * Then performs a batch update and resets maxPopulation to 0.
   */
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
