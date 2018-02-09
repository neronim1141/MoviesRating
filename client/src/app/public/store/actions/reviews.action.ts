import { Action } from '@ngrx/store';

import { Review } from '../../../shared/models/Review.model';
import { type } from '../../../shared/utility/index';

export const ReviewsActionTypes = {
  CREATE: type('[Review] Create '),
  CREATE_FAIL: type('[Review] Create  Fail'),
  CREATE_SUCCESS: type('[Review] Create Success'),
  UPDATE: type('[Review] Update '),
  UPDATE_FAIL: type('[Review] Update  Fail'),
  UPDATE_SUCCESS: type('[Review] Update Success'),
  REMOVE: type('[Review] Remove '),
  REMOVE_FAIL: type('[Review] Remove  Fail'),
  REMOVE_SUCCESS: type('[Review] Remove Success')
};

export class CreateReview implements Action {
  readonly type = ReviewsActionTypes.CREATE;
  constructor(public payload: Review) {}
}

export class CreateReviewFail implements Action {
  readonly type = ReviewsActionTypes.CREATE_FAIL;
  constructor(public payload: any) {}
}

export class CreateReviewSuccess implements Action {
  readonly type = ReviewsActionTypes.CREATE_SUCCESS;
  constructor(public payload: Review) {}
}

export class UpdateReview implements Action {
  readonly type = ReviewsActionTypes.UPDATE;
  constructor(public payload: Review) {}
}

export class UpdateReviewFail implements Action {
  readonly type = ReviewsActionTypes.UPDATE_FAIL;
  constructor(public payload: any) {}
}

export class UpdateReviewSuccess implements Action {
  readonly type = ReviewsActionTypes.UPDATE_SUCCESS;
  constructor(public payload: Review) {}
}

export class RemoveReview implements Action {
  readonly type = ReviewsActionTypes.REMOVE;
  constructor(public payload: string) {}
}

export class RemoveReviewFail implements Action {
  readonly type = ReviewsActionTypes.REMOVE_FAIL;
  constructor(public payload: any) {}
}

export class RemoveReviewSuccess implements Action {
  readonly type = ReviewsActionTypes.REMOVE_SUCCESS;
  constructor(public payload: any) {}
}

// action types
export type ReviewsAction =
  | CreateReview
  | CreateReviewFail
  | CreateReviewSuccess
  | UpdateReview
  | UpdateReviewFail
  | UpdateReviewSuccess
  | RemoveReview
  | RemoveReviewFail
  | RemoveReviewSuccess;
