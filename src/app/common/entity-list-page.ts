import { Component, OnInit } from "@angular/core";
import { ComicbookService } from 'src/app/services/comicbook.service';
import { Comicbook } from 'src/app/model/comicbook';
import { LoaderStatus } from 'src/app/common/loader-status';
import { ButtonInfo } from 'src/app/common/button-info';
import { finalize } from 'rxjs/operators';
import { RoutingService } from 'src/app/common/routing.service';
import { SearchResult } from 'src/app/model/search-results';
import { ColumnDefinition, SearchParameters } from '../components/search-page/search-page.component';
import { Observable } from 'rxjs';

export abstract class EntityListPage<Entity extends { id: number }> implements OnInit{

    entities: Entity[] = [];
    tableColumns: ColumnDefinition[];
    searchPageLoaderStatus: LoaderStatus = new LoaderStatus();
    addNewEntityButtonInfo: ButtonInfo
    searchParameters: SearchParameters = new SearchParameters(1, 10, 100, '', 'page', 'filter');

    constructor(protected routingService: RoutingService,
        protected navigateToNewEntity: () => Promise<any>,
        public navigateToEntity: (entity: Entity) => Promise<any>,
        protected entityName: string) {}

    ngOnInit(): void {
        this.addNewEntityButtonInfo = {
            text: `Add new ${this.entityName}`,
            execute: this.navigateToNewEntity
        };
        this.patchEntities();

        this.generateTableColumns();

    }

    protected abstract getEntities(): Observable<SearchResult<Entity>>;
    protected abstract generateTableColumns(): void;

    entityTrackBy = (index: number, entity: Entity): number => {
        return entity.id;
    }

    searchEntities(searchParameters: SearchParameters): void {
        this.searchParameters = searchParameters;
        this.patchEntities();
    }

    private patchEntities(): void {
        this.searchPageLoaderStatus.showLoader();
        this.getEntities()
            .pipe(finalize(() => this.searchPageLoaderStatus.hideLoader()))
            .subscribe({
                next: (result: SearchResult<Entity>) => {
                    this.searchParameters = {
                        ...this.searchParameters,
                        collectionSize: result.totalCount
                    };
                    this.entities = result.items;
                }
            });
    }
}