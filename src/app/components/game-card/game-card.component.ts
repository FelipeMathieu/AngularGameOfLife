import { Component } from '@angular/core';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-game-card',
  imports: [NzCardComponent, NzFlexDirective, NzTypographyModule],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss',
})
export class GameCardComponent {}
