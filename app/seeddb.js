'use strict'

const env = process.env.NODE_ENV || 'local'
const _config = require('./config/_config.json')[env]
const path = require('path')

if (_config.seed) {
  // db connection and settings
  const connection = require('./config/connection')
  const mongoose = connection.getMongoose()

  const seedsPath = path.join(__dirname, './seeds')
  const modelsPath = path.join(__dirname, './models')

  const mongooseHelper = require('./utils/mongooseHelper')

  const options = {
    seeds: seedsPath,
    models: modelsPath,
    mongoose: mongoose
  }

  mongooseHelper.seedDatabase(options)
    .then(() => {
      process.exit()
    })
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}
