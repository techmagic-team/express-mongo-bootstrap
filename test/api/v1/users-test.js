const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../src/index');
const should = chai.should();

console.log(__dirname);

chai.use(chaiHttp);


describe('Users API v1', () => {
  describe('GET /users', () => {
    it('should list users on /users GET', (done) => {
      chai.request(server)
        .get('/v1/users')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    })
  });
  describe('GET /users/:id', () => {
    it('should list a SINGLE blob on /users/:id GET')
  });
  describe('POST /users', () => {
    it('should add a SINGLE user on /users POST')
  });
  describe('PUT /users/:id', () => {
    it('should update a SINGLE blob on /users/:id PUT')
  });
  describe('DELETE /users/:id', () => {
    it('should delete a SINGL on /users/:id DELETE')
  });
});
