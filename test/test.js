const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../examples/app');

const authenticatedUser = request.agent(app);
const unauthenticatedUser = request.agent(app);

describe('GET /secure', () => {
  before((done) => {
    authenticatedUser.get('/auth/google').end(() => {
      done();
    });
  });

  it('should return 200 response when user is logged in', (done) => {
    authenticatedUser.get('/secure').end((req, res) => {
      expect(res.statusCode).to.be.equal(200);
      done();
    });
  });
  it('should return 302 response when user is logged in', (done) => {
    unauthenticatedUser.get('/secure').end((req, res) => {
      expect(res.statusCode).to.be.equal(302);
      done();
    });
  });
});
