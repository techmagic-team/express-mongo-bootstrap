'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const userModel = require('./../../../../app/models/user.js');
const server = require('../../../../app/index');
const mocha = require('mocha');

chai.should();
chai.use(chaiHttp);

mocha.describe('Users API v1', () => {
  let accessToken;
  mocha.before((done) => {
    chai.request(server)
      .post('/v1/auth')
      .send({
        email: 'john.doe1@awesome.com',
        password: 'qwerty'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('accessToken');
        accessToken = res.body.accessToken;
        done();
      });
  });
  mocha.describe('GET /users', () => {
    mocha.it('should list users on /users GET', (done) => {
      chai.request(server)
        .get('/v1/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          res.body.length.should.be.above(0);
          done();
        });
    });
    mocha.describe('mockUserModel:', () => {
      const mockUserModel = sinon.mock(userModel);
      const rejectPromise = new Promise((resolve, reject) => reject());
      mocha.before(() => {
        mockUserModel.expects('find').returns(rejectPromise);
      });
      mocha.after(() => {
        mockUserModel.verify();
        mockUserModel.restore();
      });
      mocha.it('should list an error on /users GET when db request failed', (done) => {
        chai.request(server)
          .get('/v1/users')
          .end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.an('object');
            res.body.should.have.property('error');
            res.body.error.should.be.equal('SERVER_ERROR');
            done();
          });
      });
    });
  });
  mocha.describe('GET /users/:id', () => {
    mocha.it('should list a SINGLE user on /users/:id GET', (done) => {
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
    mocha.it('should list an error on /users/:undefined_id GET', (done) => {
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
    mocha.it('should list an error on /users/:invalid_id GET', (done) => {
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
  mocha.describe('POST /users', () => {
    mocha.it('should add a SINGLE user on /users POST', (done) => {
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
    mocha.it('should list an error on /users POST', (done) => {
      chai.request(server)
        .post('/v1/users')
        .send({
          email: 'testemail.com'
        })
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.an('object');
          res.body.should.have.property('error');
          res.body.error.should.be.equal('SERVER_ERROR');
          done();
        });
    });
  });
  mocha.describe('PUT /users/:id', () => {
    mocha.it('should update a SINGLE blob on /users/:id PUT', (done) => {
      chai.request(server)
        .put('/v1/users/57fe2450916165b0b8b20be2')
        .set('Authorization', accessToken)
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
    mocha.it('should list an error on /users/:id PUT when data is invalid', (done) => {
      chai.request(server)
        .put('/v1/users/57fe2450916165b0b8b20be2')
        .set('Authorization', accessToken)
        .send({
          email: 'testemail.com',
          firstName: 'firstName',
          lastName: 'lastName'
        })
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.an('object');
          res.body.should.have.property('error');
          res.body.error.should.be.equal('SERVER_ERROR');
          done();
        });
    });
  });
  mocha.describe('PATCH /users/:id', () => {
    mocha.it('should update a SINGLE blob on /users/:id PATCH', (done) => {
      chai.request(server)
        .patch('/v1/users/57fe2450916165b0b8b20be2')
        .set('Authorization', accessToken)
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
    mocha.it('should list an error on /users/:id PATCH when data is invalid', (done) => {
      chai.request(server)
        .patch('/v1/users/57fe2450916165b0b8b20be2')
        .set('Authorization', accessToken)
        .send({
          email: 'testemail.com',
          firstName: 'firstName',
          lastName: 'lastName'
        })
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.an('object');
          res.body.should.have.property('error');
          res.body.error.should.be.equal('SERVER_ERROR');
          done();
        });
    });
  });
  mocha.describe('DELETE /users/:id', () => {
    mocha.it('should delete a SINGLE user on /users/:id DELETE', (done) => {
      chai.request(server)
        .delete('/v1/users/57fe2450916165b0b8b20be2')
        .end((err, res) => {
          res.should.have.status(204);
          res.body.should.be.empty;
          done();
        });
    });
    mocha.it('should list an error on /users/:invalid_id DELETE', (done) => {
      chai.request(server)
        .delete('/v1/users/1')
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.an('object');
          res.body.should.have.property('error');
          res.body.error.should.be.equal('SERVER_ERROR');
          done();
        });
    });
  });

});
