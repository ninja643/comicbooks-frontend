import { Directive, TemplateRef, Input } from '@angular/core';

@Directive({
    selector: '[header-template]'
  })
  export class HeaderTemplate  {

    @Input('header-template') columnId: string;
      
    constructor(public templateRef: TemplateRef<any>) {}

  }