import * as fromAuth from '../actions/auth.action';
import { User } from '../../../shared/models/user.model';
import { Like } from '../../../shared/models/like.model';
import { Rating } from '../../../shared/models/rating.model';

export interface AuthState {
  user: User;
  token: string;
  logged: boolean;
  loading: boolean;
  error: any;
  likes: { [id: number]: Like };
}

const INITIAL_STATE: AuthState = {
  user: null,
  token: null,
  logged: false,
  loading: false,
  error: null,
  likes: {}
};

export function reducer(
  state = INITIAL_STATE,
  action: fromAuth.AuthActions
): AuthState {
  switch (action.type) {
    case fromAuth.AuthActionTypes.LOGIN:
    case fromAuth.AuthActionTypes.REGISTER:
    case fromAuth.AuthActionTypes.LOGOUT: {
      return { ...state, loading: true, logged: false };
    }
    case fromAuth.AuthActionTypes.LOGIN_SUCCESS: {
      const likes = action.payload.user.likes;
      const ratings = action.payload.user.ratings;
      const reviews = action.payload.user.reviews;
      const likesEntities = likes.reduce(
        (likesEntities: { [id: number]: Like }, like: Like) => {
          return {
            ...likesEntities,
            [like.movieId]: like
          };
        },
        {
          ...state.likes
        }
      );
      const user = {
        _id: action.payload.user._id,
        login: action.payload.user.login,
        email: action.payload.user.email,
        role: action.payload.user.role
      };
      return {
        ...state,
        loading: false,
        logged: true,
        user: user,
        error: null,
        token: action.payload.token,
        likes: likesEntities
      };
    }
    case fromAuth.AuthActionTypes.LIKE_SUCCESS: {
      var likes = state.likes;

      if (likes[action.payload]) {
        var { [action.payload]: removed, ...likes } = state.likes;
      } else {
        likes = {
          ...state.likes,
          [action.payload]: {
            movieId: action.payload,
            userId: state.user._id
          }
        };
      }

      return {
        ...state,
        loading: false,
        logged: true,
        error: null,
        likes: likes
      };
    }
    case fromAuth.AuthActionTypes.LOGOUT_SUCCESS: {
      return INITIAL_STATE;
    }
    case fromAuth.AuthActionTypes.REGISTER_SUCCESS: {
      return {
        ...state,
        loading: false,
        logged: true,
        error: null,
        user: action.payload.user,
        token: action.payload.token
      };
    }
    case fromAuth.AuthActionTypes.LOGIN_FAIL:
    case fromAuth.AuthActionTypes.LOGOUT_FAIL:
    case fromAuth.AuthActionTypes.REGISTER_FAIL: {
      return { ...state, ...INITIAL_STATE, error: action.payload.error };
    }
    default: {
      return state;
    }
  }
}
export const getLoggedUser = (state: AuthState) => state.user;
export const getLikes = (state: AuthState) => state.likes;
export const getAuthToken = (state: AuthState) => state.token;
export const getLoading = (state: AuthState) => state.loading;
export const getLogged = (state: AuthState) => state.logged;
export const getError = (state: AuthState) => state.error;
