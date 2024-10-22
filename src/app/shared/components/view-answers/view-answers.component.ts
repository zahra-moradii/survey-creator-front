import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { GetService } from 'src/app/services/get.service';
import { GetOneService } from 'src/app/services/getOne.service';

@Component({
  selector: 'app-view-answers',
  templateUrl: './view-answers.component.html',
  styleUrls: ['./view-answers.component.scss'],
})
export class ViewAnswersComponent implements OnInit {
  formReviewCode: any = this._Activatedroute.snapshot.paramMap.get('code');
  formReviewId: any;
  formReviewAnswers: any = [];
  len: any;
  codeValue: any;
  formShareLink: string = "http://localhost:4200/ViewSurvey/"+this.formReviewCode;
  selectedOption: any = "all";
  brc: any = "rgb(133, 133, 133)";

  constructor(
    private getOne: GetOneService,
    private _Activatedroute: ActivatedRoute,
    private get: GetService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getOne.getOneFormReviewByCode(this.formReviewCode).subscribe((res: any) => {
      this.formReviewId = res.data._id;
      console.log('formReview Id', this.formReviewId);

      this.get
        .getAllFormReviewsAnswersByFormReview(this.formReviewId)
        .subscribe((res: any) => {
          this.formReviewAnswers = res.data;
          this.formReviewAnswers.reverse();
          console.log('formReviewAnswers', this.formReviewAnswers);

        });
    });
  }

  onCopyLink(code: any){
    this.formShareLink = "http://localhost:4200/surveyReadOnly/" + code;
    return true;
  }

  checkStyle(frans: any){
    if(frans.isViewed == true){
      this.brc = 'rgb(133, 133, 133)';
      return true;
    }else if(frans.isViewed == false){
      this.brc = '#000080';
      return true;
    }
    return true;
  }

  onViewAnswer(code: any) {
    this.router.navigate(['/surveyReadOnly', code]);
  }

  showSnackbarActionOk() {
    this.snackBar.openFromComponent(OkSnackbar, {
      duration: 1 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'copy',
    });
  }

  showSnackbarActionOk2() {
    this.snackBar.openFromComponent(OkSnackbar2, {
      duration: 2 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'copy',
    });
  }

  onCopy(code: any) {
    this.codeValue = code;
    this.showSnackbarActionOk();
  }

  onShare(){
    this.showSnackbarActionOk2();
  }
}
@Component({
  selector: 'err-snackbar',
  template: `<span style="color: black;">کد فرم با موفقیت کپی شد</span>`,
})
export class OkSnackbar {}

@Component({
  selector: 'err-snackbar',
  template: `<span style="color: black;">لینک پاسخ فرم نظرسنجی شما با موفقیت کپی شد</span>`,
})
export class OkSnackbar2 {}
