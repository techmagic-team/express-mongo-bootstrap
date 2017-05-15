'use strict'

const daoUser = require('./../dao/user')
const daoGroups = require('./../dao/group')

const errorHelper = require('./../../../utils/errorHelper')
const passportUtil = require('./../../../utils/passport')

module.exports.concatUserPermissions = (user) => {
  return daoGroups.findAll({ids: user.groups})
    .then((groups) => {
      groups.forEach((group) => {
        user.permissions = user.permissions.concat(group.permissions)
      })
      user.permissions = [...new Set(user.permissions)]
      return user
    })
    .catch((err) => {
      throw errorHelper.serverError(err)
    })
}

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
      return this.concatUserPermissions(user)
    })
    .then((user) => {
      console.log(user)
      res.locals.user = user
      return next()
    })
    .catch((err) => {
      return next(err)
    })
}
