import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetOneService } from '../../../services/getOne.service';
import { FormGroup } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { ActivatedRoute } from '@angular/router';
import { Questions, Register, SurveyAnswers } from './models';
import { PostService } from '../../../services/post.service';
import moment from 'jalali-moment';
import { IActiveDate } from 'ng-persian-datepicker';
import { PutService } from 'src/app/services/update.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-survey',
  templateUrl: './view-survey.component.html',
  styleUrls: ['./view-survey.component.scss'],
  providers: [
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
    },
  ],
})
export class ViewSurveyComponent implements OnInit {
  //creatorId: any = localStorage.getItem('userId');

  usersAnswers = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };
  formView: any | Object;
  viewGroup: FormGroup | any;
  id: any;
  code: any;
  answerCount: number | any;

  isFormEnable: boolean = true;
  today:any = new Date().toISOString();
  startDate: any;
  endDate: any;
  dateSelected: any = "انتخاب تاریخ";

  hasToken: any = localStorage.getItem('token')? true : false;

  constructor(
    private getOneFormReviews: GetOneService,
    private router: Router,
    private _Activatedroute: ActivatedRoute,
    private saveFormAnswers: PostService,
    private put: PutService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.code = this._Activatedroute.snapshot.paramMap.get('code');
    this.getOneFormReviews
      .getOneFormReview(this.code)
      .subscribe((ret: any | Object) => {
        this.startDate = ret.data.startDate;
        this.endDate = ret.data.expireDate;

        if(this.startDate > this.today || this.endDate < this.today){
          this.isFormEnable = false;
        }

        console.log('ret', ret.data);
        this.id = ret.data._id;
        this.answerCount = ret.data.answersCount;
        console.log('ID', this.id);
        ret.data.question.map(
          (qst: { selectedAnswers: unknown }) => (qst.selectedAnswers = [])
        );
        this.formView = ret.data;
      });


  }

  onSelectDate(event: IActiveDate, date: any): void {
    this.dateSelected = new Date(event.gregorian);
    // this.dateSelected = moment(this.dateSelected,"YYYY-M-D HH:mm:ss").locale("fa").format("D MMMM YYYY");

    date = new Date(event.gregorian);
    // date = moment(this.dateSelected,"YYYY-M-D HH:mm:ss").locale("fa").format("D MMMM YYYY");
    console.log("DATE",date);
    console.log("DATESELECTED", this.dateSelected);
  }

  counter(num: number) {
    return Array(num);
  }

  showSnackbarActionErr() {
    this.snackBar.openFromComponent(ErrorSnackbar, {
      duration: 1 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'err',
    });
  }

  onSubmit() {
    this.postSurvey();
  }

  postSurvey() {
    console.log('formView.question', this.formView.question);

    //console.log("creatorId", this.creatorId);
    let Registrator: Register = {
      FirstName: this.usersAnswers.firstName,
      LastName: this.usersAnswers.lastName,
      Email: this.usersAnswers.email,
      Phone: this.usersAnswers.phone,
    };
    let Questions: Questions[] = [];
    let surveyAnswers = new SurveyAnswers(
      Registrator,
      Questions,
      this.id,
      false,
      null
    );

    let i = 0;
    this.formView.question.forEach(() => {
      let questionItem: Questions = {
        Code: this.formView.question[i].Code,
        Title: this.formView.question[i].Title,
        UserAnswers: this.formView.question[i].Answers,
        SelectedAnswers: this.formView.question[i].selectedAnswers,
        Type: this.formView.question[i++].Type,
      };

      surveyAnswers.Questions.push(questionItem);
    });

    const formReviewAnswer = {
      //creatorId: this.creatorId,
      registrator: surveyAnswers.Registrator,
      questions: surveyAnswers.Questions,
      formReviews: surveyAnswers.formReviews,
      isViewed: surveyAnswers.isViewed,
      viewBy: null
    };
    console.log('formReviewAnswer', formReviewAnswer);

    this.saveFormAnswers.saveFormReviewAnswers(formReviewAnswer).subscribe({
      next: (res) => {
        console.log('res', res);
        this.put.updateFormReview(this.id, {"answersCount": this.answerCount+1}).subscribe(
          (res) => {
            console.log("form updated", res);
          }
        )
        this.router.navigate(['/SuccessAnswer', res.data.code]);
      },
      error: (err: any) => {
        console.log(err);
        this.showSnackbarActionErr();
      },
    });
  }
}
@Component({
  selector: 'err-snackbar',
  template: `<span>مشکلی پیش آمده لطفا مجددا تلاش کنید</span>`,
})
export class ErrorSnackbar {}
