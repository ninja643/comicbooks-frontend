import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchParameters } from '../components/search-page/search-page.component';
import { deleteById, getById, save } from '../mock-data/mock-common';
import { HEROES1, HEROES2, HEROES3, HEROES4, HEROES5, HEROES6, HEROES7, allHeroes } from '../mock-data/mock-heroes';
import { Hero } from '../model/hero';
import { SearchRequest } from '../model/search-request';
import { SearchResult } from '../model/search-results';
import { ComicbooksHttpClient } from './comicbooks-http-client';
import { COMICBOOKS } from '../mock-data/mock-comicbooks';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private url = '/hero';

  constructor(
    private httpClient: ComicbooksHttpClient) {

    // TODO remove
    allHeroes.forEach(hero => {
      hero.comicbooks = COMICBOOKS.filter(comicbook => comicbook.heroes.some(x => x.id == hero.id));
    })
  }



  getHeroes(searchParameters: SearchParameters): Observable<SearchResult<Hero>> {
    return new Observable(subscriber => {
      setTimeout(() => {
        const t = {
          offset: (searchParameters.page - 1) * searchParameters.pageSize,
          count: searchParameters.pageSize,
          totalCount: searchParameters.collectionSize,
          searchText: searchParameters.searchText,
          items: allHeroes.slice().filter(x => x.name.toLowerCase().includes(searchParameters.searchText.toLowerCase()))
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
    return this.httpClient.post<SearchResult<Hero>>(url, requestBody);
  }

  getHero(id: number): Observable<Hero> {
    return new Observable(subscriber => {
      setTimeout(() => {
        subscriber.next(getById<Hero>(allHeroes, id));
        subscriber.complete();
      }, 1500);
    })
    const url = `${this.url}/${id}`;

    return this.httpClient.get<Hero>(url);
  }

  saveHero(hero: Hero): Observable<Hero> {
    return new Observable(subscriber => {
      setTimeout(() => {
        subscriber.next(save<Hero>(allHeroes, hero));
        subscriber.complete();
      }, 1500);
    })
    return this.httpClient.post<Hero>(this.url, hero);
  }

  deleteHero(heroId: number): Observable<void> {
    return new Observable(subscriber => {
      setTimeout(() => {
        subscriber.next(deleteById<Hero>(allHeroes, heroId));
        subscriber.complete();
      }, 1500);
    })
    return this.httpClient.delete(`${this.url}/${heroId}`);
  }
}
