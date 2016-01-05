const assert = require('assert');
const app    = require('../server');
const request = require('request');

const _      = require("lodash");
const chai   = require('chai');

const expect = chai.expect;

describe('Server', () => {

  before(done => {
    this.port = 9876;
    this.server = app.listen(this.port, (err, result) => {
      if (err) { return done(err); }
      done();
    });
  });

  after(() => {
    this.server.close();
  });

  it('should exist', () => {
    expect(app).to.not.be.undefined
  });

  describe('GET /', () => {
    it('should return a 200', (done) => {
      request.get('http://localhost:9876', (error, response) => {
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });
});
