import { Component } from "@angular/core";
import { Observable } from 'rxjs';
import { EntityListPage } from 'src/app/common/entity-list-page';
import { RoutingService } from 'src/app/common/routing.service';
import { Comicbook } from 'src/app/model/comicbook';
import { SearchResult } from 'src/app/model/search-results';
import { ComicbookService } from 'src/app/services/comicbook.service';

@Component({
    selector: 'comicbooks',
    templateUrl: 'comicbooks.component.html'
})
export class ComicbooksComponent extends EntityListPage<Comicbook> {

    constructor(routingService: RoutingService,
        protected comicbookService: ComicbookService) {
        super(routingService,
            () => (this.routingService.navigateToNewComicbook()),
            (comicbook: Comicbook) => (this.routingService.navigateToComicbook(comicbook)), 
            'comicbook');
    }

    protected getEntities(): Observable<SearchResult<Comicbook>> {
        return this.comicbookService.getComicbooks(this.searchParameters);
    }

    protected generateTableColumns(): void {
        this.tableColumns = [
            {
                id: 'title',
                headerText: 'Title'
            },
            {
                id: 'number',
                headerText: 'Number'
            },
            {
                id: 'publisher',
                headerText: 'Publisher',
                contentDisplayPath: 'publisher.name'
            },
            {
                id: 'id',
                headerText: 'Id'
            }
        ];
    }
}