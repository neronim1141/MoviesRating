import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Sandbox } from '../../../shared/sandbox/base.sandbox';
import { Store } from '@ngrx/store';
import * as sharedStore from '../../../shared/store';
import * as featureStore from '../../store';
import * as fromAuth from '../../../Auth/store';

@Injectable()
export class HomeSandbox extends Sandbox {
  movies$ = this.appState$.select(featureStore.getAllMovies);
  moviesPage$ = this.appState$.select(featureStore.getPage);
  moviesPageSize$ = this.appState$.select(featureStore.getPageSize);
  moviesSize$ = this.appState$.select(featureStore.getSize);
  likes$ = this.appState$.select(fromAuth.getLikes);
  constructor(
    protected appState$: Store<sharedStore.AppState>,
    protected authState$: Store<fromAuth.AuthState>
  ) {
    super(appState$, authState$);
  }
  like(id) {
    if (this.logged) {
      this.authState$.dispatch(new fromAuth.Like(id));
    }
  }
  changePage(paginator) {
    this.appState$.dispatch(
      new featureStore.ChangePaginator({
        page: paginator.pageIndex,
        pageSize: paginator.pageSize
      })
    );
  }
}
