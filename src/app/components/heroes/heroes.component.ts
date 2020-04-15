import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {EntityListPage} from 'src/app/common/entity-list-page';
import {RoutingService} from 'src/app/common/routing.service';
import {Hero} from 'src/app/model/hero';
import {SearchResult} from 'src/app/model/search-results';
import {HeroService} from 'src/app/services/hero.service';

@Component({
	templateUrl: 'heroes.component.html'
})
export class HeroesComponent extends EntityListPage<Hero> {

	constructor(routingService: RoutingService,
				protected heroService: HeroService) {
		super(routingService,
			() => (this.routingService.navigateToNewHero()),
			(hero: Hero) => (this.routingService.navigateToHero(hero)),
			'hero');
	}


	protected getEntities(): Observable<SearchResult<Hero>> {
		return this.heroService.getHeroes(this.searchParameters);
	}

	protected generateTableColumns(): void {
		this.tableColumns = [
			{
				id: 'name',
				headerText: 'Name'
			},
			{
				id: 'id',
				headerText: 'Id'
			}
		];
	}
}
