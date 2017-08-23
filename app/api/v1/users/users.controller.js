'use strict'

const router = require('express').Router()
const daoUser = require('./users.dao')
const dtoUser = require('./users.dto')
const errorHelper = require('../../../utils/errorHelper')
const passportMiddleware = require('../middlewares/passport')
const userMiddleware = require('./users.middlreware')
const sendEmailUtil = require('../../../utils/sendEmail')

router.param('user_id', async (req, res, next, id) => {
  // try to get the user details from the User model and attach it to the request object
  try {
    req.user = await daoUser.findOne(id)
    return next()
  } catch (e) {
    return next(e)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const users = await daoUser.findAll()
    const publicUsers = users.map((user) => dtoUser.public(user))
    res.json(publicUsers)
  } catch (e) { return next(e) }
})

router.get('/:user_id', (req, res, next) => {
  if (!req.user) next(errorHelper.notFound())
  res.json(dtoUser.public(req.user))
})

router.post('/', async (req, res, next) => {
  try {
    const user = await daoUser.create(req.body)
    const data = await Promise.all([user, sendEmailUtil.sendWelcomeEmail(user)])
    res.json(dtoUser.public(data[0]))
  } catch (e) {
    return next(e)
  }
})

router.put('/:user_id', passportMiddleware.checkAuthToken, userMiddleware.checkOwner, userMiddleware.validateUpdate, async (req, res, next) => {
  try {
    const user = await daoUser.update(req.user._id, req.body)
    res.json(dtoUser.public(user))
  } catch (e) {
    return next(e)
  }
})

router.patch('/:user_id', passportMiddleware.checkAuthToken, userMiddleware.checkOwner, userMiddleware.validateUpdate, async (req, res, next) => {
  try {
    const user = await daoUser.modify(req.user._id, req.body)

    res.json(dtoUser.public(user))
  } catch (e) {
    return next(e)
  }
})

router.delete('/:user_id',
  passportMiddleware.checkAuthToken,
  passportMiddleware.checkPermissions('users:fullAccess'),
  async (req, res, next) => {
    try {
      await daoUser.delete(req.user._id)
      res.sendStatus(204)
    } catch (e) {
      return next(e)
    }
  })
module.exports = router
