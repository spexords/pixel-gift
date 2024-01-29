import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'breakLines',
  standalone: true
})
export class BreakLinesPipe implements PipeTransform {
  transform(value:string): string {
    return value.replace(/\r\n/g, '<br>')
  }
}
