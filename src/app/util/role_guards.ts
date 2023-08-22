import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";

@Injectable()
export class Role_guards implements CanActivate{
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const storedRoles   = localStorage.getItem("roles")
    const userRoles: Array<string> = storedRoles ? JSON.parse(storedRoles) : [];

    const receivedRole = route.data['roles'] as Array<string>

    console.log(userRoles)
    console.log(receivedRole)


    return !!userRoles.find(userRole => receivedRole.includes(userRole));
  }



}
