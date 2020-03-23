import { Injectable } from '@angular/core';
import { Publisher } from '../model/publisher';
import { PUBLISHERS } from '../mock-data/mock-publishers';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ComicbooksHttpClient } from './comicbooks-http-client';
import { getById, saveById, deleteById } from '../mock-data/mock-common';

@Injectable({
	providedIn: 'root'
})
export class PublisherService {

	private publishersUrl = '/publisher';

	constructor(
		private httpClient: ComicbooksHttpClient) {
	}

	getPublishers(): Observable<Publisher[]> {
		return of(PUBLISHERS.slice());
		return this.httpClient.get<Publisher[]>(this.publishersUrl);
	}

	getPublisher(id: number): Observable<Publisher> {
		return of(getById<Publisher>(PUBLISHERS, id));
		const url = `${this.publishersUrl}/${id}`;

		return this.httpClient.get<Publisher>(url);
	}

	savePublisher(publisher: Publisher): Observable<Publisher> {
		return of(saveById<Publisher>(PUBLISHERS, publisher));
		return this.httpClient.post(this.publishersUrl, publisher);
	}

	deletePublisher(publisherId: number): Observable<void> {
		return of(deleteById<Publisher>(PUBLISHERS, publisherId));
		return this.httpClient.delete(`${this.publishersUrl}/${publisherId}`);
	}

	// private log(message: string): void {
	//   // this.messageService.add(`PublisherService: ${message}`);
	// }

	// private handleError<T>(operation = 'operation', result?: T) {
	//   return (error: any): Observable<T> => {
	//     console.error(error);

	//     this.log(`${operation} failed: ${error.message}`);

	//     return of(result as T);
	//   };
	// }

	// TODO da napravim sistem za handlovanje gresaka
}
