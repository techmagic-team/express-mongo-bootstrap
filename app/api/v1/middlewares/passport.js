'use strict'

const daoUser = require('../users/users.dao')
const daoGroups = require('../groups/groups.dao')

const errorHelper = require('../../../utils/errorHelper')
const passportUtil = require('../../../utils/passport')

module.exports.concatUserPermissions = async (user) => {
  try {
    const groups = await daoGroups.findAll({ids: user.groups})

    groups.forEach((group) => {
      user.permissions = user.permissions.concat(group.permissions)
    })
    user.permissions = [...new Set(user.permissions)]
    return user
  } catch (e) {
    throw errorHelper.serverError(e)
  }
}

module.exports.checkAuthToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token) {
      return next(errorHelper.forbidden())
    }
    const decoded = await passportUtil.extractAuthToken(token)

    if (!decoded || !decoded.userId) {
      throw errorHelper.forbidden()
    }
    let user = await daoUser.findOne(decoded.userId)

    if (user === null) {
      throw errorHelper.forbidden()
    }
    user = await this.concatUserPermissions(user)

    res.locals.user = user
    return next()
  } catch (e) {
    return next(e)
  }
}

module.exports.checkPermissions = (required) => {
  if (typeof required === 'string') required = [required]
  return (req, res, next) => {
    try {
      const user = res.locals.user
      if (!user) {
        throw errorHelper.serverError(req.__('PASSPORT_ERROR_USER_NOT_FOUND'))
      }
      if (!user.permissions) {
        throw errorHelper.serverError(req.__('PASSPORT_ERROR_NO_PERMISSION'))
      }
      if (!Array.isArray(required)) {
        throw errorHelper.serverError(req.__('PASSPORT_ERROR_PERMISSION_FORMAT'))
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
