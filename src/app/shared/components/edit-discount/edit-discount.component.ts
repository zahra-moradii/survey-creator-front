import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import moment from 'jalali-moment';
import { IActiveDate } from 'ng-persian-datepicker';
import { PutService } from 'src/app/services/update.service';
import { GetService } from '../../../services/get.service';
import { GetOneService } from '../../../services/getOne.service';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-edit-discount',
  templateUrl: './edit-discount.component.html',
  styleUrls: ['./edit-discount.component.scss'],
})
export class EditDiscountComponent implements OnInit {
  sd: any;
  ed: any;
  dateRang = {
    startDate: new Date(),
    endDate: new Date(),
  };

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
  packageNameSelected: any;

  discountId: any = this._Activatedroute.snapshot.paramMap.get('id');

  constructor(
    private post: PostService,
    private router: Router,
    private get: GetService,
    private getOne: GetOneService,
    private _Activatedroute: ActivatedRoute,
    private put: PutService
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

    this.getOne.getOneDiscountById(this.discountId).subscribe((res) => {

      this.getOne.getOneEventById(res.data.eventId).subscribe((res) => {
        this.eventSelected = res.data.name;
        this.eventId = res.data._id;
      });

      this.getOne
        .getOneDiscountTypeById(res.data.discountTypeId)
        .subscribe((res) => {
          this.dTypeSelected = res.data.name;
          this.dTypeId = res.data._id;
        });
      this.packageSelectedId = res.data.packagePriceId;
      console.log('packageSelectedId', this.packageSelectedId);
      this.form = new FormGroup({
        userCounts: new FormControl(res.data.userCount),
        percentage: new FormControl(res.data.percent),
        start: new FormControl(),
        end: new FormControl(),
      });
      this.sd = moment(res.data.startDate,"YYYY-M-D HH:mm:ss").locale("fa").format("D MMMM YYYY HH:mm:ss");
      this.ed = moment(res.data.endDate,"YYYY-M-D HH:mm:ss").locale("fa").format("D MMMM YYYY HH:mm:ss");
      this.dateRang.startDate = this.sd;
      this.dateRang.endDate = this.ed;
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

  onSelectStartDate(event: IActiveDate): void {
    this.dateRang.startDate = new Date(event.gregorian);
    this.sd = moment(this.dateRang.startDate,"YYYY-M-D HH:mm:ss").locale("fa").format("D MMMM YYYY");
  }

  onSelectEndDate(event: IActiveDate): void {
    this.dateRang.endDate = new Date(event.gregorian);
    this.ed = moment(this.dateRang.endDate,"YYYY-M-D HH:mm:ss").locale("fa").format("D MMMM YYYY");
  }

  // durationChange(data: MatOptionSelectionChange) {
  //   console.log(data);
  //   this.durationSelected = data;
  // }

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
      startDate: this.dateRang.startDate,
      endDate: this.dateRang.endDate,
      eventId: this.eventId,
      userCount: this.form.value.userCounts,
      packagePriceId: this.packageSelectedId,
      discountTypeId: this.dTypeId,
      percent: this.form.value.percentage,
    };
    console.log('discountData', discountData);
    this.put.updateDiscount(this.discountId, discountData).subscribe(
      (res) => {
        console.log("Discount updated", res);
      }
    )
    this.router.navigate(['/AdminPanel/DiscountManager']);
  }
}
