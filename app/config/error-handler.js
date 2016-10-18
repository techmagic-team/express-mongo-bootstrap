'use strict';

module.exports = (app) => {

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('NOT_FOUND');
    err.code = 404;
    err.message = 'NOT_FOUND';
    next(err);
  });

  // error handler
  app.use((err, req, res, next) => {
    const error = {
      code: err.code || 500,
      error: err.error || err.message
    };
    res.status(error.code).json(error);
  });

};
