/**
 * Express configuration
 */

'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
// var methodOverride = require('method-override');
// var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');
var passport = require('passport');
var mongoose = require('mongoose');
var cors = require('cors');

module.exports = function(app) {
  var env = app.get('env');

  app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(passport.initialize());
  require('./passport')(passport);

  app.set('appPath', config.root);

  if ('development' === env) {
    app.use(morgan('dev'));
  }
};
