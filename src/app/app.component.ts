import { Component, OnInit, signal, Type } from '@angular/core';
import { GameCardComponent } from './components/game-card/game-card.component';
import { GameInfoComponent } from './components/game-info/game-info.component';
import { GameControlsComponent } from './components/game-controls/game-controls.component';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { NgComponentOutlet } from '@angular/common';
import { GameFieldComponent } from './components/game-field/game-field.component';

@Component({
  selector: 'app-root',
  imports: [
    GameCardComponent,
    GameInfoComponent,
    GameControlsComponent,
    NzFlexModule,
    NzSpinComponent,
    NgComponentOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  protected FieldComponent = signal<Type<GameFieldComponent> | null>(null);

  constructor() {}

  ngOnInit(): void {
    this._LoadField();
  }

  private async _LoadField() {
    const { GameFieldComponent } = await import(
      './components/game-field/game-field.component'
    );

    this.FieldComponent.set(GameFieldComponent);
  }
}
