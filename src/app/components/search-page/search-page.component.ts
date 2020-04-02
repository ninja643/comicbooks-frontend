import { Component, Input, TemplateRef, EventEmitter, Output, ContentChild, QueryList, ContentChildren, SimpleChanges, SimpleChange } from "@angular/core";
import { ComicbookService } from 'src/app/services/comicbook.service';
import { Comicbook } from 'src/app/model/comicbook';
import { HeaderTemplate } from './header-template.directive';
import { ContentTemplate } from './content-template.directive';
import { isNullOrUndefined } from 'util';
import { LoaderStatus } from 'src/app/common/loader-status';
import { ButtonInfo } from 'src/app/common/button-info';
import { ActivatedRoute, Params } from '@angular/router';
import { RoutingService } from 'src/app/common/routing.service';

export interface ColumnDefinition {
    id: string;
    headerText?: string;
    headerTemplate?: TemplateRef<any>;
    // For deeper extraction, use '.'
    // e.g. 'location.city' if each row has location object, with city inside of it
    contentDisplayPath?: string;
    contentDisplayFn?: (item: any) => any
    contentTemplate?: TemplateRef<any>;
    onContentCellClicked?: (item: any) => Promise<void>;
}

export interface RowClicked {
    index: number;
    item: any;
}

export class SearchParameters {
    constructor(public page: number = 1,
        public pageSize: number = 10,
        public collectionSize: number = 1,
        public searchText: string = '',
        public pageQueryParamKey?: string,
        public searchTextQueryParamKey?: string) { }
}

@Component({
    selector: 'search-page',
    templateUrl: 'search-page.component.html',
    styleUrls: ['search-page.component.scss']
})
export class SearchPageComponent {

    @Input() searchEnabled: boolean;
    @Input() searchPlaceholderText: string = "Search";
    @Input() addNewItemButtonInfo: ButtonInfo;

    @Input() items: any[] = [];
    @Input() columns: ColumnDefinition[] = [];
    @Input() showLoader: boolean;
    @Input() rowClickedFn: (item: any) => Promise<any>;
    @Input() itemTrackBy: (index: number, item: any) => any = (index: number, item: any) => JSON.stringify(item);

    @Input() searchParameters: SearchParameters = new SearchParameters();
    @Output() searchParametersChange: EventEmitter<SearchParameters> = new EventEmitter<SearchParameters>();

    private _headerTemplates: QueryList<HeaderTemplate>;
    @ContentChildren(HeaderTemplate) set headerTemplates(value: QueryList<HeaderTemplate>) {
        this._headerTemplates = value;
        this.populateHeaderTemplates();
    }

    private _contentTemplates: QueryList<ContentTemplate>;
    @ContentChildren(ContentTemplate) set contentTemplates(value: QueryList<ContentTemplate>) {
        this._contentTemplates = value;
        this.populateContentTemplates();
    }

    searchText: string;
    loaderStatus: LoaderStatus = new LoaderStatus();

    constructor(private activatedRoute: ActivatedRoute,
        private routingService: RoutingService) {
        this.activatedRoute.queryParams.subscribe({
            next: (params: Params) => this.updateSearchParametersBasedOnQueryParams(params)
        })
    }

    ngOnChanges(changes: SimpleChanges): void {
        const columnsChange: SimpleChange = changes['columns'];
        if (columnsChange) {
            this.populateHeaderTemplates();
            this.populateContentTemplates();
        }

        const showLoaderChange: SimpleChange = changes['showLoader'];
        if (showLoaderChange && !(isNullOrUndefined(showLoaderChange.previousValue) && !showLoaderChange.currentValue)) {
            this.loaderStatus.updateVisibility(this.showLoader);
        }

        const searchParametersChange: SimpleChange = changes['searchParameters'];
        if (searchParametersChange) {
            this.searchText = this.searchParameters.searchText;
            if (searchParametersChange.firstChange) {
                this.updateSearchParametersBasedOnQueryParams(this.activatedRoute.snapshot.queryParams);
            }
            else {
                this.updateQueryParams(true);
            }
        }
    }

    searchByText(): void {
        if (this.searchText != this.searchParameters.searchText) {
            this.searchParameters = {
                ...this.searchParameters,
                page: 1,
                searchText: this.searchText
            };
            this.updateQueryParams(false);
            this.searchParametersChange.emit(this.searchParameters);
        }
    }

    changePage(page: number): void {
        if (this.searchParameters.page != page) {
            this.searchParameters = {
                ...this.searchParameters,
                page: page
            };
            this.updateQueryParams(false);
            this.searchParametersChange.emit(this.searchParameters);
        }
    }

    columnTrackBy(index: number, column: ColumnDefinition): string {
        return column.id;
    }

    getPropertyOnPath(item: any, propertyPath: string): any {
        const paths: string[] = propertyPath.split('.');
        let toReturn: any = item;
        paths.forEach(path => {
            try {
                toReturn = toReturn[path];
            }
            catch (exception) {
                return;
            }
        })

        return toReturn;
    }

    onRowClicked(item: any): void {
        if (this.onRowClicked) {
            this.loaderStatus.showLoader();
            this.rowClickedFn(item)
                .finally(() => this.loaderStatus.hideLoader());
        }
    }

    onCellClicked(event: Event, item: any, column: ColumnDefinition): void {
        if (column.onContentCellClicked) {
            this.loaderStatus.showLoader();
            column.onContentCellClicked(item)
                .finally(() => this.loaderStatus.hideLoader());
        }
    }

    protected updateSearchParametersBasedOnQueryParams(queryParams: Params): void {
        let areSearchParametersChanged: boolean;
        const searchTextQueryParam: string = queryParams[this.searchParameters.searchTextQueryParamKey];
        if (!isNullOrUndefined(searchTextQueryParam) && searchTextQueryParam != this.searchParameters.searchText) {
            this.searchParameters.searchText = searchTextQueryParam;
            this.searchText = this.searchParameters.searchText;
            areSearchParametersChanged = true;
        }

        const pageQueryParam: number = queryParams[this.searchParameters.pageQueryParamKey];
        if (!isNullOrUndefined(pageQueryParam) && pageQueryParam != this.searchParameters.page) {
            this.searchParameters.page = pageQueryParam;
            areSearchParametersChanged = true;
        }
        if (areSearchParametersChanged) {
            this.searchParametersChange.emit(this.searchParameters);
        }
    }

    private updateQueryParams(replaceUrl: boolean): void {
        const queryParams: Params = {};
        if (this.searchParameters.searchTextQueryParamKey) {
            queryParams[this.searchParameters.searchTextQueryParamKey] = this.searchParameters.searchText || null;
        }
        if (this.searchParameters.pageQueryParamKey) {
            queryParams[this.searchParameters.pageQueryParamKey] = this.searchParameters.page || null;
        }

        this.routingService.updateQueryParams(queryParams, replaceUrl);
    }

    private populateHeaderTemplates(): void {
        if (this.columns && this._headerTemplates) {
            this._headerTemplates.forEach((headerTemplate: HeaderTemplate) => {
                const column: ColumnDefinition = this.columns.find(column => column.id == headerTemplate.columnId);
                if (column) {
                    column.headerTemplate = headerTemplate.templateRef;
                }
            });
        }
    }

    private populateContentTemplates(): void {
        if (this.columns && this._contentTemplates) {
            this._contentTemplates.forEach((contentTemplate: ContentTemplate) => {
                const column: ColumnDefinition = this.columns.find(column => column.id == contentTemplate.columnId);
                if (column) {
                    column.contentTemplate = contentTemplate.templateRef;
                }
            });
        }
    }
}