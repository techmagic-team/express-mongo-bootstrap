'use strict';

// Module dependencies
const bodyParser = require('body-parser');
const express = require('express');

module.exports = (app) => {
  // Configure Express
  app.use(bodyParser.urlencoded({extended: true, limit: '5mb'}));
  app.use(bodyParser.json({limit: '5mb'}));
  app.use('/apidoc', express.static('apidoc'));
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
  });
};
