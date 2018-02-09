import * as fromLanguage from '../actions/language.action';

export interface LanguageState {
  selectedLanguage: any;
  selectedCulture: string;
  availableLanguages: Array<any>;
}

const INITIAL_STATE: LanguageState = {
  selectedLanguage: {
    code: 'pl',
    name: 'PL',
    culture: 'pl-PL'
  },
  selectedCulture: '',
  availableLanguages: [
    {
      code: 'pl',
      name: 'PL',
      culture: 'pl-PL'
    },
    {
      code: 'en',
      name: 'EN',
      culture: 'en-EN'
    }
  ]
};

export function reducer(
  state = INITIAL_STATE,
  action: fromLanguage.LanguageActions
): LanguageState {
  switch (action.type) {
    case fromLanguage.LanguageActionTypes.SET_LANGUAGE: {
      return { ...state, selectedLanguage: action.payload };
    }

    case fromLanguage.LanguageActionTypes.SET_CULTURE: {
      return { ...state, selectedCulture: action.payload };
    }

    default: {
      return state;
    }
  }
}

export const getSelectedLanguage = (state: LanguageState) =>
  state.selectedLanguage;
export const getSelectedCulture = (state: LanguageState) =>
  state.selectedCulture;
export const getAvailableLanguages = (state: LanguageState) =>
  state.availableLanguages;
