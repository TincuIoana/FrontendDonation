import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, forkJoin, map, Observable, tap} from "rxjs";
import {Campaign} from "./campaign";
import {Donor} from "../donor-management/Donor";
import {Donation} from "../donation-management/donation";
import {LoginService} from "../login/login.service";
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(
    private http:HttpClient,
    private loginService: LoginService
  ) { }

  url:string = "http://localhost:8080/campaign"; //atentie mare ca userul sa aiba CAMP_MANAGEMENT

  url2:string ="http://localhost:8080/donation/camp";

  url3:string="http://localhost:8080/donator/camp";


   userID= this.loginService.getLoggedUserId();

  campaignList$:BehaviorSubject<Campaign[]> = new BehaviorSubject<Campaign[]>([]);
  donorList$:BehaviorSubject<Donor[]> = new BehaviorSubject<Donor[]>([]);
  donationList$:BehaviorSubject<Donation[]> = new BehaviorSubject<Donation[]>([]);
  loadCampaigns(): Observable<Campaign[]>{

    return this.http.get<Campaign[]>(this.url).pipe(tap(camp=>this.campaignList$.next(camp)));
  }

  loadDonators(id:string): Observable<Donor[]>{
    return this.http.get<Donor[]>(this.url3+'/'+id).pipe(tap(don=>this.donorList$.next(don)));

  }

  loadDonations(id:string):Observable<Donation[]>{
    return this.http.get<Donation[]>(this.url2+'/'+id).pipe(tap(don=>this.donationList$.next(don)));

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

  getCampaignsWithDonators(): Observable<{ campaign: Campaign, donators: Donor[] }[]> {
    return this.loadCampaigns().pipe(
      switchMap((campaigns: Campaign[]) => {
        const observables = campaigns.map(campaign =>
          this.loadDonators(campaign.id.toString()).pipe(
            map((donators: Donor[]) => ({ campaign, donators }))
          )
        );
        return forkJoin(observables);
      })
    );
  }


}
