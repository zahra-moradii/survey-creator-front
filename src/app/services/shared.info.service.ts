import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedInfo {
  userInfo = new BehaviorSubject<any>({});
  firstname!: string;
  lastname!: string;
  companyname!: string;
  username!: string;
  options!: string;
  phone!: string;
 // permission!: string;
  constructor() {}

  setUsername(data: string) {
    this.username = data;
  }

  getUsername() {
    return this.username;
  }

  setFirstname(data: string) {
    this.firstname = data;
  }

  getFirstname() {
    return this.firstname;
  }
  setLastname(data: string) {
    this.lastname = data;
  }

  getLastname() {
    return this.lastname;
  }
  setOptions(data: string) {
    this.options = data;
  }

  getOptions() {
    return this.options;
  }
  setCompanyname(data: string) {
    this.companyname = data;
  }

  getCompanyname() {
    return this.companyname;
  }
  setPhone(data: string) {
    this.phone = data;
  }

  getPhone() {
    return this.phone;
  }

}
