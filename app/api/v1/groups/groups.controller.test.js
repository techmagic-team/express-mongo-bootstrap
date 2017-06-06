'use strict'

const server = require('../../../index')
const chai = require('chai')
const chaiHttp = require('chai-http')
const mocha = require('mocha')

chai.should()
chai.use(chaiHttp)

describe('Groups API v1', () => {
  let adminAccessToken
  mocha.before((done) => {
    chai.request(server)
      .post('/v1/auth')
      .send({
        email: 'john.doe@awesome.com',
        password: 'qwerty'
      })
      .end((err, res) => {
        chai.should().not.exist(err)
        res.should.have.status(200)
        res.body.should.be.an('object')
        res.body.should.have.property('accessToken')
        adminAccessToken = res.body.accessToken
        done()
      })
  })
  describe('GET /groups', () => {
    it('should list groups on /groups GET', (done) => {
      chai.request(server)
        .get('/v1/groups')
        .set('Authorization', adminAccessToken)
        .end((err, res) => {
          chai.should().not.exist(err)
          res.should.have.status(200)
          res.body.should.be.an('array')
          res.body.length.should.be.above(0)
          done()
        })
    })
  })
})
