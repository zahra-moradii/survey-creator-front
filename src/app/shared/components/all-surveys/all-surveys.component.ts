import { Component, OnInit } from '@angular/core';
import { GetService } from '../../../services/get.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Router } from '@angular/router';
import { DeleteService } from 'src/app/services/delete.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { GetOneService } from 'src/app/services/getOne.service';
import { PutService } from 'src/app/services/update.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-all-surveys',
  templateUrl: './all-surveys.component.html',
  styleUrls: ['./all-surveys.component.scss'],
  animations: [
    trigger('bodyExpansion', [
      state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition(
        'expanded <=> collapsed, void => collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class AllSurveysComponent implements OnInit {
  surveys: any | object = [];
  codeValue: any;
  selectedOption: any = "all";
  today: any = new Date().toISOString();
  packagePrice: any | object;
  brc: any = "rgb(133, 133, 133)";
  formShareLink: string  |any;

  constructor(
    private get: GetService,
    private router: Router,
    private delet: DeleteService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private getOne: GetOneService,
    private put: PutService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.init();
  }

  init(){
    this.get
      .getAllFormReviewsByUserId()
      .subscribe((ret: any | Object) => {
        console.log('all surveys', ret.data);
        this.surveys = ret.data;
        this.surveys.reverse();
        console.log("TODAY", this.today);
        this.surveys.forEach((el:any) => {
          console.log("start Date", el.startDate);
     });
      });

    this.get.checkPackage().subscribe((res: any) => {
        this.packagePrice = res.data.packagePrice;
      });
  }

  onCopyLink(code: any){
    this.formShareLink = "http://localhost:4200/ViewSurvey/" + code;
    return true;
  }

  checkStyle(survey: any){
    if(survey.startDate > this.today){
      this.brc = 'rgb(133, 133, 133)';
      return true;
    }else if(survey.startDate <= this.today && survey.expireDate >= this.today){
      this.brc = '#000080';
      return true;
    }else if(survey.expireDate < this.today){
      this.brc = 'rgb(133, 133, 133)';
      return true;
    }
    return true;
  }

  onScroll() {
    console.log("scrolled!!");
    this.spinner.show();
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
      duration: 1 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'copy',
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

  showSnackbarActionErr() {
    this.snackBar.openFromComponent(ErrSnackbar, {
      duration: 3 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'err',
    });
  }

  onViewSurvey(code: any) {
    this.router.navigate(['/ViewSurvey', code]);
  }

  onActiveFormDelete(survey: any){
    if(survey.startDate <= this.today && survey.expireDate >= this.today){
      this.showSnackbarActionF();
  }
  }

  onDelete(survey: any) {
    const packagePrice = {
      packagePrice: {
        packageId: this.packagePrice.packageId,
        duration: this.packagePrice.duration,
        price: this.packagePrice.price,
        users: this.packagePrice.users,
        forms: this.packagePrice.forms + 1,
      },
    };

  if(survey.startDate > this.today){
    this.getOne.getOneFormReviewById(survey._id).subscribe(
      (res:any) => {
        console.log(res);
        this.put.updatePackageForms(packagePrice).subscribe(
          (res:any) => {
            console.log(res);
          })
    this.delet.deleteOneFormReview(survey._id).subscribe(
      (res) => {
      console.log('delete formReview', res);
          this.delet.deleteManyFormReviewAnswers(survey._id).subscribe((res: any) => {
        console.log('delete formReviewAnswer', res);
        location.reload();
      })
        })
    });

  }else if(survey.expireDate < this.today){
    this.getOne.getOneFormReviewById(survey._id).subscribe(
      (res:any) => {
        console.log(res);
          })
    this.delet.deleteOneFormReview(survey._id).subscribe(
      (res) => {
      console.log('delete formReview', res);
          this.delet.deleteManyFormReviewAnswers(survey._id).subscribe((res: any) => {
        console.log('delete formReviewAnswer', res);
        location.reload();
        })
    });
  }
  }

  onEdit(survey: any) {
    if(survey.startDate > this.today)
      this.router.navigate(['/EditFormReview', survey.code]);
    else{
      this.showSnackbarActionErr();
    }
  }

  onAnswers(code: any) {
    this.router.navigate(['ViewAnswers', code]);
  }

  onCopy() {
    this.showSnackbarActionOk();
  }
}

@Component({
  selector: 'err-snackbar',
  template: `<span style="color: black;">کد فرم با موفقیت کپی شد</span>`,
})
export class OkSnackbar {}

@Component({
  selector: 'err-snackbar',
  template: `<span style="color: black;">لینک فرم با موفقیت کپی شد</span>`,
})
export class OkSnackbar2 {}

@Component({
  selector: 'err-snackbar',
  template: `<span>شما مجاز به حذف فرم نظرسنجی فعال نیستید</span>`,
})
export class FinishSnackbar {}

@Component({
  selector: 'err-snackbar',
  template: `<span>شما در بازه محاز ویرایش فرم نظرسنجی قرار ندارید</span>`,
})
export class ErrSnackbar {}
