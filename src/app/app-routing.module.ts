import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Publisher} from './model/publisher';
import {PublishersComponent} from './components/publishers/publishers.component';
import {HeroesComponent} from './components/heroes/heroes.component';
import {ComicbooksComponent} from './components/comicbooks/comicbooks.component';
import {ComicbookComponent} from './components/comicbook/comicbook.component';
import {HeroComponent} from './components/hero/hero.component';
import {PublisherComponent} from './components/publisher/publisher.component';
import {RouterLinks} from './common/router-links';

const homeRoute = `/${RouterLinks.Comicbooks}`;

const routes: Routes = [
	{path: '', redirectTo: homeRoute, pathMatch: 'full'},
	{path: `${RouterLinks.Comicbooks}`, component: ComicbooksComponent},
	{path: `${RouterLinks.Comicbook}/:comicbookId`, component: ComicbookComponent},
	{path: `${RouterLinks.NewComicbook}`, component: ComicbookComponent},
	{path: `${RouterLinks.Heroes}`, component: HeroesComponent},
	{path: `${RouterLinks.Hero}/:heroId`, component: HeroComponent},
	{path: `${RouterLinks.NewHero}`, component: HeroComponent},
	{path: `${RouterLinks.Publishers}`, component: PublishersComponent},
	{path: `${RouterLinks.Publisher}/:publisherId`, component: PublisherComponent},
	{path: `${RouterLinks.NewPublisher}`, component: PublisherComponent},
	{path: '**', redirectTo: homeRoute, pathMatch: 'full'}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
