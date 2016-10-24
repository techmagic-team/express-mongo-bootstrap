'use strict';

class projectError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'projectError';
    this.error = message;
  }
}

module.exports.serverError = (err) => {
  const error = new projectError('SERVER_ERROR');
  if (err) error.message = err;
  error.code = 500;
  return error;
};

module.exports.notFound = (err) => {
  const error = new projectError('NOT_FOUND');
  if (err) error.message = err;
  error.code = 404;
  return error;
};

module.exports.badRequest = (err) => {
  const error = new projectError('BAD_REQUEST');
  if (err) error.message = err;
  error.code = 400;
  return error;
};

module.exports.forbidden = (err) => {
  const error = new projectError('FORBIDDEN');
  if (err) error.message = err;
  error.code = 403;
  return error;
};
