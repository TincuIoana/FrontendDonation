import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {Campaign} from "./campaign";

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http:HttpClient) { }

  url:string = "http://localhost:8080/campaign"; //atentie mare ca userul sa aiba CAMP_MANAGEMENT

   userID= localStorage.getItem('id');

  campaignList$:BehaviorSubject<Campaign[]> = new BehaviorSubject<Campaign[]>([]);
  loadCampaigns(): Observable<Campaign[]>{

    return this.http.get<Campaign[]>(this.url).pipe(tap(camp=>this.campaignList$.next(camp)));
  }

  getCampaigns():Observable<Campaign[]>{
    console.log(this.userID)

    return this.campaignList$.asObservable();
  }

  saveCampaignToDB(campaignRequest: Campaign): Observable<any> {
    return this.http.post(this.url+'/'+this.userID, campaignRequest);
  }


  deleteFromDB(id: string):Observable<any>{
    return  this.http.delete(this.url+'/'+id+"/" + this.userID)
  }

  updateCampaignFromDB(id: string, campaign: Campaign) :Observable<any>{
    return this.http.put(this.url+"/"+id+"/" + this.userID,campaign)
  }



}
