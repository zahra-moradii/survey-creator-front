import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: 'dialog-content-example',
  templateUrl: './forgetpass.html',
  styleUrls: ['./forgetpass.css'],
})
export class DialogContentExample {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './dialog.html',
  styleUrls: ['./dialog.css'],
})
export class DialogContentExampleDialog {}
