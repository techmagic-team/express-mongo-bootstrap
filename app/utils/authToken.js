'use strict';

const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const _config = require('../config/_config.json')[env];

module.exports.createAuthToken = (user, token) => {
  const tokenSecret = (token) ? token : _config.token;
  const tokenPayload = {
    userId: user.id
  };
  const expiresIn = 24 * 60 * 60;
  return jwt.sign(tokenPayload, tokenSecret, {expiresIn: expiresIn});
};

module.exports.extractAuthToken = (authToken, token) => {
  const tokenSecret = (token) ? token : _config.token;
  return new Promise((resolve, reject) => {
    return jwt.verify(authToken, tokenSecret, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
      return null;
    });
  });
};
