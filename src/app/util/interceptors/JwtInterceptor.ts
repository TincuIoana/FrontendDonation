// jwt.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the JWT token from local storage or your authentication service.
    const jwtToken = sessionStorage.getItem("token");

    if (jwtToken) {
      // Clone the request and set the new header.
      request = request.clone({
        setHeaders: {
          Authorization: `${jwtToken}`
        }
      });
    }

    // Pass the modified request to the next handler in the chain.
    return next.handle(request);
  }
}
