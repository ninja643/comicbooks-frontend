import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
	selector: '[header-template]'
})

export class HeaderTemplateDirective {

	@Input('header-template') columnId: string;

	constructor(public templateRef: TemplateRef<any>) {
	}
}
