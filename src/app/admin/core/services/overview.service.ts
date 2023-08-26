import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverviewService {

  constructor(private http: HttpClient) {}
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  getOverviews() {
    return this.http.get(environment.apiBaseUrl + '/overviews').pipe(
      map((overviewData: any) => {
        return overviewData;
      })
    );
  }
  getOverviewByCollegeCode(college_code: any) {
    return this.http.get(environment.apiBaseUrl + '/overviews?college_code='+college_code);
  }
  getOverview(_id: any) {
    return this.http.get(environment.apiBaseUrl + '/overviews/' + _id);
  }
  
  addOverview(overviewData): Observable<any> {
    return this.http.post(environment.apiBaseUrl + '/overviews', overviewData);
  }

  updateOverview(overviewId: string, updatedOverviewData: any): Observable<any> {
    return this.http
      .put(environment.apiBaseUrl + '/overviews/' + overviewId, updatedOverviewData, {
        headers: this.headers,
      })
      .pipe();
  }

  deleteOverview(overviewData): Observable<any> {
    return this.http
      .delete(environment.apiBaseUrl + '/overviews/' +  overviewData._id, {
        headers: this.headers,
      })
      .pipe();
  }



  
  getSecretOverviews() {
    return this.http.get(environment.apiBaseUrl + '/secret');
  }

  getSecretOverview(_id: string) {
    return this.http.get(environment.apiBaseUrl + '/secret/' + `${_id}`);
  }
    // Private methods for secret overviews
    addSecretOverview(secretOverviewData): Observable<any> {
      return this.http.post(environment.apiBaseUrl + '/secret', secretOverviewData);
    }
  
    updateSecretOverview(secretOverviewId: string, updatedSecretOverviewData: any): Observable<any> {
      return this.http
        .put(environment.apiBaseUrl + '/secret/' + secretOverviewId, updatedSecretOverviewData, {
          headers: this.headers,
        })
        .pipe();
    }
  
    deleteSecretOverview(secretOverviewData): Observable<any> {
      return this.http
        .delete(environment.apiBaseUrl + '/secret/' + secretOverviewData._id, {
          headers: this.headers,
        })
        .pipe();
    }


    //search history

    addSearchHistory(college_code)
    {
      return this.http.post(environment.apiBaseUrl + '/search-history',{college_code:college_code});
    }

}
