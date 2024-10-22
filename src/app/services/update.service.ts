import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class PutService {
  constructor(private httpClient: HttpClient){}

  updateProfile(id: any, data: any){
    const api = `http://localhost:5000/profile/${id}`;
    return this.httpClient.put<any>(api, data);
  }

  updatePackage(id: any, data: any){
    const api = `${environment.API_SURVEY_URL}packagePrices/${id}`;
    return this.httpClient.put<any>(api, data);
}

  updateFormReview(id: any, data: any){
    const api = `${environment.API_SURVEY_URL}formReviews/${id}`;
    return this.httpClient.put<any>(api, data);
  }

  updateFormReviewAnswer(id: any, data: any){
    const api = `${environment.API_SURVEY_URL}formReviewsAnswers/${id}`;
    return this.httpClient.put<any>(api, data);
  }

  updateDiscount(id: any, data: any){
    const api = `${environment.API_SURVEY_URL}discount/${id}`;
    return this.httpClient.put<any>(api, data);
  }

  updatePackageForms(data: any){
    const api = `http://localhost:5000/profile/update`;
    return this.httpClient.put<any>(api, data);
  }
}
