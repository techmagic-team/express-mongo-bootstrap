'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');
const path = require('path');
const mocha = require('mocha');

chai.should();
chai.use(chaiHttp);

const mongooseHelper = require('./../../app/utils/mongooseHelper');

mocha.describe('mongooseHelper:', () => {
  mocha.describe('#dropCollections()', () => {
    mocha.it('should drop collections of database', (done) => {
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
  mocha.describe('#seedDatabase()', () => {
    mocha.it('should seed database', (done) => {
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
