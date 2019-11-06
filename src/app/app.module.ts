import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FormsModule} from '@angular/forms';
import { PublishersComponent } from './components/publishers/publishers.component';
import { PublisherDetailsComponent } from './components/publisher-details/publisher-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PublishersComponent,
    PublisherDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
