'use strict';

const chai = require('chai');
const mocha = require('mocha');
chai.should();

const passportMiddleware = require('./../../../../app/api/v1/middlewares/passport');
const passportUtil = require('./../../../../app/utils/passport');

mocha.describe('Middleware passport:', () => {
  mocha.describe('#checkAuthToken()', () => {
    mocha.it('should catch forbidden error with no token', (done) => {
      passportMiddleware.checkAuthToken({headers: {}}, null, (err) => {
        err.should.be.an('error');
        chai.should().exist(err.message);
        err.message.should.be.equal('FORBIDDEN');
        chai.should().exist(err.code);
        err.code.should.be.equal(403);
        done();
      });
    });
    mocha.it('should catch forbidden error with invalid token', (done) => {
      passportMiddleware.checkAuthToken({headers: { authorization: ''}}, null, (err) => {
        err.should.be.an('error');
        chai.should().exist(err.message);
        err.message.should.be.equal('FORBIDDEN');
        chai.should().exist(err.code);
        err.code.should.be.equal(403);
        done();
      });
    });
    mocha.it('should catch forbidden error with no existed user', (done) => {
      const authorization = passportUtil.createAuthToken({_id: '57fe2450916165b0b8b20be0'});
      passportMiddleware.checkAuthToken({headers: { authorization: authorization}}, null, (err) => {
        err.should.be.an('error');
        chai.should().exist(err.message);
        err.message.should.be.equal('FORBIDDEN');
        chai.should().exist(err.code);
        err.code.should.be.equal(403);
        done();
      });
    });
  });
});
