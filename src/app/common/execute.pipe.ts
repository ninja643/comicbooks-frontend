import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'execute'})
export class ExecutePipe implements PipeTransform {

  transform(functionToExecute: (...args: any[]) => any, ...args: any[]): any {
    return functionToExecute(...args);
  }
}