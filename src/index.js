'use strict';

const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const apiV1 = require('./api/v1');
const env = process.env.NODE_ENV || 'development';
const _config = require('./config/_config.json')[env];

const app = express();

// db connect
mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect(_config.database, (err) => {
  if (err) {
    console.error(err);
  }
});

if (1) {
  require('./utils/drop_collections')(mongoose);
  const modelsPath = __dirname + '/models';
  const seedsPath = __dirname + '/seeds';
  const imports = require('./utils/mongodb-import-seed');
  imports.f(modelsPath, seedsPath);
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
