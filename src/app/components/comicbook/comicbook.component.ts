import { ChangeDetectorRef, Component, Injector } from "@angular/core";
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { finalize, tap, map } from 'rxjs/operators';
import { EntityPage } from 'src/app/common/entity-page';
import { RouterLinks } from 'src/app/common/router-links';
import { RoutingService } from 'src/app/common/routing.service';
import { Comicbook } from 'src/app/model/comicbook';
import { Hero } from 'src/app/model/hero';
import { Publisher } from 'src/app/model/publisher';
import { ComicbookService } from 'src/app/services/comicbook.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { HeroService } from 'src/app/services/hero.service';
import { PublisherService } from 'src/app/services/publisher.service';
import { Attachment } from 'src/app/model/attachment';
import { SearchParameters } from '../search-page/search-page.component';
import { SearchResult } from 'src/app/model/search-results';

@Component({
    templateUrl: 'comicbook.component.html',
    styleUrls: ['comicbook.component.scss']
})
export class ComicbookComponent extends EntityPage<Comicbook> {

    publishers: Publisher[] = [];
    heroes: Hero[] = [];
    frontPageImage: string;

    private get frontPageImageControl(): AbstractControl {
        return this.form.get('frontPageImage');
    }

    constructor(injector: Injector,
        protected routingService: RoutingService,
        protected comicbookService: ComicbookService,
        protected formBuilder: FormBuilder,
        protected publisherService: PublisherService,
        protected heroService: HeroService,
        protected fileUploadService: FileUploadService,
        protected cdRef: ChangeDetectorRef) {
            super(injector, RouterLinks.NewComicbook, 'comicbookId', 'comicbook', 'comicbook');
    }

    generatePublisherRouterLink = (publisher: Publisher): string[] =>{
        return ['/', RouterLinks.Publisher, '' + publisher.id];
    }

    generateHeroRouterLink = (hero: Hero): string[] =>{
        return ['/', RouterLinks.Hero, '' + hero.id];
    }

    protected getEntity(): Observable<Comicbook> {
        return this.comicbookService.getComicbook(this.entityId)
    }

    protected saveEntity(): Observable<Comicbook> {
        const comicbookToSave: Comicbook = this.getComicbookFromForm();
        return new Observable<Comicbook>(resolve => {
            const frontPageImageObservable: Observable<Attachment> = this.frontPageImageControl.value ?
                this.fileUploadService.uploadFile(this.frontPageImageControl.value, this.frontPageImage)
                : of(comicbookToSave.frontPageImage);

            frontPageImageObservable.subscribe((attachment: Attachment) => {
                comicbookToSave.frontPageImage = attachment;
                this.comicbookService.saveComicbook(comicbookToSave)
                    .subscribe(comicbook => {
                        this.routingService.navigateToComicbook(comicbook, true)
                        resolve.next(comicbook)
                        resolve.complete();
                    });
            });
        });
    }

    protected deleteEntity(): Observable<any> {
        return this.comicbookService.deleteComicbook(this.entity.id)
            .pipe(tap(() => this.routingService.navigateToComicbooks()));
    }

    protected getEntityName(): string {
        return this.entity.title;
    }

    protected buildForm(): void {
        this.form = this.formBuilder.group({
            number: [undefined, Validators.required],
            title: [undefined, Validators.required],
            frontPageImage: [],
            publisher: [undefined, Validators.required],
            heroes: []
        });
        this.form.disable();

        this.frontPageImageControl.valueChanges.subscribe({
            next: (file: File) => {
                if (file) {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        this.frontPageImage = <string>reader.result;
                        this.cdRef.markForCheck();
                    };
                }
            }
        });
    }

    protected makeFormValue(comicbook: Comicbook): any {
        return {
            number: comicbook.number,
            title: comicbook.title,
            frontPageImage: null,
            publisher: comicbook.publisher,
            heroes: comicbook.heroes
        };
    }

    // Override
    protected initialize(): void {
        super.initialize();
        const getAllItemsSearchParameters: SearchParameters = new SearchParameters(1, 999999, 999999);

        this.loaderStatus.showLoader();
        this.publisherService.getPublishers(getAllItemsSearchParameters)
            .pipe(finalize(() => this.loaderStatus.hideLoader()))
            .subscribe({
                next: (publishersSearchResult: SearchResult<Publisher>) => this.publishers = publishersSearchResult.items
            });

        this.loaderStatus.showLoader();
        this.heroService.getHeroes(getAllItemsSearchParameters)
            .pipe(finalize(() => this.loaderStatus.hideLoader()))
            .subscribe({
                next: (heroesSearchResult: SearchResult<Hero>) => this.heroes = heroesSearchResult.items
            });
    }

    // Override
    protected setEntity(comicbook: Comicbook): void {
        super.setEntity(comicbook);
        this.frontPageImage = comicbook.frontPageImage ? comicbook.frontPageImage.url : null;
    }

    private getComicbookFromForm(): Comicbook {
        const formValue = this.form.getRawValue();
        return {
            ...this.entity,
            number: formValue.number,
            title: formValue.title,
            publisher: formValue.publisher,
            heroes: formValue.heroes
        }
    }
}