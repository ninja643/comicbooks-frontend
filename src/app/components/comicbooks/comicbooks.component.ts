import { Component } from "@angular/core";
import { ComicbookService } from 'src/app/services/comicbook.service';
import { Comicbook } from 'src/app/model/comicbook';
import { RouterLinks } from 'src/app/common/router-links';
import { ColumnDefinition, SearchParameters } from '../search-page/search-page.component';
import { Router } from '@angular/router';
import { LoaderStatus } from 'src/app/common/loader-status';
import { ButtonInfo } from 'src/app/common/button-info';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: 'comicbooks.component.html',
    styleUrls: ['comicbooks.component.scss']
})
export class ComicbooksComponent {

    comicbooks: Comicbook[] = [];
    comicbookColumns: ColumnDefinition[];
    searchPageLoaderStatus: LoaderStatus = new LoaderStatus();
    addNewComicbookButtonInfo: ButtonInfo = {
        text: "Add new comicbook",
        execute: () => {
            this.router.navigate([RouterLinks.NewComicbook]);
        }
    }
    searchParameters: SearchParameters = new SearchParameters(1, 10, 100, '', 'page', 'filter');

    constructor(protected comicbookService: ComicbookService,
        protected router: Router) {
        this.patchComicbooks();

        this.generateComicbookColumns();
    }

    openComicbook = (comicbook: Comicbook): Promise<any> => {
        return this.router.navigate(['/', RouterLinks.Comicbook, comicbook.id], { state: { comicbook: comicbook } });
    }

    comicbookTrackBy = (index: number, comicbook: Comicbook): number => {
        return comicbook.id;
    }

    searchComicbooks(searchParameters: SearchParameters): void {
        this.searchParameters = searchParameters;
        this.patchComicbooks();
    }

    private patchComicbooks(): void {
        this.searchPageLoaderStatus.showLoader();
        this.comicbookService.getComicbooks(this.searchParameters)
            .pipe(finalize(() => this.searchPageLoaderStatus.hideLoader()))
            .subscribe({
                // TODO handle error
                next: (comicbooks: Comicbook[]) => {
                    this.comicbooks = comicbooks;
                    // TODO update search parameters
                }
            });
    }

    private generateComicbookColumns(): void {
        this.comicbookColumns = [
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
        ]
    }
}