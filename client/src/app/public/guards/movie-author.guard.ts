import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { switchMap, catchError, tap, take } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromAuth from '../../Auth/store';
import * as sharedStore from '../../shared/store';
import * as moviesStore from '../../public/store';

@Injectable()
export class MovieGuardIsAuthor implements CanActivate, OnDestroy {
  user;
  subscriprions: Array<Subscription> = [];
  constructor(
    private authStore: Store<fromAuth.AuthState>,
    private moviesStore: Store<moviesStore.PublicState>,
    private sharedStore: Store<sharedStore.AppState>
  ) {
    this.subscriprions.push(
      this.authStore
        .select(fromAuth.getLoggedUser)
        .subscribe(user => (this.user = user))
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore(route, this.user).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(route: ActivatedRouteSnapshot, user) {
    return this.moviesStore.select(moviesStore.getMoviesEntities).pipe(
      tap(movies => {
        const id = movies[route.params.MovieId]['userId']._id;
        console.log(id);
        if (user._id != id && user.role != 'admin') {
          this.sharedStore.dispatch(
            new sharedStore.Go({
              path: ['/forbidden']
            })
          );
          throw 'error';
        }
      }),
      take(1)
    );
  }
  ngOnDestroy() {
    for (let sub of this.subscriprions) {
      sub.unsubscribe();
    }
  }
}
