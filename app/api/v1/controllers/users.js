'use strict'

const express = require('express')
const router = express.Router()
const daoUser = require('./../dao/user')
const dtoUser = require('./../dto/user')
const errorHelper = require('./../../../utils/errorHelper')
const passportMiddleware = require('./../middlewares/passport')
const userMiddleware = require('./../middlewares/user')
const sendEmailUtil = require('./../../../utils/sendEmail')

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

/**
 * @api {get} /users GET users
 * @apiName GetUsers
 * @apiGroup users
 *
 * @apiUse dtoUsersPublic
 */
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

/**
 * @api {get} /users/:user_id Request User information
 * @apiName GetUser
 * @apiGroup users
 *
 * @apiParam {Number} user_id Users unique ID.
 *
 * @apiUse dtoUserPublic
 */
router.get('/:user_id', (req, res, next) => {
  if (!req.user) next(errorHelper.notFound())
  res.json(dtoUser.public(req.user))
})

/**
 * @api {post} /users Create User
 * @apiName CreateUser
 * @apiGroup users
 *
 * @apiParam {String} email Optional email.
 * @apiParam {String} [firstName] Optional firstName.
 * @apiParam {String} [lastName] Optional lastName.
 * @apiParam {String} [password] Optional password.
 *
 * @apiUse dtoUserPublic
 */
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

/**
 * @api {put} /users/:user_id Update User Doc
 * @apiName UpdateUser
 * @apiGroup users
 * @apiPermission user
 *
 * @apiUse updateUserParams
 * @apiUse dtoUserPublic
 */
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

/**
 * @api {patch} /users/:user_id Update User information
 * @apiName UpdatePartialUser
 * @apiGroup users
 * @apiPermission user
 *
 * @apiUse updateUserParams
 * @apiUse dtoUserPublic
 */
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

/**
 * @api {delete} /users/:user_id Delete User
 * @apiName DeleteUser
 * @apiGroup users
 * @apiPermission user
 *
 * @apiParam {Number} user_id Users unique ID.
 *
 * @apiSuccess (204).
 */
router.delete('/:user_id',
  passportMiddleware.checkAuthToken,
  passportMiddleware.checkPermissions('users:fullAccess'),
  (req, res, next) => {
    if (res.locals.user.role !== 1) return next(errorHelper.forbidden())
    return daoUser.delete(req.user._id)
      .then(() => {
        res.sendStatus(204)
      })
      .catch((err) => {
        return next(err)
      })
  })
module.exports = router
