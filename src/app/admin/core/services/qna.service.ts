import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QnaService {

  constructor(private http: HttpClient) {}  

  getAllQuestions()
  {
    return this.http.get(environment.apiBaseUrl + "/forums");
  }

  askQuestion(forumData:any)
  {
    return this.http.post(environment.apiBaseUrl + '/forums', forumData);
  }
  deleteQuestion(_id:any)
  {
    return this.http.delete(environment.apiBaseUrl + '/forums/'+_id );
  }
  getQuestions(user_id:any)
  {
    return this.http.get(environment.apiBaseUrl + '/userforums/'+user_id);
  }
  getQuestion(forum_id:any)
  {
    return this.http.get(environment.apiBaseUrl + '/forums/'+forum_id);
  }
  getReplays(_id:any)
  {
    return this.http.get(environment.apiBaseUrl + '/forumreplays/'+_id);
  }
  getReplays2(_id:any)
  {
    return this.http.get(environment.apiBaseUrl + '/forumreplays?forumid='+_id);
  }

  editReplays(_id:any,replay:any)
  {
    return this.http.put(environment.apiBaseUrl + '/forumreplays/'+_id,{body:replay});
  }

  deleteReplay(_id:any): Observable<any>
  {
    return this.http.delete(environment.apiBaseUrl + '/forumreplays/'+_id);
  }

  addReplay(forum_id:any,replay:any,adminuserid:any)
  {
    return this.http.post(environment.apiBaseUrl + "/forumreplays/",{forumid:forum_id,body:replay,adminuserid:adminuserid});
  }

  //Q&A Catagory
  getAllCatagorys()
  {
    return this.http.get(environment.apiBaseUrl + "/forum-catagorys");
  }
  getCatagory(_id)
  {
    return this.http.get(environment.apiBaseUrl + "/forum-catagorys/" + _id);
  }
  addCatagory(name)
  {
    return this.http.post(environment.apiBaseUrl + "/forum-catagorys",{name:name});
  }
  editCatagory(_id,name)
  {
    return this.http.put(environment.apiBaseUrl + "/forum-catagorys/"+_id,{name:name});
  }
  deleteCatagory(_id)
  {
    return this.http.delete(environment.apiBaseUrl + "/forum-catagorys/"+_id);
  }

}
