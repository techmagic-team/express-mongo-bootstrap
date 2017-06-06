'use strict'

const groupModel = require('../../../models/group')
const errorHelper = require('../../../utils/errorHelper')
module.exports.create = (data) => {
  return groupModel.create(data)
    .then((data) => {
      return data
    })
    .catch((err) => {
      throw errorHelper.serverError(err)
    })
}

module.exports.findAll = (options = {}) => {
  const q = {}
  if (options.ids) {
    q._id = {
      $in: options.ids
    }
  }
  return groupModel.find(q)
    .then((data) => {
      return data
    })
    .catch((err) => {
      throw errorHelper.serverError(err)
    })
}

module.exports.findOne = (id) => {
  return groupModel.findById(id)
    .then((data) => {
      return data
    })
    .catch((err) => {
      throw errorHelper.serverError(err)
    })
}

module.exports.update = (id, data) => {
  return groupModel.findByIdAndUpdate(id, data, {new: true, overwrite: true, runValidators: true})
    .then((data) => {
      return data
    })
    .catch((err) => {
      throw errorHelper.serverError(err)
    })
}

module.exports.modify = (id, data) => {
  return groupModel.findByIdAndUpdate(id, {$set: data}, {new: true, runValidators: true})
    .then((data) => {
      return data
    })
    .catch((err) => {
      throw errorHelper.serverError(err)
    })
}

module.exports.delete = (id) => {
  return groupModel.findByIdAndRemove(id)
    .catch((err) => {
      throw errorHelper.serverError(err)
    })
}
