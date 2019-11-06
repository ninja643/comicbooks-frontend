import { Injectable } from '@angular/core';
import {Publisher} from '../model/publisher';
import {PUBLISHERS} from '../mock-data/mock-publishers';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  constructor() { }

  getPublishers(): Observable<Publisher[]> {
    return of(PUBLISHERS);
  }
}
