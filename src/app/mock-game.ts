import { Card } from './card';
import { ClueBot } from './clue-bot';

export class MockGame {
  constructor(
    public bot: ClueBot,
    private players: { id: string; cards: Card[] }[]
  ) {}

  playerGuesses(id: string, guess: Card[]) {
    const playerIndex = this.players.findIndex((p) => p.id === id);
    let index = playerIndex === this.players.length - 1 ? 0 : playerIndex + 1;

    while (index !== playerIndex) {
      const player = this.players[index];

      if (player.cards.some((c) => guess.includes(c))) {
        this.bot.playerShowedOn(player.id, guess);
        return;
      } else {
        this.bot.playerPassedOn(player.id, guess);
      }

      index = index === this.players.length - 1 ? 0 : index + 1;
    }
  }
}
