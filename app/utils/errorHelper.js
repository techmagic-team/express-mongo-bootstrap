'use strict';

const env = process.env.NODE_ENV || 'development';
const _config = require('../config/_config.json')[env];

module.exports.serverError = (err) => {
  if (_config.debug && err) console.error(err);
  const error = new Error('SERVER_ERROR');
  error.code = 500;
  return error;
};

module.exports.notFound = (err) => {
  if (_config.debug && err) console.error(err);
  const error = new Error('NOT_FOUND');
  error.code = 404;
  return error;
};

module.exports.badRequest = (err) => {
  if (_config.debug && err) console.error(err);
  const error = new Error('BAD_REQUEST');
  error.code = 400;
  return error;
};
