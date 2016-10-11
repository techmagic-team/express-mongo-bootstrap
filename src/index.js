'use strict';

const express = require('express');
const http = require('http');
const apiV1 = require('./api/v1');

const app = express();

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
