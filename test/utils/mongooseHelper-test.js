'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');
const path = require('path');
const describe = require('mocha').describe;
const it = require('mocha').it;

chai.should();
chai.use(chaiHttp);

const mongooseHelper = require('./../../app/utils/mongooseHelper');

describe('mongooseHelper:', () => {
  describe('#dropCollections()', () => {
    it('should drop collections of database', (done) => {
      mongooseHelper.dropCollections();
      chai.request(server)
        .get('/v1/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          res.body.length.should.be.equal(0);
          done();
        });
    });
  });
  describe('#seedDatabase()', () => {
    it('should seed database', (done) => {
      const seedsPath = path.join(__dirname, '../../app/seeds');
      mongooseHelper.seedDatabase(seedsPath);
      chai.request(server)
        .get('/v1/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          res.body.length.should.be.above(0);
          done();
        });
    });
  });

});
