import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Donor} from "./Donor";
import {LoginService} from "../login/login.service";

@Injectable({
  providedIn: 'root'
})
export class DonorService {

  url:string = "http://localhost:8080/donator";

  userID= this.loginService.getLoggedUserId();
  constructor(
    private http:HttpClient,
    private loginService: LoginService
  ) { }

  donorList$:BehaviorSubject<Donor[]> = new BehaviorSubject<Donor[]>([]);
  loadDonors(): Observable<Donor[]>{

    return this.http.get<Donor[]>(this.url).pipe(tap(don=>this.donorList$.next(don)));
  }

  getDonors():Observable<Donor[]>{
    return this.donorList$.asObservable();

  }

  saveDonorToDB(donorRequest: Donor):void{
    this.http.post(this.url +'/'+this.userID,donorRequest).subscribe(log=>console.log("added successfully"))

  }

  deleteFromDB(id:string){
    this.http.delete(this.url+'/'+id+"/" + this.userID).subscribe(log=>console.log("deleted successfully"))

  }

  updateDonorFromDB(id:string,donor:Donor){
    this.http.put(this.url+"/"+id+"/"+this.userID,donor).subscribe(log=>console.log("updated successfully"))

  }

}
