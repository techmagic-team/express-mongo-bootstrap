'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const path = require('path');
const mocha = require('mocha');
const mongoose = require('mongoose');
const expect = chai.expect;
chai.should();
chai.use(chaiHttp);

const mongooseHelper = require('./../../app/utils/mongooseHelper');

mocha.describe('mongooseHelper:', () => {
  mocha.describe('#dropCollections()', () => {
    mocha.before((done) => {
      mongooseHelper.dropCollections(null, (err) => {
        expect(err).to.equal(null);
        done();
      });
    });
    mocha.it('should drop collections of database', (done) => {
      mongoose.model('user').count((err, count) => {
        count.should.be.equal(0);
        done();
      });
    });
  });
  mocha.describe('#seedDatabase()', () => {
    mocha.before((done) => {
      const seedsPath = path.join(__dirname, '../../app/seeds');
      mongooseHelper.seedDatabase(seedsPath, null, (err) => {
        expect(err).to.equal(null);
        done();
      });
    });
    mocha.it('should seed database', (done) => {
      mongoose.model('user').count((err, count) => {
        count.should.be.above(0);
        done();
      });
    });
  });

});
