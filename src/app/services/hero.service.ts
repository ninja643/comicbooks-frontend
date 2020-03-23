import { Injectable } from '@angular/core';
import { Publisher } from '../model/publisher';
import { PUBLISHERS } from '../mock-data/mock-publishers';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ComicbooksHttpClient } from './comicbooks-http-client';
import { Hero } from '../model/hero';
import { HEROES } from '../mock-data/mock-heroes';
import { getById, saveById, deleteById } from '../mock-data/mock-common';

@Injectable({
    providedIn: 'root'
})
export class HeroService {

    private heroUrl = '/hero';

    constructor(
        private httpClient: ComicbooksHttpClient) {
    }

    getHeroes(): Observable<Hero[]> {
        return of(HEROES.slice());
        return this.httpClient.get<Hero[]>(this.heroUrl);
    }

    getHero(id: number): Observable<Hero> {
        return of(getById<Hero>(HEROES, id));
        const url = `${this.heroUrl}/${id}`;

        return this.httpClient.get<Hero>(url);
    }

    saveHero(hero: Hero): Observable<Hero> {
        return of(saveById<Hero>(HEROES, hero));
        return this.httpClient.post(this.heroUrl, hero);
    }

    deleteHero(heroId: number): Observable<void> {
        return of(deleteById<Hero>(HEROES, heroId));
        return this.httpClient.delete(`${this.heroUrl}/${heroId}`);
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
