import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { User } from '../models/user.model';
import { ConfigService } from '../../app-config.service';

@Injectable()
export class AuthService {
  api: string;
  constructor(private http: HttpClient, private config: ConfigService) {
    setTimeout(() => {
      this.api = this.config.get('api').baseUrl;
    }, 0);
  }
  logIn(payload): Observable<User> {
    return this.http
      .post<User>(this.api + '/auth', payload)
      .pipe(catchError((error: any) => Observable.throw(error)));
  }
  getProfile(): Observable<User> {
    return this.http
      .get<User>(this.api + '/users/me')
      .pipe(catchError((error: any) => Observable.throw(error)));
  }
  register(payload): Observable<User> {
    return this.http
      .post<User>(this.api + '/users/register', payload)
      .pipe(catchError((error: any) => Observable.throw(error)));
  }
}
