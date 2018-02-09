import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Sandbox } from '../../shared/sandbox/base.sandbox';
import { Store } from '@ngrx/store';
import * as sharedStore from '../../shared/store';
import * as fromAuth from '../../Auth/store';

@Injectable()
export class LogInSandbox extends Sandbox {
  error;
  constructor(
    protected appState$: Store<sharedStore.AppState>,
    protected authState$: Store<fromAuth.AuthState>
  ) {
    super(appState$, authState$);
    this.subscribers.push(
      this.authState$
        .select(fromAuth.getError)
        .subscribe(error => (this.error = error))
    );
  }

  logIn(loginData) {
    this.appState$.dispatch(new fromAuth.LogInUser(loginData));
  }
  cancel() {
    this.appState$.dispatch(new sharedStore.Back());
  }
}
