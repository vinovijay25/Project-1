import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CutoffService {

  constructor(private http: HttpClient) {}
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  getCutoffs() {
    return this.http.get(environment.apiBaseUrl + '/cutoffs').pipe(
      map((cutoffdata: any) => {
        return cutoffdata;
      })
    );
  }

  
  addCutoff(cutoffData): Observable<any> {
    return this.http.post(environment.apiBaseUrl + '/cutoffs', cutoffData);
  }

  updateCutoff(cutoffData): Observable<any> {
    return this.http
      .put(environment.apiBaseUrl + '/cutoffs/' + cutoffData._id, cutoffData, {
        headers: this.headers,
      })
      .pipe();
  }

  deleteCutoff(cutoffData): Observable<any> {
    return this.http
      .delete(environment.apiBaseUrl + '/cutoffs/' + cutoffData._id, {
        headers: this.headers,
      })
      .pipe();
  }





}
