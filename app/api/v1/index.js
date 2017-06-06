'use strict'

const express = require('express')
const router = express.Router()

router.use('/users', require('./users/users.controller'))
router.use('/groups', require('./groups/groups.controller'))
router.use('/auth', require('./auth/auth.controller'))

module.exports = router
