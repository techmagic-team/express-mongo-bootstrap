'use strict';

const express = require('express'),
  app = express(),
  api = require('./api/api');

// Bootstrap application settings
require('./config/express')(app);

app.use('/v1', api);

// error-handler settings
require('./config/error-handler')(app);

const port = process.env.VCAP_APP_PORT || 3000;
app.listen(port);
console.log('listening at:', port);
