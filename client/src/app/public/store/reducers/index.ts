import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromMovies from './movies.reducer';
import * as fromRatings from './ratings.reducer';
import * as fromReviews from './reviews.reducer';

export interface PublicState {
  movies: fromMovies.MovieState;
  ratings: fromRatings.RatingsState;
  reviews: fromReviews.ReviewsState;
}
export const reducers: ActionReducerMap<PublicState> = {
  movies: fromMovies.reducer,
  ratings: fromRatings.reducer,
  reviews: fromReviews.reducer
};

export const getPublicState = createFeatureSelector<PublicState>('public');
