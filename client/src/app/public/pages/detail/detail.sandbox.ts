import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Sandbox } from '../../../shared/sandbox/base.sandbox';
import { Store } from '@ngrx/store';
import * as sharedStore from '../../../shared/store';
import * as featureStore from '../../store';
import * as fromAuth from '../../../Auth/store';

@Injectable()
export class DetailSandbox extends Sandbox {
  movie$ = this.appState$.select(featureStore.getSelectedMovie);
  likes$ = this.appState$.select(fromAuth.getLikes);

  constructor(
    protected appState$: Store<sharedStore.AppState>,
    protected authState$: Store<fromAuth.AuthState>
  ) {
    super(appState$, authState$);
  }
  remove(_id: string) {
    this.appState$.dispatch(new featureStore.RemoveMovie(_id));
  }
  like(id) {
    if (this.logged) {
      this.authState$.dispatch(new fromAuth.Like(id));
    }
  }
  addRating(data) {
    console.log('rat');
    this.appState$.dispatch(new featureStore.CreateRating(data));
  }
  editRating(data) {
    this.appState$.dispatch(new featureStore.UpdateRating(data));
  }
  removeRating(data) {
    this.appState$.dispatch(new featureStore.RemoveRating(data));
  }
  addReview(data) {
    console.log('rev');

    this.appState$.dispatch(new featureStore.CreateReview(data));
  }
  editReview(data) {
    this.appState$.dispatch(new featureStore.UpdateReview(data));
  }
  removeReview(data) {
    this.appState$.dispatch(new featureStore.RemoveReview(data));
  }
}
