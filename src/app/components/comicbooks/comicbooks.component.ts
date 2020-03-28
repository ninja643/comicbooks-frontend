import { Component } from "@angular/core";
import { ComicbookService } from 'src/app/services/comicbook.service';
import { Comicbook } from 'src/app/model/comicbook';
import { RouterLinks } from 'src/app/common/router-links';
import { ColumnDefinition } from '../search-page/search-page.component';
import { Router } from '@angular/router';
import { LoaderStatus } from 'src/app/common/loader-status';

@Component({
    templateUrl: 'comicbooks.component.html',
    styleUrls: ['comicbooks.component.scss']
})
export class ComicbooksComponent {

    comicbooks: Comicbook[] = [];
    comicbookColumns: ColumnDefinition[];
    searchPageLoaderStatus: LoaderStatus = new LoaderStatus();

    constructor(protected comicbookService: ComicbookService,
            protected router: Router) {
        this.patchComicbooks();

        this.generateComicbookColumns();
    }

    openComicbook = (comicbook: Comicbook): Promise<any> => {
        return this.router.navigate(['/', RouterLinks.COMICBOOK, comicbook.id], {state: {comicbook: comicbook}});
    }

    comicbookTrackBy = (index: number, comicbook: Comicbook): number => {
        return comicbook.id;
    }

    searchComicbooks(searchText: string): void {
        this.patchComicbooks(searchText);
    }

    private patchComicbooks(searchText?: string): void {
        this.searchPageLoaderStatus.showLoader();
        this.comicbookService.getComicbooks().subscribe({
            // TODO handle error
            next: (comicbooks: Comicbook[]) => {
                this.comicbooks = comicbooks;
                this.searchPageLoaderStatus.hideLoader();
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