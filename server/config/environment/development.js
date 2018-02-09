'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: process.env.MONGODB_DB_URL || 'mongodb://localhost/movie-site'
  },
  seedDB: process.env.PUPULATE_DB || 'true'
};
