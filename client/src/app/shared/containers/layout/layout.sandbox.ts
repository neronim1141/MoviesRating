import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromAuth from '../../../Auth/store';
import * as languageActions from '../../store/actions/language.action';
import * as layoutActions from '../../store/actions/layout.action';
import { TranslateService } from '@ngx-translate/core';
import { Sandbox } from '../../sandbox/base.sandbox';

@Injectable()
export class LayoutSandbox extends Sandbox {
  public $selectedLang = this.appState$.select(fromStore.getSelectedLanguage);
  public $availableLanguages = this.appState$.select(
    fromStore.getAvailableLanguages
  );
  public $showSidenav = this.appState$.select(fromStore.getShowSidenav);
  constructor(
    protected appState$: Store<fromStore.AppState>,
    protected authState$: Store<fromAuth.AuthState>,
    private translateService: TranslateService,
    private router: Router
  ) {
    super(appState$, authState$);
  }

  public selectLanguage(lang: any): void {
    this.appState$.dispatch(new languageActions.SetLanguageAction(lang));
    this.appState$.dispatch(new languageActions.SetCultureAction(lang.culture));
  }
  public toggleSidenav(opened: boolean) {
    this.appState$.dispatch(new layoutActions.ToggleSidenav(opened));
  }
}
