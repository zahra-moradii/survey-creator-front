import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DeleteService } from 'src/app/services/delete.service';
import { GetService } from 'src/app/services/get.service';
import { GetOneService } from 'src/app/services/getOne.service';
import { PutService } from 'src/app/services/update.service';

@Component({
  selector: 'app-search-forms',
  templateUrl: './search-forms.component.html',
  styleUrls: ['./search-forms.component.scss']
})
export class SearchFormsComponent implements OnInit {
  selectedOption: any = "name";
  surveys: any;
  foundSurveysByName: any = [];
  foundSurveysByCode: any = [];
  titleSearch: any;
  codeSearch: any;
  clicked1: boolean = false;
  clicked2: boolean = false;
  len: any;
  codeValue: any;
  isFormEditable: boolean[] | any = [];
  today: any = new Date().toISOString();
  brc: any = "rgb(133, 133, 133)";
  formShareLink: string  |any;
  packagePrice: any | object;

  constructor( private get: GetService,
    private router: Router,
    private delet: DeleteService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private getOne: GetOneService,
    private put: PutService) { }

  ngOnInit(): void {
    this.get.checkPackage().subscribe((res: any) => {
      this.packagePrice = res.data.packagePrice;
    });
  }

  onSearchByName(title: any){
    this.clicked1 = true;
    this.foundSurveysByName = [];
    this.get.searchSurveysByTitle(title).subscribe(
      (res: any) => {
        this.foundSurveysByName = res.data;
      }
    )
  }

  onSearchByCode(code: any){
    this.clicked2 = true;
    this.foundSurveysByCode = [];
    this.get.searchSurveysByCode(code).subscribe(
      (res: any) => {
        this.foundSurveysByCode = res.data;
      }
    )
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
export class ErrSnackbar {};
