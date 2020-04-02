import { Location } from '@angular/common';
import { Injector, OnInit } from "@angular/core";
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderStatus } from 'src/app/common/loader-status';
import { ConfirmationPopupComponent } from '../components/popups/confirmation/confirmation-popup.component';
import { PopupResponseEnum } from '../components/popups/popup-response';

export abstract class EntityPage<Entity extends { id: number }> implements OnInit{

    form: FormGroup;
    loaderStatus: LoaderStatus = new LoaderStatus();
    saveClicked: boolean;

    private _editMode: boolean;
    get editMode(): boolean {
        return this._editMode;
    }
    set editMode(value: boolean) {
        this._editMode = value;
        if (value && this.form.disabled) {
            this.form.enable();
        }
        else if (!value && this.form.enabled) {
            this.form.disable();
        }
    }

    entity: Entity;

    protected entityId: number;
    protected activatedRoute: ActivatedRoute;
    protected router: Router;
    protected ngbModal: NgbModal;
    protected location: Location;

    constructor(injector: Injector,
        protected newEntityRoute: string,
        protected entityIdQueryParam: string,
        protected routeStateEntityKey: string,
        protected entityTypeName: string) {
        this.activatedRoute = injector.get(ActivatedRoute);
        this.router = injector.get(Router);
        this.ngbModal = injector.get(NgbModal);
        this.location = injector.get(Location);
    }

    ngOnInit(): void {
        this.initialize();
        if (this.router.url.includes(this.newEntityRoute)) {
            this.setEntity(<Entity>{});
        }
        else {
            this.activatedRoute.params.subscribe(params => {
                const entityId: number = params[this.entityIdQueryParam];
                if (entityId) {
                    this.entityId = +entityId;
                    const entity: Entity = window.history.state ? window.history.state[this.routeStateEntityKey] : null;
                    if (entity) {
                        this.setEntity(entity);
                    }
                    else {
                        this.patchEntity();
                    }
                }
            });
        }
    }

    protected abstract getEntity(): Observable<Entity>;
    protected abstract saveEntity(): Observable<Entity>;
    protected abstract deleteEntity(): Observable<any>;
    protected abstract getEntityName(): string;
    protected abstract buildForm(): void;
    protected abstract makeFormValue(entity: Entity): any;

    edit(): void {
        this.editMode = true;
    }

    delete(): void {
        const modalRef: NgbModalRef = this.ngbModal.open(ConfirmationPopupComponent, { centered: true });
        const popupInstance: ConfirmationPopupComponent = modalRef.componentInstance;
        popupInstance.title = `Delete ${this.entityTypeName} \"${this.getEntityName()}\"`;
        popupInstance.content = `Are you sure you want to delete ${this.entityTypeName} \"${this.getEntityName()}\"?`;
        popupInstance.confirmButtonText = "Delete";
        popupInstance.rejectButtonText = "Cancel";
        modalRef.result.then(result => {
            if (result == PopupResponseEnum.Confirm) {
                this.loaderStatus.showLoader();
                this.deleteEntity()
                    .pipe(finalize(() => this.loaderStatus.hideLoader()))
                    .subscribe();
            }
        })
    }

    async save(): Promise<void> {
        this.saveClicked = true;
        this.form.markAllAsTouched();
        if (this.form.invalid) {
            return;
        }
        this.loaderStatus.showLoader();
        this.saveEntity()
            .pipe(finalize(() => this.loaderStatus.hideLoader()))
            .subscribe((entity: Entity) => this.setEntity(entity));
    }

    cancel(): void {
        if (this.entity.id) {
            this.setEntity(this.entity);
        }
        else {
            this.location.back();
        }
    }

    defaultTrackBy(index: number, item: any): number {
        return item.id;
    }

    protected initialize(): void {
        this.buildForm();
    }

    protected setEntity(entity: Entity): void {
        this.entity = entity;
        this.form.reset(this.makeFormValue(entity));
        this.editMode = !entity.id;
    }

    protected patchEntity(): void {
        this.loaderStatus.showLoader();
        this.getEntity()
            .pipe(finalize(() => this.loaderStatus.hideLoader()))
            .subscribe({
                next: (entity: Entity) => this.setEntity(entity)
            });
    }
}