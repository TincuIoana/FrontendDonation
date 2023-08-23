import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";

@Injectable()
export class Role_guards implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const storedPermissions = localStorage.getItem("permissions")
    const userPermissions: Array<string> = storedPermissions ? JSON.parse(storedPermissions) : [];

    const receivedPermissions = route.data['permissions'] as Array<string>

    console.log(storedPermissions)
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
