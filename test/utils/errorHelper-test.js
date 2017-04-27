'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const mocha = require('mocha')

chai.should()
chai.use(chaiHttp)

const errorHelper = require('./../../app/utils/errorHelper')

mocha.describe('errorHelper:', () => {
  mocha.describe('#serverError()', () => {
    mocha.it('should return Error(`SERVER_ERROR`)', (done) => {
      const error = errorHelper.serverError('serverError')
      chai.should().exist(error.message)
      error.error.should.be.equal('SERVER_ERROR')
      error.message.should.be.equal('serverError')
      chai.should().exist(error.code)
      error.code.should.be.equal(500)
      done()
    })
  })
  mocha.describe('#notFound()', () => {
    mocha.it('should return Error(`NOT_FOUND`)', (done) => {
      const error = errorHelper.notFound('notFound')
      chai.should().exist(error.message)
      error.error.should.be.equal('NOT_FOUND')
      error.message.should.be.equal('notFound')
      chai.should().exist(error.code)
      error.code.should.be.equal(404)
      done()
    })
  })
  mocha.describe('#badRequest()', () => {
    mocha.it('should return Error(`BAD_REQUEST`)', (done) => {
      const error = errorHelper.badRequest('badRequest')
      chai.should().exist(error.message)
      error.error.should.be.equal('BAD_REQUEST')
      error.message.should.be.equal('badRequest')
      chai.should().exist(error.code)
      error.code.should.be.equal(400)
      done()
    })
  })
  mocha.describe('#forbidden()', () => {
    mocha.it('should return Error(`FORBIDDEN`)', (done) => {
      const error = errorHelper.forbidden('forbidden')
      chai.should().exist(error.message)
      error.error.should.be.equal('FORBIDDEN')
      error.message.should.be.equal('forbidden')
      chai.should().exist(error.code)
      error.code.should.be.equal(403)
      done()
    })
  })
})
