import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GetService } from '../../../services/get.service';
import { GetOneService } from '../../../services/getOne.service';
import { PostService } from '../../../services/post.service';
import { PutService } from '../../../services/update.service';

interface choice {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-package',
  templateUrl: './edit-package.component.html',
  styleUrls: ['./edit-package.component.scss'],
})
export class EditPackageComponent implements OnInit {
  form: FormGroup | any;
  packageName: string | any;
  durationSelected: any;
  packageId: any;
  packageNames: any | [];
  errorMessage: string | any = null;
  id: any;
  oldName: any;
  oldDuration: any;
  durations: any | [] = ['1 ماهه', '3 ماهه', '6 ماهه', '12 ماهه', 'نامحدود'];

  constructor(
    private post: PostService,
    private router: Router,
    private _Activatedroute: ActivatedRoute,
    private getOne: GetOneService,
    private getOnepp: GetOneService,
    private get: GetService,
    private put: PutService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.get.getPackageNames().subscribe((ret: any | Object) => {
      console.log('ret', ret.data);
      this.packageNames = ret.data;
    });

    this.id = this._Activatedroute.snapshot.paramMap.get('id');

    this.getOnepp.getOnePackagePriceById(this.id).subscribe((res: any) => {
      this.form = new FormGroup({
        packagePrice: new FormControl(res.data.price),
        packageUsers: new FormControl(res.data.users),
        packageForms: new FormControl(res.data.forms),
      });
      this.oldDuration = res.data.duration;
      this.getOne
        .getOnePackageById(res.data.packageId)
        .subscribe((ret: any) => {
          this.oldName = ret.data.name;
        });
    });
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
    this.oldDuration = data;
  }

  namesChange(data: MatOptionSelectionChange) {
    console.log(data);
    this.oldName = data;
    this.getOne.getOnePackageByName(this.oldName).subscribe((ret: any) => {
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
      duration: this.oldDuration,
      price: this.form.value.packagePrice,
      users: this.form.value.packageUsers,
      forms: this.form.value.packageForms,
    };
    console.log('packagePriceData', packagePriceData);
    this.put.updatePackage(this.id, packagePriceData).subscribe({
      next: (res) => {
        console.log('edit result', res);
      },
    });
    this.router.navigate(['/AdminPanel/PackageManager']);
  }
}
