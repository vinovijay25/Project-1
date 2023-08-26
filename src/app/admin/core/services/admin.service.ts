import { Injectable} from '@angular/core';
// import {HttpClient,HttpHeaders } from '@angular/common/http';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = '/api/adminroles';
  adminData:any;

  modules = ['Admin','College','Package','QnA','VideoCounseling','Users'];
  privilages = ['Add','Edit','Delete','Replay'];


  constructor(private http: HttpClient) {
    
  }
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  AddRole(role:any,modules:any,privilages:any):Observable<any>
  {
    const url = environment.apiBaseUrl+"/adminroles";
    const dataForm = {name:role,modules:modules,privilages:privilages};
    return this.http.post(url,dataForm);
  }

  GetAdminModules()
  {
    return this.modules;
  }

  GetAdminPrivilages()
  {
    return this.privilages;
  }

  GetRoles():Observable<any>
  {
    const url = environment.apiBaseUrl+"/adminroles";
    return this.http.get(url);
  }
  GetRole(_id:any):Observable<any>
  {
    const url = environment.apiBaseUrl+"/adminroles/"+_id;
    return this.http.get(url);
  }
  EditRole(_id:any,role:any,modules:any,privilages:any):Observable<any>
  {
    const dataForm = {name:role,modules:modules,privilages:privilages};
    const url = environment.apiBaseUrl+"/adminroles/"+_id;
    return this.http.put(url,dataForm);
  }
  DeleteRole(_id:any):Observable<any>
  {
    const url = environment.apiBaseUrl+"/adminroles/"+_id;
    return this.http.delete(url);
  }

  // ------------------ ADMIN ROLES End ----------------------- 


  // ------------------ ADMIN Users START ----------------------- 

  GetUser(_id:any):Observable<any>
  {
    const url = environment.apiBaseUrl+"/adminusers/"+_id;
    return this.http.get(url);
  }
  GetUsers():Observable<any>
  {
    const url = environment.apiBaseUrl+"/adminusers";
    return this.http.get(url);
  }
  GetUsersById(_id:any):Observable<any>
  {
    const url = environment.apiBaseUrl+"/adminusers/"+_id;
    return this.http.get(url);
  }

  AddUser(username:any,email:any,password:any,role:any):Observable<any>
  {
    const url = environment.apiBaseUrl+"/adminusers";
    const dataForm = {username:username,email:email,password:password,role:role};
    return this.http.post(url,dataForm);
  }
  DeleteUser(_id:any):Observable<any>
  {
    const url = environment.apiBaseUrl+"/adminusers/"+_id;
    return this.http.delete(url);
  }
  EditUser(_id:any,username:any,email:any,role:any):Observable<any>
  {
    const url = environment.apiBaseUrl+"/adminusers/"+_id;
    const dataForm = {username:username,email:email,role:role};
    return this.http.put(url,dataForm);
  }

  // ADMIN LOGIN=======================================

  Login(username_or_email:any,password:any)
  {
    const url = environment.apiBaseUrl+"/adminlogin/";
    const dataForm = {username_or_email:username_or_email,password:password};
    return this.http.post(url,dataForm);
  }

  isAuthenticated():boolean 
  {
    if(localStorage.getItem('adminuserid'))
    {
      return true;
    } 
    return false;
  }

}