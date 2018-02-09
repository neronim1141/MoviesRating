/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {
  // Insert routes below

  app.use('/api/movies', require('./api/Movie'));
  app.use('/api/reviews', require('./api/Review'));
  app.use('/api/ratings', require('./api/Rating'));
  app.use('/api/likes', require('./api/Like'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app
    .route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);
  // All other routes should redirect to the index.html
  app.route('/*').get(errors[404]);
};
