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

  saveCampaignToDB(campaignRequest: Campaign): void {
    this.http.post(this.url+'/'+this.userID, campaignRequest).subscribe(
      response => {
        console.log('Added successfully:', response);
      },
      error => {
      throw new Error(error.error.message)
      }
    );
  }


  deleteFromDB(id: string):void{
    this.http.delete(this.url+'/'+id+"/" + this.userID).subscribe(log=>console.log("deleted successfully"))
  }

  updateCampaignFromDB(id: string, campaign: Campaign) {
    this.http.put(this.url+"/"+id+"/" + this.userID,campaign).subscribe(log=>console.log("updated successfully"))
  }



}
