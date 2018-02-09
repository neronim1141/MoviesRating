import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../store';
import * as fromAuth from '../../Auth/store';
import { User } from '../models/user.model';
import { tap, take, filter } from 'rxjs/operators';
import { OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

export abstract class Sandbox implements OnDestroy {
  public loggedUser: any;
  public subscribers: Array<Subscription> = [];
  public logged: boolean;
  public logged$ = this.authState$.select(fromAuth.getLogged);

  constructor(
    protected appState$: Store<fromStore.AppState>,
    protected authState$: Store<fromAuth.AuthState>
  ) {
    this.subscribers.push(
      this.authState$
        .select(fromAuth.getLogged)
        .subscribe(logged => (this.logged = logged)),
      this.authState$
        .select(fromAuth.getLoggedUser)
        .subscribe(loggesuser => (this.loggedUser = loggesuser))
    );
  }

  routerBack() {
    this.appState$.dispatch(new fromStore.Back());
  }
  routerGo(path) {
    this.appState$.dispatch(new fromStore.Go(path));
  }
  logout() {
    this.authState$.dispatch(new fromAuth.LogOutUser('logout'));
  }
  ngOnDestroy() {
    for (let sub of this.subscribers) {
      sub.unsubscribe();
    }
  }
}
