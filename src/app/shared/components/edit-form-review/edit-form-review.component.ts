import { Component, OnInit } from '@angular/core';
import * as moment from "jalali-moment";
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';
import { Survey, Question } from './models';
import { ActivatedRoute, Router } from '@angular/router';
import { GetOneService } from 'src/app/services/getOne.service';
import { PutService } from 'src/app/services/update.service';
import { IActiveDate } from 'ng-persian-datepicker';

export interface QuestionType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-form-review',
  templateUrl: './edit-form-review.component.html',
  styleUrls: ['./edit-form-review.component.scss'],
})
export class EditFormReviewComponent implements OnInit {
  sd: any;
  ed: any;
  dateRang = {
    startDate :new Date(),
    endDate :new Date()
  }
  surveyInfo: any;
  surveyForm: FormGroup | any;
  profileId: any;
  selectedOption: any[] = [];
  userId: any = localStorage.getItem('userId');
  surveyQuestionItem: FormGroup | any;
  optionGroup: FormGroup | any;
  formReviewCode: any = this._Activatedroute.snapshot.paramMap.get('code');

  questionTypes: QuestionType[] = [
    { value: 'Radio Button', viewValue: 'تک انتخابی' },
    { value: 'Check Box', viewValue: 'چند انتخابی' },
    { value: 'Text', viewValue: 'متنی' },
    { value: 'Calendar', viewValue: 'تقویم' },
    { value: 'File', viewValue: 'فایل' },
  ];

  minDate = new Date();

  constructor(
    private router: Router,
    private getOne: GetOneService,
    private _Activatedroute: ActivatedRoute,
    private put: PutService
  ) {}

  ngOnInit() {
    this.initForm();

    this.getOne.getOneFormReviewByCode(this.formReviewCode).subscribe((res) => {
      this.surveyInfo = res.data;

      let surveyQuestions = new FormArray([]);
      this.surveyForm = new FormGroup({
        surveyTitle: new FormControl(res.data.title),
        surveyQuestions: (surveyQuestions = new FormArray([])),
        start: new FormControl(),
        end: new FormControl(),
      });
      for (let i = 0; i < res.data.question.length; i++) {
        this.surveyQuestionItem = new FormGroup({
          questionTitle: new FormControl(res.data.question[i].Title),
          questionType: new FormControl(res.data.question[i].Type),
          questionGroup: new FormGroup({}),
        });
        this.sd = moment(res.data.startDate,"YYYY-M-D HH:mm:ss").locale("fa").format("D MMMM YYYY HH:mm:ss");
        this.ed = moment(res.data.expireDate,"YYYY-M-D HH:mm:ss").locale("fa").format("D MMMM YYYY HH:mm:ss");
        this.dateRang.startDate = new Date(moment(res.data.startDate,"YYYY-M-D HH:mm:ss").locale("fa").format("D MMMM YYYY HH:mm:ss"));
        this.dateRang.endDate = new Date(moment(res.data.expireDate,"YYYY-M-D HH:mm:ss").locale("fa").format("D MMMM YYYY HH:mm:ss"));

        (<FormArray>this.surveyForm.get('surveyQuestions')).push(
          this.surveyQuestionItem
        );
        if (res.data.question[i].Answers)
          for (let j = 0; j < res.data.question[i].Answers.length; j++) {
            this.addOptionControls(
              res.data.question[i].Type,
              i,
              res.data.question[i].Answers[j].optionText
            );
          }
      }
    });
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

    // this.onAddQuestion();
  }

  onSelectStartDate(event: IActiveDate): void {
    this.dateRang.startDate = new Date(event.gregorian);
    this.sd = moment(this.dateRang.startDate,"YYYY-M-D HH:mm:ss").locale("fa").format("D MMMM YYYY");
  }

  onSelectEndDate(event: IActiveDate): void {
    this.dateRang.endDate = new Date(event.gregorian);
    this.ed = moment(this.dateRang.endDate,"YYYY-M-D HH:mm:ss").locale("fa").format("D MMMM YYYY");

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

  addOptionControls(
    questionType: any,
    index: string | number,
    optionText?: string
  ) {
    let options = new FormArray([]);

    this.surveyForm.controls.surveyQuestions['controls'][
      index
    ].controls.questionGroup.addControl('options', options);
    this.addOption(index,optionText);

    // this.clearFormArray(
    //   <FormArray>(
    //     this.surveyForm.controls.surveyQuestions['controls'][index].controls
    //       .questionGroup.controls.options
    //   )
    // );

    //this.addOption(index);
    // this.addOption(index);
  }

  private clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }

  addOption(index: string | number, optionText?: string) {
    console.log('optionText',optionText )

    const optionGroup = new FormGroup({
      optionText: new FormControl(optionText, Validators.required),
    });
    (<FormArray>(
      this.surveyForm.controls.surveyQuestions['controls'][index].controls
        .questionGroup.controls.options
    )).push(optionGroup);
    console.log(this.surveyForm.controls.surveyQuestions['controls'][index].controls)
  }

  removeOption(questionIndex: string | number, itemIndex: number) {
    console.log('Option removed');
    (<FormArray>(
      this.surveyForm.controls.surveyQuestions['controls'][questionIndex]
        .controls.questionGroup.controls.options
    )).removeAt(itemIndex);
  }

  postSurvey() {
    console.log('this.dateRang',this.dateRang)
    //Review for define and using data from formData- Single Object
    let formData = this.surveyForm.value;
    let Code = ' ';
    let Question: Question[] = [];
    let surveyQuestions = formData.surveyQuestions;

    let survey = new Survey(
      formData.surveyTitle,
      Code,
      Question,
      formData.start,
      formData.end
    );
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
      code: this.surveyInfo.code,
      question: survey.question,
      startDate: this.dateRang.startDate,
      expireDate: this.dateRang.endDate,
    };

    console.log("final survey data", formReview);

    this.put.updateFormReview(this.surveyInfo._id, formReview).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/AllSurveys']);
      },
      error: (err: any) => {
        console.log(err);
      },
  });
  }

  onSubmit() {
    this.postSurvey();
  }
}
