'use strict'

const mongoose = require('mongoose')
const passportUtil = require('../utils/passport')
const validate = require('../config/validate')

const Schema = mongoose.Schema
/**
 * @apiDefine user User access only
 * This optional description belong to to the group user.
 */
const user = new Schema({
  firstName: {type: String, trim: true, default: ''},
  lastName: {type: String, trim: true, default: ''},
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: true,
    default: ''
  },
  password: {type: String, default: ''},
  permissions: [String],
  groups: [{ type: Schema.Types.ObjectId, ref: 'Groups' }]
}, {
  collection: 'users',
  _id: true
})

user.path('password').set((value) => {
  return passportUtil.encryptPassword(value)
})

user.path('email').validate((value) => {
  const emailRegex = validate.email
  return emailRegex.test(value)
}, 'Please fill a valid email address')

module.exports = mongoose.model('user', user)
