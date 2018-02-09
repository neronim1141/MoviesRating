import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Sandbox } from '../../../shared/sandbox/base.sandbox';
import { Store } from '@ngrx/store';
import * as sharedStore from '../../../shared/store';
import * as featureStore from '../../store';
import * as fromAuth from '../../../Auth/store';

@Injectable()
export class CreateSandbox extends Sandbox {
  movie$ = this.appState$.select(featureStore.getSelectedMovie);
  constructor(
    protected appState$: Store<sharedStore.AppState>,
    protected authState$: Store<fromAuth.AuthState>
  ) {
    super(appState$, authState$);
  }
  create(form) {
    this.appState$.dispatch(new featureStore.CreateMovie(form));
  }
}
