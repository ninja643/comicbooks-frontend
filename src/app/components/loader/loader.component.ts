import { Component, Input, HostListener } from '@angular/core';
import { LoaderStatus } from 'src/app/common/loader-status';

@Component({
    selector: 'loader',
    templateUrl: 'loader.component.html',
    styleUrls: ['loader.component.scss']
})
export class LoaderComponent {

    @Input() status: LoaderStatus;

    @HostListener('document:keydown', ['$event']) handleKeyboardEvent(event: KeyboardEvent) {
        if (this.status.isLoaderVisible) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
}