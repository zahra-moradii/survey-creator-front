import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'answerCountFilter'
})
export class AnswerCountFilterPipe implements PipeTransform {

  transform(value: any, args: any[]): any {
    const sortField = args[0];
    let multiplier = 1;

    if(args[1] == 'desc')
      multiplier = -1;

    value.sort((a: any, b: any) => {
      if(a[sortField] < b[sortField]){
        return -1 * multiplier;
      }else if(a[sortField] > b[sortField]){
        return 1 * multiplier;
      }else{
        return 0;
      }
    })
    console.log("value", value);
    return value
  }

}
