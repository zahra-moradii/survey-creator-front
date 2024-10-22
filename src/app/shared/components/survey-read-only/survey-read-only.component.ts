import { Component, OnInit } from '@angular/core';
import { GetOneService } from '../../../services/getOne.service';
import {
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PutService } from 'src/app/services/update.service';


@Component({
  selector: 'app-survey-read-only',
  templateUrl: './survey-read-only.component.html',
  styleUrls: ['./survey-read-only.component.scss']
})
export class SurveyReadOnlyComponent implements OnInit {
  formView: any | Object;
  id: any;
  code: any;
  formTitle: any;
  formReviewAnswerId: any;
  token: boolean = localStorage.getItem('token')? true:false;

  constructor(
    private getOne: GetOneService,
    private _Activatedroute: ActivatedRoute,
    private put: PutService
  ) {}

  ngOnInit(): void {
    this.code = this._Activatedroute.snapshot.paramMap.get('code');

    this.getOne.getOneFormReviewAnswer(this.code)
      .subscribe((ret: any | Object) => {
        this.formView = ret.data;
        this.formReviewAnswerId = ret.data._id;
        console.log("formReviewAnswerId", this.formReviewAnswerId);
        console.log("formView", this.formView);

        if(localStorage.getItem('token') && ret.data.isViewed == false){
          const data = {
            "isViewed": "true",
            //"viewBy": localStorage.getItem('userId')
          }
        this.put.updateFormReviewAnswer(this.formReviewAnswerId, data).subscribe(
          (res) => {
            console.log("FormReviewAnswer updated", res);
          }
        )
        }

        this.getOne.getOneFormReviewById(this.formView.formReviews).subscribe((ret: any|Object)=>{
          this.formTitle = ret.data.title;
        });
      });


  }

  counter(num: number) {
    return Array(num);
  }

  isCheckedRB(i:any, j:any){
      if(this.formView.questions[i].UserAnswers[j].optionText == this.formView.questions[i].SelectedAnswers)
        return true;
      else
        return false;
  }

  isCheckedCB(i:any, k: any){
      for(let ind=0;ind<this.formView.questions[i].SelectedAnswers.length; ind++){
        if(this.formView.questions[i].UserAnswers[k].optionText == this.formView.questions[i].SelectedAnswers[ind]){
          return true;
        }
  }
  return false;
}

}
