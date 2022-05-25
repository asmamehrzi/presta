import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpClient
} from '@angular/common/http';

import {catchError, Observable, switchMap, throwError} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
static accessToken='';
 refresh=false;
  constructor(private http :HttpClient) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${AuthInterceptor.accessToken}`
      }
    } ) ; 
    
    console.log(req)

    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 403 || err.status===401) {
          
        return this.http.get('http://localhost:8080/users/refreshToken')
        .pipe(switchMap((res: any) => {
          AuthInterceptor.accessToken = res.token;

          return next.handle(request.clone({
            setHeaders: {
              Authorization: `Bearer ${AuthInterceptor.accessToken}`
            }
          } ) ) ;
        } )
      ) ;
    }
      
      return throwError(() => err);
    })) ;
  }
  }

