'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('./../app/index')
const mocha = require('mocha')
const expect = chai.expect
chai.use(chaiHttp)

mocha.describe('Server', () => {
  mocha.it('should list error on /v0 GET', (done) => {
    chai.request(server)
      .get('/v0')
      .end((err, res) => {
        expect(err).to.exist
        expect(res).to.have.status(404)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('error')
        expect(res.body.error).to.be.equal('NOT_FOUND')
        done()
      })
  })
})
