import { changeinfo } from './../shared/components/updateinfo/updateinfo';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { SharedInfo } from './shared.info.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private _loginUrl = `${environment.API_AUTH_URL}signin`; // 'http://localhost:5000/auth/signin';
  private _signUpUrl = `${environment.API_AUTH_URL}signup`; //'http://localhost:5000/auth/signup';
  private _signUpUrlProfile = `${environment.API_AUTH_URL}signupprofile`; //'http://localhost:5000/auth/signupprofile';
  private _formReviewUrl = `${environment.API_SURVEY_URL}formReviews`;
  private _formReviewAnswersUrl = `${environment.API_SURVEY_URL}formReviewsAnswers`;
  private _packageUrl = `${environment.API_SURVEY_URL}packages`;
  private _packagePriceUrl = `${environment.API_SURVEY_URL}packagePrices`;
  private _eventUrl = `${environment.API_SURVEY_URL}event`;
  private _discountTypeUrl = `${environment.API_SURVEY_URL}discountType`;
  private _discountUrl = `${environment.API_SURVEY_URL}discount`;
  private _profileUrl = `http://localhost:5000/profile`; //`${environment.API_AUTH_URL}profile`;
  private permission!: string;
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private shared: SharedInfo
  ) {
    this.shared.userInfo.subscribe((data) => {
      if (data.permission && data.permission[2])
        this.permission = data.permission[2];
      else this.permission = '';
    });
  }

  saveProfile(data: any) {
    return this.httpClient.post<any>(this._profileUrl, data);
  }

  saveDiscount(data: any) {
    return this.httpClient.post<any>(this._discountUrl, data);
  }

  saveDType(name: any) {
    return this.httpClient.post<any>(this._discountTypeUrl, name);
  }

  saveEvent(name: any) {
    return this.httpClient.post<any>(this._eventUrl, name);
  }

  savePackage(packageData: any) {
    return this.httpClient.post<any>(this._packageUrl, packageData);
  }

  savePackagePrice(packagePrice: any) {
    return this.httpClient.post<any>(this._packagePriceUrl, packagePrice);
  }

  saveFormReview(formReview: any) {
    return this.httpClient.post<any>(this._formReviewUrl, formReview);
  }

  saveFormReviewAnswers(formReviewAnswer: any) {
    return this.httpClient.post<any>(
      this._formReviewAnswersUrl,
      formReviewAnswer
    );
  }
  loginUser(user: any) {
    return this.httpClient.post<any>(this._loginUrl, user);
  }
  getinfo(user: any) {
    return this.httpClient.post<any>(
      'http://localhost:5000/auth/getinfo',
      user
    );
  }
  finduser(user: any) {
    return this.httpClient.post<any>(
      'http://localhost:5000/admin/finduser',
      user
    );
  }
  ActiveAccount(user: any) {
    return this.httpClient.post<any>(
      'http://localhost:5000/admin/ActiveAccount',
      user
    );
  }
  InActiveAccount(user: any) {
    return this.httpClient.post<any>(
      'http://localhost:5000/admin/InActiveAccount',
      user
    );
  }
  changeinfoUser(user: any) {
    return this.httpClient.post<any>(
      'http://localhost:5000/auth/updateinfo',
      user
    );
  }
  changepassword(user: any) {
    return this.httpClient.post<any>(
      'http://localhost:5000/auth/forgetpassword',
      user
    );
  }
  errorhandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  signUpUser(user: any) {
    return this.httpClient.post<any>(this._signUpUrl, user);
  }
  signUpUserProfile(user: any) {
    return this.httpClient.post<any>(this._signUpUrlProfile, user);
  }
  loggedin() {
    return !!localStorage.getItem('token');
  }
  loggedinAdmin() {
    return !!localStorage.getItem('token') && !!this.permission;
  }
  payment(packageid: any) {
    return this.httpClient.post<any>(
      'http://localhost:9001/survey/packagePrices/orderrequest',
      packageid
    );
  }
  verifypayment(orderinfo: any) {
    return this.httpClient.post<any>(
      'http://localhost:9001/survey/packagePrices/orderverify',
      orderinfo
    );
  }
  findusers(i: any,user: any) {
    const api = "http://localhost:5000/admin/searchbar/" + i +"/5";
    return this.httpClient.post<any>(api, user);
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/dashboard']);
  }
}
