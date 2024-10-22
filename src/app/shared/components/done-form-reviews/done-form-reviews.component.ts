import { Component, OnInit } from '@angular/core';
import { GetService } from '../../../services/get.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Router, RouterLink } from '@angular/router';
import { DeleteService } from 'src/app/services/delete.service';
import { IActiveDate } from 'ng-persian-datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'jalali-moment';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-done-form-reviews',
  templateUrl: './done-form-reviews.component.html',
  styleUrls: ['./done-form-reviews.component.scss']
})
export class DoneFormReviewsComponent implements OnInit {
  surveys: any | object;
  surveysReverse: any | object = [];
  len: any;
  codeValue: any;
  selectedOption: any = "all";

  constructor(
    private get: GetService,
    private router: Router,
    private delet: DeleteService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.get
      .getAllFormReviewsByUserId()
      .subscribe((ret: any | Object) => {
        console.log('all surveys', ret.data);
        this.surveys = ret.data;
        this.len = ret.data.length;
        this.surveys.forEach((el:any) => {
          this.surveysReverse.push(this.surveys[this.len-1]);
          this.len -= 1;
        });
        console.log("surveys", this.surveys);
        console.log("surveys Reverse", this.surveysReverse);
      });

  }

  onViewSurvey(code: any) {
    this.router.navigate(['/ViewSurvey', code]);
  }

  onDelete(id: any) {
    this.delet.deleteOneFormReview(id).subscribe((res) => {
      console.log('delete formReview', res);
      this.delet.deleteManyFormReviewAnswers(id).subscribe((res: any) => {
        console.log('delete formReviewAnswer', res);
        location.reload();
      })
    });

  }

  onEdit(code: any) {
    this.router.navigate(['/EditFormReview', code]);
  }

  onAnswers(code: any) {
    this.router.navigate(['ViewAnswers', code]);
  }

  showSnackbarActionOk() {
    this.snackBar.openFromComponent(OkSnackbar, {
      duration: 1 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'copy',
    });
  }

  onCopy(code: any) {
    this.codeValue = code;
    this.showSnackbarActionOk();
  }
}

@Component({
  selector: 'err-snackbar',
  template: `<span style="color: black;">کد فرم با موفقیت کپی شد</span>`,
})
export class OkSnackbar {}
