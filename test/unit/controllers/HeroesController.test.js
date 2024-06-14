const request = require('supertest');
const assert = require('assert');

describe('HeroesController', function() {

  describe('#create()', function() {
    it('Deve criar um novo herói', function(done) {
      request(sails.hooks.http.app)
        .post('/heroes')
        .send({
          name: 'Harry Potter',
          power: 'Invisibilidade',
          age: 18,
          secretIdentity: 'Porquinho da Paulista'
          
        })
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          assert.ok(res.body.id);
          let createdHeroId = res.body.id;
          assert.strictEqual(res.body.name, 'Harry Potter');
          assert.strictEqual(res.body.power, 'Invisibilidade');
          assert.strictEqual(res.body.age, 18);
          assert.strictEqual(res.body.secretIdentity, 'Porquinho da Paulista');
          done();
        });
    });
  });

  describe('#list()', function() {
    it('Deve listar todos os heróis', function(done) {
      request(sails.hooks.http.app)
        .get('/heroes')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          assert.ok(Array.isArray(res.body));
          done();
        });
    });
  });

  describe('#listwithguns()', function() {
    it('Deve listar os heróis com as armas', function(done) {
      request(sails.hooks.http.app)
        .get('/heroesandguns')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          assert.ok(Array.isArray(res.body));
          done();
        });
    });
  });
});