import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromStore from './shared/store';
import * as languageActions from './shared/store/actions/language.action';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from './app-config.service';

@Injectable()
export class AppSandbox {
  constructor(
    protected $appState: Store<fromStore.AppState>,
    private translate: TranslateService,
    private configService: ConfigService
  ) {}

  /**
   * Sets up default language for the application. Uses browser default language.
   */
  public setupLanguage(): void {
    const localization: any = this.configService.get('localization');
    const languages: Array<string> = localization.languages.map(
      lang => lang.code
    );
    const browserLang: string = this.translate.getBrowserLang();

    this.translate.addLangs(languages);
    this.translate.setDefaultLang(localization.defaultLanguage);

    const selectedLanguage = browserLang.match(/en|pl/)
      ? browserLang
      : localization.defaultLanguage;

    const selectedLang = localization.languages.filter(
      lang => lang.code === selectedLanguage
    )[0];

    this.$appState.dispatch(
      new languageActions.SetLanguageAction(selectedLang)
    );
  }
}
