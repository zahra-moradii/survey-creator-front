import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedInfo } from '../../../services/shared.info.service';

/** @title Form field with prefix & suffix */
@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class FormFieldPrefixSuffixExample implements OnInit {
  hide = true;
  submitted = false;
  onSubmit() {
    this.submitted = true;
  }
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'باید مقداری را وارد کنید.';
    }

    return this.email.hasError('email') ? 'ایمیل صحیح نیست.' : '';
  }
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(10),
  ]);

  getErrorMessage_p() {
    if (this.password.hasError('required')) {
      return 'باید مقداری را وارد کنید.';
    }

    return 'باید بین 6 تا 10 حرف باشد.';
  }
  errmsg() {}

  loginUserData = {
    userName: '',
    password: '',
  };
  constructor(
    private _Auth: PostService,
    private _router: Router,
    private snackBar: MatSnackBar,
    private shared: SharedInfo
  ) {}

  errormsg = '';
  okmsg = '';
  fname = '';
  lname = '';
  uname = '';
  cname = '';
  ph = '';
  op = '';
  loginUser() {
    console.log(this.loginUserData);
    this._Auth.loginUser(this.loginUserData).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.userinfo));
        //localStorage.setItem('userId', res.userinfo._id);
        this.shared.userInfo.next(res.userinfo);
        if (res.userinfo.permission[2] === 'SW')
          this._router.navigate(['/AdminPanel']);
        else this._router.navigate(['/dashboard']);
        this.showSnackbarActionOk();
      },
      error: (err) => {
        this.errmsg = err.error.message;
        console.log(this.errmsg);
        this.showSnackbarActionErr();
      },
    });
  }
  ngOnInit() {}
  showSnackbarActionErr() {
    this.snackBar.openFromComponent(ErrorSnackbar, {
      duration: 1 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'err',
    });
  }
  showSnackbarActionOk() {
    this.snackBar.openFromComponent(OkSnackbar, {
      duration: 1 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'ok',
    });
  }
}
@Component({
  selector: 'err-snackbar',
  template: `<span>.نام کاربری یا رمز عبور اشتباه است</span>`,
})
export class ErrorSnackbar {}
@Component({
  selector: 'err-snackbar',
  template: `<span>.با موفقیت وارد شدید</span>`,
})
export class OkSnackbar {}
