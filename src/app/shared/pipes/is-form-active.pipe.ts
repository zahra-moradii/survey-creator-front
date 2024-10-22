import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isFormActive'
})
export class IsFormActivePipe implements PipeTransform {

  transform(start: any, end: any): any {
    let today: any = new Date().toISOString();

    if(today >= start && today <= end)
            return "فعال"
    else
          return "غیرفعال"
  }

}
