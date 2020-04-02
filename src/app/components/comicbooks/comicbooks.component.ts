import { Component } from "@angular/core";
import { ComicbookService } from 'src/app/services/comicbook.service';
import { Comicbook } from 'src/app/model/comicbook';
import { ColumnDefinition, SearchParameters } from '../search-page/search-page.component';
import { LoaderStatus } from 'src/app/common/loader-status';
import { ButtonInfo } from 'src/app/common/button-info';
import { finalize } from 'rxjs/operators';
import { RoutingService } from 'src/app/common/routing.service';
import { SearchResult } from 'src/app/model/search-results';
import { EntityListPage } from 'src/app/common/entity-list-page';
import { Observable } from 'rxjs';

@Component({
    templateUrl: 'comicbooks.component.html',
    styleUrls: ['comicbooks.component.scss']
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
            }
        ];
    }
}