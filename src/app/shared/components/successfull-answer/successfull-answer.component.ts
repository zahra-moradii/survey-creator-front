import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-successfull-answer',
  templateUrl: './successfull-answer.component.html',
  styleUrls: ['./successfull-answer.component.scss'],
})
export class SuccessfullAnswerComponent implements OnInit {
  code: any;
  constructor(private _Activatedroute: ActivatedRoute) {}

  ngOnInit(): void {
    this.code = this._Activatedroute.snapshot.paramMap.get('code');
  }
}
