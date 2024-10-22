import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
@Component({
  selector: 'app-headermenu',
  templateUrl: './headermenu.component.html',
  styleUrls: ['./headermenu.component.scss']
})
export class HeadermenuComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit(): void {
  }

  backClicked() {
    this._location.back();
  }
}
