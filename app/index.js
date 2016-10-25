'use strict';

const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const _config = require('./config/_config.json')[app.get('env')];
// Bootstrap application settings
require('./config/express')(app);

// Routing
app.use('/v1', require('./api/v1/controllers'));

// db connection and settings
const connection = require('./config/connection');
const mongoose = connection.getMongoose();

if (_config.seed) {
  const seedsPath = path.join(__dirname, 'seeds');
  const mongooseHelper = require('./utils/mongooseHelper');
  mongooseHelper.dropCollections(mongoose);
  mongooseHelper.seedDatabase(seedsPath, mongoose);
}

// error-handler settings
require('./config/error-handler')(app);

// log
if (_config.debug) {
  const morgan = require('morgan');
  app.use(morgan(':method :url :status :response-time'));
}

// create server
const port = process.env.VCAP_APP_PORT || 3000;
const server = http.createServer(app);
server.listen(port, () => {
  console.log('listening at:', port);
});

module.exports = app;
