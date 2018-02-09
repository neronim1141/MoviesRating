import { Action } from '@ngrx/store';

import { Rating } from '../../../shared/models/Rating.model';
import { type } from '../../../shared/utility/index';

export const RatingsActionTypes = {
  CREATE: type('[Rating] Create '),
  CREATE_FAIL: type('[Rating] Create  Fail'),
  CREATE_SUCCESS: type('[Rating] Create Success'),
  UPDATE: type('[Rating] Update '),
  UPDATE_FAIL: type('[Rating] Update  Fail'),
  UPDATE_SUCCESS: type('[Rating] Update Success'),
  REMOVE: type('[Rating] Remove '),
  REMOVE_FAIL: type('[Rating] Remove  Fail'),
  REMOVE_SUCCESS: type('[Rating] Remove Success')
};

export class CreateRating implements Action {
  readonly type = RatingsActionTypes.CREATE;
  constructor(public payload: Rating) {}
}

export class CreateRatingFail implements Action {
  readonly type = RatingsActionTypes.CREATE_FAIL;
  constructor(public payload: any) {}
}

export class CreateRatingSuccess implements Action {
  readonly type = RatingsActionTypes.CREATE_SUCCESS;
  constructor(public payload: Rating) {}
}

export class UpdateRating implements Action {
  readonly type = RatingsActionTypes.UPDATE;
  constructor(public payload: Rating) {}
}

export class UpdateRatingFail implements Action {
  readonly type = RatingsActionTypes.UPDATE_FAIL;
  constructor(public payload: any) {}
}

export class UpdateRatingSuccess implements Action {
  readonly type = RatingsActionTypes.UPDATE_SUCCESS;
  constructor(public payload: Rating) {}
}

export class RemoveRating implements Action {
  readonly type = RatingsActionTypes.REMOVE;
  constructor(public payload: string) {}
}

export class RemoveRatingFail implements Action {
  readonly type = RatingsActionTypes.REMOVE_FAIL;
  constructor(public payload: any) {}
}

export class RemoveRatingSuccess implements Action {
  readonly type = RatingsActionTypes.REMOVE_SUCCESS;
  constructor(public payload: any) {}
}

// action types
export type RatingsAction =
  | CreateRating
  | CreateRatingFail
  | CreateRatingSuccess
  | UpdateRating
  | UpdateRatingFail
  | UpdateRatingSuccess
  | RemoveRating
  | RemoveRatingFail
  | RemoveRatingSuccess;
