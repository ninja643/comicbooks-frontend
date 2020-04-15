import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupResponseEnum } from '../popup-response';

@Component({
	templateUrl: 'information-popup.component.html',
	styleUrls: ['information-popup.component.scss']
})
export class InformationPopupComponent {

	title: string;
	content: string;
	closeButtonText: string = 'Close';

	PopupResponseEnum = PopupResponseEnum;

	constructor(public activeModal: NgbActiveModal) {
	}
}
