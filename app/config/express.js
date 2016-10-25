'use strict';

// Module dependencies
const bodyParser = require('body-parser');
const env = process.env.NODE_ENV || 'development';
const _config = require('./../config/_config.json')[env];


module.exports = (app) => {
  // Configure Express
  app.use(bodyParser.urlencoded({extended: true, limit: '5mb'}));
  app.use(bodyParser.json({limit: '5mb'}));

  if (_config.debug) {
    const morgan = require('morgan');
    app.use(morgan(':method :url :status :response-time'));
  }
};
