import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { ComicbooksHttpClient } from './services/comicbooks-http-client';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { PublishersComponent } from './components/publishers/publishers.component';
import { ComicbooksComponent } from './components/comicbooks/comicbooks.component';
import { ComicbookComponent } from './components/comicbook/comicbook.component';
import { HeroComponent } from './components/hero/hero.component';
import { PublisherComponent } from './components/publisher/publisher.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { ContentTemplate } from './components/search-page/content-template.directive';
import { HeaderTemplate } from './components/search-page/header-template.directive';
import { ExecutePipe } from './common/execute.directive';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    ComicbooksComponent,
    ComicbookComponent,
    HeroesComponent,
    HeroComponent,
    PublishersComponent,
    PublisherComponent,
    SearchPageComponent,
    HeaderTemplate,
    ContentTemplate,
    ExecutePipe,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ComicbooksHttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {
}
