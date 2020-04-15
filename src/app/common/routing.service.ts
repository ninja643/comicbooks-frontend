import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Comicbook } from '../model/comicbook';
import { Hero } from '../model/hero';
import { Publisher } from '../model/publisher';
import { RouterLinks } from './router-links';

@Injectable({
	providedIn: 'root'
})
export class RoutingService {

	constructor(protected router: Router, protected activatedRoute: ActivatedRoute) {
	}

	navigateToComicbook(comicbook: Comicbook, replaceUrl?: boolean): Promise<any> {
		return this.router.navigate(
			['/', RouterLinks.Comicbook, comicbook.id],
			{
				state: {comicbook: comicbook},
				replaceUrl: replaceUrl
			}
		);
	}

	navigateToPublisher(publisher: Publisher, replaceUrl?: boolean): Promise<any> {
		return this.router.navigate(
			['/', RouterLinks.Publisher, publisher.id],
			{
				state: {publisher: publisher},
				replaceUrl: replaceUrl
			}
		);
	}

	navigateToHero(hero: Hero, replaceUrl?: boolean): Promise<any> {
		return this.router.navigate(
			['/', RouterLinks.Hero, hero.id],
			{
				state: {hero: hero},
				replaceUrl: replaceUrl
			}
		);
	}

	navigateToNewComicbook(): Promise<any> {
		return this.router.navigate([RouterLinks.NewComicbook]);
	}

	navigateToNewPublisher(): Promise<any> {
		return this.router.navigate([RouterLinks.NewPublisher]);
	}

	navigateToNewHero(): Promise<any> {
		return this.router.navigate([RouterLinks.NewHero]);
	}

	navigateToComicbooks(): Promise<any> {
		return this.router.navigate([RouterLinks.Comicbooks]);
	}

	navigateToPublishers(): Promise<any> {
		return this.router.navigate([RouterLinks.Publishers]);
	}

	navigateToHeroes(): Promise<any> {
		return this.router.navigate([RouterLinks.Heroes]);
	}

	updateQueryParams(params: Params, replaceUrl?: boolean): Promise<any> {
		return this.router.navigate(
			[],
			{
				relativeTo: this.activatedRoute,
				queryParams: params,
				queryParamsHandling: 'merge',
				replaceUrl: replaceUrl
			}
		);
	}
}
