'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../app');
const describe = require('mocha').describe;
const it = require('mocha').it;

chai.should();
chai.use(chaiHttp);

describe('Users API v1', () => {
  describe('GET /users', () => {
    it('should list users on /users GET', (done) => {
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
  describe('GET /users/:id', () => {
    it('should list a SINGLE user on /users/:id GET', (done) => {
      chai.request(server)
        .get('/v1/users/57fe2450916165b0b8b20be2')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('email');
          chai.should().not.exist(res.body.password);
          done();
        });
    });
    it('should list an error on /users/:undefined_id GET', (done) => {
      chai.request(server)
        .get('/v1/users/57fe2450906165b0b8b20be2')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.an('object');
          res.body.should.have.property('error');
          res.body.error.should.be.equal('NOT_FOUND');
          done();
        });
    });
    it('should list an error on /users/:invalid_id GET', (done) => {
      chai.request(server)
        .get('/v1/users/57')
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.an('object');
          res.body.should.have.property('error');
          res.body.error.should.be.equal('SERVER_ERROR');
          done();
        });
    });
  });
  describe('POST /users', () => {
    it('should add a SINGLE user on /users POST', (done) => {
      chai.request(server)
        .post('/v1/users')
        .send({
          email: 'testemail@testemail.com'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('email');
          res.body.email.should.be.equal('testemail@testemail.com');
          chai.should().not.exist(res.body.password);
          done();
        });
    });
  });
  describe('PUT /users/:id', () => {
    it('should update a SINGLE blob on /users/:id PUT', (done) => {
      chai.request(server)
        .put('/v1/users/57fe2450916165b0b8b20be2')
        .send({
          email: 'testemail1@testemail.com',
          firstName: 'firstName',
          lastName: 'lastName'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('email');
          res.body.email.should.be.equal('testemail1@testemail.com');
          res.body.should.have.property('firstName');
          res.body.firstName.should.be.equal('firstName');
          res.body.should.have.property('lastName');
          res.body.lastName.should.be.equal('lastName');
          chai.should().not.exist(res.body.password);
          done();
        });
    });
  });
  describe('PATCH /users/:id', () => {
    it('should update a SINGLE blob on /users/:id PATCH', (done) => {
      chai.request(server)
        .patch('/v1/users/57fe2450916165b0b8b20be2')
        .send({
          email: 'testemail1@testemail.com',
          firstName: 'firstName',
          lastName: 'lastName'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('email');
          res.body.email.should.be.equal('testemail1@testemail.com');
          res.body.should.have.property('firstName');
          res.body.firstName.should.be.equal('firstName');
          res.body.should.have.property('lastName');
          res.body.lastName.should.be.equal('lastName');
          chai.should().not.exist(res.body.password);
          done();
        });
    });
  });
  describe('DELETE /users/:id', () => {
    it('should delete a SINGLE user on /users/:id DELETE', (done) => {
      chai.request(server)
        .delete('/v1/users/57fe2450916165b0b8b20be2')
        .end((err, res) => {
          res.should.have.status(204);
          res.body.should.be.empty;
          done();
        });
    });
  });

});
