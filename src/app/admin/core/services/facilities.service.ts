import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacilitiesService {

  constructor(private http:HttpClient) { }
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  getFacilities(_id:any)
  {
    return this.http.get(environment.apiBaseUrl + `/facilities?_id=${_id}`);
  }

  getFacilitiess() {
    return this.http.get(environment.apiBaseUrl + '/facilities').pipe(
      map((facilitiesData: any) => {
        return facilitiesData;
      })
    );
  }


  addFacilities(facilitiesData): Observable<any> {
    return this.http.post(environment.apiBaseUrl + '/facilities', facilitiesData);
  }

  updateFacilities(facilitiesId: string, updatedFacilitiesData: any): Observable<any> {
    return this.http
      .put(environment.apiBaseUrl + '/facilities/' + facilitiesId, updatedFacilitiesData, {
        headers: this.headers,
      })
      .pipe();
  }

  deleteFacilities(facilitiesData): Observable<any> {
    return this.http
      .delete(environment.apiBaseUrl + '/facilities/' +  facilitiesData._id, {
        headers: this.headers,
      })
      .pipe();
  }

}
