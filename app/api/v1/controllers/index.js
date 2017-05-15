'use strict'

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.json({version: 'v1'})
})

router.use('/users', require('./users'))
router.use('/groups', require('./groups'))
router.use('/auth', require('./auth'))

module.exports = router
