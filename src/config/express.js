'use strict';

// Module dependencies
const bodyParser = require('body-parser');

module.exports = function (app) {

  // Configure Express
  app.use(bodyParser.urlencoded({extended: true, limit: '5mb'}));
  app.use(bodyParser.json({limit: '5mb'}));

  // Only loaded when SECURE_EXPRESS is `true`

  if (process.env.SECURE_EXPRESS)
    require('./security')(app);

};
