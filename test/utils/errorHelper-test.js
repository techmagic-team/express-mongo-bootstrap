'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const describe = require('mocha').describe;
const it = require('mocha').it;

chai.should();
chai.use(chaiHttp);

const errorHelper = require('./../../app/utils/errorHelper');

describe('errorHelper:', () => {
  describe('#serverError()', () => {
    it('should return Error(`SERVER_ERROR`)', (done) => {
      const error = errorHelper.serverError();
      error.should.be.an('error');
      chai.should().exist(error.message);
      error.message.should.be.equal('SERVER_ERROR');
      chai.should().exist(error.code);
      error.code.should.be.equal(500);
      done();
    });
  });
  describe('#badRequest()', () => {
    it('should return Error(`BAD_REQUEST`)', (done) => {
      const error = errorHelper.badRequest();
      error.should.be.an('error');
      chai.should().exist(error.message);
      error.message.should.be.equal('BAD_REQUEST');
      chai.should().exist(error.code);
      error.code.should.be.equal(400);
      done();
    });
  });

});
