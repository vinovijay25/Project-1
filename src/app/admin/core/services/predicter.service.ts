import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class PredicterService {

  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http:HttpClient) { }
  Predict(formData)
  {
    return this.http.post(environment.apiBaseUrl + '/tnea-predictor',formData);
  }

  JwtToken(payload)
  {
    return this.http.post(environment.apiBaseUrl + '/jwt-token',{payload:payload});
  }

  JwtToPayload(token)
  {
    return this.jwtHelper.decodeToken(token);
  }
}
