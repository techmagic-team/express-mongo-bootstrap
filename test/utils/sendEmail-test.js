'use strict';

const chai = require('chai');
const mocha = require('mocha');
const sinon = require('sinon');

chai.should();

const sendEmail = require('./../../app/utils/sendEmail');

mocha.describe('sendEmail.js:', () => {
  const user = {
    email: 'testemail@gmail.com'
  };

  let stub;


  mocha.describe('#sendEmail.js()', () => {
    mocha.before((done) => {
      stub = sinon.stub(sendEmail.client, 'sendEmail').yields(null);
      done();
    });
    mocha.after((done) => {
      stub.restore();
      done();
    });
    mocha.it('should return true in Promise', (done) => {
      sendEmail.sendEmail(user).then((data) => {
        data.should.be.equal(true);
        done();
      });
    });
  });
  mocha.describe('#sendWelcomeEmail()', () => {
    mocha.before((done) => {
      stub = sinon.stub(sendEmail.client, 'sendEmail').yields(null);
      done();
    });
    mocha.afterEach((done) => {
      stub.restore();
      done();
    });
    mocha.it('should return extract authorization token', (done) => {
      sendEmail.sendWelcomeEmail(user)
        .then((data) => {
          data.should.be.equal(true);
          done();
        });
    });
  });
});
