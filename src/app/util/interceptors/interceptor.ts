import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {LoginService} from "../../login/login.service";

@Injectable()
export class Interceptor implements HttpInterceptor{
  constructor(
    private loginService: LoginService
  ) {
  }
  intercept(request : HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>{
    request = request.clone({

        headers : request.headers.set("Authorization" , sessionStorage.getItem("token")?? "")   //aici numele tokenului}
      })
    return next.handle(request)
  }
}
