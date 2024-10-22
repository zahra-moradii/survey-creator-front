import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { GetService } from 'src/app/services/get.service';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-successfull-survey',
  templateUrl: './successfull-survey.component.html',
  styleUrls: ['./successfull-survey.component.scss'],
})
export class SuccessfullSurveyComponent implements OnInit {
  id: string = '';
  code: any;
  codeValue: any;
  byPackage: any | object;

  constructor(private _Activatedroute: ActivatedRoute,private snackBar: MatSnackBar,private get: GetService,
    private _router: Router,
    ) {}

  ngOnInit(): void {
    this.code = this._Activatedroute.snapshot.paramMap.get('code');
    this.codeValue = this.code;
    this.get.checkPackage().subscribe({
      next: (res) => {
        this.byPackage = res.data.packagePrice;
        console.log("byPackage", this.byPackage);
      },
      error: (err) => {
        this.byPackage = null;
      },
    });
  }

  showSnackbarActionOk() {
    this.snackBar.openFromComponent(OkSnackbar, {
      duration: 1 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'copy',
    });
  }

  onCopy(){
    this.showSnackbarActionOk();
  }

  showSnackbarAction() {
    this.snackBar.openFromComponent(OkSnackbar2, {
      duration: 3 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'buy',
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

  changeroute() {
    if (this.byPackage && this.byPackage.forms != 0) {
        this._router.navigate(['/CreateSurvey']);
    }
    else if(this.byPackage && this.byPackage.forms == 0){
      console.log("finish");
      this._router.navigate(['/Packages']);
      this.showSnackbarActionF();
    }
    else {
      this._router.navigate(['/Packages']);
      this.showSnackbarAction();
    }
  }
}

@Component({
  selector: 'err-snackbar',
  template: `<span style="color: black;">کد فرم با موفقیت کپی شد</span>`,
})
export class OkSnackbar {}

@Component({
  selector: 'err-snackbar',
  template: `<span>.برای ساخت فرم نظرسنجی، باید پکیج خریداری کنید</span>`,
})
export class OkSnackbar2 {}

@Component({
  selector: 'err-snackbar',
  template: `<span>سقف ساخت فرم‌های نطرسنجی شما به اتمام رسیده است</span>`,
})
export class FinishSnackbar {}
