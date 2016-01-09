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
    this.request = request.defaults({
      baseUrl: 'http://localhost:9876/'
    });
  });

  beforeEach(() => {
    app.locals.pizzas = {};
  });

  after(() => {
    this.server.close();
  });

  it('should exist', () => {
    expect(app).to.not.be.undefined;
  });

  describe('GET /', () => {

    it('should return a 200', (done) => {
      this.request.get('/', (error, response) => {
        if (error) { done(error); }
        expect(response.statusCode).to.eq(200);
        done();
      });
    });

    it('should have a body with the name of the application', (done) => {
      var title = app.locals.title;

      this.request.get('/', (error, response) => {
        if (error) { done(error); }
        expect(response.body).to.include(title);
        done();
      });
    });

    it('should not return 404', (done) => {
      this.request.post('/pizzas', (error, response) => {
        if (error) { done(error); }
        expect(response.statusCode).to.not.eq(404);
        done();
      });
    });
  });
  describe("POST /pizzas", () => {
    it('should not return 404', (done) => {
      this.request.post('/pizzas', (error, response) => {
        if (error) { done(error); }
        assert.notEqual(response.statusCode, 404);
        done();
      });
    });
    
    it('should receive and store data', (done) => {
      var validPizza = {
        pizza: {
          name: 'A vegan pizza',
          toppings: [ 'mushrooms', 'onions', 'garlic', 'black olives' ]
        }
      };

      this.request.post('/pizzas', { form: validPizza }, (error, response) => {
        if (error) { done(error); }

        var pizzaCount = Object.keys(app.locals.pizzas).length;

        assert.equal(pizzaCount, 1, `Expected 1 pizzas, found ${pizzaCount}`);

        done();
      });
    });
  });
});
