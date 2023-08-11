import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "./LoginRequest";
import {LoginResponse} from "./LoginResponse";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string ="http://localhost:8080/auth/login"
  // @ts-ignore

  loginResponse:BehaviorSubject<LoginResponse> = new BehaviorSubject<LoginResponse>([])
  constructor(private http: HttpClient) { }

  login(loginRequest : LoginRequest):void{
    console.log("aici")

    this.http.post<LoginResponse>(this.url,loginRequest).subscribe(loginResponse =>{
      localStorage.setItem("token",loginResponse.accessToken)
      console.log(loginResponse.accessToken)
    })
  }
}
