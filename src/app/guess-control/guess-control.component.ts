import { Component, Input } from '@angular/core';
import { faQuestion } from '@fortawesome/free-solid-svg-icons/faQuestion';
import { Card } from '../card';

@Component({
  selector: 'app-guess-control',
  templateUrl: './guess-control.component.html',
})
export class GuessControlComponent {
  public readonly people = [
    Card.Col_Mustard,
    Card.Prof_Plum,
    Card.Mr_Green,
    Card.Mrs_Peacock,
    Card.Miss_Scarlett,
    Card.Mrs_White,
  ];

  public readonly weapons = [
    Card.Knife,
    Card.Candlestick,
    Card.Revolver,
    Card.Rope,
    Card.Lead_Pipe,
    Card.Wrench,
  ];

  public readonly rooms = [
    Card.Hall,
    Card.Lounge,
    Card.Dining_Room,
    Card.Kitchen,
    Card.Ball_Room,
    Card.Conservatory,
    Card.Billiard_Room,
    Card.Library,
    Card.Study,
  ];

  @Input()
  public guess: Card[];
  public faQuestion = faQuestion;
}
