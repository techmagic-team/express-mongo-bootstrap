'use strict'

const express = require('express')
const http = require('http')
const env = process.env.NODE_ENV || 'local'
const _config = require('./config/_config.json')[env]

const app = express()
// Bootstrap application settings
app.set('env', env)

require('./config/express')(app)

// Routing
app.use('/v1', require('./api/v1/controllers'))

// db connection and settings
const connection = require('./config/connection')
connection.getMongoose()

// error-handler settings
require('./config/error-handler')(app)

// log
if (_config.debug) {
  const morgan = require('morgan')
  app.use(morgan(':method :url :status :response-time'))
}

// create server
const port = process.env.PORT || 3000
const server = http.createServer(app)
server.listen(port, () => {
  console.log('listening at:', port)
})

module.exports = app
