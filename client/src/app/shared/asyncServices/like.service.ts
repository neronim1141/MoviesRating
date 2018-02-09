import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { Movie } from '../models/movie.model';
import * as fromStore from '../store';
import { Store } from '@ngrx/store';
import { ConfigService } from '../../app-config.service';
@Injectable()
export class LikeService {
  api: string;
  constructor(private http: HttpClient, private config: ConfigService) {
    setTimeout(() => {
      this.api = this.config.get('api').baseUrl;
    }, 0);
  }

  like(payload: string): Observable<Movie[]> {
    return this.http
      .post<any>(this.api + `/likes/` + payload, {})
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}
