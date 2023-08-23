import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LoginRequest } from "./LoginRequest";
import { LoginResponse } from "./LoginResponse";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = "http://localhost:8080/auth/login";

  // Initialize the BehaviorSubject with false
  private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // Expose the BehaviorSubject as an Observable
  public isLoggedIn: Observable<boolean> = this._isLoggedIn.asObservable();

  // @ts-ignore
  loginResponse: BehaviorSubject<LoginResponse> = new BehaviorSubject<LoginResponse>([]);

  constructor(private http: HttpClient) {
    if (localStorage.getItem('token'))
      this._isLoggedIn.next(true)
  }

  login(loginRequest: LoginRequest): void {
    console.log("aici");

    this.http.post<LoginResponse>(this.url, loginRequest).subscribe(loginResponse => {
      localStorage.setItem("token", loginResponse.accessToken);
      localStorage.setItem("id", String(loginResponse.id));

      // Emit true to the BehaviorSubject to indicate the user is logged in
      this._isLoggedIn.next(true);

      console.log(loginResponse.accessToken);
    });
  }

}
