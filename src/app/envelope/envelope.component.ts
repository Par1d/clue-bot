import { Component, Input } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { Card } from '../card';

@Component({
  selector: 'app-envelope',
  templateUrl: './envelope.component.html',
})
export class EnvelopeComponent {
  @Input()
  public cards: Card[];
  public faEnvelope = faEnvelope;
}
