/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Movies = require('../api/Movie/movie.model');
var user;
User.find({})
  .remove()
  .then(function() {
    console.log('finished deleting Users');
    return User.create(
      {
        login: 'test',
        email: 'test@test.com',
        password: 'test',
        role: 'user'
      },
      {
        login: 'Admin',
        email: 'admin@admin.com',
        password: 'admin',
        role: 'admin'
      }
    );
  })
  .then(users => {
    console.log('finished populating Users');
    user = users;

    return Movies.find({}).remove();
  })
  .then(() => {
    return Movies.create({
      userId: user._id,
      title: 'Hello'
    });
  })
  .then(function() {
    console.log('Finished populating Movies');
  })
  .then(null, function(err) {
    console.error('Error populating Movies: ', err);
  });
