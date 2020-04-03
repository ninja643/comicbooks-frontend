import { ChangeDetectorRef, Component, Injector } from "@angular/core";
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EntityPage } from 'src/app/common/entity-page';
import { RouterLinks } from 'src/app/common/router-links';
import { RoutingService } from 'src/app/common/routing.service';
import { Attachment } from 'src/app/model/attachment';
import { Publisher } from 'src/app/model/publisher';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { PublisherService } from 'src/app/services/publisher.service';

@Component({
    templateUrl: 'publisher.component.html'
})
export class PublisherComponent extends EntityPage<Publisher> {

    shownPicture: string;

    private get pictureControl(): AbstractControl {
        return this.form.get('picture');
    }

    constructor(injector: Injector,
        protected routingService: RoutingService,
        protected publisherService: PublisherService,
        protected formBuilder: FormBuilder,
        protected fileUploadService: FileUploadService,
        protected cdRef: ChangeDetectorRef) {
            super(injector, RouterLinks.NewPublisher, 'publisherId', 'publisher', 'publisher');
    }

    protected getEntity(): Observable<Publisher> {
        return this.publisherService.getPublisher(this.entityId)
    }

    protected saveEntity(): Observable<Publisher> {
        const publisherToSave: Publisher = this.getPublisherFromForm();
        return new Observable<Publisher>(resolve => {
            const pictureObservable: Observable<Attachment> = this.pictureControl.value ?
                this.fileUploadService.uploadFile(this.pictureControl.value, this.shownPicture)
                : of(publisherToSave.picture);

            pictureObservable.subscribe((attachment: Attachment) => {
                publisherToSave.picture = attachment;
                this.publisherService.savePublisher(publisherToSave)
                    .subscribe(publisher => {
                        this.routingService.navigateToPublisher(publisher, true)
                        resolve.next(publisher)
                        resolve.complete();
                    });
            });
        });
    }

    protected deleteEntity(): Observable<any> {
        return this.publisherService.deletePublisher(this.entity.id)
            .pipe(tap(() => this.routingService.navigateToPublishers()));
    }

    protected getEntityName(): string {
        return this.entity.name;
    }

    protected buildForm(): void {
        this.form = this.formBuilder.group({
            name: [undefined, Validators.required],
            picture: []
        });
        this.form.disable();

        this.pictureControl.valueChanges.subscribe({
            next: (file: File) => {
                if (file) {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        this.shownPicture = <string>reader.result;
                        this.cdRef.markForCheck();
                    };
                }
            }
        });
    }

    protected makeFormValue(publisher: Publisher): any {
        return {
            name: publisher.name,
            picture: null
        };
    }

    // Override
    protected setEntity(publisher: Publisher): void {
        super.setEntity(publisher);
        this.shownPicture = publisher.picture ? publisher.picture.url : null;
    }

    private getPublisherFromForm(): Publisher {
        const formValue = this.form.getRawValue();
        return {
            ...this.entity,
            name: formValue.name,
            picture: this.entity.picture
        }
    }
}