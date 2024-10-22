import { Option } from '../survey-card/models';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedInfo } from '../../../services/shared.info.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

/**
 * @title Tab group where the tab content is loaded lazily (when activated)
 */
@Component({
  selector: 'change-info',
  templateUrl: './admin.updateinfo.html',
  styleUrls: ['./admin.updateinfo.css'],
})
export class admin_changeinfo {
  ngOnInit(): void {

    this.firstname = this.shared.getFirstname();
    this.lastname = this.shared.getLastname();
    this.companyname = this.shared.getCompanyname();
    this.username = this.shared.getUsername();
    this.phone_ch = this.shared.getPhone();

  }



  hide = true;

  registerForm = new FormGroup(
    {
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
      ]),
    },
    { validators: confirmPasswordValidator }
  );
  phone = new FormControl('', [
    Validators.required,
    Validators.minLength(11),
    Validators.maxLength(11),
  ]);

  getErrorMessage_phone() {
    if (this.phone.hasError('required')) {
      return 'You must enter a value';
    }
    return 'Must be exactly 11 characters';
  }
  numberOnly(event: { which: any; keyCode: any }): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  constructor(
    private _Auth: PostService,
    private _router: Router,
    private shared: SharedInfo,
    private snackBar: MatSnackBar,
    private dialogref: MatDialogRef<admin_changeinfo>
  ) {
    // this.shared.adminuser.subscribe((data) => {
    //   this.username = data.userName;


    //   this.lastname = data.lastName;
    //   this.companyname = data.companyName;
    //   this.phone_ch = data.phone;
    //   this.option = data.options;
    // });
  }

  username = '';
  firstname = '';
  lastname = '';
  phone_ch = '';
  companyname = '';
  option = '';
  pass = '';

  updateUser() {
    const loginUserData = {
      userName: this.username,
      firstName: this.firstname,
      lastName: this.lastname,
      phone: this.phone_ch,
      companyName: this.companyname,
      options: this.option,
    };

    // localStorage.setItem('usera', JSON.stringify(loginUserData));
    // this.shared.userInfo.next(JSON.parse(localStorage.getItem('usera') || ''));

    this._Auth.changeinfoUser(loginUserData).subscribe({
      next: (res) => {
        //this._router.navigate(['/AdminPanel/UserManagement']);
        location.reload();
        this.showSnackbarActionOk();
      },
      error: (err) => {},
    });
    this.dialogref.close();
    location.reload();
    //this._router.navigate(['/AdminPanel/UserManagement']);
  }

  checkUser() {
    if (this.option === 'Legal') return true;
    return false;
  }

  updatepass() {
    const UserDatapass = {
      userName: this.username,
      password: this.pass,
    };

    console.log(UserDatapass);
    this._Auth.changepassword(UserDatapass).subscribe(
      (res) => {
        // this._router.navigate(['/AdminPanel/UserManagement']);
        // this.showSnackbarActionOk();
      },
      (err) => {}
    );
    this.dialogref.close();
  }

  showSnackbarActionOk() {
    this.snackBar.openFromComponent(OkSnackbar, {
      duration: 3 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'ok',
    });
  }
}

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value === confirmPassword.value
    ? { confirmPassword: true }
    : null;
};
@Component({
  selector: 'err-snackbar',
  template: `<span class="f-vasir">.اطلاعات با موفقیت تغییر یافت</span>`,
})
export class OkSnackbar {}
