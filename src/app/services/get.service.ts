import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetService {
  private _formReviewUrl = `${environment.API_SURVEY_URL}formReviews`;
  private _packagesUrl = `${environment.API_SURVEY_URL}packages`;
  private _packagePricesUrl = `${environment.API_SURVEY_URL}packagePrices`;
  private _packageNamesUrl = `${environment.API_SURVEY_URL}packages`;
  private _eventsUrl = `${environment.API_SURVEY_URL}event`;
  private _discountTypeUrl = `${environment.API_SURVEY_URL}discountType`;
  private _discountUrl = `${environment.API_SURVEY_URL}discount`;
  private _formReviewByUserId = `${environment.API_SURVEY_URL}formReviews/getByUserId`;
  private _formReviewByProfileId = `${environment.API_SURVEY_URL}formReviews/profileId`;
  private _formReviewAnswersByFormReview = `${environment.API_SURVEY_URL}formReviewsAnswers/formReview/`;
  //private _usersByProfiledIdUrl = `${environment.API_AUTH_URL}getAllUsers`

  constructor(private httpClient: HttpClient) {}
  getAllUsersByProfileId(){
    const api = `http://localhost:5000/auth/getAllUsers`;
    return this.httpClient.get<any>(api);
  }

  getAllFormsByProfileId(){
    return this.httpClient.get<any>(this._formReviewByProfileId);
  }

  searchSurveysByTitle(text: any) {
    const api = `${environment.API_SURVEY_URL}formReviews/SearchByTitle/${text}`;
    return this.httpClient.get<any>(api);
  }

  searchUserByUserName(userName: any) {
    const api = `http://localhost:5000/auth/SearchByUserName/${userName}`;
    return this.httpClient.get<any>(api);
  }

  searchSurveysByCode(code: any) {
    const api = `${environment.API_SURVEY_URL}formReviews/SearchByCode/${code}`;
    return this.httpClient.get<any>(api);
  }

  getAllFormReviewsByUserId() {
    return this.httpClient.get<any>(this._formReviewByUserId)
  }

  getAllFormReviewsAnswersByFormReview(formReviewId: any) {
    const api = `${this._formReviewAnswersByFormReview}${formReviewId}`;
    return this.httpClient.get<any>(api)
  }

  getDiscount() {
    return this.httpClient.get<any>(this._discountUrl);
  }

  getEvents() {
    return this.httpClient.get<any>(this._eventsUrl);
  }

  getDiscountTypes() {
    return this.httpClient.get<any>(this._discountTypeUrl);
  }

  getPackages() {
    return this.httpClient.get<any>(this._packagesUrl);
  }

  getPackagePrices() {
    return this.httpClient.get<any>(this._packagePricesUrl);
  }

  getFormReview() {
    return this.httpClient.get<any>(this._formReviewUrl);
  }

  getPackageNames() {
    return this.httpClient.get<any>(this._packageNamesUrl);
  }
  checkPackage(){
    return this.httpClient.get<any>("http://localhost:5000/auth/checkpackage");
  }
  getUsers(i :any){

    const api = "http://localhost:5000/admin/alluser/"+i+"/5";
    return this.httpClient.get<any>(api);
  }
  getOrders(i :any){

    const api = "http://localhost:9001/survey/packagePrices/allorders/" + i +"/5";
    return this.httpClient.get<any>(api);
  }
  getOrderbyid(i :any){

    const api = "http://localhost:9001/survey/packagePrices/getOrderByUserId/" + i +"/5";
    return this.httpClient.get<any>(api);
  }
}
