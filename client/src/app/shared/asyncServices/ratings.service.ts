import * as fromStore from '../store';
import { Store } from '@ngrx/store';
import { ConfigService } from '../../app-config.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { Rating } from '../models/rating.model';
@Injectable()
export class RatingsService {
  api: string;
  constructor(private http: HttpClient, private config: ConfigService) {
    this.api = config.get('api').baseUrl;
  }

  createRating(payload: Rating): Observable<Rating> {
    console.log(payload);
    return this.http
      .post<Rating>(this.api + `/ratings`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  updateRating(payload: Rating): Observable<Rating> {
    console.log(payload);
    return this.http
      .put<Rating>(this.api + `/ratings/${payload._id}`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  removeRating(payload: any): Observable<Rating> {
    return this.http
      .delete<any>(this.api + `/ratings/${payload._id}`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}
