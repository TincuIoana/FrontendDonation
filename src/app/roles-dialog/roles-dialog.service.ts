import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, tap, throwError} from 'rxjs';
import {Role} from "./role";
import {PermissionEnum} from "./permission-enum";
import { DynamicDialogModule } from 'primeng/dynamicdialog';

@Injectable({
  providedIn: 'root'
})
export class RolesDialogService {
  apiUrl: string ="http://localhost:8080/roles-dialog/all";
  roles$: BehaviorSubject<Role[]> = new BehaviorSubject<Role[]>([]);
  constructor(private http: HttpClient) {}

  loadRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl).pipe(
      tap(roles => this.roles$.next(roles)),
      catchError((error) => {
        window.alert(error);
        return throwError(() => error);
      })
    );
  }

  getRoles(): Observable<Role[]>{
    return this.roles$.asObservable();
  }

  updateRole(role:Role):Observable<Role>{
    return this.http.post<Role>(this.apiUrl+'/'+role.id,role);
  }
}
