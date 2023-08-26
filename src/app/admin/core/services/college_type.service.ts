import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class College_typeService {

  constructor(private http: HttpClient) {}
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  getCollege_types() {
    return this.http.get(environment.apiBaseUrl + '/college_types').pipe(
      map((college_typedata: any) => {
        return college_typedata;
      })
    );
  }

  
  addCollege_type(college_typeData): Observable<any> {
    return this.http.post(environment.apiBaseUrl + '/college_type', college_typeData);
  }

  

  // updateCollege_type(college_typeData): Observable<any> {
  //   return this.http
  //     .put(environment.apiBaseUrl + '/college_type/' + college_typeData._id, college_typeData, {
  //       headers: this.headers,
  //     })
  //     .pipe();
  // }

  // deleteCollege_type(college_typeData): Observable<any> {
  //   return this.http
  //     .delete(environment.apiBaseUrl + '/college_type/' + college_typeData._id, {
  //       headers: this.headers,
  //     })
  //     .pipe();
  // }



  GetCollegeById(_id:any):Observable<any>
  {
    const url = environment.apiBaseUrl+"/college_types/"+_id;
    return this.http.get(url);
  }
  
 

  updateCollege_type(_id:any,college_typeData): Observable<any> {
    return this.http
      .put(environment.apiBaseUrl + '/college_type/' + _id, college_typeData, {
        headers: this.headers,
      })
      .pipe();
  }

  deleteCollege_type(_id:any,college_typeData): Observable<any> {
    return this.http
      .delete(environment.apiBaseUrl + '/college_type/' +_id, {
        headers: this.headers,
      })
      .pipe();
  }


}
