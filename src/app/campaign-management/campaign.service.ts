import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {Campaign} from "./campaign";
import {Donor} from "../donor-management/Donor";

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http:HttpClient) { }

  url:string = "http://localhost:8080/campaign"; //atentie mare ca userul sa aiba CAMP_MANAGEMENT

  url2:string ="http://localhost:8080/donation";

  url3:string="http://localhost:8080/donator/camp";

   userID= localStorage.getItem('id');

  campaignList$:BehaviorSubject<Campaign[]> = new BehaviorSubject<Campaign[]>([]);
  donorList$:BehaviorSubject<Donor[]> = new BehaviorSubject<Donor[]>([]);
  loadCampaigns(): Observable<Campaign[]>{

    return this.http.get<Campaign[]>(this.url).pipe(tap(camp=>this.campaignList$.next(camp)));
  }

  loadDonators(id:string): Observable<Donor[]>{
    return this.http.get<Donor[]>(this.url3+'/'+id).pipe(tap(don=>this.donorList$.next(don)));

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
