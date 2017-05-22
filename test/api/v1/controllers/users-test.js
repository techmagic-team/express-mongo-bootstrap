'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const sinon = require('sinon')
const userModel = require('./../../../../app/models/user.js')
const server = require('../../../../app/index')
const mocha = require('mocha')
const sendEmail = require('./../../../../app/utils/sendEmail')

chai.should()
chai.use(chaiHttp)

describe('Users API v1', () => {
  let accessToken, adminAccessToken
  mocha.before((done) => {
    chai.request(server)
      .post('/v1/auth')
      .send({
        email: 'john.doe1@awesome.com',
        password: 'qwerty'
      })
      .end((err, res) => {
        chai.should().not.exist(err)
        res.should.have.status(200)
        res.body.should.be.an('object')
        res.body.should.have.property('accessToken')
        accessToken = res.body.accessToken
        done()
      })
  })
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
  describe('GET /users', () => {
    it('should list users on /users GET', (done) => {
      chai.request(server)
        .get('/v1/users')
        .end((err, res) => {
          chai.should().not.exist(err)
          res.should.have.status(200)
          res.body.should.be.an('array')
          res.body.length.should.be.above(0)
          done()
        })
    })
    describe('mockUserModel:', () => {
      const mockUserModel = sinon.mock(userModel)
      const rejectPromise = new Promise((resolve, reject) => reject(new Error()))
      mocha.before(() => {
        mockUserModel.expects('find').returns(rejectPromise)
      })
      mocha.after(() => {
        mockUserModel.verify()
        mockUserModel.restore()
      })
      it('should list an error on /users GET when db request failed', (done) => {
        chai.request(server)
          .get('/v1/users')
          .end((err, res) => {
            chai.should().exist(err)
            res.should.have.status(500)
            res.body.should.be.an('object')
            res.body.should.have.property('error')
            res.body.error.should.be.equal('SERVER_ERROR')
            done()
          })
      })
    })
  })
  describe('GET /users/:user_id', () => {
    it('should list a SINGLE user on /users/:user_id GET', (done) => {
      chai.request(server)
        .get('/v1/users/57fe2450916165b0b8b20be2')
        .end((err, res) => {
          chai.should().not.exist(err)
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.should.have.property('email')
          chai.should().not.exist(res.body.password)
          done()
        })
    })
    it('should list an error on /users/:undefined_id GET', (done) => {
      chai.request(server)
        .get('/v1/users/57fe2450906165b0b8b20be2')
        .end((err, res) => {
          chai.should().exist(err)
          res.should.have.status(404)
          res.body.should.be.an('object')
          res.body.should.have.property('error')
          res.body.error.should.be.equal('NOT_FOUND')
          done()
        })
    })
    it('should list an error on /users/:invalid_id GET', (done) => {
      chai.request(server)
        .get('/v1/users/57')
        .end((err, res) => {
          chai.should().exist(err)
          res.should.have.status(500)
          res.body.should.be.an('object')
          res.body.should.have.property('error')
          res.body.error.should.be.equal('SERVER_ERROR')
          done()
        })
    })
  })
  describe('POST /users', () => {
    let stub
    mocha.beforeEach((done) => {
      stub = sinon.stub(sendEmail.client, 'sendEmail').yields(null)
      done()
    })
    mocha.afterEach((done) => {
      stub.restore()
      done()
    })
    it('should add a SINGLE user on /users POST', (done) => {
      chai.request(server)
        .post('/v1/users')
        .send({
          email: 'ihor.fito@techmagic.co'
        })
        .end((err, res) => {
          chai.should().not.exist(err)
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.should.have.property('email')
          res.body.email.should.be.equal('ihor.fito@techmagic.co')
          chai.should().not.exist(res.body.password)
          done()
        })
    })
    it('should list an error on /users POST', (done) => {
      chai.request(server)
        .post('/v1/users')
        .send({
          email: 'testemail.com'
        })
        .end((err, res) => {
          chai.should().exist(err)
          res.should.have.status(500)
          res.body.should.be.an('object')
          res.body.should.have.property('error')
          res.body.error.should.be.equal('SERVER_ERROR')
          done()
        })
    })
  })
  describe('PUT /users/:user_id', () => {
    it('should update a SINGLE blob on /users/:user_id PUT', (done) => {
      chai.request(server)
        .put('/v1/users/57fe2450916165b0b8b20be2')
        .set('Authorization', accessToken)
        .send({
          email: 'testemail1@testemail.com',
          firstName: 'firstName',
          lastName: 'lastName'
        })
        .end((err, res) => {
          chai.should().not.exist(err)
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.should.have.property('email')
          res.body.email.should.be.equal('testemail1@testemail.com')
          res.body.should.have.property('firstName')
          res.body.firstName.should.be.equal('firstName')
          res.body.should.have.property('lastName')
          res.body.lastName.should.be.equal('lastName')
          chai.should().not.exist(res.body.password)
          done()
        })
    })
    it('should list an error on /users/:user_id PUT when data is invalid', (done) => {
      chai.request(server)
        .put('/v1/users/57fe2450916165b0b8b20be2')
        .set('Authorization', accessToken)
        .send({
          email: 'testemail.com',
          firstName: 'firstName',
          lastName: 'lastName'
        })
        .end((err, res) => {
          chai.should().exist(err)
          res.should.have.status(400)
          res.body.should.be.an('object')
          res.body.should.have.property('error')
          res.body.error.should.be.equal('BAD_REQUEST')
          done()
        })
    })
    it('should list an error on /users/:user_id PUT when try to update other users', (done) => {
      chai.request(server)
        .put('/v1/users/57fe2450916165b0b8b20be3')
        .set('Authorization', accessToken)
        .send({
          lastName: 'lastName'
        })
        .end((err, res) => {
          chai.should().exist(err)
          res.should.have.status(403)
          res.body.should.be.an('object')
          res.body.should.have.property('error')
          res.body.error.should.be.equal('FORBIDDEN')
          done()
        })
    })
  })
  describe('PATCH /users/:user_id', () => {
    it('should update a SINGLE blob on /users/:user_id PATCH', (done) => {
      chai.request(server)
        .patch('/v1/users/57fe2450916165b0b8b20be2')
        .set('Authorization', accessToken)
        .send({
          email: 'testemail1@testemail.com',
          firstName: 'firstName',
          lastName: 'lastName'
        })
        .end((err, res) => {
          chai.should().not.exist(err)
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.should.have.property('email')
          res.body.email.should.be.equal('testemail1@testemail.com')
          res.body.should.have.property('firstName')
          res.body.firstName.should.be.equal('firstName')
          res.body.should.have.property('lastName')
          res.body.lastName.should.be.equal('lastName')
          chai.should().not.exist(res.body.password)
          done()
        })
    })
    it('should list an error on /users/:user_id PATCH when data is invalid', (done) => {
      chai.request(server)
        .patch('/v1/users/57fe2450916165b0b8b20be2')
        .set('Authorization', accessToken)
        .send({
          email: 'testemail.com',
          firstName: 'firstName',
          lastName: 'lastName'
        })
        .end((err, res) => {
          chai.should().exist(err)
          res.should.have.status(400)
          res.body.should.be.an('object')
          res.body.should.have.property('error')
          res.body.error.should.be.equal('BAD_REQUEST')
          done()
        })
    })
    it('should list an error on /users/:user_id PATCH when try to update other users', (done) => {
      chai.request(server)
        .patch('/v1/users/57fe2450916165b0b8b20be3')
        .set('Authorization', accessToken)
        .send({
          lastName: 'lastName'
        })
        .end((err, res) => {
          chai.should().exist(err)
          res.should.have.status(403)
          res.body.should.be.an('object')
          res.body.should.have.property('error')
          res.body.error.should.be.equal('FORBIDDEN')
          done()
        })
    })
  })
  describe('DELETE /users/:user_id', () => {
    it('should delete a SINGLE user on /users/:user_id DELETE', (done) => {
      chai.request(server)
        .delete('/v1/users/57fe2450916165b0b8b20be3')
        .set('Authorization', adminAccessToken)
        .end((err, res) => {
          chai.should().not.exist(err)
          res.should.have.status(204)
          // res.body.should.be.empty
          done()
        })
    })
    it('should list an error on /users/:invalid_id DELETE', (done) => {
      chai.request(server)
        .delete('/v1/users/1')
        .set('Authorization', adminAccessToken)
        .end((err, res) => {
          chai.should().exist(err)
          res.should.have.status(500)
          res.body.should.be.an('object')
          res.body.should.have.property('error')
          res.body.error.should.be.equal('SERVER_ERROR')
          done()
        })
    })
    it('should list an error on /users/:user_id with db error DELETE', (done) => {
      const mock = sinon.mock(userModel)
      mock.expects('findByIdAndRemove').returns(new Promise((resolve, reject) => reject(new Error())))
      chai.request(server)
        .delete('/v1/users/57fe2450916165b0b8b20be2')
        .set('Authorization', adminAccessToken)
        .end((err, res) => {
          chai.should().exist(err)
          res.should.have.status(500)
          res.body.should.be.an('object')
          res.body.should.have.property('error')
          res.body.error.should.be.equal('SERVER_ERROR')
          mock.verify()
          mock.restore()
          done()
        })
    })
    it('should list an error on /users/:user_id, accessToken is not admin DELETE', (done) => {
      chai.request(server)
        .delete('/v1/users/57fe2450916165b0b8b20be2')
        .set('Authorization', accessToken)
        .end((err, res) => {
          chai.should().exist(err)
          res.should.have.status(403)
          res.body.should.be.an('object')
          res.body.should.have.property('error')
          res.body.error.should.be.equal('FORBIDDEN')
          done()
        })
    })
    it('should list an error on /users/:user_id, without accessToken DELETE', (done) => {
      chai.request(server)
        .delete('/v1/users/57fe2450916165b0b8b20be2')
        .end((err, res) => {
          chai.should().exist(err)
          res.should.have.status(403)
          res.body.should.be.an('object')
          res.body.should.have.property('error')
          res.body.error.should.be.equal('FORBIDDEN')
          done()
        })
    })
  })
})
