import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { GuessControlComponent } from './guess-control/guess-control.component';
import { CardPipe } from './card.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EnvelopeComponent } from './envelope/envelope.component';

@NgModule({
  imports: [BrowserModule, FormsModule, FontAwesomeModule],
  declarations: [
    AppComponent,
    PlayerComponent,
    GuessControlComponent,
    CardPipe,
    EnvelopeComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
