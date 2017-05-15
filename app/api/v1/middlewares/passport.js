'use strict'

const daoUser = require('./../dao/user')
const daoGroups = require('./../dao/group')

const errorHelper = require('./../../../utils/errorHelper')
const passportUtil = require('./../../../utils/passport')

module.exports.checkAuthToken = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    return next(errorHelper.forbidden())
  }
  return passportUtil.extractAuthToken(token)
    .then((decoded) => {
      if (!decoded || !decoded.userId) {
        throw errorHelper.forbidden()
      }
      return daoUser.findOne(decoded.userId)
    })
    .then((user) => {
      if (user === null) {
        throw errorHelper.forbidden()
      }
      return daoGroups.findAll({ids: user.groups})
        .then((groups) => {
          groups.forEach((group) => {
            user.permissions.concat(group.permissions)
          })
          return user
        })
    })
    .then((user) => {
      res.locals.user = user
      return next()
    })
    .catch((err) => {
      return next(err)
    })
}
