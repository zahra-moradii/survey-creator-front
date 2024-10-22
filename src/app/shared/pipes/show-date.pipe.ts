import { Pipe, PipeTransform } from '@angular/core';
import moment from 'jalali-moment';

@Pipe({
  name: 'showDate'
})
export class ShowDatePipe implements PipeTransform {

  transform(value: any): any {

    return moment(value, 'YYYY-M-D HH:mm:ss').locale('fa').format('D MMMM YYYY');
  }
}
