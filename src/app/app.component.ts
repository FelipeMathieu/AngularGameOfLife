import { Component, Self } from '@angular/core';
import { GameCardComponent } from './components/game-card/game-card.component';
import { GameInfoComponent } from './components/game-info/game-info.component';
import { GameFieldComponent } from './components/game-field/game-field.component';
import { GameControlsComponent } from './components/game-controls/game-controls.component';

@Component({
  selector: 'app-root',
  imports: [
    GameCardComponent,
    GameInfoComponent,
    GameFieldComponent,
    GameControlsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
