import { Router, Params, ActivatedRoute } from '@angular/router';
import { Comicbook } from '../model/comicbook';
import { RouterLinks } from './router-links';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RoutingService {

    constructor(protected router: Router, protected activatedRoute: ActivatedRoute) { }

    navigateToComicbook(comicbook: Comicbook, replaceUrl?: boolean): Promise<any> {
        return this.router.navigate(
            ['/', RouterLinks.Comicbook, comicbook.id],
            {
                state: { comicbook: comicbook },
                replaceUrl: replaceUrl
            }
        );
    }

    navigateToNewComicbook(): Promise<any> {
        return this.router.navigate([RouterLinks.NewComicbook]);
    }

    navigateToComicbooks(): Promise<any> {
        return this.router.navigate([RouterLinks.Comicbooks]);
    }

    updateQueryParams(params: Params, replaceUrl?: boolean): Promise<any> {
        return this.router.navigate(
            [],
            {
                relativeTo: this.activatedRoute,
                queryParams: params,
                queryParamsHandling: 'merge',
                replaceUrl: replaceUrl
            }
        );
    }
}
