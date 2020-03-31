import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupResponseEnum } from '../popup-response';

@Component({
    templateUrl: 'confirmation-popup.component.html',
    styleUrls: ['confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent {

    title: string;
    content: string;
    confirmButtonText: string;
    rejectButtonText: string;

    PopupResponseEnum = PopupResponseEnum;    

    constructor(public activeModal: NgbActiveModal) {}

}