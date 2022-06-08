import { Pipe, PipeTransform } from '@angular/core';
import { Card } from './card';

@Pipe({
  name: 'card',
  pure: false,
})
export class CardPipe implements PipeTransform {
  transform(value: Card | Card[], args?: any): any {
    if (value === undefined || value === null) {
      return null;
    }

    if (Array.isArray(value)) {
      return value.map((c) => Card[c].replace('_', ' ')).join(', ');
    } else {
      return Card[value].replace('_', ' ');
    }
  }
}
