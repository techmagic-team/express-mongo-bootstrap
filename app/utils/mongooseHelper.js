'use strict'

const async = require('async')
const fs = require('fs')

module.exports.dropCollections = (mongoose, cb) => {
  if (!mongoose) {
    mongoose = require('mongoose')
  }
  return async.forEachOf(mongoose.connection.collections, (value, collectionName, done) => {
    mongoose.connection.collections[collectionName].drop(done)
  }, cb)
}

module.exports.seedDatabase = (seeds, mongoose, cb) => {
  if (!mongoose) {
    mongoose = require('mongoose')
  }
  const seeders = fs.readdirSync(seeds)
  return async.each(seeders, (file, callback) => {
    const seeder = require(seeds + '/' + file)
    mongoose.model(seeder.model).create(seeder.data, callback)
  }, cb)
}
