import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Sandbox } from '../../shared/sandbox/base.sandbox';
import { Store } from '@ngrx/store';
import * as sharedStore from '../../shared/store';
import { Back } from '../../shared/store';
import * as fromAuth from '../../Auth/store';

@Injectable()
export class RegisterSandbox extends Sandbox {
  constructor(
    protected appState$: Store<sharedStore.AppState>,
    protected authState$: Store<fromAuth.AuthState>
  ) {
    super(appState$, authState$);
  }

  register(formData) {
    this.appState$.dispatch(new fromAuth.RegisterUser(formData));
  }
  cancel() {
    this.appState$.dispatch(new sharedStore.Back());
  }
}
