import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "./LoginRequest";
import {LoginResponse} from "./LoginResponse";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // Initialize the BehaviorSubject with false
  private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  url: string ="http://localhost:8080/auth/login"
  // private loggedIn = false;

  // Expose the BehaviorSubject as an Observable
  public isLoggedIn: Observable<boolean> = this._isLoggedIn.asObservable();

  // @ts-ignore

  loginResponseSubject  = new BehaviorSubject<LoginResponse>([])
  loginResponse$: Observable<LoginResponse | null> = this.loginResponseSubject .asObservable();



  constructor(private http: HttpClient) {
    if (localStorage.getItem('token'))
      this._isLoggedIn.next(true)
  }

  login(loginRequest : LoginRequest):Observable<LoginResponse>{
   return  this.http.post<LoginResponse>(this.url,loginRequest)

  }
  setLoginResponse(loginResponse: LoginResponse) {
    this.loginResponseSubject.next(loginResponse);
  }

  logout(): void{
    this._isLoggedIn.next(false)
  }

  setLoggedIn(): void{
    this._isLoggedIn.next(true)
  }
}
