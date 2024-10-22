import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class DeleteService {

    constructor(private httpClient: HttpClient){}

    deleteOnePackage(id: any){
      const api = `${environment.API_SURVEY_URL}packagePrices/${id}`;
      return this.httpClient.delete<any>(api);
  }

    deleteOneDiscount(id: any){
      const api = `${environment.API_SURVEY_URL}discount/${id}`;
      return this.httpClient.delete<any>(api);
}

  deleteOneFormReview(id: any){
    const api = `${environment.API_SURVEY_URL}formReviews/${id}`;
    return this.httpClient.delete<any>(api);
  }

  deleteManyFormReviewAnswers(id: any){
    const api = `${environment.API_SURVEY_URL}formReviewsAnswers/deleteMany/${id}`;
    return this.httpClient.delete<any>(api);
  }

  deleteUser(id: any) {
      const api = `http://localhost:5000/auth/${id}`;
      return this.httpClient.delete<any>(api);
    }

}
