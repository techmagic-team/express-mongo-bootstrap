'use strict'

const express = require('express')
const router = express.Router()
const daoGroups = require('./group.dao')
const dtoGroups = require('./group.dto')
const passportMiddleware = require('../middlewares/passport')

/**
 * @api {get} /groups GET groups
 * @apiName GetGroups
 * @apiGroup groups
 */
router.get('/',
  passportMiddleware.checkAuthToken,
  passportMiddleware.checkPermissions('groups:fullAccess'),
  (req, res, next) => {
    return daoGroups.findAll()
      .then((groups) => {
        res.json(groups)
      })
      .catch((err) => {
        return next(err)
      })
  })

/**
 * @api {post} /groups POST groups
 * @apiName CreateGroup
 * @apiGroup groups
 *
 * @apiParam {String} name Group name.
 * @apiParam {String} [firstName] Optional firstName.
 * @apiParam {String} [lastName] Optional lastName.
 * @apiParam {String} [password] Optional password.
 *
 */
router.post('/',
  passportMiddleware.checkAuthToken,
  passportMiddleware.checkPermissions('groups:fullAccess'),
  (req, res, next) => {
    return daoGroups.create(req.body)
      .then((group) => {
        res.json(dtoGroups.public(group))
      })
      .catch((err) => {
        return next(err)
      })
  })

module.exports = router
