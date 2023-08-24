import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Donation} from "./donation";



@Injectable({
  providedIn: 'root'
})
export class DonationService {

  url:string = "http://localhost:8080/donation";

  userId = localStorage.getItem('id');

  donationList$: BehaviorSubject<Donation[]> = new BehaviorSubject<Donation[]>([]);

  constructor(private http: HttpClient) { }

  loadDonations(): Observable<Donation[]> {
    return this.http.get<Donation[]>(this.url).pipe(tap(donation => this.donationList$.next(donation)));
  }

  getDonations(): Observable<Donation[]> {
    return this.donationList$.asObservable();
  }

  updateDonationDB(id: string, donation: Donation) {
    this.http.put(this.url+"/"+id+"/"+this.userId, donation).subscribe(log=> console.log("update successfull!"));
  }

  saveDonationDB(campaignId: number | undefined, donorId: number | undefined, donationRequest: Donation) {
    console.log(campaignId);
    console.log(donorId);
    console.log(donationRequest);
    this.http.post(this.url+'/'+donorId+'/'+campaignId+'/'+this.userId, donationRequest).subscribe(
       response => {
         console.log('Added successfully: ', response);
       },
       error => {
         console.log(error.status);
         console.log(error.message);
         throw new Error(error.error.status);
       }
     );
  }

  deleteDonationDB(id: string) {
    this.http.delete(this.url+'/'+id+'/' + this.userId).subscribe(log=>console.log("deleted successfully"))
  }

  approveDonationDB(id: string, donation: Donation) {
    this.http.patch(this.url + "/" + id + "/" + this.userId, donation).subscribe(log=> console.log("successfull!"));
  }
}
