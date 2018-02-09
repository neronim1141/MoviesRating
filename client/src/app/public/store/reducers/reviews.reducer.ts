import * as fromReviews from '../actions/Reviews.action';

export interface ReviewsState {}

export const initialState: ReviewsState = {};

export function reducer(
  state = initialState,
  action: fromReviews.ReviewsAction
): ReviewsState {
  return state;
}
