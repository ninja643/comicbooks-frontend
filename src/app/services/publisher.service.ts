import {Injectable} from '@angular/core';
import {Publisher} from '../model/publisher';
import {PUBLISHERS} from '../mock-data/mock-publishers';
import {Observable, of} from 'rxjs';
import {MessagesService} from './util/messages.service';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  private publishersUrl = '/publisher';

  constructor(
    private httpClient: HttpClient,
    private messageService: MessagesService) {
  }

  getPublishers(): Observable<Publisher[]> {
    return this.httpClient.get<Publisher[]>(this.publishersUrl)
      .pipe(
        tap(_ => this.log('Fetched publishers')),
        catchError(this.handleError<Publisher[]>('getPublishers', []))
      );
  }

  getPublisher(id: number): Observable<Publisher> {
    const url = `${this.publishersUrl}/${id}`;

    return this.httpClient.get<Publisher>(url)
      .pipe(
        tap(_ => this.log(`fetched publisher id=${id}`)),
        catchError(result => this.handleError<Publisher>(`getPublisher id=${id}`, result))
      );
  }

  private log(message: string): void {
    this.messageService.add(`PublisherService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
