import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http: HttpClient) {}
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  getBranches() {
    return this.http.get(environment.apiBaseUrl + '/branches').pipe(
      map((branchdata: any) => {
        return branchdata;
      })
    );
  }

  
  addBranch(branchData): Observable<any> {
    return this.http.post(environment.apiBaseUrl + '/branches', branchData);
  }

  // updateBranch(branchData): Observable<any> {
  //   return this.http
  //     .put(environment.apiBaseUrl + '/branches/' + branchData._id, branchData, {
  //       headers: this.headers,
  //     })
  //     .pipe();
  // }

  // deleteBranch(branchData): Observable<any> {
  //   return this.http
  //     .delete(environment.apiBaseUrl + '/branches/' + branchData._id, {
  //       headers: this.headers,
  //     })
  //     .pipe();
  // }






    GetBranchById(_id:any):Observable<any>
  {
    const url = environment.apiBaseUrl+"/branches/"+_id;
    return this.http.get(url);
  }

    updateBranch(_id:any,branchData): Observable<any> {
    return this.http
      .put(environment.apiBaseUrl + '/branches/' +_id, branchData, {
        headers: this.headers,
      })
      .pipe();
  }

   deleteBranch(_id:any,branchData): Observable<any> {
    return this.http
      .delete(environment.apiBaseUrl + '/branches/' +_id,  {
        headers: this.headers,
      })
      .pipe();
  }


}
