'use strict';

exports.validationError = function(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json({ error: err });
  };
};

exports.handleError = function(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    console.log(err);
    res.status(statusCode).send({ error: err });
  };
};

exports.responseWithResult = function(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
};
exports.handleEntityNotFound = function(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).send({ error: 'Not Found' });
      return null;
    }
    return entity;
  };
};

exports.saveUpdates = function(updates) {
  return function(entity) {
    Object.assign(entity, updates);

    return entity.saveAsync().spread(function(entity) {
      return entity;
    });
  };
};

exports.removeEntity = function(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync().then(function() {
        res.status(204).end();
      });
    }
  };
};

exports.index = function(req, res, model) {
  model
    .find()
    .select('-__v')
    .sort({ creationTime: 1 })
    .execAsync()
    .then(this.responseWithResult(res))
    .catch(this.handleError(res));
};

exports.show = function(req, res, model) {
  model
    .findByIdAsync(req.params.id)
    .then(this.handleEntityNotFound(res))
    .then(this.responseWithResult(res))
    .catch(this.handleError(res));
};

// Creates a new Category in the DB
exports.create = function(req, res, model) {
  model
    .createAsync(req.body)
    .then(this.responseWithResult(res, 201))
    .catch(this.handleError(res));
};

// Updates an existing Category in the DB
exports.update = function(req, res, model) {
  if (req.body._id) {
    delete req.body._id;
  }
  model
    .findByIdAsync(req.params.id)
    .then(this.handleEntityNotFound(res))
    .then(this.saveUpdates(req.body))
    .then(this.responseWithResult(res))
    .catch(this.handleError(res));
};

// Deletes a Category from the DB
exports.destroy = function(req, res, model) {
  model
    .findByIdAsync(req.params.id)
    .then(this.handleEntityNotFound(res))
    .then(this.removeEntity(res))
    .catch(this.handleError(res));
};
