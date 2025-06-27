import {
  AfterViewInit,
  Component,
  ElementRef,
  Self,
  ViewChild,
} from '@angular/core';
import { CELL_SIZE, FIELD_SIZE } from '../../common/constants';
import { CreatureReducersService } from '../../core/services/creature-reducers.service';
import { CreatureSelectorsService } from '../../core/services/creature-selectors.service';
import { map, tap } from 'rxjs';
import { fillCreature } from '../../core/helpers/fill-creature';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ICreature, TId } from '../../core/stores/creatures-store';

@UntilDestroy()
@Component({
  selector: 'app-game-field',
  imports: [],
  providers: [CreatureReducersService],
  templateUrl: './game-field.component.html',
  styleUrl: './game-field.component.scss',
})
export class GameFieldComponent implements AfterViewInit {
  protected FieldSize = FIELD_SIZE * CELL_SIZE;

  @ViewChild('gameField', { static: true })
  private readonly _canvasRef!: ElementRef<HTMLCanvasElement>;

  private _context!: CanvasRenderingContext2D;

  constructor(
    @Self() private readonly _creatureReducers: CreatureReducersService,
    private readonly _creatureSelectors: CreatureSelectorsService
  ) {}

  ngAfterViewInit(): void {
    const canvas = this._canvasRef.nativeElement;
    const context = canvas.getContext('2d');

    if (!context) {
      console.error('Failed to get 2D context from canvas.');
      return;
    }

    this._context = context;
    this._ObserveCreatures();
  }

  public CellClick(event: MouseEvent) {
    if (!this._canvasRef) {
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
}
