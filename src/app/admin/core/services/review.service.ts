import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ReviewService {

  myReview:any;
  
  constructor(private http: HttpClient) {} 

  setMyReview(formData)
  {
    this.myReview = formData;
  }

  getMyReview()
  {
    return this.myReview;
  }

  getReviews()
  {
    return this.http.get(environment.apiBaseUrl + "/reviews");
  }
  getReview(_id)
  {
    return this.http.get(environment.apiBaseUrl + "/reviews/" + _id);
  }
  verifyReview(_id,formData)
  {
    return this.http.put(environment.apiBaseUrl + "/reviews/" + _id,formData);
  }
  getReviewByOverview(_id)
  {
    return this.http.get(environment.apiBaseUrl + "/reviews?_id=" + _id);
  }
  postReview(formData)
  {
    return this.http.post(environment.apiBaseUrl + "/reviews",formData);
  }

  deleteReview(_id:any): Observable <any> {
    return this.http.delete(environment.apiBaseUrl + "/reviews/"+_id);
  }
}
