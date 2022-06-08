import { Card } from './card';
import { Player } from './player';

export class ClueBot {
  public players: Player[];
  public inEnvelope: Card[] = [];
  public undoStack: string[] = [];

  constructor(playerNames: string[]) {
    this.players = playerNames.map((n) => new Player(n));
    this.wireHasAdded();
  }

  public wireHasAdded(): void {
    for (let player of this.players) {
      const currentPlayer = player;
      player.hasAdded.subscribe((c) => {
        this.players
          .filter((p) => p !== currentPlayer)
          .forEach((p) => p.doesntHaveCard(c));
      });
    }
  }

  public playerPassedOn(id: string, guess: Card[]) {
    this.saveState();
    this.players.find((p) => p.name === id).passedOn([...guess]);
    this.checkInEnvelope();
  }

  public playerShowedOn(id: string, guess: Card[]) {
    this.saveState();
    this.players.find((p) => p.name === id).showedOn([...guess]);
    this.checkInEnvelope();
  }

  saveState() {
    if (this.undoStack.length >= 20) {
      this.undoStack.splice(0, 1);
    }

    this.undoStack.push(
      JSON.stringify(this.players, (key, value) =>
        key === 'hasAdded' ? undefined : value
      )
    );
  }

  undo() {
    if (this.undoStack.length > 0) {
      const state = JSON.parse(this.undoStack.pop()) as Player[];

      for (let playerState of state) {
        const player = this.players.find((p) => p.name === playerState.name);
        player.has = playerState.has;
        player.doesntHave = playerState.doesntHave;
        player.hasOneOf = playerState.hasOneOf;
      }

      this.checkInEnvelope();
    }
  }

  checkInEnvelope() {
    const combined = [...this.nobodyHas(), ...this.oneNotAccountedFor()];

    this.inEnvelope = combined.filter(
      (value, index, arr) => arr.indexOf(value) === index
    );
  }

  private nobodyHas() {
    const allDoesntHave = this.players
      .map((p) => p.doesntHave)
      .reduce((acc, value) => acc.concat(value), []);

    const grouped = allDoesntHave.reduce((acc, value) => {
      const existing = acc.find((i) => i.card === value);
      if (existing) {
        existing.count++;
      } else {
        acc.push({ card: value, count: 1 });
      }
      return acc;
    }, [] as { card: Card; count: number }[]);

    return grouped
      .filter((g) => g.count === this.players.length)
      .map((g) => g.card);
  }

  private oneNotAccountedFor() {
    const types = [
      {
        predicate: (card: Card) => card <= 5,
        count: 6,
      },
      {
        predicate: (card: Card) => card > 5 && card <= 11,
        count: 6,
      },
      {
        predicate: (card: Card) => card >= 12,
        count: 9,
      },
    ];

    const result = [];
    for (let type of types) {
      const has = this.players
        .map((p) => p.has)
        .reduce((acc, value) => acc.concat(value), [])
        .filter((c) => type.predicate(c));

      if (has.length === type.count - 1) {
        for (let card in Card) {
          let num = Number(card);
          if (type.predicate(num) && !has.includes(num)) {
            result.push(num);
          }
        }
      }
    }

    return result;
  }
}
