import { Action } from '@ngrx/store';
import { type } from '../../../shared/utility';
import { User } from '../../../shared/models/user.model';

export const AuthActionTypes = {
  LOGIN: type('[Auth] Log In'),
  LOGIN_FAIL: type('[Auth] Log In Fail'),
  LOGIN_SUCCESS: type('[Auth] Log In Success'),
  LOGOUT: type('[Auth] Log Out'),
  LOGOUT_FAIL: type('[Auth] Log Out Fail'),
  LOGOUT_SUCCESS: type('[Auth] Log Out Success'),
  REGISTER: type('[Auth] Register'),
  REGISTER_FAIL: type('[Auth] Register Fail'),
  REGISTER_SUCCESS: type('[Auth] Register Success'),
  LIKE: type('[Like] like'),
  LIKE_SUCCESS: type('[Like] Success'),
  LIKE_FAIL: type('[Like] Fail')
};

/**
 * Settings Actions
 */

export class LogInUser implements Action {
  type = AuthActionTypes.LOGIN;

  constructor(public payload: any) {}
}
export class LogInUserFail implements Action {
  type = AuthActionTypes.LOGIN_FAIL;

  constructor(public payload: any) {}
}
export class LogInUserSuccess implements Action {
  type = AuthActionTypes.LOGIN_SUCCESS;

  constructor(public payload: User) {}
}

export class LogOutUser implements Action {
  type = AuthActionTypes.LOGOUT;

  constructor(public payload: any) {}
}

export class LogOutUserFail implements Action {
  type = AuthActionTypes.LOGOUT_FAIL;

  constructor(public payload: any) {}
}

export class LogOutUserSuccess implements Action {
  type = AuthActionTypes.LOGOUT_SUCCESS;

  constructor(public payload: any) {}
}

export class RegisterUser implements Action {
  type = AuthActionTypes.REGISTER;

  constructor(public payload: any) {}
}
export class RegisterUserFail implements Action {
  type = AuthActionTypes.REGISTER_FAIL;

  constructor(public payload: any) {}
}

export class RegisterUserSuccess implements Action {
  type = AuthActionTypes.REGISTER_SUCCESS;

  constructor(public payload: any) {}
}
export class Like implements Action {
  type = AuthActionTypes.LIKE;

  constructor(public payload: any) {}
}
export class LikeFail implements Action {
  type = AuthActionTypes.LIKE_FAIL;

  constructor(public payload: any) {}
}

export class LikeSuccess implements Action {
  type = AuthActionTypes.LIKE_SUCCESS;
  constructor(public payload: any) {}
}
export type AuthActions =
  | LogInUser
  | LogInUserFail
  | LogInUserSuccess
  | LogOutUser
  | LogOutUserFail
  | LogOutUserSuccess
  | RegisterUser
  | RegisterUserFail
  | RegisterUserSuccess
  | Like
  | LikeFail
  | LikeSuccess;
