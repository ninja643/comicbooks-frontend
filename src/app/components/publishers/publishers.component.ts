import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityListPage } from 'src/app/common/entity-list-page';
import { RoutingService } from 'src/app/common/routing.service';
import { SearchResult } from 'src/app/model/search-results';
import { ActivatedRoute } from '@angular/router';
import { Publisher } from 'src/app/model/publisher';
import { PublisherService } from 'src/app/services/publisher.service';

@Component({
	selector: 'publishers',
	templateUrl: 'publishers.component.html'
})
export class PublishersComponent extends EntityListPage<Publisher> {

	constructor(routingService: RoutingService,
				activatedRoute: ActivatedRoute,
				protected publisherService: PublisherService) {
		super(routingService, activatedRoute,
			() => (this.routingService.navigateToNewPublisher()),
			(publisher: Publisher) => (this.routingService.navigateToPublisher(publisher)),
			'publisher');
	}

	protected getEntities(): Observable<SearchResult<Publisher>> {
		return this.publisherService.getPublishers(this.searchParameters);
	}

}
