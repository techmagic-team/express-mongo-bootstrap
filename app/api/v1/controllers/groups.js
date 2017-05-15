'use strict'

const express = require('express')
const router = express.Router()
const daoGroups = require('./../dao/group')

/**
 * @api {get} /groups GET groups
 * @apiName GetGroups
 * @apiGroup groups
 */
router.get('/', (req, res, next) => {
  return daoGroups.findAll()
    .then((groups) => {
      res.json(groups)
    })
    .catch((err) => {
      return next(err)
    })
})

module.exports = router
