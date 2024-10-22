import { Component, OnInit } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Router } from '@angular/router';
import { GetService } from '../../../services/get.service';
import { GetOneService } from '../../../services/getOne.service';
@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss'],
})
export class PackagesComponent implements OnInit {
  packagePrices: any | Object;
  durationSelected: any | [] = [];
  packagesId: any = [];
  discounts: any = [];
  discountPriceOrdered: any | [] = [];
  finalPriceOrdered: any | [] = [];
  packagePricesOrdered: any = [];
  div: boolean = false;
  durations: any | [] = [];
  discountPrice: any = [];
  finalPrice: any = [];
  ind1: any = [];
  ind2: any = [];
  discount: any;
  price: any;
  packages: any | [];
  packageName: any;

  constructor(
    private get: GetService,
    private getOne: GetOneService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.get.getDiscount().subscribe((ret: any | Object) => {
      console.log('discounts', ret.data);
      this.discounts = ret.data;
      this.get.getPackagePrices().subscribe((ret: any | Object) => {
        console.log('packagePrices', ret.data);
        this.packagePrices = ret.data;
        this.packagePrices.forEach((element: any) => {
          this.packagesId.push(element.packageId);
        });
        this.get.getPackages().subscribe((ret: any | Object) => {
          this.packages = ret.data;
          console.log('packages', this.packages);
          this.filterPackages();
        });
      });
    });
  }

  durationChange(data: MatOptionSelectionChange, i: any) {
    console.log(data);
    console.log('DURATIONS', this.durationSelected);
    this.durationSelected[i] = data;
  }

  close() {
    this.div = false;
  }

  filterPackages() {
    this.div = true;
    let uniquePackageIds = this.packagesId.filter((el: any, ind: any) => {
      return this.packagesId.indexOf(el) === ind;
    });

    var temp: any = [];
    for (let i = 0; i < uniquePackageIds.length; i++) {
      console.log('temp and I', temp, i);
      for (let j = 0; j < this.packagePrices.length; j++) {
        if (this.packagePrices[j].packageId == uniquePackageIds[i])
          temp.push(this.packagePrices[j]);
      }
      this.packagePricesOrdered.push(temp);
      temp = [];
    }
    console.log('packagePricesOrdered', this.packagePricesOrdered);
    this.durationSet(this.packagePricesOrdered);
    this.durationSelectedSet(this.packagePricesOrdered);
    this.discountSet(this.packagePricesOrdered);
  }

  checkIndex(i: any, j: any) {
    for (let index = 0; index < this.ind1.length; index++) {
      if (i == this.ind1[index] && j == this.ind2[index]) {
        this.discount = this.discountPriceOrdered[index];
        this.price = this.finalPriceOrdered[index];
        return true;
      }
    }
    return false;
  }

  discountSet(ppo: any) {
    let ind: any = 0;
    for (let i = 0; i < this.discounts.length; i++) {
      for (let j = 0; j < ppo.length; j++) {
        for (let k = 0; k < ppo[j].length; k++) {
          if (this.discounts[i].packagePriceId == ppo[j][k]._id) {
            this.discountPrice[ind] = this.discounts[i].percent;
            this.finalPrice[ind++] =
              ppo[j][k].price -
              (this.discounts[i].percent * ppo[j][k].price) / 100;
            this.ind1.push(j);
            this.ind2.push(k);
          }
        }
      }
      this.discountPriceOrdered.push(this.discountPrice);
      this.finalPriceOrdered.push(this.finalPrice);
      this.discountPrice = [];
      this.finalPrice = [];
      ind = 0;
    }
    console.log('discountPriceOrdered', this.discountPriceOrdered);
    console.log('finalPriceOrdered', this.finalPriceOrdered);
    console.log('ind1', this.ind1);
    console.log('ind2', this.ind2);
  }

  durationSelectedSet(ppo: any) {
    for (let i = 0; i < ppo.length; i++) {
      if (ppo[i].length == 1) this.durationSelected[i] = '';
      else this.durationSelected[i] = ppo[i][0].duration;
    }
  }

  durationSet(ppo: any) {
    var dtemp: any = [];
    for (let i = 0; i < ppo.length; i++) {
      if (ppo[i].length > 1) {
        for (let j = 0; j < ppo[i].length; j++) {
          dtemp.push(ppo[i][j].duration);
        }
        this.durations.push(dtemp);
        dtemp = [];
      } else {
        this.durations.push([]);
      }
    }
    console.log('ALL DURATIONS', this.durations);
  }

  getName(pkg: any) {
    let flag = 0;
    this.packages.forEach((el: any) => {
      if (el._id == pkg.packageId) {
        this.packageName = el.name;
        flag = 1;
      }
    });
    if (flag) return true;
    else return false;
  }

  onShopPackage(i: any, j: any) {
    localStorage.setItem('packagePriceId', this.packagePricesOrdered[i][j]._id);
    this.router.navigate(['/Packages/Packageshopcard']);
  }
}
