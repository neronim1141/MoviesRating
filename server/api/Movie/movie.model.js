'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var MovieSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    creationTime: {
      type: Date,
      default: Date.now
    },
    likesCount: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    ratingSum: { type: Number, default: 0 },
    premiere: {
      type: Date
    },
    categories: [
      {
        type: String
      }
    ],
    description: {
      type: String
    }
  },
  {
    toObject: { virtuals: true },
    toJSON: {
      virtuals: true,
      transform: function(doc, ret) {
        ret = ret.preview;
        return ret;
      }
    }
  }
).index({
  title: 'text'
});

MovieSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'movieId'
});
MovieSchema.virtual('ratings', {
  ref: 'Rating',
  localField: '_id',
  foreignField: 'movieId'
});

MovieSchema.virtual('detail').get(function() {
  return {
    _id: this._id,
    title: this.title,
    userId: this.userId,
    creationTime: this.creationTime,
    premiere: this.premiere,
    categories: this.categories,
    reviews: this.reviews,
    ratings: this.ratings,
    likesCount: this.likesCount,
    ratingAvg: this.ratingSum / this.ratingCount,
    ratingSum: this.ratingSum,
    ratingCount: this.ratingCount,
    description: this.description
  };
});
MovieSchema.virtual('preview').get(function() {
  return {
    _id: this._id,
    title: this.title,
    userId: this.userId,
    description: this.description,
    likesCount: this.likesCount,
    ratingAvg: this.ratingSum / this.ratingCount
  };
});

exports.MovieSchema = MovieSchema;
module.exports = mongoose.model('Movie', MovieSchema, 'Movie');
