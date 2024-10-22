import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { SharedInfo } from '../../../services/shared.info.service';
/**
 * @title Autosize sidenav
 */
@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.html',
  styleUrls: ['./sidenav.css'],
})
export class SidenavAutosizeExample implements OnInit {
  showFiller = false;
  byPackage: any | object;
  displayObservable: any;
  constructor(
    public authService: PostService,
    private shared: SharedInfo,
    private _Auth: GetService,
    private _router: Router,
    private snackBar: MatSnackBar
  ) {
    this.displayObservable = {};
    this.shared.userInfo.subscribe((data) => {
      this.displayObservable = data;
    });
  }
  ngOnInit(): void {
    if (this.authService.loggedin()) {
      this._Auth.checkPackage().subscribe({
        next: (res) => {
          this.byPackage = res.data.packagePrice;
          console.log("byPackage", this.byPackage);
        },
        error: (err) => {
          this.byPackage = null;
        },
      });
    }
  }
  changeroute() {
    if(!this.authService.loggedin())
        this._router.navigate(['/Login']);
    else if (this.byPackage && this.byPackage.forms != 0) {
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

  check() {
    if (this.byPackage && this.authService.loggedin()) return true;
    return false;
  }
  get_info() {
    if (
      ((this.displayObservable.firstName ===
        this.displayObservable.lastName) ===
        this.displayObservable.companyName) ===
      null
    )
      return true;
    if (this.displayObservable.options === 'Legal')
      return 'شرکت' + ' ' + this.displayObservable.companyName;

    return (
      this.displayObservable.firstName + ' ' + this.displayObservable.lastName
    );
  }
  admin() {
    if (
      this.displayObservable.permission &&
      this.displayObservable.permission.filter((t: string) => t === 'admin')
        .length > 0
    )
      return true;
    return false;
  }
  showSnackbarAction() {
    this.snackBar.openFromComponent(OkSnackbar, {
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
}
@Component({
  selector: 'err-snackbar',
  template: `<span>.برای ساخت فرم نظرسنجی، باید پکیج خریداری کنید</span>`,
})
export class OkSnackbar {}

@Component({
  selector: 'err-snackbar',
  template: `<span>سقف ساخت فرم‌های نطرسنجی شما به اتمام رسیده است</span>`,
})
export class FinishSnackbar {}
