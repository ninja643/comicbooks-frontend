import { Directive, TemplateRef, Input, HostBinding } from '@angular/core';

@Directive({
    selector: '[background-image]'
})
export class BackgroundImageDirective {

    @Input('background-image') set imageUrl(value: string) {
        this.backgroundImage = 'url(' + value + ')';
    }

    @HostBinding('style.background-image') backgroundImage: string;
}