'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const group = new Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: true,
    default: ''
  },
  permissions: [String]
}, {
  collection: 'groups',
  _id: true
})

module.exports = mongoose.model('group', group)
