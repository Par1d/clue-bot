import { Subject } from 'rxjs';
import { Card } from './card';

export class Player {
  public hasOneOf: Card[][] = [];
  public doesntHave: Card[] = [];
  public has: Card[] = [];
  public hasAdded = new Subject<Card>();

  constructor(public name: string) {}

  public passedOn(guess: Card[]) {
    for (let card of guess) {
      if (!this.doesntHave.includes(card)) {
        this.doesntHave.push(card);
      }
    }

    this.checkHas();
  }

  public showedOn(guess: Card[]) {
    this.hasOneOf.push(guess);
    this.checkHas();
  }

  public hasCard(card: Card) {
    if (!this.has.includes(card)) {
      this.has.push(card);
      this.checkHas();
    }
  }

  public doesntHaveCard(card: Card) {
    if (!this.doesntHave.includes(card)) {
      this.doesntHave.push(card);
      this.checkHas();
    }
  }

  public checkHas() {
    for (let guess of this.hasOneOf) {
      for (let i = 0; i < guess.length; i++) {
        const card = guess[i];
        if (this.doesntHave.includes(card)) {
          guess.splice(i, 1);
          i--;
        }
      }
    }

    for (let i = 0; i < this.hasOneOf.length; i++) {
      const guess = this.hasOneOf[i];
      if (guess.length === 1) {
        this.hasCard(guess[0]);
        this.hasAdded.next(guess[0]);
        this.hasOneOf.splice(i, 1);
        i--;
      }
    }

    for (let i = 0; i < this.hasOneOf.length; i++) {
      const guess = this.hasOneOf[i];
      if (guess.some((c) => this.has.includes(c))) {
        this.hasOneOf.splice(i, 1);
        i--;
      }
    }
  }
}
