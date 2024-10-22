import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isSeen'
})
export class IsSeenPipe implements PipeTransform {

  transform(value: any, isSeen: boolean): any {
    const seenOrNotAnswers: any = [];

    if(isSeen == true){
      value.forEach((el : any) => {
        if(el.isViewed == true)
          seenOrNotAnswers.push(el);
      });
    }
    else if(isSeen == false){
      value.forEach((el : any) => {
        if(el.isViewed == false)
          seenOrNotAnswers.push(el);
      });
    }

    return seenOrNotAnswers;
  }
}
