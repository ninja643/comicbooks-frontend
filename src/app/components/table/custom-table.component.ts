import {
	Component,
	ContentChildren,
	EventEmitter,
	Input,
	Output,
	QueryList,
	SimpleChange,
	SimpleChanges,
	TemplateRef
} from '@angular/core';
import { HeaderTemplateDirective } from './header-template.directive';
import { ContentTemplateDirective } from './content-template.directive';
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

@Component({
	selector: 'custom-table',
	templateUrl: 'custom-table.component.html',
	styleUrls: ['custom-table.component.scss']
})
export class CustomTableComponent {

	@Input() items: any[] = [];
	@Input() columns: ColumnDefinition[] = [];
	@Input() rowClickedFn: (item: any) => any;
	@Input() itemTrackBy: (index: number, item: any) => any = (index: number, item: any) => JSON.stringify(item);

	private _headerTemplates: QueryList<HeaderTemplateDirective>;
	@ContentChildren(HeaderTemplateDirective) set headerTemplates(value: QueryList<HeaderTemplateDirective>) {
		this._headerTemplates = value;
		this.populateHeaderTemplates();
	}

	private _contentTemplates: QueryList<ContentTemplateDirective>;
	@ContentChildren(ContentTemplateDirective) set contentTemplates(value: QueryList<ContentTemplateDirective>) {
		this._contentTemplates = value;
		this.populateContentTemplates();
	}

	constructor(private activatedRoute: ActivatedRoute,
				private routingService: RoutingService) {
	}

	ngOnChanges(changes: SimpleChanges): void {
		const columnsChange: SimpleChange = changes['columns'];
		if (columnsChange) {
			this.populateHeaderTemplates();
			this.populateContentTemplates();
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
			} catch (exception) {
				return;
			}
		});

		return toReturn;
	}

	onRowClicked(item: any): void {
		if (this.onRowClicked) {
			this.rowClickedFn(item);
		}
	}

	onCellClicked(event: Event, item: any, column: ColumnDefinition): void {
		if (column.onContentCellClicked) {
			column.onContentCellClicked(item);
		}
	}

	private populateHeaderTemplates(): void {
		if (this.columns && this._headerTemplates) {
			this._headerTemplates.forEach((headerTemplate: HeaderTemplateDirective) => {
				const column: ColumnDefinition = this.columns.find(column => column.id == headerTemplate.columnId);
				if (column) {
					column.headerTemplate = headerTemplate.templateRef;
				}
			});
		}
	}

	private populateContentTemplates(): void {
		if (this.columns && this._contentTemplates) {
			this._contentTemplates.forEach((contentTemplate: ContentTemplateDirective) => {
				const column: ColumnDefinition = this.columns.find(column => column.id == contentTemplate.columnId);
				if (column) {
					column.contentTemplate = contentTemplate.templateRef;
				}
			});
		}
	}
}
