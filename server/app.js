/**
 * Main application file
 */
'use strict';
// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.Promise = global.Promise;

mongoose.connection.on('error', function(err) {
  console.error(
    'MongoDB connection to <' + config.mongo.uri + '> failed: ' + err
  );
  process.exit(-1);
});

// Populate databases with sample data

if (config.seedDB == 'true') {
  require('./config/seed');
}

// Setup server
var app = express();

var server = require('http').createServer(app);

require('./config/express')(app);
require('./routes')(app);

// Start server
function startServer() {
  server.listen(config.port, config.ip, function() {
    console.log(
      'Express server listening on %s:%d, in %s mode',
      config.ip,
      config.port,
      app.get('env')
    );
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
