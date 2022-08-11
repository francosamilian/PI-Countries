const { Country, Activity, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Activity.create({})
          .then(() => done('It requires a valid name'))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Activity.create({ name: 'Argentina' });
      });
    });
    describe('difficulty', () => {
      it('should throw an error if difficulty is null', (done) => {
        Activity.create({})
          .then(() => done(new Error('It requires a valid difficulty')))
          .catch(() => done());
      });
      it('should work when the difficulty is between 1 and 5', () => {
        Activity.create({name: 'hola', difficulty: 4, seasons: 'Summer', duration: '2 hours', country: ['name']});
      });
    });
    describe('season', () => {
      it('should throw an error if season is null', (done) => {
        Activity.create({name: 'hola', difficulty: 4, seasons: 'Summer', duration: '2 hours', country: ['name']})
          .then(() => done())
          .catch(() => done().expect(new Error('It requires a valid season')));
      });
      it('should work when its a valid season', () => {
        Activity.create({name: 'hola', difficulty: 4, seasons: 'Summer', duration: '2 hours', country: ['name']});
      });
    });
  });
}); 
