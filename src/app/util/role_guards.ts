import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {LoginService} from "../login/login.service";

@Injectable()
export class Role_guards implements CanActivate {
  constructor(
    private loginService: LoginService
  ) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const userPermissions: Array<string> = this.loginService.getLoggedUserPermissions();
    console.log(this.loginService.getLoggedUserPermissions());

    const receivedPermissions = route.data['permissions'] as Array<string>

    console.log(receivedPermissions)

// Check if any userPermission matches with receivedPermissions
    const hasMatchingPermission = userPermissions.some(userPermission =>
      receivedPermissions.includes(userPermission)
    );

    if (hasMatchingPermission) {
      return true; // If a match is found, allow access
    } else {
      console.log("Permission not found");
      return false; // If no matching permissions are found, deny access
    }


  }
}
