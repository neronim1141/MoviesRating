import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as store from '../store';
import * as sharedStore from '../../shared/store';
import * as moviesStore from '../../public/store';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Injectable()
export class AuthGuardIsLogged implements CanActivate {
  constructor(private store: Store<store.AuthState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(store.getLogged).pipe(
      tap(logged => {
        if (!logged) {
          this.store.dispatch(
            new sharedStore.Go({
              path: ['/forbidden']
            })
          );
          throw !logged;
        }
      }),
      filter(logged => logged),
      take(1)
    );
  }
}

@Injectable()
export class AuthGuardNotLogged implements CanActivate {
  constructor(private store: Store<store.AuthState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(store.getLogged).pipe(
      tap(logged => {
        if (logged) {
          this.store.dispatch(
            new sharedStore.Go({
              path: ['/forbidden']
            })
          );
          throw logged;
        }
      }),
      filter(logged => !logged),
      take(1)
    );
  }
}
