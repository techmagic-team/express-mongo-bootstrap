'use strict';

const chai = require('chai');
const describe = require('mocha').describe;
const it = require('mocha').it;

chai.should();

const authToken = require('./../../app/utils/authToken');

describe('authToken:', () => {
  let authTokenString;
  const user = {
    id: 1
  };
  describe('#createAuthToken()', () => {
    it('should return authorization token', (done) => {
      authTokenString = authToken.createAuthToken(user);
      authTokenString.should.be.a('string');
      done();
    });
  });
  describe('#extractAuthToken()', () => {
    it('should return extract authorization token', (done) => {
      authToken.extractAuthToken(authTokenString)
        .then((data) => {
          chai.should().exist(data.userId);
          data.userId.should.be.equal(user.id);
          done();
        });
    });
  });

});
