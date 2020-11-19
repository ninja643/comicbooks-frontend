import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { deleteById, getById, save } from '../mock-data/mock-common';
import { allPublishers } from '../mock-data/mock-publishers';
import { Publisher } from '../model/publisher';
import { SearchRequest } from '../model/search-request';
import { SearchResult } from '../model/search-results';
import { ComicbooksHttpClient } from './comicbooks-http-client';
import { COMICBOOKS } from '../mock-data/mock-comicbooks';
import { SearchParameters } from '../common/entity-list-page';

@Injectable({
	providedIn: 'root'
})
export class PublisherService {

	private url = '/publishers';

	constructor(
		private httpClient: ComicbooksHttpClient) {

		// TODO remove
		allPublishers.forEach(publisher => {
			publisher.comicbooks = COMICBOOKS.filter(comicbook => comicbook.publisher.id === publisher.id);
		});
	}

	getPublishers(searchParameters: SearchParameters): Observable<SearchResult<Publisher>> {
		return new Observable(subscriber => {
			setTimeout(() => {
				const t = {
					offset: (searchParameters.page - 1) * searchParameters.pageSize,
					count: searchParameters.pageSize,
					totalCount: searchParameters.collectionSize,
					searchText: searchParameters.searchText,
					items: allPublishers.slice().filter(x => x.name.toLowerCase().includes(searchParameters.searchText.toLowerCase()))
				};
				subscriber.next(t);
				subscriber.complete();
			}, 1500);
		});
		const requestBody: SearchRequest = {
			offset: (searchParameters.page - 1) * searchParameters.pageSize,
			count: searchParameters.pageSize,
			filterText: searchParameters.searchText
		};
		const url = `${this.url}/search`;
		return this.httpClient.post<SearchResult<Publisher>>(url, requestBody);
	}

	getPublisher(id: number): Observable<Publisher> {
		return new Observable(subscriber => {
			setTimeout(() => {
				const toReturn = getById<Publisher>(allPublishers, id);
				if (toReturn) {
					subscriber.next(toReturn);
				} else {
					subscriber.error('gfgf');
				}
				subscriber.complete();
			}, 1500);
		});
		const url = `${this.url}/${id}`;

		return this.httpClient.get<Publisher>(url);
	}

	savePublisher(publisher: Publisher): Observable<Publisher> {
		return new Observable(subscriber => {
			setTimeout(() => {
				subscriber.next(save<Publisher>(allPublishers, publisher));
				subscriber.complete();
			}, 1500);
		});
		return this.httpClient.post<Publisher>(this.url, publisher);
	}

	deletePublisher(publisherId: number): Observable<void> {
		return new Observable(subscriber => {
			setTimeout(() => {
				subscriber.next(deleteById<Publisher>(allPublishers, publisherId));
				subscriber.complete();
			}, 1500);
		});
		return this.httpClient.delete(`${this.url}/${publisherId}`);
	}
}
