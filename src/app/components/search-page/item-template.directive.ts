import { Directive, TemplateRef } from '@angular/core';

@Directive({
	selector: '[item-template]'
})
export class ItemTemplateDirective {
	
	constructor(public templateRef: TemplateRef<any>) {
	}
}
