import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders
} from '@angular/common/http';
import * as fromAuth from '../Auth/store';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token;
  constructor(private appStore$: Store<fromAuth.AuthState>) {
    setTimeout(() => {
      this.appStore$
        .select(fromAuth.getAuthToken)
        .subscribe(token => (this.token = token));
    }, 0);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.token) return next.handle(req);
    return next.handle(
      req.clone({
        setHeaders: {
          Authorization: this.token,
          'Content-Type': 'application/json'
        }
      })
    );
  }
}
