import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityListPage } from 'src/app/common/entity-list-page';
import { RoutingService } from 'src/app/common/routing.service';
import { SearchResult } from 'src/app/model/search-results';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from 'src/app/services/hero.service';
import { Hero } from 'src/app/model/hero';

@Component({
	selector: 'heroes',
	templateUrl: 'heroes.component.html'
})
export class HeroesComponent extends EntityListPage<Hero> {

	constructor(routingService: RoutingService,
				activatedRoute: ActivatedRoute,
				protected heroService: HeroService) {
		super(routingService, activatedRoute,
			() => (this.routingService.navigateToNewHero()),
			(hero: Hero) => (this.routingService.navigateToHero(hero)),
			'hero');
	}

	protected getEntities(): Observable<SearchResult<Hero>> {
		return this.heroService.getHeroes(this.searchParameters);
	}

}
