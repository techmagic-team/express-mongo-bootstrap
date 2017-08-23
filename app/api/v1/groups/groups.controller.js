'use strict'

const express = require('express')
const router = express.Router()
const daoGroups = require('./groups.dao')
const dtoGroups = require('./groups.dto')
const passportMiddleware = require('../middlewares/passport')

router.get('/',
  passportMiddleware.checkAuthToken,
  passportMiddleware.checkPermissions('groups:fullAccess'),
  async (req, res, next) => {
    try {
      const groups = await daoGroups.findAll()
      res.json(groups)
    } catch (e) {
      return next(e)
    }
  })

router.post('/',
  passportMiddleware.checkAuthToken,
  passportMiddleware.checkPermissions('groups:fullAccess'),
  async (req, res, next) => {
    try {
      const group = daoGroups.create(req.body)
      res.json(dtoGroups.public(group))
    } catch (e) {
      return next(e)
    }
  })

module.exports = router
