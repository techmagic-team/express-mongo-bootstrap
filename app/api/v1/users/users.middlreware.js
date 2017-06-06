'use strict'

const joi = require('joi')
const errorHelper = require('../../../utils/errorHelper')

module.exports.validateUpdate = (req, res, next) => {
  const schema = joi.object().keys({
    email: joi.string().regex(/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,8})+$/).min(6).max(45),
    firstName: joi.string().regex(/^.+$/).min(1).max(30),
    lastName: joi.string().regex(/^.+$/).min(2).max(30),
    password: [joi.string(), joi.allow(null), '']
  })

  joi.validate(req.body, schema, (err, value) => {
    if (err) {
      return next(errorHelper.invalidJoi(err))
    }
    req.body = value
    return next()
  })
}
