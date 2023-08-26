import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { delay, map } from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  addUser( userData:any): Observable<any> 
  {
    return this.http.post(environment.apiBaseUrl + '/users', userData);
  }
  getUser( _id:any): Observable<any> 
  {
    return this.http.get(environment.apiBaseUrl + '/users/'+_id );
  }
  getUsers(): Observable<any> 
  {
    return this.http.get(environment.apiBaseUrl + '/users/');
  }
  editUser(_id:any,formData:any): Observable<any> 
  {
    return this.http.put(environment.apiBaseUrl + '/users/'+_id,formData);
  }
  
  deleteUser( _id:any): Observable<any> 
  {
    return this.http.delete(environment.apiBaseUrl + '/users/'+_id );
  }
  
  userLogin( phone_or_email:any): Observable<any> 
  {
    return this.http.post(environment.apiBaseUrl + '/userlogin', phone_or_email);
  }
  getUserCredits( _id:any): Observable<any> 
  {
    return this.http.get(environment.apiBaseUrl + '/userscredits/'+_id );
  }
  editUserCredits(_id:any,formData:any)
  {
    return this.http.put(environment.apiBaseUrl + '/userscredits/'+_id ,formData);
  }


  
  getSecretUsers() {
    return this.http.get(environment.apiBaseUrl + '/secret');
  }

  getSecretUser(_id: string) {
    return this.http.get(environment.apiBaseUrl + '/secret/' + `${_id}`);
  }


  isLogined()
  {
    if(localStorage.getItem('usersession') && localStorage.getItem('usersession') != null)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  GetUserSession()
  {
    if(localStorage.getItem('usersession') && localStorage.getItem('usersession') != null)
    {
      const usersession = localStorage.getItem('usersession');
      return JSON.parse(usersession);
    }
    else
    {
      return {error:'usersession not found'};
    }
  }

  verifyEmail(_id)
  {
    return this.http.get(environment.apiBaseUrl + '/users/'+_id + "?q=verify");
  }


}
