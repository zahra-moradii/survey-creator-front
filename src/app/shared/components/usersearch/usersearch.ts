import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GetService } from 'src/app/services/get.service';
import { GetOneService } from 'src/app/services/getOne.service';
import { PostService } from 'src/app/services/post.service';
import { SharedInfo } from 'src/app/services/shared.info.service';
import { admin_changeinfo } from '../admin_updateinfo/admin.updateinfo';

@Component({
  selector: 'app-user-search',
  templateUrl: './usersearch.html',
  styleUrls: ['./usersearch.css'],
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
export class UserSearchComponent implements OnInit {

  userId: any;
  profileId: any;
  users: any | Object;
  selectedUsers: any = [];
  selectedUsers1: any = [];
  check="";
  ch : any= [];
  ch_search="";
  state = 'collapsed';
  UserData = {
    userName: '',
  };

  forms: any | object;
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
    this._Auth.findusers(this.rout_n, this.UserData).subscribe({
      next: (res) => {
        this.users = res.userinfo.docs;
        // console.log(this.users.active);
        for (let i=0; i<this.users.length; i++){
          this.ch.push(this.users[i].active);
          // console.log(this.users.active);
        }
        this.selectedUsers=[];
         this.users.forEach((el: any) => {
        //   if(el.profile == this.profileId && el._id != this.userId)
            this.selectedUsers.push(el);
        });
        console.log(res);
        this.ch_search = res.userinfo.active;
        this.er = '';

        this.userService.setFirstname(res.userinfo.firstName);
        this.userService.setCompanyname(res.userinfo.companyname);
        this.userService.setLastname(res.userinfo.lastName);
        this.userService.setPhone(res.userinfo.phone);
        this.userService.setUsername(res.userinfo.userName);
        this.check="true";
      },
      error: (err) => {
        console.log(err);
        this.er = err;
        this.check="true";
        this.forms = '';
      },
    });
  }
  checkactive(i:any) {
    if (this.ch[i] == 'true') return true;
    return false;
  }
  ActiveAccount(i:any) {
    this.UserData.userName=this.users[i].userName;

    this._Auth.ActiveAccount(this.UserData).subscribe({
      next: (res) => {
        this.ch[i] = 'true';
      },
      error: (err) => {},
    });
  }
  InActiveAccount(i:any) {
    console.log(this.users[i].userName);
    this.UserData.userName=this.users[i].userName;
    this._Auth.InActiveAccount(this.UserData).subscribe({
      next: (res) => {
        this.ch[i] = 'false';
      },
      error: (err) => {},
    });
  }
  //-------------------------------------------------------------------- Search:

  //-----------------------------------------------------------------------
  toggle(): void {
    this.state = this.state === 'collapsed' ? 'expanded' : 'collapsed';
  }
  nextRout(): void{
  this.rout_n = this.rout_n + 1;
  this.findUser()
  console.log(this.rout_n);
  console.log(this.users);
  this.ngOnInit()
  }
  backRout(): void{
    this.rout_n = this.rout_n - 1;
    this.findUser()
    this.ngOnInit()
    }
  findUser() {
    console.log(this.UserData);
    this._Auth.findusers(this.rout_n, this.UserData).subscribe({
      next: (res) => {
        this.users = res.userinfo.docs;
        // console.log(this.users.active);
        for (let i=0; i<this.users.length; i++){
          this.ch.push(this.users[i].active);
          // console.log(this.users.active);
        }
        this.selectedUsers=[];
         this.users.forEach((el: any) => {
        //   if(el.profile == this.profileId && el._id != this.userId)
            this.selectedUsers.push(el);
        });
        console.log(res);
        this.ch_search = res.userinfo.active;
        this.er = '';

        this.userService.setFirstname(res.userinfo.firstName);
        this.userService.setCompanyname(res.userinfo.companyname);
        this.userService.setLastname(res.userinfo.lastName);
        this.userService.setPhone(res.userinfo.phone);
        this.userService.setUsername(res.userinfo.userName);
        this.check="true";
      },
      error: (err) => {
        console.log(err);
        this.er = err;
        this.check="true";
        this.forms = '';
      },
    });
  }
  up(i:any){
    this.userService.setFirstname(this.users[i].firstName);
    this.userService.setCompanyname(this.users[i].companyname);
    this.userService.setLastname(this.users[i].lastName);
    this.userService.setPhone(this.users[i].phone);
    this.userService.setUsername(this.users[i].userName);
    console.log("hellooooooooooo");
    console.log(this.users[i]);
  }
  openDialog() {
    const dialogRef = this.dialog.open(admin_changeinfo);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.findUser();
    });
  }

}
