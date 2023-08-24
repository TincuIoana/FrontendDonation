import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUrl:string = "http://localhost:8080/users/all";
  putUrl:string = "http://localhost:8080/users/update";
  // private getOneUserUrl:string  = "http://localhost:8080/users";
  private postUrl = "http://localhost:8080/users/new"
  userList$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  // user$: BehaviorSubject<User> = new BehaviorSubject<User>({});


  getUsers(): Observable<User[]> {
    // const header = {
    //   headers: new HttpHeaders()
    //
    //     .set("Authorization", sessionStorage.getItem("token")?? '')
    // }
    return this.http.get<User[]>(this.getUrl).pipe(
      tap(users => this.userList$.next(users)),
      catchError((error) => {
        window.alert(error);
        return throwError(() => error);
      })
    );
  }

  // loadUserById(id: number): Observable<User> {
  //   // console.log(`${this.getOneUserUrl}/${id}`);
  //   return this.http.get<User>(`${this.getOneUserUrl}/${id}`).pipe(
  //     tap(user => this.user$.next(user))
  //   )
  // }
  updateUser(user:User):Observable<any> {
    return this.http.put<User>(`${this.putUrl}/${user.id}`, user);
  }

  createUser(user:User):Observable<any> {
    return this.http.post<User>(this.postUrl, user);
  }

  constructor(
    private http: HttpClient
  ) { }
}
