import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'jalali-moment';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss'],
})
export class BillComponent implements OnInit {
  firstName: any = JSON.parse(localStorage.getItem('user') || '')['firstName'];
  lastName: any = JSON.parse(localStorage.getItem('user') || '')['lastName'];

  returnvalue = {
    user: '',
    order_id: '',
    packagename: '',
    packagetime: '',
    price: 0,
    tax: 0,
    forms: 0,
    users: 0,
    discount: 0,
    amount: 0,
    purchaseDate: '',
  };

  constructor(
    private route: ActivatedRoute,
    private _Auth: PostService,
    private snackBar: MatSnackBar,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((data) => {
      console.log('Params : ',data  )
      const orderData = {
        status: data.status ? data.status : undefined,
        track_id: data.track_id ? data.track_id : undefined,
        id: data.id ? data.id : undefined,
        order_id: data.order_id ? data.order_id : undefined,
      };
      this._Auth.verifypayment(orderData).subscribe({
        next: (res) => {
          console.log('Verify Response  : ', res);
          this.returnvalue.user = res.data.user;
          this.returnvalue.packagename = res.data.packagename;
          this.returnvalue.amount = res.data.amount;
          this.returnvalue.discount = res.data.discount;
          this.returnvalue.order_id = res.data.order_id;
          this.returnvalue.packagetime = res.data.packagetime;
          this.returnvalue.tax = res.data.tax;
          this.returnvalue.forms = res.data.forms;
          this.returnvalue.users = res.data.users;
          this.returnvalue.price = res.data.price;
          this.returnvalue.purchaseDate = moment(
            res.data.createdat,
            'YYYY-M-D'
          )
            .locale('fa')
            .format('D MMMM YYYY');
          if (this.returnvalue.order_id) this.showSnackbarActionOk();
        },
        error: (err) => {
          this.showSnackbarActionErr();
          this._router.navigate(['/Packages/Packageshopcard']);
        },
      });
    });
  }
  showSnackbarActionOk() {
    this.snackBar.openFromComponent(OkSnackbar, {
      duration: 2 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'ok',
    });
  }
  showSnackbarActionErr() {
    this.snackBar.openFromComponent(ErrorSnackbar, {
      duration: 2 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'err',
    });
  }
}
@Component({
  selector: 'err-snackbar',
  template: `<span>.خطا در فرآیند خرید</span>`,
})
export class ErrorSnackbar {}
@Component({
  selector: 'err-snackbar',
  template: `<span>.خرید با موفقیت انجام شد</span>`,
})
export class OkSnackbar {}
