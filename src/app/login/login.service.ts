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
  // private loggedIn = false;

  // @ts-ignore

  loginResponseSubject  = new BehaviorSubject<LoginResponse>([])
  loginResponse$: Observable<LoginResponse | null> = this.loginResponseSubject .asObservable();


  // logResponse:LoginResponse=new LoginResponse()
  constructor(private http: HttpClient) { }

  login(loginRequest : LoginRequest):Observable<LoginResponse>{
    console.log("aici")

   return  this.http.post<LoginResponse>(this.url,loginRequest)

  }
  setLoginResponse(loginResponse: LoginResponse) {
    this.loginResponseSubject .next(loginResponse);
  }

  // setLoggedIn(value:boolean){
  //   this.loggedIn = value;
  //
  // }
  // isLoggedIn(){
  //   return this.loggedIn;
  // }
}
