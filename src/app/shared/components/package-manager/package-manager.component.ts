import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeleteService } from '../../../services/delete.service';
import { GetService } from '../../../services/get.service';
import { GetOneService } from '../../../services/getOne.service';

@Component({
  selector: 'app-package-manager',
  templateUrl: './package-manager.component.html',
  styleUrls: ['./package-manager.component.scss'],
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
export class PackageManagerComponent implements OnInit {
  packagesId: any = [];
  packagePrices: any | Object;
  packageNames: any = [];
  len: any;
  state = 'collapsed';

  constructor(
    private get: GetService,
    private getOne: GetOneService,
    private deleteOne: DeleteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchPackages();
  }

  toggle(): void {
    this.state = this.state === 'collapsed' ? 'expanded' : 'collapsed';
  }

  fetchPackages() {
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
  }

  onDelete(id: any) {
    console.log('id to delete', id);
    this.deleteOne.deleteOnePackage(id).subscribe((ret: any | Object) => {
      console.log(ret.data);
      this.fetchPackages();
    });
    // window.location.reload();
  }

  onEdit(id: any){
    this.router.navigate(['AdminPanel/PackageManager/EditPackage', id]);
  }
}
