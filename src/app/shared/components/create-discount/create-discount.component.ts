import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Router, RouterLink } from '@angular/router';
import { GetService } from '../../../services/get.service';
import { GetOneService } from '../../../services/getOne.service';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-create-discount',
  templateUrl: './create-discount.component.html',
  styleUrls: ['./create-discount.component.scss'],
})
export class CreateDiscountComponent implements OnInit {
  form: FormGroup | any;
  eventName: string | any;
  eventId: any;
  dTypeName: string | any;
  dTypeId: any;
  durationSelected: any;
  events: any | [];
  dTypes: any | [];
  eventSelected: any;
  dTypeSelected: any;
  isSelected: boolean = false;
  errorMessage1: string | any = null;
  errorMessage2: string | any = null;
  minDate = new Date();
  packagePrices: any | Object;
  len: any;
  packagesId: any = [];
  packageNames: any = [];
  packageSelectedId: any;

  constructor(
    private post: PostService,
    private router: Router,
    private get: GetService,
    private getOne: GetOneService
  ) {}

  ngOnInit(): void {
    this.get.getEvents().subscribe((ret: any | Object) => {
      console.log('events', ret.data);
      this.events = ret.data;
    });

    this.get.getDiscountTypes().subscribe((ret: any | Object) => {
      console.log('DiscountTypes', ret.data);
      this.dTypes = ret.data;
    });

    this.get.getPackagePrices().subscribe((ret: any | Object) => {
      console.log('packagePrices', ret.data);
      this.packagePrices = ret.data;
      this.len = ret.data.length;
      this.packagePrices.forEach((element: any) => {
        this.packagesId.push(element.packageId);
      });

      for (let i = 0; i < this.len; i++) {
        this.getOne
          .getOnePackageById(this.packagesId[i])
          .subscribe((ret: any | Object) => {
            console.log('names', ret.data.name);
            this.packageNames.push(ret.data.name);
          });
      }
      console.log(this.packageNames);
    });

    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      userCounts: new FormControl('', [Validators.required]),
      percentage: new FormControl('', [Validators.required]),
      start: new FormControl(),
      end: new FormControl(),
    });
  }

  durationChange(data: MatOptionSelectionChange) {
    console.log(data);
    this.durationSelected = data;
  }

  eventsChange(data: MatOptionSelectionChange) {
    console.log(data);
    this.eventSelected = data;
    this.getOne.getOneEvent(this.eventSelected).subscribe((ret: any) => {
      console.log('ret', ret);
      this.eventId = ret.data._id;
      console.log(this.eventId);
    });
  }

  dTypeChange(data: MatOptionSelectionChange) {
    console.log(data);
    this.dTypeSelected = data;
    this.getOne.getOneDiscountType(this.dTypeSelected).subscribe((ret: any) => {
      console.log('ret', ret);
      this.dTypeId = ret.data._id;
      console.log(this.dTypeId);
    });
  }

  packageChange(data: MatOptionSelectionChange) {
    console.log(data);
    this.packageSelectedId = data;
  }

  keyup1(value: any) {
    this.eventName = value;
  }

  keyup2(value: any) {
    this.dTypeName = value;
  }

  onSubmit1() {
    const eventData = {
      name: this.eventName,
    };
    this.post.saveEvent(eventData).subscribe({
      next: (res) => {
        console.log(res);
        this.refreshPage();
      },
      error: (err: any) => {
        this.errorMessage1 = 'رویداد قبلا ثبت شده است';
      },
    });
  }

  onSubmit2() {
    const dTypeData = {
      name: this.dTypeName,
    };
    this.post.saveDType(dTypeData).subscribe({
      next: (res) => {
        console.log(res);
        this.refreshPage();
      },
      error: (err: any) => {
        this.errorMessage2 = 'نوع تخفیف قبلا ثبت شده است';
      },
    });
  }

  refreshPage() {
    window.location.reload();
  }

  onSubmit3() {
    const discountData = {
      startDate: this.form.value.start,
      endDate: this.form.value.end,
      eventId: this.eventId,
      userCount: this.form.value.userCounts,
      packagePriceId: this.packageSelectedId,
      discountTypeId: this.dTypeId,
      percent: this.form.value.percentage,
    };
    console.log('discountData', discountData);
    this.post.saveDiscount(discountData).subscribe({
      next: (res) => {
        console.log('discount res', res);
      },
    });
    this.router.navigate(['/AdminPanel/DiscountManager']);
  }
}
