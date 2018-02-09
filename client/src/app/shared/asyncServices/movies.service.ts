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
export class MoviesService {
  api: string;
  constructor(private http: HttpClient, private config: ConfigService) {
    this.api = config.get('api').baseUrl;
  }

  getMovies(page = 1, pageSize = 10): Observable<Movie[]> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http
      .get<Movie[]>(this.api + `/movies`, { params: params })
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  getMovie(payload: String): Observable<Movie> {
    return this.http
      .get<Movie>(this.api + `/movies/` + payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  createMovie(payload: Movie): Observable<Movie> {
    return this.http
      .post<Movie>(this.api + `/movies`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  updateMovie(payload: Movie): Observable<Movie> {
    return this.http
      .put<Movie>(this.api + `/movies/${payload._id}`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  removeMovie(payload: string): Observable<Movie> {
    return this.http
      .delete<any>(this.api + `/movies/${payload}`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}
