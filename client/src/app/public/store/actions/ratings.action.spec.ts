import * as fromRatings from './ratings.action';

describe('Ratings Actions', () => {
  describe('CreateRating Actions', () => {
    describe('CreateRating', () => {
      it('should create an action', () => {
        const payload = {
          movieId: 'sdfsdfdsdfs',
          userId: 'dfsdfws',
          rating: 2,
          description: 'i dont like that'
        };
        const action = new fromRatings.CreateRating(payload);

        expect({ ...action }).toEqual({
          type: fromRatings.RatingsActionTypes.CREATE,
          payload
        });
      });
    });

    describe('CreateRatingFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Create Error' };
        const action = new fromRatings.CreateRatingFail(payload);

        expect({ ...action }).toEqual({
          type: fromRatings.RatingsActionTypes.CREATE_FAIL,
          payload
        });
      });
    });

    describe('CreateRatingSuccess', () => {
      it('should create an action', () => {
        const payload = {
          movieId: 'sdfsdfdsdfs',
          userId: 'dfsdfws',
          rating: 2,
          description: 'i dont like that'
        };
        const action = new fromRatings.CreateRatingSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromRatings.RatingsActionTypes.CREATE_SUCCESS,
          payload
        });
      });
    });
  });

  describe('UpdateRating Actions', () => {
    describe('UpdateRating', () => {
      it('should create an action', () => {
        const payload = {
          movieId: 'sdfsdfdsdfs',
          userId: 'dfsdfws',
          rating: 2,
          description: 'i dont like that'
        };
        const action = new fromRatings.UpdateRating(payload);

        expect({ ...action }).toEqual({
          type: fromRatings.RatingsActionTypes.UPDATE,
          payload
        });
      });
    });

    describe('UpdateRatingFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Update Error' };
        const action = new fromRatings.UpdateRatingFail(payload);

        expect({ ...action }).toEqual({
          type: fromRatings.RatingsActionTypes.UPDATE_FAIL,
          payload
        });
      });
    });

    describe('UpdateRatingSuccess', () => {
      it('should create an action', () => {
        const payload = {
          movieId: 'sdfsdfdsdfs',
          userId: 'dfsdfws',
          rating: 2,
          description: 'i dont like that'
        };
        const action = new fromRatings.UpdateRatingSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromRatings.RatingsActionTypes.UPDATE_SUCCESS,
          payload
        });
      });
    });
  });

  describe('RemoveRating Actions', () => {
    describe('RemoveRating', () => {
      it('should create an action', () => {
        const payload = 'fdsdfsdfs';
        const action = new fromRatings.RemoveRating(payload);

        expect({ ...action }).toEqual({
          type: fromRatings.RatingsActionTypes.REMOVE,
          payload
        });
      });
    });

    describe('RemoveRatingFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Remove Error' };
        const action = new fromRatings.RemoveRatingFail(payload);

        expect({ ...action }).toEqual({
          type: fromRatings.RatingsActionTypes.REMOVE_FAIL,
          payload
        });
      });
    });

    describe('RemoveRatingSuccess', () => {
      it('should create an action', () => {
        const payload = {
          movieId: 'sdfsdfdsdfs',
          userId: 'dfsdfws',
          rating: 2,
          description: 'i dont like that'
        };
        const action = new fromRatings.RemoveRatingSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromRatings.RatingsActionTypes.REMOVE_SUCCESS,
          payload
        });
      });
    });
  });
});
