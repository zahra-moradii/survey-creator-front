import { R3DelegatedFnOrClassMetadata } from '@angular/compiler/src/render3/r3_factory';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { GetOneService } from '../../../services/getOne.service';

@Component({
  selector: 'app-packageshopcard',
  templateUrl: './packageshopcard.component.html',
  styleUrls: ['./packageshopcard.component.scss'],
})
export class PackageshopcardComponent implements OnInit {
  packagePriceId: any;
  packagePrice: any | object = [];
  package: any | Object = "";
  packageId: any;
  discount: any;
  dim: any | Boolean;
  pa = {
    package: '',
  };

  constructor(
    private getOne: GetOneService,
    private paym: PostService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.dim = false;

    this.packagePriceId = localStorage.getItem('packagePriceId');

    this.getOne.getOnePackagePriceById(this.packagePriceId).subscribe({
      next: (ret) => {
        this.packagePrice = ret.data;
        console.log('packagePrice data', this.packagePrice);

        this.getOne.getOnePackageById(this.packagePrice.packageId).subscribe({
          next: (ret) => {
            this.package = ret.data;
            this.pa.package = ret.data._id;
            console.log('package data', this.package);

            this.getOne
              .getOneDiscountByPackageId(this.packagePriceId)
              .subscribe({
                next: (ret) => {
                  this.discount = ret.data;
                  console.log('discount data', ret.data);
                },

                error: (err) => {
                  console.log(err.error.message);
                },
              });
          },

          error: (err) => {
            console.log(err.error.message);
          },
        });
      },

      error: (err) => {
        console.log(err.error.message);
      },
    });
  }
  Round(x: any) {
    return Math.round(x);
  }
  pay() {
    console.log(this.pa);
    this.dim = true;
    console.log(this.pa);
    this.paym.payment(this.pa).subscribe({
      next: (res) => {
        console.log(res);
        if (res.isGatewayRedirectRequired) window.location.href = res.data.link;
        else
          this.router.navigate(['/Packageshopcard/bill'], {
            queryParams: {
              status: '10',
              order_id: res.data.order_id,
              track_id: '0',
              id: res.data.order_id,
            },
          });
      },
      error: (err) => {
        console.log(err);
        this.dim = false;
      },
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
  template: `<span>.خطا در اتصال به درگاه پرداخت</span>`,
})
export class ErrorSnackbar {}
