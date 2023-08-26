import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';

// 
@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) {}
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  getCourses() {
    return this.http.get(environment.apiBaseUrl + '/courses').pipe(
      map((coursedata: any) => {
        return coursedata;
      })
    );
  }
  getCourse (_id){
    return this.http.get(environment.apiBaseUrl + '/courses/' +_id);
  }
 
  
  addCourse(courseData): Observable<any> {
    return this.http.post(environment.apiBaseUrl + '/courses', courseData);
  }

  updateCourse(courseData): Observable<any> {
    return this.http
      .put(environment.apiBaseUrl + '/courses/' + courseData._id, courseData, {
        headers: this.headers,
      })
      .pipe();
  }

  deleteCourse(courseData): Observable<any> {
    return this.http
      .delete(environment.apiBaseUrl + '/courses/' + courseData._id, {
        headers: this.headers,
      })
      .pipe();
  }




}
