'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
const Movie = require('../Movie/movie.model');

var Schema = mongoose.Schema;

var RewiewSchema = new Schema({
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
  musicRating: {
    type: Number,
    required: true,
    default: 0,
    min: 1,
    max: 10
  },
  actorsRating: {
    type: Number,
    required: true,
    default: 0,
    min: 1,
    max: 10
  },
  viewRating: {
    type: Number,
    required: true,
    default: 0,
    min: 1,
    max: 10
  },

  description: {
    type: String,
    required: true
  }
}).index({ movieId: 1, userId: 1 }, { unique: true });

RewiewSchema.post('save', function(doc) {
  var previousRating = this._previousRating;
  let count = this._previousRating == 0 ? 1 : 0;
  console.log(count);
  Movie.findOneAndUpdate(
    { _id: doc.movieId },
    { $inc: { ratingCount: count, ratingSum: doc.rating - previousRating } }
  ).exec();
});
RewiewSchema.post('remove', function(doc) {
  Movie.findOneAndUpdate(
    { _id: doc.movieId },
    { $inc: { ratingCount: -1, ratingSum: -doc.rating } }
  ).exec();
});
exports.RewiewSchema = RewiewSchema;
module.exports = mongoose.model('Review', RewiewSchema, 'Review');
