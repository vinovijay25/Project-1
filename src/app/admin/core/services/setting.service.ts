import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private http: HttpClient) {}
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  getSettings() {
    return this.http.get(environment.apiBaseUrl + '/settings').pipe(
      map((settingdata: any) => {
        return settingdata;
      })
    );
  }

  
  addSetting(settingData): Observable<any> {
    return this.http.post(environment.apiBaseUrl + '/settings', settingData);
  }

  





    GetSettingById(_id:any):Observable<any>
  {
    const url = environment.apiBaseUrl+"/settings/"+_id;
    return this.http.get(url);
  }

    updateSetting(_id:any,settingData): Observable<any> {
    return this.http
      .put(environment.apiBaseUrl + '/settings/' +_id, settingData, {
        headers: this.headers,
      })
      .pipe();
  }

   deleteSetting(_id:any,settingData): Observable<any> {
    return this.http
      .delete(environment.apiBaseUrl + '/settings/' +_id,  {
        headers: this.headers,
      })
      .pipe();
  }


}
