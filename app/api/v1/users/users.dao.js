'use strict'

const userModel = require('../../../models/user')
const errorHelper = require('../../../utils/errorHelper')
const passportUtil = require('../../../utils/passport')
module.exports.create = (data) => {
  return userModel.create(data)
    .then((data) => {
      return data
    })
    .catch((err) => {
      throw errorHelper.serverError(err)
    })
}

module.exports.findAll = () => {
  return userModel.find()
    .then((data) => {
      return data
    })
    .catch((err) => {
      throw errorHelper.serverError(err)
    })
}

module.exports.findOne = (id) => {
  return userModel.findById(id)
    .then((data) => {
      return data
    })
    .catch((err) => {
      throw errorHelper.serverError(err)
    })
}

module.exports.update = (id, data) => {
  if (data.password) data.password = passportUtil.encryptPassword(data.password)
  return userModel.findByIdAndUpdate(id, data, {new: true, overwrite: true, runValidators: true})
    .then((data) => {
      return data
    })
    .catch((err) => {
      throw errorHelper.serverError(err)
    })
}

module.exports.modify = (id, data) => {
  if (data.password) data.password = passportUtil.encryptPassword(data.password)
  return userModel.findByIdAndUpdate(id, {$set: data}, {new: true, runValidators: true})
    .then((data) => {
      return data
    })
    .catch((err) => {
      throw errorHelper.serverError(err)
    })
}

module.exports.delete = (id) => {
  return userModel.findByIdAndRemove(id)
    .catch((err) => {
      throw errorHelper.serverError(err)
    })
}
