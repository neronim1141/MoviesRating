import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import * as fromAuth from './auth.reducer';

export interface AuthState {
  user: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<AuthState> = {
  user: fromAuth.reducer
};
export const getAuthState = createFeatureSelector<AuthState>('auth');
