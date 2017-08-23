'use strict'

const express = require('express')
const router = express.Router()
const daoAuth = require('./auth.dao')
const dtoUser = require('../users/users.dto')
const errorHelper = require('../../../utils/errorHelper')
const passportUtil = require('../../../utils/passport')

router.post('/', async (req, res, next) => {
  try {
    const email = req.body.email
    const password = req.body.password
    const user = await daoAuth.findOneByEmail(email)
    if (!user) throw errorHelper.badRequest()
    if (user.password !== passportUtil.encryptPassword(password)) throw errorHelper.badRequest()
    user.accessToken = passportUtil.createAuthToken(user)
    res.json(dtoUser.public(user))
  } catch (e) {
    return next(e)
  }
})
module.exports = router
