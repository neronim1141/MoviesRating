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
import * as authActions from '../actions/auth.action';
import * as sharedStore from '../../../shared/store';
import * as moviesStore from '../../../public/store';

import { User } from '../../../shared/models/user.model';
import { AuthService } from '../../../shared/asyncServices/auth.service';
import { map } from 'rxjs/operators';
import { LikeService } from '../../../shared/asyncServices/like.service';

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
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private likeService: LikeService,
    private appState$: Store<store.AuthState>
  ) {}

  /**
   * Login effect
   */
  @Effect()
  doLogin$: Observable<Action> = this.actions$
    .ofType(authActions.AuthActionTypes.LOGIN)
    .map((action: authActions.LogInUser) => action.payload)
    .switchMap(state => {
      return this.authService
        .logIn(state)
        .map(user => new authActions.LogInUserSuccess(user))
        .catch(error => {
          console.log(JSON.stringify(error.error));
          return of(new authActions.LogInUserFail(error.error));
        });
    });
  /**
   * Registers effect
   */
  @Effect()
  doRegister$: Observable<Action> = this.actions$
    .ofType(authActions.AuthActionTypes.REGISTER)
    .map((action: authActions.RegisterUser) => action.payload)
    .switchMap(state => {
      return this.authService
        .register(state)
        .map(user => new authActions.RegisterUserSuccess(user))
        .catch(error => of(new authActions.RegisterUserFail(error)));
    });
  @Effect()
  doLike$: Observable<Action> = this.actions$
    .ofType(authActions.AuthActionTypes.LIKE)
    .map((action: authActions.Like) => action.payload)
    .switchMap(state => {
      return this.likeService
        .like(state)
        .switchMap(user => {
          let action;
          if (user['status'] == 'added')
            action = new moviesStore.AddLike(state);
          else action = new moviesStore.RemoveLike(state);

          return [new authActions.LikeSuccess(state), action];
        })
        .catch(error => of(new authActions.LikeFail(error)));
    });

  @Effect()
  successHandler$: Observable<Action> = this.actions$
    .ofType(
      authActions.AuthActionTypes.LOGIN_SUCCESS,
      authActions.AuthActionTypes.REGISTER_SUCCESS
    )
    .pipe(
      map(success => {
        return new sharedStore.Go({
          path: ['/']
        });
      })
    );
}
