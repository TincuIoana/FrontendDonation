import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInSubject = new BehaviorSubject<boolean>(false);

  setLoggedIn(value: boolean) {
    this.loggedInSubject.next(value);
  }

  isLoggedin() {
    console.log("in service:",this.loggedInSubject)
    return this.loggedInSubject.asObservable();
  }

  getUserRoles(): Observable<string[]>{
    const storedRoles   = localStorage.getItem("roles")
    const userRoles: Array<string> = storedRoles ? JSON.parse(storedRoles) : [];
    return of(userRoles)
  }
}
