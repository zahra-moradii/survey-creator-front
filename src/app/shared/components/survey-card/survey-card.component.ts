import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { Survey, Question } from './models';
import { Router } from '@angular/router';
import { GetOneService } from 'src/app/services/getOne.service';
import moment from 'jalali-moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetService } from 'src/app/services/get.service';
import { PutService } from 'src/app/services/update.service';

export interface QuestionType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-survey-card',
  templateUrl: './survey-card.component.html',
  styleUrls: ['./survey-card.component.scss'],
})
export class SurveyCardComponent implements OnInit {
  timeEnable:boolean=true;
  surveyForm: FormGroup | any;
  selectedOption: any[] = [];

  questionTypes: QuestionType[] = [
    { value: 'Radio Button', viewValue: 'تک انتخابی' },
    { value: 'Check Box', viewValue: 'چند انتخابی' },
    { value: 'Text', viewValue: 'متنی' },
    { value: 'Calendar', viewValue: 'تقویم' },
  ];

  packagePrice: any | object;
  byPackage: any | object = [];

  constructor(private postFormReview: PostService, private router: Router,
    private put: PutService,private snackBar: MatSnackBar,private get: GetService) {}

  ngOnInit() {
    this.get.checkPackage().subscribe({
      next: (res) => {
        this.byPackage = res.data.packagePrice;
        console.log("byPackage", this.byPackage);
      },
      error: (err) => {
        this.byPackage = null;
      },
    });
    this.initForm();
    this.get.checkPackage().subscribe(
      (res:any) => {
        this.packagePrice = res.data.packagePrice;
      }
    )
  }

  private initForm() {
    let surveyTitle = '';
    let surveyQuestions = new FormArray([]);

    this.surveyForm = new FormGroup({
      surveyTitle: new FormControl(surveyTitle, [Validators.required]),
      surveyQuestions: surveyQuestions,
      start: new FormControl(),
      end: new FormControl(),
    });

    this.onAddQuestion();
  }

  onAddQuestion() {
    console.log('Question added', this.surveyForm);

    const surveyQuestionItem = new FormGroup({
      questionTitle: new FormControl('', Validators.required),
      questionType: new FormControl('', Validators.required),
      questionGroup: new FormGroup({}),
    });

    (<FormArray>this.surveyForm.get('surveyQuestions')).push(
      surveyQuestionItem
    );
  }

  onRemoveQuestion(index: number) {
    this.surveyForm.controls.surveyQuestions['controls'][
      index
    ].controls.questionGroup = new FormGroup({});
    this.surveyForm.controls.surveyQuestions['controls'][
      index
    ].controls.questionType = new FormControl({});

    (<FormArray>this.surveyForm.get('surveyQuestions')).removeAt(index);
    this.selectedOption.splice(index, 1);
    console.log('Question Removed');
  }

  onSelectQuestionType(questionType: string, index: any) {
    if (questionType === 'Radio Button' || questionType === 'Check Box') {
      this.addOptionControls(questionType, index);
    }
  }

  addOptionControls(questionType: any, index: string | number) {
    let options = new FormArray([]);

    this.surveyForm.controls.surveyQuestions['controls'][
      index
    ].controls.questionGroup.addControl('options', options);
    this.clearFormArray(
      <FormArray>(
        this.surveyForm.controls.surveyQuestions['controls'][index].controls
          .questionGroup.controls.options
      )
    );

    this.addOption(index);
    this.addOption(index);
  }

  private clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }

  addOption(index: string | number) {
    console.log('Option added');
    const optionGroup = new FormGroup({
      optionText: new FormControl('', Validators.required),
    });
    console.log('option : ',this.surveyForm.controls.surveyQuestions['controls'][index].controls
    .questionGroup);
    (<FormArray>(
      this.surveyForm.controls.surveyQuestions['controls'][index].controls
        .questionGroup.controls.options
    )).push(optionGroup);
  }

  removeOption(questionIndex: string | number, itemIndex: number) {
    console.log('Option removed');
    (<FormArray>(
      this.surveyForm.controls.surveyQuestions['controls'][questionIndex]
        .controls.questionGroup.controls.options
    )).removeAt(itemIndex);
  }

  showSnackbarActionErr() {
    this.snackBar.openFromComponent(ErrorSnackbar, {
      duration: 2 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'err',
    });
  }

  showSnackbarActionTime() {
    this.snackBar.openFromComponent(timeSnackbar, {
      duration: 1 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'err',
    });
  }

  showSnackbarActionF() {
    this.snackBar.openFromComponent(FinishSnackbar, {
      duration: 3 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'finish',
    });
  }

  postSurvey() {
    //Review for define and using data from formData- Single Object
    let formData = this.surveyForm.value;
    let Code = ' ';
    let Question: Question[] = [];
    let surveyQuestions = formData.surveyQuestions;

    let survey = new Survey(formData.surveyTitle, Code, Question, formData.start, formData.end, 0);
    console.log('formdata', formData);

    let i = 0;
    surveyQuestions.forEach(
      (question: {
        questionType: any;
        questionTitle: any;
        questionGroup: { options: any[] };
      }) => {
        let questionItem: Question = {
          Code: String(++i),
          Title: question.questionTitle,
          Answers: question.questionGroup.options,
          Type: question.questionType,
        };

        survey.question.push(questionItem);
        console.log('Question added in for each block');
      }
    );

    console.log('formdata', formData);
    console.log('Survey', survey);

    const formReview = {
      title: survey.title,
      code: survey.code,
      question: survey.question,
      startDate: moment.from(
        survey.startDate.toString(),
        'fa', 'YYYY/M/D HH:mm'
      ).format("YYYY-M-D HH:mm:ss"),
      expireDate: moment.from(
        survey.expireDate.toString(),
        'fa', 'YYYY/M/D HH:mm'
      ).format("YYYY-M-D HH:mm:ss"),
      answersCount: 0,
    };

    const packagePrice = {packagePrice : {
      packageId: this.packagePrice.packageId,
      duration: this.packagePrice.duration,
      price: this.packagePrice.price,
      users: this.packagePrice.users,
      forms: this.packagePrice.forms - 1
    }
  }

    console.log('form Review : ',formReview)
    console.log('packagePrice : ',packagePrice)

if(formReview.startDate < formReview.expireDate){
    if(this.byPackage.forms != 0){
    this.postFormReview.saveFormReview(formReview).subscribe({
      next: (res) => {
        console.log('res', res);
        this.put.updatePackageForms(packagePrice).subscribe(
          (res:any) => {
            console.log(res);
          }
        )
        this.router.navigate(['/Success', res.data.code]);
      },
      error: (err: any) => {
        console.log(err);
        this.showSnackbarActionErr();
      },
    });
}else if(this.byPackage.forms == 0){
  this.showSnackbarActionF();
}
}else{
  this.showSnackbarActionTime();
}
}

  onSubmit() {
    this.postSurvey();
  }
}

@Component({
  selector: 'err-snackbar',
  template: `<span>مشکلی پیش آمده لطفا مجددا تلاش کنید</span>`,
})
export class ErrorSnackbar {}

@Component({
  selector: 'err-snackbar',
  template: `<span>تاریخ پایان فرم نظرسنجی باید بعد از تاریخ شروع باشد</span>`,
})
export class timeSnackbar {}

@Component({
  selector: 'err-snackbar',
  template: `<span>سقف ساخت فرم‌های نطرسنجی شما به اتمام رسیده است</span>`,
})
export class FinishSnackbar {}
