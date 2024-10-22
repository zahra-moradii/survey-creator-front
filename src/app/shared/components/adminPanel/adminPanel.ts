import { Component, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { SharedInfo } from '../../../services/shared.info.service';
import { MatDialog } from '@angular/material/dialog';

/**
 * @title Autosize sidenav
 */
@Component({
  selector: 'sidenav-admin',
  templateUrl: './adminPanel.html',
  styleUrls: ['./adminPanel.css'],
})
export class AdminPanel implements OnInit {
  showFiller = false;
  displayObservable: any;
  constructor(
    public authService: PostService,
    private shared: SharedInfo,
    public dialog: MatDialog
  ) {
    this.displayObservable = {};
    this.shared.userInfo.subscribe((data) => {
      this.displayObservable = data;
    });
  }

  get_info() {
    if (
      ((this.displayObservable.firstName ===
        this.displayObservable.lastName) ===
        this.displayObservable.companyName) ===
      null
    )
      return true;
    if (this.displayObservable.options === 'Legal')
      return 'شرکت' + ' ' + this.displayObservable.companyName;

    return (
      this.displayObservable.firstName + ' ' + this.displayObservable.lastName
    );
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentDialog);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {}
}
// @Component({
//   selector: 'dialog-content-example',
//   templateUrl: './adminPanel.html',
//   styleUrls: ['./adminpanel.css'],
// })
// export class DialogContent {
//   constructor(public dialog: MatDialog) {}

//   openDialog() {
//     const dialogRef = this.dialog.open(DialogContentDialog);

//     dialogRef.afterClosed().subscribe((result) => {
//       console.log(`Dialog result: ${result}`);
//     });
//   }
// }

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './dialog.html',
  styleUrls: ['./dialog.css'],
})
export class DialogContentDialog {}
