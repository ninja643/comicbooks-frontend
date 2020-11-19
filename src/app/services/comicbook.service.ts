import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { COMICBOOKS } from '../mock-data/mock-comicbooks';
import { deleteById, save, getById } from '../mock-data/mock-common';
import { Comicbook } from '../model/comicbook';
import { SearchRequest } from '../model/search-request';
import { SearchResult } from '../model/search-results';
import { ComicbooksHttpClient } from './comicbooks-http-client';
import { SearchParameters } from '../common/entity-list-page';

@Injectable({
	providedIn: 'root'
})
export class ComicbookService {

	private url = 'comicbooks';

	constructor(private httpClient: ComicbooksHttpClient) {
	}

	getComicbooks(searchParameters: SearchParameters): Observable<SearchResult<Comicbook>> {
		return new Observable(subscriber => {
			setTimeout(() => {
				const t = {
					offset: (searchParameters.page - 1) * searchParameters.pageSize,
					count: searchParameters.pageSize,
					totalCount: 100,
					searchText: searchParameters.searchText,
					items: COMICBOOKS.slice().filter(x => x.title.toLowerCase().includes(searchParameters.searchText.toLowerCase()))
				};
				subscriber.next(t);
				subscriber.complete();
			}, 0/*1500*/);
		});

		// const requestBody: SearchRequest = {
		// 	offset: (searchParameters.page - 1) * searchParameters.pageSize,
		// 	count: searchParameters.pageSize,
		// 	filterText: searchParameters.searchText
		// };
		// const url = `${this.url}`;
		// console.log('Getting from url: ', url);
		// return this.httpClient.get<SearchResult<Comicbook>>(url);
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
			}, 0/*1500*/);
		});
		// const url = `${this.url}/${id}`;
		// console.log('URL: ', url);
		// return this.httpClient.get<Comicbook>(url);
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
