import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {}
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  getEmployees() {
    return this.http.get(environment.apiBaseUrl + '/employees').pipe(
      map((employeedata: any) => {
        return employeedata;
      })
    );
  }

  
  addEmployee(employeeData): Observable<any> {
    return this.http.post(environment.apiBaseUrl + '/employee', employeeData);
  }

  updateEmployee(employeeData): Observable<any> {
    return this.http
      .put(environment.apiBaseUrl + '/employee/' + employeeData._id, employeeData, {
        headers: this.headers,
      })
      .pipe();
  }

  deleteEmployee(employeeData): Observable<any> {
    return this.http
      .delete(environment.apiBaseUrl + '/employee/' + employeeData._id, {
        headers: this.headers,
      })
      .pipe();
  }





}
