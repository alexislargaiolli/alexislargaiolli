import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'link'
})
export class LinkPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    let res = value;
    if (res) {
      res = value.replace('http://', '').replace('https://', '');
    }
    return res;
  }

}
