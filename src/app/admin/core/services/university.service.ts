import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  constructor(private http: HttpClient) {}
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  getUniversities() {
    return this.http.get(environment.apiBaseUrl + '/universities').pipe(
      map((universitydata: any) => {
        return universitydata;
      })
    );
  }

  
  addUniversity(universityData): Observable<any> {
    return this.http.post(environment.apiBaseUrl + '/university', universityData);
  }

  // updateUniversity(universityData): Observable<any> {
  //   return this.http
  //     .put(environment.apiBaseUrl + '/university/' + universityData._id, universityData, {
  //       headers: this.headers,
  //     })
  //     .pipe();
  // }

  // deleteUniversity(universityData): Observable<any> {
  //   return this.http
  //     .delete(environment.apiBaseUrl + '/university/' + universityData._id, {
  //       headers: this.headers,
  //     })
  //     .pipe();
  // }


  GetUniversityById(_id:any):Observable<any>
  {
    const url = environment.apiBaseUrl+"/universities/"+_id;
    return this.http.get(url);
  }

    updateUniversity(_id:any,universityData:any): Observable<any> {
    return this.http
      .put(environment.apiBaseUrl + '/university/' +_id, universityData, {
        headers: this.headers,
      })
      .pipe();
  }

   deleteUniversity(_id:any,universityData): Observable<any> {
    return this.http
      .delete(environment.apiBaseUrl + '/university/' +_id,  {
        headers: this.headers,
      })
      .pipe();
  }



}




