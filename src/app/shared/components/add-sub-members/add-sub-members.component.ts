import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DeleteService } from 'src/app/services/delete.service';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { SharedInfo } from 'src/app/services/shared.info.service';
import { PutService } from 'src/app/services/update.service';
import { admin_changeinfo } from '../admin_updateinfo/admin.updateinfo';

@Component({
  selector: 'app-add-sub-members',
  templateUrl: './add-sub-members.component.html',
  styleUrls: ['./add-sub-members.component.scss'],
})
export class AddSubMembersComponent implements OnInit {
  userSearch: any;
  clicked: boolean = false;
  foundUsers: any = [];
  allUsers: any | Object = [];
  byPackage: any | object;
  packagePrice: any | object;
  userName = JSON.parse(localStorage.getItem('user') || '')['userName']
  UserData_S = {
    userName: '',
  };
  UserData = {
    userName: '',
  };

  brc: any = "#000080";

  constructor(
    private get: GetService,
    private userService: SharedInfo,
    public dialog: MatDialog,
    private put: PutService,
    private delet: DeleteService,
    private _router: Router,
    private snackBar: MatSnackBar,
    private _Auth: PostService,
  ) {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.get.getAllUsersByProfileId().subscribe((res: any) => {
      this.allUsers = res.data;
      this.allUsers.reverse();
    });

    this.get.checkPackage().subscribe({
      next: (res) => {
        this.byPackage = res.data.packagePrice;
        console.log('byPackage', this.byPackage);
      },
      error: (err) => {
        this.byPackage = null;
      },
    });

    this.get.checkPackage().subscribe((res: any) => {
      this.packagePrice = res.data.packagePrice;
    });
  }

  checkStyle(user: any){
    if(user.active == false){
      this.brc = 'rgb(133, 133, 133)';
      return true;
    }else if(user.active == true){
      this.brc = '#000080';
      return true;
   }
    return true;
  }

  ActiveAccount(user: any) {
    const packagePrice = {
      packagePrice: {
        packageId: this.packagePrice.packageId,
        duration: this.packagePrice.duration,
        price: this.packagePrice.price,
        users: this.packagePrice.users - 1,
        forms: this.packagePrice.forms,
      },
    };

    this.UserData.userName=user.userName;

    if(this.packagePrice.users != 0){
      this.put.updatePackageForms(packagePrice).subscribe(
      (res:any) => {
        console.log(res);
      })
      this._Auth.ActiveAccount(this.UserData).subscribe({
      next: (res) => {
        console.log("res", res);
      },
      error: (err) => {
        console.log("err",err);
      },
    });
  }else if(this.packagePrice.users == 0){
    this.showSnackbarActionF();
  }
  location.reload();
}

  InActiveAccount(user: any) {
    const packagePrice = {
      packagePrice: {
        packageId: this.packagePrice.packageId,
        duration: this.packagePrice.duration,
        price: this.packagePrice.price,
        users: this.packagePrice.users + 1,
        forms: this.packagePrice.forms,
      },
    };

    this.UserData.userName=user.userName;
    this.put.updatePackageForms(packagePrice).subscribe(
      (res:any) => {
        console.log(res);
      })
    this._Auth.InActiveAccount(this.UserData).subscribe({
      next: (res) => {
        console.log("res", res);
      },
      error: (err) => {
        console.log("err",err);
      },
    });
    location.reload();
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
    if (this.byPackage && this.byPackage.users != 0) {
      this._router.navigate(['/addSubMember/Adduser']);
    } else if (this.byPackage && this.byPackage.users == 0) {
      console.log('finish');
      this.showSnackbarActionF();
    }
  }

  onSearchByUser(user: any) {
    this.clicked = true;
    this.foundUsers = [];
    this.get.searchUserByUserName(user).subscribe(
      (res:any) => {
        this.foundUsers = res.data;
      }
    )
  }

  up(user: any) {
    this.userService.setFirstname(user.firstName);
    this.userService.setCompanyname(user.companyname);
    this.userService.setLastname(user.lastName);
    this.userService.setPhone(user.phone);
    this.userService.setUsername(user.userName);
    console.log(user);
  }
  openDialog() {
    const dialogRef = this.dialog.open(admin_changeinfo);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onDelete(user: any) {
    const packagePrice = {
      packagePrice: {
        packageId: this.packagePrice.packageId,
        duration: this.packagePrice.duration,
        price: this.packagePrice.price,
        users: this.packagePrice.users + 1,
        forms: this.packagePrice.forms,
      },
    };

    this.delet.deleteUser(user._id).subscribe((res: any) => {
      console.log('DELETE RESULT', res);
      this.put.updatePackageForms(packagePrice).subscribe(
        (res:any) => {
          console.log(res);
        }
      )
    location.reload();
    });
  }

}
@Component({
  selector: 'err-snackbar',
  template: `<span>سقف تعداد زیرمجموعه‌های شما به اتمام رسیده است</span>`,
})
export class FinishSnackbar {}
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
