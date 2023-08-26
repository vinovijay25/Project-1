import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';

// 
@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) {}
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  getAddresses() {
    return this.http.get(environment.apiBaseUrl + '/addresses').pipe(
      map((addressdata: any) => {
        return addressdata;
      })
    );
  }
 
  
  addAddress(addressData): Observable<any> {
    return this.http.post(environment.apiBaseUrl + '/address', addressData);
  }

  updateAddress(addressData): Observable<any> {
    return this.http
      .put(environment.apiBaseUrl + '/address/' + addressData._id, addressData, {
        headers: this.headers,
      })
      .pipe();
  }

  deleteAddress(addressData): Observable<any> {
    return this.http
      .delete(environment.apiBaseUrl + '/address/' + addressData._id, {
        headers: this.headers,
      })
      .pipe();
  }




}
