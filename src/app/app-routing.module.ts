import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Publisher} from './model/publisher';
import { PublishersComponent } from './components/publishers/publishers.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { ComicbooksComponent } from './components/comicbooks/comicbooks.component';
import { ComicbookComponent } from './components/comicbook/comicbook.component';
import { HeroComponent } from './components/hero/hero.component';
import { PublisherComponent } from './components/publisher/publisher.component';

const routes: Routes = [
  {path: '', redirectTo: '/comicbooks', pathMatch: 'full'},
  {path: 'comicbooks', component: ComicbooksComponent},
  {path: 'comicbook/:comicbookId', component: ComicbookComponent},
  {path: 'heroes', component: HeroesComponent},
  {path: 'hero/:heroId', component: HeroComponent},
  {path: 'publishers', component: PublishersComponent},
  {path: 'publisher/:publisherId', component: PublisherComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
