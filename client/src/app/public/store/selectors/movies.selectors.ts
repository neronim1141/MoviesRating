import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../shared/store';
import * as fromFeature from '../reducers';
import * as fromMovies from '../reducers/movies.reducer';

import { Movie } from '../../../shared/models/movie.model';

export const getMovieState = createSelector(
  fromFeature.getPublicState,
  (state: fromFeature.PublicState) => state.movies
);

export const getMoviesEntities = createSelector(
  getMovieState,
  fromMovies.getMoviesEntities
);

export const getSelectedMovie = createSelector(
  getMoviesEntities,
  fromRoot.getRouterState,
  (entities, router): Movie => {
    return router.state && entities[router.state.params.MovieId];
  }
);

export const getAllMovies = createSelector(getMoviesEntities, entities => {
  return Object.keys(entities).map(_id => entities[_id]);
});

export const getMoviesLoaded = createSelector(
  getMovieState,
  fromMovies.getMoviesLoaded
);
export const getMoviesLoading = createSelector(
  getMovieState,
  fromMovies.getMoviesLoading
);
export const getPage = createSelector(getMovieState, fromMovies.getPage);
export const getSize = createSelector(getMovieState, fromMovies.getSize);
export const getPageSize = createSelector(
  getMovieState,
  fromMovies.getPageSize
);
