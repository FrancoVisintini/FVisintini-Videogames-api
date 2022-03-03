/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
  description: 'The plumber game',
  platforms:[`Nintendo 3DS`, 'Nintendo Switch'],
  genre: ['Adventure', 'RPG'],
  rating: 3.2
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  
  describe('GET /videogames', () => {
    it('should get 200', async() =>
      agent.get('/videogames').expect(200)
    );
  });

  describe('GET /videogames?name=auto', () => {
    it('should get  4 results', () =>
      agent.get('/videogames?name=auto')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).length(15);
        })
    );
    it('should get 404 status if name does not exist', () =>
      agent.get('/videogames?name=anybadname')
        .expect(404)
    );
  });

});