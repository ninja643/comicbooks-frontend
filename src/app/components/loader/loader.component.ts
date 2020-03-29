import { Component, Input, HostListener } from '@angular/core';

@Component({
    selector: 'loader',
    templateUrl: 'loader.component.html',
    styleUrls: ['loader.component.scss']
})
export class LoaderComponent {

    @Input() busy: boolean;

    @HostListener('document:keydown', ['$event']) handleKeyboardEvent(event: KeyboardEvent) {
        if (this.busy) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
}