import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'jalali-moment';
import { DeleteService } from '../../../services/delete.service';
import { GetService } from '../../../services/get.service';
import { GetOneService } from '../../../services/getOne.service';

@Component({
  selector: 'app-discount-manager',
  templateUrl: './discount-manager.component.html',
  styleUrls: ['./discount-manager.component.scss'],
  animations: [
    trigger('bodyExpansion', [
      state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition(
        'expanded <=> collapsed, void => collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class DiscountManagerComponent implements OnInit {
  packagePricesId: any = [];
  packagesId: any = [];
  eventsId: any = [];
  discountTypesId: any = [];
  discounts: any | Object;
  packagePriceNames: any = [];
  eventNames: any = [];
  discountTypeNames: any = [];
  packageNames: any = [];
  len: any;
  startDates: any = [];
  endDates: any = [];

  constructor(
    private get: GetService,
    private getOne: GetOneService,
    private deleteOne: DeleteService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.get.getDiscount().subscribe((ret: any | Object) => {
      console.log('discounts', ret.data);
      this.discounts = ret.data;

      this.discounts.forEach((el: any) => {
        this.startDates.push(moment(el.startDate,"YYYY-M-D HH:mm:ss").locale("fa").format("D MMMM YYYY"));
        this.endDates.push(moment(el.endDate,"YYYY-M-D HH:mm:ss").locale("fa").format("D MMMM YYYY"));
      });

      this.len = ret.data.length;
      this.discounts.forEach((element: any) => {
        this.packagePricesId.push(element.packagePriceId);
        this.eventsId.push(element.eventId);
        this.discountTypesId.push(element.discountTypeId);
      });

      for (let i = 0; i < this.len; i++) {
        this.getOne
          .getOneEventById(this.eventsId[i])
          .subscribe((ret: any | Object) => {
            this.eventNames.push(ret.data.name);
          });

        this.getOne
          .getOneDiscountTypeById(this.discountTypesId[i])
          .subscribe((ret: any | Object) => {
            this.discountTypeNames.push(ret.data.name);
          });

        this.getOne
          .getOnePackagePriceById(this.packagePricesId[i])
          .subscribe((ret: any | Object) => {
            this.packagePriceNames.push(ret.data.duration);
            this.packagesId.push(ret.data.packageId);
            this.getOne
              .getOnePackageById(this.packagesId[i])
              .subscribe((ret: any | Object) => {
                this.packageNames.push(ret.data.name);
              });
          });
      }
    });

    console.log('discountsss', this.discounts);
  }

  onDelete(id: any) {
    console.log('id to delete', id);
    this.deleteOne.deleteOneDiscount(id).subscribe((ret: any | Object) => {
      console.log(ret.data);
    });
    window.location.reload();
  }

  onEdit(id: any){
    this.router.navigate(['/EditDiscount', id])
  }
}
