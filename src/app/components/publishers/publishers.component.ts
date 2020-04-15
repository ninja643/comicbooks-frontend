import { Component } from "@angular/core";
import { Observable } from 'rxjs';
import { EntityListPage } from 'src/app/common/entity-list-page';
import { RoutingService } from 'src/app/common/routing.service';
import { Publisher } from 'src/app/model/publisher';
import { SearchResult } from 'src/app/model/search-results';
import { PublisherService } from 'src/app/services/publisher.service';

@Component({
    templateUrl: 'publishers.component.html'
})
export class PublishersComponent extends EntityListPage<Publisher> {

    constructor(routingService: RoutingService,
        protected publisherService: PublisherService) {
        super(routingService,
            () => (this.routingService.navigateToNewPublisher()),
            (publisher: Publisher) => (this.routingService.navigateToPublisher(publisher)), 
            'publisher');
    }


    protected getEntities(): Observable<SearchResult<Publisher>> {
        return this.publisherService.getPublishers(this.searchParameters);
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