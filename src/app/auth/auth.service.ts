import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false;

  setLoggedIn(value: boolean) {
    this.loggedIn = value;
  }

  isLoggedin() {
    console.log("in service:",this.loggedIn)
    return this.loggedIn;
  }
}
