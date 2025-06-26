import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzStatisticComponent } from 'ng-zorro-antd/statistic';
import { Observable } from 'rxjs';
import { CreatureSelectorsService } from '../../core/services/creature-selectors.service';
import { AsyncPipe } from '@angular/common';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-game-info',
  imports: [NzGridModule, NzStatisticComponent, AsyncPipe, NzCardComponent],
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameInfoComponent {
  protected readonly Population$: Observable<number>;

  constructor(private readonly _CreatureSelectors: CreatureSelectorsService) {
    this.Population$ = this._CreatureSelectors.Population$();
  }
}
