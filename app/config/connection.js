'use strict'
const mongoose = require('mongoose')

const env = process.env.NODE_ENV || 'local'
const _config = require('./../config/_config.json')[env]

mongoose.set('debug', _config.debug)
mongoose.Promise = global.Promise

module.exports.connect = (cb) => {
  return mongoose.connect(_config.database, cb)
}

module.exports.disconnect = () => {
  return mongoose.disconnect()
}

module.exports.getMongoose = () => {
  this.disconnect()
  this.connect()
  return mongoose
}
