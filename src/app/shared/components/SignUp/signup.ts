import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedInfo } from '../../../services/shared.info.service';
import { PutService } from '../../../services/update.service';

interface Type {
  value: string;
  viewValue: string;
}

/**
 * @title Select in a reactive form
 */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
})
export class SelectReactiveFormExample implements OnInit {
  userId: any;
  profileId: any;

  types: Type[] = [
    { value: 'user', viewValue: 'حقیقی' },
    { value: 'legal', viewValue: 'حقوقی' },
  ];
  select: any;
  userControl = new FormControl(this.types[0].value);

  form = new FormGroup({
    user: this.userControl,
  });
  ngOnInit(): void {
    this.select = this.types[0].value;
  }
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(10),
  ]);
  phone = new FormControl('', [
    Validators.required,
    Validators.minLength(11),
    Validators.maxLength(11),
  ]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'باید مقداری را وارد کنید.';
    }
    return this.email.hasError('email') ? 'ایمیل صحیح نیست.' : '';
  }
  getErrorMessage_p() {
    if (this.password.hasError('required')) {
      return 'باید مقداری را وارد کنید.';
    }
    return 'باید بین 6 تا 10 حرف باشد.';
  }
  getErrorMessage_phone() {
    if (this.phone.hasError('required')) {
      return 'باید مقداری را وارد کنید.';
    }
    return 'باید 11 رقم باشد.';
  }
  numberOnly(event: { which: any; keyCode: any }): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  signUpUserData = {
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    phone: '',
    options: 'User',
    profile: '',
  };

  UserProfile = {
    companyName: null,
    owner: null,
    packagePrice: null,
    isLegal: 'false',
  };

  constructor(
    private _url: PostService,
    private put: PutService,
    private _router: Router,
    private snackBar: MatSnackBar,
    private shared: SharedInfo
  ) {}

  signUpUser() {
    this._url.saveProfile(this.UserProfile).subscribe((res) => {
      this.profileId = res.data._id;
      this.signUpUserData.profile = this.profileId;
      console.log('profile created', res);
      console.log('userdata', this.signUpUserData);

      this._url.signUpUser(this.signUpUserData).subscribe(
        (res) => {
          console.log('res', res);
          this.userId = res.userinfo.id;
          localStorage.setItem('token', res.token);
          //localStorage.setItem('userId', res.userinfo.id);
          localStorage.setItem('user', JSON.stringify(res.userinfo));
          this.shared.userInfo.next(res.userinfo);
          console.log('User created', res);

          this.put.updateProfile(this.profileId, { owner: this.userId }).subscribe((res) => {
              console.log('Profile Updated', res);
            });

          this._router.navigate(['/dashboard']);
          this.showSnackbarActionOk();
        },
        (err) => this.showSnackbarActionErr()
      );
    });
  }
  // signUpUser() {
  //   this._url.saveProfile(this.UserProfile).subscribe(
  //     (res) => {
  //       this.profileId = res.data._id
  //       this.signUpUserData.profile = this.profileId;
  //       console.log("profile created", res);
  //       console.log("userdata", this.signUpUserData);
  //       this.signUp();
  //     })
  //     }
  //   signUp(){
  //     this._url.signUpUser(this.signUpUserData).subscribe(
  //       (res) => {
  //          console.log("res",res);
  //          this.userId = res.userinfo._id;
  //          localStorage.setItem('token', res.token);
  //          localStorage.setItem('user', JSON.stringify(res.userinfo));
  //          this.shared.userInfo.next(res.userinfo);
  //          console.log("User created", res);

  //          this.put.updateProfile(this.profileId, {"owner": this.userId}).subscribe(
  //            (res) => {
  //              console.log("Profile Updated", res);
  //            }
  //          )

  //          this._router.navigate(['/dashboard']);
  //          this.showSnackbarActionOk();

  //        },
  //        (err) => this.showSnackbarActionErr()
  //      );
  //   }

  signUpLegalData = {
    companyName: '',
    userName: '',
    password: '',
    phone: '',
    options: 'Legal',
    profile: '',
  };

  LegalProfile = {
    companyName: null,
    owner: null,
    packagePrice: null,
    isLegal: 'true',
  };

  signUpLegal() {

    this._url.saveProfile(this.LegalProfile).subscribe((res) => {
      this.profileId = res.data._id;
      this.signUpLegalData.profile = this.profileId;
      console.log('profile created', res);
      console.log('userdata', this.signUpUserData);

      this._url.signUpUser(this.signUpLegalData).subscribe(
        (res) => {
          console.log('res', res);
          this.userId = res.userinfo.id;
          localStorage.setItem('token', res.token);
          localStorage.setItem('userId', res.userinfo.id);
          localStorage.setItem('user', JSON.stringify(res.userinfo));
          this.shared.userInfo.next(res.userinfo);
          console.log('User created', res);

          this.put.updateProfile(this.profileId, { companyName: this.signUpLegalData.companyName, owner: this.userId }).subscribe((res) => {
              console.log('Profile Updated', res);
            });

          this._router.navigate(['/dashboard']);
          this.showSnackbarActionOk();
        },
        (err) => this.showSnackbarActionErr()
      );
    });
  }
  //   console.log(this.signUpLegalData);
  //   this._url.signUpUser(this.signUpLegalData).subscribe(
  //     (res) => {
  //       console.log(res);
  //       localStorage.setItem('token', res.token);
  //       localStorage.setItem('userId', res.userinfo.id);
  //       localStorage.setItem('user', JSON.stringify(res.userinfo));
  //       this.shared.userInfo.next(res.userinfo);
  //       this._router.navigate(['/dashboard']);
  //       this.showSnackbarActionOk();
  //     },
  //     (err) => this.showSnackbarActionErr()
  //   );
  // }
  // UserData = {
  //   userName: this.shared.getUsername(),
  // };

  showSnackbarActionErr() {
    this.snackBar.openFromComponent(ErrorSnackbarSignup, {
      duration: 1 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'err',
    });
  }
  showSnackbarActionOk() {
    this.snackBar.openFromComponent(OkSnackbarSignup, {
      duration: 1 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'ok',
    });
  }
}
@Component({
  selector: 'err-snackbar',
  template: `<span class="f-vasir">.نام کاربری قبلا ثبت شده است</span>`,
})
export class ErrorSnackbarSignup {}
@Component({
  selector: 'err-snackbar',
  template: `<span class="f-vasir">.ثبت نام با موفقیت انجام شد</span>`,
})
export class OkSnackbarSignup {}
