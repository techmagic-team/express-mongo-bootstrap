'use strict'

const chai = require('chai')

chai.should()

const authToken = require('./../../app/utils/passport')

describe('authToken:', () => {
  let authTokenString
  const user = {
    _id: 1
  }
  describe('#createAuthToken()', () => {
    it('should return authorization token', (done) => {
      authTokenString = authToken.createAuthToken(user)
      authTokenString.should.be.a('string')
      done()
    })
  })
  describe('#extractAuthToken()', () => {
    it('should return extract authorization token', (done) => {
      authToken.extractAuthToken(authTokenString)
        .then((data) => {
          chai.should().exist(data.userId)
          data.userId.should.be.equal(user._id)
          done()
        })
    })
    it('should return extract authorization token', (done) => {
      authToken.extractAuthToken('fail')
        .catch((err) => {
          chai.should().exist(err)
          done()
        })
    })
  })
})
