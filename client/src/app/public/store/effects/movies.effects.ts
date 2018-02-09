import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import {
  withLatestFrom,
  map,
  switchMap,
  catchError,
  take
} from 'rxjs/operators';

import * as fromRoot from '../../../shared/store';
import * as fromFeature from '../reducers';
import * as fromFeatureSelect from '../selectors';
import * as fromFeatureAction from '../actions';

import * as movieActions from '../actions/movies.action';
import * as fromServices from '../../../shared/asyncServices/movies.service';
import { Store, Action } from '@ngrx/store';

@Injectable()
export class MoviesEffects {
  constructor(
    private actions$: Actions,
    private featureStore$: Store<fromFeature.PublicState>,
    private movieService: fromServices.MoviesService
  ) {}

  @Effect()
  loadmovies$ = this.actions$.ofType(movieActions.MoviesActionTypes.LOAD).pipe(
    withLatestFrom(this.featureStore$.select(fromFeatureSelect.getPageSize)),
    withLatestFrom(
      this.featureStore$.select(fromFeatureSelect.getPage),
      ([action, pageSize], page) => {
        return { action, page, pageSize };
      }
    ),
    switchMap(obj => {
      return this.movieService
        .getMovies(obj.page, obj.pageSize)
        .pipe(
          map(movies => new movieActions.LoadMoviesSuccess(movies)),
          catchError(error => of(new movieActions.LoadMoviesFail(error)))
        );
    })
  );
  @Effect()
  loadmovie$ = this.actions$
    .ofType(movieActions.MoviesActionTypes.LOAD_SINGLE)
    .pipe(
      map((action: movieActions.LoadMovie) => action.payload),
      switchMap(payload => {
        return this.movieService
          .getMovie(payload)
          .pipe(
            take(1),
            map(movie => new movieActions.LoadMovieSuccess(movie)),
            catchError(error => of(new movieActions.LoadMovieFail(error)))
          );
      })
    );
  @Effect()
  paginator$ = this.actions$
    .ofType(movieActions.MoviesActionTypes.CHANGE_PAGINATOR)
    .pipe(
      map(() => {
        return new movieActions.LoadMovies();
      })
    );
  @Effect()
  createmovie$ = this.actions$
    .ofType(movieActions.MoviesActionTypes.CREATE)
    .pipe(
      map((action: movieActions.CreateMovie) => action.payload),
      switchMap(movie => {
        return this.movieService
          .createMovie(movie)
          .pipe(
            map(movie => new movieActions.CreateMovieSuccess(movie)),
            catchError(error => of(new movieActions.CreateMovieFail(error)))
          );
      })
    );

  @Effect()
  createmovieSuccess$ = this.actions$
    .ofType(
      movieActions.MoviesActionTypes.CREATE_SUCCESS,
      movieActions.MoviesActionTypes.UPDATE_SUCCESS
    )
    .pipe(
      map(
        (
          action:
            | movieActions.CreateMovieSuccess
            | movieActions.UpdateMovieSuccess
        ) => action.payload
      ),
      map(movie => {
        return new fromRoot.Go({
          path: ['/movie', movie._id]
        });
      })
    );

  @Effect()
  updatemovie$ = this.actions$
    .ofType(movieActions.MoviesActionTypes.UPDATE)
    .pipe(
      map((action: movieActions.UpdateMovie) => action.payload),
      switchMap(movie => {
        return this.movieService
          .updateMovie(movie)
          .pipe(
            map(movie => new movieActions.UpdateMovieSuccess(movie)),
            catchError(error => of(new movieActions.UpdateMovieFail(error)))
          );
      })
    );

  @Effect()
  removemovie$ = this.actions$
    .ofType(movieActions.MoviesActionTypes.REMOVE)
    .pipe(
      map((action: movieActions.RemoveMovie) => action.payload),
      switchMap(movie => {
        return this.movieService
          .removeMovie(movie)
          .pipe(
            map(() => new movieActions.RemoveMovieSuccess(movie)),
            catchError(error => of(new movieActions.RemoveMovieFail(error)))
          );
      })
    );

  @Effect()
  handlemovieSuccess$ = this.actions$
    .ofType(movieActions.MoviesActionTypes.REMOVE_SUCCESS)
    .pipe(
      map(movie => {
        return new fromRoot.Go({
          path: ['/']
        });
      })
    );
}
