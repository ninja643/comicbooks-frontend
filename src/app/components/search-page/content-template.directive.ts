import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
	selector: '[content-template]'
})

export class ContentTemplateDirective {

	@Input('content-template') columnId: string;

	constructor(public templateRef: TemplateRef<any>) {
	}
}
