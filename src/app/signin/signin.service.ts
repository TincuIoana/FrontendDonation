import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {LoginResponse} from "../login/LoginResponse";
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../login/LoginRequest";
import {SigninRequest} from "./SigninRequest";
import {SigninResponse} from "./SigninResponse";

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  url: string ="http://localhost:8080/users/new"

  // @ts-ignore
  signinResponse:BehaviorSubject<SigninResponse> = new BehaviorSubject<SigninResponse>([])


  constructor(private http: HttpClient) { }

  signin(signinRequest: SigninRequest):void{

    console.log("aici")

    this.http.post<SigninResponse>(this.url,signinRequest).subscribe((response) =>{

      console.log('post successful:', response)
    })
  }
}
