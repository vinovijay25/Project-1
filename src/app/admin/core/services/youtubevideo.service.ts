import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubevideoService {


  categories = [
    { _id: 'c0', label: 'Tutorials' },
    { _id: 'c1', label: 'About Admissions' },
    { _id: 'c2', label: 'Test' },
  ];
  
  subcategories = { 'c0':[{ _id: 'sc0', label: 'Prediction'},{ _id: 'sc1', label: 'Video Counseling' },{ _id: 'sc2', label: 'Q&A' },],
                    'c1':[{ _id: 'sc0', label: 'Engineering'}],
};

  constructor(private http: HttpClient) {}


  headers = new HttpHeaders().set('Content-Type', 'application/json');

  getCatagory()
  {
    return this.categories;
  }

  getCatagoryName(id)
  {
    let label = "";
    this.categories.forEach(catagory=>{
      if(catagory._id == id)
      {
        label = catagory.label;         
      }
    });
    return label;
  }

  getSubCatagoryName(cid,sid)
  {
    let label = "";
    this.categories.forEach(catagory=>{
      if(catagory._id == cid)
      {
        this.subcategories[catagory._id].forEach(scatagory=>
          {
            if(scatagory._id == sid)
            {
              label = scatagory.label;         
            }
          });
      }
    });
    return label;
  }

  getSubcatagory(id)
  {
    return this.subcategories[id];
  }

  getYoutubevideos() {
    return this.http.get(environment.apiBaseUrl + '/youtubevideo').pipe(
      map((youtubevideodata: any) => {
        return youtubevideodata;
      })
    );
  }

  
  addYoutubevideo(youtubevideoData): Observable<any> {
    return this.http.post(environment.apiBaseUrl + '/youtubevideo', youtubevideoData);
  }

  


  GetYoutubevideoById(_id:any):Observable<any>
  {
    const url = environment.apiBaseUrl+"/youtubevideo/"+_id;
    return this.http.get(url);
  }
  
 

  updateYoutubevideo(_id:any,youtubevideoData): Observable<any> {
    return this.http
      .put(environment.apiBaseUrl + '/youtubevideo/' + _id, youtubevideoData, {
        headers: this.headers,
      })
      .pipe();
  }

  deleteYoutubevideo(_id:any,youtubevideoData): Observable<any> {
    return this.http
      .delete(environment.apiBaseUrl + '/youtubevideo/' +_id, {
        headers: this.headers,
      })
      .pipe();
  }
}

