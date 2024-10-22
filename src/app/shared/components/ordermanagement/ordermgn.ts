import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GetService } from 'src/app/services/get.service';
import { GetOneService } from 'src/app/services/getOne.service';
import { SharedInfo } from 'src/app/services/shared.info.service';
import { PostService } from '../../../services/post.service';
import moment from 'jalali-moment';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
@Component({
  selector: 'app-ordermgn',
  templateUrl: './ordermgn.html',
  styleUrls: ['./ordermgn.css'],
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
export class OrderManagementComponent implements OnInit {

  userId: any;
  profileId: any;
  orders: any | Object;
  selectedOrders: any = [];

  state = 'collapsed';
  UserData = {
    userName: '',
  };
  UserData_1 = {
    userName: '',
  };
  orders_list: any | object;
  er: any;
  rout_n = 1;
  constructor(
    private _Auth: PostService,
    private userService: SharedInfo,
    public dialog: MatDialog,
    private getOne: GetOneService,
    private get: GetService,
  ) {}

  ngOnInit(): void {
    // this.userId = localStorage.getItem('userId');
    // this.getOne.getOneUserById(this.userId).subscribe(
    //   (res) => {
    //     this.profileId = res.data.profile;
    //     console.log("profileId", this.profileId);
    //   }
    // )
    // for (var i of this.users){
    // this.ch[i]==this.users[i].active;
    // console.log(this.users.active);

    // }
    // this.check="";
    this.get.getOrders(this.rout_n).subscribe({
      next: (res) => {
        this.orders = res.data.docs;
        // console.log(this.users.active);
        // for (let i=0; i<this.orders.length; i++){
        //   this.ch.push(this.orders[i].active);
        //   // console.log(this.users.active);
        // }
        this.selectedOrders=[];
         this.orders.forEach((el: any) => {
        //   if(el.profile == this.profileId && el._id != this.userId)
            this.selectedOrders.push(el);
        });

        console.log("Selected");},
    error: (err) => {console.log("err");},
      })
  }

  persianTaghvim(i : any){
    return moment(
      i,
      'YYYY-M-D HH:mm:ss'
    )
      .locale('fa')
      .format('D MMMM YYYY HH:mm:ss')
  }
  //-------------------------------------------------------------------- Search:
  //-----------------------------------------------------------------------
  toggle(): void {
    this.state = this.state === 'collapsed' ? 'expanded' : 'collapsed';
  }
  nextRout(): void{
  this.rout_n = this.rout_n + 1;
  console.log(this.rout_n);
  console.log(this.orders);
  this.ngOnInit()
  }
  backRout(): void{
    this.rout_n = this.rout_n - 1;
    this.ngOnInit()
    }
}
