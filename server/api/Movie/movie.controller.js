/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/movies              ->  index
 * POST    /api/movies              ->  create
 * GET     /api/movies/:id          ->  show
 * PUT     /api/movies/:id          ->  update
 * DELETE  /api/movies/:id          ->  destroy
 */

'use strict';

var Movie = require('./movie.model');
var functions = require('../functions');

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      Movie.count({}, function(err, count) {
        if (err) {
          functions.handleError(err);
        }
        res.status(statusCode).json({ count: count, movies: entity });
      });
    }
  };
}
function responseWithResultDetail(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      Movie.count({}, function(err, count) {
        if (err) {
          functions.handleError(err);
        }
        res.status(statusCode).json(entity.detail);
      });
    }
  };
}
// Gets a list of Movies
exports.index = function(req, res) {
  var pageSize = parseInt(req.query.pageSize) || 10,
    page = Math.max(0, req.query.page);
  var sort = req.query.sortBy || 'creationTime';

  Movie.find()
    .populate('userId')
    .sort({ sort: 1 })
    .limit(pageSize)
    .skip(pageSize * page)
    .execAsync()
    .then(responseWithResult(res))
    .catch(functions.handleError(res));
};

// Gets a single Movie from the DB
exports.show = function(req, res) {
  Movie.findById(req.params.id)
    .populate(`userId`)
    .populate({
      path: 'reviews',
      model: 'Review',
      populate: {
        path: 'userId',
        model: 'User'
      }
    })
    .populate({
      path: 'ratings',
      model: 'Rating',
      populate: {
        path: 'userId',
        model: 'User'
      }
    })
    .then(functions.handleEntityNotFound(res))
    .then(responseWithResultDetail(res))
    .catch(functions.handleError(res));
};

// Creates a new Movie in the DB
exports.create = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  if (req.body.ratingCount) {
    delete req.body.ratingCount;
  }
  if (req.body.ratingSum) {
    delete req.body.ratingSum;
  }
  if (req.body.ratingSum) {
    delete req.body.likesCount;
  }
  req.body.userId = req.user._id;
  functions.create(req, res, Movie);
};

// Updates an existing Movie in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  if (req.body.ratingCount) {
    delete req.body.ratingCount;
  }
  if (req.body.ratingSum) {
    delete req.body.ratingSum;
  }
  if (req.body.ratingSum) {
    delete req.body.likesCount;
  }
  req.body.userId = req.user._id;
  Movie.findByIdAsync(req.params.id)
    .then(functions.handleEntityNotFound(res))
    .then(functions.saveUpdates(req.body))
    .then(functions.responseWithResult(res))
    .catch(functions.handleError(res));
};

// Deletes a Movie from the DB
exports.destroy = function(req, res) {
  functions.destroy(req, res, Movie);
};

exports.search = function(req, res) {
  var title = req.param('title');
  Movie.find({ title: new RegExp(title, 'i') })
    .execAsync()
    .then(functions.responseWithResult(res))
    .catch(functions.handleError(res));
};
