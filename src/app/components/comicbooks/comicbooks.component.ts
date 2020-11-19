import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityListPage } from 'src/app/common/entity-list-page';
import { RoutingService } from 'src/app/common/routing.service';
import { Comicbook } from 'src/app/model/comicbook';
import { SearchResult } from 'src/app/model/search-results';
import { ComicbookService } from 'src/app/services/comicbook.service';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'comicbooks',
	templateUrl: 'comicbooks.component.html'
})
export class ComicbooksComponent extends EntityListPage<Comicbook> {

	constructor(routingService: RoutingService,
				activatedRoute: ActivatedRoute,
				protected comicbookService: ComicbookService) {
		super(routingService, activatedRoute,
			() => (this.routingService.navigateToNewComicbook()),
			(comicbook: Comicbook) => (this.routingService.navigateToComicbook(comicbook)),
			'comicbook');
	}

	protected getEntities(): Observable<SearchResult<Comicbook>> {
		return this.comicbookService.getComicbooks(this.searchParameters);
	}

}
