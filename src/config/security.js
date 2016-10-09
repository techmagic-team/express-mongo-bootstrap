'use strict';

// security.js
var secure     = require('express-secure-only'),
  rateLimit    = require('express-rate-limit'),
  helmet       = require('helmet'),
  morgan       = require('morgan'),
  fs           = require('fs');

module.exports = function (app) {

  // 0. setup the logger
  var logStream = fs.createWriteStream(__dirname + '/../../access.log', {flags: 'a'});
  app.use('/v1/', morgan('combined', {stream: logStream}));
  // 1. redirects http to https
  app.use(secure());

  // 2. helmet with defaults
  app.use(helmet());

  // 3. rate limiting
  var limiter = rateLimit({
    windowMs: 30 * 1000, // seconds
    delayMs: 0,
    max: 6,
    message: JSON.stringify({
      error:'Too many requests, please try again in 30 seconds.',
      code: 429
    }),
  });
  app.use('/v1/', limiter);
};
