import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { InformationPopupComponent } from '../components/popups/information/information-popup.component';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    private errorWindow: NgbModalRef;

    constructor(protected ngbModal: NgbModal) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(error => {
            if (!this.errorWindow) {
                this.errorWindow = this.ngbModal.open(InformationPopupComponent, { centered: true });
                const popupInstance: InformationPopupComponent = this.errorWindow.componentInstance;
                popupInstance.title = 'Error';
                popupInstance.content = 'Something went wrong. Please, try again later.';
                this.errorWindow.result.then(() => {
                    this.errorWindow = null;
                });
            }
            throw error;
        }));
    }
}