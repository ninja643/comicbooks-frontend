import {Injectable} from '@angular/core';
import {Publisher} from '../model/publisher';
import {PUBLISHERS} from '../mock-data/mock-publishers';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { ComicbooksHttpClient } from './comicbooks-http-client';
import { Hero } from '../model/hero';
import { Comicbook } from '../model/comicbook';
import { COMICBOOKS } from '../mock-data/mock-comicbooks';
import { getById, saveById, deleteById } from '../mock-data/mock-common';

@Injectable({
  providedIn: 'root'
})
export class ComicbookService {

  private comicbookUrl = '/comicbook';

  constructor(
    private httpClient: ComicbooksHttpClient) {
  }

  getComicbooks(): Observable<Comicbook[]> {
    return new Observable(subscriber => {
      setTimeout(() => {
        subscriber.next(COMICBOOKS.slice());
      }, 1500);
    })
    return of(COMICBOOKS.slice());
    return this.httpClient.get<Comicbook[]>(this.comicbookUrl);
  }

  getComicbook(id: number): Observable<Comicbook> {
    return of(getById<Comicbook>(COMICBOOKS, id));
    const url = `${this.comicbookUrl}/${id}`;

    return this.httpClient.get<Comicbook>(url);
  }

  saveComicbook(comicbook: Comicbook): Observable<Comicbook> {
    return of(saveById<Comicbook>(COMICBOOKS, comicbook));
    return this.httpClient.post(this.comicbookUrl, comicbook);
  }

  deleteComicbook(comicbookId: number): Observable<void> {
    return of(deleteById<Comicbook>(COMICBOOKS, comicbookId));
    return this.httpClient.delete(`${this.comicbookUrl}/${comicbookId}`);
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
