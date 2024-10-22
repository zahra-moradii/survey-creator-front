import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedInfo } from '../../../services/shared.info.service';
import { GetOneService } from 'src/app/services/getOne.service';
import { GetService } from 'src/app/services/get.service';
import { PutService } from 'src/app/services/update.service';

interface Type {
  value: string;
  viewValue: string;
}

/**
 * @title Select in a reactive form
 */

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
  userId: any;
  packagePrice: any | object = [];

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
    this.get.checkPackage().subscribe(
      (res:any) => {
        this.packagePrice = res.data.packagePrice;
      }
    )
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

  showSnackbarActionErr() {
    this.snackBar.openFromComponent(ErrorSnackbarSignup, {
      duration: 2 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'err',
    });
  }
  showSnackbarActionOk() {
    this.snackBar.openFromComponent(OkSnackbarSignup, {
      duration: 2 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'ok',
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
    options: 'user',
    profile: '',
  };
  constructor(
    private _url: PostService,
    private getOne: GetOneService,
    private _router: Router,
    private put: PutService,
    private get: GetService,
    private snackBar: MatSnackBar,
  ) {}

  signUpUser() {
    const packagePrice = {packagePrice : {
      packageId: this.packagePrice.packageId,
      duration: this.packagePrice.duration,
      price: this.packagePrice.price,
      users: this.packagePrice.users - 1,
      forms: this.packagePrice.forms
    }
  }
  if(this.packagePrice.users != 0){
    this.getOne.getOneProfileId().subscribe((res: any) => {
      this.signUpUserData.profile = res.profileId;
      console.log("userData", this.signUpUserData);
    })
        this._url.signUpUserProfile(this.signUpUserData).subscribe(
          (res) => {
            console.log("User created successfully",res);
            this.put.updatePackageForms(packagePrice).subscribe(
              (res:any) => {
                console.log(res);
              }
            )
        this._router.navigate(['/addSubMember']);
        this.showSnackbarActionOk();
      },
      (err) => this.showSnackbarActionErr()
    );
  }else if(this.packagePrice.users == 0)
  this.showSnackbarActionF();
}
}
  @Component({
    selector: 'err-snackbar',
    template: `<span class="f-vasir">.نام کاربری قبلا ثبت شده است</span>`,
  })
  export class ErrorSnackbarSignup {}
  @Component({
    selector: 'err-snackbar',
    template: `<span class="f-vasir">کاربر با موفقیت اضافه شد</span>`,
  })
  export class OkSnackbarSignup {}

  @Component({
    selector: 'err-snackbar',
    template: `<span>سقف ساخت فرم‌های نطرسنجی شما به اتمام رسیده است</span>`,
  })
  export class FinishSnackbar {}
