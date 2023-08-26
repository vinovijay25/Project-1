import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class  PlacementService {

    constructor(private http:HttpClient) { }
    headers = new HttpHeaders().set('Content-Type', 'application/json');
  

    getPlacements() {
      return this.http.get(environment.apiBaseUrl + '/placements').pipe(
        map((placementData: any) => {
          return placementData;
        })
      );
    }
    getPlacement(_id:any)
      {
        return this.http.get(environment.apiBaseUrl + `/placements?_id=${_id}`);
      }
    
  
    addPlacements(placementData): Observable<any> {
      return this.http.post(environment.apiBaseUrl + '/placements', placementData);
    }
  
    updatePlacements(placementsId: string, updatedPlacementData: any): Observable<any> {
      return this.http
        .put(environment.apiBaseUrl + '/placements/' + placementsId, updatedPlacementData, {
          headers: this.headers,
        })
        .pipe();
    }
  
    deletePlacements(placementData): Observable<any> {
      return this.http
        .delete(environment.apiBaseUrl + '/placements/' +  placementData._id, {
          headers: this.headers,
        })
        .pipe();
    }
  

    // -------------------- placementstatistics -------------------------------------------------------------
    // -----------------------------------------------------------------------------------------------------


    
    getPlacementstatistics() {
      return this.http.get(environment.apiBaseUrl + '/placementstatistics').pipe(
        map((placementstatisticsData: any) => {
          return placementstatisticsData;
        })
      );
    }
    getPlacementstatistic(_id:any){
      console.log(_id);
      return this.http.get(environment.apiBaseUrl + '/placementstatistics/' + _id);
    }
  
    addPlacementstatistics(placementstatisticsData): Observable<any> {
      return this.http.post(environment.apiBaseUrl + '/placementstatistics', placementstatisticsData);
    }
  
    updatePlacementstatistics(placementstatisticsId: string, updatedPlacementstatisticsData: any): Observable<any> {
      return this.http
        .put(environment.apiBaseUrl + '/placementstatistics/' + placementstatisticsId, updatedPlacementstatisticsData, {
          headers: this.headers,
        })
        .pipe();
    }
  
    deletePlacementstatistics(placementstatisticsData): Observable<any> {
      return this.http
        .delete(environment.apiBaseUrl + '/placementstatistics/' +  placementstatisticsData._id, {
          headers: this.headers,
        })
        .pipe();
    }


    // -------------------- acadamicyearstatistics -------------------------------------------------------------
    // -----------------------------------------------------------------------------------------------------
    

    getAcadamicyearstatistics() {
      return this.http.get(environment.apiBaseUrl + '/acadamicyearstatistics').pipe(
        map((acadamicyearstatisticsData: any) => {
          return acadamicyearstatisticsData;
        })
      );
    }
    getAcadamicyearstatistic(_id:any){
      console.log(_id);
      return this.http.get(environment.apiBaseUrl + '/acadamicyearstatistics/' + _id);
    }
  
    addAcadamicyearstatistics(acadamicyearstatisticsData): Observable<any> {
      return this.http.post(environment.apiBaseUrl + '/acadamicyearstatistics', acadamicyearstatisticsData);
    }
  
    updateAcadamicyearstatistics(acadamicyearstatisticsId: string, updatedAcadamicyearstatisticsData: any): Observable<any> {
      return this.http
        .put(environment.apiBaseUrl + '/acadamicyearstatistics/' + acadamicyearstatisticsId, updatedAcadamicyearstatisticsData, {
          headers: this.headers,
        })
        .pipe();
    }
  
    deleteAcadamicyearstatistics(acadamicyearstatisticsData): Observable<any> {
      return this.http
        .delete(environment.apiBaseUrl + '/acadamicyearstatistics/' +  acadamicyearstatisticsData._id, {
          headers: this.headers,
        })
        .pipe();
    }



  }
  