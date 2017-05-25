'use strict'

const async = require('async')
const fs = require('fs')

module.exports.seedDatabase = (seeds, mongoose, cb) => {
  if (!mongoose) {
    mongoose = require('mongoose')
  }
  const seeders = fs.readdirSync(seeds)
  return mongoose.connection.dropDatabase()
    .then(() => {
      return async.each(seeders, (file, done) => {
        const seeder = require(seeds + '/' + file)
        mongoose.model(seeder.model).create(seeder.data, done)
      }, cb)
    })
}
