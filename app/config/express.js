'use strict';

// Module dependencies
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const _config = require('./../config/_config.json')[env];


module.exports = (app) => {

  // db connect
  mongoose.set('debug', _config.debug);
  mongoose.Promise = global.Promise;
  mongoose.connect(_config.database, (err) => {
    if (err) {
      console.error(err);
    }
  });

  if (_config.seed) {
    const seedsPath = path.join(__dirname, '../seeds');
    const mongooseHelper = require('./../utils/mongooseHelper');
    mongooseHelper.dropCollections(mongoose, (err) => {
      if (err) {
        console.error(err);
      }
    });
    mongooseHelper.seedDatabase(seedsPath, mongoose, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }

  // Configure Express
  app.use(bodyParser.urlencoded({extended: true, limit: '5mb'}));
  app.use(bodyParser.json({limit: '5mb'}));

  if (_config.debug) {
    const morgan = require('morgan');
    app.use(morgan(':method :url :status :response-time'));
  }

};
