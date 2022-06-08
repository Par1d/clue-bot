import { Component } from '@angular/core';
import { faUndo } from '@fortawesome/free-solid-svg-icons/faUndo';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons/faUserSecret';
import { Card } from './card';
import { ClueBot } from './clue-bot';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public faUserSecret = faUserSecret;
  public faUndo = faUndo;

  public guess: Card[] = [null, null, null];

  public bot = new ClueBot(['Michaela', 'LaRae', 'Mike']);

  playerPasses(id: string) {
    this.bot.playerPassedOn(id, this.guess);
  }

  playerShows(id: string) {
    this.bot.playerShowedOn(id, this.guess);
  }

  undo() {
    this.bot.undo();
  }
}
