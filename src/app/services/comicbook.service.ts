import {Injectable} from '@angular/core';
import {Publisher} from '../model/publisher';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { ComicbooksHttpClient } from './comicbooks-http-client';
import { Hero } from '../model/hero';
import { Comicbook } from '../model/comicbook';
import { COMICBOOKS } from '../mock-data/mock-comicbooks';
import { getById, save, deleteById } from '../mock-data/mock-common';
import { SearchParameters } from '../components/search-page/search-page.component';
import { SearchResult } from '../model/search-results';
import { SearchRequest } from '../model/search-request';

@Injectable({
  providedIn: 'root'
})
export class ComicbookService {

  private url = '/comicbook';

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
    })
    const requestBody: SearchRequest = {
      offset: (searchParameters.page - 1) * searchParameters.pageSize,
      count: searchParameters.pageSize,
      filterText: searchParameters.searchText
    };
    const url: string = `${this.url}/search`;
    return this.httpClient.post<SearchResult<Comicbook>>(url, requestBody);
  }

  getComicbook(id: number): Observable<Comicbook> {
    return new Observable(subscriber => {
      setTimeout(() => {
        subscriber.next(getById<Comicbook>(COMICBOOKS, id));
        subscriber.complete();
      }, 1500);
    })
    const url = `${this.url}/${id}`;

    return this.httpClient.get<Comicbook>(url);
  }

  saveComicbook(comicbook: Comicbook): Observable<Comicbook> {
    return new Observable(subscriber => {
      setTimeout(() => {
        subscriber.next(save<Comicbook>(COMICBOOKS, comicbook));
        subscriber.complete();
      }, 1500);
    })
    return this.httpClient.post(this.url, comicbook);
  }

  deleteComicbook(comicbookId: number): Observable<void> {
    return new Observable(subscriber => {
      setTimeout(() => {
        subscriber.next(deleteById<Comicbook>(COMICBOOKS, comicbookId));
        subscriber.complete();
      }, 1500);
    })
    return this.httpClient.delete(`${this.url}/${comicbookId}`);
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
}
