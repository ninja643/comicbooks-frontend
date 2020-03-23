import { Component, Input, TemplateRef, EventEmitter, Output, ContentChild, QueryList, ContentChildren, SimpleChanges, SimpleChange } from "@angular/core";
import { ComicbookService } from 'src/app/services/comicbook.service';
import { Comicbook } from 'src/app/model/comicbook';
import { RouterLinks } from 'src/app/common/router-links';
import { HeaderTemplate } from './header-template.directive';
import { ContentTemplate } from './content-template.directive';
import { isNullOrUndefined } from 'util';
import { LoaderStatus } from 'src/app/common/loader-status';

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

@Component({
    selector: 'search-page',
    templateUrl: 'search-page.component.html',
    styleUrls: ['search-page.component.scss']
})
export class SearchPageComponent {

    @Input() searchEnabled: boolean;
    @Input() searchPlaceholderText: string = "Search";

    @Input() items: any[] = [];
    @Input() columns: ColumnDefinition[] = [];
    @Input() showLoader: boolean;
    @Input() rowClickedFn: (item: any) => Promise<any>;
    @Input() itemTrackBy: (index: number, item: any) => any = (index: number, item: any) => JSON.stringify(item);

    @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

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

    private lastEmitedSearchText: string;

    constructor() {
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
    }

    search(): void {
        if (this.searchText != this.lastEmitedSearchText) {
            this.onSearch.emit(this.searchText);
            this.lastEmitedSearchText = this.searchText;
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
            catch(exception) {
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