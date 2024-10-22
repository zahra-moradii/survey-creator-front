import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Router, RouterLink } from '@angular/router';
import { GetService } from '../../../services/get.service';
import { GetOneService } from '../../../services/getOne.service';
import { PostService } from '../../../services/post.service';
@Component({
  selector: 'app-create-package',
  templateUrl: './create-package.component.html',
  styleUrls: ['./create-package.component.scss'],
})
export class CreatePackageComponent implements OnInit {
  form: FormGroup | any;
  packageName: string | any;
  durationSelected: any;
  packageId: any;
  packageNames: any | [];
  namesSelected: any;
  isSelected: boolean = false;
  errorMessage: string | any = null;

  durations: any | [] = ['1 ماهه', '3 ماهه', '6 ماهه', '12 ماهه', 'نامحدود'];

  constructor(
    private post: PostService,
    private router: Router,
    private get: GetService,
    private getOne: GetOneService
  ) {}

  ngOnInit(): void {
    this.get.getPackageNames().subscribe((ret: any | Object) => {
      console.log('ret', ret.data);
      this.packageNames = ret.data;
    });
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      packagePrice: new FormControl('', [Validators.required]),
      packageUsers: new FormControl('', [Validators.required]),
      packageForms: new FormControl('', [Validators.required]),
    });
  }

  durationChange(data: MatOptionSelectionChange) {
    console.log(data);
    this.durationSelected = data;
  }

  namesChange(data: MatOptionSelectionChange) {
    console.log(data);
    this.namesSelected = data;
    this.getOne
      .getOnePackageByName(this.namesSelected)
      .subscribe((ret: any) => {
        console.log('ret', ret);
        this.packageId = ret.data._id;
        console.log(this.packageId);
      });
  }

  keyup(value: any) {
    this.packageName = value;
  }

  onSubmit1() {
    const packageData = {
      name: this.packageName,
    };

    this.post.savePackage(packageData).subscribe({
      next: (res) => {
        console.log(res);
        console.log(this.packageId);
        this.refreshPage();
      },
      error: (err: any) => {
        this.errorMessage = 'نام پکیج قبلا ثبت شده است';
      },
    });
  }

  refreshPage() {
    window.location.reload();
  }

  onSubmit2() {
    const packagePriceData = {
      packageId: this.packageId,
      duration: this.durationSelected,
      price: this.form.value.packagePrice,
      users: this.form.value.packageUsers,
      forms: this.form.value.packageForms,
    };
    console.log('packagePriceData', packagePriceData);
    this.post.savePackagePrice(packagePriceData).subscribe({
      next: (res) => {
        console.log('res', res);
      },
    });
    this.router.navigate(['/AdminPanel/PackageManager']);
  }
}
