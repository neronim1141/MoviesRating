import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromUser from '../reducers/auth.reducer';

export const getUserState = createSelector(
  fromFeature.getAuthState,
  (state: fromFeature.AuthState) => state.user
);
export const getLoggedUser = createSelector(
  getUserState,
  fromUser.getLoggedUser
);
export const getAuthToken = createSelector(getUserState, fromUser.getAuthToken);

export const getLogged = createSelector(getUserState, fromUser.getLogged);

export const getLikes = createSelector(getUserState, fromUser.getLikes);

export const getError = createSelector(getUserState, user => {
  return user.error;
});
