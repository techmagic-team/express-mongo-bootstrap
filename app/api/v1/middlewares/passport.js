'use strict';

const daoUser = require('./../dao/user');

const errorHelper = require('./../../../utils/errorHelper');
const passportUtil = require('./../../../utils/passport');

module.exports.checkAuthToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next(errorHelper.forbidden());
  }
  return passportUtil.extractAuthToken(token)
    .then((decoded) => {
      if (!decoded || !decoded.userId) {
        throw errorHelper.forbidden();
      }
      return daoUser.findOne(decoded.userId);
    })
    .then((user) => {
      if (user === null) {
        throw errorHelper.forbidden();
      }
      res.locals.user = user;
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};
