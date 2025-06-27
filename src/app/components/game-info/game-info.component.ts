import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzStatisticComponent } from 'ng-zorro-antd/statistic';
import { Observable } from 'rxjs';
import { CreatureSelectorsService } from '../../core/services/creature-services/creature-selectors.service';
import { AsyncPipe } from '@angular/common';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { UISelectorsService } from '../../core/services/ui-services/ui-selectors.service';

@Component({
  selector: 'app-game-info',
  imports: [NzGridModule, NzStatisticComponent, AsyncPipe, NzCardComponent],
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameInfoComponent {
  protected readonly Population$!: Observable<number>;
  protected readonly MaxPopulation$!: Observable<number>;
  protected readonly Generations$!: Observable<number>;

  constructor(
    private readonly _creatureSelectors: CreatureSelectorsService,
    private readonly _uiSelectors: UISelectorsService
  ) {
    this.Population$ = this._creatureSelectors.Population$;
    this.MaxPopulation$ = this._creatureSelectors.MaxPopulation$;
    this.Generations$ = this._uiSelectors.Generations$;
  }
}
