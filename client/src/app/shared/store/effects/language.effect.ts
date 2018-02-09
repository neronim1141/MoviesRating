import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';
import * as store from '../index';
import * as LanguageActions from '../actions/language.action';
import { TranslateService } from '@ngx-translate/core';

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application. StateUpdates is an observable of the latest state and
 * dispatched action. The `toPayload` helper function returns just
 * the payload of the currently dispatched action, useful in
 * instances where the current state is not necessary.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class LanguageEffects {
  constructor(
    private actions$: Actions,
    private appState$: Store<store.AppState>,
    private translate: TranslateService
  ) {}

  @Effect({ dispatch: false })
  $getSelectedLanguage: Observable<Action> = this.actions$
    .ofType(LanguageActions.LanguageActionTypes.SET_LANGUAGE)
    .map((action: LanguageActions.SetLanguageAction) => action.payload)
    .switchMap(state => {
      return this.translate.use(state['code']);
    });
}
