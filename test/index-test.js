'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/index');
const describe = require('mocha').describe;
const it = require('mocha').it;

chai.should();
chai.use(chaiHttp);

describe('Server', () => {
  it('should list error on /v0 GET', (done) => {
    chai.request(server)
      .get('/v0')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
