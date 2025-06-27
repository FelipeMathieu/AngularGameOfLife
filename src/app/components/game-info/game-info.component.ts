import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzStatisticComponent } from 'ng-zorro-antd/statistic';
import { Observable } from 'rxjs';
import { CreatureSelectorsService } from '../../core/services/creature-services/creature-selectors.service';
import { AsyncPipe } from '@angular/common';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { UISelectorsService } from '../../core/services/ui-services/ui-selectors.service';
import { NzSliderComponent } from 'ng-zorro-antd/slider';
import { FormsModule } from '@angular/forms';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { FPS } from '../../common/constants';
import { UIReducersService } from '../../core/services/ui-services/ui-reducers.service';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'app-game-info',
  imports: [
    NzGridModule,
    NzStatisticComponent,
    AsyncPipe,
    NzCardComponent,
    NzSliderComponent,
    FormsModule,
    NzFlexModule,
    NzTypographyModule,
    AsyncPipe,
    LetDirective,
  ],
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameInfoComponent {
  protected readonly Population$!: Observable<number>;
  protected readonly MaxPopulation$!: Observable<number>;
  protected readonly Generations$!: Observable<number>;
  protected readonly Fps$!: Observable<number>;
  protected readonly MaxFps = FPS;

  constructor(
    private readonly _creatureSelectors: CreatureSelectorsService,
    private readonly _uiSelectors: UISelectorsService,
    private readonly _uiReducers: UIReducersService
  ) {
    this.Population$ = this._creatureSelectors.Population$;
    this.MaxPopulation$ = this._creatureSelectors.MaxPopulation$;
    this.Generations$ = this._uiSelectors.Generations$;
    this.Fps$ = this._uiSelectors.Fps$;
  }

  public OnChange(value: number) {
    this._uiReducers.Fps = value;
  }
}
