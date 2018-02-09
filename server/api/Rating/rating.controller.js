/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/ratings              ->  index
 * POST    /api/ratings              ->  create
 * GET     /api/ratings/:id          ->  show
 * PUT     /api/ratings/:id          ->  update
 * DELETE  /api/ratings/:id          ->  destroy
 */

'use strict';

var Rating = require('./Rating.model');
var functions = require('../functions');

// Gets a list of Ratings
exports.index = function(req, res) {
  functions.index(req, res, Rating);
};

// Gets a single Rating from the DB
exports.show = function(req, res) {
  functions.show(req, res, Rating);
};

// Creates a new Rating in the DB
exports.create = function(req, res) {
  const body = {
    movieId: req.body.movieId,
    userId: req.user._id,
    rating: req.body.rating,
    description: req.body.description
  };
  delete req.body;
  req.body = body;
  functions.create(req, res, Rating);
};

// Updates an existing Rating in the DB
exports.update = function(req, res) {
  const body = {
    movieId: req.body.movieId,
    userId: req.body.userId._id,
    rating: req.body.rating,
    description: req.body.description
  };
  delete req.body;
  req.body = body;
  functions.update(req, res, Rating);
};

// Deletes a Rating from the DB
exports.destroy = function(req, res) {
  functions.destroy(req, res, Rating);
};
