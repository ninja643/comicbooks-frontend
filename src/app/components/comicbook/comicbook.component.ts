import { Component, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Comicbook } from 'src/app/model/comicbook';
import { ComicbookService } from 'src/app/services/comicbook.service';
import { LoaderStatus } from 'src/app/common/loader-status';
import { finalize, first } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Publisher } from 'src/app/model/publisher';
import { Hero } from 'src/app/model/hero';
import { PublisherService } from 'src/app/services/publisher.service';
import { HeroService } from 'src/app/services/hero.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
    templateUrl: 'comicbook.component.html',
    styleUrls: ['comicbook.component.scss']
})
export class ComicbookComponent {

    comicbookForm: FormGroup;
    publishers: Publisher[] = [];
    heroes: Hero[] = [];
    loaderStatus: LoaderStatus = new LoaderStatus();
    frontPageImage;

    private _editMode: boolean;
    get editMode(): boolean {
        return this._editMode;
    }
    set editMode(value: boolean) {
        this._editMode = value;
        if (value && this.comicbookForm.disabled) {
            this.comicbookForm.enable();
        }
        else if (!value && this.comicbookForm.enabled) {
            this.comicbookForm.disable();
        }
    }

    private _comicbook: Comicbook;
    set comicbook(value: Comicbook) {
        this._comicbook = value;
        this.comicbookForm.reset(this.makeFormValue(value));
        this.frontPageImage = value.frontPageImage ? value.frontPageImage.url : null;
        this.editMode = false;
    }
    get comicbook(): Comicbook {
        return this._comicbook;
    }

    private comicbookId: number;

    private get frontPageImageControl(): AbstractControl {
        return this.comicbookForm.get('frontPageImage');
    }

    constructor(protected activatedRoute: ActivatedRoute,
        protected comicbookService: ComicbookService,
        protected formBuilder: FormBuilder,
        protected publisherService: PublisherService,
        protected heroService: HeroService,
        protected fileUploadService: FileUploadService,
        protected cdRef: ChangeDetectorRef) {
        this.initialize();

        this.activatedRoute.params.subscribe(params => {
            const comicbookId: number = params['comicbookId'];
            if (comicbookId) {
                this.comicbookId = +comicbookId;
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

    edit(): void {
        this.editMode = true;
    }

    delete(): void {
        // TODO add popup confirmation
    }

    async save(): Promise<void> {
        if (this.comicbookForm.untouched) {
            this.comicbookForm.markAllAsTouched();
        }
        if (this.comicbookForm.invalid) {
            return;
        }
        this.loaderStatus.showLoader();
        const comicbookToSave: Comicbook = this.getComicbookFromForm();
        if (this.frontPageImageControl.value) {
            comicbookToSave.frontPageImage = await this.fileUploadService.uploadFile(this.frontPageImageControl.value)
                .pipe(first()).toPromise();
        }
        this.comicbookService.saveComicbook(comicbookToSave)
            .pipe(finalize(() => this.loaderStatus.hideLoader()))
            .subscribe({
                next: (comicbook: Comicbook) => this.comicbook = comicbook
            });
    }

    cancel(): void {
        this.comicbook = this.comicbook;
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
            frontPageImage: [],
            publisher: [undefined, Validators.required],
            heroes: []
        });
        this.comicbookForm.disable();
        
        this.frontPageImageControl.valueChanges.subscribe({
            next: (file: File) => {
                if (file) {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        this.frontPageImage = reader.result;
                        this.cdRef.markForCheck();
                    };
                }
            }
        })
    }

    private makeFormValue(comicbook: Comicbook): any {
        return {
            number: comicbook.number,
            title: comicbook.title,
            frontPageImage: null,
            publisher: comicbook.publisher,
            heroes: comicbook.heroes
        };
    }

    private getComicbookFromForm(): Comicbook {
        const formValue = this.comicbookForm.getRawValue();
        return {
            id: this.comicbook ? this.comicbook.id : null,
            number: formValue.number,
            title: formValue.title,
            frontPageImage: this.comicbook.frontPageImage,
            publisher: formValue.publisher,
            heroes: formValue.heroes
        }
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