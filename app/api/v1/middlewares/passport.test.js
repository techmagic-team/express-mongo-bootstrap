'use strict'

const chai = require('chai')
chai.should()

const passportMiddleware = require('./passport')
const passportUtil = require('../../../utils/passport')

describe('Middleware passport:', () => {
  describe('#checkAuthToken()', () => {
    it('should catch forbidden error with no token', (done) => {
      passportMiddleware.checkAuthToken({headers: {}}, null, (err) => {
        err.should.be.an('error')
        chai.should().exist(err.message)
        err.message.should.be.equal('FORBIDDEN')
        chai.should().exist(err.code)
        err.code.should.be.equal(403)
        done()
      })
    })
    it('should catch forbidden error with invalid token', (done) => {
      passportMiddleware.checkAuthToken({headers: {authorization: ''}}, null, (err) => {
        err.should.be.an('error')
        chai.should().exist(err.message)
        err.message.should.be.equal('FORBIDDEN')
        chai.should().exist(err.code)
        err.code.should.be.equal(403)
        done()
      })
    })
    it('should catch forbidden error with no existed user', (done) => {
      const authorization = passportUtil.createAuthToken({_id: '57fe2450916165b000000be0'})
      passportMiddleware.checkAuthToken({headers: {authorization: authorization}}, null, (err) => {
        err.should.be.an('error')
        chai.should().exist(err.message)
        err.message.should.be.equal('FORBIDDEN')
        chai.should().exist(err.code)
        err.code.should.be.equal(403)
        done()
      })
    })
  })
})
