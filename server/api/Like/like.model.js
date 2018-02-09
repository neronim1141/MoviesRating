'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
const Movie = require('../Movie/movie.model');
var Schema = mongoose.Schema;

var LikeSchema = new Schema({
  movieId: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}).index({ movieId: 1, userId: 1 }, { unique: true });

LikeSchema.pre('save', function(next) {
  Movie.findOneAndUpdate(
    { _id: this.movieId },
    { $inc: { likesCount: 1 } }
  ).exec();
  next();
});
LikeSchema.pre('remove', function(next) {
  Movie.findOneAndUpdate(
    { _id: this.movieId },
    { $inc: { likesCount: -1 } }
  ).exec();
  next();
});
exports.LikeSchema = LikeSchema;
module.exports = mongoose.model('Like', LikeSchema, 'Like');
