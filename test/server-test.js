const assert = require('assert');
const app = require('../server');

const _     = require("lodash");
const chai = require('chai');

const expect = chai.expect;

describe('Server', () => {

  it('should exist', () => {
    expect(app).to.not.be(null)
  });
});
