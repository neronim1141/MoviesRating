'use strict';

var Like = require('./like.model');
var functions = require('../functions');

// Creates/removes a new Like in the DB
exports.create = function(req, res) {
  let entity = { movieId: req.params.id, userId: req.user._id };
  console.log('test');

  Like.findOne(entity)
    .then((entity_, err) => {
      if (err) throw err;
      if (entity_) {
        entity_.remove(entity).catch(functions.handleError(res));
        res.status(200).send({ status: 'removed' });
      } else {
        Like.create(entity).catch(functions.handleError(res));
        res.status(200).send({ status: 'added' });
      }
    })
    .catch(functions.handleError(res));
};
