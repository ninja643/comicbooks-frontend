import { Injectable } from '@angular/core';
import { Publisher } from '../model/publisher';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ComicbooksHttpClient } from './comicbooks-http-client';
import { Hero } from '../model/hero';
import { getById, saveById, deleteById } from '../mock-data/mock-common';
import { HEROES1, HEROES2, HEROES3, HEROES4, HEROES5, HEROES6, HEROES7 } from '../mock-data/mock-heroes';

@Injectable({
    providedIn: 'root'
})
export class HeroService {

    private heroUrl = '/hero';

    constructor(
        private httpClient: ComicbooksHttpClient) {
    }

    get temporary_getHeroes(): Hero[] {
        return [...HEROES1, ...HEROES2, ... HEROES3, ...HEROES4, ...HEROES5, ...HEROES6, ...HEROES7];
    }

    getHeroes(): Observable<Hero[]> {
        return of(this.temporary_getHeroes);
        return this.httpClient.get<Hero[]>(this.heroUrl);
    }

    getHero(id: number): Observable<Hero> {
        return of(getById<Hero>(this.temporary_getHeroes, id));
        const url = `${this.heroUrl}/${id}`;

        return this.httpClient.get<Hero>(url);
    }

    saveHero(hero: Hero): Observable<Hero> {
        return of(saveById<Hero>(this.temporary_getHeroes, hero));
        return this.httpClient.post(this.heroUrl, hero);
    }

    deleteHero(heroId: number): Observable<void> {
        return of(deleteById<Hero>(this.temporary_getHeroes, heroId));
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
