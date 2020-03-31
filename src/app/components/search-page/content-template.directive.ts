import { Directive, TemplateRef, Input } from '@angular/core';

@Directive({
    selector: '[content-template]'
  })
  export class ContentTemplate  {

    @Input('content-template') columnId: string;
      
    constructor(public templateRef: TemplateRef<any>) {}

  }