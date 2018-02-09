import * as fromMovies from '../actions/movies.action';
import { Movie } from '../../../shared/models/movie.model';

export interface MovieState {
  entities: { [_id: string]: Movie };
  size: number;
  page: number;
  pageSize: number;
  loaded: boolean;
  loading: boolean;
}

export const initialState: MovieState = {
  entities: {},
  size: null,
  page: 0,
  pageSize: 10,
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromMovies.MoviesAction
): MovieState {
  switch (action.type) {
    case fromMovies.MoviesActionTypes.LOAD_SINGLE:
    case fromMovies.MoviesActionTypes.LOAD: {
      return {
        ...state,
        loading: true
      };
    }
    case fromMovies.MoviesActionTypes.LOAD_SUCCESS: {
      const Movies = action['payload'].movies;
      const size = action['payload'].count;

      const entities = Movies.reduce(
        (entities: { [_id: string]: Movie }, Movie: Movie) => {
          return {
            ...entities,
            [Movie._id]: Movie
          };
        },
        {
          ...[]
        }
      );
      return {
        ...state,
        loading: false,
        loaded: true,
        entities,
        size: size
      };
    }
    case fromMovies.MoviesActionTypes.LOAD_SINGLE_SUCCESS: {
      const Movie = action['payload'];

      const entities = {
        ...state.entities,
        [Movie._id]: Movie
      };

      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }
    case fromMovies.MoviesActionTypes.CHANGE_PAGINATOR: {
      return {
        ...state,
        page: action['payload'].page,
        pageSize: action['payload'].pageSize
      };
    }
    case fromMovies.MoviesActionTypes.LOAD_SINGLE_FAIL:
    case fromMovies.MoviesActionTypes.LOAD_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
        page: initialState.page,
        pageSize: initialState.pageSize,
        size: 0
      };
    }

    case fromMovies.MoviesActionTypes.UPDATE_SUCCESS:
    case fromMovies.MoviesActionTypes.CREATE_SUCCESS: {
      const movie = action['payload'];
      const entities = {
        ...state.entities,
        [movie._id]: movie
      };

      return {
        ...state,
        entities
      };
    }

    case fromMovies.MoviesActionTypes.REMOVE_SUCCESS: {
      const movie = action['payload'];
      const { [movie._id]: removed, ...entities } = state.entities;

      return {
        ...state,
        entities
      };
    }
    case fromMovies.MoviesActionTypes.ADD_LIKE: {
      const movie = action['payload'];
      const newMovie = {
        ...state.entities[movie],
        likesCount: state.entities[movie].likesCount + 1
      };
      const entities = {
        ...state.entities,
        [newMovie._id]: newMovie
      };

      return {
        ...state,
        entities
      };
    }
    case fromMovies.MoviesActionTypes.REMOVE_LIKE: {
      const movie = action['payload'];
      const newMovie = {
        ...state.entities[movie],
        likesCount: state.entities[movie].likesCount - 1
      };
      const entities = {
        ...state.entities,
        [newMovie._id]: newMovie
      };

      return {
        ...state,
        entities
      };
    }
  }

  return state;
}

export const getMoviesEntities = (state: MovieState) => state.entities;
export const getMoviesLoading = (state: MovieState) => state.loading;
export const getMoviesLoaded = (state: MovieState) => state.loaded;
export const getPage = (state: MovieState) => state.page;
export const getPageSize = (state: MovieState) => state.pageSize;
export const getSize = (state: MovieState) => state.size;
