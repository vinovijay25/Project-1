import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminloginService {

  constructor(private http: HttpClient) { }

  login(formData:any)
  {
    return this.http.post(environment.apiBaseUrl + "/adminlogin",formData);
  }

  isAuthenticated()
  {
    if(this.getUserData())
    {
        return true;
    }
    return false;
  }

  hasModules(module:string[])
  {
    const modules = this.getUserData().role.modules;  
    return modules.some((role: string) => module.includes(role));
  }

  setUserData(data:any)
  {
    const json = JSON.stringify(data);
    sessionStorage.setItem('adminusersession',json);
  }

  getUserData()
  {
    const json = JSON.parse(String(sessionStorage.getItem('adminusersession')))
    return json;
  }

  clearUserData()
  {
    sessionStorage.removeItem('adminusersession');
  }
}
