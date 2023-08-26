import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PricingService {

  constructor(private http: HttpClient) {} 

  getAllPackages()
  {
    return this.http.get(environment.apiBaseUrl + '/packages');
  }
  getPackages(id:any)
  {
    return this.http.get(environment.apiBaseUrl + '/packages/'+id);
  }
  addPackages(formData:any)
  {
    return this.http.post(environment.apiBaseUrl + '/packages/',formData);
  }
  editPackages(_id:any,formData:any)
  {
    return this.http.put(environment.apiBaseUrl + '/packages/'+_id,formData);
  }
  deletePackages(_id:any)
  {
    return this.http.delete(environment.apiBaseUrl + '/packages/'+_id);
  }
  verifyPayment(formData:any)
  {
    return this.http.post(environment.apiBaseUrl + '/payment/verify',formData);
  }
}
