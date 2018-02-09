import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromLanguage from '../reducers/language.reducer';

export const getLanguageState = (state: fromFeature.AppState) => state.language;

export const getSelectedLanguage = createSelector(
  getLanguageState,
  fromLanguage.getSelectedLanguage
);
export const getSelectedCulture = createSelector(
  getLanguageState,
  fromLanguage.getSelectedCulture
);
export const getAvailableLanguages = createSelector(
  getLanguageState,
  fromLanguage.getAvailableLanguages
);
