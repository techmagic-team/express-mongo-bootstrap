'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../app');
const describe = require('mocha').describe;
const it = require('mocha').it;
const expect = chai.expect;
chai.should();
chai.use(chaiHttp);

describe('API v1', () => {
  describe('GET /v1', () => {
    it('should list version on / GET', (done) => {
      chai.request(server)
        .get('/v1')
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.version).to.exist;
          expect(res.body.version).to.equal('v1');
          done();
        });
    });
  });
});
