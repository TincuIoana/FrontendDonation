import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "./LoginRequest";
import {LoginResponse} from "./LoginResponse";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string ="http://localhost:8080/auth/login"
  private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn: Observable<boolean> = this._isLoggedIn.asObservable();
  // @ts-ignore

  loginResponse:BehaviorSubject<LoginResponse> = new BehaviorSubject<LoginResponse>([])
  constructor(private http: HttpClient) { }

  login(loginRequest : LoginRequest):void{
    console.log("aici")

    this.http.post<LoginResponse>(this.url,loginRequest).subscribe(loginResponse =>{
      localStorage.setItem("token",loginResponse.accessToken)
      localStorage.setItem("id",String(loginResponse.id))
      this._isLoggedIn.next(true);
      console.log(loginResponse.accessToken)
    })
  }
}
