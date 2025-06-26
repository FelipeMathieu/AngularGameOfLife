import { Component } from '@angular/core';
import { GameCardComponent } from './components/game-card/game-card.component';
import { GameInfoComponent } from './components/game-info/game-info.component';

@Component({
  selector: 'app-root',
  imports: [GameCardComponent, GameInfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
