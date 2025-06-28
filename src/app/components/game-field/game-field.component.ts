import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CELL_SIZE, FIELD_SIZE } from '../../common/constants';
import { CreatureReducersService } from '../../core/services/creature-services/creature-reducers.service';
import { CreatureSelectorsService } from '../../core/services/creature-services/creature-selectors.service';
import { map, tap } from 'rxjs';
import { fillCreature } from '../../core/helpers/fill-creature';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ICreature, TId } from '../../core/stores/creatures-store';
import { UISelectorsService } from '../../core/services/ui-services/ui-selectors.service';

@UntilDestroy()
@Component({
  selector: 'app-game-field',
  imports: [],
  templateUrl: './game-field.component.html',
  styleUrl: './game-field.component.scss',
})
export class GameFieldComponent implements AfterViewInit {
  protected FieldSize = FIELD_SIZE * CELL_SIZE;

  @ViewChild('gameField', { static: true })
  private readonly _canvasRef!: ElementRef<HTMLCanvasElement>;

  private _context!: CanvasRenderingContext2D;

  constructor(
    private readonly _creatureReducers: CreatureReducersService,
    private readonly _creatureSelectors: CreatureSelectorsService,
    private readonly _uiSelectors: UISelectorsService
  ) {}

  ngAfterViewInit(): void {
    const canvas = this._canvasRef.nativeElement;
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Failed to get 2D context from canvas.');
    }

    this._context = context;
    this._ObserveCreatures();
    this._WatchMaxPopulation();
  }

  public CellClick(event: MouseEvent) {
    const running = this._uiSelectors.Running;

    if (!this._canvasRef || running) {
      return;
    }

    const rect = this._canvasRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const cellX = Math.floor(x / CELL_SIZE);
    const cellY = Math.floor(y / CELL_SIZE);

    const cell = this._creatureSelectors.ById(`${cellX},${cellY}`);

    if (cell) {
      if (cell.alive) cell.alive = false;
      else cell.alive = true;

      cell.dirty = true;

      this._creatureReducers.UpdateCreature(cell);
    }
  }

  public HandleCreatures(creatures: ICreature[]) {
    creatures.forEach((creature) => {
      fillCreature(creature, this._context);
      creature.dirty = false;
    });

    this._creatureReducers.BatchUpdate(creatures);
  }

  private _ObserveCreatures() {
    this._creatureSelectors.Creatures$.pipe(
      untilDestroyed(this),
      map((creatures) => creatures.filter((cell) => cell.dirty)),
      tap(this.HandleCreatures.bind(this))
    ).subscribe();
  }

  private _WatchMaxPopulation() {
    this._creatureSelectors.MaxPopulationAndPopulation$.pipe(
      untilDestroyed(this),
      tap(([population, maxPopulation]) => {
        if (population > maxPopulation) {
          this._creatureReducers.UpdateMaxPopulation(population);
        }
      })
    ).subscribe();
  }
}
