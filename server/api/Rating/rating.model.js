'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
const Movie = require('../Movie/movie.model');

var Schema = mongoose.Schema;

var RatingSchema = new Schema({
  movieId: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  creationTime: {
    type: Date,
    default: Date.now()
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
    min: 1,
    max: 10,
    set: function(rating) {
      this._previousRating = this.rating;
      return rating;
    }
  },
  description: {
    type: String
  }
}).index({ movieId: 1, userId: 1 }, { unique: true });

RatingSchema.post('save', function(doc) {
  var previousRating = this._previousRating;
  let count = this._previousRating == 0 ? 1 : 0;
  console.log(count);
  Movie.findOneAndUpdate(
    { _id: doc.movieId },
    { $inc: { ratingCount: count, ratingSum: doc.rating - previousRating } }
  ).exec();
});
RatingSchema.post('remove', function(doc) {
  console.log(doc.rating);
  Movie.findOneAndUpdate(
    { _id: doc.movieId },
    { $inc: { ratingCount: -1, ratingSum: -doc.rating } }
  ).exec();
});

exports.RatingSchema = RatingSchema;
module.exports = mongoose.model('Rating', RatingSchema, 'Rating');
