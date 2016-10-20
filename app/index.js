'use strict';

const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const path = require('path');
const apiV1 = require('./api/v1/controllers');
const env = process.env.NODE_ENV || 'development';
const _config = require('./config/_config.json')[env];

// db connect
mongoose.set('debug', _config.debug);
mongoose.Promise = global.Promise;
mongoose.connect(_config.database, (err) => {
  if (err) {
    console.error(err);
  }
});

if (_config.seed) {
  const seedsPath = path.join(__dirname, 'seeds');
  const mongooseHelper = require('./utils/mongooseHelper');
  mongooseHelper.dropCollections(mongoose);
  mongooseHelper.seedDatabase(seedsPath, mongoose);
}

const app = express();

if (_config.debug) {
  const morgan = require('morgan');
  app.use(morgan(':method :url :status :response-time'));
}

// Bootstrap application settings
require('./config/express')(app);

app.use('/v1', apiV1);

// error-handler settings
require('./config/error-handler')(app);

const port = process.env.VCAP_APP_PORT || 3000;

// *** server config *** //
const server = http.createServer(app);
server.listen(port, () => {
  console.log('listening at:', port);
});

module.exports = app;
