import { Action } from '@ngrx/store';

import { Movie } from '../../../shared/models/movie.model';
import { type } from '../../../shared/utility/index';

export const MoviesActionTypes = {
  LOAD: type('[Movies] Load'),
  LOAD_FAIL: type('[Movies] Load Fail'),
  LOAD_SUCCESS: type('[Movies] Load Success'),
  LOAD_SINGLE: type('[Movie] Load '),
  LOAD_SINGLE_FAIL: type('[Movie] Load  Fail'),
  LOAD_SINGLE_SUCCESS: type('[Movie] Load Success'),
  CREATE: type('[Movie] Create '),
  CREATE_FAIL: type('[Movie] Create  Fail'),
  CREATE_SUCCESS: type('[Movie] Create Success'),
  UPDATE: type('[Movie] Update '),
  UPDATE_FAIL: type('[Movie] Update  Fail'),
  UPDATE_SUCCESS: type('[Movie] Update Success'),
  REMOVE: type('[Movie] Remove '),
  REMOVE_FAIL: type('[Movie] Remove  Fail'),
  REMOVE_SUCCESS: type('[Movie] Remove Success'),
  CHANGE_PAGINATOR: type('[Movies] Change Paginator'),
  ADD_LIKE: type('[Movie] Add Like'),
  REMOVE_LIKE: type('[Movie] Remove Like')
};

// load Movies
export class ChangePaginator implements Action {
  readonly type = MoviesActionTypes.CHANGE_PAGINATOR;
  constructor(public payload: any) {}
}

export class LoadMovies implements Action {
  readonly type = MoviesActionTypes.LOAD;
}

export class LoadMoviesFail implements Action {
  readonly type = MoviesActionTypes.LOAD_FAIL;
  constructor(public payload: any) {}
}

export class LoadMoviesSuccess implements Action {
  readonly type = MoviesActionTypes.LOAD_SUCCESS;
  constructor(public payload: Movie[]) {}
}
export class LoadMovie implements Action {
  readonly type = MoviesActionTypes.LOAD_SINGLE;

  constructor(public payload: any) {}
}

export class LoadMovieFail implements Action {
  readonly type = MoviesActionTypes.LOAD_SINGLE_FAIL;
  constructor(public payload: any) {}
}

export class LoadMovieSuccess implements Action {
  readonly type = MoviesActionTypes.LOAD_SINGLE_SUCCESS;
  constructor(public payload: Movie) {}
}
export class CreateMovie implements Action {
  readonly type = MoviesActionTypes.CREATE;
  constructor(public payload: Movie) {}
}

export class CreateMovieFail implements Action {
  readonly type = MoviesActionTypes.CREATE_FAIL;
  constructor(public payload: any) {}
}

export class CreateMovieSuccess implements Action {
  readonly type = MoviesActionTypes.CREATE_SUCCESS;
  constructor(public payload: Movie) {}
}

export class UpdateMovie implements Action {
  readonly type = MoviesActionTypes.UPDATE;
  constructor(public payload: Movie) {}
}

export class UpdateMovieFail implements Action {
  readonly type = MoviesActionTypes.UPDATE_FAIL;
  constructor(public payload: any) {}
}

export class UpdateMovieSuccess implements Action {
  readonly type = MoviesActionTypes.UPDATE_SUCCESS;
  constructor(public payload: Movie) {}
}

export class RemoveMovie implements Action {
  readonly type = MoviesActionTypes.REMOVE;
  constructor(public payload: string) {}
}

export class RemoveMovieFail implements Action {
  readonly type = MoviesActionTypes.REMOVE_FAIL;
  constructor(public payload: any) {}
}

export class RemoveMovieSuccess implements Action {
  readonly type = MoviesActionTypes.REMOVE_SUCCESS;
  constructor(public payload: any) {}
}
export class AddLike implements Action {
  readonly type = MoviesActionTypes.ADD_LIKE;
  constructor(public payload: string) {}
}
export class RemoveLike implements Action {
  readonly type = MoviesActionTypes.REMOVE_LIKE;
  constructor(public payload: string) {}
}
// action types
export type MoviesAction =
  | LoadMovies
  | LoadMoviesFail
  | LoadMoviesSuccess
  | LoadMovie
  | LoadMovieFail
  | LoadMovieSuccess
  | CreateMovie
  | CreateMovieFail
  | CreateMovieSuccess
  | UpdateMovie
  | UpdateMovieFail
  | UpdateMovieSuccess
  | RemoveMovie
  | RemoveMovieFail
  | RemoveMovieSuccess
  | ChangePaginator
  | AddLike
  | RemoveLike;
