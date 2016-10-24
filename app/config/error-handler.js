'use strict';

const errorHelper = require('./../utils/errorHelper');

module.exports = (app) => {

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = errorHelper.notFound('Not Found');
    return next(err);
  });

  // error handler
  app.use((err, req, res, next) => {
    const error = {
      code: err.code || 500,
      error: err.error || err.message,
      message: err.message || err.error
    };
    res.status(error.code).json(error);
  });

};
