import { Component } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { CanvasRenderService } from '../../core/services/ui-services/canvas-render.service';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import {
  ClearOutline,
  PauseOutline,
  PlayCircleOutline,
  StepForwardOutline,
} from '@ant-design/icons-angular/icons';
import { UISelectorsService } from '../../core/services/ui-services/ui-selectors.service';
import { UIReducersService } from '../../core/services/ui-services/ui-reducers.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, tap } from 'rxjs';
import { CreatureReducersService } from '../../core/services/creature-services/creature-reducers.service';
import { emitOnce } from '@ngneat/elf';
import { LetDirective } from '@ngrx/component';
import { AsyncPipe } from '@angular/common';

@UntilDestroy()
@Component({
  selector: 'app-game-controls',
  imports: [
    NzFlexModule,
    NzButtonComponent,
    NzIconModule,
    LetDirective,
    AsyncPipe,
  ],
  templateUrl: './game-controls.component.html',
  styleUrl: './game-controls.component.scss',
})
export class GameControlsComponent {
  protected readonly Running$!: Observable<boolean>;

  constructor(
    private readonly _canvasRender: CanvasRenderService,
    private readonly _iconService: NzIconService,
    private readonly _uiSelectors: UISelectorsService,
    private readonly _uiReducers: UIReducersService,
    private readonly _creatureReducers: CreatureReducersService
  ) {
    this._iconService.addIcon(
      ...[ClearOutline, PauseOutline, PlayCircleOutline, StepForwardOutline]
    );

    this.Running$ = this._uiSelectors.Running$;
    this._WatchRunning();
  }

  public OnClean() {
    emitOnce(() => {
      this._creatureReducers.Reset();
      this._uiReducers.Reset();
    });
  }

  public OnPlay() {
    this._uiReducers.Running = true;
  }

  public OnStop() {
    this._uiReducers.Running = false;
  }

  public OnStep() {
    this._canvasRender.animate(performance.now(), 1);
  }

  private _WatchRunning() {
    this._uiSelectors.Running$.pipe(
      untilDestroyed(this),
      tap((running) => {
        if (running) {
          this._canvasRender.start();
        } else {
          this._canvasRender.stop();
        }
      })
    ).subscribe();
  }
}
