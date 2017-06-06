'use strict'

const express = require('express')
const router = express.Router()
const daoUser = require('./user.dao')
const dtoUser = require('./user.dto')
const errorHelper = require('../../../utils/errorHelper')
const passportMiddleware = require('../middlewares/passport')
const userMiddleware = require('./user.middlreware')
const sendEmailUtil = require('../../../utils/sendEmail')

router.param('user_id', function (req, res, next, id) {
  // try to get the user details from the User model and attach it to the request object
  return daoUser.findOne(id)
    .then((user) => {
      req.user = user
      return next()
    })
    .catch((err) => {
      return next(err)
    })
})

router.get('/', (req, res, next) => {
  return daoUser.findAll()
    .then((users) => {
      const publicUsers = users.map((user) => dtoUser.public(user))
      res.json(publicUsers)
    })
    .catch((err) => {
      return next(err)
    })
})

router.get('/:user_id', (req, res, next) => {
  if (!req.user) next(errorHelper.notFound())
  res.json(dtoUser.public(req.user))
})

router.post('/', (req, res, next) => {
  return daoUser.create(req.body)
    .then((user) => {
      return Promise.all([user, sendEmailUtil.sendWelcomeEmail(user)])
    })
    .then((data) => {
      const user = data[0]
      res.json(dtoUser.public(user))
    })
    .catch((err) => {
      return next(err)
    })
})

router.put('/:user_id', passportMiddleware.checkAuthToken, userMiddleware.validateUpdate, (req, res, next) => {
  if (!req.user._id.equals(res.locals.user._id)) return next(errorHelper.forbidden())
  return daoUser.update(req.user._id, req.body)
    .then((user) => {
      res.json(dtoUser.public(user))
    })
    .catch((err) => {
      return next(err)
    })
})

router.patch('/:user_id', passportMiddleware.checkAuthToken, userMiddleware.validateUpdate, (req, res, next) => {
  if (!req.user._id.equals(res.locals.user._id)) return next(errorHelper.forbidden())
  return daoUser.modify(req.user._id, req.body)
    .then((user) => {
      res.json(dtoUser.public(user))
    })
    .catch((err) => {
      return next(err)
    })
})

router.delete('/:user_id',
  passportMiddleware.checkAuthToken,
  passportMiddleware.checkPermissions('users:fullAccess'),
  (req, res, next) => {
    return daoUser.delete(req.user._id)
      .then(() => {
        res.sendStatus(204)
      })
      .catch((err) => {
        return next(err)
      })
  })
module.exports = router
