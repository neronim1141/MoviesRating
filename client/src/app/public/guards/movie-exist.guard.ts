import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';
import * as fromStore from '../store';

import { Movie } from '../../shared/models/movie.model';

@Injectable()
export class MovieExistsGuards implements CanActivate {
  constructor(private store: Store<fromStore.PublicState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const id = route.params.MovieId;
    return this.checkStore(id).pipe(
      switchMap(() => {
        return this.hasMovie(id);
      })
    );
  }

  hasMovie(id: string): Observable<boolean> {
    return this.store
      .select(fromStore.getMoviesEntities)
      .pipe(
        map((entities: { [key: number]: Movie }) => !!entities[id]),
        take(1)
      );
  }

  checkStore(id): Observable<boolean> {
    return this.store.select(fromStore.getMoviesLoaded).pipe(
      tap(loaded => {
        this.store.dispatch(new fromStore.LoadMovie(id));
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
