import { Injectable } from '@angular/core';
import {Publisher} from '../model/publisher';
import {PUBLISHERS} from '../mock-data/mock-publishers';
import {Observable, of} from 'rxjs';
import {MessagesService} from './util/messages.service';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  constructor(private messageService: MessagesService) {
  }

  getPublishers(): Observable<Publisher[]> {
    // TODO: send the message _after_ fetching the data
    this.messageService.add('PublisherService: fetched publishers');
    return of(PUBLISHERS);
  }
}
