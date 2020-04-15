import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchParameters } from '../components/search-page/search-page.component';
import { COMICBOOKS } from '../mock-data/mock-comicbooks';
import { deleteById, getById, save } from '../mock-data/mock-common';
import { Comicbook } from '../model/comicbook';
import { SearchRequest } from '../model/search-request';
import { SearchResult } from '../model/search-results';
import { ComicbooksHttpClient } from './comicbooks-http-client';

@Injectable({
	providedIn: 'root'
})
export class ComicbookService {

	private url = '/comicbooks';

	constructor(
		private httpClient: ComicbooksHttpClient) {
	}

	getComicbooks(searchParameters: SearchParameters): Observable<SearchResult<Comicbook>> {
		return new Observable(subscriber => {
			setTimeout(() => {
				const t = {
					offset: (searchParameters.page - 1) * searchParameters.pageSize,
					count: searchParameters.pageSize,
					totalCount: searchParameters.collectionSize,
					searchText: searchParameters.searchText,
					items: COMICBOOKS.slice().filter(x => x.title.toLowerCase().includes(searchParameters.searchText.toLowerCase()))
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
		return this.httpClient.post<SearchResult<Comicbook>>(url, requestBody);
	}

	getComicbook(id: number): Observable<Comicbook> {
		return new Observable(subscriber => {
			setTimeout(() => {
				const toReturn = getById<Comicbook>(COMICBOOKS, id);
				if (toReturn) {
					subscriber.next(toReturn);
				} else {
					subscriber.error('gfgf');
				}
				subscriber.complete();
			}, 1500);
		});
		const url = `${this.url}/${id}`;

		return this.httpClient.get<Comicbook>(url);
	}

	saveComicbook(comicbook: Comicbook): Observable<Comicbook> {
		return new Observable(subscriber => {
			setTimeout(() => {
				subscriber.next(save<Comicbook>(COMICBOOKS, comicbook));
				subscriber.complete();
			}, 1500);
		});
		return this.httpClient.post<Comicbook>(this.url, comicbook);
	}

	deleteComicbook(comicbookId: number): Observable<void> {
		return new Observable(subscriber => {
			setTimeout(() => {
				subscriber.next(deleteById<Comicbook>(COMICBOOKS, comicbookId));
				subscriber.complete();
			}, 1500);
		});
		return this.httpClient.delete(`${this.url}/${comicbookId}`);
	}
}
