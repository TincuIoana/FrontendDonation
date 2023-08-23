import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../user-administration/models/user";
import {BehaviorSubject, Observable} from "rxjs";
import {LoginResponse} from "../login/LoginResponse";

@Injectable({
  providedIn: 'root'
})
export class ChangeService {

  url: string ="http://localhost:8080/users/update"

  updateUser(user: User) {

     this.http.put(this.url+'/'+user.id, user).subscribe(log=>console.log('user updated'));
  }

  constructor(private http:HttpClient) { }
}
