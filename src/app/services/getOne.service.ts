import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})


export class GetOneService {

  constructor(private httpClient: HttpClient) {}

  getOneUser(id: any){
    const api = `${environment.API_AUTH_URL}auth/${id}`;
    return this.httpClient.get<any>(api);
  }

  getOneProfile(id: any){
    const api = `${environment.API_SURVEY_URL}profile/${id}`;
    return this.httpClient.get<any>(api);
  }

  getOneFormReview(code: any) {
    const api = `${environment.API_SURVEY_URL}formReviews/code/${code}`;
    return this.httpClient.get<any>(api);
  }

  getOneFormReviewById(id: any) {
    const api = `${environment.API_SURVEY_URL}formReviews/${id}`;
    return this.httpClient.get<any>(api);
  }

  getOneFormReviewByCode(code: any) {
    const api = `${environment.API_SURVEY_URL}formReviews/code/${code}`;
    return this.httpClient.get<any>(api);
  }

  getOneFormReviewAnswer(code: any) {
    const api = `${environment.API_SURVEY_URL}formReviewsAnswers/code/${code}`;
    return this.httpClient.get<any>(api);
  }

  getOnePackageByName(name: any) {
    const api = `${environment.API_SURVEY_URL}packages/name/${name}`;
    return this.httpClient.get<any>(api);
  }

  getOneEvent(name: any) {
    const api = `${environment.API_SURVEY_URL}event/name/${name}`;
    return this.httpClient.get<any>(api);
  }

  getOneEventById(id: any) {
    const api = `${environment.API_SURVEY_URL}event/id/${id}`;
    return this.httpClient.get<any>(api);
  }

  getOneDiscountType(name: any) {
    const api = `${environment.API_SURVEY_URL}discountType/name/${name}`;
    return this.httpClient.get<any>(api);
  }

  getOneDiscountTypeById(id: any) {
    const api = `${environment.API_SURVEY_URL}discountType/id/${id}`;
    return this.httpClient.get<any>(api);
  }

  getOnePackagePriceById(id: any) {
    const api = `${environment.API_SURVEY_URL}packagePrices/${id}`;
    return this.httpClient.get<any>(api);
  }

  getOnePackageById(id: any) {
    const api = `${environment.API_SURVEY_URL}packages/id/${id}`;
    return this.httpClient.get<any>(api);
  }

  getOneDiscountByPackageId(packageId: any){
    const api = `${environment.API_SURVEY_URL}discount/packagePriceId/${packageId}`;
    return this.httpClient.get<any>(api);
  }

  getOneDiscountById(id: any){
    const api = `${environment.API_SURVEY_URL}discount/${id}`;
    return this.httpClient.get<any>(api);
  }


  getOneProfileId(){
    const api = `${environment.API_AUTH_URL}auth/getUserProfile`
    return this.httpClient.get<any>(api);
  }


  getOneUserById(id: any){
    const api = `${environment.API_AUTH_URL}auth/${id}`;
    return this.httpClient.get<any>(api);
  }
}
