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

import * as ratingsActions from '../actions/ratings.action';
import * as fromServices from '../../../shared/asyncServices/ratings.service';
import { Store, Action } from '@ngrx/store';

@Injectable()
export class RatingsEffects {
  constructor(
    private actions$: Actions,
    private featureStore$: Store<fromFeature.PublicState>,
    private RatingService: fromServices.RatingsService
  ) {}

  @Effect()
  createRating$ = this.actions$
    .ofType(ratingsActions.RatingsActionTypes.CREATE)
    .pipe(
      map((action: ratingsActions.CreateRating) => action.payload),
      switchMap(Rating => {
        return this.RatingService.createRating(Rating).pipe(
          map(Rating => new ratingsActions.CreateRatingSuccess(Rating)),
          catchError(error => of(new ratingsActions.CreateRatingFail(error)))
        );
      })
    );

  @Effect()
  updateRating$ = this.actions$
    .ofType(ratingsActions.RatingsActionTypes.UPDATE)
    .pipe(
      map((action: ratingsActions.UpdateRating) => action.payload),
      switchMap(Rating => {
        return this.RatingService.updateRating(Rating).pipe(
          map(Rating => new ratingsActions.UpdateRatingSuccess(Rating)),
          catchError(error => of(new ratingsActions.UpdateRatingFail(error)))
        );
      })
    );

  @Effect()
  removeRating$ = this.actions$
    .ofType(ratingsActions.RatingsActionTypes.REMOVE)
    .pipe(
      map((action: ratingsActions.RemoveRating) => action.payload),
      switchMap(Rating => {
        return this.RatingService.removeRating(Rating).pipe(
          map(() => new ratingsActions.RemoveRatingSuccess(Rating)),
          catchError(error => of(new ratingsActions.RemoveRatingFail(error)))
        );
      })
    );

  @Effect()
  handleSuccess$ = this.actions$
    .ofType(
      ratingsActions.RatingsActionTypes.REMOVE_SUCCESS,
      ratingsActions.RatingsActionTypes.CREATE_SUCCESS,
      ratingsActions.RatingsActionTypes.UPDATE_SUCCESS
    )
    .pipe(
      map(
        (
          action:
            | ratingsActions.RemoveRatingSuccess
            | ratingsActions.CreateRatingSuccess
            | ratingsActions.UpdateRatingSuccess
        ) => action.payload
      ),
      map(Rating => {
        return new fromFeatureAction.LoadMovie(Rating.movieId);
      })
    );
}
