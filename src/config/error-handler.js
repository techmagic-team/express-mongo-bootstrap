'use strict';

module.exports = function (app) {

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.code = 404;
    err.message = 'Not Found';
    next(err);
  });

  // error handler
  app.use(function (err, req, res, next) {
    let error = {
      code: err.code || 500,
      error: err.error || err.message
    };
    if (req.url && req.url.indexOf('/json') !== 0)
      console.log('error:', error, 'url:', req.url);

    res.status(error.code).json(error);
  });

};
