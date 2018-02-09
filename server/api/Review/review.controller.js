/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/review              ->  index
 * POST    /api/review              ->  create
 * GET     /api/review/:id          ->  show
 * PUT     /api/review/:id          ->  update
 * DELETE  /api/review/:id          ->  destroy
 */

'use strict';

var Review = require('./Review.model');
var functions = require('../functions');

// Gets a list of Ratings
exports.index = function(req, res) {
  functions.index(req, res, Review);
};

// Gets a single Rating from the DB
exports.show = function(req, res) {
  functions.show(req, res, Review);
};

// Creates a new Rating in the DB
exports.create = function(req, res) {
  const body = {
    movieId: req.body.movieId,
    userId: req.user._id,
    rating: req.body.rating,
    musicRating: req.body.musicRating,
    actorsRating: req.body.actorsRating,
    viewRating: req.body.viewRating,
    description: req.body.description
  };
  delete req.body;
  req.body = body;
  functions.create(req, res, Review);
};

// Updates an existing Rating in the DB
exports.update = function(req, res) {
  const body = {
    movieId: req.body.movieId,
    userId: req.body.userId._id,
    rating: req.body.rating,
    musicRating: req.body.musicRating,
    actorsRating: req.body.actorsRating,
    viewRating: req.body.viewRating,
    description: req.body.description
  };
  delete req.body;
  req.body = body;
  functions.update(req, res, Review);
};

// Deletes a Rating from the DB
exports.destroy = function(req, res) {
  functions.destroy(req, res, Review);
};
