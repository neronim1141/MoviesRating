import * as fromStore from '../store';
import { Store } from '@ngrx/store';
import { ConfigService } from '../../app-config.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { Review } from '../models/Review.model';
@Injectable()
export class ReviewsService {
  api: string;
  constructor(private http: HttpClient, private config: ConfigService) {
    this.api = config.get('api').baseUrl;
  }

  createReview(payload: Review): Observable<Review> {
    return this.http
      .post<Review>(this.api + `/reviews`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  updateReview(payload: Review): Observable<Review> {
    return this.http
      .put<Review>(this.api + `/reviews/${payload._id}`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  removeReview(payload: any): Observable<Review> {
    return this.http
      .delete<any>(this.api + `/reviews/${payload._id}`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}
