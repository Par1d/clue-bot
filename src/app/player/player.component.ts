import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '../player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
})
export class PlayerComponent {
  @Input() player: Player;
  @Output() pass = new EventEmitter();
  @Output() show = new EventEmitter();
}
