import { Component } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Comicbook } from 'src/app/model/comicbook';
import { ComicbookService } from 'src/app/services/comicbook.service';
import { LoaderStatus } from 'src/app/common/loader-status';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Publisher } from 'src/app/model/publisher';
import { Hero } from 'src/app/model/hero';
import { PublisherService } from 'src/app/services/publisher.service';
import { HeroService } from 'src/app/services/hero.service';

@Component({
    templateUrl: 'comicbook.component.html',
    styleUrls: ['comicbook.component.scss']
})
export class ComicbookComponent {

    comicbookForm: FormGroup;
    publishers: Publisher[] = [];
    heroes: Hero[] = [];

    private _comicbook: Comicbook;
    set comicbook(value: Comicbook) {
        this._comicbook = value;
        this.comicbookForm.reset(this.makeFormValue(value));
    }
    get comicbook(): Comicbook {
        return this._comicbook;
    }

    private loaderStatus: LoaderStatus = new LoaderStatus();

    private comicbookId: number;

    constructor(protected activatedRoute: ActivatedRoute,
        protected comicbookService: ComicbookService,
        protected formBuilder: FormBuilder,
        protected publisherService: PublisherService,
        protected heroService: HeroService) {
        this.initialize();

        this.activatedRoute.params.subscribe(params => {
            const comicbookId: number = params['comicbookId'];
            if (comicbookId) {
                this.comicbookId = comicbookId;
                const comicbook: Comicbook = window.history.state ? window.history.state.comicbook : null;
                if (comicbook) {
                    this.comicbook = comicbook;
                }
                else {
                    this.patchComicbook();
                }
            }
        });
    }

    defaultTrackBy(index: number, item: any): number {
        return item.id;
    }

    private initialize(): void {
        this.buildForm();

        this.loaderStatus.showLoader();
        this.publisherService.getPublishers()
            .pipe(finalize(() => this.loaderStatus.hideLoader()))
            .subscribe({
                next: (publishers: Publisher[]) => this.publishers = publishers
            });

        this.loaderStatus.showLoader();
        this.heroService.getHeroes()
            .pipe(finalize(() => this.loaderStatus.hideLoader()))
            .subscribe({
                next: (heroes: Hero[]) => this.heroes = heroes
            });
    }

    private buildForm(): void {
        this.comicbookForm = this.formBuilder.group({
            number: [undefined, Validators.required],
            title: [undefined, Validators.required],
            frontPageUrl: [],
            publisher: [undefined, Validators.required],
            heroes: []
        });
    }

    private makeFormValue(comicbook: Comicbook): any {
        return {
            number: comicbook.number,
            title: comicbook.title,
            frontPageUrl: comicbook.frontPageUrl,
            publisher: comicbook.publisher,
            heroes: comicbook.heroes
        };
    }

    private patchComicbook(): void {
        this.loaderStatus.showLoader();
        this.comicbookService.getComicbook(this.comicbookId)
            .pipe(finalize(() => this.loaderStatus.hideLoader()))
            .subscribe({
                next: (comicbook: Comicbook) => this.comicbook = comicbook
            });
    }

}