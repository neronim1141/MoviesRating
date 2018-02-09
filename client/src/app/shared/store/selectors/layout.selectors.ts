import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromLayout from '../reducers/layout.reducer';

export const getLayoutState = (state: fromFeature.AppState) => state.layout;

export const getShowSidenav = createSelector(
  getLayoutState,
  fromLayout.getShowSidenav
);
