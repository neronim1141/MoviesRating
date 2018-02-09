import * as fromRatings from '../actions/ratings.action';

export interface RatingsState {}

export const initialState: RatingsState = {};

export function reducer(
  state = initialState,
  action: fromRatings.RatingsAction
): RatingsState {
  return state;
}
