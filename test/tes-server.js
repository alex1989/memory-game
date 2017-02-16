
process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");

var server = require('../server/app');
var gameModels = require("../server/models/games");
var should = chai.should();

chai.use(chaiHttp);


describe('Books', () => {
    beforeEach((done) => {
        gameModels.Game.remove({}, (err) => { 
           done();         
        });     
    });
  describe('/GET book', () => {
      it('it should GET all the books', (done) => {
        chai.request(server)
            .get('/games/results')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });
  /*
  * Test the /POST route
  */
  describe('/POST book', () => {
      it('it should POST a new game', (done) => {
        let game = {
            username: "Joe",
        }
        chai.request(server)
            .post('/games/new')
            .send(game)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('username');
                res.body.should.have.property('cards');
              done();
            });
      });

  });
});