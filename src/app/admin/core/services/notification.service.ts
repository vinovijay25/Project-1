import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpClient) { }

  getNotifications()
  {
    return this.http.get(environment.apiBaseUrl + "/notifications");
  }
  getNotification(_id)
  {
    return this.http.get(environment.apiBaseUrl + "/notifications/" + _id);
  }

  postNotification(formData)
  {
    return this.http.post(environment.apiBaseUrl + "/notifications",formData);
  }
  editNotification(_id,formData)
  {
    return this.http.put(environment.apiBaseUrl + "/notifications/"+_id,formData);
  }

  deleteNotification(_id:any) {
    return this.http.delete(environment.apiBaseUrl + "/notifications/"+_id);
  }
}
