import { Action } from '@ngrx/store';
import { type } from '../../utility';

export const LanguageActionTypes = {
  SET_LANGUAGE: type('[Settings] SetLanguage'),
  SET_CULTURE: type('[Settings] SetCulture')
};

/**
 * Settings Actions
 */
export class SetLanguageAction implements Action {
  type = LanguageActionTypes.SET_LANGUAGE;

  constructor(public payload: string) {}
}

export class SetCultureAction implements Action {
  type = LanguageActionTypes.SET_CULTURE;

  constructor(public payload: string) {}
}

export type LanguageActions = SetLanguageAction | SetCultureAction;
