import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RankPredictorService {

  constructor(private http:HttpClient) { }

  Predict(formData)
  {
    return this.http.post(environment.apiBaseUrl + '/rank-predicter',formData);
  }
}
