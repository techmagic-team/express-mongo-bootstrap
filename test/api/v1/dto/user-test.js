'use strict'

const chai = require('chai')
const mocha = require('mocha')
chai.should()

const dto = require('./../../../../app/api/v1/dto/user')

mocha.describe('DTO User:', () => {
  mocha.describe('#createAuthToken()', () => {
    mocha.it('should return user', (done) => {
      const user = {
        _id: '_id',
        accessToken: 'accessToken',
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email'
      }
      const dtoUser = dto.public(user)
      dtoUser._id.should.be.equal('_id')
      dtoUser.accessToken.should.be.equal('accessToken')
      dtoUser.firstName.should.be.equal('firstName')
      dtoUser.lastName.should.be.equal('lastName')
      dtoUser.email.should.be.equal('email')
      done()
    })
  })
  mocha.describe('#extractAuthToken()', () => {
    mocha.it('should return user with null', (done) => {
      const user = {}
      const dtoUser = dto.public(user)
      chai.assert.isNull(dtoUser._id)
      chai.assert.isNull(dtoUser.firstName)
      chai.assert.isNull(dtoUser.lastName)
      chai.assert.isNull(dtoUser.email)
      done()
    })
  })
})
