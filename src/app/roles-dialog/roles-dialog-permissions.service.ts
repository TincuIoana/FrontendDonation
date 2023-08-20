import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {PermissionEnum} from "./permission-enum";
import {HttpClient} from "@angular/common/http";
import {Role} from "./role";


@Injectable({
  providedIn: 'root'
})
export class RolesDialogPermissionsService {
  apiUrl: string = "http://localhost:8080/permissions/";
  permissions$: BehaviorSubject<PermissionEnum[]> = new BehaviorSubject<PermissionEnum[]>([]);
  permissionsOfARole$: BehaviorSubject<PermissionEnum[]> = new BehaviorSubject<PermissionEnum[]>([]);
  constructor(private http: HttpClient) { }

  loadPermissions() : Observable<PermissionEnum[]> {
    return this.http.get<PermissionEnum[]>(this.apiUrl+'all').pipe(
      tap(permissions => this.permissions$.next(permissions)),
      catchError((error) => {
        window.alert(error);
        return throwError(() => error);
      })
    );
  }

  loadPermissionsOfARole(roleId: number): Observable<PermissionEnum[]>{
    return this.http.get<PermissionEnum[]>(`http://localhost:8080/permissions/${roleId}/all`).pipe(
      tap(permissions => {
        this.permissionsOfARole$.next(permissions);
          console.log(this.permissionsOfARole$);
      }),
      catchError((error) => {
        window.alert(error);
        return throwError(() => error);
      })
    );
  }

  getAllPermissions(): Observable<PermissionEnum[]>{
    return this.http.get<PermissionEnum[]>(this.apiUrl + 'all');
  }

  getAllPermissionsOfARole(roleId: number): Observable<PermissionEnum[]> {
    return this.http.get<PermissionEnum[]>(this.apiUrl + `${roleId}/all`);
  }

  addPermissionToRole(userId: number,roleId: number,permission:PermissionEnum){
    this.http.post<PermissionEnum>(this.apiUrl+ `${roleId}/${userId}/add`,permission).subscribe(log=>console.log("added successfully"));
  }

  deletePermissionFromRole(userId: number,roleId: number,permission:PermissionEnum){
    this.http.delete<PermissionEnum>(this.apiUrl+ `${roleId}/${userId}/delete`).subscribe(log=>console.log("deleted successfully"));
  }
}
