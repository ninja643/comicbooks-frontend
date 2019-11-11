import {Injectable} from '@angular/core';
import {Publisher} from '../model/publisher';
import {PUBLISHERS} from '../mock-data/mock-publishers';
import {Observable, of} from 'rxjs';
import {MessagesService} from './util/messages.service';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  constructor(private messageService: MessagesService) {
  }

  getPublishers(): Observable<Publisher[]> {
    return of(PUBLISHERS).pipe(tap(
      () => this.messageService.add('PublisherService: fetched publishers')
    ));
  }

  getPublisher(id: number): Observable<Publisher> {
    this.messageService.add(`PublisherService: fetching publisher id=${id}`);
    return of(PUBLISHERS.find(publisher => publisher.id === id));
  }
}
