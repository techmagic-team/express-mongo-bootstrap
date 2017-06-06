'use strict'

const daoUser = require('./../users/user.dao')
const daoGroups = require('./../groups/group.dao')

const errorHelper = require('../../../utils/errorHelper')
const passportUtil = require('../../../utils/passport')

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
      res.locals.user = user
      return next()
    })
    .catch((err) => {
      return next(err)
    })
}

module.exports.checkPermissions = (required) => {
  if (typeof required === 'string') required = [required]
  return (req, res, next) => {
    try {
      const user = res.locals.user
      if (!user) {
        throw errorHelper.serverError('User object was not found. Check your configuration.')
      }
      if (!user.permissions) {
        throw errorHelper.serverError('Could not find permissions for user. Bad configuration?')
      }
      if (!Array.isArray(required)) {
        throw errorHelper.serverError('Permissions should be an Array. Bad format?')
      }
      const sufficient = required.every(function (permission) {
        return user.permissions.indexOf(permission) !== -1
      })
      if (!sufficient) {
        return next(errorHelper.forbidden())
      }
      return next()
    } catch (err) {
      return next(err)
    }
  }
}
