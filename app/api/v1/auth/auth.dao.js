'use strict'

const userModel = require('../../../models/user.js')
const errorHelper = require('../../../utils/errorHelper')

module.exports.findOneByEmail = (email) => {
  return userModel.findOne({email: email})
    .then((data) => {
      return data
    })
    .catch((err) => {
      throw errorHelper.serverError(err)
    })
}
