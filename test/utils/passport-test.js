'use strict';

const chai = require('chai');
const mocha = require('mocha');

chai.should();

const authToken = require('./../../app/utils/passport');

mocha.describe('authToken:', () => {
  let authTokenString;
  const user = {
    _id: 1
  };
  mocha.describe('#createAuthToken()', () => {
    mocha.it('should return authorization token', (done) => {
      authTokenString = authToken.createAuthToken(user);
      authTokenString.should.be.a('string');
      done();
    });
  });
  mocha.describe('#extractAuthToken()', () => {
    mocha.it('should return extract authorization token', (done) => {
      authToken.extractAuthToken(authTokenString)
        .then((data) => {
          chai.should().exist(data.userId);
          data.userId.should.be.equal(user._id);
          done();
        });
    });
    mocha.it('should return extract authorization token', (done) => {
      authToken.extractAuthToken('fail')
        .catch((err) => {
          chai.should().exist(err);
          done();
        });
    });
  });

});
