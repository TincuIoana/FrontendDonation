import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Campaign} from "./campaign";

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http:HttpClient) { }

  url:string = "http://localhost:8080/campaign";
  url1:string = "http://localhost:8080/campaign/5";
  url2:string = "http://localhost:8080/campaign/5"; //dummy url-s  trebuie luat id-ul de la user
  //atentie mare ca userul sa aiba CAMP_MANAGEMENT
  campaignList$:BehaviorSubject<Campaign[]> = new BehaviorSubject<Campaign[]>([]);
  loadCampaigns(): Observable<Campaign[]>{

    return this.http.get<Campaign[]>(this.url).pipe(tap(camp=>this.campaignList$.next(camp)));
  }

  getCampaigns():Observable<Campaign[]>{
    return this.campaignList$.asObservable();

  }

  saveCampaignToDB(campaignRequest: Campaign ):void{
    this.http.post(this.url1,campaignRequest).subscribe(log=>console.log("added successfully"))
  }

  deleteFromDB(id: string):void{
    this.http.delete(this.url+id+"/5").subscribe(log=>console.log("deleted successfully"))
  }

  updateCampaignFromDB(id: string, campaign: Campaign) {
    this.http.put(this.url+"/"+id+"/5",campaign).subscribe(log=>console.log("updated successfully"))
  }
}
