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

import * as ReviewsActions from '../actions/reviews.action';
import * as fromServices from '../../../shared/asyncServices/reviews.service';
import { Store, Action } from '@ngrx/store';

@Injectable()
export class ReviewsEffects {
  constructor(
    private actions$: Actions,
    private featureStore$: Store<fromFeature.PublicState>,
    private ReviewService: fromServices.ReviewsService
  ) {}

  @Effect()
  createReview$ = this.actions$
    .ofType(ReviewsActions.ReviewsActionTypes.CREATE)
    .pipe(
      map((action: ReviewsActions.CreateReview) => action.payload),
      switchMap(Review => {
        return this.ReviewService.createReview(Review).pipe(
          map(Review => new ReviewsActions.CreateReviewSuccess(Review)),
          catchError(error => of(new ReviewsActions.CreateReviewFail(error)))
        );
      })
    );

  @Effect()
  updateReview$ = this.actions$
    .ofType(ReviewsActions.ReviewsActionTypes.UPDATE)
    .pipe(
      map((action: ReviewsActions.UpdateReview) => action.payload),
      switchMap(Review => {
        return this.ReviewService.updateReview(Review).pipe(
          map(Review => new ReviewsActions.UpdateReviewSuccess(Review)),
          catchError(error => of(new ReviewsActions.UpdateReviewFail(error)))
        );
      })
    );

  @Effect()
  removeReview$ = this.actions$
    .ofType(ReviewsActions.ReviewsActionTypes.REMOVE)
    .pipe(
      map((action: ReviewsActions.RemoveReview) => action.payload),
      switchMap(Review => {
        return this.ReviewService.removeReview(Review).pipe(
          map(() => new ReviewsActions.RemoveReviewSuccess(Review)),
          catchError(error => of(new ReviewsActions.RemoveReviewFail(error)))
        );
      })
    );

  @Effect()
  handleSuccess$ = this.actions$
    .ofType(
      ReviewsActions.ReviewsActionTypes.REMOVE_SUCCESS,
      ReviewsActions.ReviewsActionTypes.CREATE_SUCCESS,
      ReviewsActions.ReviewsActionTypes.UPDATE_SUCCESS
    )
    .pipe(
      map(
        (
          action:
            | ReviewsActions.RemoveReviewSuccess
            | ReviewsActions.CreateReviewSuccess
            | ReviewsActions.UpdateReviewSuccess
        ) => action.payload
      ),
      map(Review => {
        return new fromFeatureAction.LoadMovie(Review.movieId);
      })
    );
}
