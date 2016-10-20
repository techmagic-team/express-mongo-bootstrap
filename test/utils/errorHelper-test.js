'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mocha = require('mocha');

chai.should();
chai.use(chaiHttp);

const errorHelper = require('./../../app/utils/errorHelper');

mocha.describe('errorHelper:', () => {
  mocha.describe('#serverError()', () => {
    mocha.it('should return Error(`SERVER_ERROR`)', (done) => {
      const error = errorHelper.serverError('serverError');
      error.should.be.an('error');
      chai.should().exist(error.message);
      error.message.should.be.equal('SERVER_ERROR');
      chai.should().exist(error.code);
      error.code.should.be.equal(500);
      done();
    });
  });
  mocha.describe('#notFound()', () => {
    mocha.it('should return Error(`NOT_FOUND`)', (done) => {
      const error = errorHelper.notFound('notFound');
      error.should.be.an('error');
      chai.should().exist(error.message);
      error.message.should.be.equal('NOT_FOUND');
      chai.should().exist(error.code);
      error.code.should.be.equal(404);
      done();
    });
  });
  mocha.describe('#badRequest()', () => {
    mocha.it('should return Error(`BAD_REQUEST`)', (done) => {
      const error = errorHelper.badRequest('badRequest');
      error.should.be.an('error');
      chai.should().exist(error.message);
      error.message.should.be.equal('BAD_REQUEST');
      chai.should().exist(error.code);
      error.code.should.be.equal(400);
      done();
    });
  });

});
