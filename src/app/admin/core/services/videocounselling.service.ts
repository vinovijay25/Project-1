import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VideocounsellingService {



  constructor(private http: HttpClient) {}  



  getallvideocounselling()
  {
    return this.http.get(environment.apiBaseUrl + "/videocounselling");
  }

  getvideocounselling(_id:any): Observable<any> 
  {
    return this.http.get(environment.apiBaseUrl + "/videocounselling/"+_id);
  }
  getvideocounsellingByUser(_id:any): Observable<any> 
  {
    return this.http.get(environment.apiBaseUrl + "/videocounselling?userid="+_id);
  }

  addvideocounselling(userData:any): Observable<any> 
  {
    return this.http.post(environment.apiBaseUrl + "/videocounselling",userData);
  }
  editvideocounselling(_id:any,formData:any): Observable<any> 
  {
    return this.http.put(environment.apiBaseUrl + "/videocounselling/"+_id,formData);
  }
  deletevideocounselling(_id:any): Observable<any> 
  {
    return this.http.delete(environment.apiBaseUrl + "/videocounselling/"+_id);
  }

 



  getallvideocounsellingCatagory()
  {
    return this.http.get(environment.apiBaseUrl + "/videocounsellingcatagory");
  }

  getvideocounsellingCatagory(_id)
  {
    return this.http.get(environment.apiBaseUrl + "/videocounsellingcatagory/"+_id);
  }

  addvideocounsellingCatagory(name)
  {
    return this.http.post(environment.apiBaseUrl + "/videocounsellingCatagory",{name:name});
  }
  editvideocounsellingCatagory(_id,name)
  {
    return this.http.put(environment.apiBaseUrl + "/videocounsellingCatagory/"+_id,{name:name});
  }
  deletevideocounsellingCatagory(_id)
  {
    return this.http.delete(environment.apiBaseUrl + "/videocounsellingCatagory/"+_id);
  }

  // slots
  getallvideocounsellingSlots()
  {
    return this.http.get(environment.apiBaseUrl + "/videocounsellingslots");
  }

  getallvideocounsellingSlotsByDate(date:any)
  {
    return this.http.get(environment.apiBaseUrl + "/videocounsellingslots?date="+date);
  }

  getvideocounsellingSlot(_id)
  {
    return this.http.get(environment.apiBaseUrl + "/videocounsellingslots/"+_id);
  }

  addvideocounsellingSlot(formData)
  {
    return this.http.post(environment.apiBaseUrl + "/videocounsellingslots",formData);
  }
  editvideocounsellingSlot(_id,formData)
  {
    return this.http.put(environment.apiBaseUrl + "/videocounsellingslots/"+_id,formData);
  }
  deletevideocounsellingSlot(_id)
  {
    return this.http.delete(environment.apiBaseUrl + "/videocounsellingslots/"+_id);
  }




  
  getallvideocounselingStaffallocation()
  {
    return this.http.get(environment.apiBaseUrl + "/videocounselingStaffallocation");
  }

  getvideocounselingStaffallocation(_id:any): Observable<any> 
  {
    return this.http.get(environment.apiBaseUrl + "/videocounselingStaffallocation/"+_id);
  }
  getvideocounselingStaffallocationBySlot(_id:any): Observable<any> 
  {
    return this.http.get(environment.apiBaseUrl + "/videocounselingStaffallocation?slotid="+_id);
  }

  addvideocounselingStaffallocation(userData:any): Observable<any> 
  {
    return this.http.post(environment.apiBaseUrl + "/videocounselingStaffallocation",userData);
  }
  editvideocounselingStaffallocation(_id:any,formData:any): Observable<any> 
  {
    return this.http.put(environment.apiBaseUrl + "/videocounselingStaffallocation/"+_id,formData);
  }
  deletevideocounselingStaffallocation(_id:any): Observable<any> 
  {
    return this.http.delete(environment.apiBaseUrl + "/videocounselingStaffallocation/"+_id);
  }
}
