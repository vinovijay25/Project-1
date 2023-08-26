import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadCollegeDataService 
{

  constructor(private http:HttpClient) { }

  uploadOverview(formData):Observable<any>
  {
    return this.http.post(environment.apiBaseUrl + '/upload_college_data/overview', formData);
  }
  uploadCourse(formData):Observable<any>
  {
    return this.http.post(environment.apiBaseUrl + '/upload_college_data/course', formData);
  }
  uploadCutoff(formData):Observable<any>
  {
    return this.http.post(environment.apiBaseUrl + '/upload_college_data/cutoff', formData);
  }
  uploadFacilities(formData):Observable<any>
  {
    return this.http.post(environment.apiBaseUrl + '/upload_college_data/facility', formData);
  }
  uploadPlacement(formData):Observable<any>
  {
    return this.http.post(environment.apiBaseUrl + '/upload_college_data/placement', formData);
  }
  uploadPlacementStat(formData):Observable<any>
  {
    return this.http.post(environment.apiBaseUrl + '/upload_college_data/placement-stat', formData);
  }
  uploadAcademicRank(formData):Observable<any>
  {
    return this.http.post(environment.apiBaseUrl + '/upload_college_data/acadamic-ranks', formData);
  }
}
