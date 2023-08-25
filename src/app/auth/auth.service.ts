import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {LoginService} from "../login/login.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private loginService: LoginService
  ) {
  }

  private loggedInSubject = new BehaviorSubject<boolean>(false);

  setLoggedIn(value: boolean) {
    this.loggedInSubject.next(value);
  }

  isLoggedin() {
    console.log("in service:",this.loggedInSubject)
    return this.loggedInSubject.asObservable();
  }

  getUserPermissions(): Observable<string[]>{
    const userPermissions = this.loginService.getLoggedUserPermissions()
    return of(userPermissions)
  }
}
