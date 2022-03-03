const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should throw an error if description is null', (done) => {
        Videogame.create({ name: 'Super Mario Bros' })
          .then(() => done(new Error('It requires a description')))
          .catch(() => done());
      });
      it('should throw an error if rating is null', (done) => {
        Videogame.create({ name: 'Super Mario Bros' , description: 'The plumber game'})
          .then(() => done(new Error('It requires a rating value')))
          .catch(() => done());
      });
      it('should throw an error if platforms is null', (done) => {
        Videogame.create({ name: 'Super Mario Bros', description: 'The plumber game', rating:3.2 })
          .then(() => done(new Error('It requires at least one platform')))
          .catch(() => done());
      });

      it('should work when its a valid name, a description, a rating value and at least one platform', () => {
        Videogame.create({ name: 'Super Mario Bros', description: 'The plumber game', rating:3.2, platforms:['PC'] });
      });
    });

  });
});
