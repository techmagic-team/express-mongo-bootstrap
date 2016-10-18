'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../app/index');
const mocha = require('mocha');

chai.should();
chai.use(chaiHttp);

mocha.describe('Server', () => {
  mocha.it('should list error on /v0 GET', (done) => {
    chai.request(server)
      .get('/v0')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
