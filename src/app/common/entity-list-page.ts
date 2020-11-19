import { Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ButtonInfo } from 'src/app/common/button-info';
import { LoaderStatus } from 'src/app/common/loader-status';
import { RoutingService } from 'src/app/common/routing.service';
import { SearchResult } from 'src/app/model/search-results';
import { ColumnDefinition } from '../components/table/custom-table.component';
import { Params, ActivatedRoute } from '@angular/router';

export class SearchParameters {
	constructor(public page: number = 1,
				public pageSize: number = 30,
				public collectionSize: number = 1,
				public searchText: string = '') {
	}
}

export abstract class EntityListPage<Entity extends { id: number }> implements OnInit {

	readonly pageQueryParamName: string = 'page';
	readonly searchTextQueryParamName: string = 'search';

	// If true, doesn't send search request, but expect that entities are passed through the input
	@Input() staticMode: boolean;
	@Input() entities: Entity[] = [];
	loaderStatus: LoaderStatus = new LoaderStatus();
	addNewEntityButtonInfo: ButtonInfo;
	searchParameters: SearchParameters = new SearchParameters();
	searchText: string;

	private initialSearch: boolean = true;

	protected constructor(protected routingService: RoutingService,
						  protected activatedRoute: ActivatedRoute,
						  protected navigateToNewEntity: () => Promise<any>,
						  public navigateToEntity: (entity: Entity) => Promise<any>,
						  protected entityName: string) {
	}

	ngOnInit(): void {
		this.activatedRoute.queryParams.subscribe({
			next: (params: Params) => this.queryParametersChanged(params)
		});

		this.addNewEntityButtonInfo = {
			text: `Add new ${this.entityName}`,
			execute: this.navigateToNewEntity
		};

	}

	protected abstract getEntities(): Observable<SearchResult<Entity>>;

	entityTrackBy = (index: number, entity: Entity): number => {
		return entity.id;
	}

	searchByText(): void {
		if (this.staticMode) {
			return;
		}
		if (this.searchText !== this.searchParameters.searchText) {
			this.routingService.updateQueryParams({[this.searchTextQueryParamName]: this.searchText || null, page: 1});
		}
	}

	changePage(page: number): void {
		if (this.staticMode) {
			return;
		}
		if (this.searchParameters.page !== page) {
			this.routingService.updateQueryParams({[this.pageQueryParamName]: page});
		}
	}
	
	protected queryParametersChanged(params: Params): void {
		if (!this.staticMode) {
			let changed: boolean;
			const oldSearchText: string = this.searchParameters.searchText;
			this.searchText = params[this.searchTextQueryParamName] || '';
			this.searchParameters.searchText = this.searchText;
			if (oldSearchText != this.searchText) {
				changed = true;
			}

			const oldPage: number = this.searchParameters.page;
			this.searchParameters.page = params[this.pageQueryParamName] || 1;
			if (oldPage != this.searchParameters.page) {
				changed = true;
			}
			
			if (changed || this.initialSearch) {
				this.patchEntities();
				this.initialSearch = false;
			}
		}
	}

	protected patchEntities(): void {
		this.loaderStatus.showLoader();
		this.getEntities()
			.pipe(finalize(() => setTimeout(() => {
				this.loaderStatus.hideLoader()
			}, 1000)))
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
