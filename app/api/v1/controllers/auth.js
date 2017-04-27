'use strict'

const express = require('express')
const router = express.Router()
const daoAuth = require('./../dao/auth')
const dtoUser = require('./../dto/user')
const errorHelper = require('./../../../utils/errorHelper')
const passportUtil = require('./../../../utils/passport')

router.post('/', (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  daoAuth.findOneByEmail(email)
    .then((user) => {
      if (!user) throw errorHelper.badRequest()
      if (user.password !== passportUtil.encryptPassword(password)) throw errorHelper.badRequest()
      user.accessToken = passportUtil.createAuthToken(user)
      res.json(dtoUser.public(user))
    })
    .catch((err) => {
      return next(err)
    })
})
module.exports = router
